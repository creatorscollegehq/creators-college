import { NextResponse, type NextRequest } from "next/server";
import { createRouteHandlerAuthClient } from "@/lib/auth/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  const supabase = createRouteHandlerAuthClient(request, response);
  if (supabase) {
    await supabase.auth.signOut();
  }
  return response;
}
