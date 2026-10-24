"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Caveat } from "next/font/google";
import {
  ArrowRight,
  ChartNoAxesColumn,
  Check,
  ChevronDown,
  Clapperboard,
  CloudUpload,
  FileText,
  GraduationCap,
  Maximize,
  MessageCircle,
  Mic,
  Play,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Video,
  Volume2,
  X,
  Zap,
} from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/SocialIcons";
import { testimonials } from "@/data/testimonials";
import CroExitPopup from "@/components/CroExitPopup";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });

const YOUTUBE_URL = "https://www.youtube.com/@creatorscollegeofficial";

const roadmapSteps = [
  {
    num: "01",
    icon: FileText,
    title: "Scripting",
    desc: "Learn how to write engaging scripts for reels and long videos.",
    duration: "6:12",
    gradient: "from-[#DBEAFE] to-[#BFDBFE]",
  },
  {
    num: "02",
    icon: Mic,
    title: "Voice-over",
    desc: "Learn clear voice-over and on-camera speaking skills.",
    duration: "7:36",
    gradient: "from-[#DCFCE7] to-[#BBF7D0]",
  },
  {
    num: "03",
    icon: Clapperboard,
    title: "Editing",
    desc: "Learn to edit music videos, talking videos, voice-over reels and more.",
    duration: "10:25",
    gradient: "from-[#E0E7FF] to-[#C7D2FE]",
  },
  {
    num: "04",
    icon: Users,
    title: "Account Creations",
    desc: "Learn to create Instagram, Facebook and YouTube accounts step by step.",
    duration: "6:48",
    gradient: "from-[#FCE7F3] to-[#FBCFE8]",
  },
  {
    num: "05",
    icon: CloudUpload,
    title: "Uploads",
    desc: "Learn how to upload videos with the right settings.",
    duration: "5:18",
    gradient: "from-[#FFEDD5] to-[#FED7AA]",
  },
  {
    num: "06",
    icon: ChartNoAxesColumn,
    title: "Page Handling",
    desc: "Learn how to manage your pages and grow them.",
    duration: "8:40",
    gradient: "from-[#CCFBF1] to-[#99F6E4]",
  },
];

const outcomes = [
  {
    icon: <FileText size={30} className="text-[#2563EB]" />,
    title: "Write Scripts",
    desc: "Create engaging scripts for reels and long videos.",
    bg: "bg-[#E8F2FB]",
  },
  {
    icon: <Mic size={30} className="text-[#16A34A]" />,
    title: "Speak Confidently",
    desc: "Record clear voice-overs and on-camera videos without fear.",
    bg: "bg-[#EAF7EE]",
  },
  {
    icon: <Video size={30} className="text-[#DB2777]" />,
    title: "Edit Different Videos",
    desc: "Edit music videos, live talking videos, voice-over reels, full length videos.",
    bg: "bg-[#FCE9F1]",
  },
  {
    icon: (
      <div className="flex items-center gap-1.5">
        <InstagramIcon size={24} />
        <FacebookIcon size={24} />
        <YoutubeIcon size={24} />
      </div>
    ),
    title: "Create Social Accounts",
    desc: "Create and manage Instagram, Facebook and YouTube accounts and upload videos.",
    bg: "bg-[#FFF4E5]",
  },
];

const audience = ["Students", "HouseWives", "Job Holders", "Business Owners", "Retired Employees"];

const trustItems = [
  { icon: ShieldCheck, label: "Secure Payment" },
  { icon: Zap, label: "Instant Access" },
  { icon: GraduationCap, label: "Learn at Your Own Pace" },
];

const valueItems = [
  {
    title: "Complete Content Creation Course",
    desc: "Scripting to page handling in one clear path.",
    value: "₹30,000",
  },
  {
    title: "6 Step-by-Step Modules",
    desc: "Learn in the right order without guesswork.",
    value: "Included",
  },
  {
    title: "Lifetime Access to Recordings",
    desc: "Rewatch any lesson whenever you want.",
    value: "Included",
  },
  {
    title: "WhatsApp Doubt Support",
    desc: "Ask questions and get guidance from the team.",
    value: "Included",
  },
  {
    title: "Practical Assignments",
    desc: "Learn by creating, not just watching.",
    value: "Included",
  },
  {
    title: "Course Completion Certificate",
    desc: "Showcase your achievement after finishing.",
    value: "Included",
  },
];

const comparisonRows = [
  { label: "Learning path", free: "Scattered videos", course: "6-step roadmap" },
  { label: "Language", free: "Mixed / English", course: "100% Telugu" },
  { label: "Doubt support", free: "Comments only", course: "WhatsApp support" },
  { label: "Practice", free: "No feedback", course: "Guided assignments" },
  { label: "Access", free: "Videos may disappear", course: "Lifetime recordings" },
  { label: "Certificate", free: "Not available", course: "Completion certificate" },
];

const faqCategories = [
  {
    key: "eligibility",
    label: "Eligibility",
    items: [
      {
        q: "Who can join the course?",
        a: "Anyone aged 15 years or above can join. No educational qualification or prior experience is required. Our courses are designed for complete beginners.",
      },
      {
        q: "Is this course suitable for beginners?",
        a: "Yes. The course is specially designed for complete beginners and taught step by step in Telugu.",
      },
      {
        q: "What language is the course taught in?",
        a: "The course is taught primarily in Telugu, with technical terms explained in English wherever required.",
      },
    ],
  },
  {
    key: "learning",
    label: "Courses & Learning",
    items: [
      {
        q: "Which courses are currently available?",
        a: "Complete Telugu Content Creation Course and Complete Telugu CapCut Video Editing Course (Mobile & PC).",
      },
      {
        q: "What is the course duration?",
        a: "Both courses run for 20 days, with 1-hour classes every day.",
      },
      {
        q: "What will I learn?",
        a: "You'll learn everything from: Content Creation Fundamentals, Scripting, Voice Over, Mobile Video Shooting, Video Editing (Mobile & PC), Instagram/Facebook/YouTube account optimization, Social Media Page Management, and Account Growth Strategies.",
      },
      {
        q: "Do you provide assignments and practical exercises?",
        a: "Yes. Every student receives practical assignments and real-world exercises.",
      },
      {
        q: "Will I work on real projects?",
        a: "Yes. Students gain hands-on experience by working on real-world projects.",
      },
    ],
  },
  {
    key: "modes",
    label: "Class Modes",
    items: [
      {
        q: "How are the classes conducted?",
        a: "We offer Live Online Classes, Offline Classroom Training, and Lifetime Course Recordings.",
      },
      {
        q: "Can I join online from anywhere?",
        a: "Yes. You can attend our live online classes from anywhere.",
      },
      {
        q: "Do you provide lifetime recordings?",
        a: "Yes. Every enrolled student receives lifetime access to all course recordings.",
      },
      {
        q: "What happens if I miss a live class?",
        a: "No problem. You can watch the recorded session anytime at your own convenience.",
      },
    ],
  },
  {
    key: "requirements",
    label: "Requirements",
    items: [
      {
        q: "What do I need for the Content Creation Course?",
        a: "An Android Phone / iPhone, a Laptop (Recommended), and a Camera (Optional). A medium-range phone or laptop is sufficient.",
      },
      {
        q: "What do I need for the CapCut Video Editing Course?",
        a: "An Android Phone / iPhone, or a Windows Laptop / MacBook (Minimum 4GB RAM & 10GB Free Storage recommended).",
      },
      {
        q: "Do I need to purchase any software?",
        a: "No. Purchasing software is optional. However, training is provided using the CapCut Paid Version so students can learn all professional features.",
      },
    ],
  },
  {
    key: "support",
    label: "Certificate & Support",
    items: [
      {
        q: "Will I receive a Course Completion Certificate?",
        a: "Yes. Students who successfully complete the course and practical project will receive a Course Completion Certificate from Creators College.",
      },
      {
        q: "Will I receive support after the course?",
        a: "Yes. We provide lifetime support through our exclusive student WhatsApp community.",
      },
      {
        q: "Is attendance mandatory?",
        a: "Live classes are recommended for the best learning experience. If you miss a class, recordings will always be available.",
      },
    ],
  },
  {
    key: "career",
    label: "Career & Freelancing",
    items: [
      {
        q: "Do you provide placement assistance?",
        a: "Our programs are skill-based, not placement-based. We focus on teaching students how to find clients, build their personal brand, and create earning opportunities.",
      },
      {
        q: "Will I learn freelancing?",
        a: "Yes. You'll learn practical methods to start freelancing and earn through content creation and video editing.",
      },
      {
        q: "Will I learn how to earn using these skills?",
        a: "Yes. Along with technical skills, we teach you how to build your profile, attract clients, and generate income.",
      },
    ],
  },
  {
    key: "fees",
    label: "Fees & Enrollment",
    items: [
      {
        q: "Is EMI available?",
        a: "Currently, EMI and installment options are not available because the courses are offered at a special launch price of ₹5,000 (Original Course Value: ₹30,000).",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept UPI, cards and netbanking via Cashfree, along with direct UPI payments.",
      },
      {
        q: "Is the course fee refundable?",
        a: "No. Once enrolled, the course fee is non-refundable.",
      },
      {
        q: "Can I join after the batch has started?",
        a: "Yes. You'll receive recordings of previous sessions and can easily catch up.",
      },
      {
        q: "Do you provide a free demo class?",
        a: "Yes. We offer a free demo class so you can experience our teaching style before enrolling.",
      },
    ],
  },
];

function TrustRow({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}>
      {trustItems.map((item) => {
        const Icon = item.icon;
        return (
          <span
            key={item.label}
            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold sm:text-xs ${
              light ? "text-white/85" : "text-[#0B1B4B] dark:text-gray-200"
            }`}
          >
            <Icon size={15} className={light ? "text-white" : "text-[#0B1B4B] dark:text-brand-orange"} />
            {item.label}
          </span>
        );
      })}
    </div>
  );
}

function VideoThumb({
  src,
  alt,
  duration,
  controls = false,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  duration: string;
  controls?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <a
      href={YOUTUBE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch: ${alt}`}
      className={`group relative block overflow-hidden rounded-2xl bg-[#0B1B4B] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/15" />
      <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-orange shadow-xl transition group-hover:scale-105">
        <Play size={24} fill="currentColor" strokeWidth={0} className="ml-1" />
      </span>
      {controls ? (
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2 pt-10 text-[11px] font-medium text-white">
          <Play size={10} fill="currentColor" strokeWidth={0} />
          <span>0:00 / 5:24</span>
          <div className="ml-auto flex items-center gap-2.5">
            <Volume2 size={13} />
            <Settings size={13} />
            <Maximize size={13} />
          </div>
        </div>
      ) : (
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
          {duration}
        </span>
      )}
    </a>
  );
}

export default function HomePage() {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [activeFaqTab, setActiveFaqTab] = useState("eligibility");

  const activeFaqItems = faqCategories.find((category) => category.key === activeFaqTab)?.items ?? faqCategories[0].items;

  useEffect(() => {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    fbq?.("track", "ViewContent", {
      content_name: "Complete Telugu Content Creation Course",
      content_category: "Course",
      value: 5000,
      currency: "INR",
    });

    const onScroll = () => setShowStickyBar(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const courseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://www.creatorscollege.in#organization",
        "name": "Creators College",
        "url": "https://www.creatorscollege.in",
        "logo": "https://www.creatorscollege.in/logo/2%20Horizontal%20Logo.png",
        "description":
          "Practical Content Creation, Video Editing and Social Media training in Telugu for students across Andhra Pradesh and Telangana.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "addressCountry": "IN",
        },
        "founder": {
          "@id": "https://www.creatorscollege.in/cecil-srungarapati#person",
        },
        "sameAs": [
          "https://www.youtube.com/@creatorscollegeofficial",
          "https://www.instagram.com/creatorscollege_/",
          "https://www.facebook.com/profile.php?id=61591290489327",
          "https://t.me/creatorscollege",
        ],
      },
      {
        "@type": "Course",
        "name": "Complete Telugu Content Creation Course",
        "description":
          "Learn scripting, voice-over, editing, account creation, uploads and page handling in Telugu.",
        "provider": {
          "@id": "https://www.creatorscollege.in#organization",
        },
        "offers": {
          "@type": "Offer",
          "price": "5000.00",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqCategories.flatMap((category) =>
          category.items.map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a,
            },
          }))
        ),
      },
    ],
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#090d16] pb-20 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FDF6EC] dark:bg-[#090d16]">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-orange/10 blur-[90px] pointer-events-none" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#FFC93C]/20 blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-10 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            <div className="lg:col-span-6 text-left">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-lg bg-[#FFC93C] px-3 py-1 text-2xl font-bold text-[#0B1B4B] shadow-sm">
                  No.1
                </span>
                <svg width="30" height="26" viewBox="0 0 30 26" fill="none" aria-hidden="true" className="text-brand-orange">
                  <path d="M3 22L9 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M12 24L18 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M21 25L27 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>

              <h1 className="mt-4 text-[2.7rem] leading-[1.02] sm:text-6xl lg:text-[4.1rem] font-bold tracking-tight text-[#0B1B4B] dark:text-white">
                Content Creation
                <br />
                Course <span className="text-brand-orange">in Telugu</span>
              </h1>

              <p className="mt-4 text-xl sm:text-2xl font-bold text-[#0B1B4B] dark:text-white">
                From Basics to Advanced
              </p>
              <p className="mt-1.5 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Learn everything at one place without getting confused.
              </p>

              <div className="mt-6 flex flex-wrap items-stretch gap-3">
                <div className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">Original Price</p>
                  <p className="text-2xl font-bold text-red-500 line-through decoration-red-500 decoration-[3px] sm:text-3xl">
                    ₹30,000/-
                  </p>
                </div>
                <div className="rounded-xl bg-[#FFC93C] px-4 py-2.5 shadow-sm">
                  <p className="text-[10px] font-semibold text-[#0B1B4B]/70">Offer Price</p>
                  <p className="text-2xl font-bold text-[#0B1B4B] sm:text-3xl">
                    ₹5,000/- <span className="text-xs font-semibold sm:text-sm">Only</span>
                  </p>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-5 inline-flex w-full max-w-[430px] items-center justify-center gap-2 rounded-xl bg-brand-orange px-8 py-3.5 text-lg font-bold text-white shadow-lg shadow-brand-orange/25 transition hover:bg-brand-orange-dark hover:shadow-brand-orange/35"
              >
                Buy Now
                <ArrowRight size={20} />
              </Link>

              <TrustRow className="mt-5" />
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-[0_28px_65px_-32px_rgba(11,27,75,0.5)]">
                  <Image
                    src="/cecil.jpg"
                    alt="Cecil Srungarapati, founder of Creators College"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B4B]/30 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-4 left-4 rounded-xl bg-[#0B1B4B]/75 px-3 py-2 shadow-lg backdrop-blur-sm">
                  <p className="text-xs font-bold text-white">Cecil Srungarapati</p>
                  <p className="text-[10px] font-medium text-white/70">Founder, Creators College</p>
                </div>

                <div className="absolute right-1 top-1 rotate-[-5deg] rounded-lg bg-[#FDF6EC]/85 px-2 py-1 text-right leading-[1.05] backdrop-blur-[1px]">
                  <p className={`${caveat.className} text-2xl text-[#0B1B4B] sm:text-3xl`}>
                    Create
                    <br />
                    Learn
                    <br />
                    Grow
                    <br />
                    <span className="text-brand-orange">in Telugu</span>
                  </p>
                  <svg width="70" height="14" viewBox="0 0 70 14" fill="none" aria-hidden="true" className="ml-auto mt-1 text-brand-orange">
                    <path d="M2 9C16 4 32 3 48 5C56 6 63 8 68 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1.5 w-full bg-brand-orange" />
      </section>

      {/* Course Introduction */}
      <section className="bg-[#EDF4F8] dark:bg-white/[0.03] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <VideoThumb
              src="/hero_collage_wide.jpg"
              alt="Creators College course introduction video"
              duration="5:24"
              controls
              className="aspect-video w-full shadow-[0_22px_50px_-28px_rgba(11,27,75,0.45)]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B1B4B] dark:text-white">
                Course Introduction
              </p>
              <div className="mt-2 h-1 w-16 bg-brand-orange" />
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-[#0B1B4B] dark:text-white">
                Start Your Content Creation Journey <span className="text-brand-orange">Today</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                Watch this short video to know what you&apos;ll learn, how the course works and why this is for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Road Map */}
      <section className="bg-[#EDF4F8] dark:bg-white/[0.03] pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-4xl">
              Content Creation <span className="text-brand-orange">Road Map</span>
            </h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
              Learn step by step from basics to advanced with a clear roadmap.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-5">
            {roadmapSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative">
                  {index < roadmapSteps.length - 1 && (
                    <ArrowRight
                      size={22}
                      strokeWidth={2.5}
                      className="absolute -right-[19px] top-[86px] z-10 hidden text-brand-orange lg:block"
                    />
                  )}
                  <div className="h-full rounded-2xl border border-white bg-white p-3.5 shadow-sm dark:border-white/10 dark:bg-[#0d1424]">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-[11px] font-bold text-white">
                      {step.num}
                    </span>
                    <div className="mt-2 flex justify-center text-[#0B1B4B] dark:text-white">
                      <Icon size={25} strokeWidth={1.8} />
                    </div>
                    <h3 className="mt-1.5 text-center text-[13px] font-bold text-[#0B1B4B] dark:text-white">
                      {step.title}
                    </h3>

                    <a
                      href={YOUTUBE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch ${step.title} lesson`}
                      className={`group relative mt-3 block aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br ${step.gradient}`}
                    >
                      <Icon size={46} className="absolute inset-0 m-auto text-white/60" strokeWidth={1.4} />
                      <span className="absolute inset-0 m-auto flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-brand-orange shadow">
                        <Play size={10} fill="currentColor" strokeWidth={0} className="ml-0.5" />
                      </span>
                      <span className="absolute bottom-1.5 right-1.5 rounded bg-black/65 px-1.5 py-0.5 text-[9px] font-medium text-white">
                        {step.duration}
                      </span>
                    </a>

                    <p className="mt-2.5 text-[10.5px] leading-relaxed text-gray-500 dark:text-gray-400">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-[#EDF4F8] dark:bg-white/[0.03] pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-3xl lg:text-4xl">
            By the end of this course, you&apos;ll be able to
          </h2>
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((item) => (
              <div key={item.title} className={`rounded-2xl ${item.bg} p-5 text-center`}>
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="mt-3 text-sm font-bold text-[#0B1B4B]">{item.title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suitable for Everyone */}
      <section className="bg-white dark:bg-[#090d16] py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <Users size={34} className="shrink-0 text-brand-orange" strokeWidth={2} />
                <h2 className="text-3xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-4xl">
                  Suitable for Everyone
                </h2>
              </div>
              <p className="mt-4 text-base font-semibold text-[#0B1B4B] dark:text-white">
                No prior experience needed.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Anyone can learn content creation.</p>
              <ul className="mt-5 space-y-2.5">
                {audience.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#0B1B4B] dark:text-gray-200">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-white">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[380px]">
              <div className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full bg-brand-orange/15 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-[#FFC93C]/30 blur-2xl" />

              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_28px_65px_-32px_rgba(11,27,75,0.5)] dark:border-white/10">
                <Image
                  src="/cecil-srungarapati-founder-creators-college.jpeg"
                  alt="Cecil Srungarapati teaching content creation in Telugu"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B4B]/80 via-[#0B1B4B]/10 to-transparent" />

                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 p-3.5 shadow-lg backdrop-blur">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <p className="text-xs font-bold text-[#0B1B4B]">No prior experience needed</p>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-gray-600">
                    Students, homemakers, job holders and business owners — anyone can learn.
                  </p>
                </div>
              </div>

              <div className="absolute -right-3 top-5 rotate-3 rounded-xl bg-[#FFC93C] px-3 py-1.5 text-[11px] font-bold text-[#0B1B4B] shadow-lg">
                In Telugu
              </div>
              <div className="absolute -left-3 top-1/3 hidden -rotate-3 rounded-xl bg-white px-3 py-1.5 text-[11px] font-bold text-[#0B1B4B] shadow-lg sm:block dark:bg-[#0d1424] dark:text-white">
                Lifetime Access
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goal */}
      <section className="bg-[#FBF3E4] dark:bg-white/[0.04] py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <Target size={34} className="shrink-0 text-brand-orange" strokeWidth={2} />
                <h2 className="text-3xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-4xl">
                  My Goal is to Teach...
                </h2>
              </div>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base">
                My goal is to teach Content Creation skill to everyone whose looking to learn content creation at one
                place without getting confused.
              </p>
              <div className="mt-5 inline-block">
                <p className={`${caveat.className} -rotate-2 text-2xl text-brand-orange sm:text-3xl`}>
                  Let&apos;s create your future!
                </p>
                <svg width="210" height="14" viewBox="0 0 210 14" fill="none" aria-hidden="true" className="mt-1 text-brand-orange">
                  <path d="M3 9C38 3 90 2 132 5C162 7 190 10 207 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <VideoThumb
              src="/cecil.jpg"
              alt="Cecil Srungarapati sharing his teaching goal"
              duration="4:58"
              className="aspect-video w-full shadow-[0_22px_50px_-28px_rgba(11,27,75,0.45)]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Value Stack */}
      <section className="bg-white py-14 dark:bg-[#090d16] md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
                <Sparkles size={13} />
                What&apos;s Included
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-4xl">
                Everything you need to <span className="text-brand-orange">start creating</span>
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                One complete course, six practical modules and lifetime access — without jumping between random
                YouTube playlists.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Admissions open for the current batch
              </div>
              <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-2">
                <span className="text-4xl font-bold text-[#0B1B4B] dark:text-white">₹5,000</span>
                <span className="pb-1 text-lg font-semibold text-gray-400 line-through">₹30,000</span>
                <span className="mb-1 rounded-full bg-[#FFC93C] px-2.5 py-1 text-[11px] font-bold text-[#0B1B4B]">
                  Save ₹25,000
                </span>
              </div>
              <Link
                href="/checkout"
                className="mt-5 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-brand-orange/25 transition hover:bg-brand-orange-dark"
              >
                Buy Now
                <ArrowRight size={18} />
              </Link>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Instant access details sent on WhatsApp after payment.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-[#F8FAFC] p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
              <div className="space-y-2.5">
                {valueItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-sm dark:bg-white/[0.05] sm:p-3.5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <Check size={16} strokeWidth={3} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#0B1B4B] dark:text-white">{item.title}</p>
                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                    <span className="ml-auto shrink-0 text-[11px] font-semibold text-gray-400">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-white/10">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Total value</span>
                <span className="text-sm font-bold text-gray-400 line-through">₹30,000</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-base font-bold text-[#0B1B4B] dark:text-white">Today</span>
                <span className="text-xl font-bold text-brand-orange">₹5,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-[#EDF4F8] py-14 dark:bg-white/[0.03] md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-4xl">
              Free YouTube vs <span className="text-brand-orange">Structured Course</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
              Random videos can teach you tools, but not the complete workflow. Here is what changes when you learn
              with a clear roadmap.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg dark:border-white/10 dark:bg-[#0d1424]">
            <div className="grid grid-cols-[1.25fr_1fr_1fr] bg-[#0B1B4B] text-white">
              <div className="p-3 text-[11px] font-bold uppercase tracking-wider sm:p-4 sm:text-xs">What you need</div>
              <div className="p-3 text-center text-[11px] font-bold sm:p-4 sm:text-xs">Free YouTube</div>
              <div className="bg-brand-orange p-3 text-center text-[11px] font-bold sm:p-4 sm:text-xs">Our Course</div>
            </div>
            {comparisonRows.map((row, index) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.25fr_1fr_1fr] ${
                  index > 0 ? "border-t border-gray-100 dark:border-white/5" : ""
                }`}
              >
                <div className="p-3 text-xs font-semibold text-[#0B1B4B] dark:text-white sm:p-4 sm:text-sm">
                  {row.label}
                </div>
                <div className="flex items-center justify-center gap-1.5 border-l border-gray-100 p-3 text-center text-[10px] leading-snug text-gray-500 dark:border-white/5 dark:text-gray-400 sm:text-xs">
                  <X size={14} className="shrink-0 text-red-400" />
                  <span>{row.free}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 border-l border-brand-orange/10 bg-brand-orange/[0.04] p-3 text-center text-[10px] font-medium leading-snug text-[#0B1B4B] dark:bg-brand-orange/10 dark:text-white sm:text-xs">
                  <Check size={14} className="shrink-0 text-emerald-500" />
                  <span>{row.course}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition hover:bg-brand-orange-dark"
            >
              Start Learning Today
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-14 dark:bg-[#090d16] md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
                Student Feedback
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-3xl">
                What learners are saying
              </h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
              Feedback from learners across Andhra Pradesh and Telangana.
            </p>
          </div>

          <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div
                key={testimonial.name}
                className="min-w-[280px] snap-start rounded-2xl border border-gray-100 bg-[#F8FAFC] p-4 dark:border-white/10 dark:bg-white/[0.04] md:min-w-0"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-sm font-bold text-brand-orange">
                    {testimonial.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#0B1B4B] dark:text-white">{testimonial.name}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{testimonial.city}</p>
                  </div>
                </div>
                <p className="mt-3 line-clamp-4 text-xs leading-relaxed text-gray-600 dark:text-gray-300 sm:text-sm">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <span className="mt-3 inline-block rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  {testimonial.result}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-gray-400 dark:text-gray-500">
            Results vary by effort and consistency.
          </p>
        </div>
      </section>

      {/* Urgency strip */}
      <section className="border-y border-brand-orange/20 bg-[#FFF8ED] py-3.5 dark:border-brand-orange/20 dark:bg-brand-orange/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-4 text-center sm:flex-row sm:gap-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1B4B] dark:text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Admissions Open · Current Batch
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-300">
            Launch offer: ₹30,000 course at ₹5,000
          </span>
          <Link href="/checkout" className="text-xs font-bold text-brand-orange hover:underline">
            Join the current batch →
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#08122e]">
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange via-[#FFC93C] to-brand-orange" />
        <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-brand-orange/20 blur-[110px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#2563EB]/25 blur-[120px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC93C]">
                <Sparkles size={13} />
                Start Your Journey
              </span>

              <h2 className="mt-5 text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                Ready to become a <span className="text-[#FFC93C]">Content Creator?</span>
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base lg:mx-0">
                Learn scripting, voice-over, editing and page handling in Telugu — step by step, at your own pace.
              </p>

              <div className="mt-7 flex flex-wrap items-stretch justify-center gap-3 lg:justify-start">
                <div className="rounded-xl bg-white px-4 py-2.5 shadow-lg">
                  <p className="text-[10px] font-semibold text-gray-500">Original Price</p>
                  <p className="text-xl font-bold text-red-500 line-through decoration-red-500 decoration-2 sm:text-2xl">
                    ₹30,000/-
                  </p>
                </div>
                <div className="rounded-xl bg-[#FFC93C] px-4 py-2.5 shadow-lg">
                  <p className="text-[10px] font-semibold text-[#0B1B4B]/70">Offer Price</p>
                  <p className="text-xl font-bold text-[#0B1B4B] sm:text-2xl">
                    ₹5,000/- <span className="text-xs font-semibold">Only</span>
                  </p>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-5 inline-flex w-full max-w-md items-center justify-center gap-2 rounded-xl bg-brand-orange px-8 py-3.5 text-lg font-bold text-white shadow-xl shadow-brand-orange/25 transition hover:bg-brand-orange-dark"
              >
                Buy Now — ₹5,000
                <ArrowRight size={20} />
              </Link>

              <TrustRow light className="mt-5 justify-center lg:justify-start" />
              <p className="mt-3 text-[11px] text-white/50">
                Secure payment · Course access details sent on WhatsApp after purchase.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
              <div className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-brand-orange/30 via-transparent to-[#2563EB]/20 blur-2xl" />

              <div className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] backdrop-blur-md sm:p-6 lg:-rotate-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1.5">
                      <Image
                        src="/logo/4 Icon.png"
                        alt="Creators College"
                        width={36}
                        height={36}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Creators College</p>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50">
                        Telugu Content Creation
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#FFC93C] px-2.5 py-1 text-[10px] font-bold text-[#0B1B4B]">
                    ₹5,000
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {roadmapSteps.map((step) => (
                    <div key={step.title} className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-2.5 py-2">
                      <Check size={12} strokeWidth={3} className="shrink-0 text-emerald-400" />
                      <span className="min-w-0 truncate text-[10.5px] font-medium text-white/80">
                        {step.title === "Account Creations" ? "Accounts" : step.title}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-[#FFC93C] px-3.5 py-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B1B4B]/60">Lifetime Access</p>
                    <p className="text-xs font-bold text-[#0B1B4B]">6 Modules · Learn at Your Own Pace</p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B1B4B] text-white">
                    <Play size={12} fill="currentColor" strokeWidth={0} className="ml-0.5" />
                  </span>
                </div>
              </div>

              <p className={`mt-7 text-center text-2xl text-[#FFC93C] lg:absolute lg:-bottom-11 lg:left-2 lg:mt-0 lg:-rotate-6 lg:text-left ${caveat.className}`}>
                Learn · Create · Earn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F8FAFC] py-14 dark:bg-white/[0.03] md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange">FAQ</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1B4B] dark:text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
              Everything you need to know before enrolling.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-8">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
              {faqCategories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => {
                    setActiveFaqTab(category.key);
                    setActiveFAQ(null);
                  }}
                  className={`shrink-0 rounded-xl px-4 py-2.5 text-left text-xs font-bold transition sm:text-sm lg:w-full ${
                    activeFaqTab === category.key
                      ? "bg-[#0B1B4B] text-white shadow-md dark:bg-brand-orange"
                      : "bg-white text-gray-600 hover:text-brand-orange dark:bg-white/5 dark:text-gray-300"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="space-y-2.5">
              {activeFaqItems.map((faq, index) => {
                const isOpen = activeFAQ === index;
                return (
                  <div
                    key={faq.q}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0d1424]"
                  >
                    <button
                      onClick={() => setActiveFAQ(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left sm:px-5"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-semibold text-[#0B1B4B] dark:text-white sm:text-base">
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-brand-orange transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-gray-100 px-4 py-3.5 dark:border-white/5 sm:px-5">
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Still have questions?{" "}
            <a
              href="https://wa.me/918143937367?text=Hi%2C%20I%20have%20a%20question%20about%20the%20Telugu%20Content%20Creation%20Course"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand-orange hover:underline"
            >
              Chat on WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur transition-transform duration-300 dark:border-white/10 dark:bg-[#0b1220]/95 lg:hidden ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold leading-none text-[#0B1B4B] dark:text-white">₹5,000</span>
              <span className="text-[11px] text-gray-400 line-through">₹30,000</span>
            </div>
            <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">Offer Price · Only</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/918143937367?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20Telugu%20Content%20Creation%20Course"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-[#0B1B4B] dark:border-white/15 dark:text-white"
            >
              <MessageCircle size={18} />
            </a>
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white shadow-md shadow-brand-orange/25"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      <CroExitPopup />
    </div>
  );
}
