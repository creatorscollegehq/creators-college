import { cache } from "react";
import { createAuthServerClient, authConfig } from "./server";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export const getAuthUser = cache(async (): Promise<AuthUser | null> => {
  if (!authConfig()) return null;

  try {
    const supabase = await createAuthServerClient();
    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims) return null;

    const claims = data.claims;
    const id = typeof claims.sub === "string" ? claims.sub : "";
    const email = typeof claims.email === "string" ? claims.email.toLowerCase() : "";
    if (!id || !email) return null;

    const metadata = (claims.user_metadata ?? {}) as Record<string, unknown>;
    const name = String(metadata.full_name || metadata.name || email.split("@")[0]);

    return { id, email, name };
  } catch (error) {
    console.error("Supabase auth lookup failed:", error);
    return null;
  }
});
