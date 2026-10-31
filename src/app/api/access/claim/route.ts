import { NextResponse } from "next/server";
import { contextFromRequest, logServerEvent } from "@/lib/analytics";
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
  const context = {
    ...contextFromRequest(request),
    user_id: user.id,
    email: user.email?.toLowerCase() ?? null,
  };

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
      await logServerEvent({
        event_name: "claim_failed",
        path: "/api/access/claim",
        ...context,
        metadata: { reason: "phone_mismatch", orderId },
      });
      return NextResponse.json(
        { error: "This order ID does not match that phone number." },
        { status: 403 }
      );
    }
    if (!isUsable(existing)) {
      await logServerEvent({
        event_name: "claim_failed",
        path: "/api/access/claim",
        ...context,
        metadata: { reason: "inactive", orderId },
      });
      return NextResponse.json(
        { error: "This enrollment is not active. Please contact support on WhatsApp." },
        { status: 403 }
      );
    }
    if (existing.user_id && existing.user_id !== user.id) {
      await logServerEvent({
        event_name: "claim_failed",
        path: "/api/access/claim",
        ...context,
        metadata: { reason: "already_linked", orderId },
      });
      return NextResponse.json(
        { error: "This enrollment is already linked to another Google account." },
        { status: 409 }
      );
    }

    try {
      const claimed = await claimEnrollment(orderId, user.id, user.email);
      await logServerEvent({
        event_name: "claim_success",
        path: "/api/access/claim",
        ...context,
        value: Number(existing.amount) || null,
        metadata: { source: "stored", orderId },
      });
      return NextResponse.json({
        ok: true,
        enrollment: { orderId: claimed?.order_id ?? orderId, email: user.email },
      });
    } catch (error) {
      console.error("Unable to link enrollment:", error);
      await logServerEvent({
        event_name: "claim_failed",
        path: "/api/access/claim",
        ...context,
        metadata: { reason: "link_error", orderId },
      });
      return NextResponse.json(
        { error: "Could not link this enrollment. Please contact support on WhatsApp." },
        { status: 500 }
      );
    }
  }

  const verified = await verifyPaidOrder(orderId, phone);
  if (!verified.ok) {
    await logServerEvent({
      event_name: "claim_failed",
      path: "/api/access/claim",
      ...context,
      metadata: { reason: "not_paid", orderId, status: verified.status, error: verified.error.slice(0, 160) },
    });
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

    await logServerEvent({
      event_name: "claim_success",
      path: "/api/access/claim",
      ...context,
      value: Number(order.order_amount) || null,
      metadata: { source: "cashfree", orderId },
    });

    return NextResponse.json({
      ok: true,
      enrollment: { orderId: enrollment.order_id, email: enrollment.email },
    });
  } catch (error) {
    console.error("Unable to claim paid order:", error);
    await logServerEvent({
      event_name: "claim_failed",
      path: "/api/access/claim",
      ...context,
      metadata: { reason: "save_error", orderId },
    });
    return NextResponse.json(
      { error: "Payment is verified, but we could not link your account. Contact support on WhatsApp." },
      { status: 500 }
    );
  }
}
