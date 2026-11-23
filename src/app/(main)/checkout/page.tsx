import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth/session";
import { getActiveEnrollmentForUser } from "@/lib/supabase";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Secure Checkout | Creators College",
  description: "Complete your Creators College enrollment securely.",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const user = await getAuthUser();
  if (!user) redirect("/learn/login?next=/checkout");

  // A student who already owns the course should never land on a payment page.
  const enrollment = await getActiveEnrollmentForUser(user.id, user.email);
  if (enrollment) redirect("/learn");

  return <CheckoutClient user={{ name: user.name, email: user.email }} />;
}
