import { NextResponse } from "next/server";
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
    return NextResponse.json({
      ok: true,
      enrollment: { orderId: existing.order_id, email: existing.email, name: existing.name },
    });
  }

  const verified = await verifyPaidOrder(orderId, phone);
  if (!verified.ok) {
    return NextResponse.json({ error: verified.error }, { status: verified.status });
  }

  const { order } = verified;
  const email = String(order.customer_details?.customer_email ?? body?.email ?? "")
    .trim()
    .toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      {
        error:
          "This order has no email on record. Sign in with Google and use Claim Access with your order ID and phone number.",
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

    return NextResponse.json({
      ok: true,
      enrollment: { orderId: enrollment.order_id, email: enrollment.email, name: enrollment.name },
    });
  } catch (error) {
    console.error("Unable to save enrollment after payment verification:", error);
    return NextResponse.json(
      { error: "Payment is verified, but we could not save your access. Contact support on WhatsApp." },
      { status: 500 }
    );
  }
}
