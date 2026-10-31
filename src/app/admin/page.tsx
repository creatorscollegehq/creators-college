import Link from "next/link";
import { courseLessons } from "@/lib/courseContent";
import {
  Activity,
  BookOpenCheck,
  CreditCard,
  IndianRupee,
  LogIn,
  MousePointerClick,
  PlayCircle,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import {
  clampDays,
  formatDateTime,
  formatINR,
  formatNumber,
  formatRelative,
  getEvents,
  getOverview,
  getTraffic,
  percent,
  type DailyPoint,
  type EventsData,
  type OverviewData,
  type TrafficData,
} from "@/lib/adminData";
import {
  AreaChart,
  BarChart,
  BarList,
  Card,
  EmptyState,
  Funnel,
  PageHeader,
  RangeTabs,
  StatCard,
  StatusBadge,
} from "./ui";

function trend(daily: DailyPoint[], key: "revenue" | "page_views" | "sessions", days: number) {
  if (days < 14 || daily.length < 14) return undefined;
  const recent = daily.slice(-7).reduce((sum, day) => sum + Number(day[key] || 0), 0);
  const previous = daily.slice(-14, -7).reduce((sum, day) => sum + Number(day[key] || 0), 0);
  if (!previous) return recent > 0 ? 100 : 0;
  return Math.round(((recent - previous) / previous) * 100);
}

function shortDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

export default async function AdminOverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  const { days: daysParam } = await searchParams;
  const days = clampDays(daysParam);

  let overview: OverviewData | null = null;
  let feed: EventsData | null = null;
  let traffic: TrafficData | null = null;
  let loadError = "";

  try {
    [overview, feed, traffic] = await Promise.all([
      getOverview(days),
      getEvents({ limit: 8 }),
      getTraffic(days),
    ]);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown error";
    console.error("Admin overview failed:", loadError);
  }

  if (!overview || !feed || !traffic) {
    return (
      <div className="space-y-4">
        <PageHeader title="Overview" description="Business and learning performance.">
          <RangeTabs basePath="/admin" days={days} />
        </PageHeader>
        <Card title="Analytics is not ready yet">
          <p className="text-xs leading-relaxed text-gray-600">
            The admin analytics tables could not be read. Apply the Supabase migration{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-[10px]">
              supabase/migrations/20261031010000_admin_analytics.sql
            </code>{" "}
            and reload. Until then, enrollments and course access continue to work normally.
          </p>
          <p className="mt-2 rounded-lg bg-gray-50 px-3 py-2 font-mono text-[10px] text-red-500">{loadError}</p>
        </Card>
      </div>
    );
  }

  const daily = Array.isArray(overview.daily) ? overview.daily : [];
  const checkoutToPaid = percent(overview.payments_verified, overview.checkout_starts);
  const paidToLogin = percent(overview.logins, overview.payments_verified);
  const avgOrder = overview.orders ? Math.round(overview.revenue / overview.orders) : 0;
  const linkedShare = percent(overview.linked_enrollments, overview.active_enrollments);
  const titleById = new Map(courseLessons.map((lesson) => [lesson.id, lesson.title]));

  return (
      <div className="space-y-4">
        <PageHeader
          title="Overview"
          description={`Business and learning performance for the last ${days} days.`}
        >
          <RangeTabs basePath="/admin" days={days} />
        </PageHeader>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Revenue"
            value={formatINR(overview.revenue)}
            hint={`${formatNumber(overview.orders)} enrollments · avg ${formatINR(avgOrder)}`}
            icon={<IndianRupee size={16} />}
            trend={trend(daily, "revenue", days)}
            accent="green"
          />
          <StatCard
            label="Active students"
            value={formatNumber(overview.active_enrollments)}
            hint={`${formatNumber(overview.linked_enrollments)} linked Google accounts`}
            icon={<Users size={16} />}
            accent="blue"
          />
          <StatCard
            label={`Active · ${days}d`}
            value={formatNumber(overview.students_active_7d)}
            hint="Students with activity in the last 7 days"
            icon={<UserCheck size={16} />}
            accent="violet"
          />
          <StatCard
            label="Page views"
            value={formatNumber(overview.page_views)}
            hint={`${formatNumber(overview.unique_visitors)} unique sessions`}
            icon={<MousePointerClick size={16} />}
            trend={trend(daily, "page_views", days)}
          />
          <StatCard
            label="Checkout starts"
            value={formatNumber(overview.checkout_starts)}
            hint={`${formatNumber(overview.payments_verified)} verified · ${checkoutToPaid}% conversion`}
            icon={<CreditCard size={16} />}
            accent="orange"
          />
          <StatCard
            label="Google sign-ins"
            value={formatNumber(overview.logins)}
            hint={`${paidToLogin}% of verified payments sign in`}
            icon={<LogIn size={16} />}
            accent="blue"
          />
          <StatCard
            label="Lessons opened"
            value={formatNumber(overview.lesson_views)}
            hint={`${formatNumber(overview.video_plays)} video plays`}
            icon={<PlayCircle size={16} />}
            accent="violet"
          />
          <StatCard
            label="Lessons completed"
            value={formatNumber(overview.lessons_completed)}
            hint={`${formatNumber(overview.sessions)} sessions tracked`}
            icon={<BookOpenCheck size={16} />}
            accent="green"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card
            title="Revenue trend"
            subtitle={`Daily verified revenue · ${formatINR(overview.revenue)} total`}
            action={
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                <TrendingUp size={12} /> {formatNumber(overview.orders)} orders
              </span>
            }
          >
            <BarChart
              points={daily.map((day) => ({ label: shortDate(day.date), value: Number(day.revenue) || 0 }))}
              color="#10b981"
            />
            <div className="mt-1 flex items-center justify-between text-[10px] text-gray-400">
              <span>{daily[0] ? shortDate(daily[0].date) : "—"}</span>
              <span>{daily.length ? shortDate(daily[daily.length - 1].date) : "—"}</span>
            </div>
          </Card>

          <Card title="Traffic trend" subtitle="Page views per day across the site">
            <AreaChart
              id="admin-overview-traffic"
              points={daily.map((day) => ({
                label: shortDate(day.date),
                value: Number(day.page_views) || 0,
              }))}
            />
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <Card
            title="Conversion funnel"
            subtitle="Unique users/sessions at each step — check, pay, sign in, learn"
          >
            <Funnel steps={overview.funnel} />
          </Card>

          <Card
            title="Delivery health"
            subtitle="Are paid students actually getting into the course?"
          >
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#0B1B4B]">Payment → Google sign-in</span>
                  <span className="tabular-nums text-gray-500">{paidToLogin}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.min(100, paidToLogin)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#0B1B4B]">Active enrollments linked to Google</span>
                  <span className="tabular-nums text-gray-500">{linkedShare}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.min(100, linkedShare)}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="rounded-xl border border-gray-100 bg-gray-50/70 px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Video plays</p>
                  <p className="mt-0.5 text-sm font-bold text-[#0B1B4B]">{formatNumber(overview.video_plays)}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/70 px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Completions</p>
                  <p className="mt-0.5 text-sm font-bold text-[#0B1B4B]">{formatNumber(overview.lessons_completed)}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <Card
            title="Top lessons"
            subtitle="Most watched lessons across all students"
            action={
              <Link href="/admin/lessons" className="text-[10px] font-bold text-brand-orange hover:underline">
                All lessons
              </Link>
            }
          >
            {overview.top_lessons.length ? (
              <div className="space-y-2">
                {overview.top_lessons.map((lesson, index) => (
                  <div
                    key={lesson.lesson_id}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 px-3 py-2"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#0B1B4B]/5 text-[10px] font-bold text-[#0B1B4B]">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold text-[#0B1B4B]">
                        {titleById.get(lesson.lesson_id) || `Module ${lesson.module_number} · Lesson ${Number(lesson.lesson_index) + 1}`}
                      </p>
                      <p className="truncate text-[10px] text-gray-400">
                        Module {lesson.module_number} · Lesson {Number(lesson.lesson_index) + 1}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[11px] font-bold tabular-nums text-[#0B1B4B]">
                        {formatNumber(lesson.viewers)} viewers
                      </p>
                      <p className="text-[10px] text-gray-400">{formatNumber(lesson.completions)} completed</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="Lesson analytics appear once students start watching." />
            )}
          </Card>

          <Card
            title="Recent enrollments"
            subtitle="Latest purchases and enrollment records"
            action={
              <Link href="/admin/students" className="text-[10px] font-bold text-brand-orange hover:underline">
                All students
              </Link>
            }
          >
            {overview.recent_enrollments.length ? (
              <div className="space-y-2">
                {overview.recent_enrollments.map((enrollment) => (
                  <Link
                    key={enrollment.order_id}
                    href={`/admin/students/${encodeURIComponent(enrollment.order_id)}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-3 py-2 transition hover:border-brand-orange/40"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-semibold text-[#0B1B4B]">
                        {enrollment.name || "Student"}
                      </p>
                      <p className="truncate text-[10px] text-gray-400">{enrollment.email || enrollment.phone}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[11px] font-bold text-[#0B1B4B]">{formatINR(enrollment.amount)}</p>
                      <p className="text-[10px] text-gray-400">{formatRelative(enrollment.created_at)}</p>
                    </div>
                    <StatusBadge status={enrollment.status} expiresAt={enrollment.expires_at} />
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState text="No enrollments yet. Share the course page to get the first student." />
            )}
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          <Card title="Live activity" subtitle="Most recent tracked events">
            {feed.rows.length ? (
              <div className="divide-y divide-gray-100">
                {feed.rows.map((event) => (
                  <div key={event.id} className="flex items-center justify-between gap-3 py-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange">
                        <Activity size={13} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-[#0B1B4B]">
                          {event.event_name.replace(/_/g, " ")}
                        </p>
                        <p className="truncate text-[10px] text-gray-400">
                          {event.email || event.path || event.session_id || "anonymous"}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] text-gray-400">{formatDateTime(event.created_at)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="No events yet. Open the site in another tab to see live activity." />
            )}
          </Card>

          <Card title="Top pages & devices" subtitle="Where visitors spend their attention">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Pages</p>
                <BarList
                  items={(traffic.paths || []).slice(0, 6).map((page) => ({
                    label: page.path,
                    value: Number(page.views) || 0,
                    secondary: `${formatNumber(page.sessions)} sessions`,
                  }))}
                  empty="No page views yet"
                  suffix="views"
                />
              </div>
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Devices</p>
                <BarList
                  items={(traffic.devices || []).map((device) => ({
                    label: device.device,
                    value: Number(device.visits) || 0,
                  }))}
                  empty="No device data yet"
                  suffix="views"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
}
