import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import { claimEnrollmentByEmail } from "@/lib/supabase";

function text(value: unknown) {
  return String(value ?? "").trim();
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in with Google to restore access." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = text(body?.email).toLowerCase();
  const phone = text(body?.phone).replace(/\D/g, "");

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Enter the email you paid with." }, { status: 400 });
  }
  if (phone.length < 4) {
    return NextResponse.json({ error: "Enter the last 4 digits of your phone number." }, { status: 400 });
  }

  const result = await claimEnrollmentByEmail(email, user.id, phone.slice(-4));

  if (result.reason === "not_found") {
    return NextResponse.json(
      {
        error:
          "No active purchase found for that email. Message us on WhatsApp with your payment screenshot and we will fix it.",
      },
      { status: 404 }
    );
  }

  if (result.reason === "phone_mismatch") {
    return NextResponse.json(
      { error: "That email exists, but the phone number does not match our records." },
      { status: 403 }
    );
  }

  return NextResponse.json({ ok: true, orderId: result.enrollment?.order_id ?? null });
}
