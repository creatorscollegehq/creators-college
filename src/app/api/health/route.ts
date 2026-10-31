import { NextResponse } from "next/server";
import { pingSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const ok = await pingSupabase();
  return NextResponse.json({ ok }, { status: ok ? 200 : 503 });
}
