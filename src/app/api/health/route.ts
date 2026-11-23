import { NextResponse } from "next/server";
import { SHEETS_WEBHOOK_URL } from "@/lib/sheets";
import { pingSupabase } from "@/lib/supabase";
import { isVideoStorageConfigured } from "@/lib/videoStorage";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await pingSupabase();
  const r2 = isVideoStorageConfigured();
  const sanity = Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID
  );
  const cashfree = Boolean(process.env.CASHFREE_APP_ID && process.env.CASHFREE_SECRET_KEY);

  return NextResponse.json(
    { ok: supabase, supabase, r2, sanity, cashfree, sheets: Boolean(SHEETS_WEBHOOK_URL) },
    { status: supabase ? 200 : 503 }
  );
}
