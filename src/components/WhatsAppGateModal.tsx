"use client";

import React, { useState } from "react";
import { X, Send } from "lucide-react";

interface WhatsAppGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl: string;
}

export default function WhatsAppGateModal({ isOpen, onClose, whatsappUrl }: WhatsAppGateModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please fill in all details.");
      return;
    }
    if (phone.replace(/[^0-9]/g, "").length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Save lead details to localStorage
    const savedLeads = JSON.parse(localStorage.getItem("whatsapp_leads") || "[]");
    savedLeads.push({
      name,
      phone,
      time: new Date().toLocaleString(),
      url: window.location.href,
    });
    localStorage.setItem("whatsapp_leads", JSON.stringify(savedLeads));

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#131b2e] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition"
        >
          <X size={20} />
        </button>

        <div className="p-6 text-center space-y-6">
          <img
            src="/whatsapp-logo.png"
            alt="WhatsApp Logo"
            className="w-16 h-16 object-contain mx-auto"
          />
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-bold text-brand-blue dark:text-white">Chat with Coordinator</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
              Please enter your name and phone number to start your chat on WhatsApp directly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {error && (
              <p className="text-red-500 text-xs text-center font-semibold bg-red-500/10 p-2 rounded-lg">
                {error}
              </p>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-sm focus:outline-none dark:bg-white/5 dark:text-white"
                placeholder="e.g. Sandeep Kumar"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Phone / WhatsApp Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-sm focus:outline-none dark:bg-white/5 dark:text-white"
                placeholder="e.g. 9876543210"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-sm transition hover-lift shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={16} />
              Proceed to WhatsApp Chat
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
