import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Read from env.local or fallback to a default Google Sheets macro web app
    const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbzbrEBDlNd0uvbEBdJMgi_kmabR6msaV1kuAI10XcRHg2DQrBz_3LDolZq69gN5_QrF/exec";

    // Send payload server-side to bypass CORS blockages securely
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Parse response defensively as text first to handle redirect/text outputs
    const text = await response.text();
    let parsed: any = null;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      // If parsing fails but status is 200 (OK), the sheet write succeeded
      if (response.ok) {
        return NextResponse.json({ success: true, info: "Text response fallback" });
      }
    }

    if (parsed && (parsed.result === "success" || parsed.success === true)) {
      return NextResponse.json({ success: true });
    }

    if (response.ok) {
      return NextResponse.json({ success: true, info: "HTTP status fallback" });
    }

    return NextResponse.json({ success: false, error: "Google Script failed to write" }, { status: 400 });
  } catch (error) {
    console.error("Error forwarding lead to Google Sheets:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
