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
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1);

  const userMatch = byUser?.[0] as Enrollment | undefined;
  if (userMatch && isValidEnrollment(userMatch)) return userMatch;

  const { data: byEmail } = await client
    .from("enrollments")
    .select("*")
    .eq("email", email.toLowerCase())
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1);

  const emailMatch = byEmail?.[0] as Enrollment | undefined;
  if (!emailMatch || !isValidEnrollment(emailMatch)) return null;
  if (emailMatch.user_id) {
    return emailMatch.user_id === userId ? emailMatch : null;
  }

  const { data: linked, error } = await client
    .from("enrollments")
    .update({ user_id: userId })
    .eq("id", emailMatch.id)
    .select("*")
    .maybeSingle();

  if (error) return emailMatch;
  return (linked as Enrollment | null) ?? emailMatch;
}

export async function upsertEnrollment(input: EnrollmentInput): Promise<Enrollment> {
  const { data, error } = await getSupabase()
    .from("enrollments")
    .upsert(input, { onConflict: "order_id" })
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Unable to save enrollment");
  }

  return data as Enrollment;
}

export async function claimEnrollment(orderId: string, userId: string, email: string) {
  const { data, error } = await getSupabase()
    .from("enrollments")
    .update({
      user_id: userId,
      email: email.toLowerCase(),
      claimed_at: new Date().toISOString(),
    })
    .eq("order_id", orderId)
    .select("*")
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as Enrollment | null;
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
