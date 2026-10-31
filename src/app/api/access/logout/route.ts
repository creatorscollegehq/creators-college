import { NextResponse, type NextRequest } from "next/server";
import { contextFromRequest, logServerEvent } from "@/lib/analytics";
import { createRouteHandlerAuthClient } from "@/lib/auth/server";
import { getAuthUser } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  const user = await getAuthUser().catch(() => null);
  const response = NextResponse.json({ ok: true });
  const supabase = createRouteHandlerAuthClient(request, response);
  if (supabase) {
    await supabase.auth.signOut();
  }
  if (user) {
    await logServerEvent({
      event_name: "logout",
      path: "/api/access/logout",
      user_id: user.id,
      email: user.email?.toLowerCase() ?? null,
      ...contextFromRequest(request),
    });
  }
  return response;
}
