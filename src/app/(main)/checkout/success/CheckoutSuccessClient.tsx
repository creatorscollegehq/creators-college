"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Lock, ShieldCheck } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { track } from "@/lib/track";

type Status = "checking" | "verified" | "error";

export default function CheckoutSuccessClient({ studentEmail }: { studentEmail: string }) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "";
  const course = searchParams.get("course") || "Complete Telugu Content Creation Course";
  const amountParam = Number(searchParams.get("amount"));
  const amount = Number.isFinite(amountParam) && amountParam >= 0 ? amountParam : 5000;

  const [status, setStatus] = useState<Status>("checking");
  const [message, setMessage] = useState("Verifying your payment with Cashfree...");
  const [verifiedEmail, setVerifiedEmail] = useState(studentEmail);
  const [studentName, setStudentName] = useState("");
  const purchaseFired = useRef(false);

  const whatsappMessage = `Hi Creators College, I need help with course access.\n\nOrder ID: ${orderId || "N/A"}\nName: ${
    studentName || "N/A"
  }\nEmail: ${verifiedEmail || studentEmail}`;
  const whatsappUrl = `https://wa.me/918143937367?text=${encodeURIComponent(whatsappMessage)}`;

  const trackPurchase = useCallback(
    (purchaseEmail: string, name: string, phone: string) => {
      if (purchaseFired.current) return;
      purchaseFired.current = true;

      const storageKey = `cc_purchase_${orderId}`;
      if (sessionStorage.getItem(storageKey)) return;
      sessionStorage.setItem(storageKey, "1");

      const eventId = `purchase_${orderId}`;
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      fbq?.(
        "track",
        "Purchase",
        { content_name: course, value: amount, currency: "INR" },
        { eventID: eventId }
      );

      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Student",
          phone: phone || "",
          email: purchaseEmail,
          eventId,
          url: window.location.href,
          source: course,
          eventName: "Purchase",
          value: amount,
          currency: "INR",
        }),
      }).catch((error) => console.error("Meta CAPI Purchase trigger error (silent):", error));
    },
    [amount, course, orderId]
  );

  const verifyAccess = useCallback(async () => {
    if (!orderId) {
      setStatus("error");
      track("payment_failed", { reason: "missing_order_id" });
      setMessage("This link is missing the order ID. Open your profile to check your access.");
      return;
    }

    setStatus("checking");
    setMessage("Verifying your payment with Cashfree...");

    try {
      const response = await fetch("/api/access/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        window.location.assign(`/learn/login?next=${encodeURIComponent(`/checkout/success?order_id=${orderId}`)}`);
        return;
      }

      if (!response.ok || !data?.ok) {
        setStatus("error");
        track("payment_failed", { reason: "not_verified", message: String(data?.error || "") }, { value: amount });
        setMessage(data?.error || "We could not unlock your course access yet.");
        return;
      }

      const enrollment = data?.enrollment || {};
      const purchaseEmail = String(enrollment.email || studentEmail).trim().toLowerCase();
      const name = String(enrollment.name || "");
      setVerifiedEmail(purchaseEmail);
      setStudentName(name);
      trackPurchase(purchaseEmail, name, String(enrollment.phone || ""));
      track("payment_verified", { orderId }, { value: amount });
      setStatus("verified");
      setMessage(`Payment verified. Your course is now active on ${purchaseEmail}.`);
    } catch (error) {
      console.error("Course access verification failed:", error);
      track("payment_failed", { reason: "network", orderId });
      setStatus("error");
      setMessage("Network error while verifying your payment. Check your connection and try again.");
    }
  }, [amount, orderId, studentEmail, trackPurchase]);

  useEffect(() => {
    const timer = setTimeout(() => void verifyAccess(), 0);
    return () => clearTimeout(timer);
  }, [verifyAccess]);

  return (
    <div className="flex-grow bg-brand-gray/30 dark:bg-brand-gray/10 py-5 md:py-7">
      <div className="max-w-2xl mx-auto px-4">
        <div className="rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-[#0d1424] shadow-[0_30px_70px_-40px_rgba(15,23,42,0.35)] overflow-hidden">
          <div className="bg-gradient-to-br from-[#123c9e] to-[#071c4d] px-6 py-5 md:py-7 text-center text-white">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 border border-white/15">
              {status === "verified" && <CheckCircle2 size={34} className="text-green-400" />}
              {status === "checking" && <Loader2 size={32} className="animate-spin text-white/80" />}
              {status === "error" && <AlertCircle size={32} className="text-amber-300" />}
            </span>
            <h1 className="mt-5 text-2xl md:text-3xl font-bold tracking-tight">
              {status === "verified"
                ? "You're in!"
                : status === "error"
                  ? "One quick check needed"
                  : "Confirming your payment"}
            </h1>
            <p className="mt-2 text-sm text-white/70 max-w-md mx-auto leading-relaxed">{message}</p>
          </div>

          <div className="p-6 md:p-6 space-y-4">
            <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-[#f8f7f3] dark:bg-white/[0.03] p-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500 dark:text-gray-400">Course</span>
                <span className="font-semibold text-right text-brand-charcoal dark:text-white">{course}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500 dark:text-gray-400">Amount</span>
                <span className="font-semibold text-brand-charcoal dark:text-white">
                  {amount > 0 ? `₹${amount.toLocaleString("en-IN")}` : "FREE"}
                </span>
              </div>
              {orderId && (
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500 dark:text-gray-400">Order ID</span>
                  <span className="font-mono text-xs break-all text-right text-brand-charcoal dark:text-white">
                    {orderId}
                  </span>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <span className="text-gray-500 dark:text-gray-400">Access email</span>
                <span className="font-semibold text-right text-brand-charcoal dark:text-white break-all">
                  {verifiedEmail}
                </span>
              </div>
            </div>

            {status === "verified" && (
              <>
                <Link
                  href="/learn"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-brand-orange-dark px-6 py-3.5 text-sm font-semibold text-white transition shadow-lg shadow-brand-orange/20"
                >
                  Go to My Profile
                  <ArrowRight size={16} />
                </Link>
                <p className="text-center text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Your course is saved to {verifiedEmail}. Open your profile anytime to continue learning.
                </p>
              </>
            )}

            {status === "error" && (
              <>
                <button
                  onClick={() => void verifyAccess()}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-brand-orange-dark px-6 py-3.5 text-sm font-semibold text-white transition shadow-lg shadow-brand-orange/20"
                >
                  <Loader2 size={16} />
                  Check Again
                </button>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/learn"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-white/15 px-5 py-3 text-sm font-semibold text-brand-blue dark:text-white transition hover:border-brand-blue/30"
                  >
                    Open my profile
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 px-5 py-3 text-sm font-semibold text-white transition"
                  >
                    <WhatsAppIcon size={16} />
                    Get Help
                  </a>
                </div>
                <p className="text-center text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  If money was debited but the order still shows unpaid, wait a minute and check again. Your bank
                  confirmation may take a little longer.
                </p>
              </>
            )}

            <div className="border-t border-gray-100 dark:border-white/10 pt-5 space-y-3">
              <h2 className="text-sm font-semibold text-brand-blue dark:text-white">How access works</h2>
              {[
                "We verify the payment directly with Cashfree — no manual approval needed.",
                "Your course is saved to your Google email and appears in your profile instantly.",
                "Every lesson is private and only visible to enrolled students.",
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
                Private, signed video access
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
