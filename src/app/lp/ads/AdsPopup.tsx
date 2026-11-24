"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AdsCountdown from "./AdsCountdown";

const SEEN_KEY = "cc_ads_popup";
const DELAY_MS = 18000;

/**
 * One reminder per session: a visitor who is about to leave, or who has been
 * reading for a while, gets the price and a single enroll button. Nothing else.
 */
export default function AdsPopup() {
  const [open, setOpen] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      // storage blocked: still show the reminder once per page view
    }

    let timer = 0;

    const show = () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // ignore
      }
      setOpen(true);
    };

    // Desktop exit intent: the pointer leaving through the top of the window.
    const onMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 0) show();
    };

    timer = window.setTimeout(show, DELAY_MS);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    ctaRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#0B1B4B]/45 p-3 backdrop-blur-[2px] sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ads-popup-title"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-5 text-[#0B1B4B] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#C2410C]">
            Before you go
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="-mr-1 -mt-1 flex h-7 w-7 items-center justify-center rounded-full text-[#9AA3B2] transition hover:bg-[#F1F5F9] hover:text-[#0B1B4B]"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <h2 id="ads-popup-title" className="mt-1 text-[1.2rem] font-extrabold leading-snug">
          Your ₹1,999 seat is still open
        </h2>
        <p className="mt-1.5 text-[0.82rem] leading-relaxed text-[#4B5563]">
          296 Telugu lessons + lifetime access. This launch price goes back to ₹30,000 when the
          timer ends.
        </p>

        <p className="mt-3 rounded-xl bg-[#FFF7ED] px-3 py-2 text-center text-[0.85rem] font-bold tabular-nums text-[#C2410C]">
          Ends in <AdsCountdown />
        </p>

        <Link
          ref={ctaRef}
          href="/checkout"
          prefetch={false}
          className="mt-3 flex w-full items-center justify-center rounded-xl bg-[#F97316] px-5 py-3.5 text-[0.95rem] font-bold text-white shadow-[0_12px_26px_-12px_rgba(249,115,22,0.9)] transition hover:bg-[#EA580C] active:scale-[0.99]"
        >
          Enroll Now — ₹1,999
        </Link>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-2 w-full py-2 text-[0.75rem] font-semibold text-[#6B7280] transition hover:text-[#0B1B4B]"
        >
          No thanks, I&apos;ll decide later
        </button>
      </div>
    </div>
  );
}
