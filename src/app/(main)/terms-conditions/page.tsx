import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsConditions() {
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

        <h1 className="text-3xl font-black text-brand-blue dark:text-white tracking-tight">Terms &amp; Conditions</h1>
        <p className="text-xs text-gray-400">Effective Date: July 2, 2026</p>

        <div className="space-y-6 text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
          <p>
            By accessing www.creatorscollege.in, you agree to comply with these Terms &amp; Conditions.
          </p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Course Access</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Enrollment provides access only to the purchased course.</li>
            <li>Course content is intended for personal learning only.</li>
          </ul>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Intellectual Property</h3>
          <p>All course materials including: Videos, PDFs, Presentations, Templates, Graphics, and Website Content remain the intellectual property of Creators College.</p>
          <p className="font-bold text-red-500">
            Unauthorized sharing, recording, downloading, or redistribution is strictly prohibited.
          </p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Student Responsibilities</h3>
          <p>Students agree to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide accurate information</li>
            <li>Maintain respectful communication</li>
            <li>Not share login credentials</li>
            <li>Follow classroom guidelines</li>
          </ul>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Course Updates</h3>
          <p>
            Creators College may update course content, schedules, or curriculum without prior notice to improve learning quality.
          </p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Limitation of Liability</h3>
          <p>
            Creators College is not responsible for individual career outcomes, income, or business success. Results depend on individual effort and application.
          </p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Governing Law</h3>
          <p>These Terms are governed by the laws of India.</p>
        </div>
      </div>
    </div>
  );
}
