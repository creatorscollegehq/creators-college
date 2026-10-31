import { getSupabaseAdmin } from "@/lib/supabase";

export class AdminDataError extends Error {}

async function rpc<T>(name: string, args: Record<string, unknown> = {}): Promise<T> {
  const { data, error } = await getSupabaseAdmin().rpc(name, args);
  if (error) {
    throw new AdminDataError(error.message);
  }
  return data as T;
}

export const RANGE_OPTIONS = [7, 30, 90, 180] as const;

export function clampDays(value: unknown, fallback = 30) {
  const parsed = Number(value);
  return RANGE_OPTIONS.includes(parsed as (typeof RANGE_OPTIONS)[number]) ? parsed : fallback;
}

export interface DailyPoint {
  date: string;
  revenue: number;
  orders: number;
  enrollments: number;
  page_views: number;
  sessions: number;
  lessons_completed: number;
}

export interface EnrollmentRow {
  id: string;
  order_id: string;
  name: string | null;
  phone: string;
  email: string | null;
  user_id: string | null;
  course_slug: string;
  status: "active" | "revoked" | "refunded";
  provider: string;
  amount: number | null;
  currency: string | null;
  expires_at: string | null;
  claimed_at: string | null;
  created_at: string;
}

export interface StudentRow extends EnrollmentRow {
  completed_lessons: number;
  last_lesson_at: string | null;
  last_active_at: string | null;
}

export interface OverviewData {
  range_days: number;
  revenue: number;
  orders: number;
  active_enrollments: number;
  new_enrollments: number;
  linked_enrollments: number;
  students_active_7d: number;
  lessons_completed: number;
  video_plays: number;
  sessions: number;
  page_views: number;
  unique_visitors: number;
  checkout_starts: number;
  payments_verified: number;
  logins: number;
  lesson_views: number;
  funnel: { step: string; count: number }[];
  daily: DailyPoint[];
  recent_enrollments: EnrollmentRow[];
  top_lessons: {
    lesson_id: string;
    module_number: string;
    lesson_index: number;
    viewers: number;
    completions: number;
  }[];
}

export interface TrafficData {
  range_days: number;
  paths: { path: string; views: number; sessions: number }[];
  referrers: { source: string; visits: number }[];
  utm: { source: string; medium: string; visits: number }[];
  countries: { country: string; visits: number }[];
  cities: { city: string; visits: number }[];
  devices: { device: string; visits: number }[];
  browsers: { browser: string; visits: number }[];
  os: { os: string; visits: number }[];
  hourly: { hour: number; events: number }[];
}

export interface LessonStat {
  module_number: string;
  lesson_index: number;
  lesson_id: string;
  viewers: number;
  completions: number;
  avg_seconds: number;
  last_viewed_at: string | null;
}

export interface LessonsData {
  lessons: LessonStat[];
  totals: { viewers: number; completions: number; tracked_lessons: number };
}

export interface StudentsData {
  total: number;
  rows: StudentRow[];
}

export interface ProgressRow {
  lesson_id: string;
  module_number: string;
  lesson_index: number;
  completed: boolean;
  watched_seconds: number;
  first_viewed_at: string;
  completed_at: string | null;
  last_viewed_at: string;
}

export interface EventRow {
  id: number;
  created_at: string;
  event_name: string;
  user_id: string | null;
  email: string | null;
  session_id: string | null;
  path: string | null;
  referrer_host: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  country: string | null;
  city: string | null;
  value: number | null;
  metadata: Record<string, unknown> | null;
}

export interface StudentDetail {
  enrollment: EnrollmentRow;
  progress: ProgressRow[];
  events: Omit<EventRow, "id" | "user_id" | "session_id" | "referrer_host" | "value">[];
  stats: {
    completed_lessons: number;
    lessons_opened: number;
    watch_seconds: number;
    last_active_at: string | null;
    event_count: number;
  };
}

export interface EventsData {
  total: number;
  rows: EventRow[];
}

export async function getOverview(days: number) {
  return rpc<OverviewData>("admin_overview", { p_days: days });
}

export async function getTraffic(days: number) {
  return rpc<TrafficData>("admin_traffic", { p_days: days });
}

export async function getLessons() {
  return rpc<LessonsData>("admin_lessons");
}

export async function getStudents(options: {
  search?: string;
  status?: string;
  limit?: number;
  offset?: number;
}) {
  return rpc<StudentsData>("admin_students", {
    p_search: options.search || null,
    p_status: options.status || null,
    p_limit: options.limit ?? 25,
    p_offset: options.offset ?? 0,
  });
}

export async function getStudent(orderId: string) {
  return rpc<StudentDetail | null>("admin_student", { p_order_id: orderId });
}

export async function getEvents(options: {
  event?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  return rpc<EventsData>("admin_events", {
    p_event: options.event || null,
    p_search: options.search || null,
    p_limit: options.limit ?? 50,
    p_offset: options.offset ?? 0,
  });
}

export function formatINR(value: number | null | undefined, compact = false) {
  const amount = Number(value) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    notation: compact && amount >= 100000 ? "compact" : "standard",
  }).format(amount);
}

export function formatNumber(value: number | null | undefined) {
  return new Intl.NumberFormat("en-IN").format(Number(value) || 0);
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatRelative(value: string | null | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const diff = Date.now() - date.getTime();
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDateTime(value);
}

export function formatDuration(seconds: number | null | undefined) {
  const total = Math.max(0, Math.round(Number(seconds) || 0));
  if (!total) return "0m";
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  if (hours) return `${hours}h ${minutes}m`;
  if (minutes) return `${minutes}m`;
  return `${total}s`;
}

export function percent(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 1000) / 10;
}

export function isExpired(value: string | null | undefined) {
  if (!value) return false;
  const time = new Date(value).getTime();
  return !Number.isNaN(time) && time <= Date.now();
}
