import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { authConfig } from "@/lib/auth/config";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const config = authConfig();
  if (!config) return response;

  const supabase = createServerClient(config.url, config.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  // Refresh the session and verify the token signature before rendering.
  await supabase.auth.getClaims();

  return response;
}

export const config = {
  matcher: ["/learn/:path*", "/auth/:path*", "/admin/:path*", "/api/access/:path*", "/api/admin/:path*", "/api/progress"],
};
