import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import { getActiveEnrollmentForUser } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * Tiny status endpoint the header and every "Enroll" button call once per page
 * load, so an already enrolled student never sees a buy button again — without
 * turning the marketing pages into dynamic renders.
 */
export async function GET() {
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json(
      { signedIn: false, enrolled: false, name: null },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  const enrollment = await getActiveEnrollmentForUser(user.id, user.email);

  return NextResponse.json(
    { signedIn: true, enrolled: Boolean(enrollment), name: user.name },
    { headers: { "Cache-Control": "no-store" } }
  );
}
