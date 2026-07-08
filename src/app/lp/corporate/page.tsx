import React from "react";
import LeadForm from "@/components/LeadForm";
import { Check, Building } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Video & Content Creation Training for Teams | Creators College",
  description: "Scale your organization's organic footprint. Train your marketing, sales, and branding teams to write, shoot, and edit professional videos.",
  keywords: [
    "Corporate Content Creator Training",
    "Employee Video Editing Workshop",
    "B2B Group Coaching Video",
    "Marketing Team Video Bootcamp"
  ]
};

export default function CorporateLandingPage() {
  const highlights = [
    "Upskill branding and social media teams",
    "Establish consistent video shooting guidelines",
    "Streamline post-production editing speed",
    "Design templates matching company brand guidelines",
    "Increase organic impressions on LinkedIn, YouTube & Reels"
  ];

  return (
    <div className="w-full bg-brand-gray/30 py-12 md:py-20 flex-grow flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Ad Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-brand-blue/15 text-brand-blue px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Building size={12} className="stroke-[2.5]" />
              B2B Group Coaching Programs
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-blue tracking-tight leading-tight">
              Corporate Content Creation Training. <br />
              <span className="text-brand-orange">Scale Your Brand's Organic Reach.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl">
              Upskill your marketing, HR, and communication departments. Train your employees to script, film, and edit engaging corporate and product videos.
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
              Customized modules co-designed around company products and brand style guides.
            </div>
          </div>

          {/* Inline Form */}
          <div className="lg:col-span-5 w-full">
            <LeadForm defaultCourse="Corporate Content Creation Training" isLandingPage={true} />
          </div>

        </div>
      </div>
    </div>
  );
}
