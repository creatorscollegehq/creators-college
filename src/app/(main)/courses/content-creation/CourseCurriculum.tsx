"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Clock, Lock, Play, Sparkles } from "lucide-react";
import VideoModal, { type ActiveVideo } from "@/components/VideoModal";
import {
  CONTENT_CREATION_COURSE,
  contentCreationModules,
  type CoursePreviewVideo,
} from "@/data/contentCreationCourse";

const highlights = [
  { icon: Sparkles, label: `${CONTENT_CREATION_COURSE.totalModules} Modules` },
  { icon: Play, label: `${CONTENT_CREATION_COURSE.totalLessons} Lessons` },
  { icon: Clock, label: "Lifetime Recordings" },
  { icon: Check, label: "Telugu Medium" },
];

function LessonRow({ lesson, index }: { lesson: string; index: number }) {
  return (
    <Link
      href="/checkout"
      aria-label={`Unlock lesson: ${lesson}`}
      className="group flex items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-0 transition hover:bg-brand-orange/5 dark:border-white/5 dark:hover:bg-white/[0.03]"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gray-100 text-[10px] font-bold text-gray-500 transition group-hover:bg-brand-orange group-hover:text-white dark:bg-white/10 dark:text-gray-300">
        {String(index).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">
        <span className="line-clamp-2 block text-[12px] font-semibold leading-snug text-gray-700 transition group-hover:text-brand-orange dark:text-gray-200">
          {lesson.replace(/^Lesson\s+\d+\s*:\s*/i, "")}
        </span>
      </span>
      <span className="hidden shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-gray-500 sm:block dark:bg-white/10 dark:text-gray-400">
        Locked
      </span>
      <Lock size={13} className="shrink-0 text-gray-300 transition group-hover:text-brand-orange dark:text-gray-600" />
    </Link>
  );
}

export default function CourseCurriculum() {
  const [openModule, setOpenModule] = useState<string | null>("01");
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);

  const playVideo = (video: CoursePreviewVideo) => {
    setActiveVideo({ id: video.id, title: video.title });
  };

  return (
    <section
      id="curriculum"
      className="scroll-mt-24 bg-gradient-to-b from-[#FDF6EC] via-white to-white py-10 dark:from-white/[0.04] dark:via-[#090d16] dark:to-[#090d16] md:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-orange">
            <Sparkles size={12} /> Full Curriculum
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-3xl md:text-4xl">
            Everything You Get <span className="text-brand-orange">Inside</span>
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300 sm:text-sm">
            {CONTENT_CREATION_COURSE.totalModules} modules and {CONTENT_CREATION_COURSE.totalLessons} lessons, arranged in the
            exact order you should learn them. Tap any module to see every lesson inside.
          </p>
        </div>

        <div className="mx-auto mt-5 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-2 shadow-sm dark:border-white/10 dark:bg-[#0d1424]"
              >
                <Icon size={14} className="shrink-0 text-brand-orange" />
                <span className="text-[10px] font-bold text-[#0B1B4B] sm:text-[11px] dark:text-white">{item.label}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 space-y-3">
          {contentCreationModules.map((module) => {
            const isOpen = openModule === module.number;
            const preview = module.preview;
            const lessonCount = module.sections
              ? module.sections.reduce((total, section) => total + section.lessons.length, 0)
              : module.lessons.length;
            let lessonCursor = 0;

            return (
              <div
                key={module.number}
                className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition dark:bg-[#0d1424] ${
                  isOpen
                    ? "border-brand-orange/40 shadow-[0_18px_40px_-30px_rgba(249,115,22,0.7)]"
                    : "border-gray-200/70 hover:border-brand-orange/30 dark:border-white/10"
                }`}
              >
                <div className="flex items-center gap-3 p-3 sm:p-4">
                  <button
                    type="button"
                    onClick={() => setOpenModule(isOpen ? null : module.number)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[12px] font-bold transition ${
                        isOpen
                          ? "bg-brand-orange text-white shadow-md shadow-brand-orange/25"
                          : "bg-brand-orange/10 text-brand-orange"
                      }`}
                    >
                      {module.number}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-bold leading-snug text-[#0B1B4B] dark:text-white sm:text-[15px]">
                        {module.title}
                      </span>
                      <span className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                        <Lock size={10} />
                        {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
                        {module.sections ? ` · ${module.sections.length} sections` : ""}
                      </span>
                    </span>
                  </button>

                  {preview ? (
                    <button
                      type="button"
                      onClick={() => playVideo(preview)}
                      aria-label={`Play ${preview.title}`}
                      className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-700 transition hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 sm:inline-flex"
                    >
                      <Play size={10} fill="currentColor" /> Preview
                    </button>
                  ) : null}

                  <Link
                    href="/checkout"
                    aria-label={`Unlock ${module.title}`}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-orange px-2.5 py-1.5 text-[10px] font-bold text-white transition hover:bg-brand-orange-dark"
                  >
                    <Lock size={10} /> <span className="hidden sm:inline">Unlock</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setOpenModule(isOpen ? null : module.number)}
                    aria-label={isOpen ? `Collapse ${module.title}` : `Expand ${module.title}`}
                    className="shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 dark:hover:bg-white/10"
                  >
                    <ChevronDown size={18} className={`transition ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>

                {isOpen ? (
                  <div className="border-t border-gray-100 dark:border-white/5">
                    {preview ? (
                      <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/70 p-3 dark:border-white/5 dark:bg-white/[0.02]">
                        <button
                          type="button"
                          onClick={() => playVideo(preview)}
                          aria-label={`Play ${preview.title}`}
                          className="group relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-black sm:w-40"
                        >
                          <Image
                            src={`/videos/${preview.id}.jpg`}
                            alt={preview.title}
                            fill
                            sizes="(max-width: 640px) 112px, 160px"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                          <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/10" />
                          <span className="absolute inset-0 m-auto flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-orange shadow">
                            <Play size={11} fill="currentColor" strokeWidth={0} className="ml-0.5" />
                          </span>
                        </button>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                            Free preview
                          </p>
                          <p className="mt-0.5 line-clamp-2 text-[12px] font-bold text-[#0B1B4B] dark:text-white">
                            {preview.title}
                          </p>
                          <button
                            type="button"
                            onClick={() => playVideo(preview)}
                            className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-brand-orange hover:underline"
                          >
                            Watch on YouTube <ArrowRight size={11} />
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {module.sections ? (
                      module.sections.map((section) => (
                        <div key={section.title}>
                          <div className="flex items-center justify-between gap-2 border-b border-gray-100 bg-white px-4 py-2 dark:border-white/5 dark:bg-[#0b1220]">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-brand-orange">
                              {section.title}
                            </span>
                            <span className="text-[9px] font-semibold text-gray-400">
                              {section.lessons.length} lessons
                            </span>
                          </div>
                          {section.lessons.map((lesson) => (
                            <LessonRow key={`${section.title}-${lesson}`} lesson={lesson} index={++lessonCursor} />
                          ))}
                        </div>
                      ))
                    ) : (
                      module.lessons.map((lesson) => (
                        <LessonRow key={lesson} lesson={lesson} index={++lessonCursor} />
                      ))
                    )}

                    <div className="bg-gray-50/60 p-3 dark:bg-white/[0.02]">
                      <Link
                        href="/checkout"
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-orange px-3 py-3 text-[11px] font-bold text-white shadow-md shadow-brand-orange/20 transition hover:bg-brand-orange-dark sm:text-xs"
                      >
                        Unlock all {lessonCount} lessons in this module <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-center text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
          Previews are free on YouTube. Every full lesson unlocks instantly after enrollment with lifetime access.
        </p>
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
