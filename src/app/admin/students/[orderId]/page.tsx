import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpenCheck,
  Clock3,
  Mail,
  MessageCircle,
  Phone,
  Timer,
  UserRound,
} from "lucide-react";
import {
  formatDateTime,
  formatDuration,
  formatINR,
  formatNumber,
  formatRelative,
  getStudent,
} from "@/lib/adminData";
import { Badge, Card, EmptyState, PageHeader, StatCard, StatusBadge } from "../../ui";
import StudentActions from "./StudentActions";

export default async function AdminStudentDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const student = await getStudent(decodeURIComponent(orderId)).catch(() => null);

  if (!student) {
    notFound();
  }

  const { enrollment, progress = [], events = [], stats } = student;
  const safeProgress = Array.isArray(progress) ? progress : [];
  const safeEvents = Array.isArray(events) ? events : [];

  return (
    <div className="space-y-4">
      <div>
        <Link
          href="/admin/students"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-500 transition hover:text-brand-orange"
        >
          <ArrowLeft size={13} /> Back to students
        </Link>
      </div>

      <PageHeader
        title={enrollment.name || "Student"}
        description={`Order ${enrollment.order_id}`}
      >
        <StatusBadge status={enrollment.status} expiresAt={enrollment.expires_at} />
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          label="Lessons completed"
          value={formatNumber(stats?.completed_lessons ?? 0)}
          hint="out of 73"
          icon={<BookOpenCheck size={16} />}
          accent="green"
        />
        <StatCard
          label="Lessons opened"
          value={formatNumber(stats?.lessons_opened ?? 0)}
          hint="unique lessons"
          icon={<UserRound size={16} />}
          accent="blue"
        />
        <StatCard
          label="Watch time"
          value={formatDuration(stats?.watch_seconds ?? 0)}
          hint="logged playback"
          icon={<Timer size={16} />}
          accent="violet"
        />
        <StatCard
          label="Last active"
          value={stats?.last_active_at ? formatRelative(stats.last_active_at) : "—"}
          hint={stats?.last_active_at ? formatDateTime(stats.last_active_at) : "No tracked activity"}
          icon={<Clock3 size={16} />}
        />
        <StatCard
          label="Events tracked"
          value={formatNumber(stats?.event_count ?? 0)}
          hint="page views, plays, logins"
          icon={<MessageCircle size={16} />}
          accent="orange"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <Card title="Enrollment">
            <dl className="space-y-2 text-[11px]">
              <div className="flex items-start justify-between gap-3">
                <dt className="text-gray-500">Email</dt>
                <dd className="text-right font-semibold text-[#0B1B4B]">
                  {enrollment.email ? (
                    <a href={`mailto:${enrollment.email}`} className="inline-flex items-center gap-1 hover:text-brand-orange">
                      <Mail size={11} /> {enrollment.email}
                    </a>
                  ) : (
                    "No email on record"
                  )}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-gray-500">Phone</dt>
                <dd className="text-right font-semibold text-[#0B1B4B]">
                  <a
                    href={`https://wa.me/91${enrollment.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-brand-orange"
                  >
                    <Phone size={11} /> {enrollment.phone}
                  </a>
                </dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-gray-500">Amount</dt>
                <dd className="text-right font-semibold text-[#0B1B4B]">
                  {formatINR(enrollment.amount)} {enrollment.currency || "INR"}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-gray-500">Provider</dt>
                <dd className="text-right font-semibold capitalize text-[#0B1B4B]">{enrollment.provider}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-gray-500">Course</dt>
                <dd className="text-right font-semibold text-[#0B1B4B]">{enrollment.course_slug}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-gray-500">Created</dt>
                <dd className="text-right text-gray-600">{formatDateTime(enrollment.created_at)}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-gray-500">Claimed</dt>
                <dd className="text-right text-gray-600">{formatDateTime(enrollment.claimed_at)}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-gray-500">Expires</dt>
                <dd className="text-right text-gray-600">{enrollment.expires_at ? formatDateTime(enrollment.expires_at) : "Lifetime access"}</dd>
              </div>
              <div className="flex items-start justify-between gap-3 border-t border-gray-100 pt-2">
                <dt className="text-gray-500">Google account</dt>
                <dd className="max-w-[220px] break-all text-right">
                  {enrollment.user_id ? (
                    <span className="inline-flex items-center gap-1">
                      <Badge tone="green">Linked</Badge>
                      <span className="font-mono text-[9px] text-gray-400">{enrollment.user_id.slice(0, 8)}…</span>
                    </span>
                  ) : (
                    <Badge tone="amber">Not linked</Badge>
                  )}
                </dd>
              </div>
            </dl>

            <div className="mt-4 border-t border-gray-100 pt-3">
              <StudentActions
                orderId={enrollment.order_id}
                status={enrollment.status}
                linked={Boolean(enrollment.user_id)}
              />
            </div>
          </Card>

          <Card title="Support shortcuts">
            <div className="grid gap-2 sm:grid-cols-2">
              <a
                href={`https://wa.me/91${enrollment.phone}?text=${encodeURIComponent(
                  `Hi ${enrollment.name || ""}, this is Creators College about your course access.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#1fb959]"
              >
                <MessageCircle size={13} /> WhatsApp student
              </a>
              <a
                href={`tel:+91${enrollment.phone}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2.5 text-[11px] font-bold text-[#0B1B4B] transition hover:border-brand-orange hover:text-brand-orange"
              >
                <Phone size={13} /> Call student
              </a>
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-gray-400">
              Order IDs are case-sensitive. The student must sign in with the same Google email used at checkout.
            </p>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Lesson progress" subtitle={`${safeProgress.length} lessons with tracked progress`}>
            {safeProgress.length ? (
              <div className="max-h-[420px] overflow-y-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-gray-100 text-[10px] uppercase tracking-wider text-gray-400">
                      <th className="pb-2 font-bold">Lesson</th>
                      <th className="pb-2 font-bold">Status</th>
                      <th className="pb-2 text-right font-bold">Watched</th>
                      <th className="pb-2 text-right font-bold">Last viewed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {safeProgress.map((row) => (
                      <tr key={row.lesson_id}>
                        <td className="py-2 pr-2">
                          <p className="font-semibold text-[#0B1B4B]">
                            M{row.module_number} · L{Number(row.lesson_index) + 1}
                          </p>
                          <p className="truncate text-[9px] text-gray-400">{row.lesson_id}</p>
                        </td>
                        <td className="py-2 pr-2">
                          {row.completed ? <Badge tone="green">Completed</Badge> : <Badge tone="slate">In progress</Badge>}
                        </td>
                        <td className="py-2 pr-2 text-right tabular-nums text-gray-600">
                          {formatDuration(row.watched_seconds)}
                        </td>
                        <td className="py-2 text-right text-[10px] text-gray-500">{formatRelative(row.last_viewed_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState text="No lesson progress yet. Progress appears after the student opens a lesson." />
            )}
          </Card>

          <Card title="Recent activity" subtitle="Last 40 tracked events for this student">
            {safeEvents.length ? (
              <div className="max-h-[420px] space-y-1 overflow-y-auto pr-1">
                {safeEvents.map((event, index) => (
                  <div key={`${event.created_at}-${index}`} className="rounded-lg border border-gray-100 px-2.5 py-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold capitalize text-[#0B1B4B]">
                        {event.event_name.replace(/_/g, " ")}
                      </p>
                      <span className="shrink-0 text-[10px] text-gray-400">{formatRelative(event.created_at)}</span>
                    </div>
                    <p className="mt-0.5 truncate text-[10px] text-gray-500">
                      {[event.path, event.device_type, event.browser, event.city, event.country]
                        .filter(Boolean)
                        .join(" · ") || "—"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="No activity tracked for this student yet." />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
