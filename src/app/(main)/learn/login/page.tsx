import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth/session";
import LearnLoginClient from "./LearnLoginClient";

export const metadata: Metadata = {
  title: "My Course Login | Creators College",
  description: "Sign in to your Creators College course library with Google.",
  robots: { index: false, follow: false },
};

const errors: Record<string, string> = {
  missing_code: "Google sign-in did not complete. Please try again.",
  auth: "We could not complete Google sign-in. Please try again.",
  provider: "Google sign-in was cancelled. Please try again.",
  session:
    "Sign-in could not be completed in this browser. Please open creatorscollege.in in Chrome or Safari, allow cookies, and try again.",
  not_configured: "Google sign-in is not configured yet. Please contact support on WhatsApp.",
};

export default async function LearnLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  const safeNext = typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? next : "";

  const user = await getAuthUser();
  if (user) redirect(safeNext || "/learn");

  return <LearnLoginClient initialError={error ? errors[error] || errors.auth : ""} nextPath={safeNext} />;
}
