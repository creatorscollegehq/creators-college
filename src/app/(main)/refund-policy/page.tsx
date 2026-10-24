import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const points = [
  {
    title: "Payment issues and duplicate charges",
    body: "If a payment fails, gets deducted twice, or shows an incorrect amount, contact our team within 48 hours with your order details. After verification, duplicate or failed charges are reversed to the original payment method.",
  },
  {
    title: "Digital course access",
    body: "Course access, recordings, and resources are delivered digitally on WhatsApp. Once access has been shared, the course fee is non-refundable. Batch transfer requests are considered within 7 days of enrollment, subject to seat availability.",
  },
  {
    title: "Before your access is delivered",
    body: "We recommend attending the free demo class before enrolling. If you have any concern before your course access is shared, contact our support team — we will resolve the issue or process an eligible refund.",
  },
];

export default function RefundPolicy() {
  return (
    <div className="w-full bg-white dark:bg-[#090d16] py-5 md:py-7 text-left">
      <div className="max-w-3xl mx-auto px-4 space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-blue transition"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-brand-blue dark:text-white tracking-tight">Refund Policy</h1>
          <p className="text-xs text-gray-400">Effective Date: October 24, 2026</p>
        </div>

        <div className="rounded-2xl border border-brand-orange/20 bg-brand-orange/5 p-4 flex items-start gap-3">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-brand-orange" />
          <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">
            We keep our refund policy simple and transparent. These are the only three points that apply to every
            enrollment.
          </p>
        </div>

        <div className="space-y-4">
          {points.map((point, index) => (
            <div
              key={point.title}
              className="rounded-2xl border border-gray-100 dark:border-white/10 bg-[#f8f7f3] dark:bg-white/[0.03] p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-xs font-semibold text-brand-orange">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-brand-blue dark:text-white">{point.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{point.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 dark:border-white/10 pt-6 text-sm text-gray-500 dark:text-gray-400">
          <p className="font-semibold text-brand-blue dark:text-white">Contact us</p>
          <p className="mt-2">
            Email:{" "}
            <a href="mailto:enquiry@creatorscollege.com" className="text-brand-orange hover:underline">
              enquiry@creatorscollege.com
            </a>
            <br />
            Phone: +91 81439 37367
          </p>
        </div>
      </div>
    </div>
  );
}
