"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Camera,
  Check,
  ChevronDown,
  Clapperboard,
  Clock,
  FileText,
  GraduationCap,
  Lock,
  MessageCircle,
  Mic,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import VideoModal, { type ActiveVideo } from "@/components/VideoModal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import {
  contentCreationModules,
  contentCreationRoadmap,
  type CoursePreviewVideo,
} from "@/data/contentCreationCourse";

const roadmapIcons = {
  book: BookOpen,
  search: Search,
  script: FileText,
  mic: Mic,
  live: MessageCircle,
  camera: Camera,
  edit: Clapperboard,
  accounts: Users,
  upload: Upload,
  analytics: BarChart3,
};

const previewVideos: CoursePreviewVideo[] = contentCreationRoadmap.flatMap((step) =>
  step.video ? [step.video] : []
);

const included: {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
}[] = [
  { icon: BookOpen, title: "11 Complete Modules", desc: "Fundamentals to analytics in one clear path." },
  { icon: Play, title: "73 Step-by-Step Lessons", desc: "Short, practical lessons taught in Telugu." },
  { icon: Clock, title: "Lifetime Recordings", desc: "Rewatch every lesson whenever you want." },
  { icon: WhatsAppIcon, title: "WhatsApp Doubt Support", desc: "Ask questions and get guidance from the team." },
  { icon: GraduationCap, title: "Completion Certificate", desc: "Certificate after completing the course." },
  { icon: Wallet, title: "Freelancing Guidance", desc: "Learn how to package and sell your new skill." },
];

const faqs = [
  {
    q: "Is this course suitable for complete beginners?",
    a: "Yes. The course starts from the absolute basics and is taught step by step in Telugu, so no prior experience is needed.",
  },
  {
    q: "Do I need a laptop or a professional camera?",
    a: "No. You can complete the entire course using just a smartphone. A laptop is optional for editing, but not required.",
  },
  {
    q: "How long is the course?",
    a: "The guided batch runs for 20 days. After enrollment, you also get lifetime access to all recordings so you can learn at your own pace.",
  },
  {
    q: "Will I get lifetime access to the lessons?",
    a: "Yes. Every enrolled student gets lifetime access to the complete content creation course recordings.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes. Students who complete the modules and practical assignments receive a Creators College completion certificate.",
  },
  {
    q: "How will I get course access after payment?",
    a: "After a successful payment, our team verifies your order and shares your course access and batch details on WhatsApp.",
  },
  {
    q: "Is the payment secure?",
    a: "Yes. Payments are processed securely through Cashfree. You can pay using UPI, debit card, credit card or netbanking.",
  },
];

export default function ContentCreationCourseClient() {
  const [openModule, setOpenModule] = useState<string | null>("01");
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const playVideo = (video: CoursePreviewVideo) => {
    setActiveVideo({ id: video.id, title: video.title });
  };

  return (
    <div className="w-full bg-white pb-20 dark:bg-[#090d16] lg:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FDF6EC] dark:bg-[#090d16]">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-orange/10 blur-[90px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#FFC93C]/20 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-5 sm:px-6 lg:px-8 lg:pb-10 lg:pt-8">
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-brand-orange">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-brand-orange">Courses</Link>
            <span>/</span>
            <span className="text-brand-orange">Content Creation</span>
          </nav>

          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-orange">
                <Sparkles size={12} /> Complete Telugu Course
              </span>
              <h1 className="mt-3 text-[2.35rem] font-bold leading-[1.04] tracking-tight text-[#0B1B4B] dark:text-white sm:text-5xl lg:text-[3.5rem]">
                Content Creation Course <span className="text-brand-orange">in Telugu</span>
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                From fundamentals to analytics — learn research, scripting, voice over, live talking, shooting,
                editing and account growth in one complete step-by-step course.
              </p>

              <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Offer Price</p>
                  <p className="text-3xl font-bold leading-none text-[#0B1B4B] dark:text-white">₹5,000</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Original Price</p>
                  <p className="text-lg font-semibold text-gray-400 line-through">₹30,000</p>
                </div>
                <span className="mb-0.5 rounded-full bg-[#FFC93C] px-2.5 py-1 text-[10px] font-bold text-[#0B1B4B]">
                  Save ₹25,000
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition hover:bg-brand-orange-dark"
                >
                  Enroll Now <ArrowRight size={17} />
                </Link>
                <button
                  type="button"
                  onClick={() => playVideo(previewVideos[0])}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-bold text-[#0B1B4B] transition hover:border-brand-orange/40 hover:text-brand-orange dark:border-white/15 dark:bg-white/5 dark:text-white"
                >
                  <Play size={16} fill="currentColor" /> Watch Free Preview
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                <span className="inline-flex items-center gap-1.5"><Check size={13} className="text-emerald-600" /> 11 Modules</span>
                <span className="inline-flex items-center gap-1.5"><Check size={13} className="text-emerald-600" /> 73 Lessons</span>
                <span className="inline-flex items-center gap-1.5"><Check size={13} className="text-emerald-600" /> Lifetime Access</span>
                <span className="inline-flex items-center gap-1.5"><Check size={13} className="text-emerald-600" /> Certificate</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="grid grid-cols-2 gap-2">
                {previewVideos.slice(0, 4).map((video) => (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => playVideo(video)}
                    className="group relative aspect-video overflow-hidden rounded-xl bg-black text-left shadow-lg"
                  >
                    <Image
                      src={`/videos/${video.id}.jpg`}
                      alt={video.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
                    <span className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-orange shadow-lg transition group-hover:scale-105">
                      <Play size={16} fill="currentColor" className="ml-0.5" />
                    </span>
                    <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-medium text-white">
                      {video.duration}
                    </span>
                  </button>
                ))}
              </div>
              <div className="absolute -bottom-3 left-3 rounded-xl border border-black/5 bg-white px-3 py-2 shadow-lg dark:border-white/10 dark:bg-[#0d1424]">
                <p className="text-[10px] font-bold text-[#0B1B4B] dark:text-white">73 lessons</p>
                <p className="text-[9px] text-gray-500 dark:text-gray-400">Step-by-step in Telugu</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1.5 w-full bg-brand-orange" />
      </section>

      {/* Trust bar */}
      <section className="border-b border-gray-100 bg-white dark:border-white/5 dark:bg-[#090d16]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 py-3 text-[10px] font-semibold text-gray-600 dark:text-gray-300 sm:grid-cols-4 sm:text-[11px]">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} className="text-emerald-600" /> Secure Cashfree Payment</span>
          <span className="inline-flex items-center gap-1.5"><Zap size={13} className="text-brand-orange" /> Instant Access</span>
          <span className="inline-flex items-center gap-1.5"><Clock size={13} className="text-brand-blue dark:text-white" /> Lifetime Recordings</span>
          <span className="inline-flex items-center gap-1.5"><WhatsAppIcon size={13} className="text-[#25D366]" /> WhatsApp Support</span>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-white py-6 dark:bg-[#090d16] md:py-9">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-orange">Course Roadmap</span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-3xl">
                10 Steps From Beginner to Pro
              </h2>
              <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-gray-600 dark:text-gray-300 sm:text-sm">
                Every step is covered inside the course. Tap any preview to watch a free lesson right here.
              </p>
            </div>
            <Link
              href="/checkout"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange px-4 py-2.5 text-[11px] font-bold text-white shadow-md shadow-brand-orange/20 transition hover:bg-brand-orange-dark"
            >
              Enroll Now <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {contentCreationRoadmap.map((step) => {
              const Icon = roadmapIcons[step.icon];
              const video = step.video;
              return (
                <div
                  key={step.num}
                  className="flex flex-col overflow-hidden rounded-xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-[#0d1424]"
                >
                  <div className="flex items-center justify-between px-2.5 pt-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange text-[9px] font-bold text-white">
                      {step.num}
                    </span>
                    <Icon size={15} className="text-brand-blue dark:text-white" />
                  </div>

                  {video ? (
                    <button
                      type="button"
                      onClick={() => playVideo(video)}
                      className="group relative mx-2.5 mt-2 aspect-video overflow-hidden rounded-lg bg-black"
                      aria-label={`Watch ${video.title}`}
                    >
                      <Image
                        src={`/videos/${video.id}.jpg`}
                        alt={video.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 18vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
                      <span className="absolute inset-0 m-auto flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-brand-orange shadow">
                        <Play size={10} fill="currentColor" strokeWidth={0} className="ml-0.5" />
                      </span>
                      <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.5 text-[8px] font-medium text-white">
                        {video.duration}
                      </span>
                    </button>
                  ) : (
                    <Link
                      href="/checkout"
                      className="group mx-2.5 mt-2 flex aspect-video flex-col items-center justify-center gap-1 rounded-lg bg-gradient-to-br from-[#0B1B4B] to-[#123c9e] text-white"
                    >
                      <Lock size={17} />
                      <span className="text-[9px] font-semibold">Unlock in course</span>
                    </Link>
                  )}

                  <div className="p-2.5">
                    <h3 className="text-[12px] font-bold text-[#0B1B4B] dark:text-white">{step.title}</h3>
                    <p className="mt-1 text-[10px] leading-relaxed text-gray-500 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free previews */}
      <section className="bg-[#EDF4F8] py-6 dark:bg-white/[0.03] md:py-9">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-orange">Free Preview</span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-3xl">
                Watch Before You Enroll
              </h2>
            </div>
            <span className="hidden text-[11px] font-semibold text-gray-500 dark:text-gray-400 sm:block">
              Tap to play · No redirect
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {previewVideos.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => playVideo(video)}
                className="group overflow-hidden rounded-xl border border-gray-200/70 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-[#0d1424]"
              >
                <div className="relative aspect-video bg-black">
                  <Image
                    src={`/videos/${video.id}.jpg`}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/15" />
                  <span className="absolute inset-0 m-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-brand-orange shadow">
                    <Play size={11} fill="currentColor" strokeWidth={0} className="ml-0.5" />
                  </span>
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-medium text-white">
                    {video.duration}
                  </span>
                </div>
                <div className="p-2.5">
                  <h3 className="line-clamp-2 text-[11px] font-bold leading-snug text-[#0B1B4B] dark:text-white">
                    {video.title}
                  </h3>
                  <p className="mt-0.5 text-[9px] font-semibold text-brand-orange">Free preview</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="bg-white py-6 dark:bg-[#090d16] md:py-9">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-orange">Full Curriculum</span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-3xl">
              11 Modules · 73 Lessons
            </h2>
            <p className="mx-auto mt-1.5 max-w-xl text-xs leading-relaxed text-gray-600 dark:text-gray-300 sm:text-sm">
              Every module is unlocked after enrollment. Tap a module to see the lessons inside.
            </p>
          </div>

          <div className="mt-4 space-y-2">
            {contentCreationModules.map((module) => {
              const isOpen = openModule === module.number;
              const preview = module.preview;
              return (
                <div
                  key={module.number}
                  className="overflow-hidden rounded-xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-[#0d1424]"
                >
                  <div className="flex items-center gap-2.5 p-3">
                    <button
                      type="button"
                      onClick={() => setOpenModule(isOpen ? null : module.number)}
                      className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10 text-[11px] font-bold text-brand-orange">
                        {module.number}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12px] font-bold text-[#0B1B4B] dark:text-white sm:text-sm">
                          {module.title}
                        </span>
                        <span className="block text-[10px] text-gray-500 dark:text-gray-400">
                          {module.lessons.length} {module.lessons.length === 1 ? "lesson" : "lessons"} · Locked
                        </span>
                      </span>
                    </button>

                    {preview ? (
                      <button
                        type="button"
                        onClick={() => playVideo(preview)}
                        className="hidden items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 sm:inline-flex"
                      >
                        <Play size={9} fill="currentColor" /> Preview
                      </button>
                    ) : null}

                    <Lock size={14} className="shrink-0 text-brand-orange" />
                    <button
                      type="button"
                      onClick={() => setOpenModule(isOpen ? null : module.number)}
                      aria-label={isOpen ? `Collapse ${module.title}` : `Expand ${module.title}`}
                      className="shrink-0 p-1 text-gray-400"
                    >
                      <ChevronDown size={16} className={`transition ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  {isOpen ? (
                    <div className="border-t border-gray-100 dark:border-white/5">
                      {module.lessons.map((lesson) => (
                        <Link
                          key={lesson}
                          href="/checkout"
                          className="flex items-center gap-2.5 border-b border-gray-100 px-3 py-2.5 last:border-0 hover:bg-brand-orange/5 dark:border-white/5"
                        >
                          <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-400 dark:bg-white/5">
                            <Play size={11} />
                            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-brand-orange shadow dark:bg-[#0d1424]">
                              <Lock size={7} />
                            </span>
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-gray-700 dark:text-gray-300">
                            {lesson}
                          </span>
                          <span className="text-[9px] font-bold uppercase tracking-wide text-brand-orange">Unlock</span>
                        </Link>
                      ))}
                      <div className="p-2.5">
                        <Link
                          href="/checkout"
                          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-orange px-3 py-2.5 text-[11px] font-bold text-white shadow-md shadow-brand-orange/20 transition hover:bg-brand-orange-dark"
                        >
                          Unlock Full Module <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="bg-[#FDF6EC] py-6 dark:bg-white/[0.04] md:py-9">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-orange">Everything Included</span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-3xl">
              One Course. Everything You Need.
            </h2>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-3">
            {included.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-black/5 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-[#0d1424]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange">
                    <Icon size={16} />
                  </span>
                  <h3 className="mt-2 text-[11px] font-bold text-[#0B1B4B] dark:text-white sm:text-xs">{item.title}</h3>
                  <p className="mt-1 text-[10px] leading-relaxed text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="bg-white py-6 dark:bg-[#090d16] md:py-9">
        <div className="mx-auto grid max-w-6xl items-center gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-2xl border-4 border-white shadow-xl dark:border-white/10">
            <Image
              src="/cecil-srungarapati-founder-creators-college.jpeg"
              alt="Cecil Srungarapati, founder of Creators College"
              fill
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-cover object-center"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-orange">Your Instructor</span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-3xl">
              Cecil Srungarapati
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300 sm:text-sm">
              Founder &amp; CEO of Creators College, founder of Telugu Tea Talks and CEO of Perfect Prime News.
              Cecil has built a combined following of 800,000+ and trains creators across Andhra Pradesh and Telangana.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { value: "800K+", label: "Followers" },
                { value: "2,000+", label: "Students" },
                { value: "500+", label: "Brands" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-gray-100 bg-gray-50 px-2 py-2 text-center dark:border-white/10 dark:bg-white/5">
                  <p className="text-sm font-bold text-[#0B1B4B] dark:text-white">{stat.value}</p>
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/checkout"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand-orange px-4 py-2.5 text-[11px] font-bold text-white shadow-md shadow-brand-orange/20 transition hover:bg-brand-orange-dark"
            >
              Learn from Cecil <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#EDF4F8] py-6 dark:bg-white/[0.03] md:py-9">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-orange">FAQ</span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-3xl">
              Questions? Answered.
            </h2>
          </div>
          <div className="mt-4 space-y-2">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-[#0d1424]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-3 p-3 text-left"
                  >
                    <span className="text-[12px] font-bold text-[#0B1B4B] dark:text-white">{faq.q}</span>
                    <ChevronDown size={15} className={`shrink-0 text-gray-400 transition ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen ? (
                    <p className="border-t border-gray-100 p-3 text-[11px] leading-relaxed text-gray-600 dark:border-white/5 dark:text-gray-300">
                      {faq.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-blue py-7 text-white md:py-10">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
            <Sparkles size={12} /> Limited-Time Enrolment
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">
            Start Your Content Creation Journey Today
          </h2>
          <p className="mt-2 text-xs text-white/70 sm:text-sm">
            Join 2,000+ students learning content creation in Telugu.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <span className="text-3xl font-bold">₹5,000</span>
            <span className="text-lg text-white/50 line-through">₹30,000</span>
            <span className="rounded-full bg-[#FFC93C] px-2.5 py-1 text-[10px] font-bold text-[#0B1B4B]">Save ₹25,000</span>
          </div>
          <div className="mt-4 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition hover:bg-brand-orange-dark"
            >
              Enroll Now <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/918143937367?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20Telugu%20Content%20Creation%20Course"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
            >
              <WhatsAppIcon size={16} /> Talk to an Advisor
            </a>
          </div>
          <p className="mt-3 text-[10px] text-white/60">Secure payment via Cashfree · UPI, Cards &amp; Netbanking</p>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-[#0b1220]/95 lg:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold leading-none text-[#0B1B4B] dark:text-white">₹5,000</span>
              <span className="text-[11px] text-gray-400 line-through">₹30,000</span>
            </div>
            <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">Offer Price · Only</p>
          </div>
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white shadow-md shadow-brand-orange/25"
          >
            Enroll Now
          </Link>
        </div>
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}
