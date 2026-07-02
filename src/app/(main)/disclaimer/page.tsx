import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Disclaimer() {
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

        <h1 className="text-3xl font-black text-brand-blue dark:text-white tracking-tight">Disclaimer</h1>
        <p className="text-xs text-gray-400">Effective Date: July 2, 2026</p>

        <div className="space-y-6 text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
          <p>
            The information provided on Creators College is for educational purposes only.
          </p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">No Guaranteed Results</h3>
          <p>We provide practical training, templates, and industry insights. However, we do not guarantee:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Employment or job placements</li>
            <li>Freelance projects or client bookings</li>
            <li>Business revenue growth</li>
            <li>Social media follower metrics or virality</li>
            <li>Specific income generation levels</li>
          </ul>
          <p>Individual success depends entirely on personal effort, dedication, creativity, and execution speed.</p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Educational Purpose</h3>
          <p>All training lectures, PDFs, resource sheets, and community review feedbacks are compiled and intended for educational use only.</p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Third-Party Platforms</h3>
          <p>
            Creators College is not affiliated with, sponsored by, or endorsed by: Instagram, Facebook, YouTube, CapCut, Adobe, DaVinci Resolve, or any of their parent corporations. All software logos and trademarks belong to their respective owners.
          </p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">External Links</h3>
          <p>
            Our website may contain hyperlinks directing you to external websites. We are not responsible for the content, privacy protocols, or terms of third-party platforms.
          </p>
        </div>
      </div>
    </div>
  );
}
