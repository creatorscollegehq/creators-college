import { NextResponse } from "next/server";
import { SHEETS_WEBHOOK_URL } from "@/lib/sheets";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Send payload server-side to bypass CORS blockages securely
    const response = await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Parse response defensively as text first to handle redirect/text outputs
    const raw = await response.text();
    let parsed: { result?: string; success?: boolean } | null = null;
    try {
      parsed = JSON.parse(raw) as { result?: string; success?: boolean };
    } catch {
      // Not JSON: fall through to the status-based checks below.
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
