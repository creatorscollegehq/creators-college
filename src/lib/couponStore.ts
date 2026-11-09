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
