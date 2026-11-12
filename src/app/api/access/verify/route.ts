import { NextResponse } from "next/server";
import { contextFromRequest, logServerEvent } from "@/lib/analytics";
import { getAuthUser } from "@/lib/auth/session";
import { getCouponOrder, incrementCouponUse } from "@/lib/coupons";
import {
  getEnrollmentByOrderId,
  getSupabaseAdmin,
  isSupabaseConfigured,
  upsertEnrollment,
  type Enrollment,
} from "@/lib/supabase";
import { COURSE_PRICE, COURSE_SLUG, normalizePhone, verifyPaidOrder } from "@/lib/payment";

function isUsable(enrollment: Enrollment) {
  if (enrollment.status !== "active") return false;
  if (enrollment.expires_at && new Date(enrollment.expires_at).getTime() <= Date.now()) {
    return false;
  }
  return true;
}

function enrollmentPayload(enrollment: Enrollment) {
  return {
    orderId: enrollment.order_id,
    email: enrollment.email,
    name: enrollment.name,
    phone: enrollment.phone,
    amount: Number(enrollment.amount) || 0,
  };
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json(
      { error: "Sign in with Google to unlock your course." },
      { status: 401 }
    );
  }
  const userEmail = user.email.trim().toLowerCase();

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const orderId = String(body?.orderId ?? "").trim();
  const context = contextFromRequest(request);

  if (!orderId) {
    return NextResponse.json({ error: "Order ID is missing." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Course access is not configured yet. Please contact support on WhatsApp." },
      { status: 503 }
    );
  }

  const existing = await getEnrollmentByOrderId(orderId);
  if (existing) {
    if ((existing.email || "").toLowerCase() !== userEmail) {
      await logServerEvent({
        event_name: "access_verify",
        path: "/api/access/verify",
        ...context,
        metadata: { result: "email_mismatch", orderId },
      });
      return NextResponse.json(
        {
          error:
            "This order is linked to a different Google account. Sign in with the email used at checkout or contact support on WhatsApp.",
        },
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

    if (!existing.user_id) {
      await getSupabaseAdmin()
        .from("enrollments")
        .update({ user_id: user.id })
        .eq("id", existing.id);
    }

    await logServerEvent({
      event_name: "access_verify",
      path: "/api/access/verify",
      ...context,
      user_id: user.id,
      email: userEmail,
      value: Number(existing.amount) || null,
      metadata: { result: "ok", source: "stored", orderId },
    });

    return NextResponse.json({ ok: true, enrollment: enrollmentPayload(existing) });
  }

  const couponOrder = await getCouponOrder(orderId);
  const expectedAmount = couponOrder ? couponOrder.amount : COURSE_PRICE;

  if (couponOrder && expectedAmount <= 0) {
    try {
      const enrollment = await upsertEnrollment({
        order_id: orderId,
        name: user.name || "Student",
        phone: "",
        email: userEmail,
        user_id: user.id,
        course_slug: COURSE_SLUG,
        status: "active",
        provider: "coupon",
        amount: 0,
        currency: "INR",
        expires_at: null,
        metadata: { coupon_code: couponOrder.couponCode },
      });

      await logServerEvent({
        event_name: "access_verify",
        path: "/api/access/verify",
        ...context,
        user_id: user.id,
        email: userEmail,
        metadata: { result: "ok", source: "free_coupon", orderId },
      });

      return NextResponse.json({ ok: true, enrollment: enrollmentPayload(enrollment) });
    } catch (error) {
      console.error("Unable to save free coupon enrollment:", error);
      return NextResponse.json(
        { error: "We could not save your access. Contact support on WhatsApp." },
        { status: 500 }
      );
    }
  }

  const verified = await verifyPaidOrder(orderId, "", expectedAmount);
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
  const orderEmail = String(order.customer_details?.customer_email ?? "")
    .trim()
    .toLowerCase();
  const phone = normalizePhone(order.customer_details?.customer_phone);

  if (!orderEmail || orderEmail !== userEmail) {
    await logServerEvent({
      event_name: "access_verify",
      path: "/api/access/verify",
      ...context,
      metadata: { result: "order_email_mismatch", orderId },
    });
    return NextResponse.json(
      {
        error:
          "This payment is linked to a different email. Sign in with the Google account used at checkout or contact support on WhatsApp.",
      },
      { status: 403 }
    );
  }

  try {
    const enrollment = await upsertEnrollment({
      order_id: orderId,
      name: order.customer_details?.customer_name || user.name || "Student",
      phone,
      email: userEmail,
      user_id: user.id,
      course_slug: COURSE_SLUG,
      status: "active",
      provider: "cashfree",
      amount: Number(order.order_amount),
      currency: order.order_currency || "INR",
      expires_at: null,
      metadata: couponOrder ? { coupon_code: couponOrder.couponCode } : undefined,
    });

    if (couponOrder) {
      await incrementCouponUse(couponOrder.couponCode);
    }

    await logServerEvent({
      event_name: "access_verify",
      path: "/api/access/verify",
      ...context,
      user_id: user.id,
      email: userEmail,
      value: Number(order.order_amount) || null,
      metadata: { result: "ok", source: "cashfree", orderId, coupon: couponOrder?.couponCode },
    });

    return NextResponse.json({ ok: true, enrollment: enrollmentPayload(enrollment) });
  } catch (error) {
    console.error("Unable to save enrollment after payment verification:", error);
    await logServerEvent({
      event_name: "access_verify",
      path: "/api/access/verify",
      ...context,
      email: userEmail,
      metadata: { result: "save_failed", orderId },
    });
    return NextResponse.json(
      { error: "Payment is verified, but we could not save your access. Contact support on WhatsApp." },
      { status: 500 }
    );
  }
}
