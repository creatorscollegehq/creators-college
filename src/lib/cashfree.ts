const CASHFREE_API_VERSION = "2023-08-01";

export interface CashfreeOrder {
  order_id: string;
  order_amount: number;
  order_currency: string;
  order_status: string;
  customer_details?: {
    customer_id?: string;
    customer_name?: string;
    customer_phone?: string;
    customer_email?: string;
  };
}

export function isCashfreeConfigured() {
  return Boolean(process.env.CASHFREE_APP_ID && process.env.CASHFREE_SECRET_KEY);
}

export function cashfreeBaseUrl() {
  return process.env.NEXT_PUBLIC_CASHFREE_ENV === "production"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";
}

export async function fetchCashfreeOrder(
  orderId: string
): Promise<{ ok: true; order: CashfreeOrder } | { ok: false; status: number; message: string }> {
  if (!isCashfreeConfigured()) {
    return { ok: false, status: 503, message: "Payment verification is not configured." };
  }

  try {
    const response = await fetch(
      `${cashfreeBaseUrl()}/orders/${encodeURIComponent(orderId)}`,
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID as string,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY as string,
          "x-api-version": CASHFREE_API_VERSION,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        status: response.status === 404 ? 404 : 502,
        message: data?.message || "Unable to verify this order.",
      };
    }

    return { ok: true, order: data as CashfreeOrder };
  } catch (error) {
    console.error("Cashfree order status lookup failed:", error);
    return { ok: false, status: 502, message: "Payment verification is temporarily unavailable." };
  }
}
