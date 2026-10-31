import { NextResponse, type NextRequest } from "next/server";
import { createRouteHandlerAuthClient } from "@/lib/auth/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") || "/learn";
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/learn";

  if (!code) {
    return NextResponse.redirect(new URL("/learn/login?error=missing_code", origin));
  }

  const response = NextResponse.redirect(new URL(next, origin));
  const supabase = createRouteHandlerAuthClient(request, response);
  if (!supabase) {
    return NextResponse.redirect(new URL("/learn/login?error=not_configured", origin));
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.error("Auth code exchange failed:", error.message);
    return NextResponse.redirect(new URL("/learn/login?error=auth", origin));
  }

  return response;
}
