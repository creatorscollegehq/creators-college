import { getSupabaseAdmin } from "@/lib/supabase";
import { clampPercentOff, type Coupon } from "@/lib/coupons";

const COUPON_COLUMNS = "code,title,percent_off,max_uses,used_count,starts_at,expires_at,active";

function mapRow(row: Record<string, unknown>): Coupon {
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

export async function getCoupons(): Promise<Coupon[]> {
  const { data, error } = await getSupabaseAdmin().from("coupons").select(COUPON_COLUMNS).order(
    "created_at",
    { ascending: false }
  );
  if (error) throw new Error(error.message);

  return (data || []).map(mapRow);
}

export async function checkCoupon(code: string): Promise<Coupon | null> {
  const normalized = String(code ?? "").trim().toLowerCase();
  if (!normalized) return null;
  const { data, error } = await getSupabaseAdmin()
    .from("coupons")
    .select(COUPON_COLUMNS)
    .eq("code", normalized)
    .maybeSingle();

  if (error || !data) return null;
  return mapRow(data);
}

export async function claimCoupon(code: string): Promise<Coupon | null> {
  const coupon = await checkCoupon(code);
  if (!coupon) return null;
  // Since we don't want the client to manipulate counts directly. A coupon's
  // use count is increased only when an enrollment is created. For paid
  // coupon checkout this happens after Cashfree signs back with a successful
  // payment.
  await getSupabaseAdmin()
    .from("coupons")
    .update({ used_count: coupon.usedCount + 1 })
    .eq("code", coupon.code);
  return coupon;
}
