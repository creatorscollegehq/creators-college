import { NextResponse } from "next/server";
import { postToSheets } from "@/lib/sheets";

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const result = await postToSheets(payload);
  if (!result.ok) {
    console.error("Google Sheet rejected the lead:", result.status, result.error);
    return NextResponse.json(
      { success: false, error: result.error || "Failed to save the lead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
