import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="w-full bg-white dark:bg-[#090d16] py-16 md:py-24 text-left">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-blue transition"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        <h1 className="text-3xl font-black text-brand-blue dark:text-white tracking-tight">Refund Policy</h1>
        <p className="text-xs text-gray-400">Effective Date: July 2, 2026</p>

        <div className="space-y-6 text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
          <p>
            At Creators College, we strive to provide high-quality learning experiences.
          </p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Refunds</h3>
          <p>All course fees are non-refundable once payment has been completed.</p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Batch Transfers</h3>
          <p>
            In special situations, Creators College may allow students to transfer to another batch based on seat availability.
          </p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Demo Classes</h3>
          <p>
            Students are strongly encouraged to attend the Free Demo Class before enrollment to understand the format and quality of our teaching.
          </p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Course Access</h3>
          <p>
            Once course access or recordings have been shared with the student, refunds will not be provided under any circumstances.
          </p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Payment Issues</h3>
          <p>
            If duplicate payments occur due to technical glitches, please contact our support team immediately for validation and reversal.
          </p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Contact Us</h3>
          <p>
            Email: <a href="mailto:enquiry@creatorscollege.com" className="text-brand-orange hover:underline">enquiry@creatorscollege.com</a><br />
            Phone: +91 81439 37367
          </p>
        </div>
      </div>
    </div>
  );
}
