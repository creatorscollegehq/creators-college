"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, ChevronDown, Circle, GraduationCap, PlayCircle } from "lucide-react";
import type { ModuleSummary } from "@/lib/courseContent";
import { PROGRESS_EVENT, readProgress } from "@/lib/progress";
import { track } from "@/lib/track";
import LogoutButton from "@/components/learn/LogoutButton";

interface LearnDashboardProps {
  orderId: string;
  studentName: string;
  studentEmail: string;
  maskedPhone: string;
  modules: ModuleSummary[];
  totalLessons: number;
}

export default function LearnDashboard({
  orderId,
  studentName,
  studentEmail,
  maskedPhone,
  modules,
  totalLessons,
}: LearnDashboardProps) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    track("dashboard_view", { orderId });
  }, [orderId]);

  useEffect(() => {
    const sync = () => setCompleted(readProgress(orderId));
    sync();
    window.addEventListener(PROGRESS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [orderId]);

  const allLessons = useMemo(() => modules.flatMap((module) => module.lessons), [modules]);
  const completedCount = useMemo(
    () => allLessons.filter((lesson) => completed[lesson.id]).length,
    [allLessons, completed]
  );
  const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const nextLesson = allLessons.find((lesson) => !completed[lesson.id]) ?? allLessons[0];

  return (
    <div className="flex-grow bg-brand-gray/30 dark:bg-brand-gray/10 py-6 md:py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="rounded-3xl overflow-hidden border border-gray-200/60 dark:border-white/10 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.35)]">
          <div className="bg-gradient-to-br from-[#123c9e] to-[#071c4d] px-6 py-6 md:px-8 md:py-8 text-white">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/80">
                  <GraduationCap size={13} className="text-brand-orange" />
                  My Course
                </p>
                <h1 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">
                  Welcome back, {studentName || "Student"}
                </h1>
                <p className="mt-1.5 text-sm text-white/70">Complete Telugu Content Creation Course</p>
                <p className="mt-1 text-[11px] text-white/50">
                  {studentEmail} · Enrolled number {maskedPhone}
                </p>
                <p className="mt-0.5 text-[10px] text-white/40">Order {orderId}</p>
              </div>
              <LogoutButton compact />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-4 md:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <BookOpen size={16} className="text-brand-orange" />
                    {completedCount} of {totalLessons} lessons completed
                  </div>
                  <p className="mt-1 text-[11px] text-white/50">
                    Progress is saved on this device automatically.
                  </p>
                </div>
                {nextLesson && (
                  <Link
                    href={nextLesson.href}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-orange hover:bg-brand-orange-dark px-5 py-2.5 text-xs font-semibold text-white transition shadow-lg shadow-black/20"
                  >
                    <PlayCircle size={15} />
                    {completedCount > 0 ? "Continue Learning" : "Start Learning"}
                  </Link>
                )}
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-brand-orange transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {modules.map((module, moduleIndex) => {
            const moduleCompleted = module.lessons.filter((lesson) => completed[lesson.id]).length;
            return (
              <details
                key={module.number}
                open={moduleIndex === 0}
                className="group rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white dark:bg-[#0d1424] overflow-hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 md:px-5 hover:bg-brand-gray/40 dark:hover:bg-white/[0.03]">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-orange">
                      Module {module.number}
                    </p>
                    <h2 className="mt-0.5 truncate text-sm md:text-base font-bold text-brand-charcoal dark:text-white">
                      {module.title}
                    </h2>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                      {moduleCompleted}/{module.lessons.length}
                    </span>
                    <ChevronDown
                      size={18}
                      className="text-gray-400 transition-transform group-open:rotate-180"
                    />
                  </div>
                </summary>
                <ul className="border-t border-gray-100 dark:border-white/5">
                  {module.lessons.map((lesson) => {
                    const done = Boolean(completed[lesson.id]);
                    return (
                      <li key={lesson.id}>
                        <Link
                          href={lesson.href}
                          className="flex items-center gap-3 px-4 py-3 md:px-5 text-sm transition hover:bg-brand-orange/5 dark:hover:bg-white/[0.03]"
                        >
                          {done ? (
                            <CheckCircle2 size={18} className="shrink-0 text-green-500" />
                          ) : (
                            <Circle size={18} className="shrink-0 text-gray-300 dark:text-white/20" />
                          )}
                          <span
                            className={`min-w-0 flex-1 truncate ${
                              done
                                ? "text-gray-400 dark:text-gray-500"
                                : "text-brand-charcoal dark:text-white/85"
                            }`}
                          >
                            {lesson.lessonIndex}. {lesson.title}
                          </span>
                          <PlayCircle size={16} className="shrink-0 text-brand-orange/70" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            );
          })}
        </div>

        <p className="text-center text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
          Lessons are private and individually watermarked. Please do not share your login or screen recordings.
        </p>
      </div>
    </div>
  );
}
