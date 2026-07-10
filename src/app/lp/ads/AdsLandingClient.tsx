"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Check, ChevronRight, MessageSquare, Shield,
  ChevronDown, X, Star, Flame, BadgeCheck, TrendingUp,
  Phone, AlertTriangle, Clock, Zap
} from "lucide-react";
import LpNav from "@/components/LpNav";

// ─── Live Seat Counter ──────────────────────────────────────────
const TOTAL_SEATS = 12;
function useSeatsLeft() {
  const [seats, setSeats] = useState(5);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cc_seats_v2");
      if (stored) { setSeats(Number(stored)); return; }
      localStorage.setItem("cc_seats_v2", "5");
    } catch {}
    const t = setInterval(() => {
      setSeats(prev => {
        if (prev <= 2) { clearInterval(t); return prev; }
        const next = prev - 1;
        try { localStorage.setItem("cc_seats_v2", String(next)); } catch {}
        return next;
      });
    }, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, []);
  return seats;
}

// ─── Form ───────────────────────────────────────────────────────
function EnrollForm({ source = "Ads LP", onSuccess, compact }: { source?: string; onSuccess?: () => void; compact?: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Enter your name";
    if (!phone.trim() || !/^[0-9]{10}$/.test(phone.replace(/[\s\-\+]/g, ""))) e.phone = "Enter valid 10-digit number";
    setErrors(e); return !Object.keys(e).length;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault(); if (!validate()) return;
    setLoading(true);
    const eid = `ads_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    if (typeof window !== "undefined" && (window as any).fbq)
      (window as any).fbq("track", "Lead", { content_name: "Ads LP", value: 0, currency: "INR" }, { eventID: eid });
    fetch("/api/meta-capi", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, eventId: eid, url: typeof window !== "undefined" ? window.location.href : "", source, eventName: "Lead" }) }).catch(() => {});
    try { await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, course: "Complete Telugu Content Creation Course", source: `🎯 ${source}`, type: "ads" }) }); } catch {}
    setLoading(false); setDone(true); onSuccess?.();
  };

  if (done) return (
    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center space-y-3">
      <div className="text-4xl">🎉</div>
      <div className="font-black text-green-700 text-lg">You&apos;re In!</div>
      <p className="text-sm text-green-600">Our counselor will call <strong>{phone}</strong> within 30 mins.</p>
      <a href={`https://wa.me/918143937367?text=${encodeURIComponent(`Hi! I registered at Creators College. Name: ${name}, Phone: ${phone}`)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl text-sm transition">
        <MessageSquare size={15} /> Confirm on WhatsApp
      </a>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <input id={`${source}-name`} type="text" placeholder="Your Full Name (e.g. Rahul Sharma)" value={name}
          onChange={e => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: "" })); }}
          className={`w-full px-4 ${compact ? "py-3" : "py-4"} rounded-xl border-2 text-sm bg-white text-brand-charcoal placeholder:text-gray-400 focus:outline-none focus:border-brand-blue/50 transition ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}
        />
        {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
      </div>
      <div>
        <input id={`${source}-phone`} type="tel" placeholder="Contact No. (e.g. 9876543210)" value={phone}
          onChange={e => { setPhone(e.target.value); if (errors.phone) setErrors(p => ({ ...p, phone: "" })); }}
          className={`w-full px-4 ${compact ? "py-3" : "py-4"} rounded-xl border-2 text-sm bg-white text-brand-charcoal placeholder:text-gray-400 focus:outline-none focus:border-brand-blue/50 transition ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"}`}
        />
        {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
      </div>
      <button id={`${source}-submit`} type="submit" disabled={loading}
        className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-black py-4 rounded-xl text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/30 active:scale-[0.98] disabled:opacity-70">
        {loading
          ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Booking...</span>
          : <><Flame size={16} /> Get FREE Demo Class — ₹0 Cost</>
        }
      </button>
      <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
        <span className="flex items-center gap-1"><Shield size={9} className="text-green-500" /> Instant Setup</span>
        <span>·</span>
        <span className="flex items-center gap-1"><Clock size={9} /> Call in 30 min</span>
        <span>·</span>
        <span className="flex items-center gap-1"><BadgeCheck size={9} className="text-brand-blue" /> Career Session</span>
      </div>
    </form>
  );
}

// ─── Popup ──────────────────────────────────────────────────────
function PopupModal({ isOpen, onClose, seats }: { isOpen: boolean; onClose: () => void; seats: number }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition z-10">
          <X size={16} />
        </button>
        <div className="bg-gradient-to-r from-brand-blue to-[#0d2254] px-6 pt-7 pb-5 text-white text-center">
          <div className="inline-flex items-center gap-1.5 bg-red-500/20 border border-red-400/30 text-red-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
            <AlertTriangle size={10} /> Only {seats} Seats Left
          </div>
          <h3 className="text-xl font-black leading-tight">Get FREE Demo Class<br /><span className="text-brand-orange">Details on WhatsApp Now</span></h3>
          <p className="text-white/60 text-xs mt-1">Counselor will call within 30 minutes</p>
        </div>
        <div className="p-5 sm:p-6">
          <EnrollForm source="Popup" onSuccess={onClose} compact />
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────
export default function AdsLandingPageClient() {
  const [popup, setPopup] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const seats = useSeatsLeft();
  const formRef = useRef<HTMLDivElement>(null);
  const popupShown = useRef(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("ads_popup_shown")) return;
    } catch {}
    const t = setTimeout(() => {
      if (!popupShown.current) {
        setPopup(true); popupShown.current = true;
        try { sessionStorage.setItem("ads_popup_shown", "1"); } catch {}
      }
    }, 30000);
    return () => clearTimeout(t);
  }, []);

  const openPopup = () => { setPopup(true); popupShown.current = true; };
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  const faqs = [
    { q: "Do I need a DSLR or expensive camera?", a: "No. We teach you to shoot professional videos with just your smartphone. Most students start with a basic Android phone worth ₹10,000." },
    { q: "Can I do this online from any city?", a: "Yes — 100% online with live sessions + full recordings. Attend from anywhere in India. Offline batches in Hyderabad also available." },
    { q: "I have zero experience. Will this work?", a: "Absolutely. The course is built from ground zero. No prior editing, scripting, or social media knowledge needed." },
    { q: "How much can I earn after completing the course?", a: "Students earn ₹20K to ₹2L+ per month through YouTube, brand deals, UGC freelancing & social media management — based on effort and niche." },
    { q: "What is the course fee?", a: "Fill the form and our counselor shares the current discounted fee, EMI options, and offers — directly on WhatsApp." },
  ];

  return (
    <div className="w-full bg-white min-h-screen">

      {/* ── Nav (urgency strip + nav) ── */}
      <LpNav onEnroll={openPopup} />

      {/* ── Red Seats Alert ── */}
      <div className="w-full bg-red-600 text-white text-center py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2">
        <AlertTriangle size={12} className="shrink-0 animate-pulse" />
        <span>Only <strong>{seats} of {TOTAL_SEATS} seats</strong> remaining — Batch closes when full</span>
      </div>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#040e24] via-brand-blue to-[#0b1f4d] text-white px-4 pt-8 pb-10 sm:pt-12 sm:pb-14">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 lg:items-start">

            {/* ── PITCH HEADING (Top on mobile, left column on desktop) ── */}
            <div className="order-1 lg:col-span-7 space-y-5 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                <Flame size={11} /> New Batch · Telugu Medium · {seats} Seats Left
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[3rem] font-black tracking-tight leading-[1.08]">
                Earn ₹50K–₹2 Lakhs/Month<br />
                <span className="text-brand-orange">From Your Phone — 8 Weeks</span>
              </h1>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                Trusted by <strong className="text-white">2,000+ businesses</strong>. Master content creation, video editing &amp; social media growth — 100% in Telugu.
              </p>
            </div>

            {/* ── FORM (Second on mobile, right column on desktop) ── */}
            <div ref={formRef} className="order-2 lg:col-span-5 w-full lg:row-span-2">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Form header */}
                <div className="bg-brand-orange px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white/75 text-[10px] font-bold uppercase tracking-widest">⚡ Zero Cost · Free Demo</div>
                      <div className="text-white font-black text-lg leading-tight mt-0.5">Book Your Seat Now</div>
                    </div>
                    <div className="bg-white/20 rounded-xl px-3 py-1.5 text-center">
                      <div className="text-white font-black text-lg leading-none">{seats}</div>
                      <div className="text-white/70 text-[9px] leading-none mt-0.5">Seats Left</div>
                    </div>
                  </div>
                  {/* Social proof mini */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex -space-x-1.5">
                      {["👨‍💻", "👩‍🎤", "👨‍🎨", "👩‍💼"].map((e, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs border border-white/30">{e}</div>
                      ))}
                    </div>
                    <span className="text-white/80 text-[10px]"><strong className="text-white">28 people</strong> enrolled this week</span>
                  </div>
                </div>
                <div className="p-5">
                  <EnrollForm source="Hero Form" />
                </div>
              </div>
            </div>

            {/* ── SUPPORTING DETAILS: CHECKLIST & STATS (Third on mobile, below heading on desktop) ── */}
            <div className="order-3 lg:col-span-7 space-y-5">
              {/* Is this you? */}
              <div className="bg-white/8 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="text-xs font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1.5">
                  <Zap size={12} /> Is This You?
                </div>
                {[
                  "You want to earn online but don't know where to start",
                  "You see others earning from YouTube/Instagram but not you",
                  "You've tried posting content but got 0 results",
                  "You want a real skill — not another course to collect",
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-white/80">
                    <div className="w-4 h-4 rounded-full bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={9} className="text-brand-orange stroke-[3]" />
                    </div>
                    {t}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { n: "100%", l: "Practical Learning" },
                  { n: "2,000+", l: "Businesses" },
                  { n: "4.9 ★", l: "Average Rating" },
                ].map((s, i) => (
                  <div key={i} className="bg-white/10 border border-white/10 rounded-xl p-2.5 text-center">
                    <div className="text-lg sm:text-xl font-black text-white">{s.n}</div>
                    <div className="text-[9px] sm:text-[10px] text-white/50 leading-tight">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              <button onClick={scrollToForm}
                className="w-full lg:hidden bg-brand-orange hover:bg-brand-orange-dark text-white font-black py-4 rounded-xl text-base flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition">
                <Flame size={16} /> Book FREE Demo Class Now <ChevronRight size={15} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── Loss Aversion ── */}
      <section className="py-8 px-4 bg-red-50 border-y border-red-100">
        <div className="max-w-3xl mx-auto text-center space-y-2">
          <div className="text-xl font-black text-red-700">⚠️ Every Day You Wait = Money You&apos;re Losing</div>
          <p className="text-sm text-red-600/80 max-w-lg mx-auto">
            Creators in your city — with the same phone as you — are already earning ₹50,000/month. The only difference? <strong>They started.</strong> The next batch after this one is <strong>3 months away.</strong>
          </p>
          <button onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black px-7 py-3.5 rounded-full text-sm transition mt-1 shadow-lg active:scale-95">
            I Don&apos;t Want to Miss This Batch <ChevronRight size={14} />
          </button>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section className="py-12 sm:py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">8-Week Program</div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue">From Zero to Earning — Step by Step</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { w: "Week 1–2", t: "Mobile Camera & Setup", d: "No DSLR. Shoot professional videos with your phone. Lighting, audio, zero-cost home studio.", icon: "📱" },
              { w: "Week 3–4", t: "Scripting & Hook Formulas", d: "3-second hooks, viral frameworks, topic research, and scripts that get real views and retention.", icon: "✍️" },
              { w: "Week 5–6", t: "Video Editing (CapCut + PC)", d: "Mobile & PC editing, reels format, transitions, sound design, subtitles — everything.", icon: "🎬" },
              { w: "Week 7–8", t: "Growth & Income Streams", d: "YouTube SEO, Instagram algorithm, brand deals, UGC freelancing, multiple income channels.", icon: "💰" },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-brand-orange/20 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{c.icon}</span>
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider">{c.w}</span>
                </div>
                <h3 className="font-black text-brand-blue text-sm mb-1">{c.t}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          {/* Bonuses */}
          <div className="mt-4 bg-brand-blue rounded-2xl p-5 text-white">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-3 flex items-center gap-2">
              <Zap size={13} /> Bonuses Included (Worth ₹15,000)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["Lifetime access to all recorded sessions", "Private WhatsApp mentorship group", "Industry certificate on completion", "1-on-1 portfolio review", "Brand deal pitch templates", "Free course upgrade for 12 months"].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                  <Check size={11} className="text-brand-orange shrink-0 stroke-[3]" /> {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="py-12 sm:py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">Proof It Works</div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue">Students Exactly Like You — Now Earning</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { name: "Rahul K.", role: "YouTube Creator", income: "₹1.2L/month", time: "6 months", emoji: "👨‍💼" },
              { name: "Priya M.", role: "Instagram Creator", income: "50K followers", time: "4 months", emoji: "👩‍💻" },
              { name: "Sai T.", role: "Freelance Editor", income: "₹60K/month", time: "5 months", emoji: "👨‍🎨" },
              { name: "Divya R.", role: "Brand Collab", income: "3 deals/month", time: "3 months", emoji: "👩‍🎤" },
            ].map((r, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{r.emoji}</div>
                <div className="font-black text-brand-blue text-sm">{r.name}</div>
                <div className="text-[10px] text-gray-400 mb-1">{r.role}</div>
                <div className="flex mb-1.5">{[...Array(5)].map((_, i) => <Star key={i} size={9} className="fill-brand-orange text-brand-orange" />)}</div>
                <div className="text-brand-orange font-black text-sm">{r.income}</div>
                <div className="text-[10px] text-gray-400">in {r.time}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-black px-7 py-4 rounded-xl text-sm transition shadow-xl shadow-brand-orange/25 active:scale-95">
              I Want Results Like These <ChevronRight size={15} />
            </button>
            <p className="text-xs text-gray-400 mt-2">Free demo · No payment · 30-min callback</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-12 sm:py-14 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-brand-blue text-center mb-8">Common Questions</h2>
          <div className="space-y-2.5">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <button id={`faq-${i}`} onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center gap-3">
                  <span className="font-bold text-sm text-brand-blue">{f.q}</span>
                  <ChevronDown size={15} className={`text-brand-orange shrink-0 transition-transform duration-200 ${activeFaq === i ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-12 sm:py-14 px-4 bg-gradient-to-br from-brand-blue to-[#0d1e45] text-white">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="text-3xl">🚀</div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Your Creator Career Starts<br />
            <span className="text-brand-orange">With One Decision Today</span>
          </h2>
          <p className="text-white/70 text-sm max-w-md mx-auto">
            <strong className="text-white">{seats} seats remain.</strong> The next batch is 3 months away. Book your free demo now — our counselor calls in 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
            <button onClick={scrollToForm} id="final-enroll-btn"
              className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-black px-8 py-4 rounded-xl text-sm transition shadow-xl shadow-brand-orange/30 active:scale-95 w-full sm:w-auto">
              <Flame size={15} /> Book FREE Demo — {seats} Seats Left
            </button>
            <a href="https://wa.me/918143937367?text=Hi!%20Saw%20your%20ad.%20Tell%20me%20about%20the%20Content%20Creation%20Course."
              target="_blank" rel="noopener noreferrer" id="final-wa-btn"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-4 rounded-xl text-sm transition w-full sm:w-auto">
              <Phone size={14} /> WhatsApp Us
            </a>
          </div>
          <div className="flex items-center justify-center gap-3 text-[11px] text-white/40 pt-1">
            <span className="flex items-center gap-1"><Shield size={10} /> Instant Setup</span>
            <span>·</span>
            <span className="flex items-center gap-1"><BadgeCheck size={10} /> Verified institute</span>
            <span>·</span>
            <span className="flex items-center gap-1"><TrendingUp size={10} /> Live Mentorship</span>
          </div>
        </div>
      </section>

      {/* ── Popup Modal ── */}
      <PopupModal isOpen={popup} onClose={() => setPopup(false)} seats={seats} />

    </div>
  );
}
