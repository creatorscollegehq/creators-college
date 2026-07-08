"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Video, Sparkles, Award, Play, BookOpen, Layers, Users, HelpCircle, CheckCircle, Check, Phone, Mail } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import BrandsMarquee from "@/components/BrandsMarquee";
import VideoGallery from "@/components/VideoGallery";

export default function HomePage() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [selectedHomeCourse, setSelectedHomeCourse] = useState<"creation" | "capcut">("creation");
  const [activeModule, setActiveModule] = useState<number>(0);
  const [activeFaqTab, setActiveFaqTab] = useState<string>("eligibility");

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const homeCourses = {
    creation: {
      title: "Complete Telugu Content Creation Course",
      badge: "Signature Program",
      desc: "Learn everything from Content Planning, Scripting, Voice Over, Mobile Video Shooting, Camera Confidence, Social Media Account Creation, Page Management, Content Publishing, and Account Growth—all through practical, step-by-step training in Telugu.",
      highlights: ["✔ 20 Days Duration", "✔ Live Online & Offline Classes", "✔ Lifetime Course Recordings", "✔ Beginner Friendly"],
      features: [
        "20-Day Practical Training Program",
        "Weekly Live Class Q&A & Reviews",
        "Certificate of Academy Completion",
        "2,000+ Business Projects Covered"
      ],
      modules: [
        {
          title: "Module 1: Content Creation Fundamentals",
          description: "Understanding content creation parameters, target audience metrics, format styling (Shorts vs Long-form), and niche selection criteria.",
          skills: ["Platform Formats", "Niche Mapping", "Mindset Building"]
        },
        {
          title: "Module 2: Content Research & Scripting",
          description: "Discover how to generate endless video concepts, write engaging scripts, design retention structures, and outline script hooks.",
          skills: ["Viral Hooks", "Topic Outline", "Script Writing"]
        },
        {
          title: "Module 3: Mobile Video Production & Shooting",
          description: "Master camera confidence, frame rates, three-point lighting, angles, microphone selection, and voice over confidence.",
          skills: ["Lighting setup", "Mic Placement", "Camera angles"]
        },
        {
          title: "Module 4: Social Media Page Growth & Freelancing",
          description: "Step-by-step guidelines to set up channel portfolios, schedule posts, scale page reach organically, and land paid freelance editing clients.",
          skills: ["Instagram SEO", "Client Acquisition", "Freelancer Portfolios"]
        }
      ]
    },
    capcut: {
      title: "Complete Telugu CapCut Video Editing Course",
      badge: "In-Demand Editing Skills",
      desc: "Master CapCut Video Editing using both Mobile and PC. Learn professional editing, transitions, animations, captions, color correction, audio editing, Instagram Reels, YouTube videos, and export techniques through real-world projects.",
      highlights: ["✔ 20 Days Duration", "✔ Mobile & PC Tool Training", "✔ Practical Assignments", "✔ Course Completion Certificate"],
      features: [
        "20-Day Project-Based Learning",
        "Mobile & PC Software Workflows",
        "Lifetime Course Recording Library",
        "Freelance Client Acquisition Playbook"
      ],
      modules: [
        {
          title: "Module 1: CapCut Installation & Interface Setup",
          description: "Downloading and configuring CapCut desktop & mobile, setting up secure high-speed VPN networks, project imports, and layout interfaces.",
          skills: ["VPN Configuration", "CapCut Pro Overview", "Layout Panels"]
        },
        {
          title: "Module 2: Timeline Trim & Keyframe Animation",
          description: "Cutting, splitting, trimming tracks. Multi-layer overlay setups, curve speed ramping controls, reverse timelines, and zoom position keyframes.",
          skills: ["Trim & Split", "Speed Ramps", "Keyframe Animation"]
        },
        {
          title: "Module 3: Subtitles, Text, & Captions",
          description: "Generate auto-captions, style text blocks, choose premium fonts, add text entrance animations, and build lower-third cards.",
          skills: ["Auto Captions", "Text Styles", "Subtitles Pacing"]
        },
        {
          title: "Module 4: Color Grading, AI Cutout & Audio Sync",
          description: "Cinematic color grading via LUTs, AI background removal cutout, body enhancement filters, sound effects overlays, and noise ducking.",
          skills: ["Cinematic LUTs", "AI Background Cutout", "Noise Sync"]
        }
      ]
    }
  };

  const journeySteps = [
    { title: "Understanding Content Creation Fundamentals", desc: "Learn how social media works, choose the right niche, and build the mindset of a successful content creator.", step: "Step 01", icon: "📖" },
    { title: "Content Research & Scripting", desc: "Discover how to generate content ideas, write engaging scripts, and plan videos that connect with your audience.", step: "Step 02", icon: "✍️" },
    { title: "Voice Over & Communication Skills", desc: "Improve your voice delivery, confidence, and storytelling techniques for professional-quality content.", step: "Step 03", icon: "🎙️" },
    { title: "Microphone & Audio Setup", desc: "Learn microphone selection, audio recording, and sound clarity for high-quality videos.", step: "Step 04", icon: "🎤" },
    { title: "Camera Confidence & Mobile Video Shooting", desc: "Master framing, lighting, camera angles, and shooting professional videos using your mobile phone.", step: "Step 05", icon: "🎥" },
    { title: "Video Editing (Mobile & PC)", desc: "Edit professional videos using CapCut with transitions, animations, captions, effects, music, and export settings.", step: "Step 06", icon: "✂️" },
    { title: "Social Media Account Creation", desc: "Create and optimize professional accounts on Instagram, Facebook, and YouTube.", step: "Step 07", icon: "📱" },
    { title: "Social Media Page Management", desc: "Learn content planning, posting strategies, audience engagement, and page management.", step: "Step 08", icon: "📈" },
    { title: "Account Growth Strategies", desc: "Understand organic growth, consistency, branding, hashtags, and audience-building techniques.", step: "Step 09", icon: "🚀" },
    { title: "Personal Branding & Client Acquisition", desc: "Build your personal brand, attract clients, start freelancing, and turn your content creation skills into earning opportunities.", step: "Step 10", icon: "💼" },
  ];

  const outcomesList = [
    "Plan & Script Content with high-retention frameworks",
    "Shoot Professional Videos using just a mobile phone",
    "Edit Videos on Mobile & PC like a pro editor",
    "Create & Manage optimized Social Media Pages",
    "Grow Instagram, Facebook & YouTube Accounts organically",
    "Build Your Personal Brand to attract clients",
    "Find Clients & Start Freelancing dynamically",
    "Create High-Quality Content with camera confidence"
  ];

  const heroFeatures = [
    {
      title: "Live Online",
      subtitle: "Classes (Interactive)",
      icon: Video,
      color: "blue" as const,
      onClick: () => {
        setSelectedHomeCourse("creation");
        document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      title: "Offline Classroom",
      subtitle: "in Hyderabad",
      icon: Users,
      color: "orange" as const,
      onClick: () => {
        document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      title: "Practical Projects",
      subtitle: "& Real Experience",
      icon: Layers,
      color: "purple" as const,
      onClick: () => {
        setSelectedHomeCourse("creation");
        document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      title: "Lifetime Support",
      subtitle: "& Community",
      icon: Sparkles,
      color: "emerald" as const,
      href: "https://wa.me/918143937367"
    }
  ];

  // FAQ Categorized lists
  const faqCategories = {
    eligibility: {
      label: "👨🎓 Eligibility",
      items: [
        { q: "Who can join the course?", a: "Anyone aged 15 years or above can join. No educational qualification or prior experience is required. Our courses are designed for complete beginners." },
        { q: "Is this course suitable for beginners?", a: "Yes. The course is specially designed for complete beginners and taught step by step in Telugu." },
        { q: "What language is the course taught in?", a: "The course is taught primarily in Telugu, with technical terms explained in English wherever required." }
      ]
    },
    learning: {
      label: "📚 Courses & Learning",
      items: [
        { q: "Which courses are currently available?", a: "Complete Telugu Content Creation Course and Complete Telugu CapCut Video Editing Course (Mobile & PC)." },
        { q: "What is the course duration?", a: "Both courses run for 20 days, with 1-hour classes every day." },
        { q: "What will I learn?", a: "You'll learn everything from: Content Creation Fundamentals, Scripting, Voice Over, Mobile Video Shooting, Video Editing (Mobile & PC), Instagram/Facebook/YouTube account optimization, Social Media Page Management, and Account Growth Strategies." },
        { q: "Do you provide assignments and practical exercises?", a: "Yes. Every student receives practical assignments and real-world exercises." },
        { q: "Will I work on real projects?", a: "Yes. Students gain hands-on experience by working on real-world projects." }
      ]
    },
    modes: {
      label: "🎥 Class Modes",
      items: [
        { q: "How are the classes conducted?", a: "We offer Live Online Classes, Offline Classroom Training, and Lifetime Course Recordings." },
        { q: "Can I join online from anywhere?", a: "Yes. You can attend our live online classes from anywhere." },
        { q: "Do you provide lifetime recordings?", a: "Yes. Every enrolled student receives lifetime access to all course recordings." },
        { q: "What happens if I miss a live class?", a: "No problem. You can watch the recorded session anytime at your own convenience." }
      ]
    },
    requirements: {
      label: "💻 Requirements",
      items: [
        { q: "What do I need for the Content Creation Course?", a: "An Android Phone / iPhone, a Laptop (Recommended), and a Camera (Optional). A medium-range phone or laptop is sufficient." },
        { q: "What do I need for the CapCut Video Editing Course?", a: "An Android Phone / iPhone, or a Windows Laptop / MacBook (Minimum 4GB RAM & 10GB Free Storage recommended)." },
        { q: "Do I need to purchase any software?", a: "No. Purchasing software is optional. However, training is provided using the CapCut Paid Version so students can learn all professional features." }
      ]
    },
    support: {
      label: "🎓 Certificate & Support",
      items: [
        { q: "Will I receive a Course Completion Certificate?", a: "Yes. Students who successfully complete the course and practical project will receive a Course Completion Certificate from Creators College." },
        { q: "Will I receive support after the course?", a: "Yes. We provide lifetime support through our exclusive student WhatsApp community." },
        { q: "Is attendance mandatory?", a: "Live classes are recommended for the best learning experience. If you miss a class, recordings will always be available." }
      ]
    },
    career: {
      label: "💼 Career & Freelancing",
      items: [
        { q: "Do you provide placement assistance?", a: "Our programs are skill-based, not placement-based. We focus on teaching students how to find clients, build their personal brand, and create earning opportunities." },
        { q: "Will I learn freelancing?", a: "Yes. You'll learn practical methods to start freelancing and earn through content creation and video editing." },
        { q: "Will I learn how to earn using these skills?", a: "Yes. Along with technical skills, we teach you how to build your profile, attract clients, and generate income." }
      ]
    },
    fees: {
      label: "💳 Fees & Enrollment",
      items: [
        { q: "Is EMI available?", a: "Currently, EMI and installment options are not available because the courses are offered at a special launch price of ₹5,000 (Original Course Value: ₹30,000)." },
        { q: "What payment methods do you accept?", a: "We currently accept UPI and Cash payments." },
        { q: "Is the course fee refundable?", a: "No. Once enrolled, the course fee is non-refundable." },
        { q: "Can I join after the batch has started?", a: "Yes. You'll receive recordings of previous sessions and can easily catch up." },
        { q: "Do you provide a free demo class?", a: "Yes. We offer a free demo class so you can experience our teaching style before enrolling." }
      ]
    }
  };

  const activeFaqItems = faqCategories[activeFaqTab as keyof typeof faqCategories].items;

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#090d16]">
      {/* 1. Hero Section matching mockup split format */}
      <section className="relative text-white pt-6 pb-16 md:pt-8 md:pb-24 overflow-hidden border-b border-brand-blue-dark dark:border-white/5 bg-[#050c21]">
        {/* Next.js Optimized Background Image (Floating Card layout on desktop for high-resolution sharpness, locked to right edge to prevent border spacing) */}
        <div className="absolute top-0 bottom-8 right-0 w-full lg:w-[52%] z-0 select-none pointer-events-none rounded-bl-3xl overflow-hidden hidden lg:block">
          <Image
            src="/cecil.jpg"
            alt="Cecil Srungarapati"
            fill
            priority
            quality={100}
            className="object-cover object-[center_right_10%] scale-[1.25] -translate-y-[8%]"
          />
          {/* Gradient transitions to blend the image seamlessly */}
          <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#050c21] via-[#050c21]/75 to-transparent z-10" />
        </div>

        {/* Mobile/Tablet full width background container */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none lg:hidden">
          <Image
            src="/cecil.jpg"
            alt="Cecil Srungarapati"
            fill
            priority
            quality={100}
            className="object-cover object-[center_right_10%] scale-[1.2] -translate-y-[6%]"
          />
          <div className="absolute inset-0 bg-[#050c21]/80" />
        </div>

        {/* Overlay and Glow Effects */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 relative z-10 text-left space-y-6">
              
              <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300">
                ⭐ LEARN CONTENT CREATION &amp; VIDEO EDITING IN TELUGU
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Master Content Creation, <br />
                <span className="text-brand-orange">Video Editing &amp; AI Skills</span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug">
                Build Your Brand. Earn Online.
              </p>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed font-normal max-w-2xl">
                Practical training in Content Creation, CapCut Editing, AI Tools, Social Media Growth &amp; Freelancing to help you <span className="text-brand-orange font-bold">learn, create and earn</span> from anywhere in the world.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/checkout"
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-brand-orange/30 flex items-center gap-2 transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] animate-enroll"
                >
                  Enroll Now
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/lp/free-demo"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold px-6 py-3.5 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]"
                >
                  <Video size={18} />
                  Watch Free Demo Class
                </Link>
              </div>

              {/* Mobile/Tablet 4 Feature Cards */}
              <div className="lg:hidden grid grid-cols-2 gap-3 py-2">
                {heroFeatures.map((feat, idx) => {
                  const CardTag = feat.href ? "a" : "button";
                  const linkProps = feat.href ? { href: feat.href, target: "_blank", rel: "noopener noreferrer" } : { onClick: feat.onClick };
                  
                  const colorClasses = {
                    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                    orange: "bg-orange-500/10 text-brand-orange",
                    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
                    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  }[feat.color];

                  return (
                    <CardTag
                      key={idx}
                      {...linkProps}
                      className="bg-white/95 dark:bg-[#131b2e]/95 border border-gray-100 dark:border-white/5 p-3 rounded-xl flex items-center gap-3 shadow-md hover:scale-[1.02] transition text-left relative cursor-pointer group"
                    >
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorClasses}`}>
                        <feat.icon size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-brand-orange leading-tight">{feat.title}</h4>
                        <p className="text-[10.5px] text-brand-blue dark:text-white font-extrabold leading-tight">{feat.subtitle}</p>
                      </div>
                    </CardTag>
                  );
                })}
              </div>

              {/* Metric Stats Cards Row - 2x2 Grid White Theme */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/15 max-w-md">
                {/* Card 1 */}
                <Link
                  href="/success-stories"
                  className="bg-white/95 text-[#0a1931] border border-gray-100 rounded-xl p-3 flex flex-col justify-between space-y-1 hover:border-brand-orange hover:scale-[1.03] transition shadow-md cursor-pointer block"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-orange text-sm">👁️</span>
                    <span className="text-sm sm:text-base font-black text-[#0a1931]">500M+</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-500 font-bold leading-tight">Content Views Overall</div>
                </Link>
                {/* Card 2 */}
                <Link
                  href="/corporate-training"
                  className="bg-white/95 text-[#0a1931] border border-gray-100 rounded-xl p-3 flex flex-col justify-between space-y-1 hover:border-brand-orange hover:scale-[1.03] transition shadow-md cursor-pointer block"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-orange text-sm">💼</span>
                    <span className="text-sm sm:text-base font-black text-[#0a1931]">1000+</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-500 font-bold leading-tight">Businesses Worked With</div>
                </Link>
                {/* Card 3 */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-white/95 text-left text-[#0a1931] border border-gray-100 rounded-xl p-3 flex flex-col justify-between space-y-1 hover:border-brand-orange hover:scale-[1.03] transition shadow-md cursor-pointer block w-full font-bold"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-orange text-sm">👥</span>
                    <span className="text-sm sm:text-base font-black text-[#0a1931]">Thousands</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-500 font-bold leading-tight">Creators Trained</div>
                </button>
                {/* Card 4 */}
                <Link
                  href="/about"
                  className="bg-white/95 text-[#0a1931] border border-gray-100 rounded-xl p-3 flex flex-col justify-between space-y-1 hover:border-brand-orange hover:scale-[1.03] transition shadow-md cursor-pointer block"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-orange text-sm">🏅</span>
                    <span className="text-sm sm:text-base font-black text-[#0a1931]">5+ Years</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-500 font-bold leading-tight">In Content Excellence</div>
                </Link>
              </div>

              {/* Cecil intro card for mobile/tablet */}
              <div className="lg:hidden bg-black/65 backdrop-blur-sm border border-white/10 p-4 rounded-xl space-y-1.5 text-left mt-6">
                <span className="text-[10px] font-black bg-brand-orange text-white px-2.5 py-1 rounded uppercase tracking-widest w-fit inline-block">CEO &amp; Founder</span>
                <h4 className="text-sm font-bold text-white">Cecil Srungarapati</h4>
                <p className="text-xs text-gray-300 leading-normal font-normal">
                  Founder of Creators College. Content Creator &amp; Digital Strategist with 5+ years experience generating 500M+ views across social platforms.
                </p>
              </div>

            </div>

            {/* Right Column - Holds the 4 interactive features on Desktop (Aligned Higher Up in Corner) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col space-y-3 relative z-10 self-start items-end pt-2 lg:-mt-8 pr-4">
              {heroFeatures.map((feat, idx) => {
                const CardTag = feat.href ? "a" : "button";
                const linkProps = feat.href ? { href: feat.href, target: "_blank", rel: "noopener noreferrer" } : { onClick: feat.onClick };
                
                const colorClasses = {
                  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                  orange: "bg-orange-500/10 text-brand-orange",
                  purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
                  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                }[feat.color];

                return (
                  <CardTag
                    key={idx}
                    {...linkProps}
                    className="bg-white/95 dark:bg-[#131b2e]/95 border border-gray-100 dark:border-white/5 p-2 px-3.5 rounded-xl flex items-center gap-3 shadow-md hover:shadow-lg hover:scale-[1.03] transition duration-200 text-left relative cursor-pointer group w-[235px]"
                  >
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition ${colorClasses}`}>
                      <feat.icon size={18} />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-black text-brand-orange leading-tight">{feat.title}</h4>
                      <p className="text-[10.5px] text-brand-blue dark:text-white font-extrabold leading-tight">{feat.subtitle}</p>
                    </div>
                  </CardTag>
                );
              })}
            </div>

            {/* Cecil signature premium glass box overlay (Aligned over desk workspace area) */}
            <div className="hidden lg:block absolute bottom-6 left-[48%] z-30 bg-black/60 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-xl shadow-xl select-none pointer-events-auto">
              <span className="text-[#f97316] text-xl font-bold block leading-none italic" style={{ fontFamily: "'Brush Script MT', 'Great Vibes', 'Parisienne', cursive" }}>
                Cecil Srungarapati
              </span>
              <span className="text-[8.5px] text-gray-300 font-extrabold tracking-widest uppercase block mt-1">
                Founder &amp; CEO, Creators College
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 6-Feature Bar below Hero */}
      <section className="bg-brand-gray/30 dark:bg-[#090d16] py-6 relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white dark:bg-brand-gray border border-gray-100 dark:border-white/5 rounded-2xl md:rounded-full p-4 md:p-5 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center text-left text-brand-charcoal dark:text-white font-bold divide-y lg:divide-y-0 lg:divide-x divide-gray-100 dark:divide-white/5">
            
            {/* Item 1 */}
            <div className="flex items-center gap-3 pl-2">
              <div className="w-10 h-10 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                🎥
              </div>
              <div>
                <h4 className="text-xs sm:text-sm text-brand-blue dark:text-white leading-tight font-black">Learn in Telugu</h4>
                <p className="text-[10.5px] sm:text-xs text-gray-400 font-semibold leading-tight">Step-by-step</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-3 pt-4 lg:pt-0 lg:pl-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                💻
              </div>
              <div>
                <h4 className="text-xs sm:text-sm text-brand-blue dark:text-white leading-tight font-black">Live Classes</h4>
                <p className="text-[10.5px] sm:text-xs text-gray-400 font-semibold leading-tight">Interactive</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-3 pt-4 lg:pt-0 lg:pl-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                📂
              </div>
              <div>
                <h4 className="text-xs sm:text-sm text-brand-blue dark:text-white leading-tight font-black">Recordings</h4>
                <p className="text-[10.5px] sm:text-xs text-gray-400 font-semibold leading-tight">Lifetime Access</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-3 pt-4 lg:pt-0 lg:pl-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                💼
              </div>
              <div>
                <h4 className="text-xs sm:text-sm text-brand-blue dark:text-white leading-tight font-black">Real Projects</h4>
                <p className="text-[10.5px] sm:text-xs text-gray-400 font-semibold leading-tight">Build Portfolio</p>
              </div>
            </div>

            {/* Item 5 */}
            <div className="flex items-center gap-3 pt-4 lg:pt-0 lg:pl-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 text-yellow-600 flex items-center justify-center shrink-0">
                📈
              </div>
              <div>
                <h4 className="text-xs sm:text-sm text-brand-blue dark:text-white leading-tight font-black">Career &amp; Freelancer</h4>
                <p className="text-[10.5px] sm:text-xs text-gray-400 font-semibold leading-tight">Expert Guidance</p>
              </div>
            </div>

            {/* Item 6 */}
            <div className="flex items-center gap-3 pt-4 lg:pt-0 lg:pl-4">
              <div className="w-10 h-10 rounded-full bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                👥
              </div>
              <div>
                <h4 className="text-xs sm:text-sm text-brand-blue dark:text-white leading-tight font-black">Community</h4>
                <p className="text-[10.5px] sm:text-xs text-gray-400 font-semibold leading-tight">Support</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Choose Your Learning Mode Section */}
      <section className="py-12 md:py-20 bg-white dark:bg-[#090d16] border-b border-gray-100 dark:border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block border border-brand-orange/30 bg-brand-orange/5 text-brand-orange px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
              🎓 Choose Your Learning Mode
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-blue dark:text-white tracking-tight">
              Learn Your Way. <span className="text-brand-orange">Grow Your Future.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-normal max-w-3xl mx-auto">
              At Creators College, we offer 3 flexible learning modes designed to fit your lifestyle, schedule, and goals. Learn live, learn in person, or learn at your own pace &mdash; <strong className="text-brand-blue dark:text-white">the choice is yours!</strong>
            </p>
          </div>

          {/* Three Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Card 1: Online Classes */}
            <div className="bg-white dark:bg-brand-gray border border-gray-100 dark:border-white/5 p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 hover:shadow-2xl transition duration-300">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-brand-blue dark:text-white text-lg flex items-center gap-2">
                      1. Online Classes
                      <span className="bg-blue-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider uppercase animate-pulse">LIVE</span>
                    </h3>
                    <p className="text-xs text-gray-400">Learn Live from Anywhere</p>
                  </div>
                </div>
                {/* Image */}
                <div className="rounded-2xl overflow-hidden aspect-video relative border border-gray-100 dark:border-white/5">
                  <img
                    src="https://images.unsplash.com/photo-1610484826917-0f101a7bf7f4?auto=format&fit=crop&w=500&q=80"
                    alt="Creators College Live Online Video Editing and Content Creation Classes in Telugu"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Checklist */}
                <ul className="space-y-2.5 text-xs text-gray-500 dark:text-gray-400 font-semibold">
                  {[
                    "Live Interactive Sessions",
                    "Ask Questions in Real-Time",
                    "Practical Assignments",
                    "Weekend & Weekday Batches",
                    "Lifetime Community"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => {
                  setSelectedHomeCourse("creation");
                  setActiveModule(0);
                  document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl text-center text-xs tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-blue-500/20 cursor-pointer"
              >
                Explore Online Courses &rarr;
              </button>
            </div>

            {/* Card 2: Offline Classroom */}
            <div className="bg-white dark:bg-brand-gray border border-gray-100 dark:border-white/5 p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 hover:shadow-2xl transition duration-300">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-brand-blue dark:text-white text-lg">2. Offline Classroom</h3>
                    <p className="text-xs text-gray-400">Learn Face-to-Face in Hyderabad</p>
                  </div>
                </div>
                {/* Image */}
                <div className="rounded-2xl overflow-hidden aspect-video relative border border-gray-100 dark:border-white/5">
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80"
                    alt="Creators College Offline Classroom Video Editing Academy in Hyderabad"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Checklist */}
                <ul className="space-y-2.5 text-xs text-gray-500 dark:text-gray-400 font-semibold">
                  {[
                    "Classroom Training",
                    "Hands-on Practical Sessions",
                    "Direct Mentor Support",
                    "Networking with Students",
                    "Real Project Experience"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => {
                  document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 px-6 rounded-2xl text-center text-xs tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-brand-orange/20 cursor-pointer"
              >
                Explore Offline Courses &rarr;
              </button>
            </div>

            {/* Card 3: Recorded Sessions */}
            <div className="bg-white dark:bg-brand-gray border border-gray-100 dark:border-white/5 p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 hover:shadow-2xl transition duration-300">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-brand-blue dark:text-white text-lg">3. Recorded Sessions</h3>
                    <p className="text-xs text-gray-400">Learn at Your Own Pace</p>
                  </div>
                </div>
                {/* Image */}
                <div className="rounded-2xl overflow-hidden aspect-video relative border border-gray-100 dark:border-white/5">
                  <img
                    src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=500&q=80"
                    alt="Creators College Recorded Video Editing Course Lectures for Lifetime Self-Paced Learning"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Checklist */}
                <ul className="space-y-2.5 text-xs text-gray-500 dark:text-gray-400 font-semibold">
                  {[
                    "Lifetime Access",
                    "Watch Anytime",
                    "Pause & Rewatch",
                    "Mobile & Laptop Friendly",
                    "Perfect for Busy Professionals"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => {
                  setSelectedHomeCourse("capcut");
                  setActiveModule(0);
                  document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-2xl text-center text-xs tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-purple-500/20 cursor-pointer"
              >
                Explore Recorded Courses &rarr;
              </button>
            </div>

          </div>

          {/* Sub-Header Divider */}
          <div className="pt-8 text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] bg-gray-200 dark:bg-white/10 w-16" />
              <span className="text-xs font-black uppercase tracking-wider text-brand-blue dark:text-white flex items-center gap-1.5">
                🎓 Courses Available in Each Mode
              </span>
              <div className="h-[1px] bg-gray-200 dark:bg-white/10 w-16" />
            </div>
            <p className="text-xs sm:text-sm text-gray-400">Choose any course and learn in the mode that suits you best.</p>
          </div>

          {/* Five Horizontal Course Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
            
            {/* Card 1: Content Creation */}
            <div className="bg-white dark:bg-brand-gray border border-gray-100 dark:border-white/5 p-5 rounded-2xl shadow flex flex-col justify-between space-y-4 hover:shadow-lg transition">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                    🎬
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">✓ Available</span>
                </div>
                <h4 className="font-extrabold text-brand-blue dark:text-white text-xs sm:text-sm leading-tight pt-1">
                  1. Complete Content Creation
                </h4>
                <p className="text-[11px] text-gray-400 leading-relaxed font-normal">
                  Master content planning, scripting, video shooting, editing, branding, social media growth &amp; monetization.
                </p>
              </div>
              <Link
                href="/courses"
                className="w-full border border-gray-200 dark:border-white/10 hover:border-brand-orange hover:text-brand-orange text-brand-charcoal dark:text-white font-bold py-2 px-4 rounded-xl text-center text-[10px] tracking-wider transition-all duration-300 hover:scale-[1.02]"
              >
                View Course &rarr;
              </Link>
            </div>

            {/* Card 2: CapCut Editing */}
            <div className="bg-white dark:bg-brand-gray border border-gray-100 dark:border-white/5 p-5 rounded-2xl shadow flex flex-col justify-between space-y-4 hover:shadow-lg transition">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                    ✂️
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">✓ Available</span>
                </div>
                <h4 className="font-extrabold text-brand-blue dark:text-white text-xs sm:text-sm leading-tight pt-1">
                  2. Complete CapCut Editing
                </h4>
                <p className="text-[11px] text-gray-400 leading-relaxed font-normal">
                  Learn CapCut from beginner to advanced for both Mobile &amp; PC and create stunning videos.
                </p>
              </div>
              <Link
                href="/courses"
                className="w-full border border-gray-200 dark:border-white/10 hover:border-brand-orange hover:text-brand-orange text-brand-charcoal dark:text-white font-bold py-2 px-4 rounded-xl text-center text-[10px] tracking-wider transition-all duration-300 hover:scale-[1.02]"
              >
                View Course &rarr;
              </Link>
            </div>

            {/* Card 3: Adobe Premiere Pro */}
            <div className="bg-white dark:bg-brand-gray border border-gray-100 dark:border-white/5 p-5 rounded-2xl shadow flex flex-col justify-between space-y-4 hover:shadow-lg transition">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-xs shrink-0">
                    Pr
                  </div>
                  <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-bold px-2 py-0.5 rounded-full">🚀 Soon</span>
                </div>
                <h4 className="font-extrabold text-brand-blue dark:text-white text-xs sm:text-sm leading-tight pt-1">
                  3. Adobe Premiere Pro
                </h4>
                <p className="text-[11px] text-gray-400 leading-relaxed font-normal">
                  Professional video editing for YouTube, films &amp; commercials.
                </p>
              </div>
              <a
                href="https://wa.me/918143937367?text=Hi%20Creators%20College,%20I'd%20like%20to%20be%20notified%20when%20the%20Adobe%20Premiere%20Pro%20course%20launches!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-bold py-2 px-4 rounded-xl text-center text-[10px] tracking-wider transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-1 cursor-pointer"
              >
                Notify Me 🔔
              </a>
            </div>

            {/* Card 4: After Effects */}
            <div className="bg-white dark:bg-brand-gray border border-gray-100 dark:border-white/5 p-5 rounded-2xl shadow flex flex-col justify-between space-y-4 hover:shadow-lg transition">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-xs shrink-0">
                    Ae
                  </div>
                  <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-bold px-2 py-0.5 rounded-full">🚀 Soon</span>
                </div>
                <h4 className="font-extrabold text-brand-blue dark:text-white text-xs sm:text-sm leading-tight pt-1">
                  4. After Effects
                </h4>
                <p className="text-[11px] text-gray-400 leading-relaxed font-normal">
                  Learn motion graphics, animation &amp; visual effects for professional content creation.
                </p>
              </div>
              <a
                href="https://wa.me/918143937367?text=Hi%20Creators%20College,%20I'd%20like%20to%20be%20notified%20when%20the%20Adobe%20After%20Effects%20course%20launches!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-bold py-2 px-4 rounded-xl text-center text-[10px] tracking-wider transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-1 cursor-pointer"
              >
                Notify Me 🔔
              </a>
            </div>

            {/* Card 5: DaVinci Resolve */}
            <div className="bg-white dark:bg-brand-gray border border-gray-100 dark:border-white/5 p-5 rounded-2xl shadow flex flex-col justify-between space-y-4 hover:shadow-lg transition">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center font-bold text-[10px] shrink-0">
                    Dr
                  </div>
                  <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-bold px-2 py-0.5 rounded-full">🚀 Soon</span>
                </div>
                <h4 className="font-extrabold text-brand-blue dark:text-white text-xs sm:text-sm leading-tight pt-1">
                  5. DaVinci Resolve
                </h4>
                <p className="text-[11px] text-gray-400 leading-relaxed font-normal">
                  Master professional editing, color grading &amp; audio post production.
                </p>
              </div>
              <a
                href="https://wa.me/918143937367?text=Hi%20Creators%20College,%20I'd%20like%20to%20be%20notified%20when%20the%20DaVinci%20Resolve%20course%20launches!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-bold py-2 px-4 rounded-xl text-center text-[10px] tracking-wider transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-1 cursor-pointer"
              >
                Notify Me 🔔
              </a>
            </div>

          </div>

          {/* Bottom Value bar features */}
          <div className="bg-brand-blue dark:bg-brand-gray border border-brand-blue-dark text-white p-6 rounded-3xl shadow-lg mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs font-bold divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="pt-3 md:pt-0 flex flex-col justify-center items-center space-y-1">
                <span className="text-brand-orange text-lg">👨‍🏫</span>
                <span className="text-[11px] tracking-wide text-white/95">Expert Trainers</span>
                <span className="text-[10px] text-white/60 font-normal">Industry Professionals</span>
              </div>
              <div className="pt-3 md:pt-0 flex flex-col justify-center items-center space-y-1">
                <span className="text-brand-orange text-lg">📁</span>
                <span className="text-[11px] tracking-wide text-white/95">Practical Projects</span>
                <span className="text-[10px] text-white/60 font-normal">Real World Experience</span>
              </div>
              <div className="pt-3 md:pt-0 flex flex-col justify-center items-center space-y-1">
                <span className="text-brand-orange text-lg">🎓</span>
                <span className="text-[11px] tracking-wide text-white/95">Certificate</span>
                <span className="text-[10px] text-white/60 font-normal">Upon Completion</span>
              </div>
              <div className="pt-3 md:pt-0 flex flex-col justify-center items-center space-y-1">
                <span className="text-brand-orange text-lg">💬</span>
                <span className="text-[11px] tracking-wide text-white/95">Lifetime Support</span>
                <span className="text-[10px] text-white/60 font-normal">We're Always With You</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1.5: Our Pillars / Our Core Values mockup matching */}
      <section className="py-12 md:py-20 bg-white dark:bg-[#090d16] border-b border-gray-100 dark:border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] bg-brand-orange w-8 rounded" />
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
                OUR PILLARS
              </span>
              <div className="h-[2px] bg-brand-orange w-8 rounded" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-blue dark:text-white tracking-tight">
              Our Core Values
            </h2>
            <div className="flex justify-center gap-1.5 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            </div>
          </div>

          {/* 3 Columns Core Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Value Card 1: Practical Learning */}
            <div className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-6 hover:shadow-lg transition duration-300 relative overflow-hidden group">
              <div className="w-full h-36 rounded-2xl overflow-hidden shadow-sm shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80" 
                  alt="Practical Hands-on Video Editing Assignments at Creators College" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-base font-black text-brand-blue dark:text-white">Practical Learning</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  Everything we teach is centered around hands-on projects, assignments, and real-life client tasks.
                </p>
              </div>
              <div className="w-full h-2 bg-brand-blue absolute bottom-0 left-0" />
            </div>

            {/* Value Card 2: Creativity */}
            <div className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-6 hover:shadow-lg transition duration-300 relative overflow-hidden group">
              <div className="w-full h-36 rounded-2xl overflow-hidden shadow-sm shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=80" 
                  alt="Creative Content Creation and YouTube Channel Growth Strategy" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-base font-black text-brand-orange">Creativity</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  Helping you find your unique creative voice and building video arcs that stand out in crowded feeds.
                </p>
              </div>
              <div className="w-full h-2 bg-brand-orange absolute bottom-0 left-0" />
            </div>

            {/* Value Card 3: Step-by-Step Teaching */}
            <div className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-6 hover:shadow-lg transition duration-300 relative overflow-hidden group">
              <div className="w-full h-36 rounded-2xl overflow-hidden shadow-sm shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80" 
                  alt="Step-by-Step Video Editing Tutorials in Telugu for Beginners" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-base font-black text-brand-blue dark:text-white">Step-by-Step Teaching</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  Courses taught in clear, basic Telugu, from starting your channels up to advanced platform algorithms.
                </p>
              </div>
              <div className="w-full h-2 bg-brand-blue absolute bottom-0 left-0" />
            </div>

          </div>

          {/* CTA Banner: Learn Today. Lead Tomorrow */}
          <div className="bg-[#0a1931] relative overflow-hidden text-white rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl mt-12 text-left flex flex-col md:flex-row justify-between items-center gap-6 border border-white/10">
            <div className="absolute inset-0 bg-brand-orange/5 blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-3xl">
                🎓
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                  Learn Today. <span className="text-brand-orange">Lead Tomorrow.</span>
                </h3>
                <p className="text-xs text-gray-300">Unlock your potential in content creation and video editing.</p>
              </div>
            </div>

            <button 
              onClick={() => {
                document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-black py-4 px-8 rounded-full text-xs tracking-wider uppercase shadow-lg transition duration-300 hover:scale-[1.05] relative z-10 shrink-0 cursor-pointer"
            >
              Explore Active Courses &rarr;
            </button>
          </div>

        </div>
      </section>

      {/* 2. Why Creators College */}
      <section className="py-12 md:py-20 bg-brand-gray/30 dark:bg-white/5 border-y border-gray-100 dark:border-white/5 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              🚀 Why Creators College?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue dark:text-white tracking-tight">
              Learn from Real Experience. Build Real Skills.
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              At Creators College, we teach what we practice every day. With experience creating content for 2,000+ business projects and generating 500M+ content views, our training is built on real industry knowledge—not just theory.
            </p>
          </div>

          <div className="bg-white dark:bg-brand-gray border border-gray-200/50 dark:border-white/5 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Practical Learning */}
              <div className="space-y-2 text-left">
                <h4 className="font-bold text-sm text-brand-blue dark:text-white flex items-center gap-2">
                  <span className="text-lg shrink-0">🎬</span> Practical Learning
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  Learn by creating real content, working on practical assignments, and solving real-world challenges. Taught entirely step-by-step.
                </p>
              </div>

              {/* Telugu Training */}
              <div className="space-y-2 text-left">
                <h4 className="font-bold text-sm text-brand-blue dark:text-white flex items-center gap-2">
                  <span className="text-lg shrink-0">🎓</span> Telugu Step-by-Step Training
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  Our beginner-friendly teaching method makes it easy to understand every concept, from planning basics to advanced video cuts.
                </p>
              </div>

              {/* Complete Content Journey */}
              <div className="space-y-2 text-left">
                <h4 className="font-bold text-sm text-brand-blue dark:text-white flex items-center gap-2">
                  <span className="text-lg shrink-0">📱</span> Complete Journey
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  Master Content Planning, Scripting, Video Shooting, Video Editing, Social Media Page Management, Publishing, and Account Growth.
                </p>
              </div>

              {/* Learn from Industry Pros */}
              <div className="space-y-2 text-left">
                <h4 className="font-bold text-sm text-brand-blue dark:text-white flex items-center gap-2">
                  <span className="text-lg shrink-0">💼</span> Industry Professionals
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  Gain knowledge from professionals with 5+ years of experience, 2,000+ business projects, and 100+ brands worked with.
                </p>
              </div>

              {/* Flexible Learning */}
              <div className="space-y-2 text-left">
                <h4 className="font-bold text-sm text-brand-blue dark:text-white flex items-center gap-2">
                  <span className="text-lg shrink-0">💻</span> Flexible Learning
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  Choose your preferred learning mode: Live Online Classes, Offline Classroom Training, and Lifetime Course Recordings.
                </p>
              </div>

              {/* Build Your Career */}
              <div className="space-y-2 text-left">
                <h4 className="font-bold text-sm text-brand-blue dark:text-white flex items-center gap-2">
                  <span className="text-lg shrink-0">🚀</span> Build Your Career
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  Whether your goal is to become a creator, video editor, freelancer, influencer, or grow your business, we help build real opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Creators College at a Glance list */}
          <div className="mt-16 bg-white dark:bg-brand-gray border border-gray-100 dark:border-white/5 p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-black text-brand-blue dark:text-white text-center">⭐ Creators College at a Glance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-brand-charcoal dark:text-white text-center">
              <div>🎥 2,000+ Business Projects</div>
              <div>🏢 100+ Brands Worked With</div>
              <div>📈 500M+ Content Views Overall</div>
              <div>🗓️ 5+ Years Industry Experience</div>
              <div>👨🏫 Telugu Step-by-Step Training</div>
              <div>🎬 Real Projects &amp; Assignments</div>
              <div>🎓 Course Completion Certificate</div>
              <div>🎥 Lifetime Course Recordings</div>
            </div>
            <div className="text-center pt-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
              Learn. Create. Grow. Start your creator journey with confidence.
            </div>
          </div>

        </div>
      </section>

      {/* 3. Featured Courses */}
      <section id="courses-section" className="py-12 md:py-20 bg-white dark:bg-[#090d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">🎓 Featured Courses</span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white">Master Content Creation &amp; Video Editing in Telugu</h2>
            <p className="text-xs sm:text-sm text-gray-400">Taught for Students, Job Seekers, Housewives, Business Owners, and Creators.</p>
          </div>

          {/* Interactive Toggle Tabs */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => { setSelectedHomeCourse("creation"); setActiveModule(0); }}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                selectedHomeCourse === "creation"
                  ? "bg-brand-blue text-white shadow-md"
                  : "bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/5 hover:bg-gray-50"
              }`}
            >
              🎬 Content Creation
            </button>
            <button
              onClick={() => { setSelectedHomeCourse("capcut"); setActiveModule(0); }}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                selectedHomeCourse === "capcut"
                  ? "bg-brand-blue text-white shadow-md"
                  : "bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/5 hover:bg-gray-50"
              }`}
            >
              ✂️ CapCut Video Editing
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Course Summary */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                {homeCourses[selectedHomeCourse].badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue dark:text-white tracking-tight">
                {homeCourses[selectedHomeCourse].title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {homeCourses[selectedHomeCourse].desc}
              </p>

              {/* Course Duration & Highlights bullets */}
              <div className="grid grid-cols-2 gap-2 border-y border-gray-100 dark:border-white/5 py-4 text-xs font-bold text-brand-blue dark:text-white">
                {homeCourses[selectedHomeCourse].highlights.map((h, i) => (
                  <div key={i}>{h}</div>
                ))}
              </div>

              {/* Program features */}
              <div className="space-y-3 pt-2">
                {homeCourses[selectedHomeCourse].features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                      <CheckCircle size={14} />
                    </div>
                    <span className="text-sm font-semibold text-brand-charcoal dark:text-white">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold px-6 py-3 rounded-full text-sm transition hover-lift shadow-md"
                >
                  Explore Course
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-6 py-3 rounded-full text-sm transition shadow-lg animate-enroll"
                >
                  Enroll Now
                </Link>
              </div>
            </div>

            {/* Interactive Syllabus Builder */}
            <div className="lg:col-span-7 bg-brand-gray/30 dark:bg-white/5 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-xl p-6 space-y-4">
              <h3 className="font-bold text-lg text-brand-blue dark:text-white text-left">Curriculum Highlights</h3>
              
              <div className="space-y-3">
                {homeCourses[selectedHomeCourse].modules.map((mod, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveModule(idx)}
                    className={`p-4 rounded-xl border transition cursor-pointer text-left ${
                      activeModule === idx
                        ? "border-brand-orange bg-brand-orange/5"
                        : "border-gray-100 dark:border-white/5 bg-white dark:bg-brand-gray hover:bg-gray-100/50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-brand-blue dark:text-white">{mod.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        activeModule === idx ? "bg-brand-orange text-white" : "bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300"
                      }`}>
                        Step 0{idx + 1}
                      </span>
                    </div>

                    {activeModule === idx && (
                      <div className="mt-3 space-y-3 animate-fadeIn">
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                          {mod.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {mod.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="text-[10px] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-brand-blue dark:text-white font-semibold px-2 py-0.5 rounded-md">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Upcoming courses waitlist box */}
          <div className="mt-12 p-8 bg-brand-gray/30 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">🚀 Upcoming Courses</span>
              <h4 className="text-lg font-black text-brand-blue dark:text-white mt-1">Ready to scale further? New courses coming soon:</h4>
              <p className="text-xs text-gray-400 mt-1">Adobe Premiere Pro • Adobe After Effects • DaVinci Resolve</p>
            </div>
            <Link
              href="/courses"
              className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-3 px-6 rounded-xl text-xs whitespace-nowrap shadow-md"
            >
              Join Course Waiting Lists
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Student Learning Journey */}
      <section className="py-12 md:py-20 bg-brand-gray/30 dark:bg-white/5 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Curriculum Roadmap
            </h3>
            <h2 className="text-3xl font-black text-brand-blue dark:text-white tracking-tight">
              🚀 Student Learning Journey
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The exact step-by-step 10-phase roadmap that our students follow to build their creator pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start mt-8">
            
            {/* Left High-Impact Student Success Image Card Column */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 h-fit text-left">
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-video sm:aspect-square border border-gray-200/50 dark:border-white/5 relative group">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80"
                  alt="Creators Team Success and Achievements"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                {/* Premium dark gradient overlay with dynamic milestones */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050c21]/95 via-black/35 to-transparent flex flex-col justify-end p-6">
                  <div className="text-white space-y-2 text-left">
                    <span className="text-[10px] font-black bg-brand-orange text-white px-2.5 py-1 rounded uppercase tracking-widest w-fit inline-block">
                      Milestone Achieved
                    </span>
                    <h4 className="text-base sm:text-lg font-black tracking-tight leading-tight">
                      Empowering 1,000+ Creators Annually
                    </h4>
                    <p className="text-[11px] sm:text-xs text-white/80 font-medium leading-relaxed">
                      From zero subscribers to full-time career independence. Our roadmap takes students through scripting, shooting, viral edits, and brand deal pitching.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Success callout card */}
              <div className="bg-white dark:bg-[#131b2e] border border-gray-200/50 dark:border-white/5 p-6 rounded-3xl shadow-md space-y-3">
                <h4 className="font-black text-sm text-brand-blue dark:text-white flex items-center gap-2">
                  <span>🏆</span> Reach Your Summit
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  No shortcut leads to 100K+ subscribers or paid commercial editing gigs. Follow our tested roadmap, complete the tasks, and achieve creative independence.
                </p>
              </div>
            </div>

            {/* Right Roadmap Timeline Column */}
            <div className="lg:col-span-7">
              <div className="relative border-l-2 border-brand-blue/20 ml-4 space-y-12 text-left">
                {journeySteps.map((step, idx) => (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-brand-blue border-4 border-white dark:border-[#090d16] flex items-center justify-center text-white text-xs font-bold shadow-md">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">{step.step}</span>
                      <h3 className="text-lg font-bold text-brand-blue dark:text-white flex items-center gap-2">
                        <span className="text-xl shrink-0">{step.icon}</span>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Learning outcomes checklist */}
          <div className="mt-16 bg-white dark:bg-brand-gray border border-gray-100 dark:border-white/5 p-8 rounded-3xl text-left space-y-6">
            <h3 className="text-lg font-black text-brand-blue dark:text-white">🎯 Course Outcomes</h3>
            <p className="text-xs text-gray-400">By the end of the course, you'll be able to confidently:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {outcomesList.map((outcome, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-brand-charcoal dark:text-white">
                  <span className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">✓</span>
                  {outcome}
                </div>
              ))}
            </div>

            <div className="text-center pt-4 font-bold text-brand-orange text-xs uppercase tracking-widest">
              Learn. Create. Grow. 🚀
            </div>
          </div>

        </div>
      </section>

      {/* 5. Statistics (Creators College in Numbers) */}
      <section className="py-12 md:py-20 bg-white dark:bg-[#090d16] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side values grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                { val: "2,000+", label: "Business Projects Completed" },
                { val: "100+", label: "Brands Worked With" },
                { val: "5+ Years", label: "Industry Experience" },
                { val: "500M+", label: "Content Views Overall" },
                { val: "8L+", label: "Social Media Community Built" },
                { val: "100%", label: "Practical Learning Approach" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-brand-gray/30 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-6 rounded-2xl space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-brand-orange">{stat.val}</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 font-bold leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Right side copy block */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">📊 Creators College in Numbers</span>
              <h2 className="text-3xl font-black text-brand-blue dark:text-white tracking-tight">Real Experience. Real Results.</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                Our industry experience is built on years of working with businesses, creating content, and helping brands grow through digital media.
              </p>
              
              <div className="border-l-4 border-brand-orange pl-4 bg-brand-gray/30 dark:bg-white/5 py-4 px-3 rounded-r-xl">
                <h4 className="text-xs font-bold text-brand-blue dark:text-white uppercase tracking-wider mb-1">Why These Numbers Matter</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Every lesson at Creators College is backed by real-world experience. Instead of learning only theory, you'll learn proven strategies developed through thousands of business projects, hundreds of brand collaborations, and millions of content views across social media platforms.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Brands Marquee wall */}
      <section className="py-12 bg-white dark:bg-[#090d16] border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">🤝 Brands We've Worked With</span>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-3 max-w-2xl mx-auto">
              Over the past 5+ years, our founder has worked with businesses across multiple industries through Content Creation, Instagram Reels, YouTube Videos, Influencer Marketing, Social Media Management, and Digital Branding. This real-world experience is now brought into every course.
            </p>
          </div>
          
          {/* Scrollable Badges Marquee */}
          <BrandsMarquee />

          <p className="text-[10px] text-gray-400 max-w-lg mx-auto leading-relaxed mt-4">
            The brands displayed represent businesses our founder has worked with through content creation, influencer marketing, social media management, and digital branding projects. They are showcased to highlight our portfolio and industry experience.
          </p>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-12 md:py-20 bg-brand-gray/30 dark:bg-white/5 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">🎥 Creator Showcases</span>
            <h2 className="text-3xl font-black text-brand-blue dark:text-white">Watch Our Portfolio Masterclasses</h2>
            <p className="text-xs sm:text-sm text-gray-400">See real-world edits, shorts, and reels generated by our team.</p>
          </div>
          <VideoGallery />
        </div>
      </section>

      {/* 7. Categorized FAQ Section */}
      <section className="py-12 md:py-20 bg-white dark:bg-[#090d16] text-left">
        <div className="max-w-5xl mx-auto px-4">
          
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">FAQ</span>
            <h2 className="text-3xl font-black text-brand-blue dark:text-white tracking-tight">Creators College &ndash; Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left sidebar tab category selectors */}
            <div className="md:col-span-4 flex flex-col gap-2">
              {Object.entries(faqCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => { setActiveFaqTab(key); setActiveFAQ(null); }}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-left transition duration-150 cursor-pointer ${
                    activeFaqTab === key
                      ? "bg-brand-blue text-white shadow-md"
                      : "bg-brand-gray/30 dark:bg-white/5 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Right side collapsible items list */}
            <div className="md:col-span-8 space-y-3">
              {activeFaqItems.map((faq, idx) => (
                <div key={idx} className="border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full px-6 py-4 bg-brand-gray/30 dark:bg-white/5 hover:bg-brand-gray/50 dark:hover:bg-white/10 flex justify-between items-center text-left transition"
                  >
                    <span className="font-bold text-xs sm:text-sm text-brand-blue dark:text-white">{faq.q}</span>
                    <span className="text-brand-orange font-bold text-lg">{activeFAQ === idx ? "−" : "+"}</span>
                  </button>
                  {activeFAQ === idx && (
                    <div className="px-6 py-4 bg-white dark:bg-[#090d16] border-t border-gray-50 dark:border-white/5 animate-fadeIn">
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. Contact CTA Section */}
      <section id="contact-section" className="py-12 md:py-20 bg-brand-blue text-white relative overflow-hidden text-left border-t border-brand-blue-dark">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* CTA copy details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black uppercase bg-brand-orange text-white py-1 px-3 rounded-full">🚀 Start Your Content Creation Journey Today</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-snug">
                Turn Your Passion into a Profession with Creators College
              </h2>
              <p className="text-sm text-white/80 leading-relaxed font-normal">
                Join our Complete Telugu Content Creation Course and Complete Telugu CapCut Video Editing Course. Learn practical skills through step-by-step Telugu training, real-world projects, and expert guidance.
              </p>

              <div className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
                <h4 className="text-sm font-bold text-brand-orange">🎯 What You'll Get</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/80">
                  <div>✓ Live Online &amp; Offline Classes</div>
                  <div>✓ Lifetime Course Recordings</div>
                  <div>✓ Course Completion Certificate</div>
                  <div>✓ Real Business Projects &amp; Support</div>
                  <div>✓ Lifetime Community Access</div>
                  <div>✓ Personal Branding client acquisition</div>
                </div>
              </div>

              {/* Business contact info */}
              <div className="flex flex-wrap gap-6 text-xs text-white/70 pt-2 font-bold">
                <a href="tel:+918143937367" className="flex items-center gap-2 hover:text-brand-orange transition">
                  <Phone size={14} />
                  Call / WhatsApp: +91 81439 37367
                </a>
                <a href="mailto:info@creatorscollege.in" className="flex items-center gap-2 hover:text-brand-orange transition">
                  <Mail size={14} />
                  Email: info@creatorscollege.in
                </a>
              </div>
            </div>

            {/* Sidebar quick form */}
            <div className="lg:col-span-5 w-full">
              <LeadForm defaultCourse="Complete Telugu Content Creation Course" isLandingPage={true} />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
