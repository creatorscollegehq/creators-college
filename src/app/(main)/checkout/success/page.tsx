import type { Metadata } from "next";
import { Suspense } from "react";
import CheckoutSuccessClient from "./CheckoutSuccessClient";

export const metadata: Metadata = {
  title: "Payment Received | Creators College",
  description: "Your Creators College enrollment payment has been received.",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-grow flex items-center justify-center py-5 text-sm text-gray-500">
          Loading your order...
        </div>
      }
    >
      <CheckoutSuccessClient />
    </Suspense>
  );
}
