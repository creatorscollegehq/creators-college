"use client";

import React, { useState, useEffect } from "react";
import { Check, Sparkles, Star, Clock, Users, Award, ChevronRight, MessageSquare, Shield, Zap, TrendingUp, Camera, Video, Share2 } from "lucide-react";

// ─── Countdown Timer ───────────────────────────────────────────
function CountdownTimer() {
  const [time, setTime] = useState({ h: 11, m: 47, s: 59 });
  useEffect(() => {
    const stored = localStorage.getItem("cc_ads_timer_end");
    let endTime: number;
    if (stored) {
      endTime = Number(stored);
    } else {
      endTime = Date.now() + 12 * 60 * 60 * 1000;
      localStorage.setItem("cc_ads_timer_end", String(endTime));
    }
    const tick = setInterval(() => {
      const diff = Math.max(0, endTime - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({ h, m, s });
      if (diff === 0) clearInterval(tick);
    }, 1000);
    return () => clearInterval(tick);
  }, []);
  const fmt = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-1.5 font-mono text-sm font-bold">
      {[fmt(time.h), fmt(time.m), fmt(time.s)].map((v, i) => (
        <React.Fragment key={i}>
          <span className="bg-brand-blue text-white px-2 py-1 rounded text-xs sm:text-sm min-w-[30px] text-center">{v}</span>
          {i < 2 && <span className="text-brand-blue">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────
export default function AdsLandingPageClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Your name is required";
    if (!phone.trim()) e.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(phone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const eventId = `ads_lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Meta Pixel client event
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Meta Ads - Content Creation Course",
        value: 0.0,
        currency: "INR",
      }, { eventID: eventId });
    }

    // CAPI server event
    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, phone,
        eventId,
        url: window.location.href,
        source: "Meta Ads Landing Page",
        eventName: "Lead",
      }),
    }).catch(() => {});

    // Google Sheets
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone,
          course: "Complete Telugu Content Creation Course",
          source: "🎯 Meta Ads Landing Page",
          type: "ads",
          message: "Lead from Meta Ad campaign",
        }),
      });
    } catch {}

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const results = [
    { name: "Rahul K.", result: "1.2L/month from YouTube", months: "6 months", img: "👨‍💼" },
    { name: "Priya M.", result: "50K Instagram followers", months: "4 months", img: "👩‍💻" },
    { name: "Sai T.", result: "Freelance editor earning ₹60K/mo", months: "5 months", img: "👨‍🎨" },
    { name: "Divya R.", result: "Brand deal collaborations", months: "3 months", img: "👩‍🎤" },
  ];

  const curriculum = [
    { week: "Week 1–2", icon: <Camera size={16} />, title: "Foundation & Camera Setup", desc: "Mobile camera mastery, lighting hacks, composition rules, zero-cost studio setup at home." },
    { week: "Week 3–4", icon: <Video size={16} />, title: "Scripting & Storytelling", desc: "Hook formulas, viral content frameworks, topic selection, scripting winning videos in any niche." },
    { week: "Week 5–6", icon: <Zap size={16} />, title: "Advanced Video Editing", desc: "CapCut mobile editing, cuts, transitions, sound design, reels & shorts optimized formats." },
    { week: "Week 7–8", icon: <Share2 size={16} />, title: "Growth & Monetization", desc: "YouTube SEO, Instagram algorithm secrets, brand deals, affiliate income, UGC freelancing." },
  ];

  const faqs = [
    { q: "Do I need a DSLR or expensive gear?", a: "No! We teach you how to produce professional-quality videos with just your smartphone. Most of our successful students started with a basic Android phone." },
    { q: "Is this course available online?", a: "Yes! We offer both online (live + recorded sessions) and offline batches in Hyderabad. You can learn from anywhere in India." },
    { q: "I have zero experience — will this work for me?", a: "Absolutely. The course is structured from complete beginner to professional level. No prior experience in video or social media is required." },
    { q: "How much can I earn after the course?", a: "Income varies based on your effort. Our students earn anywhere from ₹20,000/month (freelance editing) to ₹2L+/month (established creators & brand deals)." },
    { q: "What is the course fee?", a: "The current batch is available at a discounted enrollment fee. Fill the form above and our counselor will share the exact fee, EMI options, and current offers on WhatsApp." },
  ];

  return (
    <div className="w-full bg-white dark:bg-[#070d1a] min-h-screen">
      
      {/* ── Urgency Strip ── */}
      <div className="w-full bg-brand-orange text-white text-center py-2 px-4 flex items-center justify-center gap-3 flex-wrap text-xs font-bold">
        <span className="animate-pulse">🔥</span>
        <span>OFFER CLOSES IN:</span>
        <CountdownTimer />
        <span>— Limited Batch Seats Left!</span>
      </div>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue via-[#0d1e45] to-brand-blue py-14 md:py-20 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left: Pitch Copy */}
          <div className="lg:col-span-7 text-white space-y-5">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/30 text-brand-orange px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles size={11} />
              New Batch Starting Soon · Telugu Medium
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">
              Turn Your Phone Into a<br />
              <span className="text-brand-orange">₹1 Lakh/Month Income Machine</span>
            </h1>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-xl">
              Join <strong className="text-white">1,200+ Telugu students</strong> who learned content creation, video editing & social media growth at Creators College — and are now earning from YouTube, Instagram & brand deals.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                { icon: <Clock size={14} />, label: "8-Week Intensive" },
                { icon: <Users size={14} />, label: "Live + Recorded" },
                { icon: <Award size={14} />, label: "Certificate Included" },
                { icon: <Camera size={14} />, label: "Phone OK — No DSLR" },
                { icon: <TrendingUp size={14} />, label: "Earn While Learning" },
                { icon: <Shield size={14} />, label: "Placement Support" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white/90">
                  <span className="text-brand-orange">{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>

            {/* Social proof strip */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {["👨‍💻", "👩‍🎤", "👨‍🎨", "👩‍💼", "👨‍🏫"].map((e, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-brand-blue border-2 border-white/20 flex items-center justify-center text-sm">{e}</div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-brand-orange text-brand-orange" />)}
                </div>
                <p className="text-white/60 text-[10px] mt-0.5">1,200+ students enrolled · 4.9/5 rating</p>
              </div>
            </div>
          </div>

          {/* Right: Lead Form */}
          <div className="lg:col-span-5 w-full">
            {isSuccess ? (
              <div className="bg-white rounded-3xl p-8 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto text-3xl">🎉</div>
                <h3 className="text-xl font-black text-brand-blue">You're In!</h3>
                <p className="text-sm text-gray-500">
                  <strong>{name}</strong>, our counselor will call you on <strong>{phone}</strong> within 30 minutes to confirm your free demo slot and share the batch details.
                </p>
                <a
                  href={`https://wa.me/918143937367?text=${encodeURIComponent(`Hi! I just registered for Creators College. My name is ${name} and my number is ${phone}. Please confirm my free demo class slot.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition"
                >
                  <MessageSquare size={16} />
                  Message Us on WhatsApp Now
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-7 shadow-2xl space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-brand-orange uppercase tracking-wider">Free Demo + Batch Details</div>
                  <h2 className="text-xl font-black text-brand-blue leading-tight">Book Your FREE Demo Class</h2>
                  <p className="text-[11px] text-gray-400">No payment needed · Our counselor will call you in 30 mins</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <input
                      id="ads-name"
                      type="text"
                      placeholder="Your Full Name"
                      value={name}
                      onChange={e => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: "" })); }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition ${errors.name ? "border-red-400" : "border-gray-200"}`}
                    />
                    {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      id="ads-phone"
                      type="tel"
                      placeholder="WhatsApp Phone Number"
                      value={phone}
                      onChange={e => { setPhone(e.target.value); if (errors.phone) setErrors(p => ({ ...p, phone: "" })); }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition ${errors.phone ? "border-red-400" : "border-gray-200"}`}
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <button
                  id="ads-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-black py-4 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 active:scale-[0.98] disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : <>Book My FREE Demo Now <ChevronRight size={16} /></>}
                </button>

                <div className="flex items-center justify-center gap-3 text-[10px] text-gray-400 pt-1">
                  <span className="flex items-center gap-1"><Shield size={10} /> 100% Free</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> Counselor calls in 30 min</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Users size={10} /> Limited seats</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Social Proof Numbers ── */}
      <section className="py-10 bg-gray-50 dark:bg-white/5 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { n: "1,200+", l: "Students Trained" },
            { n: "4.9★", l: "Average Rating" },
            { n: "₹1L+", l: "Monthly Earning (Top Students)" },
            { n: "8 Weeks", l: "To Transform Your Career" },
          ].map((s, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white">{s.n}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What You Will Learn ── */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-orange">Full Course Curriculum</div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white">Everything You Need to Start Earning</h2>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">A practical, hands-on 8-week curriculum designed to get you from zero to earning — taught 100% in Telugu.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {curriculum.map((c, i) => (
            <div key={i} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl p-5 space-y-2 hover:shadow-lg transition">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center">{c.icon}</div>
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider">{c.week}</span>
              </div>
              <h3 className="font-black text-brand-blue dark:text-white text-sm">{c.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-brand-blue/5 dark:bg-white/5 rounded-2xl p-5 border border-brand-blue/10 dark:border-white/10">
          <div className="text-sm font-black text-brand-blue dark:text-white mb-3">Bonus inclusions with every seat:</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {["Lifetime access to recorded sessions", "Private WhatsApp mentorship group", "Course completion certificate", "Portfolio review sessions", "Brand deal & UGC pitch templates", "Free course upgrade for 1 year"].map((b, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                <Check size={13} className="text-brand-orange mt-0.5 shrink-0 stroke-[3]" />
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Student Results ── */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-orange">Real Results</div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white">Students Who Transformed Their Lives</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((r, i) => (
              <div key={i} className="bg-white dark:bg-[#131b2e] rounded-2xl p-5 shadow border border-gray-100 dark:border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{r.img}</div>
                  <div>
                    <div className="font-bold text-brand-blue dark:text-white text-sm">{r.name}</div>
                    <div className="text-[10px] text-gray-400">After {r.months}</div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-brand-orange text-brand-orange" />)}
                </div>
                <p className="text-xs font-bold text-brand-charcoal dark:text-gray-200">"{r.result}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-orange">Common Questions</div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white">Your Questions Answered</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden">
              <button
                id={`faq-${i}`}
                onClick={() => setActiveVideo(activeVideo === i ? null : i)}
                className="w-full text-left px-5 py-4 flex justify-between items-center gap-3"
              >
                <span className="font-bold text-sm text-brand-blue dark:text-white">{f.q}</span>
                <ChevronRight size={16} className={`text-brand-orange shrink-0 transition-transform ${activeVideo === i ? "rotate-90" : ""}`} />
              </button>
              {activeVideo === i && (
                <div className="px-5 pb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-3">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 px-4 bg-brand-blue text-white text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <div className="text-brand-orange font-bold text-xs uppercase tracking-widest">Don't Miss This Batch</div>
          <h2 className="text-2xl sm:text-3xl font-black leading-tight">
            Ready to Start Your Creator Journey?
          </h2>
          <p className="text-white/70 text-sm">
            Seats are filling up fast. Book your free demo class now — our counselor will call you within 30 minutes to answer all your questions.
          </p>
          <a
            id="cta-whatsapp-btn"
            href="https://wa.me/918143937367?text=Hi%20Creators%20College!%20I%20saw%20your%20ad%20and%20want%20to%20know%20more%20about%20the%20Content%20Creation%20Course."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-black px-8 py-4 rounded-xl text-sm transition shadow-xl hover:shadow-brand-orange/30"
          >
            <MessageSquare size={16} />
            Chat on WhatsApp Now
          </a>
          <p className="text-white/40 text-[10px]">Or fill the form above · Free, No commitment required</p>
        </div>
      </section>

    </div>
  );
}
