import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured." }, { status: 503 });
  }

  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const { data, error } = await getSupabaseAdmin().rpc("prune_analytics", { p_days: 180 });
  if (error) {
    console.error("Analytics prune failed:", error.message);
    return NextResponse.json({ error: "Prune failed." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, deleted: data ?? 0 });
}
