import { NextResponse, type NextRequest } from "next/server";
import { createRouteHandlerAuthClient } from "@/lib/auth/server";
import { contextFromRequest, logServerEvent } from "@/lib/analytics";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const providerError = searchParams.get("error");
  const nextParam = searchParams.get("next") || "/learn";
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/learn";
  const context = contextFromRequest(request);

  if (providerError) {
    console.error("Auth provider returned an error:", providerError, searchParams.get("error_description"));
    await logServerEvent({
      event_name: "login_failed",
      path: "/auth/callback",
      ...context,
      metadata: { reason: "provider", providerError: providerError.slice(0, 100) },
    });
    return NextResponse.redirect(new URL("/learn/login?error=provider", origin));
  }

  if (!code) {
    await logServerEvent({
      event_name: "login_failed",
      path: "/auth/callback",
      ...context,
      metadata: { reason: "missing_code" },
    });
    return NextResponse.redirect(new URL("/learn/login?error=missing_code", origin));
  }

  const response = NextResponse.redirect(new URL(next, origin));
  const supabase = createRouteHandlerAuthClient(request, response);
  if (!supabase) {
    return NextResponse.redirect(new URL("/learn/login?error=not_configured", origin));
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    const verifierCookies = request.cookies
      .getAll()
      .map(({ name }) => name)
      .filter((name) => name.includes("code-verifier"));
    console.error("Auth code exchange failed:", error.message, {
      origin,
      verifierCookies,
      hasVerifierCookie: verifierCookies.length > 0,
    });
    await logServerEvent({
      event_name: "login_failed",
      path: "/auth/callback",
      ...context,
      metadata: {
        reason: error.message.toLowerCase().includes("code verifier") ? "code_verifier" : "exchange",
        message: error.message.slice(0, 200),
        hasVerifierCookie: verifierCookies.length > 0,
        origin,
      },
    });
    return NextResponse.redirect(
      new URL(error.message.toLowerCase().includes("code verifier") ? "/learn/login?error=session" : "/learn/login?error=auth", origin)
    );
  }

  await logServerEvent({
    event_name: "login_success",
    path: "/auth/callback",
    user_id: data.user?.id ?? null,
    email: data.user?.email?.toLowerCase() ?? null,
    ...context,
    metadata: { provider: data.user?.app_metadata?.provider ?? "google" },
  });

  return response;
}
