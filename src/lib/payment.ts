import { fetchCashfreeOrder, type CashfreeOrder } from "@/lib/cashfree";

export const COURSE_SLUG = "content-creation";
export const COURSE_PRICE = 5000;

export function normalizePhone(value: unknown) {
  return String(value ?? "").replace(/\D/g, "").slice(-10);
}

export type PaidOrderResult =
  | { ok: true; order: CashfreeOrder; phone: string }
  | { ok: false; status: number; error: string };

export async function verifyPaidOrder(orderId: string, phone: string): Promise<PaidOrderResult> {
  const result = await fetchCashfreeOrder(orderId);

  if (!result.ok) {
    if (result.status === 404) {
      return {
        ok: false,
        status: 404,
        error: "We could not find this order. Check the order ID or contact support on WhatsApp.",
      };
    }
    return { ok: false, status: result.status, error: result.message };
  }

  const order = result.order;

  if (order.order_status !== "PAID") {
    return {
      ok: false,
      status: 409,
      error:
        order.order_status === "ACTIVE"
          ? "Payment is still processing. Wait a minute and try again."
          : "This order has not been paid yet.",
    };
  }

  if (order.order_currency !== "INR" || Number(order.order_amount) < COURSE_PRICE) {
    return {
      ok: false,
      status: 402,
      error: "The paid amount does not match this course. Please contact support.",
    };
  }

  const paidPhone = normalizePhone(order.customer_details?.customer_phone);
  if (paidPhone && paidPhone !== phone) {
    return { ok: false, status: 403, error: "This order ID does not match that phone number." };
  }

  return { ok: true, order, phone };
}
