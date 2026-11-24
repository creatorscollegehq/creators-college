"use client";

import { useEffect, useState } from "react";

const KEY = "cc_ads_deadline";
const WINDOW_MS = 12 * 60 * 60 * 1000;

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Countdown that keeps one deadline per visitor, so the urgency stays honest
 * on refresh instead of restarting from 12:00:00 every time.
 */
export default function AdsCountdown() {
  const [left, setLeft] = useState(WINDOW_MS);

  useEffect(() => {
    let deadline = Date.now() + WINDOW_MS;
    try {
      const stored = Number(localStorage.getItem(KEY));
      if (stored && stored > Date.now()) {
        deadline = stored;
      } else {
        localStorage.setItem(KEY, String(deadline));
      }
    } catch {
      // storage blocked: keep the in-memory deadline
    }

    const tick = () => setLeft(Math.max(0, deadline - Date.now()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const total = Math.floor(left / 1000);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {pad(Math.floor(total / 3600))}:{pad(Math.floor((total % 3600) / 60))}:{pad(total % 60)}
    </span>
  );
}
