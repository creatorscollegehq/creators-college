import { NextResponse } from "next/server";

const CASHFREE_API_VERSION = "2023-08-01";

export async function POST(request: Request) {
  const appId = process.env.CASHFREE_APP_ID;
  const secretKey = process.env.CASHFREE_SECRET_KEY;
  const environment = process.env.NEXT_PUBLIC_CASHFREE_ENV === "production" ? "production" : "sandbox";

  if (!appId || !secretKey) {
    return NextResponse.json({
      configured: false,
      message: "Cashfree is being activated. Please complete your payment via UPI for now.",
    });
  }

  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const phone = String(body?.phone || "").replace(/\D/g, "").slice(-10);
    const email = String(body?.email || "").trim();
    const courseName = String(body?.courseName || "Creators College Course");
    const amount = Number(body?.amount) || 5000;

    if (!name || phone.length !== 10) {
      return NextResponse.json({ configured: true, error: "A valid name and 10-digit phone number are required." }, { status: 400 });
    }

    const orderId = `cc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const origin = new URL(request.url).origin;
    const returnUrl = `${origin}/checkout/success?order_id=${orderId}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&course=${encodeURIComponent(courseName)}`;

    const response = await fetch(
      `${environment === "production" ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg"}/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": appId,
          "x-client-secret": secretKey,
          "x-api-version": CASHFREE_API_VERSION,
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: amount,
          order_currency: "INR",
          customer_details: {
            customer_id: `cust_${phone}`,
            customer_name: name,
            customer_phone: phone,
            customer_email: email || "enquiry@creatorscollege.com",
          },
          order_meta: {
            return_url: returnUrl,
          },
          order_note: courseName,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { configured: true, error: data?.message || "Unable to create the payment order." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      configured: true,
      orderId,
      paymentSessionId: data?.payment_session_id,
      environment,
    });
  } catch (error) {
    console.error("Cashfree order creation failed:", error);
    return NextResponse.json({ configured: true, error: "Payment gateway is temporarily unavailable." }, { status: 500 });
  }
}
