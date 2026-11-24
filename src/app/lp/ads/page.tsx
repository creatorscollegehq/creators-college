import type { Metadata } from "next";
import Link from "next/link";
import AdsCountdown from "./AdsCountdown";
import AdsStickyCta from "./AdsStickyCta";

export const metadata: Metadata = {
  title: "Content Creation Course in Telugu — ₹1,999 | Creators College",
  description:
    "296 Telugu lessons: scripting, voice over, mobile shooting, editing, uploads and growth. Lifetime access at ₹1,999 instead of ₹30,000. Enroll in 2 minutes.",
  alternates: { canonical: "https://www.creatorscollege.in/lp/ads" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Content Creation Course in Telugu — ₹1,999",
    description: "296 lessons. 12 modules. Lifetime access. Launch price ₹1,999 (₹30,000).",
    url: "https://www.creatorscollege.in/lp/ads",
    siteName: "Creators College",
    type: "website",
    locale: "en_IN",
  },
};

const includes = [
  "296 step-by-step lessons in Telugu",
  "Scripting, voice over and on-camera talking",
  "Mobile shooting: light, framing, angles",
  "CapCut editing for reels and long videos",
  "Instagram, Facebook and YouTube setup",
  "Uploads, covers, hashtags and analytics",
  "Lifetime access to all recordings",
  "WhatsApp doubt support + certificate",
];

const steps = [
  "Fundamentals",
  "Research",
  "Scripting",
  "Voice Over",
  "Live Talking",
  "Shooting",
  "Editing",
  "Uploads",
];

const faqs = [
  {
    q: "Do I need experience or a laptop?",
    a: "No experience needed. A phone is enough to start; a laptop helps for editing but is not mandatory.",
  },
  {
    q: "How do I get access after paying?",
    a: "Sign in with Google, pay by UPI or card, and the course unlocks on this same account instantly. You also get the details on WhatsApp.",
  },
  {
    q: "Is the price really ₹1,999?",
    a: "Yes. The course value is ₹30,000 and the current launch price is ₹1,999 — one payment, lifetime access.",
  },
  {
    q: "Will I get recordings?",
    a: "Yes. Every lesson stays in your account forever, so you can rewatch anytime.",
  },
];

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M4 10.5 8 14.5 16 5.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AdsLandingPage() {
  return (
    <main className="min-h-screen bg-[#08122e] text-white">
      {/* Urgency strip */}
      <div className="sticky top-0 z-30 bg-brand-orange px-3 py-2 text-center text-[12px] font-bold text-white">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true">🔥</span>
          Launch price ends in
          <span className="rounded bg-black/25 px-1.5 py-0.5 text-[12px]">
            <AdsCountdown />
          </span>
          <span className="hidden sm:inline">· Only 7 seats left</span>
        </span>
      </div>

      <div className="mx-auto w-full max-w-xl px-4 pb-8 pt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC93C]">
          Creators College · Telugu
        </p>
        <h1 className="mt-2 text-[30px] font-bold leading-[1.08] tracking-tight sm:text-4xl">
          Content Creation Course in <span className="text-[#FFC93C]">Telugu</span>
        </h1>
        <p className="mt-2.5 text-sm leading-relaxed text-white/70">
          Scripting → shooting → editing → uploads → growth. 296 lessons, 12 modules, lifetime access.
          Zero experience needed.
        </p>

        {/* Price + primary CTA */}
        <div className="mt-4 flex items-end gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Today only</p>
            <p className="mt-0.5 text-[30px] font-bold leading-none">₹1,999</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm text-white/40 line-through">₹30,000</p>
            <p className="mt-1 inline-block rounded-full bg-[#FFC93C] px-2 py-0.5 text-[11px] font-bold text-[#0B1B4B]">
              Save ₹28,001
            </p>
          </div>
        </div>

        <Link
          href="/checkout"
          prefetch={false}
          className="mt-3 flex w-full items-center justify-center rounded-xl bg-brand-orange px-6 py-4 text-lg font-bold text-white shadow-lg shadow-brand-orange/25 transition active:scale-[0.99]"
        >
          Enroll Now — ₹1,999
        </Link>
        <p className="mt-2 text-center text-[11px] text-white/55">
          Google sign-in · UPI / Card / Netbanking · Instant access
        </p>
        <p className="mt-1 text-center text-[11px] text-white/40">
          Already enrolled?{" "}
          <Link href="/learn" prefetch={false} className="font-semibold text-[#FFC93C] underline">
            Open my course
          </Link>
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { top: "296", label: "Lessons" },
            { top: "12", label: "Modules" },
            { top: "Lifetime", label: "Access" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-2 py-2.5">
              <p className="text-base font-bold leading-none text-white">{item.top}</p>
              <p className="mt-1 text-[11px] text-white/50">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Light section: everything below the fold */}
      <div className="rounded-t-[28px] bg-[#F7F9FC] text-[#0B1B4B] [content-visibility:auto] [contain-intrinsic-size:auto_900px]">
        <section className="mx-auto w-full max-w-xl px-4 pt-6">
          <h2 className="text-xl font-bold tracking-tight">Everything included</h2>
          <ul className="mt-3 grid grid-cols-1 gap-2">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[13px] font-medium leading-snug">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-2.5 w-2.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto w-full max-w-xl px-4 pt-6">
          <h2 className="text-xl font-bold tracking-tight">The full roadmap</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {steps.map((step, index) => (
              <span
                key={step}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#0B1B4B]/10 bg-white px-2.5 py-1.5 text-[12px] font-semibold"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[9px] font-bold text-white">
                  {index + 1}
                </span>
                {step}
              </span>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-xl px-4 pt-6">
          <div className="rounded-2xl bg-brand-orange px-4 py-4 text-white shadow-lg shadow-brand-orange/20">
            <p className="text-[15px] font-bold">Start today at ₹1,999</p>
            <p className="mt-1 text-[12px] text-white/85">₹30,000 value · Lifetime access · Instant unlock</p>
            <Link
              href="/checkout"
              prefetch={false}
              className="mt-3 flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-[15px] font-bold text-brand-orange transition active:scale-[0.99]"
            >
              Enroll Now
            </Link>
          </div>
        </section>

        <section className="mx-auto w-full max-w-xl px-4 pb-8 pt-6">
          <h2 className="text-xl font-bold tracking-tight">Quick questions</h2>
          <div className="mt-3 space-y-2">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-[#0B1B4B]/10 bg-white px-3.5 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[13px] font-bold">
                  {faq.q}
                  <span className="shrink-0 text-brand-orange transition group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-[12px] leading-relaxed text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>

          <p className="mt-5 text-center text-[11px] leading-relaxed text-gray-500">
            Creators College · Hyderabad ·{" "}
            <a
              href="https://wa.me/918143937367?text=Hi%2C%20I%20want%20to%20join%20the%20Content%20Creation%20Course"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-orange underline"
            >
              WhatsApp us
            </a>
            <br />
            Secure payment via Cashfree · Lifetime access · Non-refundable
          </p>
        </section>
      </div>

      <AdsStickyCta />
    </main>
  );
}
