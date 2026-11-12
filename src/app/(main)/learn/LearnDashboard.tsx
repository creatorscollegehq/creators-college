"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  GraduationCap,
  PlayCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import type { LessonSummary, ModuleSummary } from "@/lib/courseContent";
import {
  PROGRESS_EVENT,
  readProgress,
  setLessonComplete,
  setLessonsComplete,
} from "@/lib/progress";
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
  "https://wa.me/918143937367?text=Hi%20Creators%20College%2C%20I%20need%20help%20with%20the%20course.";

const MODULE_ICONS: Record<string, string> = {
  "00": "🎯",
  "01": "💡",
  "02": "🎬",
  "03": "✍️",
  "04": "🎙️",
  "05": "🎥",
  "06": "📱",
  "07": "✂️",
  "08": "📣",
  "09": "☁️",
  "10": "📊",
  "11": "🤖",
};

function initialsFor(name: string, email: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return email.slice(0, 2).toUpperCase();
}

function moduleNumberLabel(number: string) {
  return number.padStart(2, "0");
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
  const [selectedNumber, setSelectedNumber] = useState(() => modules[0]?.number ?? "00");

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

  const selectedModule = modules.find((module) => module.number === selectedNumber) ?? modules[0];
  const selectedLessons = selectedModule?.lessons ?? [];
  const selectedCompleted = selectedLessons.filter((lesson) => completed[lesson.id]).length;
  const selectedPercent =
    selectedLessons.length > 0 ? Math.round((selectedCompleted / selectedLessons.length) * 100) : 0;
  const moduleDone = selectedLessons.length > 0 && selectedCompleted === selectedLessons.length;

  const toggleLesson = (lesson: LessonSummary) => {
    if (!orderId) return;
    setLessonComplete(orderId, lesson.id, !completed[lesson.id]);
  };

  const toggleModule = () => {
    if (!orderId || !selectedModule) return;
    setLessonsComplete(
      orderId,
      selectedModule.lessons.map((lesson) => lesson.id),
      !moduleDone
    );
  };

  const renderLesson = (lesson: LessonSummary) => {
    const done = Boolean(completed[lesson.id]);
    return (
      <div key={lesson.id} className="border-b border-gray-100 last:border-0 dark:border-white/5">
        <div className="flex items-center gap-3 px-4 py-2.5 transition hover:bg-brand-orange/[0.04] dark:hover:bg-white/[0.03] md:px-5">
          <button
            type="button"
            onClick={() => toggleLesson(lesson)}
            aria-label={done ? `Mark ${lesson.title} as incomplete` : `Mark ${lesson.title} as complete`}
            className="shrink-0"
          >
            {done ? (
              <CheckCircle2 size={20} className="text-emerald-500" />
            ) : (
              <Circle size={20} className="text-gray-300 transition hover:text-emerald-400 dark:text-white/20" />
            )}
          </button>
          <Link href={lesson.href} className="flex min-w-0 flex-1 items-center gap-3">
            <span
              className={`min-w-0 flex-1 truncate text-xs font-semibold sm:text-sm ${
                done ? "text-gray-400 line-through dark:text-gray-500" : "text-brand-charcoal dark:text-white/90"
              }`}
            >
              {lesson.lessonIndex}. {lesson.title}
            </span>
            <span className="hidden shrink-0 items-center gap-1 rounded-lg bg-brand-blue px-2.5 py-1.5 text-[10px] font-bold text-white sm:inline-flex md:px-3">
              <PlayCircle size={12} />
              Watch
            </span>
            <PlayCircle size={18} className="shrink-0 text-brand-orange sm:hidden" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-grow bg-[#F3F6F8] py-4 dark:bg-[#090d16] md:py-6">
      <div className="mx-auto max-w-7xl space-y-4 px-4">
        <section className="rounded-2xl border border-gray-200/70 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-[#0d1424] md:px-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                <BookOpen size={22} />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-orange">
                  Complete Telugu
                </p>
                <h1 className="truncate text-base font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-lg">
                  Content Creation Course
                </h1>
              </div>
              <span className="hidden shrink-0 rounded-md bg-brand-orange px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white sm:inline">
                Recorded Lessons
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#123c9e] text-[11px] font-bold text-white">
                {initials}
              </span>
              <div className="hidden min-w-0 md:block">
                <p className="truncate text-xs font-bold text-[#0B1B4B] dark:text-white">{studentName}</p>
                <p className="truncate text-[10px] text-gray-500 dark:text-gray-400">{studentEmail}</p>
              </div>
              <LogoutButton compact />
            </div>
          </div>
        </section>

        {enrollment ? (
          <div className="grid gap-4 lg:grid-cols-[300px_1fr] lg:items-start">
            <aside className="space-y-4 lg:sticky lg:top-24">
              <section className="rounded-2xl border border-gray-200/70 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0d1424]">
                <div className="flex items-center gap-4">
                  <div
                    className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: `conic-gradient(#22c55e ${percent * 3.6}deg, #e5e7eb ${percent * 3.6}deg)`,
                    }}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg font-black text-[#0B1B4B] dark:bg-[#0d1424] dark:text-white">
                      {percent}%
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#0B1B4B] dark:text-white">Course Progress</p>
                    <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                      {completedCount} of {totalLessons} Lessons Completed
                    </p>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
                {nextLesson && (
                  <Link
                    href={nextLesson.href}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-brand-orange/20 transition hover:bg-brand-orange-dark"
                  >
                    <PlayCircle size={15} />
                    {completedCount > 0 ? "Continue learning" : "Start learning"}
                  </Link>
                )}
              </section>

              <section className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-[#0d1424]">
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-white/10">
                  <h2 className="flex items-center gap-1.5 text-sm font-bold text-[#0B1B4B] dark:text-white">
                    <PlayCircle size={15} className="text-brand-orange" />
                    Course Modules
                  </h2>
                  <span className="text-[11px] font-semibold text-gray-400">({modules.length})</span>
                </div>
                <ul className="max-h-[560px] overflow-y-auto">
                  {modules.map((module) => {
                    const done = module.lessons.length > 0 && module.lessons.every((lesson) => completed[lesson.id]);
                    const active = module.number === selectedNumber;
                    return (
                      <li key={module.number}>
                        <button
                          type="button"
                          onClick={() => setSelectedNumber(module.number)}
                          className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition ${
                            active
                              ? "bg-[#123c9e] text-white"
                              : "hover:bg-brand-orange/[0.04] dark:hover:bg-white/[0.03]"
                          }`}
                        >
                          <span
                            className={`flex h-6 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-black ${
                              active ? "bg-white/15 text-white" : "bg-brand-gray text-[#0B1B4B] dark:bg-white/10 dark:text-white"
                            }`}
                          >
                            {moduleNumberLabel(module.number)}
                          </span>
                          <span className="shrink-0 text-base" aria-hidden>
                            {MODULE_ICONS[module.number] ?? "📘"}
                          </span>
                          <span
                            className={`min-w-0 flex-1 truncate text-xs font-bold ${
                              active ? "text-white" : "text-brand-charcoal dark:text-white/85"
                            }`}
                          >
                            {module.title}
                          </span>
                          {done ? (
                            <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                          ) : (
                            <ChevronRight
                              size={14}
                              className={`shrink-0 ${active ? "text-white/70" : "text-gray-300 dark:text-white/20"}`}
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <a
                href={SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200"
              >
                <WhatsAppIcon size={18} className="shrink-0 text-[#25D366]" />
                <span className="min-w-0">
                  Need help? Chat with us
                  <span className="block text-[10px] font-medium text-emerald-700/80 dark:text-emerald-200/70">
                    Doubt support &amp; course help on WhatsApp
                  </span>
                </span>
              </a>
            </aside>

            <main className="space-y-4">
              {selectedModule && (
                <>
                  <section className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-[#0d1424]">
                    <div className="flex flex-wrap items-start justify-between gap-4 p-4 md:p-5">
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF2FF] text-3xl dark:bg-white/10">
                          {MODULE_ICONS[selectedModule.number] ?? "📘"}
                        </span>
                        <div className="min-w-0">
                          <span className="inline-flex rounded-md bg-brand-orange px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white">
                            Module {moduleNumberLabel(selectedModule.number)}
                          </span>
                          <h2 className="mt-1 text-xl font-black leading-tight tracking-tight text-[#0B1B4B] dark:text-white md:text-2xl">
                            {selectedModule.title}
                          </h2>
                          <p className="mt-1 max-w-xl text-[11px] leading-relaxed text-gray-500 dark:text-gray-400 sm:text-xs">
                            Learn step by step with practical lessons, examples and clear explanations in Telugu.
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 dark:border-white/10">
                        <PlayCircle size={18} className="text-brand-orange" />
                        <div>
                          <p className="text-sm font-black text-[#0B1B4B] dark:text-white">{selectedLessons.length}</p>
                          <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                            Lessons in this module
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 px-4 pb-4 pt-3 dark:border-white/5 md:px-5">
                      <div className="mb-1.5 flex items-center justify-between text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                        <span>
                          {selectedCompleted}/{selectedLessons.length} completed
                        </span>
                        <span>{selectedPercent}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                        <div
                          className="h-full rounded-full bg-brand-orange transition-all duration-500"
                          style={{ width: `${selectedPercent}%` }}
                        />
                      </div>
                    </div>
                  </section>

                  <section className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-[#0d1424]">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-4 py-3 dark:border-white/10 md:px-5">
                      <h3 className="flex items-center gap-1.5 text-sm font-bold text-[#0B1B4B] dark:text-white">
                        <PlayCircle size={15} className="text-brand-orange" />
                        Lessons
                        <span className="font-normal text-gray-400">
                          ({selectedCompleted}/{selectedLessons.length} Completed)
                        </span>
                      </h3>
                      <button
                        type="button"
                        onClick={toggleModule}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold transition ${
                          moduleDone
                            ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
                            : "border-brand-blue/20 text-brand-blue hover:bg-brand-blue hover:text-white dark:border-white/20 dark:text-white"
                        }`}
                      >
                        <Check size={13} />
                        {moduleDone ? "Module completed" : "Mark all as completed"}
                      </button>
                    </div>

                    <div>
                      {selectedLessons.map((lesson, index) => {
                        const showSection =
                          lesson.sectionTitle &&
                          (index === 0 || selectedLessons[index - 1]?.sectionTitle !== lesson.sectionTitle);
                        return (
                          <div key={lesson.id}>
                            {showSection ? (
                              <p className="border-b border-gray-100 bg-brand-gray/50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:border-white/5 dark:bg-white/[0.03] dark:text-gray-400 md:px-5">
                                {lesson.sectionTitle}
                              </p>
                            ) : null}
                            {renderLesson(lesson)}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </>
              )}

              <p className="flex flex-wrap items-center justify-center gap-1.5 text-center text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                <ShieldCheck size={13} className="shrink-0 text-brand-orange" />
                Lessons are private and individually watermarked. Please do not share your login or screen recordings.
              </p>
            </main>
          </div>
        ) : (
          <section className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-[#0d1424]">
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
                Already paid with a different Gmail? Message us on WhatsApp and we will move the access to this
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

        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[10px] text-gray-400">
          <span className="inline-flex items-center gap-1">
            {enrollment ? <BadgeCheck size={12} className="text-emerald-500" /> : <GraduationCap size={12} />}
            {enrollment ? `Member since ${enrollment.memberSince}` : "Google account"}
          </span>
          <span>{enrollment ? enrollment.accessUntil : "Lifetime access after enrollment"}</span>
        </div>
      </div>
    </div>
  );
}
