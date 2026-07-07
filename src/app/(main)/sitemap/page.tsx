import React from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Compass, ShieldCheck, Mail } from "lucide-react";

export default function Sitemap() {
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

        <h1 className="text-3xl font-black text-brand-blue dark:text-white tracking-tight">Sitemap</h1>
        <p className="text-xs text-gray-400">Creators College Page Directory</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          {/* Main Pages */}
          <div className="space-y-3 bg-brand-gray/30 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
            <h3 className="font-extrabold text-base text-brand-blue dark:text-white flex items-center gap-2">
              <Compass className="text-brand-orange" size={18} />
              Main Pages
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <li><Link href="/" className="hover:text-brand-orange">Home</Link></li>
              <li><Link href="/about" className="hover:text-brand-orange">About Us</Link></li>
              <li><Link href="/courses" className="hover:text-brand-orange">Courses Catalog</Link></li>
              <li><Link href="/corporate-training" className="hover:text-brand-orange">Corporate &amp; College Training</Link></li>
              <li><Link href="/success-stories" className="hover:text-brand-orange">Success Stories (Coming Soon)</Link></li>
              <li><Link href="/blog" className="hover:text-brand-orange">Creator Insights Blog</Link></li>
              <li><Link href="/contact" className="hover:text-brand-orange">Contact Us</Link></li>
            </ul>
          </div>

          {/* Academic & B2B Programs */}
          <div className="space-y-3 bg-brand-gray/30 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
            <h3 className="font-extrabold text-base text-brand-blue dark:text-white flex items-center gap-2">
              <Compass className="text-brand-orange" size={18} />
              Academic &amp; Corporate
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <li><strong>Current Courses:</strong></li>
              <li className="pl-4"><Link href="/courses" className="hover:text-brand-orange">Complete Telugu Content Creation Course</Link></li>
              <li className="pl-4"><Link href="/courses" className="hover:text-brand-orange">CapCut Video Editing Course</Link></li>
              <li><strong>Upcoming:</strong></li>
              <li className="pl-4">Adobe Premiere Pro</li>
              <li className="pl-4">Adobe After Effects</li>
              <li className="pl-4">DaVinci Resolve</li>
              <li><strong>Corporate:</strong></li>
              <li className="pl-4"><Link href="/corporate-training" className="hover:text-brand-orange">College Workshops &amp; Bootcamps</Link></li>
              <li className="pl-4"><Link href="/corporate-training" className="hover:text-brand-orange">School Programs &amp; Business Training</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3 bg-brand-gray/30 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5 md:col-span-2">
            <h3 className="font-extrabold text-base text-brand-blue dark:text-white flex items-center gap-2">
              <ShieldCheck className="text-brand-orange" size={18} />
              Legal Policies &amp; Terms
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <Link href="/privacy-policy" className="hover:text-brand-orange">• Privacy Policy</Link>
              <Link href="/terms-conditions" className="hover:text-brand-orange">• Terms &amp; Conditions</Link>
              <Link href="/refund-policy" className="hover:text-brand-orange">• Refund Policy</Link>
              <Link href="/disclaimer" className="hover:text-brand-orange">• Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
