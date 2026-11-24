"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Phone-only purchase bar that appears once the hero CTA scrolls away. */
export default function AdsStickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setShow(window.scrollY > 620);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#08122e]/95 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2.5 backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0">
          <p className="text-[15px] font-bold leading-none text-white">
            ₹1,999 <span className="text-[11px] font-medium text-white/50 line-through">₹30,000</span>
          </p>
          <p className="mt-1 text-[11px] text-[#FFC93C]">Launch price · limited seats</p>
        </div>
        <Link
          href="/checkout"
          prefetch={false}
          className="ml-auto inline-flex shrink-0 items-center justify-center rounded-xl bg-brand-orange px-5 py-3 text-[15px] font-bold text-white shadow-lg shadow-brand-orange/25 active:scale-[0.98]"
        >
          Enroll Now
        </Link>
      </div>
    </div>
  );
}
