"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Circle,
  GraduationCap,
  PlayCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import type { LessonSummary, ModuleSummary } from "@/lib/courseContent";
import { PROGRESS_EVENT, readProgress } from "@/lib/progress";
import { track } from "@/lib/track";
import LogoutButton from "@/components/learn/LogoutButton";

interface EnrollmentSummary {
  orderId: string;
  memberSince: string;
  accessUntil: string;
}

interface LearnDashboardProps {
  studentName: string;
  studentEmail: string;
  enrollment: EnrollmentSummary | null;
  modules: ModuleSummary[];
  totalLessons: number;
}

const SUPPORT_URL =
  "https://wa.me/918143937367?text=Hi%20Creators%20College%2C%20I%20paid%20but%20my%20course%20is%20not%20showing%20in%20my%20profile.";

function initialsFor(name: string, email: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return email.slice(0, 2).toUpperCase();
}

export default function LearnDashboard({
  studentName,
  studentEmail,
  enrollment,
  modules,
  totalLessons,
}: LearnDashboardProps) {
  const orderId = enrollment?.orderId ?? "";
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!orderId) return;
    track("dashboard_view", { orderId });
  }, [orderId]);

  useEffect(() => {
    if (!orderId) return;
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
  const initials = useMemo(() => initialsFor(studentName, studentEmail), [studentName, studentEmail]);

  const renderLesson = (lesson: LessonSummary) => {
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
              done ? "text-gray-400 dark:text-gray-500" : "text-brand-charcoal dark:text-white/85"
            }`}
          >
            {lesson.lessonIndex}. {lesson.title}
          </span>
          <PlayCircle size={16} className="shrink-0 text-brand-orange/70" />
        </Link>
      </li>
    );
  };

  return (
    <div className="flex-grow bg-brand-gray/30 dark:bg-brand-gray/10 py-6 md:py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <section className="relative overflow-hidden rounded-3xl border border-gray-200/60 dark:border-white/10 bg-gradient-to-br from-[#123c9e] to-[#071c4d] shadow-[0_30px_70px_-40px_rgba(15,23,42,0.45)]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/[0.06]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-brand-orange/10 blur-2xl"
          />
          <div className="relative px-6 py-7 md:px-8 md:py-9">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-xl font-bold tracking-wide text-white md:h-20 md:w-20 md:text-2xl">
                  {initials}
                </span>
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/80">
                    {enrollment ? (
                      <BadgeCheck size={12} className="text-brand-orange" />
                    ) : (
                      <GraduationCap size={12} className="text-brand-orange" />
                    )}
                    {enrollment ? "Enrolled student" : "My profile"}
                  </span>
                  <h1 className="mt-2 truncate text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {studentName || "Student"}
                  </h1>
                  <p className="truncate text-sm text-white/70">{studentEmail}</p>
                  {enrollment && (
                    <p className="mt-1 text-[11px] text-white/50">
                      Member since {enrollment.memberSince} · {enrollment.accessUntil}
                    </p>
                  )}
                </div>
              </div>
              <LogoutButton compact />
            </div>
          </div>
        </section>

        {enrollment ? (
          <>
            <section className="rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-[#0d1424] p-5 md:p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-brand-orange">
                    <BookOpen size={12} />
                    Your course
                  </p>
                  <h2 className="mt-1 text-lg font-bold tracking-tight text-brand-charcoal dark:text-white md:text-xl">
                    Complete Telugu Content Creation Course
                  </h2>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {completedCount} of {totalLessons} lessons completed · progress saved on this device
                  </p>
                </div>
                {nextLesson && (
                  <Link
                    href={nextLesson.href}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-brand-orange/20 transition hover:bg-brand-orange-dark"
                  >
                    <PlayCircle size={15} />
                    {completedCount > 0 ? "Continue learning" : "Start learning"}
                  </Link>
                )}
              </div>
              <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-brand-orange transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-gray-400">
                <span>{percent}% complete</span>
                <span>{enrollment.accessUntil}</span>
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-bold text-brand-charcoal dark:text-white">Course content</h2>
                <span className="text-[11px] text-gray-400">
                  {modules.length} modules · {totalLessons} lessons
                </span>
              </div>
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
                        <h3 className="mt-0.5 truncate text-sm md:text-base font-bold text-brand-charcoal dark:text-white">
                          {module.title}
                        </h3>
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
                    {module.sections ? (
                      <div className="border-t border-gray-100 dark:border-white/5">
                        {module.sections.map((section, sectionIndex) => {
                          const sectionCompleted = section.lessons.filter((lesson) => completed[lesson.id]).length;
                          return (
                            <div key={`${section.title}-${sectionIndex}`}>
                              <p className="flex items-center justify-between gap-3 border-b border-gray-100 bg-brand-gray/40 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:border-white/5 dark:bg-white/[0.03] dark:text-gray-400 md:px-5">
                                <span className="truncate">{section.title}</span>
                                <span className="shrink-0 tabular-nums">
                                  {sectionCompleted}/{section.lessons.length}
                                </span>
                              </p>
                              <ul>{section.lessons.map(renderLesson)}</ul>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <ul className="border-t border-gray-100 dark:border-white/5">
                        {module.lessons.map(renderLesson)}
                      </ul>
                    )}
                  </details>
                );
              })}
            </section>

            <p className="flex items-center justify-center gap-1.5 text-center text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
              <ShieldCheck size={13} className="shrink-0 text-brand-orange" />
              Lessons are private and individually watermarked. Please do not share your login or screen recordings.
            </p>
          </>
        ) : (
          <section className="overflow-hidden rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-[#0d1424] shadow-sm">
            <div className="px-6 py-10 text-center md:px-10 md:py-14">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
                <Sparkles size={28} />
              </span>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-brand-charcoal dark:text-white md:text-2xl">
                No active course yet
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                You are signed in as{" "}
                <span className="font-semibold text-brand-charcoal dark:text-white/90">{studentEmail}</span>. Enroll
                once and this page becomes your private course library.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-orange/20 transition hover:bg-brand-orange-dark"
                >
                  Enroll now
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/courses/content-creation"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-white/15 px-6 py-3 text-sm font-semibold text-brand-charcoal dark:text-white transition hover:border-brand-orange hover:text-brand-orange"
                >
                  See course details
                </Link>
              </div>
              <div className="mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-3">
                {[
                  { title: "Full access", text: "All modules and lessons" },
                  { title: "Your pace", text: "Watch anytime, on any device" },
                  { title: "Private", text: "Watermarked lessons" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50/70 dark:bg-white/[0.03] px-4 py-3"
                  >
                    <p className="text-[11px] font-bold text-brand-charcoal dark:text-white">{item.title}</p>
                    <p className="mt-0.5 text-[10px] leading-relaxed text-gray-500 dark:text-gray-400">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mx-auto mt-7 max-w-md text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                Already paid with a different Gmail? Send us your order ID and we will move the access to this
                account.{" "}
                <a
                  href={SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-green-600 hover:text-green-700"
                >
                  <WhatsAppIcon size={12} />
                  Contact support
                </a>
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
