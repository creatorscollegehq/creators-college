import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// SHA-256 Hashing helper for Meta data compliance
function hashData(data: string): string {
  if (!data) return "";
  return crypto
    .createHash("sha256")
    .update(data.trim().toLowerCase())
    .digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { email, phone, name, eventId, url, source, eventName } = await req.json();

    const PIXEL_ID = process.env.META_PIXEL_ID || "1584046740011776";
    const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
    const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

    if (!ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "Meta API access token is missing. Please set META_ACCESS_TOKEN in env." },
        { status: 500 }
      );
    }

    // Capture requester's IP and User Agent dynamically
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] || (req as any).ip || "127.0.0.1";
    const clientUserAgent = req.headers.get("user-agent") || "";

    const eventPayload: any = {
      data: [
        {
          event_name: eventName || "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId, // Must match client eventID exactly for deduplication
          event_source_url: url || "https://www.creatorscollege.in/",
          action_source: "website",
          user_data: {
            em: email ? [hashData(email)] : [],
            ph: phone ? [hashData(phone)] : [],
            fn: name ? [hashData(name.split(" ")[0])] : [],
            client_ip_address: clientIp,
            client_user_agent: clientUserAgent,
          },
          custom_data: {
            content_name: source || "Form Lead",
            currency: "INR",
            value: 0.00,
          },
        },
      ],
    };

    // If test event code is provided in environment variables, apply it to routing
    if (TEST_EVENT_CODE) {
      eventPayload.test_event_code = TEST_EVENT_CODE;
    }

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventPayload),
      }
    );

    const result = await response.json();
    return NextResponse.json({ success: response.ok, result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
