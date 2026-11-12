"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type SyntheticEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  FileText,
  Lock,
  PlayCircle,
  ShieldCheck,
  StickyNote,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import type { ModuleSummary } from "@/lib/courseContent";
import {
  PROGRESS_EVENT,
  readProgress,
  setLessonComplete,
  setLessonsComplete,
} from "@/lib/progress";
import { track } from "@/lib/track";

interface LessonLink {
  href: string;
  title: string;
}

interface LessonPlayerProps {
  lesson: {
    id: string;
    title: string;
    moduleNumber: string;
    moduleTitle: string;
    sectionTitle?: string;
    lessonIndex: number;
  };
  videoUrl: string | null;
  orderId: string;
  watermark: string;
  previous: LessonLink | null;
  next: LessonLink | null;
  totalLessons: number;
  moduleLessonCount: number;
  modules: ModuleSummary[];
}

type TabKey = "details" | "resources" | "notes";

const SUPPORT_URL =
  "https://wa.me/918143937367?text=Hi%20Creators%20College%2C%20I%20need%20help%20with%20a%20lesson.";

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

const NOTES_EVENT = "cc-notes-change";

function notesKey(orderId: string, lessonId: string) {
  return `cc_notes_${orderId}_${lessonId}`;
}

function subscribeNotes(callback: () => void) {
  window.addEventListener(NOTES_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(NOTES_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function readNote(key: string) {
  try {
    return window.localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

export default function LessonPlayer({
  lesson,
  videoUrl,
  orderId,
  watermark,
  previous,
  next,
  totalLessons,
  moduleLessonCount,
  modules,
}: LessonPlayerProps) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("details");
  const [openModule, setOpenModule] = useState(lesson.moduleNumber);
  const noteKey = notesKey(orderId, lesson.id);
  const notes = useSyncExternalStore(
    subscribeNotes,
    () => readNote(noteKey),
    () => ""
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastSyncRef = useRef(0);
  const savedSecondsRef = useRef(0);
  const milestonesRef = useRef<Set<number>>(new Set());

  const isCompleted = Boolean(completed[lesson.id]);
  const currentModule = modules.find((item) => item.number === lesson.moduleNumber);
  const completedCount = useMemo(
    () => modules.flatMap((item) => item.lessons).filter((item) => completed[item.id]).length,
    [modules, completed]
  );
  const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const moduleCompleted = currentModule
    ? currentModule.lessons.filter((item) => completed[item.id]).length
    : 0;
  const moduleDone = Boolean(currentModule && moduleCompleted === currentModule.lessons.length);

  const syncProgress = useCallback(
    (watchedSeconds: number, isComplete: boolean) => {
      savedSecondsRef.current = Math.max(savedSecondsRef.current, watchedSeconds);
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          moduleNumber: lesson.moduleNumber,
          lessonIndex: lesson.lessonIndex,
          watchedSeconds,
          completed: isComplete,
        }),
        keepalive: true,
      }).catch(() => {
        // progress is also cached in localStorage, so failures are non-fatal
      });
    },
    [lesson.id, lesson.moduleNumber, lesson.lessonIndex]
  );

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

  useEffect(() => {
    track("lesson_view", {
      lessonId: lesson.id,
      moduleNumber: lesson.moduleNumber,
      lessonIndex: lesson.lessonIndex,
      moduleTitle: lesson.moduleTitle,
    });
    syncProgress(0, false);
  }, [lesson.id, lesson.moduleNumber, lesson.lessonIndex, lesson.moduleTitle, syncProgress]);

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      const seconds = video ? Math.floor(video.currentTime) : savedSecondsRef.current;
      if (seconds > 0) syncProgress(seconds, false);
    };
  }, [syncProgress]);

  const updateNotes = (value: string) => {
    try {
      window.localStorage.setItem(noteKey, value);
      window.dispatchEvent(new Event(NOTES_EVENT));
    } catch {
      // storage may be unavailable in private mode
    }
  };

  const toggleThisLesson = () => {
    setLessonComplete(orderId, lesson.id, !isCompleted);
  };

  const toggleModuleComplete = () => {
    if (!currentModule) return;
    setLessonsComplete(
      orderId,
      currentModule.lessons.map((item) => item.id),
      !moduleDone
    );
  };

  const handlePlay = () => {
    track("lesson_play", {
      lessonId: lesson.id,
      moduleNumber: lesson.moduleNumber,
      lessonIndex: lesson.lessonIndex,
    });
  };

  const handleTimeUpdate = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    const seconds = Math.floor(video.currentTime);

    if (seconds - lastSyncRef.current >= 20) {
      lastSyncRef.current = seconds;
      syncProgress(seconds, false);
    }

    if (video.duration && Number.isFinite(video.duration)) {
      const progressPercent = (video.currentTime / video.duration) * 100;
      for (const milestone of [25, 50, 75]) {
        if (progressPercent >= milestone && !milestonesRef.current.has(milestone)) {
          milestonesRef.current.add(milestone);
          track(
            "video_progress",
            { lessonId: lesson.id, percent: milestone },
            { durationSeconds: seconds }
          );
        }
      }
    }
  };

  const handleComplete = () => {
    setLessonComplete(orderId, lesson.id, true);
    track(
      "lesson_complete",
      {
        lessonId: lesson.id,
        moduleNumber: lesson.moduleNumber,
        lessonIndex: lesson.lessonIndex,
      },
      {
        durationSeconds: videoRef.current
          ? Math.floor(videoRef.current.currentTime)
          : savedSecondsRef.current,
      }
    );
    syncProgress(
      videoRef.current ? Math.floor(videoRef.current.currentTime) : savedSecondsRef.current,
      true
    );
  };

  const tabs: { key: TabKey; label: string; icon: typeof FileText }[] = [
    { key: "details", label: "Lesson Details", icon: FileText },
    { key: "resources", label: "Resources", icon: BookOpen },
    { key: "notes", label: "My Notes", icon: StickyNote },
  ];

  return (
    <div className="flex-grow bg-[#F3F6F8] py-4 dark:bg-[#090d16] md:py-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-brand-charcoal shadow-sm transition hover:border-brand-orange hover:text-brand-orange dark:border-white/10 dark:bg-[#0d1424] dark:text-white"
          >
            <ArrowLeft size={14} />
            Back to Modules
          </Link>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
            <ShieldCheck size={13} className="text-brand-orange" />
            Private lesson · {watermark}
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <main className="min-w-0 space-y-4">
            <div className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-[#0d1424]">
              <div className="relative aspect-video w-full bg-black">
                {videoUrl && failedUrl !== videoUrl ? (
                  <>
                    <video
                      key={videoUrl}
                      ref={videoRef}
                      className="h-full w-full"
                      controls
                      playsInline
                      preload="metadata"
                      controlsList="nodownload"
                      disablePictureInPicture
                      onPlay={handlePlay}
                      onTimeUpdate={handleTimeUpdate}
                      onEnded={handleComplete}
                      onError={() => setFailedUrl(videoUrl)}
                      onContextMenu={(event) => event.preventDefault()}
                      src={videoUrl}
                    />
                    <div className="pointer-events-none absolute right-3 top-3 rounded-md bg-black/45 px-2 py-1 text-[10px] font-medium tracking-wide text-white/70 backdrop-blur-sm">
                      Creators College · {watermark}
                    </div>
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                      <Clock size={24} className="text-brand-orange" />
                    </span>
                    <p className="text-sm font-semibold text-white">This lesson video is being uploaded</p>
                    <p className="max-w-sm text-xs leading-relaxed text-white/60">
                      Your access is active. The video will appear here as soon as it finishes processing — check
                      back shortly.
                    </p>
                    <a
                      href={SUPPORT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white"
                    >
                      <WhatsAppIcon size={14} />
                      Ask on WhatsApp
                    </a>
                  </div>
                )}
              </div>

              <div className="space-y-4 p-4 md:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded-md bg-brand-orange px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white">
                        Module {lesson.moduleNumber.padStart(2, "0")}
                      </span>
                      {lesson.sectionTitle ? (
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          {lesson.sectionTitle}
                        </span>
                      ) : null}
                    </div>
                    <h1 className="mt-2 text-xl font-black leading-tight tracking-tight text-[#0B1B4B] dark:text-white md:text-2xl">
                      {lesson.lessonIndex}. {lesson.title}
                    </h1>
                    <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                      Lesson {lesson.lessonIndex} of {moduleLessonCount} in this module · {totalLessons} lessons in
                      the course
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleThisLesson}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold transition ${
                      isCompleted
                        ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
                        : "border-brand-orange/40 text-brand-orange hover:bg-brand-orange hover:text-white"
                    }`}
                  >
                    <CheckCircle2 size={14} />
                    {isCompleted ? "Completed" : "Mark as Complete"}
                  </button>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {previous ? (
                    <Link
                      href={previous.href}
                      className="group flex items-center gap-3 rounded-xl border border-gray-200 px-3.5 py-2.5 transition hover:border-brand-orange/40 dark:border-white/10"
                    >
                      <ArrowLeft size={16} className="shrink-0 text-brand-orange" />
                      <span className="min-w-0">
                        <span className="block text-[9px] font-bold uppercase tracking-wide text-gray-400">
                          Previous Lesson
                        </span>
                        <span className="block truncate text-xs font-semibold text-brand-charcoal dark:text-white/85">
                          {previous.title}
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {next ? (
                    <Link
                      href={next.href}
                      className="group flex items-center justify-end gap-3 rounded-xl border border-gray-200 px-3.5 py-2.5 text-right transition hover:border-brand-orange/40 dark:border-white/10 sm:col-start-2"
                    >
                      <span className="min-w-0">
                        <span className="block text-[9px] font-bold uppercase tracking-wide text-gray-400">
                          Next Lesson
                        </span>
                        <span className="block truncate text-xs font-semibold text-brand-charcoal dark:text-white/85">
                          {next.title}
                        </span>
                      </span>
                      <ArrowRight size={16} className="shrink-0 text-brand-orange" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-[#0d1424]">
              <div className="flex overflow-x-auto border-b border-gray-100 dark:border-white/10">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition md:px-5 ${
                        active
                          ? "border-brand-blue text-brand-blue dark:border-brand-orange dark:text-brand-orange"
                          : "border-transparent text-gray-500 hover:text-brand-orange dark:text-gray-400"
                      }`}
                    >
                      <Icon size={14} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="p-4 md:p-5">
                {activeTab === "details" && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                        <PlayCircle size={18} />
                      </span>
                      <div>
                        <h2 className="text-sm font-bold text-[#0B1B4B] dark:text-white">
                          About this lesson
                        </h2>
                        <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                          Watch the full lesson, then mark it complete to keep your course progress up to date. You
                          can revisit any lesson anytime — access is lifetime.
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-2.5 sm:grid-cols-3">
                      {[
                        { label: "Module", value: `${lesson.moduleNumber.padStart(2, "0")} · ${lesson.moduleTitle}` },
                        { label: "Lesson", value: `${lesson.lessonIndex} of ${moduleLessonCount}` },
                        { label: "Access", value: "Lifetime" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl border border-gray-100 bg-gray-50/70 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.03]"
                        >
                          <p className="text-[9px] font-bold uppercase tracking-wide text-gray-400">{item.label}</p>
                          <p className="mt-0.5 truncate text-xs font-semibold text-brand-charcoal dark:text-white">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={toggleModuleComplete}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[11px] font-bold transition ${
                        moduleDone
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
                          : "border-brand-blue/20 text-brand-blue hover:bg-brand-blue hover:text-white dark:border-white/20 dark:text-white"
                      }`}
                    >
                      <Check size={13} />
                      {moduleDone ? "Module completed" : "Mark whole module as completed"}
                    </button>
                  </div>
                )}

                {activeTab === "resources" && (
                  <div className="space-y-3">
                    <h2 className="text-sm font-bold text-[#0B1B4B] dark:text-white">Resources &amp; support</h2>
                    <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                      Template links, assignments and bonus resources are shared in your WhatsApp group. Need
                      anything for this lesson? Message our team directly.
                    </p>
                    <a
                      href={SUPPORT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#1fb959]"
                    >
                      <WhatsAppIcon size={16} />
                      Chat with us on WhatsApp
                    </a>
                  </div>
                )}

                {activeTab === "notes" && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-sm font-bold text-[#0B1B4B] dark:text-white">My notes</h2>
                      <span className="text-[10px] font-medium text-gray-400">
                        Saved on this device
                      </span>
                    </div>
                    <textarea
                      value={notes}
                      onChange={(event) => updateNotes(event.target.value)}
                      rows={8}
                      maxLength={5000}
                      placeholder="Type your notes for this lesson here..."
                      className="w-full resize-y rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-brand-charcoal outline-none transition focus:border-brand-orange dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                    <p className="text-[10px] leading-relaxed text-gray-500 dark:text-gray-400">
                      Notes are stored privately in this browser only.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center gap-1">
                <Lock size={11} className="text-brand-orange" />
                Private link · expires in 6 hours
              </span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck size={11} className="text-brand-orange" />
                Watermarked for {watermark}
              </span>
            </p>
          </main>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#123c9e] to-[#071c4d] text-white shadow-lg">
              <div className="flex items-center gap-3 p-4">
                <div
                  className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(#22c55e ${percent * 3.6}deg, rgba(255,255,255,0.18) ${percent * 3.6}deg)`,
                  }}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0b245c] text-sm font-black">
                    {percent}%
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">My Course Progress</p>
                  <p className="text-[10px] text-white/65">
                    {completedCount} of {totalLessons} Lessons
                  </p>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-white/[0.04] text-center">
                <div className="px-2 py-2.5">
                  <BookOpen size={14} className="mx-auto text-brand-orange" />
                  <p className="mt-1 text-xs font-black">{modules.length}</p>
                  <p className="text-[9px] uppercase tracking-wide text-white/55">Modules</p>
                </div>
                <div className="px-2 py-2.5">
                  <PlayCircle size={14} className="mx-auto text-brand-orange" />
                  <p className="mt-1 text-xs font-black">{totalLessons}</p>
                  <p className="text-[9px] uppercase tracking-wide text-white/55">Lessons</p>
                </div>
                <div className="px-2 py-2.5">
                  <Clock size={14} className="mx-auto text-brand-orange" />
                  <p className="mt-1 text-xs font-black">Lifetime</p>
                  <p className="text-[9px] uppercase tracking-wide text-white/55">Access</p>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-[#0d1424]">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-white/10">
                <h2 className="text-sm font-bold text-[#0B1B4B] dark:text-white">
                  Course Modules <span className="font-normal text-gray-400">({modules.length})</span>
                </h2>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              <div className="max-h-[540px] overflow-y-auto">
                {modules.map((module) => {
                  const isCurrent = module.number === lesson.moduleNumber;
                  const isOpen = openModule === module.number;
                  const done = module.lessons.every((item) => completed[item.id]);
                  return (
                    <div key={module.number} className="border-b border-gray-100 last:border-0 dark:border-white/5">
                      <button
                        type="button"
                        onClick={() => setOpenModule(isOpen ? "" : module.number)}
                        className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition ${
                          isCurrent
                            ? "bg-[#123c9e] text-white"
                            : "hover:bg-brand-orange/[0.04] dark:hover:bg-white/[0.03]"
                        }`}
                      >
                        <span
                          className={`flex h-6 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-black ${
                            isCurrent
                              ? "bg-white/15 text-white"
                              : "bg-brand-gray text-[#0B1B4B] dark:bg-white/10 dark:text-white"
                          }`}
                        >
                          {module.number.padStart(2, "0")}
                        </span>
                        <span className="shrink-0 text-sm" aria-hidden>
                          {MODULE_ICONS[module.number] ?? "📘"}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block truncate text-[11px] font-bold ${
                              isCurrent ? "text-white" : "text-brand-charcoal dark:text-white/85"
                            }`}
                          >
                            {module.title}
                          </span>
                          <span
                            className={`block text-[9px] ${
                              isCurrent ? "text-white/60" : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {module.lessons.length} Lessons
                          </span>
                        </span>
                        {done ? (
                          <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
                        ) : (
                          <ChevronDown
                            size={14}
                            className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""} ${
                              isCurrent ? "text-white/70" : "text-gray-300 dark:text-white/20"
                            }`}
                          />
                        )}
                      </button>

                      {isOpen && !done ? (
                        <div className="max-h-56 overflow-y-auto border-t border-gray-100 bg-gray-50/60 dark:border-white/5 dark:bg-white/[0.02]">
                          {module.lessons.map((item) => {
                            const active = item.id === lesson.id;
                            const itemDone = Boolean(completed[item.id]);
                            return (
                              <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center gap-2 px-3 py-2 text-[10px] transition ${
                                  active
                                    ? "bg-brand-orange/10 font-bold text-brand-orange"
                                    : "text-gray-600 hover:bg-white dark:text-gray-300 dark:hover:bg-white/5"
                                }`}
                              >
                                {itemDone ? (
                                  <CheckCircle2 size={12} className="shrink-0 text-emerald-500" />
                                ) : (
                                  <Circle size={12} className="shrink-0 text-gray-300 dark:text-white/20" />
                                )}
                                <span className="min-w-0 flex-1 truncate">
                                  {item.lessonIndex}. {item.title}
                                </span>
                                {active ? <PlayCircle size={12} className="shrink-0" /> : null}
                              </Link>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>

            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200"
            >
              <WhatsAppIcon size={18} className="shrink-0 text-[#25D366]" />
              <span className="min-w-0">
                Need help with this lesson?
                <span className="block text-[10px] font-medium text-emerald-700/80 dark:text-emerald-200/70">
                  Message our team on WhatsApp
                </span>
              </span>
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
