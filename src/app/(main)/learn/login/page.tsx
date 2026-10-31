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
  not_configured: "Google sign-in is not configured yet. Please contact support on WhatsApp.",
};

export default async function LearnLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getAuthUser();
  if (user) redirect("/learn");

  const { error } = await searchParams;
  return <LearnLoginClient initialError={error ? errors[error] || errors.auth : ""} />;
}
