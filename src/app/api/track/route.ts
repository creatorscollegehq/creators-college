import { NextResponse, type NextRequest } from "next/server";
import {
  geoFromHeaders,
  getTrackingUser,
  hashIp,
  insertAnalyticsEvents,
  normalizeEvent,
  parseUserAgent,
} from "@/lib/analytics";

export const dynamic = "force-dynamic";

const buckets = new Map<string, { count: number; resetAt: number }>();

function withinRateLimit(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    if (buckets.size > 500) buckets.clear();
    buckets.set(key, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (bucket.count >= 240) return false;
  bucket.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > 64_000) return new NextResponse(null, { status: 204 });

    const body = (await request.json().catch(() => null)) as
      | { events?: unknown[]; event?: unknown }
      | null;
    const rawEvents = Array.isArray(body?.events)
      ? body.events
      : body?.event
        ? [body.event]
        : [];
    if (!rawEvents.length) return new NextResponse(null, { status: 204 });

    const user = await getTrackingUser();
    const userAgent = parseUserAgent(request.headers.get("user-agent") || "");
    const geo = geoFromHeaders(request.headers);
    const ipHash = hashIp(request.headers);

    const first = (rawEvents[0] ?? null) as Record<string, unknown> | null;
    const sessionId = typeof first?.session_id === "string" ? first.session_id.slice(0, 64) : null;
    if (!withinRateLimit(sessionId || ipHash || "anonymous")) {
      return new NextResponse(null, { status: 204 });
    }

    const events = rawEvents
      .slice(0, 25)
      .map((event) => normalizeEvent(event, { user, userAgent, geo, ipHash }))
      .filter((event): event is NonNullable<typeof event> => Boolean(event));

    await insertAnalyticsEvents(events);
  } catch (error) {
    console.error("track route failed:", error);
  }

  return new NextResponse(null, { status: 204 });
}
