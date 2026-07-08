"use client";

import React, { useState, useEffect } from "react";
import { Phone, ClipboardList } from "lucide-react";
import WhatsAppGateModal from "./WhatsAppGateModal";
import InstantFormModal from "./InstantFormModal";

export default function FloatingContact() {
  const phone = "+918143937367";
  const whatsappUrl = `https://wa.me/918143937367?text=${encodeURIComponent("Hi Creators College, I'd like to enquire about your courses.")}`;
  const [isWhatsAppGateOpen, setIsWhatsAppGateOpen] = useState(false);
  const [isInstantFormOpen, setIsInstantFormOpen] = useState(false);
  const [formSource, setFormSource] = useState("Instant Form Floating Button");

  // One-time automatic popup trigger after 5 seconds of page interaction/load
  useEffect(() => {
    const hasPopupBeenShown = sessionStorage.getItem("scroll_popup_shown");
    if (hasPopupBeenShown) return;

    const timer = setTimeout(() => {
      setFormSource(`Automatic Scroll Popup - ${window.location.pathname}`);
      setIsInstantFormOpen(true);
      sessionStorage.setItem("scroll_popup_shown", "true");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating Action Buttons Stack (Vertical, Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-45 flex flex-col items-center gap-3">
        {/* Call Button */}
        <div className="group relative">
          <a
            href={`tel:${phone}`}
            className="w-12 h-12 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white flex items-center justify-center shadow-lg transition hover-lift duration-250 relative cursor-pointer"
            aria-label="Call Coordinator"
          >
            <Phone size={20} className="stroke-[2.5]" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-brand-charcoal text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Call Coordinator
            </span>
          </a>
        </div>

        {/* Instant Form Button */}
        <div className="group relative">
          <button
            onClick={() => {
              setFormSource(`Instant Form Floating Button - ${window.location.pathname}`);
              setIsInstantFormOpen(true);
            }}
            className="w-12 h-12 rounded-full bg-brand-blue hover:bg-brand-blue-dark text-white flex items-center justify-center shadow-lg transition hover-lift duration-250 relative cursor-pointer focus:outline-none"
            aria-label="Instant Contact Form"
          >
            <ClipboardList size={20} className="stroke-[2.5]" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-brand-charcoal text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
              ⚡ Instant Form
            </span>
          </button>
        </div>

        {/* WhatsApp Button */}
        <div className="group relative">
          <button
            onClick={() => setIsWhatsAppGateOpen(true)}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition hover-lift duration-250 relative cursor-pointer focus:outline-none bg-white p-0.5 border border-gray-100 dark:border-white/5"
            aria-label="Chat on WhatsApp"
          >
            <img
              src="/whatsapp-logo.png"
              alt="WhatsApp logo"
              className="w-full h-full object-contain"
            />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-brand-charcoal text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
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
