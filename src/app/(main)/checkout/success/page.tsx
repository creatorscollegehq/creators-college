import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth/session";
import CheckoutSuccessClient from "./CheckoutSuccessClient";

export const metadata: Metadata = {
  title: "Payment Received | Creators College",
  description: "Your Creators College enrollment payment has been received.",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const orderId = typeof params.order_id === "string" ? params.order_id : "";

  const user = await getAuthUser();
  if (!user) {
    const nextParams = new URLSearchParams();
    if (orderId) nextParams.set("order_id", orderId);
    const query = nextParams.toString();
    const next = `/checkout/success${query ? `?${query}` : ""}`;
    redirect(`/learn/login?next=${encodeURIComponent(next)}`);
  }

  return (
    <Suspense
      fallback={
        <div className="flex-grow flex items-center justify-center py-5 text-sm text-gray-500">
          Loading your order...
        </div>
      }
    >
      <CheckoutSuccessClient studentEmail={user.email} />
    </Suspense>
  );
}
