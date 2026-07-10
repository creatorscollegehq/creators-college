"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";

function CountdownTimer({ small = false }: { small?: boolean }) {
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
  if (small) return (
    <span className="font-mono font-bold text-brand-orange text-sm tracking-wider">
      {f(time.h)}:{f(time.m)}:{f(time.s)}
    </span>
  );
  return (
    <div className="flex items-center gap-1 font-mono font-black">
      {[f(time.h), f(time.m), f(time.s)].map((v, i) => (
        <React.Fragment key={i}>
          <span className="bg-white/20 text-white px-2 py-0.5 rounded text-sm min-w-[30px] text-center">{v}</span>
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
      {/* Top urgency strip */}
      <div className="w-full bg-brand-orange text-white text-center py-2 px-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-[11px] sm:text-xs font-bold z-50 relative">
        <span className="hidden sm:inline">🔥 OFFER ENDS IN:</span>
        <span className="inline sm:hidden">🔥</span>
        <CountdownTimer />
        <span className="hidden sm:inline">— Only <strong>5 Seats Left</strong> in This Batch!</span>
        <span className="inline sm:hidden font-bold">5 Seats Left!</span>
      </div>
      {/* Minimal sticky sales nav */}
      <nav className={`sticky top-0 z-40 transition-all duration-200 ${scrolled ? "bg-white/98 shadow-md" : "bg-white"} border-b border-gray-100`}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <Image src="/logo/logo.png" alt="Creators College" width={130} height={34} className="h-8 w-auto object-contain" priority />
          </Link>
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
            <span className="text-green-600 font-bold">●</span>
            <span>Counselor available now · Calls back in <strong className="text-brand-blue">30 mins</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <a href="tel:+918143937367" className="hidden sm:flex items-center gap-1.5 text-brand-blue font-bold text-xs border border-brand-blue/20 px-3 py-2 rounded-full hover:bg-brand-blue/5 transition">
              <Phone size={12} /> +91 8143937367
            </a>
            <button
              onClick={onEnroll}
              id="nav-cta-btn"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-black px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm transition flex items-center gap-1.5 shadow-md shadow-brand-orange/20 active:scale-95"
            >
              Enroll Now <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
