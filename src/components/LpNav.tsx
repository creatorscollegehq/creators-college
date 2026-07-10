"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";

function CountdownTimer() {
  const [time, setTime] = useState({ h: 11, m: 47, s: 59 });
  useEffect(() => {
    let endTime: number;
    try {
      const stored = localStorage.getItem("cc_lp_timer_end");
      endTime = stored ? Number(stored) : Date.now() + 12 * 60 * 60 * 1000;
      if (!stored) localStorage.setItem("cc_lp_timer_end", String(endTime));
    } catch { endTime = Date.now() + 12 * 60 * 60 * 1000; }
    const tick = setInterval(() => {
      const diff = Math.max(0, endTime - Date.now());
      setTime({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
      if (diff === 0) clearInterval(tick);
    }, 1000);
    return () => clearInterval(tick);
  }, []);
  const f = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-1 font-mono font-black">
      {[f(time.h), f(time.m), f(time.s)].map((v, i) => (
        <React.Fragment key={i}>
          <span className="bg-white/25 text-white px-2 py-0.5 rounded text-xs sm:text-sm min-w-[26px] text-center">{v}</span>
          {i < 2 && <span className="text-white/70 text-xs">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

interface LpNavProps {
  onEnroll?: () => void;
}

export default function LpNav({ onEnroll }: LpNavProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Top urgency timer strip */}
      <div className="w-full bg-brand-orange text-white py-2 px-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-[11px] sm:text-xs font-bold z-50 relative">
        <span>🔥 BATCH OFFER ENDS IN:</span>
        <CountdownTimer />
        <span className="hidden sm:inline">— Only <strong>5 Seats Left!</strong></span>
      </div>

      {/* Sticky minimal nav */}
      <nav className={`sticky top-0 z-40 transition-all duration-200 border-b border-gray-100 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <img
              src="/logo/2 Horizontal Logo.png"
              alt="Creators College Logo"
              className="h-9 sm:h-12 w-auto object-contain dark-logo-stroke"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
            <Link href="/" className="hover:text-brand-orange transition">Home</Link>
            <Link href="/about" className="hover:text-brand-orange transition">About Us</Link>
            <Link href="/courses" className="hover:text-brand-orange transition">Courses</Link>
            <Link href="/blog" className="hover:text-brand-orange transition">Blog</Link>
            <Link href="/contact" className="hover:text-brand-orange transition">Contact Us</Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <a
              href="tel:+918143937367"
              className="hidden sm:flex items-center gap-1.5 text-brand-blue font-bold text-xs border border-brand-blue/20 px-3 py-2 rounded-full hover:bg-brand-blue/5 transition"
            >
              <Phone size={12} /> +91 81439 37367
            </a>
            <button
              onClick={onEnroll}
              id="nav-cta-btn"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-black px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm transition flex items-center gap-1.5 shadow-md shadow-brand-orange/20 active:scale-95 whitespace-nowrap"
            >
              Enroll Now <ChevronRight size={13} />
            </button>
          </div>

        </div>
      </nav>
    </>
  );
}
