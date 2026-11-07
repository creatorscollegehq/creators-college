import { NextResponse } from "next/server";
import { contextFromRequest, logServerEvent } from "@/lib/analytics";
import { getCouponByCode, getCouponOrder, incrementCouponUse } from "@/lib/coupons";
import {
  getEnrollmentByOrderId,
  isSupabaseConfigured,
  upsertEnrollment,
  type Enrollment,
} from "@/lib/supabase";
import { COURSE_SLUG, normalizePhone, verifyPaidOrder } from "@/lib/payment";

function isUsable(enrollment: Enrollment) {
  if (enrollment.status !== "active") return false;
  if (enrollment.expires_at && new Date(enrollment.expires_at).getTime() <= Date.now()) {
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const orderId = String(body?.orderId ?? "").trim();
  const phone = normalizePhone(body?.phone);
  const context = contextFromRequest(request);

  if (!orderId || phone.length !== 10) {
    return NextResponse.json(
      { error: "Enter the order ID and the same 10-digit phone number used at checkout." },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Course access is not configured yet. Please contact support on WhatsApp." },
      { status: 503 }
    );
  }

  const couponOrder = await getCouponOrder(orderId);

  const existing = couponOrder
    ? null
    : await getEnrollmentByOrderId(orderId);

  if (couponOrder) {
    const coupon = couponOrder.couponCode ? await getCouponByCode(couponOrder.couponCode) : null;
    if (!coupon) {
      await logServerEvent({
        event_name: "access_verify",
        path: "/api/access/verify",
        ...context,
        metadata: { result: "coupon_not_found", orderId },
      });
      return NextResponse.json(
        { error: "Coupon no longer linked to this order. Please message us on WhatsApp." },
        { status: 404 }
      );
    }
    const couponVerified = await verifyPaidOrder(orderId, phone);
    if (!couponVerified.ok) {
      await logServerEvent({
        event_name: "access_verify",
        path: "/api/access/verify",
        ...context,
        metadata: { result: "coupon_unpaid", orderId, error: couponVerified.error.slice(0, 160) },
      });
      return NextResponse.json({ error: couponVerified.error }, { status: couponVerified.status });
    }

    const paidAmount = Number(couponVerified.order.order_amount) || 0;
    if (Math.abs(paidAmount - couponOrder.amount) > 0.01) {
      await logServerEvent({
        event_name: "access_verify",
        path: "/api/access/verify",
        ...context,
        metadata: { result: "coupon_amount_mismatch", orderId, expected: couponOrder.amount, paid: paidAmount },
      });
      return NextResponse.json(
        { error: "That payment did not match your coupon price. Message us on WhatsApp." },
        { status: 402 }
      );
    }

    // In this branch the customer got a paid coupon. We create the enrollment
    // only after the verified paid amount matches the discounted order amount.
    const order = couponVerified.order;
    const email = String(order.customer_details?.customer_email ?? body?.email ?? "")
      .trim()
      .toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      await logServerEvent({
        event_name: "access_verify",
        path: "/api/access/verify",
        ...context,
        metadata: { result: "no_email", orderId },
      });
      return NextResponse.json(
        {
          error:
            "This order has no email on record. Message us on WhatsApp with your order ID so we can link it to your Google email.",
        },
        { status: 422 }
      );
    }

    try {
      const enrollment = await upsertEnrollment({
        order_id: orderId,
        name: order.customer_details?.customer_name || String(body?.name ?? "") || "Student",
        phone,
        email,
        course_slug: COURSE_SLUG,
        status: "active",
        provider: "cashfree",
        amount: Number(order.order_amount),
        currency: order.order_currency,
        expires_at: null,
        metadata: { coupon_code: couponOrder.couponCode },
      });

      await incrementCouponUse(couponOrder.couponCode);

      await logServerEvent({
        event_name: "access_verify",
        path: "/api/access/verify",
        ...context,
        email,
        value: paidAmount || null,
        metadata: {
          result: "ok",
          source: "coupon",
          orderId,
          coupon: couponOrder.couponCode,
        },
      });

      return NextResponse.json({
        ok: true,
        enrollment: { orderId: enrollment.order_id, email: enrollment.email, name: enrollment.name },
      });
    } catch (error) {
      console.error("Unable to save enrollment after coupon payment:", error);
      await logServerEvent({
        event_name: "access_verify",
        path: "/api/access/verify",
        ...context,
        email,
        metadata: { result: "save_failed", orderId },
      });
      return NextResponse.json(
        { error: "Coupon is valid, but we could not save access. Contact support on WhatsApp." },
        { status: 500 }
      );
    }
  }

  if (existing) {
    if (normalizePhone(existing.phone) !== phone) {
      await logServerEvent({
        event_name: "access_verify",
        path: "/api/access/verify",
        ...context,
        metadata: { result: "phone_mismatch", orderId },
      });
      return NextResponse.json(
        { error: "This order ID does not match that phone number." },
        { status: 403 }
      );
    }
    if (!isUsable(existing)) {
      await logServerEvent({
        event_name: "access_verify",
        path: "/api/access/verify",
        ...context,
        metadata: { result: "inactive", orderId },
      });
      return NextResponse.json(
        { error: "This enrollment is not active. Please contact support on WhatsApp." },
        { status: 403 }
      );
    }
    await logServerEvent({
      event_name: "access_verify",
      path: "/api/access/verify",
      ...context,
      user_id: existing.user_id ?? null,
      email: existing.email?.toLowerCase() ?? null,
      value: Number(existing.amount) || null,
      metadata: { result: "ok", source: "stored", orderId },
    });
    return NextResponse.json({
      ok: true,
      enrollment: { orderId: existing.order_id, email: existing.email, name: existing.name },
    });
  }

  const verified = await verifyPaidOrder(orderId, phone);
  if (!verified.ok) {
    await logServerEvent({
      event_name: "access_verify",
      path: "/api/access/verify",
      ...context,
      metadata: { result: "failed", orderId, status: verified.status, error: verified.error.slice(0, 160) },
    });
    return NextResponse.json({ error: verified.error }, { status: verified.status });
  }

  const { order } = verified;
  const email = String(order.customer_details?.customer_email ?? body?.email ?? "")
    .trim()
    .toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    await logServerEvent({
      event_name: "access_verify",
      path: "/api/access/verify",
      ...context,
      metadata: { result: "no_email", orderId },
    });
    return NextResponse.json(
      {
        error:
          "This order has no email on record. Message us on WhatsApp with your order ID so we can link it to your Google email.",
      },
      { status: 422 }
    );
  }

  try {
    const enrollment = await upsertEnrollment({
      order_id: orderId,
      name: order.customer_details?.customer_name || String(body?.name ?? "") || "Student",
      phone,
      email,
      course_slug: COURSE_SLUG,
      status: "active",
      provider: "cashfree",
      amount: Number(order.order_amount),
      currency: order.order_currency,
      expires_at: null,
    });

    await logServerEvent({
      event_name: "access_verify",
      path: "/api/access/verify",
      ...context,
      email,
      value: Number(order.order_amount) || null,
      metadata: { result: "ok", source: "cashfree", orderId },
    });

    return NextResponse.json({
      ok: true,
      enrollment: { orderId: enrollment.order_id, email: enrollment.email, name: enrollment.name },
    });
  } catch (error) {
    console.error("Unable to save enrollment after payment verification:", error);
    await logServerEvent({
      event_name: "access_verify",
      path: "/api/access/verify",
      ...context,
      email,
      metadata: { result: "save_failed", orderId },
    });
    return NextResponse.json(
      { error: "Payment is verified, but we could not save your access. Contact support on WhatsApp." },
      { status: 500 }
    );
  }
}
