import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import {
  claimEnrollment,
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
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in with Google first." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const orderId = String(body?.orderId ?? "").trim();
  const phone = normalizePhone(body?.phone);

  if (!orderId || phone.length !== 10) {
    return NextResponse.json(
      { error: "Enter the order ID and the 10-digit phone number used at purchase." },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Course access is not configured yet. Please contact support on WhatsApp." },
      { status: 503 }
    );
  }

  const existing = await getEnrollmentByOrderId(orderId);
  if (existing) {
    if (normalizePhone(existing.phone) !== phone) {
      return NextResponse.json(
        { error: "This order ID does not match that phone number." },
        { status: 403 }
      );
    }
    if (!isUsable(existing)) {
      return NextResponse.json(
        { error: "This enrollment is not active. Please contact support on WhatsApp." },
        { status: 403 }
      );
    }
    if (existing.user_id && existing.user_id !== user.id) {
      return NextResponse.json(
        { error: "This enrollment is already linked to another Google account." },
        { status: 409 }
      );
    }

    try {
      const claimed = await claimEnrollment(orderId, user.id, user.email);
      return NextResponse.json({
        ok: true,
        enrollment: { orderId: claimed?.order_id ?? orderId, email: user.email },
      });
    } catch (error) {
      console.error("Unable to link enrollment:", error);
      return NextResponse.json(
        { error: "Could not link this enrollment. Please contact support on WhatsApp." },
        { status: 500 }
      );
    }
  }

  const verified = await verifyPaidOrder(orderId, phone);
  if (!verified.ok) {
    return NextResponse.json({ error: verified.error }, { status: verified.status });
  }

  const { order } = verified;

  try {
    const enrollment = await upsertEnrollment({
      order_id: orderId,
      name: order.customer_details?.customer_name || user.name,
      phone,
      email: user.email,
      user_id: user.id,
      course_slug: COURSE_SLUG,
      status: "active",
      provider: "cashfree",
      amount: Number(order.order_amount),
      currency: order.order_currency,
      expires_at: null,
    });

    return NextResponse.json({
      ok: true,
      enrollment: { orderId: enrollment.order_id, email: enrollment.email },
    });
  } catch (error) {
    console.error("Unable to claim paid order:", error);
    return NextResponse.json(
      { error: "Payment is verified, but we could not link your account. Contact support on WhatsApp." },
      { status: 500 }
    );
  }
}
