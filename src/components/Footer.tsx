"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

// Inline brand icon definitions since lucide-react v0.400+ removed them
const Instagram = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" fill="currentColor" />
  </svg>
);


export default function Footer() {
  const pathname = usePathname();

  // Hide footer on landing pages to maintain high conversion focus
  const isLandingPage = pathname?.startsWith("/lp/");
  if (isLandingPage) return null;

  return (
    <footer className="bg-[#111827] dark:bg-[#090d16] text-white border-t border-white/10 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <img
              src="/logo/2 Horizontal Logo.png"
              alt="Creators College Logo"
              className="h-14 w-auto object-contain mb-4 dark-logo-stroke"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              India's premium practical academy for content creators. Learn scripting, professional shooting, video editing, and social media growth in Telugu.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
                Learn • Create • Grow
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-brand-orange">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-brand-orange text-sm transition duration-150">
                  About Creators College
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-brand-orange text-sm transition duration-150">
                  Our Courses
                </Link>
              </li>
              <li>
                <Link href="/corporate-training" className="text-gray-400 hover:text-brand-orange text-sm transition duration-150">
                  Corporate & College Training
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-gray-400 hover:text-brand-orange text-sm transition duration-150">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-brand-orange text-sm transition duration-150">
                  Creator Resources Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-brand-orange">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-orange shrink-0 mt-1" size={18} />
                <span className="text-gray-400 text-sm leading-relaxed">
                  KPHB Road No 1, Hyderabad - 500085
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-brand-orange shrink-0" size={18} />
                <a href="tel:+918143937367" className="text-gray-400 hover:text-white text-sm transition duration-150">
                  +91 8143937367
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-brand-orange shrink-0" size={18} />
                <a href="mailto:enquiry@creatorscollege.com" className="text-gray-400 hover:text-white text-sm transition duration-150">
                  enquiry@creatorscollege.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels & Payment */}
          <div>
            <h3 className="text-white font-semibold text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-brand-orange">
              Connect With Us
            </h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.instagram.com/creatorscollege_/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition duration-200 text-white"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61591290489327"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition duration-200 text-white"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.youtube.com/@creatorscollegeofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition duration-200 text-white"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
            <div className="pt-2">
              <Link
                href="/checkout"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-2.5 px-4 rounded-xl text-xs transition duration-200 hover-lift shadow-md text-center"
              >
                Secure Online Enrollment &rarr;
              </Link>
            </div>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex flex-col gap-1 items-center sm:items-start">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Creators College. All rights reserved. Founded in 2026.
            </p>
            <p className="text-gray-600 text-[10px]">
              Designed & Developed by{" "}
              <a href="https://www.creatorscollege.in" className="hover:text-brand-orange text-gray-500 hover:underline transition">
                Creators College Team
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-end text-xs text-gray-500">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition duration-150">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-gray-300 transition duration-150">Terms &amp; Conditions</Link>
            <Link href="/refund-policy" className="hover:text-gray-300 transition duration-150">Refund Policy</Link>
            <Link href="/disclaimer" className="hover:text-gray-300 transition duration-150">Disclaimer</Link>
            <Link href="/sitemap" className="hover:text-gray-300 transition duration-150">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
