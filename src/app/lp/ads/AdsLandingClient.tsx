"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check, Sparkles, Star, Clock, Users, Award, ChevronRight,
  MessageSquare, Shield, Zap, TrendingUp, Camera, Video,
  Share2, Phone, ChevronDown, BadgeCheck, Briefcase
} from "lucide-react";

// ─── Countdown Timer ───────────────────────────────────────────
function CountdownTimer() {
  const [time, setTime] = useState({ h: 11, m: 47, s: 59 });
  useEffect(() => {
    let endTime: number;
    try {
      const stored = localStorage.getItem("cc_ads_timer_end");
      if (stored) {
        endTime = Number(stored);
      } else {
        endTime = Date.now() + 12 * 60 * 60 * 1000;
        localStorage.setItem("cc_ads_timer_end", String(endTime));
      }
    } catch {
      endTime = Date.now() + 12 * 60 * 60 * 1000;
    }
    const tick = setInterval(() => {
      const diff = Math.max(0, endTime - Date.now());
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
      if (diff === 0) clearInterval(tick);
    }, 1000);
    return () => clearInterval(tick);
  }, []);
  const fmt = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-1 font-mono font-black text-white">
      {[fmt(time.h), fmt(time.m), fmt(time.s)].map((v, i) => (
        <React.Fragment key={i}>
          <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-sm min-w-[28px] text-center">{v}</span>
          {i < 2 && <span className="opacity-70 text-xs">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Lead Form ─────────────────────────────────────────────────
function LeadCaptureForm({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!phone.trim()) e.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(phone.replace(/[\s\-\+]/g, ""))) e.phone = "Enter a valid 10-digit number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const eventId = `ads_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Meta Ads - Content Creation Course",
        value: 0.0, currency: "INR",
      }, { eventID: eventId });
    }

    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, eventId, url: window.location.href, source: "Meta Ads Landing Page", eventName: "Lead" }),
    }).catch(() => {});

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, course: "Complete Telugu Content Creation Course", source: "🎯 Meta Ads Landing Page", type: "ads", message: "Lead from Meta Ad campaign" }),
      });
    } catch {}

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className={`bg-white rounded-2xl p-6 text-center space-y-4 shadow-2xl ${compact ? "" : "sm:p-8"}`}>
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto text-3xl">🎉</div>
        <div>
          <h3 className="text-lg font-black text-brand-blue">You&apos;re Registered!</h3>
          <p className="text-sm text-gray-500 mt-1">Our counselor will call <strong>{phone}</strong> within 30 minutes.</p>
        </div>
        <a
          href={`https://wa.me/918143937367?text=${encodeURIComponent(`Hi! I just registered at Creators College. Name: ${name}, Phone: ${phone}. Please confirm my free demo slot.`)}`}
          target="_blank" rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-5 rounded-xl text-sm transition"
        >
          <MessageSquare size={15} /> Confirm on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-2xl shadow-2xl space-y-4 ${compact ? "p-5" : "p-6 sm:p-7"}`}>
      <div>
        <div className="text-[10px] font-bold text-brand-orange uppercase tracking-widest mb-0.5">Free Demo · No Payment</div>
        <h2 className={`font-black text-brand-blue leading-tight ${compact ? "text-lg" : "text-xl sm:text-2xl"}`}>
          Book Your FREE Demo Class
        </h2>
        <p className="text-[11px] text-gray-400 mt-0.5">Our counselor calls you within 30 minutes</p>
      </div>

      <div className="space-y-3">
        <div>
          <input
            id="ads-name" type="text" placeholder="Your Full Name" value={name}
            onChange={e => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: "" })); }}
            className={`w-full px-4 py-3.5 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition placeholder:text-gray-400 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}
          />
          {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.name}</p>}
        </div>
        <div>
          <input
            id="ads-phone" type="tel" placeholder="WhatsApp Number (10 digits)" value={phone}
            onChange={e => { setPhone(e.target.value); if (errors.phone) setErrors(p => ({ ...p, phone: "" })); }}
            className={`w-full px-4 py-3.5 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition placeholder:text-gray-400 ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"}`}
          />
          {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.phone}</p>}
        </div>
      </div>

      <button
        id="ads-submit-btn" type="submit" disabled={isSubmitting}
        className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-black py-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/25 active:scale-[0.98] disabled:opacity-70"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</span>
        ) : (
          <><span>Enroll Now — Get FREE Demo</span><ChevronRight size={16} /></>
        )}
      </button>

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-gray-400">
        <span className="flex items-center gap-1"><Shield size={9} className="text-green-500" /> 100% Free</span>
        <span className="text-gray-200">·</span>
        <span className="flex items-center gap-1"><Clock size={9} /> Callback in 30 min</span>
        <span className="text-gray-200">·</span>
        <span className="flex items-center gap-1"><Users size={9} /> Limited seats</span>
      </div>
    </form>
  );
}

// ─── Main Page ─────────────────────────────────────────────────
export default function AdsLandingPageClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const curriculum = [
    { week: "Week 1–2", icon: <Camera size={15} />, title: "Camera & Setup Mastery", desc: "Mobile camera settings, lighting hacks, free home studio setup. No DSLR or expensive gear needed." },
    { week: "Week 3–4", icon: <Video size={15} />, title: "Scripting & Storytelling", desc: "3-second hook formulas, viral content frameworks, topic research, scripting for YouTube & Reels." },
    { week: "Week 5–6", icon: <Zap size={15} />, title: "Video Editing (CapCut & Premiere)", desc: "Cuts, transitions, sound design, subtitles, colour grading — all on mobile and PC." },
    { week: "Week 7–8", icon: <Share2 size={15} />, title: "Growth & Income", desc: "YouTube SEO, Instagram algorithm secrets, brand deals, UGC freelancing, and monetization strategies." },
  ];

  const results = [
    { name: "Rahul K.", result: "Earning ₹1.2L/month from YouTube", months: "6 months", emoji: "👨‍💼" },
    { name: "Priya M.", result: "50K Instagram followers", months: "4 months", emoji: "👩‍💻" },
    { name: "Sai T.", result: "Freelance editor at ₹60K/mo", months: "5 months", emoji: "👨‍🎨" },
    { name: "Divya R.", result: "Multiple brand collaborations", months: "3 months", emoji: "👩‍🎤" },
  ];

  const faqs = [
    { q: "Do I need a DSLR or expensive equipment?", a: "No! We teach you to produce professional videos with just your smartphone. Most successful students started with a basic Android phone." },
    { q: "Is the course online or offline?", a: "Both! We offer live online sessions, recorded classes for replay, and offline batches in Hyderabad. Learn from anywhere in India." },
    { q: "I have zero experience. Will this work for me?", a: "Absolutely. The entire course is structured from beginner to professional. No prior knowledge of video or social media is needed." },
    { q: "How much can I earn after completing the course?", a: "Students earn ₹20,000–₹2L+ per month depending on their niche and consistency — from freelance editing to full creator income." },
    { q: "What is the course fee?", a: "Fill the form and our counselor will share the current discounted fee, EMI options, and any ongoing offers directly on WhatsApp." },
  ];

  return (
    <div className="w-full bg-white dark:bg-[#070d1a] min-h-screen">

      {/* ── Urgency Strip ── */}
      <div className="w-full bg-brand-orange text-white text-center py-2.5 px-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-[11px] sm:text-xs font-bold z-40 relative">
        <span className="animate-pulse">🔥</span>
        <span>LIMITED BATCH OFFER CLOSES IN:</span>
        <CountdownTimer />
        <span className="hidden sm:inline">— Very Few Seats Remaining!</span>
      </div>

      {/* ── Minimal Sticky Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-brand-blue/95 backdrop-blur-md border-b border-gray-100 dark:border-white/5 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo/logo.png" alt="Creators College" width={120} height={32} className="h-8 w-auto object-contain" />
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300">
            <BadgeCheck size={14} className="text-brand-orange" />
            <span>Worked with <strong className="text-brand-blue dark:text-white">2,000+ Businesses</strong></span>
          </div>
          <a
            href="#enroll-form"
            id="nav-enroll-btn"
            className="shrink-0 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-4 py-2 rounded-full text-xs transition flex items-center gap-1.5 shadow-md shadow-brand-orange/20 active:scale-95"
          >
            Enroll Now <ChevronRight size={13} />
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061232] via-brand-blue to-[#0d1e45] py-12 sm:py-16 md:py-20 px-4">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">

          {/* Left: Pitch */}
          <div className="lg:col-span-7 text-white space-y-5 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/30 text-brand-orange px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
              <Sparkles size={11} strokeWidth={2.5} />
              New Batch Starting Soon · Telugu Medium
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">
              Turn Your Phone Into a<br />
              <span className="text-brand-orange">
                ₹1 Lakh/Month Income Machine
              </span>
            </h1>

            <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-xl">
              Join <strong className="text-white">1,200+ Telugu students</strong> who mastered content creation, video editing &amp; social media growth at Creators College — and are now earning from YouTube, Instagram &amp; brand deals.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {[
                { icon: <Clock size={13} />, label: "8-Week Intensive Program" },
                { icon: <Camera size={13} />, label: "Mobile Compatible — No DSLR" },
                { icon: <Users size={13} />, label: "Live + Recorded Sessions" },
                { icon: <TrendingUp size={13} />, label: "Earn Good Money After Course" },
                { icon: <Award size={13} />, label: "Industry Certificate Included" },
                { icon: <Briefcase size={13} />, label: "Worked with 2,000+ Businesses" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-2.5 text-[11px] sm:text-xs font-semibold text-white/90 transition">
                  <span className="text-brand-orange shrink-0">{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>

            {/* Worked-with strip */}
            <div className="flex items-center gap-3 pt-2 border-t border-white/10">
              <div className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Trusted by</div>
              <div className="flex items-center gap-2">
                <div className="bg-white/10 rounded-full px-3 py-1 text-xs font-bold text-white">2,000+ Businesses</div>
                <div className="bg-white/10 rounded-full px-3 py-1 text-xs font-bold text-white">1,200+ Students</div>
                <div className="bg-brand-orange/20 border border-brand-orange/30 rounded-full px-3 py-1 text-[11px] font-bold text-brand-orange flex items-center gap-1">
                  <Star size={9} className="fill-brand-orange" /> 4.9 Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div id="enroll-form" className="lg:col-span-5 w-full order-1 lg:order-2">
            <LeadCaptureForm />
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <section className="py-8 sm:py-10 bg-gray-50 dark:bg-white/5 border-y border-gray-100 dark:border-white/5 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
          {[
            { n: "1,200+", l: "Students Trained" },
            { n: "2,000+", l: "Businesses We&apos;ve Worked With" },
            { n: "₹1L+", l: "Monthly Income (Top Students)" },
            { n: "4.9 ★", l: "Average Student Rating" },
          ].map((s, i) => (
            <div key={i} className="space-y-1 py-2">
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-brand-blue dark:text-white" dangerouslySetInnerHTML={{ __html: s.n }} />
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: s.l }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── What You Learn ── */}
      <section className="py-14 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">Full Course Curriculum</div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white">Everything You Need to Start Earning</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">8 weeks of practical, hands-on training — 100% in Telugu, from zero experience to earning.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {curriculum.map((c, i) => (
              <div key={i} className="group bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl p-5 hover:shadow-lg hover:border-brand-orange/20 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    {c.icon}
                  </div>
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider">{c.week}</span>
                </div>
                <h3 className="font-black text-brand-blue dark:text-white text-sm mb-1">{c.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Bonuses */}
          <div className="mt-6 bg-gradient-to-br from-brand-blue/5 to-brand-orange/5 dark:from-white/5 dark:to-white/5 rounded-2xl p-5 sm:p-6 border border-brand-blue/10 dark:border-white/10">
            <div className="text-sm font-black text-brand-blue dark:text-white mb-4 flex items-center gap-2">
              <Sparkles size={15} className="text-brand-orange" /> Bonus Inclusions with Every Seat
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {[
                "Lifetime access to recorded sessions",
                "Private WhatsApp mentorship group",
                "Industry-recognised certificate",
                "Portfolio review & feedback sessions",
                "Brand deal & UGC pitch templates",
                "Free course upgrade for 1 year",
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <Check size={12} className="text-brand-orange mt-0.5 shrink-0 stroke-[3]" /> {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Student Results ── */}
      <section className="py-14 sm:py-16 px-4 bg-gray-50 dark:bg-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">Real Results</div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white">Students Who Transformed Their Lives</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((r, i) => (
              <div key={i} className="bg-white dark:bg-[#131b2e] rounded-2xl p-5 shadow-sm hover:shadow-md border border-gray-100 dark:border-white/5 space-y-3 transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{r.emoji}</div>
                  <div>
                    <div className="font-bold text-brand-blue dark:text-white text-sm">{r.name}</div>
                    <div className="text-[10px] text-gray-400">After {r.months}</div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-brand-orange text-brand-orange" />)}
                </div>
                <p className="text-xs font-semibold text-brand-charcoal dark:text-gray-200 leading-relaxed">&ldquo;{r.result}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">Common Questions</div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white">Your Questions Answered</h2>
          </div>
          <div className="space-y-2.5">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden hover:border-brand-orange/20 transition-colors">
                <button
                  id={`faq-btn-${i}`}
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center gap-3"
                >
                  <span className="font-bold text-sm text-brand-blue dark:text-white pr-2">{f.q}</span>
                  <ChevronDown size={16} className={`text-brand-orange shrink-0 transition-transform duration-200 ${activeFaq === i ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-14 sm:py-16 px-4 bg-brand-blue text-white">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/30 text-brand-orange px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
            <Sparkles size={10} /> Limited Seats Available
          </div>
          <h2 className="text-2xl sm:text-3xl font-black leading-tight">
            Ready to Start Earning from Content Creation?
          </h2>
          <p className="text-white/70 text-sm max-w-md mx-auto">
            Book your free demo class now. Our counselor will call you within 30 minutes to answer your questions and help you get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#enroll-form"
              id="cta-enroll-btn"
              className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-black px-7 py-4 rounded-xl text-sm transition shadow-xl shadow-brand-orange/30 active:scale-95"
            >
              Enroll Now — Book FREE Demo <ChevronRight size={15} />
            </a>
            <a
              href="https://wa.me/918143937367?text=Hi%20Creators%20College!%20I%20saw%20your%20ad%20and%20want%20to%20enrol%20in%20the%20Content%20Creation%20Course."
              target="_blank" rel="noopener noreferrer"
              id="cta-whatsapp-btn"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-4 rounded-xl text-sm transition active:scale-95"
            >
              <Phone size={15} /> Chat on WhatsApp
            </a>
          </div>
          <p className="text-white/30 text-[10px]">No payment required for demo · 100% free · Cancel anytime</p>
        </div>
      </section>

    </div>
  );
}
