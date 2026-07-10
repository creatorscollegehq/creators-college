import React from "react";
import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import { Check, Sparkles, Video } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Creator & Video Editing Demo Class in Telugu | Creators College",
  description: "Register for our free 1-hour creator masterclass in Telugu. Learn social media algorithms, write high-retention video scripts, and watch a live Reels editing tutorial.",
  keywords: [
    "Free Video Editing Class Telugu",
    "Telugu creator demo class",
    "Creators College free masterclass",
    "YouTube scripting class Telugu"
  ]
};

export default function FreeDemoLandingPage() {
  const highlights = [
    "Understanding social media algorithms in 2026",
    "Writing your first high-retention video script",
    "Editing a reel live in under 15 minutes",
    "Q&A session to review your own channel handles",
    "Receive a free PDF cheatsheet of viral hooks"
  ];

  return (
    <>
      <Header />
      <div className="w-full bg-brand-gray/30 py-12 md:py-20 flex-grow flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Ad Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-brand-orange/15 text-brand-orange px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Video size={12} className="stroke-[2.5]" />
              Free Online Masterclass
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-blue tracking-tight leading-tight">
              Register for the Free Creator <br />
              <span className="text-brand-orange">Demo Class in Telugu.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl">
              Get an insider preview of our academy course curriculum. Learn how our alumni scaled their channels, filmed professional reels on basic smartphones, and closed B2B sponsorships.
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
              Live Zoom session link will be sent to your WhatsApp number.
            </div>
          </div>

          {/* Inline Form */}
          <div className="lg:col-span-5 w-full">
            <LeadForm defaultCourse="Free Demo Class" isLandingPage={true} />
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
