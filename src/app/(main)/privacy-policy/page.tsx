import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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

        <h1 className="text-3xl font-black text-brand-blue dark:text-white tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-gray-400">Effective Date: July 2, 2026</p>

        <div className="space-y-6 text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
          <p>
            Welcome to Creators College. We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect the information you provide while using our website and services.
          </p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Information We Collect</h3>
          <p>We may collect the following information:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full Name</li>
            <li>Mobile Number</li>
            <li>Email Address</li>
            <li>City</li>
            <li>Course Preferences</li>
            <li>Inquiry Details</li>
            <li>Payment Information (processed through secure payment providers)</li>
            <li>Website Usage Data</li>
            <li>Device &amp; Browser Information</li>
          </ul>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">How We Use Your Information</h3>
          <p>We use your information to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Respond to your enquiries</li>
            <li>Process course registrations</li>
            <li>Share course updates</li>
            <li>Send demo class information</li>
            <li>Provide learning support</li>
            <li>Improve our courses and website</li>
            <li>Notify you about new courses and offers</li>
          </ul>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Information Security</h3>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized access, misuse, or disclosure.
          </p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Third-Party Services</h3>
          <p>Our website may use trusted third-party services including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Google Analytics</li>
            <li>Google Maps</li>
            <li>YouTube</li>
            <li>Meta (Facebook &amp; Instagram)</li>
            <li>WhatsApp</li>
          </ul>
          <p>These services have their own privacy policies.</p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Cookies</h3>
          <p>
            Our website may use cookies to improve your browsing experience and analyze website performance.
          </p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Your Rights</h3>
          <p>You may request to access, update, or delete your information, or stop receiving promotional communications from us.</p>

          <h3 className="text-lg font-bold text-brand-blue dark:text-white pt-2">Contact</h3>
          <p>Email: <a href="mailto:info@creatorscollege.in" className="text-brand-orange hover:underline">info@creatorscollege.in</a></p>
        </div>
      </div>
    </div>
  );
}
