"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Check, ChevronRight, MessageSquare, Shield, Clock,
  ChevronDown, X, Star, Flame, BadgeCheck, TrendingUp,
  Users, Zap, Phone, AlertTriangle
} from "lucide-react";
import LpNav from "@/components/LpNav";

// ─── Seats Counter (fake-real urgency) ──────────────────────────
const TOTAL_SEATS = 12;
function useSeatsLeft() {
  const [seats, setSeats] = useState(5);
  useEffect(() => {
    // Simulate live seat reduction from "other users"
    const stored = localStorage.getItem("cc_seats");
    if (stored) { setSeats(Number(stored)); return; }
    localStorage.setItem("cc_seats", "5");
    const t = setInterval(() => {
      setSeats(prev => {
        if (prev <= 2) { clearInterval(t); return prev; }
        const next = prev - 1;
        localStorage.setItem("cc_seats", String(next));
        return next;
      });
    }, 4 * 60 * 1000); // drops 1 seat every 4 min
    return () => clearInterval(t);
  }, []);
  return seats;
}

// ─── Inline Lead Form ───────────────────────────────────────────
function EnrollForm({ source = "Ads LP Hero", onSuccess }: { source?: string; onSuccess?: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Enter your name";
    if (!phone.trim() || !/^[0-9]{10}$/.test(phone.replace(/[\s\-\+]/g, ""))) e.phone = "Enter valid 10-digit number";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!validate()) return;
    setLoading(true);
    const eid = `ads_${Date.now()}_${Math.random().toString(36).substr(2,9)}`;
    if (typeof window !== "undefined" && (window as any).fbq)
      (window as any).fbq("track","Lead",{content_name:"Ads LP",value:0,currency:"INR"},{eventID:eid});
    fetch("/api/meta-capi",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,phone,eventId:eid,url:window.location.href,source,eventName:"Lead"})}).catch(()=>{});
    try { await fetch("/api/lead",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,phone,course:"Complete Telugu Content Creation Course",source:`🎯 ${source}`,type:"ads"})}); }
    catch {}
    setLoading(false); setDone(true); onSuccess?.();
  };

  if (done) return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center space-y-3">
      <div className="text-4xl">🎉</div>
      <div className="font-black text-green-700 text-lg">You're Registered!</div>
      <p className="text-sm text-green-600">Our counselor will call <strong>{phone}</strong> within 30 mins.</p>
      <a href={`https://wa.me/918143937367?text=${encodeURIComponent(`Hi! I just registered at Creators College. Name: ${name}, Phone: ${phone}`)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-sm transition">
        <MessageSquare size={15}/> Confirm on WhatsApp
      </a>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <input id="ads-name" type="text" placeholder="Your Full Name" value={name}
          onChange={e=>{setName(e.target.value);if(errors.name)setErrors(p=>({...p,name:""}))}}
          className={`w-full px-4 py-3.5 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition ${errors.name?"border-red-400":"border-gray-200"}`}/>
        {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
      </div>
      <div>
        <input id="ads-phone" type="tel" placeholder="WhatsApp Number (10 digits)" value={phone}
          onChange={e=>{setPhone(e.target.value);if(errors.phone)setErrors(p=>({...p,phone:""}))}}
          className={`w-full px-4 py-3.5 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition ${errors.phone?"border-red-400":"border-gray-200"}`}/>
        {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
      </div>
      <button id="ads-submit-btn" type="submit" disabled={loading}
        className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-black py-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/30 active:scale-[0.98] disabled:opacity-70">
        {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Booking...</span>
          : <><Flame size={15}/> Book My FREE Demo Class — 0 Cost</>}
      </button>
      <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
        <Shield size={9} className="text-green-500"/> No payment · No spam · Counselor calls in 30 mins
      </p>
    </form>
  );
}

// ─── Popup Modal ─────────────────────────────────────────────────
function PopupModal({ isOpen, onClose, seats }: { isOpen: boolean; onClose: () => void; seats: number }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition z-10">
          <X size={15}/>
        </button>
        {/* Urgency header */}
        <div className="bg-gradient-to-r from-brand-blue to-[#0d1e45] px-6 pt-6 pb-4 text-white text-center">
          <div className="inline-flex items-center gap-1.5 bg-red-500/20 border border-red-400/30 text-red-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
            <AlertTriangle size={10}/> Only {seats} Seats Left — Batch Filling Fast
          </div>
          <h3 className="text-xl font-black leading-tight">Get <span className="text-brand-orange">FREE Demo Class</span><br/>+ Course Details on WhatsApp</h3>
          <p className="text-white/60 text-xs mt-1">Our counselor will call you within 30 minutes</p>
        </div>
        <div className="p-6">
          <EnrollForm source="Ads LP Popup" onSuccess={onClose}/>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function AdsLandingPageClient() {
  const [popup, setPopup] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const seats = useSeatsLeft();
  const formRef = useRef<HTMLDivElement>(null);
  const popupShown = useRef(false);

  // Auto popup: 30 seconds after page load (only once per session)
  useEffect(() => {
    const shown = sessionStorage.getItem("ads_popup_shown");
    if (shown) return;
    const t = setTimeout(() => {
      if (!popupShown.current) {
        setPopup(true);
        popupShown.current = true;
        sessionStorage.setItem("ads_popup_shown", "1");
      }
    }, 30000);
    return () => clearTimeout(t);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const openPopup = () => {
    setPopup(true);
    popupShown.current = true;
    sessionStorage.setItem("ads_popup_shown", "1");
  };

  const faqs = [
    { q: "Do I need a DSLR or expensive camera?", a: "No. We teach you to produce professional-quality content with just your smartphone. Most students start with a basic Android phone worth ₹10,000." },
    { q: "Is this available online?", a: "Yes — 100% online with live sessions + recordings. You can attend from anywhere in India. We also have offline batches in Hyderabad." },
    { q: "I have zero experience. Will this work?", a: "Absolutely. The course is built from ground zero. No prior editing, scripting, or social media knowledge is required." },
    { q: "How much can I earn after this course?", a: "Our students earn ₹20K–₹2L+ per month through YouTube, brand deals, UGC freelancing, and social media management. Results depend on your effort." },
    { q: "What is the fee?", a: "Fill the form above and our counselor will share the current discounted fee, EMI options, and ongoing offers — directly on your WhatsApp." },
  ];

  const results = [
    { name: "Rahul K.", role: "YouTube Creator", income: "₹1.2L/month", time: "6 months", emoji: "👨‍💼" },
    { name: "Priya M.", role: "Instagram Influencer", income: "50K followers", time: "4 months", emoji: "👩‍💻" },
    { name: "Sai T.", role: "Freelance Editor", income: "₹60K/month", time: "5 months", emoji: "👨‍🎨" },
    { name: "Divya R.", role: "Brand Collab Creator", income: "3 brand deals/mo", time: "3 months", emoji: "👩‍🎤" },
  ];

  return (
    <div className="w-full bg-white dark:bg-[#070d1a] min-h-screen">

      {/* ── Nav (urgency + minimal nav) ── */}
      <LpNav onEnroll={openPopup} />

      {/* ── Seats alert bar ── */}
      <div className="w-full bg-red-600 text-white text-center py-2 px-4 text-xs font-bold flex items-center justify-center gap-2">
        <AlertTriangle size={12} className="shrink-0"/>
        <span>URGENT: Only <strong>{seats} out of {TOTAL_SEATS} seats remaining</strong> in the upcoming batch. Batch closes when full.</span>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#040e24] via-brand-blue to-[#0a1d4a] py-12 sm:py-16 md:py-20 px-4">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl"/>
          <div className="absolute bottom-0 -left-20 w-80 h-80 bg-blue-400/8 rounded-full blur-3xl"/>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">

          {/* Left: Pitch */}
          <div className="lg:col-span-7 text-white space-y-6 order-2 lg:order-1">
            {/* Batch badge */}
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
              <Flame size={11} strokeWidth={2.5}/> New Batch · Telugu Medium · {seats} Seats Left
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-black tracking-tight leading-[1.08]">
                Earn ₹50,000–₹2 Lakhs/Month<br/>
                <span className="text-brand-orange">from Your Phone — in 8 Weeks</span>
              </h1>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl">
                Join <strong className="text-white">1,200+ Telugu students</strong> who turned content creation into a full-time income — through YouTube, Instagram, brand deals & freelance editing.
              </p>
            </div>

            {/* Is this you? checklist */}
            <div className="bg-white/8 border border-white/10 rounded-2xl p-5 space-y-2.5">
              <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1 flex items-center gap-1.5"><Zap size={12}/> Is this you?</div>
              {[
                "You want to earn online but don't know where to start",
                "You have a phone but no idea how to make money with it",
                "You see other creators earning lakhs and wonder how they do it",
                "You've tried YouTube/Instagram but got 0 views",
                "You want a skill that pays — not another certificate to collect",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-white/80">
                  <div className="w-5 h-5 rounded-full bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={10} className="text-brand-orange stroke-[3]"/>
                  </div>
                  {t}
                </div>
              ))}
            </div>

            {/* Trust numbers */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              {[
                { n: "1,200+", l: "Students" },
                { n: "2,000+", l: "Businesses" },
                { n: "4.9★", l: "Rating" },
              ].map((s, i) => (
                <div key={i} className="bg-white/8 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-xl font-black text-white">{s.n}</div>
                  <div className="text-[10px] text-white/50">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div ref={formRef} className="lg:col-span-5 w-full order-1 lg:order-2">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Form header */}
              <div className="bg-brand-orange px-6 py-4">
                <div className="text-white/80 text-[10px] font-bold uppercase tracking-widest">⚡ FREE Demo Class</div>
                <div className="text-white font-black text-xl leading-tight mt-0.5">
                  Book Your Seat — Zero Cost
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex -space-x-1.5">
                    {["👨‍💻","👩‍🎤","👨‍🎨","👩‍💼"].map((e,i)=>(<div key={i} className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs border border-white/30">{e}</div>))}
                  </div>
                  <span className="text-white/80 text-[10px]"><strong className="text-white">23 people</strong> viewed this today</span>
                </div>
              </div>
              <div className="p-6">
                <EnrollForm source="Ads LP Hero Form"/>
              </div>
              {/* Urgency footer */}
              <div className="border-t border-gray-100 bg-red-50 px-6 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0"/>
                <p className="text-xs text-red-600 font-semibold">Only <strong>{seats} seats</strong> remaining in this batch. Secures your spot now.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── What You'll Learn ── */}
      <section className="py-14 sm:py-16 px-4 bg-gray-50 dark:bg-[#0a0f1a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">8-Week Curriculum</div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white">From Zero to Earning — Step by Step</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { w: "Week 1–2", t: "Camera & Mobile Setup", d: "No DSLR needed. Master shooting setups, lighting, audio, and a zero-cost home studio — all with your phone.", icon: "📱" },
              { w: "Week 3–4", t: "Scripting & Hook Formulas", d: "Learn the 3-second hook, viral content frameworks, topic research, and how to write scripts that get views.", icon: "✍️" },
              { w: "Week 5–6", t: "Video Editing (CapCut + PC)", d: "Professional edits, transitions, reels format, subtitles, sound design — taught on both mobile and PC.", icon: "🎬" },
              { w: "Week 7–8", t: "Monetization & Growth", d: "YouTube SEO, Instagram algorithm, brand deals, UGC freelancing, and building multiple income streams.", icon: "💰" },
            ].map((c, i) => (
              <div key={i} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl p-5 hover:shadow-md hover:border-brand-orange/20 transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{c.icon}</span>
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider">{c.w}</span>
                </div>
                <h3 className="font-black text-brand-blue dark:text-white text-sm mb-1.5">{c.t}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          {/* Bonuses */}
          <div className="mt-5 bg-brand-blue text-white rounded-2xl p-5 sm:p-6">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-3 flex items-center gap-2">
              <Zap size={13}/> Free Bonuses Included (Worth ₹15,000)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["Lifetime replay access to all sessions","Private WhatsApp mentorship group","Industry certificate on completion","1-on-1 portfolio review session","Brand deal pitch templates + scripts","Free course upgrade for 12 months"].map((b,i)=>(
                <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                  <Check size={12} className="text-brand-orange shrink-0 stroke-[3]"/>{b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Loss Aversion ── */}
      <section className="py-10 px-4 bg-red-50 dark:bg-red-950/20 border-y border-red-100 dark:border-red-900/20">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="text-2xl">⚠️</div>
          <h2 className="text-xl sm:text-2xl font-black text-red-700 dark:text-red-400">
            Every Day You Wait = Money You&apos;re Losing
          </h2>
          <p className="text-sm text-red-600/80 dark:text-red-400/80 max-w-lg mx-auto">
            Right now, there are creators in your city — with the same phone as you — earning ₹50,000/month. The only difference? <strong>They took action.</strong> This batch fills up fast. The next one starts 3 months later.
          </p>
          <button onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black px-7 py-3.5 rounded-full text-sm transition mt-2 shadow-lg shadow-red-600/20">
            I Don&apos;t Want to Miss This Batch <ChevronRight size={15}/>
          </button>
        </div>
      </section>

      {/* ── Student Results ── */}
      <section className="py-14 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">Proof It Works</div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white">
              These Students Were Exactly Where You Are Now
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((r, i) => (
              <div key={i} className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{r.emoji}</div>
                  <div>
                    <div className="font-black text-brand-blue dark:text-white text-sm">{r.name}</div>
                    <div className="text-[10px] text-gray-400">{r.role}</div>
                  </div>
                </div>
                <div className="flex mb-2">{[...Array(5)].map((_,i)=><Star key={i} size={10} className="fill-brand-orange text-brand-orange"/>)}</div>
                <div className="text-brand-orange font-black text-sm">{r.income}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">Achieved in {r.time}</div>
              </div>
            ))}
          </div>

          {/* CTA after results */}
          <div className="mt-8 text-center">
            <button onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-black px-8 py-4 rounded-xl text-sm transition shadow-xl shadow-brand-orange/25 active:scale-95">
              I Want Results Like These <ChevronRight size={15}/>
            </button>
            <p className="text-xs text-gray-400 mt-2">Book FREE demo · No payment · Counselor calls in 30 min</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 sm:py-16 px-4 bg-gray-50 dark:bg-[#0a0f1a]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white">Common Questions</h2>
          </div>
          <div className="space-y-2.5">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden">
                <button id={`faq-${i}`} onClick={()=>setActiveFaq(activeFaq===i?null:i)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center gap-3">
                  <span className="font-bold text-sm text-brand-blue dark:text-white">{f.q}</span>
                  <ChevronDown size={15} className={`text-brand-orange shrink-0 transition-transform duration-200 ${activeFaq===i?"rotate-180":""}`}/>
                </button>
                {activeFaq===i && (
                  <div className="px-5 pb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-3">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-14 sm:py-16 px-4 bg-gradient-to-br from-brand-blue to-[#0d1e45] text-white">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="text-3xl">🚀</div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Your Creator Career Starts<br/>
            <span className="text-brand-orange">With One Decision</span>
          </h2>
          <p className="text-white/70 text-sm max-w-md mx-auto">
            Stop scrolling. Stop waiting. <strong className="text-white">{seats} seats remain.</strong> Every batch that closes, the next one is 3 months away. Book your free demo now.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={scrollToForm} id="final-cta-enroll"
              className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-black px-8 py-4 rounded-xl text-sm transition shadow-xl shadow-brand-orange/30 active:scale-95">
              <Flame size={15}/> Book FREE Demo — {seats} Seats Left
            </button>
            <a href="https://wa.me/918143937367?text=Hi!%20I%20saw%20your%20ad.%20Tell%20me%20about%20the%20Content%20Creation%20Course."
              target="_blank" rel="noopener noreferrer" id="final-cta-wa"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-4 rounded-xl text-sm transition">
              <Phone size={14}/> Call / WhatsApp Us
            </a>
          </div>
          <div className="flex items-center justify-center gap-4 text-[11px] text-white/40 pt-1">
            <span className="flex items-center gap-1"><Shield size={10}/> No payment</span>
            <span>·</span>
            <span className="flex items-center gap-1"><BadgeCheck size={10}/> Verified institute</span>
            <span>·</span>
            <span className="flex items-center gap-1"><TrendingUp size={10}/> 1200+ placed</span>
          </div>
        </div>
      </section>

      {/* ── Popup ── */}
      <PopupModal isOpen={popup} onClose={()=>setPopup(false)} seats={seats}/>
    </div>
  );
}
