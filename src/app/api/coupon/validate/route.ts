import { NextResponse } from "next/server";
import { getCouponByCode, toPublicCoupon, validateCoupon } from "@/lib/coupons";
import { COURSE_PRICE } from "@/lib/payment";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const rawCode = String(body?.code ?? "").trim();
  if (!rawCode) {
    return NextResponse.json({ ok: false, error: "Enter a coupon code." }, { status: 400 });
  }

  const coupon = await getCouponByCode(rawCode);
  const error = validateCoupon(coupon);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: error.status });
  }

  return NextResponse.json({ ok: true, coupon: coupon ? toPublicCoupon(coupon, COURSE_PRICE) : null });
}
