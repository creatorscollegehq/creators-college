"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, PhoneCall } from "lucide-react";

interface InstantFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

export default function InstantFormModal({ isOpen, onClose, source }: InstantFormModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("Complete Telugu Content Creation Course");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim()) {
      setError("Please fill in all required details.");
      return;
    }

    if (phone.replace(/[^0-9]/g, "").length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          course,
          source: source || `Instant Callback Floating Widget - ${window.location.pathname}`,
          type: "instant", // Routes to "⚡ Instant Callback Leads" in Google Sheets
        }),
      });

      const result = await res.json();
      if (result.success) {
        setIsSuccess(true);
        // Auto close after 2 seconds on success
        setTimeout(() => {
          setIsSuccess(false);
          setName("");
          setPhone("");
          onClose();
        }, 2200);
      } else {
        setError(result.error || "Failed to submit lead request.");
      }
    } catch (err) {
      console.error("Error submitting instant lead:", err);
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#131b2e] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition"
        >
          <X size={20} />
        </button>

        <div className="p-6 text-center space-y-6">
          {isSuccess ? (
            <div className="py-6 space-y-4 animate-scaleUp">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-2">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold text-brand-blue dark:text-white">Request Submitted!</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
                Thank you! We will contact you on <strong className="text-brand-charcoal dark:text-white">{phone}</strong> within the next 15 minutes.
              </p>
            </div>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-blue-400">
                <PhoneCall size={22} className="animate-pulse" />
              </div>
              <div className="space-y-1.5 text-center">
                <h3 className="text-xl font-black text-brand-blue dark:text-white tracking-tight">Instant Contact Form</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                  Fill in your details below and we will contact you instantly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {error && (
                  <p className="text-red-500 text-xs text-center font-semibold bg-red-500/10 p-2 rounded-lg">
                    {error}
                  </p>
                )}

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-sm focus:outline-none dark:bg-white/5 dark:text-white placeholder:text-gray-400"
                    placeholder="e.g. Anand Sharma"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-sm focus:outline-none dark:bg-white/5 dark:text-white placeholder:text-gray-400"
                    placeholder="e.g. 9876543210"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Program of Interest</label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none dark:bg-white/5 dark:text-white"
                  >
                    <option value="Complete Telugu Content Creation Course" className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Complete Content Creation (Telugu)</option>
                    <option value="CapCut Video Editing Course" className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">CapCut Video Editing Course</option>
                    <option value="Free Demo Class" className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Free Demo Class Registration</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-3 rounded-lg text-sm transition hover:scale-[1.02] shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Submit Request
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
