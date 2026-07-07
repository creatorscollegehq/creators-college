"use client";

import React, { useState } from "react";
import { Phone, ClipboardList } from "lucide-react";
import WhatsAppGateModal from "./WhatsAppGateModal";
import InstantFormModal from "./InstantFormModal";

export default function FloatingContact() {
  const phone = "+918143937367";
  const whatsappUrl = `https://wa.me/918143937367?text=${encodeURIComponent("Hi Creators College, I'd like to enquire about your courses.")}`;
  const [isWhatsAppGateOpen, setIsWhatsAppGateOpen] = useState(false);
  const [isInstantFormOpen, setIsInstantFormOpen] = useState(false);

  return (
    <>
      {/* Floating Call Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-45 group">
        <a
          href={`tel:${phone}`}
          className="w-14 h-14 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white flex items-center justify-center shadow-[0_8px_30px_rgb(249,115,22,0.3)] transition hover-lift duration-250 relative cursor-pointer"
          aria-label="Call Coordinator"
        >
          <Phone size={24} className="stroke-[2.5]" />
          <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-brand-charcoal text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Call Coordinator
          </span>
        </a>
      </div>

      {/* Floating Callback / Instant Form Button (Bottom Right, above WhatsApp) */}
      <div className="fixed bottom-[88px] right-6 z-45 group">
        <button
          onClick={() => setIsInstantFormOpen(true)}
          className="w-14 h-14 rounded-full bg-brand-blue hover:bg-brand-blue-dark text-white flex items-center justify-center shadow-[0_8px_30px_rgb(11,21,43,0.35)] transition hover-lift duration-250 relative cursor-pointer focus:outline-none"
          aria-label="Instant Contact Form"
        >
          <ClipboardList size={22} className="stroke-[2.5] animate-bounce" />
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-brand-charcoal text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
            ⚡ Instant Form
          </span>
        </button>
      </div>

      {/* Floating WhatsApp Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-45 group">
        <button
          onClick={() => setIsWhatsAppGateOpen(true)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition hover-lift duration-250 relative cursor-pointer focus:outline-none"
          aria-label="Chat on WhatsApp"
        >
          <img
            src="/whatsapp-logo.png"
            alt="WhatsApp logo"
            className="w-full h-full object-contain"
          />
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-brand-charcoal text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Enquire on WhatsApp
          </span>
        </button>
      </div>

      <WhatsAppGateModal
        isOpen={isWhatsAppGateOpen}
        onClose={() => setIsWhatsAppGateOpen(false)}
        whatsappUrl={whatsappUrl}
      />

      <InstantFormModal
        isOpen={isInstantFormOpen}
        onClose={() => setIsInstantFormOpen(false)}
      />
    </>
  );
}
