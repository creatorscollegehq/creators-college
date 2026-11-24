import type { Metadata } from "next";
import Link from "next/link";
import AdsCountdown from "./AdsCountdown";
import AdsPopup from "./AdsPopup";
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

const quickIncludes = includes.slice(0, 4);

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

const stats = [
  { top: "296", label: "Lessons" },
  { top: "12", label: "Modules" },
  { top: "Lifetime", label: "Access" },
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
      <path
        d="M4 10.5 8 14.5 16 5.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Lock({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <rect x="4.5" y="9" width="11" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 9V6.6a3 3 0 0 1 6 0V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PriceRow() {
  return (
    <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
      <span className="text-[2.5rem] font-extrabold leading-none tracking-tight text-[#0B1B4B]">₹1,999</span>
      <span className="pb-1 text-[1rem] font-medium text-[#9aa3b2] line-through">₹30,000</span>
      <span className="mb-1 rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[0.72rem] font-bold text-[#15803D]">
        Save ₹28,001
      </span>
    </div>
  );
}

export default function AdsLandingPage() {
  return (
    <main className="min-h-screen bg-white text-[#0B1B4B]">
      {/* Urgency strip */}
      <div className="sticky top-0 z-30 bg-[#EA580C] px-3 py-2 text-center text-[0.8rem] font-bold text-white">
        <span className="inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
          <span aria-hidden="true">🔥</span>
          Launch price ends in
          <span className="rounded bg-black/25 px-1.5 py-0.5 tabular-nums">
            <AdsCountdown />
          </span>
          <span>· Only 7 seats left</span>
        </span>
      </div>

      {/* Hero */}
      <section className="bg-[linear-gradient(180deg,#FFF8F2_0%,#FFFFFF_70%)]">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-8 px-4 pb-10 pt-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:pb-16 lg:pt-14">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#FDBA74] bg-white px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#C2410C]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F97316] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F97316]" />
              </span>
              Telugu · Launch offer live
            </p>

            <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.07] tracking-tight sm:text-[2.4rem] lg:text-[3.05rem]">
              Content Creation Course in <span className="text-[#EA580C]">Telugu</span>
            </h1>

            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-[#4B5563]">
              Scripting → shooting → editing → uploads → growth. 296 lessons, 12 modules, lifetime
              access. Zero experience needed — your phone is enough.
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5 text-[0.72rem] font-semibold text-[#334155]">
              {["Telugu medium", "Phone-first", "WhatsApp support", "Certificate"].map((chip) => (
                <span key={chip} className="rounded-full border border-[#E6E9F0] bg-white px-2.5 py-1">
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#FED7AA] bg-white px-4 py-4 shadow-[0_10px_30px_-22px_rgba(11,27,75,0.55)]">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#C2410C]">
                Today only
              </p>
              <div className="mt-1">
                <PriceRow />
              </div>
              <p className="mt-1 text-[0.78rem] text-[#6B7280]">
                One payment · Lifetime access · No monthly fee
              </p>

              <Link
                href="/checkout"
                prefetch={false}
                className="mt-3.5 flex w-full items-center justify-center rounded-xl bg-[#F97316] px-6 py-4 text-[1.02rem] font-bold text-white shadow-[0_12px_26px_-10px_rgba(249,115,22,0.8)] transition hover:bg-[#EA580C] active:scale-[0.99] lg:w-auto lg:px-10"
              >
                Enroll Now — ₹1,999
              </Link>
              <p className="mt-2 text-center text-[0.75rem] text-[#6B7280] lg:text-left">
                Google sign-in · UPI / Card / Netbanking · Instant unlock
              </p>
            </div>

            <p className="mt-3 text-[0.78rem] text-[#6B7280]">
              Already enrolled?{" "}
              <Link href="/learn" prefetch={false} className="font-bold text-[#EA580C] underline">
                Open my course
              </Link>
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center lg:max-w-md">
              {stats.map((item) => (
                <div key={item.label} className="rounded-xl border border-[#E6E9F0] bg-white px-2 py-2.5">
                  <p className="text-[0.95rem] font-extrabold leading-none">{item.top}</p>
                  <p className="mt-1 text-[0.72rem] font-medium text-[#6B7280]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop order card */}
          <aside className="hidden min-w-0 lg:sticky lg:top-16 lg:block">
            <div className="rounded-2xl border border-[#E6E9F0] bg-white p-5 shadow-[0_22px_60px_-30px_rgba(11,27,75,0.45)]">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#C2410C]">
                  Launch price
                </p>
                <span className="rounded-full bg-[#FFF1E6] px-2 py-1 text-[0.7rem] font-bold tabular-nums text-[#C2410C]">
                  Ends in <AdsCountdown />
                </span>
              </div>

              <div className="mt-3">
                <PriceRow />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-[0.72rem] font-bold">
                  <span className="text-[#B91C1C]">Only 7 seats left</span>
                  <span className="font-medium text-[#6B7280]">43 of 50 claimed</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#F97316,#DC2626)]"
                    style={{ width: "86%" }}
                  />
                </div>
              </div>

              <div className="my-4 h-px bg-[#EEF1F6]" />

              <ul className="space-y-2">
                {quickIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[0.82rem] font-medium leading-snug">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
                <li className="pl-6 text-[0.75rem] font-semibold text-[#EA580C]">
                  + 4 more modules included
                </li>
              </ul>

              <Link
                href="/checkout"
                prefetch={false}
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#F97316] px-5 py-3.5 text-[0.95rem] font-bold text-white shadow-[0_12px_26px_-12px_rgba(249,115,22,0.9)] transition hover:bg-[#EA580C] active:scale-[0.99]"
              >
                Enroll Now — ₹1,999
              </Link>

              <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[0.72rem] font-medium text-[#6B7280]">
                <Lock className="h-3.5 w-3.5 text-[#16A34A]" />
                Secure payment via Cashfree
              </p>
              <p className="mt-1 text-center text-[0.72rem] text-[#9AA3B2]">
                Instant access · Lifetime validity
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Below the fold */}
      <div className="bg-[#F6F8FC] [content-visibility:auto] [contain-intrinsic-size:auto_1100px]">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-9 lg:pb-14 lg:pt-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <section className="min-w-0">
              <h2 className="text-[1.25rem] font-extrabold tracking-tight">Everything included</h2>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[0.85rem] font-medium leading-snug">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="min-w-0">
              <h2 className="text-[1.25rem] font-extrabold tracking-tight">The full roadmap</h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {steps.map((step, index) => (
                  <span
                    key={step}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E1E6EF] bg-white px-2.5 py-1.5 text-[0.8rem] font-semibold"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F97316] text-[0.62rem] font-bold text-white">
                      {index + 1}
                    </span>
                    {step}
                  </span>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#E1E6EF] bg-white p-4">
                <p className="text-[0.85rem] font-extrabold">Is this for beginners?</p>
                <p className="mt-1 text-[0.82rem] leading-relaxed text-[#4B5563]">
                  Yes. Lessons start from zero — what content is, how to find ideas, how to talk to
                  camera, and how to edit on your phone. No degree, no laptop, no prior channel needed.
                </p>
              </div>
            </section>
          </div>

          <section className="mt-9">
            <h2 className="text-[1.25rem] font-extrabold tracking-tight">Quick questions</h2>
            <div className="mt-3 grid gap-2 lg:grid-cols-2">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-[#E1E6EF] bg-white px-3.5 py-3"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[0.85rem] font-bold">
                    {faq.q}
                    <span
                      className="shrink-0 text-[#EA580C] transition group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-[0.8rem] leading-relaxed text-[#4B5563]">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-9 overflow-hidden rounded-2xl bg-[linear-gradient(120deg,#F97316_0%,#EA580C_100%)] px-5 py-6 text-white lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-9 lg:py-8">
            <div className="min-w-0">
              <p className="text-[1.15rem] font-extrabold leading-tight">Start today at ₹1,999</p>
              <p className="mt-1 text-[0.82rem] text-white/85">
                ₹30,000 value · Lifetime access · Instant unlock · Only 7 seats left
              </p>
            </div>
            <Link
              href="/checkout"
              prefetch={false}
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-white px-6 py-3.5 text-[0.95rem] font-bold text-[#EA580C] transition hover:bg-[#FFF7ED] active:scale-[0.99] lg:mt-0 lg:w-auto lg:shrink-0 lg:px-8"
            >
              Enroll Now
            </Link>
          </section>

          <p className="mt-6 text-center text-[0.72rem] leading-relaxed text-[#6B7280]">
            Creators College · Hyderabad ·{" "}
            <a
              href="https://wa.me/918143937367?text=Hi%2C%20I%20want%20to%20join%20the%20Content%20Creation%20Course"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#EA580C] underline"
            >
              WhatsApp us
            </a>
            <br />
            Secure payment via Cashfree · Lifetime access · Non-refundable
          </p>
        </div>
      </div>

      <AdsStickyCta />
      <AdsPopup />
    </main>
  );
}
