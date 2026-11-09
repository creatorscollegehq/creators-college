import { NextResponse } from "next/server";
import { contextFromRequest, logServerEvent } from "@/lib/analytics";
import { couponDiscountedPrice, getCouponByCode, incrementCouponUse, recordCouponOrder, validateCoupon } from "@/lib/coupons";
import { getSupabaseAdmin } from "@/lib/supabase";
import { COURSE_PRICE } from "@/lib/payment";

const CASHFREE_API_VERSION = "2023-08-01";

function text(value: unknown) {
  return String(value ?? "").trim();
}

export default async function CreateCashfreeOrder(request: Request) {
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
    const context = contextFromRequest(request);
    const body = await request.json();

    const name = text(body?.name);
    const phone = text(body?.phone).replace(/\D/g, "").slice(-10);
    const email = text(body?.email).toLowerCase();
    const couponInput = text(body?.couponCode);
    const courseName = text(body?.courseName) || "Complete Telugu Content Creation Course";

    if (!name || phone.length !== 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      await logServerEvent({
        event_name: "checkout_error",
        path: "/api/cashfree/create-order",
        ...context,
        metadata: { reason: "invalid_details" },
      });

      return NextResponse.json(
        {
          configured: true,
          error:
            "A valid name, 10-digit phone number and email are required. The email must match the Gmail you use to sign in.",
        },
        { status: 400 }
      );
    }

    let coupon: Awaited<ReturnType<typeof getCouponByCode>> = null;
    let couponError: { code: string; message: string } | null = null;
    let orderAmount = COURSE_PRICE;

    if (couponInput) {
      coupon = await getCouponByCode(couponInput);
      const validation = validateCoupon(coupon);
      if (validation) {
        couponError = { code: validation.code, message: validation.message };
      } else {
        orderAmount = couponDiscountedPrice(COURSE_PRICE, coupon as NonNullable<typeof coupon>);
      }
    }

    if (couponError) {
      await logServerEvent({
        event_name: "checkout_coupon_failed",
        path: "/api/cashfree/create-order",
        ...context,
        metadata: {
          code: couponInput,
          reason: couponError.code,
          message: couponError.message.slice(0, 160),
        },
      });

      return NextResponse.json(
        { configured: true, error: couponError.message },
        { status: 400 }
      );
    }

    if (orderAmount <= 0) {
      const orderId = `cc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const couponCode = coupon?.code.toUpperCase() ?? "";
      const enrollment = await getSupabaseAdmin()
        .from("enrollments")
        .upsert({
          order_id: orderId,
          name,
          phone,
          email,
          course_slug: "content-creation",
          status: "active",
          provider: "coupon",
          amount: 0,
          currency: "INR",
          expires_at: null,
          metadata: {
            coupon_code: couponCode,
            source: "free coupon",
          },
        })
        .select("order_id")
        .maybeSingle();

      if (!enrollment.data) {
        await logServerEvent({
          event_name: "coupon_enrollment_failed",
          path: "/api/cashfree/create-order",
          ...context,
          metadata: { code: couponCode, orderId },
        });
        return NextResponse.json(
          { configured: true, error: "We could not save this coupon order. Please contact support." },
          { status: 500 }
        );
      }

      await incrementCouponUse(couponCode);
      await logServerEvent({
        event_name: "checkout_free_coupon",
        path: "/api/cashfree/create-order",
        ...context,
        metadata: { code: couponCode, orderId },
      });

      return NextResponse.json(
        {
          configured: true,
          freeCoupon: { code: couponCode, orderId },
          successUrl: `/checkout/success?order_id=${encodeURIComponent(
            orderId
          )}&payment_mode=coupon&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(
            phone
          )}&email=${encodeURIComponent(email)}&course=${encodeURIComponent(
            courseName
          )}&coupon_code=${encodeURIComponent(couponCode)}&amount=0`,
        },
        { status: 200 }
      );
    }

    const orderId = body?.orderId ? String(body.orderId) : `cc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const requestOrigin = new URL(request.url).origin;
    const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const origin = configuredOrigin || (requestOrigin.startsWith("https://") ? requestOrigin : "https://www.creatorscollege.in");
    const successUrl = `${origin}/checkout/success?order_id=${encodeURIComponent(orderId)}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&course=${encodeURIComponent(courseName)}&amount=${orderAmount}`;

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
          order_amount: orderAmount,
          order_currency: "INR",
          customer_details: {
            customer_id: `cust_${phone}`,
            customer_name: name,
            customer_phone: phone,
            customer_email: email,
          },
          order_meta: {
            return_url: successUrl,
          },
          order_note: courseName,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      await logServerEvent({
        event_name: "checkout_error",
        path: "/api/cashfree/create-order",
        ...context,
        metadata: {
          reason: "cashfree_error",
          status: response.status,
          message: String(data?.message || "").slice(0, 200),
        },
      });

      return NextResponse.json(
        { configured: true, error: data?.message || "Unable to create the payment order." },
        { status: 502 }
      );
    }

    if (coupon) {
      await recordCouponOrder(orderId, coupon.code, orderAmount);
    }

    await logServerEvent({
      event_name: "checkout_order_created",
      path: "/api/cashfree/create-order",
      ...context,
      value: orderAmount,
      metadata: {
        courseName,
        orderId,
        environment,
        couponCode: coupon?.code.toUpperCase(),
        originalPrice: COURSE_PRICE,
        discountedAmount: orderAmount,
      },
    });

    return NextResponse.json({
      configured: true,
      orderId,
      paymentSessionId: data?.payment_session_id,
      environment,
    });
  } catch (error) {
    console.error("Cashfree order creation failed:", error);
    return NextResponse.json(
      { configured: true, error: "Payment gateway is temporarily unavailable." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return CreateCashfreeOrder(request);
}
