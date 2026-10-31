import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin";
import { getEnrollmentByOrderId, getSupabaseAdmin } from "@/lib/supabase";

const ACTIONS = new Set(["revoke", "restore", "extend", "unlink"]);

export async function POST(request: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Admin access required." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const orderId = String(body.orderId ?? "").trim();
  const action = String(body.action ?? "").trim();

  if (!orderId || !ACTIONS.has(action)) {
    return NextResponse.json({ ok: false, error: "A valid order ID and action are required." }, { status: 400 });
  }

  const existing = await getEnrollmentByOrderId(orderId);
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Enrollment not found for this order ID." }, { status: 404 });
  }

  const client = getSupabaseAdmin();
  const update: Record<string, unknown> = {};
  let message = "Updated.";

  if (action === "revoke") {
    update.status = "revoked";
    message = "Access revoked. The student is signed out of the course.";
  } else if (action === "restore") {
    update.status = "active";
    message = "Access restored.";
  } else if (action === "extend") {
    const now = Date.now();
    const current = existing.expires_at ? new Date(existing.expires_at).getTime() : 0;
    const base = Math.max(now, Number.isFinite(current) ? current : 0);
    const expiresAt = new Date(base + 30 * 24 * 60 * 60 * 1000).toISOString();
    update.expires_at = expiresAt;
    message = `Access extended to ${new Date(expiresAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}.`;
  } else {
    update.user_id = null;
    update.claimed_at = null;
    message = "Google account unlinked. The student regains access by signing in with their checkout email.";
  }

  const { data, error } = await client
    .from("enrollments")
    .update(update)
    .eq("order_id", orderId)
    .select("*")
    .maybeSingle();

  if (error || !data) {
    console.error("Admin enrollment update failed:", error?.message);
    return NextResponse.json({ ok: false, error: "Could not update the enrollment." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message });
}
