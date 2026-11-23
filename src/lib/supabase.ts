import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type EnrollmentStatus = "active" | "revoked" | "refunded";

export interface Enrollment {
  id: string;
  order_id: string;
  name: string | null;
  phone: string;
  email: string | null;
  user_id: string | null;
  course_slug: string;
  status: EnrollmentStatus;
  provider: string;
  amount: number | null;
  currency: string | null;
  expires_at: string | null;
  claimed_at: string | null;
  created_at: string;
}

export interface EnrollmentInput {
  order_id: string;
  name: string;
  phone: string;
  email: string | null;
  user_id?: string | null;
  course_slug: string;
  status: EnrollmentStatus;
  provider: string;
  amount: number | null;
  currency: string;
  expires_at: string | null;
  metadata?: Record<string, unknown>;
}

export type ClaimResult = {
  enrollment: Enrollment | null;
  reason?: "not_found" | "phone_mismatch";
};

let supabase: SupabaseClient | null = null;

export function isSupabaseConfigured() {
  return Boolean(
    (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase is not configured");
  }

  if (!supabase) {
    supabase = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return supabase;
}

function isValidEnrollment(enrollment: Enrollment) {
  if (enrollment.status !== "active") return false;
  if (enrollment.expires_at && new Date(enrollment.expires_at).getTime() <= Date.now()) {
    return false;
  }
  return true;
}

export async function getEnrollmentById(id: string): Promise<Enrollment | null> {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await getSupabase()
    .from("enrollments")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data as Enrollment;
}

export async function getEnrollmentByOrderId(orderId: string): Promise<Enrollment | null> {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await getSupabase()
    .from("enrollments")
    .select("*")
    .eq("order_id", orderId)
    .maybeSingle();

  if (error || !data) return null;
  return data as Enrollment;
}

/**
 * Finds the lifetime access row for a signed-in student.
 *
 * The purchase email is the key: one successful purchase keeps working on that
 * email forever, even if the Google account id behind it changes (new device,
 * re-login, deleted and re-created auth user). Rows that lost their `user_id`
 * are re-linked automatically instead of locking the student out.
 */
export async function getActiveEnrollmentForUser(
  userId: string,
  email: string
): Promise<Enrollment | null> {
  if (!isSupabaseConfigured()) return null;
  const client = getSupabase();

  const { data: byUser } = await client
    .from("enrollments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const userMatch = ((byUser ?? []) as Enrollment[]).find(isValidEnrollment);
  if (userMatch) return userMatch;

  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) return null;

  const { data: byEmail, error: emailError } = await client
    .from("enrollments")
    .select("*")
    .ilike("email", normalizedEmail)
    .order("created_at", { ascending: false });

  if (emailError) {
    console.error("Unable to look up enrollment by email:", emailError.message);
    return null;
  }

  const emailMatch = ((byEmail ?? []) as Enrollment[]).find(isValidEnrollment);
  if (!emailMatch) return null;
  if (emailMatch.user_id === userId) return emailMatch;

  const { data: linked, error } = await client
    .from("enrollments")
    .update({ user_id: userId, claimed_at: emailMatch.claimed_at ?? new Date().toISOString() })
    .eq("id", emailMatch.id)
    .select("*")
    .maybeSingle();

  if (error) {
    console.error("Unable to link enrollment to the signed-in user:", error.message);
    return null;
  }

  return (linked as Enrollment | null) ?? emailMatch;
}

export async function claimEnrollmentByEmail(
  email: string,
  userId: string,
  phoneLast4: string
): Promise<ClaimResult> {
  if (!isSupabaseConfigured()) return { enrollment: null, reason: "not_found" };

  const client = getSupabase();
  const normalizedEmail = email.trim().toLowerCase();
  const digits = phoneLast4.replace(/\D/g, "").slice(-4);

  const { data, error } = await client
    .from("enrollments")
    .select("*")
    .ilike("email", normalizedEmail)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Unable to look up enrollment for restore:", error.message);
    return { enrollment: null, reason: "not_found" };
  }

  const active = ((data ?? []) as Enrollment[]).filter(isValidEnrollment);
  if (!active.length) return { enrollment: null, reason: "not_found" };

  const match = active.find((item) => {
    const stored = (item.phone || "").replace(/\D/g, "");
    return stored.length < 4 || stored.slice(-4) === digits;
  });

  if (!match) return { enrollment: null, reason: "phone_mismatch" };

  const { data: linked, error: linkError } = await client
    .from("enrollments")
    .update({ user_id: userId, claimed_at: match.claimed_at ?? new Date().toISOString() })
    .eq("id", match.id)
    .select("*")
    .maybeSingle();

  if (linkError) {
    console.error("Unable to claim enrollment:", linkError.message);
    return { enrollment: match };
  }

  return { enrollment: (linked as Enrollment | null) ?? match };
}

export async function getLessonProgressForUser(userId: string): Promise<Record<string, boolean>> {
  if (!isSupabaseConfigured()) return {};

  const { data, error } = await getSupabase()
    .from("lesson_progress")
    .select("lesson_id, completed")
    .eq("user_id", userId);

  if (error || !data) return {};

  const completed: Record<string, boolean> = {};
  for (const row of data as { lesson_id: string; completed: boolean | null }[]) {
    if (row.completed) completed[row.lesson_id] = true;
  }
  return completed;
}

export async function upsertEnrollment(input: EnrollmentInput): Promise<Enrollment> {
  const { data, error } = await getSupabase()
    .from("enrollments")
    .upsert(
      { ...input, email: input.email ? input.email.trim().toLowerCase() : null },
      { onConflict: "order_id" }
    )
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Unable to save enrollment");
  }

  return data as Enrollment;
}

export async function pingSupabase() {
  if (!isSupabaseConfigured()) return false;

  const { error } = await getSupabase().from("enrollments").select("id").limit(1);
  return !error;
}

export function getSupabaseAdmin() {
  return getSupabase();
}

export async function updateEnrollmentStatus(orderId: string, status: EnrollmentStatus) {
  const { data, error } = await getSupabase()
    .from("enrollments")
    .update({ status })
    .eq("order_id", orderId)
    .select("*")
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as Enrollment | null;
}
