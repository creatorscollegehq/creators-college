"use client";

import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Lock, PlayCircle, ShieldCheck } from "lucide-react";
import {
  PROGRESS_EVENT,
  isLessonComplete,
  markLessonComplete,
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
    lessonIndex: number;
  };
  videoUrl: string | null;
  orderId: string;
  watermark: string;
  previous: LessonLink | null;
  next: LessonLink | null;
  totalLessons: number;
  moduleLessonCount: number;
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
}: LessonPlayerProps) {
  const [completed, setCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastSyncRef = useRef(0);
  const savedSecondsRef = useRef(0);
  const milestonesRef = useRef<Set<number>>(new Set());

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
    const sync = () => setCompleted(isLessonComplete(orderId, lesson.id));
    sync();
    window.addEventListener(PROGRESS_EVENT, sync);
    return () => window.removeEventListener(PROGRESS_EVENT, sync);
  }, [orderId, lesson.id]);

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
    return () => {
      const seconds = videoRef.current
        ? Math.floor(videoRef.current.currentTime)
        : savedSecondsRef.current;
      if (seconds > 0) syncProgress(seconds, false);
    };
  }, [syncProgress]);

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
      const percent = (video.currentTime / video.duration) * 100;
      for (const milestone of [25, 50, 75]) {
        if (percent >= milestone && !milestonesRef.current.has(milestone)) {
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
    markLessonComplete(orderId, lesson.id);
    setCompleted(true);

    const seconds = videoRef.current
      ? Math.floor(videoRef.current.currentTime)
      : savedSecondsRef.current;
    track(
      "lesson_complete",
      {
        lessonId: lesson.id,
        moduleNumber: lesson.moduleNumber,
        lessonIndex: lesson.lessonIndex,
      },
      { durationSeconds: seconds }
    );
    syncProgress(seconds, true);
  };

  return (
    <div className="flex-grow bg-brand-gray/30 dark:bg-brand-gray/10 py-5 md:py-8">
      <div className="max-w-5xl mx-auto px-4">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-charcoal/70 dark:text-white/70 hover:text-brand-orange transition"
        >
          <ArrowLeft size={14} />
          Back to My Course
        </Link>

        <div className="mt-3 rounded-3xl overflow-hidden border border-gray-200/60 dark:border-white/10 bg-white dark:bg-[#0d1424] shadow-[0_30px_70px_-40px_rgba(15,23,42,0.35)]">
          <div className="relative aspect-video w-full bg-black">
            {videoUrl ? (
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
                  onContextMenu={(event) => event.preventDefault()}
                  src={videoUrl}
                />
                <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/40 px-2 py-1 text-[10px] font-medium tracking-wide text-white/60 backdrop-blur-sm">
                  Creators College · {watermark}
                </div>
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                  <Clock size={24} className="text-brand-orange" />
                </span>
                <p className="text-sm font-semibold text-white">This lesson video is being uploaded</p>
                <p className="max-w-sm text-xs text-white/60 leading-relaxed">
                  Your access is active. The video will appear here as soon as it finishes processing — check back
                  shortly.
                </p>
              </div>
            )}
          </div>

          <div className="p-5 md:p-7 space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-orange">
                  Module {lesson.moduleNumber} · {lesson.moduleTitle}
                </p>
                <h1 className="mt-1 text-xl md:text-2xl font-bold tracking-tight text-brand-charcoal dark:text-white">
                  {lesson.lessonIndex}. {lesson.title}
                </h1>
                <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                  Lesson {lesson.lessonIndex} of {moduleLessonCount} in this module · {totalLessons} lessons in the
                  course
                </p>
              </div>
              {completed ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-300">
                  <CheckCircle2 size={14} />
                  Completed
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleComplete}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/40 px-3.5 py-1.5 text-xs font-semibold text-brand-orange transition hover:bg-brand-orange hover:text-white"
                >
                  <PlayCircle size={14} />
                  Mark as complete
                </button>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {previous ? (
                <Link
                  href={previous.href}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 dark:border-white/10 px-4 py-3 transition hover:border-brand-orange/40"
                >
                  <ArrowLeft size={16} className="shrink-0 text-brand-orange" />
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-wide text-gray-400">Previous lesson</span>
                    <span className="block truncate text-xs font-semibold text-brand-charcoal dark:text-white/85">
                      {previous.title}
                    </span>
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={next.href}
                  className="group flex items-center justify-end gap-3 rounded-xl border border-gray-200 dark:border-white/10 px-4 py-3 text-right transition hover:border-brand-orange/40 sm:col-start-2"
                >
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-wide text-gray-400">Next lesson</span>
                    <span className="block truncate text-xs font-semibold text-brand-charcoal dark:text-white/85">
                      {next.title}
                    </span>
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-brand-orange" />
                </Link>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 dark:border-white/10 pt-4 text-[11px] text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-brand-orange" />
                Private link expires in 6 hours · reopens automatically
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock size={12} className="text-brand-orange" />
                Watermarked for {watermark}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
