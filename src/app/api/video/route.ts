import { NextResponse } from "next/server";
import { getCurrentAccess } from "@/lib/access";
import { findLesson, videoKeyFor } from "@/lib/courseContent";
import { getSignedVideoUrl, isVideoStorageConfigured } from "@/lib/videoStorage";

export const dynamic = "force-dynamic";

/**
 * Hands the player a fresh signed URL for one lesson. The page already embeds a
 * signed URL, but those expire; if a lesson sits open (or the CDN rejects a
 * stale signature) the player asks this route for a new one instead of showing
 * a dead video forever.
 */
export async function GET(request: Request) {
  const access = await getCurrentAccess();
  if (!access) {
    return NextResponse.json({ error: "Sign in with your purchased email to watch." }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const moduleNumber = (searchParams.get("module") ?? "").trim();
  const lessonIndex = Number.parseInt(searchParams.get("lesson") ?? "", 10);
  const found = findLesson(moduleNumber, lessonIndex);

  if (!found) {
    return NextResponse.json({ error: "Lesson not found." }, { status: 404 });
  }

  if (!isVideoStorageConfigured()) {
    return NextResponse.json(
      { error: "Video storage is not connected on this deployment." },
      { status: 503 }
    );
  }

  const url = await getSignedVideoUrl(
    videoKeyFor(found.lesson.moduleNumber, found.lesson.lessonIndex)
  );

  if (!url) {
    return NextResponse.json({ error: "This lesson video is not uploaded yet." }, { status: 404 });
  }

  return NextResponse.json(
    { url },
    { headers: { "Cache-Control": "no-store" } }
  );
}
