import { getSupabaseAdmin } from "@/lib/supabase";

export interface Coupon {
  code: string;
  title: string | null;
  percentOff: number;
  maxUses: number;
  usedCount: number;
  startsAt: string | null;
  expiresAt: string | null;
  active: boolean;
}

export interface CouponOrder {
  orderId: string;
  couponCode: string;
  amount: number;
}

export interface PublicCoupon {
  code: string;
  percentOff: number;
  discountedPrice: number;
  fullDiscount: boolean;
  expiresAt: string | null;
  remainingUses: number | null;
}

export type CouponValidationError =
  | "not_found"
  | "inactive"
  | "expired"
  | "not_started"
  | "usage_exhausted";

export class CouponError extends Error {
  status: number;
  code: CouponValidationError | "invalid";

  constructor(code: CouponValidationError | "invalid", message: string, status = 400) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

const COUPON_COLUMNS = "code,title,percent_off,max_uses,used_count,starts_at,expires_at,active";

const MISSING_TABLE = /could not find the table|PGRST205|schema cache|does not exist/i;

export const COUPON_SETUP_MESSAGE =
  "Coupons are not set up yet. In the admin panel run the one-time coupon setup SQL, then try the code again.";

export function normalizeCouponCode(value: unknown) {
  return String(value ?? "").trim().toUpperCase();
}

function isActiveRow(coupon: Coupon): CouponValidationError | null {
  if (!coupon.active) return "inactive";
  if (coupon.percentOff <= 0) return "inactive";
  if (coupon.startsAt && new Date(coupon.startsAt).getTime() > Date.now()) {
    return "not_started";
  }
  if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() <= Date.now()) {
    return "expired";
  }
  if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses) {
    return "usage_exhausted";
  }
  return null;
}

export async function getCouponByCode(code: string): Promise<Coupon | null> {
  const normalized = normalizeCouponCode(code);
  if (!normalized) return null;

  const { data, error } = await getSupabaseAdmin()
    .from("coupons")
    .select(COUPON_COLUMNS)
    .eq("code", normalized.toLowerCase())
    .maybeSingle();

  if (error) {
    console.error("Coupon lookup failed:", error.message);
    // A missing table is a setup problem, not a bad code: surface it clearly so
    // the checkout and admin pages stop claiming the coupon does not exist.
    if (MISSING_TABLE.test(error.message || "")) {
      throw new CouponError("invalid", COUPON_SETUP_MESSAGE, 503);
    }
    return null;
  }
  if (!data) return null;
  const row = data as Record<string, unknown>;
  return {
    code: String(row.code ?? "").toUpperCase(),
    title: row.title ? String(row.title) : null,
    percentOff: clampPercentOff(row.percent_off),
    maxUses: Math.max(0, Number(row.max_uses) || 0),
    usedCount: Math.max(0, Number(row.used_count) || 0),
    startsAt: row.starts_at ? String(row.starts_at) : null,
    expiresAt: row.expires_at ? String(row.expires_at) : null,
    active: Boolean(row.active),
  };
}

export function couponDiscountedPrice(price: number, coupon: Coupon) {
  const percentOff = clampPercentOff(coupon.percentOff);
  const discounted = price * (1 - percentOff / 100);
  return Math.max(0, Math.ceil(discounted));
}

export function validateCoupon(coupon: Coupon | null): CouponError | null {
  if (!coupon) return new CouponError("not_found", "That coupon code is not valid.", 404);
  const problem = isActiveRow(coupon);
  if (!problem) return null;

  const messages: Record<CouponValidationError, string> = {
    not_found: "That coupon code is not valid.",
    inactive: "That coupon is no longer accepting new orders.",
    expired: "That coupon has expired.",
    not_started: "That coupon has not started yet.",
    usage_exhausted: "That coupon code has already been fully used.",
  };
  return new CouponError(problem, messages[problem], 404);
}

export function toPublicCoupon(coupon: Coupon, basePrice: number): PublicCoupon {
  const discountedPrice = couponDiscountedPrice(basePrice, coupon);
  const remainingUses = coupon.maxUses > 0 ? Math.max(0, coupon.maxUses - coupon.usedCount) : null;
  return {
    code: normalizeCouponCode(coupon.code),
    percentOff: clampPercentOff(coupon.percentOff),
    discountedPrice,
    fullDiscount: discountedPrice <= 0,
    expiresAt: coupon.expiresAt,
    remainingUses,
  };
}

export function clampPercentOff(value: unknown) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}

export async function incrementCouponUse(code: string) {
  const normalized = normalizeCouponCode(code);
  if (!normalized) return;
  const { error } = await getSupabaseAdmin().rpc("coupon_use", {
    p_code: normalized.toLowerCase(),
  });

  if (error) {
    console.error("Coupon use update failed:", error.message);
  }
}

export async function recordCouponOrder(
  orderId: string,
  couponCode: string,
  amount: number
): Promise<CouponOrder | null> {
  const normalized = normalizeCouponCode(couponCode);
  if (!orderId || !normalized) return null;
  const payload = {
    order_id: orderId,
    coupon_code: normalized.toLowerCase(),
    amount: Math.max(0, Math.ceil(amount)),
  };
  const { data, error } = await getSupabaseAdmin().from("coupon_orders").upsert(payload).select(
    "order_id,coupon_code,amount"
  ).maybeSingle();

  if (error || !data) {
    console.error("Coupon order record failed:", error?.message);
    return null;
  }

  return {
    orderId: String(data.order_id),
    couponCode: String(data.coupon_code),
    amount: Number(data.amount) || 0,
  };
}

export async function getCouponOrder(orderId: string): Promise<CouponOrder | null> {
  if (!orderId) return null;
  const { data, error } = await getSupabaseAdmin()
    .from("coupon_orders")
    .select("order_id,coupon_code,amount")
    .eq("order_id", orderId)
    .maybeSingle();

  if (error || !data) return null;
  return {
    orderId: String(data.order_id),
    couponCode: String(data.coupon_code),
    amount: Number(data.amount) || 0,
  };
}
