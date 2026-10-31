"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  QrCode,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { CONTENT_CREATION_COURSE } from "@/data/contentCreationCourse";
import { track } from "@/lib/track";

interface CashfreeCheckoutInstance {
  checkout: (options: { paymentSessionId: string; redirectTarget: "_self" | "_blank" }) => Promise<void>;
}

type CashfreeWindow = Window & {
  Cashfree?: (options: { mode: "sandbox" | "production" }) => CashfreeCheckoutInstance;
  fbq?: (...args: unknown[]) => void;
};

const COURSE = {
  id: "content-creation",
  name: "Complete Telugu Content Creation Course",
  price: 5000,
  originalPrice: 30000,
  duration: "20 Days",
};

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cashfreeLoading, setCashfreeLoading] = useState(false);
  const [paymentNotice, setPaymentNotice] = useState("");
  const [showFallback, setShowFallback] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      tempErrors.phone = "Invalid phone number";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required for course access";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      tempErrors.email = "Invalid email format";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const trackInitiateCheckout = () => {
    const eventId = `checkout_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const fbq = (window as CashfreeWindow).fbq;

    fbq?.(
      "track",
      "InitiateCheckout",
      {
        content_name: COURSE.name,
        value: COURSE.price,
        currency: "INR",
      },
      { eventID: eventId }
    );

    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        eventId,
        url: window.location.href,
        source: COURSE.name,
        eventName: "InitiateCheckout",
        value: COURSE.price,
        currency: "INR",
      }),
    }).catch((err) => console.error("Meta CAPI trigger error (silent):", err));

    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || "N/A",
        course: COURSE.name,
        message: `Checkout started for ₹${COURSE.price}. Payment pending.`,
        source: "Checkout Page",
        type: "enrollment",
      }),
    }).catch((err) => console.error("Failed to post checkout lead:", err));
  };

  const loadCashfreeScript = () =>
    new Promise<boolean>((resolve) => {
      if (typeof window === "undefined") return resolve(false);
      if ((window as CashfreeWindow).Cashfree) return resolve(true);

      const existing = document.querySelector('script[data-cashfree-sdk="true"]') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener("load", () => resolve(true));
        existing.addEventListener("error", () => resolve(false));
        return;
      }

      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.async = true;
      script.dataset.cashfreeSdk = "true";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cashfreeLoading || !validate()) return;

    setCashfreeLoading(true);
    setPaymentNotice("");
    setShowFallback(false);
    trackInitiateCheckout();
    track("checkout_start", { course: COURSE.name }, { value: COURSE.price });

    let checkoutTimeout: ReturnType<typeof setTimeout> | undefined;
    let orderTimeout: ReturnType<typeof setTimeout> | undefined;
    const orderController = new AbortController();

    try {
      orderTimeout = setTimeout(() => orderController.abort(), 15000);
      const response = await fetch("/api/cashfree/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: orderController.signal,
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          courseId: COURSE.id,
          courseName: COURSE.name,
          amount: COURSE.price,
        }),
      });

      const data = await response.json();

      if (!data?.configured) {
        track("checkout_error", { reason: "not_configured" });
        setPaymentNotice(data?.message || "Cashfree is being activated. Please pay via UPI below.");
        setShowFallback(true);
        return;
      }

      if (!response.ok || !data?.paymentSessionId) {
        track("checkout_error", { reason: "order_failed", message: String(data?.error || "") });
        setPaymentNotice(data?.error || "Unable to start the payment. Please try UPI below.");
        setShowFallback(true);
        return;
      }

      checkoutTimeout = setTimeout(() => {
        track("checkout_error", { reason: "sdk_timeout", orderId: data.orderId });
        setPaymentNotice("Cashfree is taking too long to open. Please pay via UPI below or contact us on WhatsApp.");
        setShowFallback(true);
        setCashfreeLoading(false);
      }, 12000);

      const loaded = await loadCashfreeScript();
      if (!loaded) {
        track("checkout_error", { reason: "sdk_load", orderId: data.orderId });
        setPaymentNotice("Could not load the payment window. Please pay via UPI below.");
        setShowFallback(true);
        return;
      }

      const cashfree = (window as CashfreeWindow).Cashfree?.({
        mode: data.environment === "production" ? "production" : "sandbox",
      });
      if (!cashfree) {
        track("checkout_error", { reason: "sdk_missing", orderId: data.orderId });
        setPaymentNotice("Could not open the payment window. Please pay via UPI below.");
        setShowFallback(true);
        return;
      }

      await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (error) {
      console.error("Cashfree checkout error:", error);
      track("checkout_error", {
        reason: error instanceof DOMException && error.name === "AbortError" ? "order_timeout" : "network",
      });
      setPaymentNotice("Payment could not be started. Please pay via UPI below or contact us on WhatsApp.");
      setShowFallback(true);
    } finally {
      if (orderTimeout) clearTimeout(orderTimeout);
      if (checkoutTimeout) clearTimeout(checkoutTimeout);
      setCashfreeLoading(false);
    }
  };

  const upiDeepLink = `upi://pay?pa=cecilkumar99830-1@oksbi&pn=CreatorsCollege&am=${COURSE.price}&cu=INR&tn=CCEnroll`;

  const whatsappMsg = `Hi Creators College, I have completed the payment of ₹${COURSE.price} for the ${COURSE.name}. Please send my course access on WhatsApp.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || "N/A"}\nPayment method: UPI`;
  const whatsappUrl = `https://wa.me/918143937367?text=${encodeURIComponent(whatsappMsg)}`;
  const helpUrl =
    "https://wa.me/918143937367?text=Hi%2C%20I%20need%20help%20with%20the%20Content%20Creation%20Course%20checkout";

  return (
    <div className="flex-grow bg-[#F3F6F8] py-4 dark:bg-[#090d16] md:py-7">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-brand-orange">Home</Link>
          <span>/</span>
          <Link href="/courses/content-creation" className="hover:text-brand-orange">Content Creation Course</Link>
          <span>/</span>
          <span className="text-brand-orange">Checkout</span>
        </nav>

        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-orange">Secure Checkout</span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-3xl">
              Complete Your Enrollment
            </h1>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
              Enter your details and pay securely. After payment, sign in with the same Gmail to open your private course library.
            </p>
            <Link
              href="/learn"
              className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-orange hover:underline"
            >
              Already enrolled? Open My Course <ArrowRight size={12} />
            </Link>
          </div>
          <Link
            href="/courses/content-creation"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B1B4B] hover:text-brand-orange dark:text-white"
          >
            View course details <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="order-2 space-y-3 lg:order-1">
            <div className="rounded-2xl border border-gray-200/70 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0d1424] sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-[#0B1B4B] dark:text-white">Student Details</h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                  <Lock size={11} /> Secure form
                </span>
              </div>

              <form onSubmit={handlePayment} className="mt-3 space-y-3">
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#0B1B4B] outline-none transition focus:border-brand-orange dark:bg-white/5 dark:text-white ${
                      errors.name ? "border-red-500" : "border-gray-200 dark:border-white/10"
                    }`}
                    placeholder="e.g. Rahul Kumar"
                  />
                  {errors.name ? (
                    <p className="flex items-center gap-1 text-[11px] text-red-500">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#0B1B4B] outline-none transition focus:border-brand-orange dark:bg-white/5 dark:text-white ${
                      errors.phone ? "border-red-500" : "border-gray-200 dark:border-white/10"
                    }`}
                    placeholder="e.g. 9876543210"
                  />
                  {errors.phone ? (
                    <p className="flex items-center gap-1 text-[11px] text-red-500">
                      <AlertCircle size={12} /> {errors.phone}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#0B1B4B] outline-none transition focus:border-brand-orange dark:bg-white/5 dark:text-white ${
                      errors.email ? "border-red-500" : "border-gray-200 dark:border-white/10"
                    }`}
                    placeholder="e.g. rahul@gmail.com"
                  />
                  {errors.email ? (
                    <p className="flex items-center gap-1 text-[11px] text-red-500">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  ) : (
                    <p className="text-[10px] leading-relaxed text-gray-500 dark:text-gray-400">
                      Use the same Gmail you will use to sign in to My Course.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={cashfreeLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition hover:bg-brand-orange-dark disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {cashfreeLoading ? <Loader2 size={17} className="animate-spin" /> : <CreditCard size={17} />}
                  {cashfreeLoading ? "Opening secure payment..." : `Pay ₹${COURSE.price.toLocaleString("en-IN")} Securely`}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400">
                  <Lock size={10} /> UPI, Cards &amp; Netbanking · Powered by Cashfree
                </p>
              </form>

              <button
                type="button"
                onClick={() => setShowFallback((current) => !current)}
                className="mt-2 w-full text-center text-[11px] font-semibold text-gray-500 underline decoration-gray-300 underline-offset-2 transition hover:text-brand-orange dark:text-gray-400"
              >
                {showFallback ? "Hide UPI payment option" : "Payment not opening? Pay via UPI instead"}
              </button>
            </div>

            {paymentNotice ? (
              <div className="rounded-xl border border-brand-orange/20 bg-brand-orange/5 px-3.5 py-3 text-[11px] leading-relaxed text-[#0B1B4B] dark:text-gray-200">
                {paymentNotice}
              </div>
            ) : null}

            {showFallback ? (
              <div className="rounded-2xl border border-gray-200/70 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0d1424]">
                <div className="flex items-center gap-2">
                  <QrCode size={17} className="text-brand-orange" />
                  <h2 className="text-sm font-bold text-[#0B1B4B] dark:text-white">Pay Directly via UPI</h2>
                </div>
                <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                  Use the UPI ID below, then send the payment screenshot on WhatsApp.
                </p>

                <div className="mt-2.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center font-mono text-xs text-[#0B1B4B] select-all dark:border-white/10 dark:bg-white/5 dark:text-white">
                  cecilkumar99830-1@oksbi
                </div>

                <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                  <a
                    href={upiDeepLink}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2.5 text-[11px] font-bold text-[#0B1B4B] transition hover:border-brand-orange/40 sm:hidden dark:border-white/15 dark:text-white"
                  >
                    <Smartphone size={14} /> Pay with UPI App
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#1fb959] sm:col-span-2"
                  >
                    <WhatsAppIcon size={15} /> Send Payment Screenshot
                  </a>
                </div>
              </div>
            ) : null}

            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center gap-1"><ShieldCheck size={12} /> Secure payment</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 size={12} /> Access on WhatsApp</span>
              <a href={helpUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-[#0B1B4B] hover:text-brand-orange dark:text-white">
                <WhatsAppIcon size={12} className="text-[#25D366]" /> Need help?
              </a>
            </p>
          </div>

          <aside className="order-1 rounded-2xl border border-gray-200/70 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0d1424] lg:order-2 lg:sticky lg:top-24">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-orange">Order Summary</p>
                <h2 className="mt-1 text-sm font-bold leading-snug text-[#0B1B4B] dark:text-white">{COURSE.name}</h2>
              </div>
              <span className="shrink-0 rounded-full bg-[#FFC93C] px-2 py-1 text-[9px] font-bold text-[#0B1B4B]">Save ₹25,000</span>
            </div>

            <div className="mt-3 space-y-1.5 text-[11px] text-gray-600 dark:text-gray-300">
              <p className="flex items-center justify-between"><span>Duration</span><strong className="text-[#0B1B4B] dark:text-white">{COURSE.duration}</strong></p>
              <p className="flex items-center justify-between"><span>Modules</span><strong className="text-[#0B1B4B] dark:text-white">{CONTENT_CREATION_COURSE.totalModules} Modules</strong></p>
              <p className="flex items-center justify-between"><span>Lessons</span><strong className="text-[#0B1B4B] dark:text-white">{CONTENT_CREATION_COURSE.totalLessons} Lessons</strong></p>
              <p className="flex items-center justify-between"><span>Language</span><strong className="text-[#0B1B4B] dark:text-white">Telugu</strong></p>
            </div>

            <div className="mt-3 space-y-1.5 border-t border-gray-100 pt-3 text-[11px] dark:border-white/10">
              <p className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span>Original Price</span>
                <span className="line-through">₹{COURSE.originalPrice.toLocaleString("en-IN")}</span>
              </p>
              <p className="flex items-center justify-between font-semibold text-emerald-600">
                <span>Discount</span>
                <span>-₹{(COURSE.originalPrice - COURSE.price).toLocaleString("en-IN")}</span>
              </p>
              <p className="flex items-center justify-between border-t border-gray-100 pt-2 text-base font-bold text-[#0B1B4B] dark:border-white/10 dark:text-white">
                <span>Total</span>
                <span>₹{COURSE.price.toLocaleString("en-IN")}</span>
              </p>
            </div>

            <div className="mt-3 rounded-lg bg-[#F3F6F8] px-3 py-2.5 text-[10px] leading-relaxed text-gray-600 dark:bg-white/5 dark:text-gray-300">
              <p className="flex items-start gap-1.5"><CheckCircle2 size={12} className="mt-0.5 shrink-0 text-emerald-600" /> Lifetime recordings + certificate</p>
              <p className="mt-1 flex items-start gap-1.5"><WhatsAppIcon size={12} className="mt-0.5 shrink-0 text-[#25D366]" /> WhatsApp doubt support</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
