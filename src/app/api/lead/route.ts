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

    const result = await response.json();
    
    if (result.result === "success") {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: result.error || "Google Script failed to write" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error forwarding lead to Google Sheets:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
