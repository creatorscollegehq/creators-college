import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase";
import { clampPercentOff, normalizeCouponCode } from "@/lib/coupons";

const CODE_INDEX = "code";

function text(value: unknown) {
  return String(value ?? "").trim();
}

function timestamp(value: unknown) {
  if (!value) return null;
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function normalizeInput(input: Record<string, unknown>) {
  const code = normalizeCouponCode(input.code);
  return {
    code,
    title: text(input.title) || null,
    percentOff: clampPercentOff(input.percentOff),
    maxUses: Math.max(0, Math.ceil(Number(input.maxUses) || 0)),
    startsAt: timestamp(input.startsAt),
    expiresAt: timestamp(input.expiresAt),
    active: input.active === undefined ? true : Boolean(input.active),
  };
}

export async function POST(request: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Admin access required." }, { status: 401 });
  }

  let input: Record<string, unknown>;
  try {
    input = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const coupon = normalizeInput(input);
  if (!coupon.code) {
    return NextResponse.json({ ok: false, error: "Coupon code is required." }, { status: 400 });
  }
  if (coupon.startsAt && coupon.expiresAt && new Date(coupon.startsAt) > new Date(coupon.expiresAt)) {
    return NextResponse.json({ ok: false, error: "Coupon starts after it ends." }, { status: 400 });
  }

  const client = getSupabaseAdmin();
  const { data, error } = await client
    .from("coupons")
    .upsert(
      {
        code: coupon.code.toLowerCase(),
        title: coupon.title,
        percent_off: coupon.percentOff,
        max_uses: coupon.maxUses,
        starts_at: coupon.startsAt,
        expires_at: coupon.expiresAt,
        active: coupon.active,
      },
      { onConflict: "code" }
    )
    .select("code,title,percent_off,max_uses,used_count,starts_at,expires_at,active")
    .maybeSingle();

  if (error || !data) {
    console.error("Coupon save failed:", error?.message);
    return NextResponse.json({ ok: false, error: "Could not save the coupon." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, coupon: data });
}

export async function DELETE(request: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Admin access required." }, { status: 401 });
  }

  let input: Record<string, unknown>;
  try {
    input = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const coupon = normalizeInput(input);
  if (!coupon.code) {
    return NextResponse.json({ ok: false, error: "Coupon code is required." }, { status: 400 });
  }

  const client = getSupabaseAdmin();
  const { error } = await client.from("coupons").delete().eq(CODE_INDEX, coupon.code.toLowerCase());

  if (error) {
    console.error("Coupon delete failed:", error.message);
    return NextResponse.json({ ok: false, error: "Could not delete the coupon." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
