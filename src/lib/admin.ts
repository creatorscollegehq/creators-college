import { getAuthUser } from "@/lib/auth/session";

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminConfigured() {
  return getAdminEmails().length > 0;
}

export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  return getAdminEmails().includes(email.trim().toLowerCase());
}

export async function getAdminUser() {
  const user = await getAuthUser();
  if (!user || !isAdminEmail(user.email)) return null;
  return user;
}
