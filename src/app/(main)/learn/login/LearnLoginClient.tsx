"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Loader2, Lock } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { createAuthBrowserClient, isAuthConfigured } from "@/lib/auth/client";
import { track } from "@/lib/track";

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleIdentityApi {
  initialize(options: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
    ux_mode?: "popup" | "redirect";
  }): void;
  renderButton(
    parent: HTMLElement,
    options: {
      type?: "standard" | "icon";
      theme?: "outline" | "filled_blue" | "filled_black";
      size?: "large" | "medium" | "small";
      text?: "signin_with" | "signup_with" | "continue_with" | "signin";
      shape?: "rectangular" | "pill" | "circle" | "square";
      logo_alignment?: "left" | "center";
      width?: number;
    }
  ): void;
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleIdentityApi } };
  }
}

const GIS_SRC = "https://accounts.google.com/gsi/client";
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

let gisLoader: Promise<void> | null = null;

function loadGoogleIdentity() {
  if (window.google?.accounts?.id) return Promise.resolve();

  if (!gisLoader) {
    gisLoader = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = GIS_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => {
        gisLoader = null;
        reject(new Error("Could not load Google sign-in"));
      };
      document.head.appendChild(script);
    });
  }

  return gisLoader;
}

function safeRedirectPath(path: string) {
  return path.startsWith("/") && !path.startsWith("//") ? path : "/learn";
}

export default function LearnLoginClient({
  initialError = "",
  nextPath = "",
}: {
  initialError?: string;
  nextPath?: string;
}) {
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);
  const [gsiStatus, setGsiStatus] = useState<"loading" | "ready" | "failed">(
    isAuthConfigured() && googleClientId ? "loading" : "failed"
  );
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const handleCredential = useCallback(
    async (response: GoogleCredentialResponse) => {
      setError("");
      setLoading(true);

      try {
        const supabase = createAuthBrowserClient();
        const { error: authError } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: response.credential,
        });

        if (authError) {
          track("login_failed", { stage: "id_token", message: authError.message });
          setError(authError.message || "Google sign-in failed. Please try again.");
          setLoading(false);
          return;
        }

        track("login_success", { method: "google_id_token" });
        window.location.assign(safeRedirectPath(nextPath || "/learn"));
      } catch (err) {
        console.error("Google sign-in failed:", err);
        track("login_failed", { stage: "id_token_network" });
        setError("Google sign-in failed. Please try again.");
        setLoading(false);
      }
    },
    [nextPath]
  );

  useEffect(() => {
    if (!googleClientId || !isAuthConfigured()) return;

    let cancelled = false;
    let onResize: (() => void) | null = null;

    loadGoogleIdentity()
      .then(() => {
        if (cancelled) return;
        const api = window.google?.accounts?.id;
        const parent = buttonRef.current;
        if (!api || !parent) {
          setGsiStatus("failed");
          return;
        }

        api.initialize({
          client_id: googleClientId,
          callback: (response) => {
            void handleCredential(response);
          },
          auto_select: false,
          cancel_on_tap_outside: true,
          ux_mode: "popup",
        });

        const draw = () => {
          if (!buttonRef.current) return;
          const width = Math.min(
            400,
            Math.max(240, Math.floor(buttonRef.current.clientWidth || 336))
          );
          buttonRef.current.replaceChildren();
          api.renderButton(buttonRef.current, {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "rectangular",
            logo_alignment: "left",
            width,
          });
        };

        draw();
        onResize = () => {
          window.requestAnimationFrame(draw);
        };
        window.addEventListener("resize", onResize);
        setGsiStatus("ready");
      })
      .catch((err) => {
        console.error("Google sign-in failed to load:", err);
        track("login_failed", { stage: "script_load" });
        if (!cancelled) setGsiStatus("failed");
      });

    return () => {
      cancelled = true;
      if (onResize) window.removeEventListener("resize", onResize);
    };
  }, [handleCredential]);

  const handleGoogleRedirect = async () => {
    setError("");

    if (!isAuthConfigured()) {
      setError("Google sign-in is not configured yet. Please contact support on WhatsApp.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createAuthBrowserClient();
      const callbackUrl = nextPath
        ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`
        : `${window.location.origin}/auth/callback`;
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
          queryParams: { prompt: "select_account" },
        },
      });

      if (authError) {
        track("login_failed", { stage: "oauth_start", message: authError.message });
        setError(authError.message || "Google sign-in failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Google sign-in failed:", err);
      track("login_failed", { stage: "network" });
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
            {gsiStatus === "failed" ? (
              <button
                type="button"
                onClick={handleGoogleRedirect}
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
            ) : (
              <div className="relative w-full">
                <div
                  ref={buttonRef}
                  className="flex min-h-[44px] w-full items-center justify-center overflow-hidden [&_iframe]:max-w-full"
                />
                {gsiStatus === "loading" && (
                  <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-500">
                    <Loader2 size={18} className="animate-spin" />
                    Loading Google sign-in...
                  </div>
                )}
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-500">
                    <Loader2 size={18} className="animate-spin" />
                    Signing you in...
                  </div>
                )}
              </div>
            )}

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
