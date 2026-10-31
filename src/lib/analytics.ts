import crypto from "node:crypto";
import { getAuthUser } from "@/lib/auth/session";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export const TRACKED_EVENTS = new Set([
  "page_view",
  "cta_click",
  "checkout_start",
  "checkout_order_created",
  "checkout_error",
  "payment_verified",
  "payment_failed",
  "access_verify",
  "claim_success",
  "claim_failed",
  "login_success",
  "login_failed",
  "logout",
  "dashboard_view",
  "lesson_view",
  "lesson_play",
  "video_progress",
  "lesson_complete",
  "progress_saved",
]);

export interface AnalyticsEvent {
  event_name: string;
  user_id?: string | null;
  email?: string | null;
  session_id?: string | null;
  path?: string | null;
  referrer?: string | null;
  referrer_host?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  device_type?: string | null;
  browser?: string | null;
  os?: string | null;
  country?: string | null;
  region?: string | null;
  city?: string | null;
  ip_hash?: string | null;
  duration_seconds?: number | null;
  value?: number | null;
  metadata?: Record<string, unknown>;
}

const MAX_METADATA_BYTES = 2000;

function safeString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function safeNumber(value: unknown, max: number): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.max(0, Math.min(Math.round(value), max));
}

export function parseUserAgent(ua: string) {
  const lower = ua.toLowerCase();
  const deviceType = /ipad|tablet|playbook|silk/.test(lower)
    ? "tablet"
    : /mobi|android|iphone|ipod/.test(lower)
      ? "mobile"
      : "desktop";

  let browser = "other";
  if (/instagram/.test(lower)) browser = "instagram";
  else if (/fban|fbav|facebook/.test(lower)) browser = "facebook";
  else if (/whatsapp/.test(lower)) browser = "whatsapp";
  else if (/edg\//.test(lower)) browser = "edge";
  else if (/opr\/|opera/.test(lower)) browser = "opera";
  else if (/chrome|crios/.test(lower)) browser = "chrome";
  else if (/firefox|fxios/.test(lower)) browser = "firefox";
  else if (/safari/.test(lower)) browser = "safari";

  let os = "other";
  if (/android/.test(lower)) os = "android";
  else if (/iphone|ipad|ipod/.test(lower)) os = "ios";
  else if (/windows/.test(lower)) os = "windows";
  else if (/mac os|macintosh/.test(lower)) os = "macos";
  else if (/linux/.test(lower)) os = "linux";

  return { deviceType, browser, os };
}

export function hashIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for") || "";
  const ip = forwarded.split(",")[0]?.trim() || headers.get("x-real-ip") || "";
  if (!ip) return null;
  const salt = process.env.ANALYTICS_SALT || "creators-college-analytics";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 24);
}

export function geoFromHeaders(headers: Headers) {
  const decode = (value: string | null) => {
    if (!value) return null;
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  };
  return {
    country: decode(headers.get("x-vercel-ip-country")),
    region: decode(headers.get("x-vercel-ip-country-region")),
    city: decode(headers.get("x-vercel-ip-city")),
  };
}

function referrerHost(referrer: string | null): string | null {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function contextFromRequest(request: Request) {
  const agent = parseUserAgent(request.headers.get("user-agent") || "");
  return {
    device_type: agent.deviceType,
    browser: agent.browser,
    os: agent.os,
    ...geoFromHeaders(request.headers),
    ip_hash: hashIp(request.headers),
  };
}

export function normalizeEvent(
  raw: unknown,
  context: {
    user?: { id: string; email: string } | null;
    userAgent?: { deviceType: string; browser: string; os: string };
    geo?: { country: string | null; region: string | null; city: string | null };
    ipHash?: string | null;
  }
): AnalyticsEvent | null {
  if (!raw || typeof raw !== "object") return null;
  const input = raw as Record<string, unknown>;
  const eventName = safeString(input.event_name, 60);
  if (!eventName || !TRACKED_EVENTS.has(eventName)) return null;

  let path = safeString(input.path, 300);
  if (path && /^https?:\/\//i.test(path)) {
    try {
      path = new URL(path).pathname.slice(0, 300);
    } catch {
      path = null;
    }
  }

  const referrer = safeString(input.referrer, 500);
  let metadata: Record<string, unknown> | undefined;
  if (input.metadata && typeof input.metadata === "object" && !Array.isArray(input.metadata)) {
    const serialized = JSON.stringify(input.metadata);
    if (serialized.length <= MAX_METADATA_BYTES) {
      metadata = input.metadata as Record<string, unknown>;
    }
  }

  return {
    event_name: eventName,
    user_id: context.user?.id ?? null,
    email: context.user?.email?.toLowerCase() ?? null,
    session_id: safeString(input.session_id, 64),
    path,
    referrer,
    referrer_host: referrerHost(referrer),
    utm_source: safeString(input.utm_source, 100),
    utm_medium: safeString(input.utm_medium, 100),
    utm_campaign: safeString(input.utm_campaign, 150),
    utm_content: safeString(input.utm_content, 150),
    utm_term: safeString(input.utm_term, 150),
    device_type: context.userAgent?.deviceType ?? null,
    browser: context.userAgent?.browser ?? null,
    os: context.userAgent?.os ?? null,
    country: context.geo?.country ?? null,
    region: context.geo?.region ?? null,
    city: context.geo?.city ?? null,
    ip_hash: context.ipHash ?? null,
    duration_seconds: safeNumber(input.duration_seconds, 86400),
    value: safeNumber(input.value, 10000000),
    metadata: metadata ?? {},
  };
}

export async function insertAnalyticsEvents(events: AnalyticsEvent[]) {
  if (!events.length || !isSupabaseConfigured()) return;
  try {
    const { error } = await getSupabaseAdmin().from("analytics_events").insert(events);
    if (error) console.error("analytics insert failed:", error.message);
  } catch (error) {
    console.error("analytics insert failed:", error);
  }
}

export async function logServerEvent(
  event: Omit<AnalyticsEvent, "user_id" | "email"> & { user_id?: string | null; email?: string | null }
) {
  await insertAnalyticsEvents([{ metadata: {}, ...event }]);
}

export async function getTrackingUser() {
  try {
    const user = await getAuthUser();
    return user ? { id: user.id, email: user.email } : null;
  } catch {
    return null;
  }
}
