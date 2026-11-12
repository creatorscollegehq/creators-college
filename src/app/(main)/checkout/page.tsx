import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth/session";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Secure Checkout | Creators College",
  description: "Complete your Creators College enrollment securely.",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const user = await getAuthUser();
  if (!user) redirect("/learn/login?next=/checkout");

  return <CheckoutClient user={{ name: user.name, email: user.email }} />;
}
