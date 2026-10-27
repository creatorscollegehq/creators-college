"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, X } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

const WHATSAPP_URL =
  "https://wa.me/918143937367?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20Telugu%20Content%20Creation%20Course";

export default function CroExitPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("cc_exit_popup_seen")) return;

    let armed = false;
    let shown = false;
    let frame = 0;
    let scrollAttached = false;

    const showPopup = () => {
      if (shown || sessionStorage.getItem("cc_exit_popup_seen")) return;
      shown = true;
      sessionStorage.setItem("cc_exit_popup_seen", "1");
      setOpen(true);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollable > 0 && window.scrollY / scrollable > 0.85) showPopup();
      });
    };

    const attachScroll = () => {
      if (scrollAttached) return;
      scrollAttached = true;
      window.addEventListener("scroll", onScroll, { passive: true });
    };

    const armTimer = setTimeout(() => {
      armed = true;
      attachScroll();
    }, 12000);

    const fallbackTimer = setTimeout(showPopup, 75000);

    const onMouseOut = (event: MouseEvent) => {
      if (!armed || event.relatedTarget) return;
      if (event.clientY <= 0) showPopup();
    };

    document.addEventListener("mouseout", onMouseOut);

    return () => {
      clearTimeout(armTimer);
      clearTimeout(fallbackTimer);
      if (frame) window.cancelAnimationFrame(frame);
      document.removeEventListener("mouseout", onMouseOut);
      if (scrollAttached) window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#0d1424] sm:p-7">
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-white"
          aria-label="Close popup"
        >
          <X size={18} />
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-orange">
          Before you go
        </span>
        <h3 className="mt-3 pr-6 text-2xl font-bold leading-tight text-[#0B1B4B] dark:text-white">
          Not sure if this course is right for you?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          Talk to our team on WhatsApp. We will answer your questions and help you decide — no pressure.
        </p>

        <div className="mt-4 rounded-xl border border-brand-orange/15 bg-[#FFF8ED] px-3.5 py-3 dark:border-brand-orange/20 dark:bg-brand-orange/10">
          <p className="text-xs font-bold text-[#0B1B4B] dark:text-white">
            Launch offer: ₹30,000 course at ₹5,000
          </p>
          <p className="mt-1 text-[11px] text-gray-600 dark:text-gray-300">
            Admissions open for the current batch · Save ₹25,000
          </p>
        </div>

        <Link prefetch={false}
          href="/checkout"
          onClick={() => setOpen(false)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition hover:bg-brand-orange-dark"
        >
          Enroll Now — ₹5,000
          <ArrowRight size={16} />
        </Link>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
        >
          <WhatsAppIcon size={16} />
          Chat on WhatsApp
        </a>

        <button
          onClick={() => setOpen(false)}
          className="mt-3 w-full text-center text-xs font-medium text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
        >
          No thanks, continue browsing
        </button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
          <ShieldCheck size={12} />
          Secure payment · Access details on WhatsApp
        </p>
      </div>
    </div>
  );
}
