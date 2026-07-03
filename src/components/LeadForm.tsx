"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";

interface LeadFormProps {
  defaultCourse?: string;
  isLandingPage?: boolean;
}

export default function LeadForm({ defaultCourse = "Content Creation Course", isLandingPage = false }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    sameAsPhone: true,
    email: "",
    course: defaultCourse,
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      tempErrors.phone = "Invalid phone number";
    }

    if (!formData.sameAsPhone && !formData.whatsapp.trim()) {
      tempErrors.whatsapp = "WhatsApp number is required";
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      tempErrors.email = "Invalid email format";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      sameAsPhone: checked,
      whatsapp: checked ? "" : prev.whatsapp,
    }));
    if (checked && errors.whatsapp) {
      setErrors((prev) => ({ ...prev, whatsapp: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-brand-blue/10 border border-brand-blue/30 p-8 rounded-2xl text-center space-y-6 max-w-lg mx-auto shadow-xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-orange/20 text-brand-orange mb-2">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="text-2xl font-bold text-brand-blue dark:text-white tracking-tight">Enrollment Request Received!</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-normal">
          Hello <strong className="text-brand-charcoal dark:text-white">{formData.name}</strong>, thank you for choosing Creators College. Our academic coordinator will contact you on WhatsApp/Phone at <strong className="text-brand-charcoal dark:text-white">{formData.phone}</strong> within the next 2 hours.
        </p>

        <div className="bg-white dark:bg-[#090d16] p-5 rounded-xl border border-gray-100 dark:border-white/5 text-left space-y-3">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Enrollment Details</div>
          <div className="text-sm text-brand-charcoal dark:text-white"><span className="text-gray-500">Program:</span> <strong>{formData.course}</strong></div>
          <div className="text-sm text-brand-charcoal dark:text-white"><span className="text-gray-500">Contact:</span> <strong>{formData.phone}</strong></div>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <a
            href={`https://wa.me/918143937367?text=${encodeURIComponent(
              `Hi Creators College, I just submitted an enrollment inquiry!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || "N/A"}\nCourse: ${formData.course}\nMessage: ${formData.message || "N/A"}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-md text-sm cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-green-600/20 active:scale-[0.98]"
          >
            <MessageSquare size={18} />
            Confirm &amp; Send on WhatsApp
          </a>

          <a
            href="/checkout"
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 px-6 rounded-full shadow-md text-sm text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-brand-orange/20 active:scale-[0.98]"
          >
            Go to Checkout &amp; Pay via UPI
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-brand-gray p-6 sm:p-8 rounded-2xl border border-brand-blue/15 dark:border-white/5 shadow-xl space-y-5 text-left">
      <div className="space-y-1">
        <h3 className="text-xl sm:text-2xl font-bold text-brand-blue dark:text-white tracking-tight">Get Started</h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-normal">Submit the form to request syllabus info or secure your seat.</p>
      </div>

      {/* Name */}
      <div className="space-y-1">
        <label htmlFor="name" className="block text-xs font-semibold text-gray-600 dark:text-white/80 uppercase tracking-wider">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
            errors.name ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-white/10 focus:border-brand-blue"
          }`}
          placeholder="e.g. Rahul Kumar"
        />
        {errors.name && (
          <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
            <AlertCircle size={12} /> {errors.name}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-1">
        <label htmlFor="phone" className="block text-xs font-semibold text-gray-600 dark:text-white/80 uppercase tracking-wider">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
            errors.phone ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-white/10 focus:border-brand-blue"
          }`}
          placeholder="e.g. +91 9876543210"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
            <AlertCircle size={12} /> {errors.phone}
          </p>
        )}
      </div>

      {/* WhatsApp Toggle */}
      <div className="flex items-center gap-2 py-1">
        <input
          type="checkbox"
          id="sameAsPhone"
          checked={formData.sameAsPhone}
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-brand-orange border-gray-300 dark:border-white/10 rounded focus:ring-brand-orange dark:bg-[#090d16]"
        />
        <label htmlFor="sameAsPhone" className="text-xs text-gray-600 dark:text-gray-300 font-medium">
          WhatsApp number is same as Phone Number
        </label>
      </div>

      {/* WhatsApp Input (conditional) */}
      {!formData.sameAsPhone && (
        <div className="space-y-1 animate-fadeIn">
          <label htmlFor="whatsapp" className="block text-xs font-semibold text-gray-600 dark:text-white/80 uppercase tracking-wider">
            WhatsApp Number
          </label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
              errors.whatsapp ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-white/10 focus:border-brand-blue"
            }`}
            placeholder="e.g. +91 9876543210"
          />
          {errors.whatsapp && (
            <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
              <AlertCircle size={12} /> {errors.whatsapp}
            </p>
          )}
        </div>
      )}

      {/* Email */}
      <div className="space-y-1">
        <label htmlFor="email" className="block text-xs font-semibold text-gray-600 dark:text-white/80 uppercase tracking-wider">
          Email Address (Optional)
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
            errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-white/10 focus:border-brand-blue"
          }`}
          placeholder="e.g. rahul@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
            <AlertCircle size={12} /> {errors.email}
          </p>
        )}
      </div>

      {/* Course Selector */}
      <div className="space-y-1">
        <label htmlFor="course" className="block text-xs font-semibold text-gray-600 dark:text-white/80 uppercase tracking-wider">
          Program of Interest
        </label>
        <select
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white"
        >
          <option value="Complete Telugu Content Creation Course" className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Complete Content Creation (Telugu)</option>
          <option value="CapCut Video Editing Course" className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">CapCut Video Editing Course</option>
          <option value="Free Demo Class" className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Free Demo Class Registration</option>
          <option value="Corporate Content Creation Training" className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Corporate Training</option>
          <option value="College Workshops" className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">College / School Workshops</option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label htmlFor="message" className="block text-xs font-semibold text-gray-600 dark:text-white/80 uppercase tracking-wider">
          Your Questions / Message (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
          placeholder="Ask us anything..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-brand-orange/20 cursor-pointer text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] ${
          isSubmitting ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </>
        ) : (
          <>
            <Send size={16} />
            Submit Enrollment Request
          </>
        )}
      </button>
    </form>
  );
}
