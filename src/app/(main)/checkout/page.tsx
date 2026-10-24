"use client";

import React, { useEffect, useState } from "react";
import { CreditCard, CheckCircle2, MessageSquare, AlertCircle, Smartphone, QrCode, Loader2, Lock, ShieldCheck } from "lucide-react";

interface CashfreeCheckoutInstance {
  checkout: (options: { paymentSessionId: string; redirectTarget: "_self" | "_blank" }) => Promise<void>;
}

type CashfreeWindow = Window & {
  Cashfree?: (options: { mode: "sandbox" | "production" }) => CashfreeCheckoutInstance;
  fbq?: (...args: unknown[]) => void;
};

export default function CheckoutPage() {
  const [selectedCourse, setSelectedCourse] = useState("content-creation");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderGenerated, setOrderGenerated] = useState(false);
  const [cashfreeLoading, setCashfreeLoading] = useState(false);
  const [paymentNotice, setPaymentNotice] = useState("");

  useEffect(() => {
    const requestedCourse = new URLSearchParams(window.location.search).get("course");
    if (requestedCourse !== "content-creation" && requestedCourse !== "capcut-editing") return;
    const timer = setTimeout(() => setSelectedCourse(requestedCourse), 0);
    return () => clearTimeout(timer);
  }, []);

  const courses = {
    "content-creation": {
      name: "Complete Telugu Content Creation Course",
      price: 5000,
      originalPrice: 30000,
      duration: "20 Days"
    },
    "capcut-editing": {
      name: "Complete Telugu CapCut Video Editing Course (Mobile & PC)",
      price: 5000,
      originalPrice: 30000,
      duration: "20 Days"
    }
  };

  const activeCourse = courses[selectedCourse as keyof typeof courses];

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      tempErrors.phone = "Invalid phone number";
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      tempErrors.email = "Invalid email format";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleGenerateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const eventId = `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Fire client-side Meta Pixel InitiateCheckout event
    const fbq = (window as CashfreeWindow).fbq;
    fbq?.('track', 'InitiateCheckout', {
      content_name: activeCourse.name,
      value: Number(activeCourse.price),
      currency: 'INR'
    }, {
      eventID: eventId
    });

    // Call server-side Meta Conversions API (CAPI) Proxy
    try {
      fetch("/api/meta-capi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          eventId: eventId,
          url: window.location.href,
          source: activeCourse.name,
          eventName: "InitiateCheckout",
          value: activeCourse.price,
          currency: "INR"
        }),
      }).catch(err => console.error("Meta CAPI trigger error (silent):", err));
    } catch {
      // Silent catch
    }

    // Send lead to Google Sheets API
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || "N/A",
          course: activeCourse.name,
          message: `Generated checkout order for ₹${activeCourse.price}. User needs to pay and send screenshot.`,
          source: `Checkout Page Form`,
          type: "enrollment",
        }),
      });
    } catch (err) {
      console.error("Failed to post checkout lead to Google Sheets:", err);
    }

    setOrderGenerated(true);
  };

  const loadCashfreeScript = () =>
    new Promise<boolean>((resolve) => {
      if (typeof window === "undefined") return resolve(false);
      if ((window as CashfreeWindow).Cashfree) return resolve(true);

      const existing = document.querySelector('script[data-cashfree-sdk="true"]') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener("load", () => resolve(true));
        existing.addEventListener("error", () => resolve(false));
        return;
      }

      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.async = true;
      script.dataset.cashfreeSdk = "true";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleCashfreePay = async () => {
    if (cashfreeLoading) return;
    setCashfreeLoading(true);
    setPaymentNotice("");

    try {
      const response = await fetch("/api/cashfree/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          courseId: selectedCourse,
          courseName: activeCourse.name,
          amount: activeCourse.price,
        }),
      });

      const data = await response.json();

      if (!data?.configured) {
        setPaymentNotice(data?.message || "Cashfree is being activated. Please pay via UPI below.");
        return;
      }

      if (!response.ok || !data?.paymentSessionId) {
        setPaymentNotice(data?.error || "Unable to start the payment. Please try UPI below.");
        return;
      }

      const loaded = await loadCashfreeScript();
      if (!loaded) {
        setPaymentNotice("Could not load the payment window. Please pay via UPI below.");
        return;
      }

      const cashfree = (window as CashfreeWindow).Cashfree?.({
        mode: data.environment === "production" ? "production" : "sandbox",
      });
      if (!cashfree) {
        setPaymentNotice("Could not open the payment window. Please pay via UPI below.");
        return;
      }
      await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (error) {
      console.error("Cashfree checkout error:", error);
      setPaymentNotice("Payment could not be started. Please pay via UPI below.");
    } finally {
      setCashfreeLoading(false);
    }
  };

  // Click-to-pay deep link for UPI apps on mobile (optimized parameters for Google Pay, PhonePe, Paytm compatibility)
  const upiDeepLink = `upi://pay?pa=cecilkumar99830-1@oksbi&pn=CreatorsCollege&am=${activeCourse.price}&cu=INR&tn=CCEnroll`;

  // WhatsApp text for sending payment screenshot
  const whatsappMsg = `Hi Creators College, I have completed the payment of ₹${activeCourse.price} for the ${activeCourse.name}. Please send my course access on WhatsApp.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || "N/A"}\nPayment method: UPI`;
  const whatsappUrl = `https://wa.me/918143937367?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="w-full bg-brand-gray/30 dark:bg-brand-gray/10 py-12 md:py-20 flex-grow">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">Secure Checkout</span>
          <h1 className="text-3xl font-bold text-brand-blue dark:text-white tracking-tight">Complete Your Enrollment</h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Enter your details and pay securely via Cashfree or UPI. After verification, your course access is sent
            directly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: details form & selector */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Course Selection */}
            {!orderGenerated && (
              <div className="bg-white dark:bg-brand-gray p-6 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-md text-left space-y-4">
                <h3 className="font-bold text-base text-brand-blue dark:text-white">1. Select Your Program</h3>
                
                <div className="space-y-3">
                  {Object.entries(courses).map(([key, value]) => (
                    <div
                      key={key}
                      onClick={() => setSelectedCourse(key)}
                      className={`p-4 rounded-xl border transition cursor-pointer flex justify-between items-center ${
                        selectedCourse === key
                          ? "border-brand-orange bg-brand-orange/5"
                          : "border-gray-100 bg-gray-50 dark:bg-white/5 hover:bg-gray-100/50"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-brand-charcoal dark:text-white">{value.name}</div>
                        <div className="text-[11px] text-gray-400">Duration: {value.duration}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-base font-bold text-brand-orange">₹{value.price}</div>
                        <div className="text-xs text-gray-400 line-through">₹{value.originalPrice}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Registration details */}
            <div className="bg-white dark:bg-brand-gray p-6 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-md text-left space-y-4">
              <h3 className="font-bold text-base text-brand-blue dark:text-white">
                {orderGenerated ? "Registration Details" : "2. Student Information"}
              </h3>

              {!orderGenerated ? (
                <form onSubmit={handleGenerateOrder} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none bg-white dark:bg-white/5 text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                        errors.name ? "border-red-500" : "border-gray-200 dark:border-white/10"
                      }`}
                      placeholder="e.g. Rahul Kumar"
                    />
                    {errors.name && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none bg-white dark:bg-white/5 text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                        errors.phone ? "border-red-500" : "border-gray-200 dark:border-white/10"
                      }`}
                      placeholder="e.g. 9876543210"
                    />
                    {errors.phone && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email Address (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none bg-white dark:bg-white/5 text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                        errors.email ? "border-red-500" : "border-gray-200 dark:border-white/10"
                      }`}
                      placeholder="e.g. rahul@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 px-6 rounded-lg text-sm transition hover-lift shadow-md"
                  >
                    Generate Payment Order
                  </button>
                </form>
              ) : (
                <div className="space-y-3 text-sm border-t border-gray-100 dark:border-white/5 pt-3">
                  <div><span className="text-gray-400">Student Name:</span> <strong className="text-brand-charcoal dark:text-white">{formData.name}</strong></div>
                  <div><span className="text-gray-400">Phone Number:</span> <strong className="text-brand-charcoal dark:text-white">{formData.phone}</strong></div>
                  {formData.email && <div><span className="text-gray-400">Email:</span> <strong className="text-brand-charcoal dark:text-white">{formData.email}</strong></div>}
                  <div><span className="text-gray-400">Program Selected:</span> <strong className="text-brand-charcoal dark:text-white">{activeCourse.name}</strong></div>
                  <button
                    onClick={() => setOrderGenerated(false)}
                    className="text-xs text-brand-orange hover:underline font-bold"
                  >
                    Change details or course
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* Right panel: Order details / UPI Gateway */}
          <div className="md:col-span-5 space-y-6">
            
            <div className="bg-brand-blue text-white rounded-3xl p-6 shadow-xl relative overflow-hidden border border-brand-blue-dark">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-5 text-left">
                <h3 className="font-semibold text-base border-b border-white/10 pb-3">Order Summary</h3>
                
                <div className="space-y-2 text-xs text-white/80">
                  <div className="flex justify-between">
                    <span>Course Subtotal</span>
                    <span className="line-through">₹{activeCourse.originalPrice}</span>
                  </div>
                  <div className="flex justify-between font-bold text-brand-orange text-sm">
                    <span>Active Discount</span>
                    <span>-₹{activeCourse.originalPrice - activeCourse.price}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10 text-base font-bold text-white">
                    <span>Total Amount</span>
                    <span>₹{activeCourse.price}</span>
                  </div>
                </div>

                {orderGenerated ? (
                  <div className="space-y-4 pt-3 border-t border-white/10">
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                        Pay Securely
                      </div>
                      <button
                        type="button"
                        onClick={handleCashfreePay}
                        disabled={cashfreeLoading}
                        className="w-full inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-70 text-white font-bold py-3 px-6 rounded-lg text-sm transition shadow-lg"
                      >
                        {cashfreeLoading ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} />}
                        {cashfreeLoading ? "Opening secure payment..." : `Pay ₹${activeCourse.price.toLocaleString("en-IN")} via Cashfree`}
                      </button>
                      <p className="flex items-center justify-center gap-1.5 text-[10px] text-white/60">
                        <Lock size={10} />
                        UPI, Cards &amp; Netbanking · Powered by Cashfree
                      </p>
                      {paymentNotice && (
                        <p className="text-[10px] leading-relaxed text-brand-orange bg-brand-orange/10 border border-brand-orange/20 rounded-lg px-3 py-2">
                          {paymentNotice}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 py-1">
                      <span className="h-px flex-1 bg-white/10" />
                      <span className="text-[10px] uppercase tracking-wider text-white/40">or pay directly via UPI</span>
                      <span className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* Mobile Pay Link */}
                    <div className="block sm:hidden">
                      <a
                        href={upiDeepLink}
                        className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg text-sm transition border border-white/15"
                      >
                        <Smartphone size={16} />
                        Pay with UPI App
                      </a>
                      <p className="text-[10px] text-center text-white/60 mt-1.5 leading-relaxed">
                        Tapping opens GPay, PhonePe, or Paytm on your phone.
                      </p>
                    </div>

                    {/* PC QR mockup */}
                    <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="flex items-center gap-2">
                        <QrCode size={18} className="text-brand-orange shrink-0" />
                        <span className="text-xs font-bold">UPI Scan &amp; Pay Address</span>
                      </div>
                      <div className="bg-white/10 py-2 px-3 rounded text-center select-all font-mono text-xs break-all text-white border border-white/10">
                        cecilkumar99830-1@oksbi
                      </div>
                      <p className="text-[10px] text-white/50 leading-relaxed">
                        Copy the UPI Address above to complete payment on GPay, Paytm, or PhonePe.
                      </p>
                    </div>

                    {/* WhatsApp notification action */}
                    <div className="pt-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-sm transition hover-lift shadow-md"
                      >
                        <MessageSquare size={16} />
                        Send Screenshot on WhatsApp
                      </a>
                      <p className="text-[10px] text-white/60 text-center mt-1.5 leading-relaxed">
                        After verification, our team shares your course access on WhatsApp.
                      </p>
                    </div>

                    <div className="pt-1 space-y-1.5 text-[10px] text-white/50 border-t border-white/10">
                      <p className="flex items-center gap-1.5">
                        <ShieldCheck size={11} />
                        Access delivered on WhatsApp · Lifetime recordings
                      </p>
                      <p className="flex items-center gap-1.5">
                        <CheckCircle2 size={11} />
                        Duplicate or failed payments are verified and reversed
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center py-6">
                    <span className="text-xs text-white/60">
                      Please enter your registration details to unlock the payment options.
                    </span>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
