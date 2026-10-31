"use client";

const SESSION_KEY = "cc_session_id";
const ATTRIBUTION_KEY = "cc_attribution";

interface Attribution {
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

type QueuedEvent = Record<string, unknown>;

const queue: QueuedEvent[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;

function sessionId(): string | undefined {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now());
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return undefined;
  }
}

function attribution(): Attribution {
  try {
    const stored = sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) return JSON.parse(stored) as Attribution;
  } catch {
    // fall through and recompute
  }

  const params = new URLSearchParams(window.location.search);
  const referrer =
    document.referrer && !document.referrer.startsWith(window.location.origin)
      ? document.referrer.slice(0, 500)
      : undefined;
  const value: Attribution = {
    referrer,
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_content: params.get("utm_content") || undefined,
    utm_term: params.get("utm_term") || undefined,
  };

  try {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(value));
  } catch {
    // storage may be unavailable; keep the in-memory value
  }
  return value;
}

function flush(useBeacon = false) {
  if (!queue.length) return;
  const events = queue.splice(0, 25);
  const payload = JSON.stringify({ events });

  if (useBeacon && typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
  } else {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {
      // tracking must never surface errors to the user
    });
  }

  if (queue.length) scheduleFlush(0);
}

function scheduleFlush(delay = 1200) {
  if (timer) return;
  timer = setTimeout(() => {
    timer = null;
    flush();
  }, delay);
}

export function track(
  eventName: string,
  metadata?: Record<string, unknown>,
  options?: { durationSeconds?: number; value?: number }
) {
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  if (path.startsWith("/admin") || path.startsWith("/studio")) return;

  const attr = attribution();
  queue.push({
    event_name: eventName,
    path,
    session_id: sessionId(),
    ...attr,
    duration_seconds: options?.durationSeconds,
    value: options?.value,
    metadata: metadata ?? {},
  });

  if (queue.length >= 20) {
    flush();
  } else {
    scheduleFlush();
  }
}

if (typeof window !== "undefined") {
  const trackedWindow = window as Window & { __ccTrackBound?: boolean };
  if (!trackedWindow.__ccTrackBound) {
    trackedWindow.__ccTrackBound = true;
    window.addEventListener("pagehide", () => flush(true));
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flush(true);
    });
  }
}
