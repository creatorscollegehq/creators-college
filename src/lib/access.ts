import { cache } from "react";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth/session";
import { getActiveEnrollmentForUser } from "@/lib/supabase";

export const getCurrentAccess = cache(async () => {
  const user = await getAuthUser();
  if (!user) return null;

  const enrollment = await getActiveEnrollmentForUser(user.id, user.email);
  if (!enrollment) return null;

  return { user, enrollment };
});

export async function requireAuthUser() {
  const user = await getAuthUser();
  if (!user) redirect("/learn/login");
  return user;
}

export async function requireEnrollment() {
  const user = await requireAuthUser();
  const enrollment = await getActiveEnrollmentForUser(user.id, user.email);
  if (!enrollment) redirect("/learn");
  return { user, enrollment };
}
