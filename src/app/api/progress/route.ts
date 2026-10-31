import { NextResponse, type NextRequest } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import { findLesson } from "@/lib/courseContent";
import { getActiveEnrollmentForUser, getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const lessonId = typeof body.lessonId === "string" ? body.lessonId.trim() : "";
  const moduleNumber = typeof body.moduleNumber === "string" ? body.moduleNumber.trim() : "";
  const lessonIndex = Number(body.lessonIndex);
  const watchedSeconds = Math.max(0, Math.min(Math.round(Number(body.watchedSeconds) || 0), 86400));
  const completed = body.completed === true;

  const found = findLesson(moduleNumber, lessonIndex);
  if (!lessonId || !found || found.lesson.id !== lessonId) {
    return NextResponse.json({ ok: false, error: "Unknown lesson." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Progress storage is not configured." }, { status: 503 });
  }

  const enrollment = await getActiveEnrollmentForUser(user.id, user.email);
  if (!enrollment) {
    return NextResponse.json({ ok: false, error: "No active enrollment." }, { status: 403 });
  }

  const now = new Date().toISOString();
  const admin = getSupabaseAdmin();

  const { data: existing } = await admin
    .from("lesson_progress")
    .select("watched_seconds")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  const priorSeconds = Number(existing?.watched_seconds) || 0;

  const payload: Record<string, unknown> = {
    user_id: user.id,
    order_id: enrollment.order_id,
    lesson_id: lessonId,
    module_number: moduleNumber,
    lesson_index: lessonIndex,
    watched_seconds: Math.max(priorSeconds, watchedSeconds),
    last_viewed_at: now,
  };
  if (completed) {
    payload.completed = true;
    payload.completed_at = now;
  }

  const { error } = await admin
    .from("lesson_progress")
    .upsert(payload, { onConflict: "user_id,lesson_id" });

  if (error) {
    console.error("Unable to save lesson progress:", error.message);
    return NextResponse.json({ ok: false, error: "Could not save progress." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
