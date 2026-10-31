"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, KeyRound, Loader2, Link2, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import LogoutButton from "@/components/learn/LogoutButton";

export default function LearnClaimClient({ email, name }: { email: string; name: string }) {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!orderId.trim() || !phone.trim()) {
      setError("Enter both your order ID and the phone number used at purchase.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/access/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderId.trim(), phone: phone.trim() }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data?.ok) {
        setError(data?.error || "We could not link this order. Check the details and try again.");
        return;
      }

      router.replace("/learn");
      router.refresh();
    } catch (err) {
      console.error("Claim failed:", err);
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow bg-brand-gray/30 dark:bg-brand-gray/10 py-10 md:py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-[#0d1424] shadow-[0_30px_70px_-40px_rgba(15,23,42,0.35)] overflow-hidden">
          <div className="bg-gradient-to-br from-[#123c9e] to-[#071c4d] px-6 py-7 text-center text-white">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 border border-white/15">
              <Link2 size={24} className="text-brand-orange" />
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight">Link your enrollment</h1>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              No active course found for {email}. Enter the order ID and phone number from your purchase once,
              and this Gmail will be linked.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="rounded-xl bg-brand-gray/50 dark:bg-white/[0.04] px-4 py-2.5 text-[11px] text-gray-600 dark:text-gray-300">
              Signed in as <span className="font-semibold">{name || email}</span>
              <div className="mt-1.5">
                <LogoutButton />
              </div>
            </div>

            <div>
              <label htmlFor="orderId" className="block text-xs font-semibold text-brand-charcoal dark:text-white/80 mb-1.5">
                Order ID
              </label>
              <div className="relative">
                <KeyRound size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="orderId"
                  name="orderId"
                  value={orderId}
                  onChange={(event) => setOrderId(event.target.value)}
                  placeholder="cc_1234567890_abc123"
                  autoComplete="off"
                  className="w-full rounded-xl border border-gray-200 dark:border-white/15 bg-white dark:bg-white/[0.03] pl-9 pr-3 py-3 text-sm text-brand-charcoal dark:text-white placeholder:text-gray-400 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-brand-charcoal dark:text-white/80 mb-1.5">
                Phone number used at purchase
              </label>
              <div className="relative">
                <Phone size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="10-digit mobile number"
                  inputMode="tel"
                  autoComplete="tel"
                  className="w-full rounded-xl border border-gray-200 dark:border-white/15 bg-white dark:bg-white/[0.03] pl-9 pr-3 py-3 text-sm text-brand-charcoal dark:text-white placeholder:text-gray-400 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-70 px-6 py-3.5 text-sm font-semibold text-white transition shadow-lg shadow-brand-orange/20"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
              {loading ? "Linking enrollment..." : "Link and Open My Course"}
            </button>

            <p className="text-center text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
              This is a one-time step. Once linked, Google sign-in is enough.
            </p>
          </form>
        </div>

        <div className="mt-5 flex items-center justify-center gap-1.5 rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-white/[0.03] px-4 py-3 text-xs">
          <span className="text-gray-500 dark:text-gray-400">Need help finding your order ID?</span>
          <a
            href="https://wa.me/918143937367?text=Hi%20Creators%20College%2C%20I%20need%20help%20linking%20my%20course%20access."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-green-600 hover:text-green-700"
          >
            <WhatsAppIcon size={13} />
            Support
          </a>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Wrong Google account? Use sign out above and continue with the correct Gmail.
        </p>
        <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
          Purchased with a different email?{" "}
          <Link href="/contact" className="font-semibold text-brand-orange hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
