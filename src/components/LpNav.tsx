"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { ChevronRight, Phone, Menu, X } from "lucide-react";

interface LpNavProps {
  onEnroll?: () => void;
}

export default function LpNav({ onEnroll }: LpNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      {/* Top offer strip */}
      <div className="w-full bg-brand-orange text-white py-2 px-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-[11px] sm:text-xs font-bold z-50 relative">
        <span>🔥 Launch Offer: ₹30,000 Course at ₹5,000</span>
        <span className="hidden sm:inline">— Limited-Time Enrolment</span>
      </div>

      {/* Sticky minimal nav */}
      <nav className={`sticky top-0 z-40 transition-all duration-200 border-b border-gray-100 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3">

          {/* Logo */}
          <NextLink href="/" className="shrink-0">
            <img
              src="/logo/2 Horizontal Logo.png"
              alt="Creators College Logo"
              className="h-9 sm:h-12 w-auto object-contain dark-logo-stroke"
            />
          </NextLink>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
            {navLinks.map((link) => (
              <NextLink key={link.href} href={link.href} className="hover:text-brand-orange transition">
                {link.label}
              </NextLink>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <a
              href="tel:+918143937367"
              className="hidden sm:flex items-center gap-1.5 text-brand-blue font-bold text-xs border border-brand-blue/20 px-3 py-2 rounded-full hover:bg-brand-blue/5 transition"
            >
              <Phone size={12} /> +91 81439 37367
            </a>
            <button
              onClick={onEnroll}
              id="nav-cta-btn"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm transition flex items-center gap-1.5 shadow-md shadow-brand-orange/20 active:scale-95 whitespace-nowrap animate-enroll"
            >
              Enroll Now <ChevronRight size={13} />
            </button>

            {/* Mobile Hamburger menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-brand-charcoal hover:text-brand-orange focus:outline-none transition duration-200"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl py-3 px-4 space-y-1 animate-fadeIn">
            {navLinks.map((link) => (
              <NextLink
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl text-sm font-bold text-brand-charcoal hover:bg-gray-50 hover:text-brand-orange transition"
              >
                {link.label}
              </NextLink>
            ))}
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="tel:+918143937367"
                className="flex items-center justify-center gap-1.5 text-brand-blue font-bold text-xs border border-brand-blue/20 py-3 rounded-xl hover:bg-brand-blue/5 transition"
              >
                <Phone size={12} /> Call Us: +91 81439 37367
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
