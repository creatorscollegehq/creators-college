"use client";

import React, { useEffect, useState } from "react";
import { Phone, ClipboardList } from "lucide-react";
import WhatsAppGateModal from "./WhatsAppGateModal";
import InstantFormModal from "./InstantFormModal";
import WhatsAppIcon from "./WhatsAppIcon";

export default function FloatingContact() {
  const phone = "+918143937367";
  const whatsappUrl = `https://wa.me/918143937367?text=${encodeURIComponent("Hi Creators College, I'd like to enquire about your courses.")}`;
  const [isWhatsAppGateOpen, setIsWhatsAppGateOpen] = useState(false);
  const [isInstantFormOpen, setIsInstantFormOpen] = useState(false);
  const [formSource, setFormSource] = useState("Instant Form Floating Button");
  const [showOnMobile, setShowOnMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowOnMobile(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed bottom-[78px] left-3 z-40 flex flex-row items-center gap-1.5 rounded-full border border-gray-200/80 bg-white/95 p-1.5 shadow-xl backdrop-blur transition-all duration-300 dark:border-white/10 dark:bg-[#0b1220]/95 lg:bottom-6 lg:left-auto lg:right-6 lg:flex-col lg:gap-3 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
          showOnMobile
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0 lg:pointer-events-auto lg:translate-y-0 lg:opacity-100"
        }`}
      >
        <div className="group relative">
          <a
            href={`tel:${phone}`}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-brand-orange text-white shadow-lg transition duration-250 hover:bg-brand-orange-dark hover-lift lg:h-12 lg:w-12"
            aria-label="Call Coordinator"
          >
            <Phone size={17} className="stroke-[2.5] lg:hidden" />
            <Phone size={19} className="hidden stroke-[2.5] lg:block" />
            <span className="pointer-events-none absolute right-14 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-brand-charcoal px-3 py-1.5 text-xs font-bold text-white shadow-md opacity-0 transition group-hover:opacity-100 lg:block">
              Call Coordinator
            </span>
          </a>
        </div>

        <div className="group relative">
          <button
            onClick={() => {
              setFormSource(`Instant Form Floating Button - ${window.location.pathname}`);
              setIsInstantFormOpen(true);
            }}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-brand-blue text-white shadow-lg transition duration-250 hover:bg-brand-blue-dark hover-lift focus:outline-none lg:h-12 lg:w-12"
            aria-label="Instant Contact Form"
          >
            <ClipboardList size={17} className="stroke-[2.5] lg:hidden" />
            <ClipboardList size={19} className="hidden stroke-[2.5] lg:block" />
            <span className="pointer-events-none absolute right-14 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-brand-charcoal px-3 py-1.5 text-xs font-bold text-white shadow-md opacity-0 transition group-hover:opacity-100 lg:block">
              Instant Form
            </span>
          </button>
        </div>

        <div className="group relative">
          <button
            onClick={() => setIsWhatsAppGateOpen(true)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition duration-250 hover:bg-[#1fb959] hover-lift focus:outline-none lg:h-12 lg:w-12"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon size={20} className="lg:hidden" />
            <WhatsAppIcon size={23} className="hidden lg:block" />
            <span className="pointer-events-none absolute right-14 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-brand-charcoal px-3 py-1.5 text-xs font-bold text-white shadow-md opacity-0 transition group-hover:opacity-100 lg:block">
              Enquire on WhatsApp
            </span>
          </button>
        </div>
      </div>

      <WhatsAppGateModal
        isOpen={isWhatsAppGateOpen}
        onClose={() => setIsWhatsAppGateOpen(false)}
        whatsappUrl={whatsappUrl}
      />

      <InstantFormModal
        isOpen={isInstantFormOpen}
        onClose={() => setIsInstantFormOpen(false)}
        source={formSource}
      />
    </>
  );
}
