import Link from "next/link";
import { BookOpenCheck, PlayCircle, Target, Users } from "lucide-react";
import { courseLessons } from "@/lib/courseContent";
import {
  formatDateTime,
  formatDuration,
  formatNumber,
  getLessons,
  percent,
  type LessonsData,
} from "@/lib/adminData";
import { Badge, Card, EmptyState, PageHeader, StatCard } from "../ui";

export default async function AdminLessonsPage() {
  let data: LessonsData | null = null;
  let loadError = "";

  try {
    data = await getLessons();
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown error";
    console.error("Admin lessons failed:", loadError);
  }

  if (!data) {
    return (
      <div className="space-y-4">
        <PageHeader title="Lessons" description="Per-lesson engagement across the course." />
        <Card title="Lesson analytics is not ready yet">
          <p className="text-xs leading-relaxed text-gray-600">
            Apply the analytics migration in Supabase to enable per-lesson tracking.
          </p>
          <p className="mt-2 rounded-lg bg-gray-50 px-3 py-2 font-mono text-[10px] text-red-500">{loadError}</p>
        </Card>
      </div>
    );
  }

  const lessons = data.lessons || [];
  const totalCourseLessons = courseLessons.length || 73;
  const completionRate = percent(Number(data.totals?.completions) || 0, lessons.reduce((sum, row) => sum + Number(row.viewers), 0));
  const coverage = percent(Number(data.totals?.tracked_lessons) || 0, totalCourseLessons);
  const titleById = new Map(courseLessons.map((lesson) => [lesson.id, lesson.title]));

  return (
    <div className="space-y-4">
      <PageHeader title="Lessons" description="Which lessons students open, finish and rewatch.">
        <Link
          href="/api/admin/export?type=lessons"
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition hover:border-brand-orange hover:text-brand-orange"
        >
          Export lessons CSV
        </Link>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Tracked lessons"
          value={`${formatNumber(Number(data.totals?.tracked_lessons) || 0)}/${totalCourseLessons}`}
          hint={`${coverage}% of the course has activity`}
          icon={<BookOpenCheck size={16} />}
        />
        <StatCard
          label="Unique viewers"
          value={formatNumber(Number(data.totals?.viewers) || 0)}
          hint="Students with lesson progress"
          icon={<Users size={16} />}
          accent="blue"
        />
        <StatCard
          label="Completions"
          value={formatNumber(Number(data.totals?.completions) || 0)}
          hint="Marked complete by students"
          icon={<Target size={16} />}
          accent="green"
        />
        <StatCard
          label="Avg completion"
          value={`${completionRate}%`}
          hint="Completions vs lesson viewers"
          icon={<PlayCircle size={16} />}
          accent="violet"
        />
      </div>

      <Card title="Course coverage" subtitle={`${formatNumber(Number(data.totals?.tracked_lessons) || 0)} of ${totalCourseLessons} lessons have at least one viewer`}>
        <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-orange to-amber-400"
            style={{ width: `${Math.max(2, Math.min(100, coverage))}%` }}
          />
        </div>
        <p className="mt-1.5 text-[10px] text-gray-400">
          Untracked lessons have not been opened by any signed-in student yet.
        </p>
      </Card>

      <Card title="Lesson performance" padded={false}>
        <div className="p-4 sm:p-5">
          {lessons.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-[11px]">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] uppercase tracking-wider text-gray-400">
                    <th className="pb-2 pr-3 font-bold">Lesson</th>
                    <th className="pb-2 pr-3 text-right font-bold">Viewers</th>
                    <th className="pb-2 pr-3 text-right font-bold">Completed</th>
                    <th className="pb-2 pr-3 text-right font-bold">Completion</th>
                    <th className="pb-2 pr-3 text-right font-bold">Avg watched</th>
                    <th className="pb-2 text-right font-bold">Last viewed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {lessons.map((lesson) => {
                    const viewers = Number(lesson.viewers) || 0;
                    const completions = Number(lesson.completions) || 0;
                    const rate = percent(completions, viewers);
                    return (
                      <tr key={lesson.lesson_id} className="hover:bg-gray-50/60">
                        <td className="max-w-[320px] py-2.5 pr-3">
                          <p className="truncate font-semibold text-[#0B1B4B]">
                            <span className="mr-1.5 inline-flex items-center rounded bg-[#0B1B4B]/5 px-1.5 py-0.5 text-[9px] font-bold text-[#0B1B4B]">
                              M{lesson.module_number}·L{Number(lesson.lesson_index) + 1}
                            </span>
                            {titleById.get(lesson.lesson_id) || lesson.lesson_id}
                          </p>
                          <p className="truncate text-[9px] text-gray-400">{lesson.lesson_id}</p>
                        </td>
                        <td className="py-2.5 pr-3 text-right font-semibold tabular-nums text-[#0B1B4B]">{viewers}</td>
                        <td className="py-2.5 pr-3 text-right tabular-nums text-gray-600">{completions}</td>
                        <td className="py-2.5 pr-3 text-right">
                          <Badge tone={rate >= 60 ? "green" : rate >= 30 ? "amber" : "slate"}>{rate}%</Badge>
                        </td>
                        <td className="py-2.5 pr-3 text-right tabular-nums text-gray-600">
                          {formatDuration(Number(lesson.avg_seconds) || 0)}
                        </td>
                        <td className="py-2.5 text-right text-[10px] text-gray-500">
                          {lesson.last_viewed_at ? formatDateTime(lesson.last_viewed_at) : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState text="No lesson progress yet. Analytics starts collecting when a student opens a lesson." />
          )}
        </div>
      </Card>
    </div>
  );
}
