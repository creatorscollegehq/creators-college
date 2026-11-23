import { NextResponse } from "next/server";
import { contextFromRequest, logServerEvent } from "@/lib/analytics";
import { getAuthUser } from "@/lib/auth/session";
import { findLesson } from "@/lib/courseContent";
import { getActiveEnrollmentForUser, isSupabaseConfigured } from "@/lib/supabase";
import { SHEETS_WEBHOOK_URL } from "@/lib/sheets";

const DEFAULT_SHEETS_WEBHOOK = SHEETS_WEBHOOK_URL;

function clean(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in with Google to send feedback." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const lessonId = clean(body?.lessonId, 40);
  const moduleNumber = clean(body?.moduleNumber, 4);
  const lessonIndex = Number(body?.lessonIndex);
  const message = clean(body?.message, 2000);
  const rating = Math.max(0, Math.min(Math.round(Number(body?.rating) || 0), 5));

  const found = findLesson(moduleNumber, lessonIndex);
  if (!lessonId || !found || found.lesson.id !== lessonId) {
    return NextResponse.json({ error: "Unknown lesson." }, { status: 400 });
  }

  if (message.length < 5) {
    return NextResponse.json({ error: "Please write at least a short sentence." }, { status: 400 });
  }

  if (isSupabaseConfigured()) {
    const enrollment = await getActiveEnrollmentForUser(user.id, user.email);
    if (!enrollment) {
      return NextResponse.json({ error: "No active enrollment for this account." }, { status: 403 });
    }
  }

  const context = contextFromRequest(request);
  const webhookUrl = DEFAULT_SHEETS_WEBHOOK;
  const payload = {
    type: "feedback",
    name: user.name || "Student",
    phone: "",
    email: user.email,
    course: `Content Creation · Module ${moduleNumber.padStart(2, "0")} · Lesson ${lessonIndex} — ${found.lesson.title}`,
    message: `${rating > 0 ? `Rating: ${rating}/5\n` : ""}${message}`,
    source: `Lesson feedback (${found.lesson.id})`,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Sheets webhook responded ${response.status}`);
    }
  } catch (error) {
    console.error("Unable to store lesson feedback:", error);
    await logServerEvent({
      event_name: "lesson_feedback_failed",
      path: "/api/feedback",
      ...context,
      user_id: user.id,
      metadata: { lessonId, rating },
    });
    return NextResponse.json(
      { error: "We could not save your feedback. Please message us on WhatsApp." },
      { status: 502 }
    );
  }

  await logServerEvent({
    event_name: "lesson_feedback",
    path: "/api/feedback",
    ...context,
    user_id: user.id,
    email: user.email,
    metadata: { lessonId, moduleNumber, lessonIndex, rating },
  });

  return NextResponse.json({ ok: true });
}
