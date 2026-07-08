import React from "react";
import LeadForm from "@/components/LeadForm";
import { Check, GraduationCap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Content Creation Workshops & Elective Bootcamps | Creators College",
  description: "Bring practical content creation, smartphone shooting, and video editing bootcamps to your college campus. Prepare students for freelancing and the creator economy.",
  keywords: [
    "College Content Creation Workshop",
    "University Video Editing Bootcamp",
    "Campus Creator Electives",
    "Student Digital Media Training"
  ]
};

export default function CollegeWorkshopsLandingPage() {
  const highlights = [
    "Interactive 2-day bootcamps on campus",
    "Hands-on mobile video editing labs",
    "Fundamentals of starting YouTube channels & personal brands",
    "Certification of participation for all attendees",
    "Direct Q&A on freelancing options in the creator economy"
  ];

  return (
    <div className="w-full bg-brand-gray/30 py-12 md:py-20 flex-grow flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Ad Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-brand-blue/15 text-brand-blue px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <GraduationCap size={12} className="stroke-[2.5]" />
              Campus Bootcamps & Electives
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-blue tracking-tight leading-tight">
              Practical College Workshops. <br />
              <span className="text-brand-orange">Prepare Students for the Creator Economy.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl">
              Upskill university students with highly demanded digital skills. Learn professional scripting, camera layouts, and quick editing workflows.
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
              Co-hosted alongside college student clubs and computer science/media electives departments.
            </div>
          </div>

          {/* Inline Form */}
          <div className="lg:col-span-5 w-full">
            <LeadForm defaultCourse="College Workshops" isLandingPage={true} />
          </div>

        </div>
      </div>
    </div>
  );
}
