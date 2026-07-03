"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import WhatsAppGateModal from "./WhatsAppGateModal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isWhatsAppGateOpen, setIsWhatsAppGateOpen] = useState(false);
  const pathname = usePathname();

  // Load and apply theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const preferredTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferredTheme);
    if (preferredTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const isLandingPage = pathname?.startsWith("/lp/");

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Corporate Training", href: "/corporate-training" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ];

  // Responsive logo: Horizontal logo is used for all backgrounds with dark mode glow shadow
  const logoSrc = "/logo/2 Horizontal Logo.png";

  const announcementStripe = (
    <div className="w-full bg-brand-orange text-white py-2 px-4 text-center text-xs font-bold tracking-wide relative z-50 flex items-center justify-center gap-x-2 shadow-sm">
      <span className="hidden sm:inline">
        🔥 Launch Offer: ₹30,000 Course for Just ₹5,000 | Save ₹25,000 | Limited-Time Enrollment &rarr;
      </span>
      <span className="sm:hidden">
        🔥 Launch Offer: ₹30,000 Course for Just ₹5,000! &rarr;
      </span>
      <Link href="/checkout" className="underline hover:text-brand-charcoal transition inline-flex items-center gap-0.5 font-black uppercase whitespace-nowrap">
        Enroll
      </Link>
    </div>
  );

  if (isLandingPage) {
    return (
      <div className="w-full sticky top-0 z-50">
        {announcementStripe}
        <header className="w-full bg-brand-blue py-4 border-b border-brand-blue-dark dark:bg-brand-gray dark:border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="/logo/2 Horizontal Logo.png" 
                alt="Creators College Logo" 
                className="h-12 sm:h-16 w-auto object-contain transition-all dark-logo-stroke"
              />
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="text-white hover:text-brand-orange transition p-2 rounded-full hover:bg-white/5"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                onClick={() => setIsWhatsAppGateOpen(true)}
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-brand-orange/20 active:scale-[0.97]"
              >
                Chat with Coordinator
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="w-full sticky top-0 z-50">
      {announcementStripe}
      
      {/* Header wrapper switches bg colors seamlessly: White in Light mode, Navy black in Dark mode */}
      <header className="w-full bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-md border-b border-gray-200/60 dark:border-white/5 shadow-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 py-2">
              <Link href="/" className="flex items-center">
                <img
                  src={logoSrc}
                  alt="Creators College Logo"
                  className="h-14 sm:h-18 w-auto object-contain transition-all dark-logo-stroke"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-bold tracking-wide transition duration-200 py-2 border-b-2 hover:text-brand-orange ${
                      isActive
                        ? "text-brand-orange border-brand-orange"
                        : "text-brand-charcoal/80 dark:text-white/80 border-transparent hover:border-brand-orange/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA & Theme Selector */}
            <div className="hidden lg:flex items-center gap-5">
              <button
                onClick={toggleTheme}
                className="text-brand-charcoal dark:text-white hover:text-brand-orange transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <Link
                href="/checkout"
                className="bg-brand-orange hover:bg-brand-orange-dark text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide shadow-lg hover:shadow-brand-orange/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              >
                Enroll Now
              </Link>
            </div>

            {/* Mobile menu button & Theme toggle */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={toggleTheme}
                className="text-brand-charcoal dark:text-white hover:text-brand-orange transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-brand-charcoal dark:text-white hover:text-brand-orange focus:outline-none transition duration-200"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white dark:bg-[#090d16] border-b border-gray-200 dark:border-white/5 shadow-xl" id="mobile-menu">
            <div className="px-2 pt-2 pb-6 space-y-2 sm:px-3 text-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-3 rounded-md text-base font-bold transition duration-200 ${
                      isActive
                        ? "bg-brand-gray dark:bg-white/5 text-brand-orange"
                        : "text-brand-charcoal dark:text-white hover:bg-brand-gray dark:hover:bg-white/5 hover:text-brand-orange"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 px-3">
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-brand-orange hover:bg-brand-orange-dark text-white py-3 rounded-full text-base font-bold shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <WhatsAppGateModal
        isOpen={isWhatsAppGateOpen}
        onClose={() => setIsWhatsAppGateOpen(false)}
        whatsappUrl="https://wa.me/918143937367?text=Hi%20Creators%20College,%20I'd%20like%20to%20enquire%20about%20your%20courses."
      />
    </div>
  );
}
