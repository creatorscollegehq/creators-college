import React from "react";
import LeadForm from "@/components/LeadForm";
import { Check, Sparkles } from "lucide-react";

export default function ContentCreationLandingPage() {
  const highlights = [
    "Learn to outline viral video concepts",
    "Master the 3-second attention-grabbing hook formula",
    "Professional phone camera & lighting configurations",
    "Step-by-step video editing (CapCut & Premiere)",
    "Algorithm hacks to scale YouTube & Instagram organic views"
  ];

  return (
    <div className="w-full bg-brand-gray/30 py-12 md:py-20 flex-grow flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Ad Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-brand-orange/15 text-brand-orange px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles size={12} className="stroke-[2.5]" />
              Limited Seats for Next Batch
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-blue tracking-tight leading-tight">
              Master Content Creation in Telugu. <br />
              <span className="text-brand-orange">Build a Profitable Digital Career.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl">
              Taught step-by-step from scratch. Learn topic selection, professional shooting setups, high-impact video editing, and organic social media distribution methods.
            </p>

            <div className="space-y-3 pt-2">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                    <Check size={12} className="stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-brand-charcoal">{h}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200/60 pt-6 text-xs text-gray-400">
              Founded in 2026 • 1,200+ trained students • Scan & Pay via UPI available.
            </div>
          </div>

          {/* Inline Form */}
          <div className="lg:col-span-5 w-full">
            <LeadForm defaultCourse="Complete Telugu Content Creation Course" isLandingPage={true} />
          </div>

        </div>
      </div>
    </div>
  );
}
