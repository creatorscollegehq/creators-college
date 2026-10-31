"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Loader2, Lock } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { createAuthBrowserClient, isAuthConfigured } from "@/lib/auth/client";

export default function LearnLoginClient({ initialError = "" }: { initialError?: string }) {
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setError("");

    if (!isAuthConfigured()) {
      setError("Google sign-in is not configured yet. Please contact support on WhatsApp.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createAuthBrowserClient();
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/learn`,
          queryParams: { prompt: "select_account" },
        },
      });

      if (authError) {
        setError(authError.message || "Google sign-in failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Google sign-in failed:", err);
      setError("Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow bg-brand-gray/30 dark:bg-brand-gray/10 py-10 md:py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-[#0d1424] shadow-[0_30px_70px_-40px_rgba(15,23,42,0.35)] overflow-hidden">
          <div className="bg-gradient-to-br from-[#123c9e] to-[#071c4d] px-6 py-7 text-center text-white">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 border border-white/15">
              <Lock size={24} className="text-brand-orange" />
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight">My Course</h1>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Sign in with Google to open your private course library.
            </p>
          </div>

          <div className="p-6 space-y-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-gray-200 dark:border-white/15 bg-white dark:bg-white px-6 py-3.5 text-sm font-semibold text-[#1f2937] transition hover:bg-gray-50 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin text-gray-500" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.41 13.92a6 6 0 0 1 0-3.84V7.5H3.07a10 10 0 0 0 0 9l3.34-2.58Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.04c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.5l3.34 2.58C7.2 7.8 9.4 6.04 12 6.04Z"
                  />
                </svg>
              )}
              {loading ? "Redirecting to Google..." : "Continue with Google"}
            </button>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="rounded-xl bg-brand-gray/50 dark:bg-white/[0.04] px-4 py-3 space-y-1.5">
              <p className="text-[11px] font-semibold text-brand-charcoal dark:text-white/80">
                Use the same Gmail you entered at checkout.
              </p>
              <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                Paid via UPI instead? Sign in with Google first, then enter your order ID once to link the
                enrollment. After that, Google login is enough.
              </p>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
              <span>Cannot access your course?</span>
              <a
                href="https://wa.me/918143937367?text=Hi%20Creators%20College%2C%20I%20need%20help%20accessing%20my%20course."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-green-600 hover:text-green-700"
              >
                <WhatsAppIcon size={13} />
                Chat with support
              </a>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Not enrolled yet?{" "}
          <Link href="/checkout" className="inline-flex items-center gap-1 font-semibold text-brand-orange hover:underline">
            Join the course <ArrowRight size={12} />
          </Link>
        </p>
      </div>
    </div>
  );
}
