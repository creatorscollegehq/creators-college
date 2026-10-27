"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import WhatsAppIcon from "./WhatsAppIcon";

export default function HomeStickyBar() {
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateStickyBar = () => {
      frame = 0;
      setShowStickyBar(window.scrollY > 560);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateStickyBar);
    };
    updateStickyBar();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur transition-transform duration-300 dark:border-white/10 dark:bg-[#0b1220]/95 lg:hidden ${
        showStickyBar ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold leading-none text-[#0B1B4B] dark:text-white">₹5,000</span>
            <span className="text-[11px] text-gray-400 line-through">₹30,000</span>
          </div>
          <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">Offer Price · Only</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/918143937367?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20Telugu%20Content%20Creation%20Course"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-[#0B1B4B] dark:border-white/15 dark:text-white"
          >
            <WhatsAppIcon size={18} className="text-[#25D366]" />
          </a>
          <Link prefetch={false}
            href="/checkout"
            className="inline-flex items-center justify-center rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white shadow-md shadow-brand-orange/25"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}
