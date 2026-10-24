"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Lock, MessageCircle, ShieldCheck } from "lucide-react";

export default function CheckoutSuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "";
  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";
  const course = searchParams.get("course") || "Complete Telugu Content Creation Course";
  const firedRef = useRef(false);

  const whatsappMessage = `Hi Creators College, my payment of ₹5,000 is completed. Please send my course access on WhatsApp.\n\nOrder ID: ${orderId || "N/A"}\nName: ${name || "N/A"}\nPhone: ${phone || "N/A"}\nCourse: ${course}`;
  const whatsappUrl = `https://wa.me/918143937367?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    if (typeof window === "undefined") return;
    if (!orderId) return;

    const storageKey = `cc_purchase_${orderId}`;
    if (sessionStorage.getItem(storageKey)) return;
    sessionStorage.setItem(storageKey, "1");

    const eventId = `purchase_${orderId || Date.now()}`;
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    fbq?.(
      "track",
      "Purchase",
      {
        content_name: course,
        value: 5000,
        currency: "INR",
      },
      { eventID: eventId }
    );

    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email: "",
        eventId,
        url: window.location.href,
        source: course,
        eventName: "Purchase",
        value: 5000,
        currency: "INR",
      }),
    }).catch((error) => console.error("Meta CAPI Purchase trigger error (silent):", error));
  }, [orderId, course, name, phone]);

  useEffect(() => {
    if (!orderId) return;
    const timer = setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 4000);
    return () => clearTimeout(timer);
  }, [orderId, whatsappUrl]);

  return (
    <div className="flex-grow bg-brand-gray/30 dark:bg-brand-gray/10 py-14 md:py-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-[#0d1424] shadow-[0_30px_70px_-40px_rgba(15,23,42,0.35)] overflow-hidden">
          <div className="bg-gradient-to-br from-[#123c9e] to-[#071c4d] px-6 py-10 text-center text-white">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 border border-white/15">
              <CheckCircle2 size={34} className="text-green-400" />
            </span>
            <h1 className="mt-5 text-2xl md:text-3xl font-bold tracking-tight">Payment received</h1>
            <p className="mt-2 text-sm text-white/70 max-w-md mx-auto leading-relaxed">
              Your enrollment is almost active. One last step — send the confirmation on WhatsApp so our team can
              verify your payment and share your course access.
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-[#f8f7f3] dark:bg-white/[0.03] p-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500 dark:text-gray-400">Course</span>
                <span className="font-semibold text-right text-brand-charcoal dark:text-white">{course}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500 dark:text-gray-400">Amount</span>
                <span className="font-semibold text-brand-charcoal dark:text-white">₹5,000</span>
              </div>
              {orderId && (
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500 dark:text-gray-400">Order ID</span>
                  <span className="font-mono text-xs break-all text-right text-brand-charcoal dark:text-white">
                    {orderId}
                  </span>
                </div>
              )}
              {name && (
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500 dark:text-gray-400">Name</span>
                  <span className="font-semibold text-right text-brand-charcoal dark:text-white">{name}</span>
                </div>
              )}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 px-6 py-3.5 text-sm font-semibold text-white transition shadow-lg shadow-green-600/20"
            >
              <MessageCircle size={17} />
              Send Confirmation on WhatsApp
            </a>
            <p className="text-center text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
              Our team verifies the payment and shares your course access on WhatsApp, usually within a few hours.
            </p>
            {orderId && (
              <p className="text-center text-[10px] text-brand-orange">
                Opening WhatsApp automatically in a few seconds...
              </p>
            )}

            <div className="border-t border-gray-100 dark:border-white/10 pt-5 space-y-3">
              <h2 className="text-sm font-semibold text-brand-blue dark:text-white">What happens next</h2>
              {[
                "Our team verifies your payment using the order details.",
                "You receive your course access and batch details on WhatsApp.",
                "Start learning immediately — lifetime recordings included.",
              ].map((step, index) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-[11px] font-semibold text-brand-orange">
                    {index + 1}
                  </span>
                  <span className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">{step}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 dark:border-white/10 pt-5 text-[11px] text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center gap-1.5">
                <Lock size={12} className="text-brand-orange" />
                Course access is shared privately
              </span>
              <Link href="/refund-policy" className="inline-flex items-center gap-1 font-medium underline hover:text-brand-orange">
                <ShieldCheck size={12} />
                Refund policy
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link
                href="/courses"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-white/15 px-5 py-3 text-sm font-semibold text-brand-blue dark:text-white transition hover:border-brand-blue/30"
              >
                View Courses
              </Link>
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-blue-dark"
              >
                Back to Home
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
