"use client";

import { useState } from "react";
import Link from "next/link";
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
      {/* 1. Hero Section */}
      <section 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80')" }}
        className="relative bg-cover bg-center text-white pt-24 pb-20 md:py-32 overflow-hidden"
      >
        {/* Overlay and Glow Effects */}
        <div className="absolute inset-0 bg-black/60 dark:bg-black/85" />
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold tracking-wider text-brand-orange uppercase animate-pulse">
                <Sparkles size={14} />
                🎓 Learn Content Creation &amp; Video Editing in Telugu
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
                India's Practical Content Creation <br />
                <span className="text-brand-orange">Academy for Future Creators</span>
              </h1>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
                Master Content Creation, CapCut Video Editing (Mobile &amp; PC), Instagram Reels, YouTube Videos, Facebook Content, Scripting, Mobile Video Shooting, Social Media Page Management, and Account Growth through practical, step-by-step training in Telugu.
              </p>

              <p className="text-xs sm:text-sm text-white/70 italic">
                Whether you're a student, job seeker, business owner, freelancer, or an aspiring content creator, Creators College gives you the skills to create professional content, build your personal brand, and earn through social media.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/checkout"
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3.5 rounded-full transition duration-300 hover-lift shadow-lg hover:shadow-brand-orange/30 flex items-center gap-2"
                >
                  Enroll Now
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/lp/free-demo"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5 rounded-full transition duration-200 flex items-center gap-2"
                >
                  <Video size={18} />
                  Book a Free Demo Class
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="pt-6 flex items-center gap-3 border-t border-white/10 max-w-md">
                <div className="flex -space-x-2">
                  <span className="w-8 h-8 rounded-full bg-brand-orange border-2 border-brand-blue flex items-center justify-center font-bold text-xs">A</span>
                  <span className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-brand-blue flex items-center justify-center font-bold text-xs">V</span>
                  <span className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-brand-blue flex items-center justify-center font-bold text-xs">K</span>
                </div>
                <div className="text-xs text-white/70">
                  Joined by <strong className="text-white font-semibold">1,200+ students</strong> and business owners across Andhra &amp; Telangana.
                </div>
              </div>
            </div>

            {/* Hero Interactive Workspace Mockup */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <div className="relative w-full max-w-md bg-brand-charcoal/90 rounded-2xl border border-white/10 shadow-2xl p-4 space-y-4 hover:border-brand-orange/40 transition duration-300">
                {/* Window buttons */}
                <div className="flex gap-1.5 border-b border-white/5 pb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-[10px] text-gray-500 ml-2 font-mono">creator_workspace.prproj</span>
                </div>

                {/* Main Video Frame Mock */}
                <div className="aspect-video bg-black rounded-lg overflow-hidden relative flex items-center justify-center group border border-white/5 cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?auto=format&fit=crop&w=800&q=80"
                    alt="Content Creator Workspace"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4 z-10">
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-extrabold uppercase bg-brand-orange text-white px-2 py-0.5 rounded-full">Telugu Content Creation</span>
                      <h4 className="text-sm font-bold text-white">How to Edit High-Retention Reels</h4>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brand-orange/95 flex items-center justify-center text-white shadow-lg cursor-pointer group-hover:scale-110 transition duration-200 z-20">
                    <Play size={20} fill="currentColor" className="ml-1" />
                  </div>
                </div>

                {/* Timeline mock */}
                <div className="space-y-2 pt-2 text-left">
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>00:00:15:02</span>
                    <span>00:01:30:00</span>
                  </div>
                  <div className="h-6 w-full bg-white/5 rounded relative flex items-center overflow-hidden border border-white/5">
                    <div className="absolute left-0 w-1/3 h-full bg-brand-blue/60 border-r border-white/10" />
                    <div className="absolute left-1/3 w-1/4 h-full bg-brand-orange/60 border-r border-white/10" />
                    <div className="absolute left-[58%] w-1/6 h-full bg-emerald-600/60 border-r border-white/10" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500 shadow-md" />
                  </div>
                </div>

                {/* Editor labels */}
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Award size={14} className="text-brand-orange" />
                    Practical Curriculum
                  </span>
                  <span className="text-brand-orange font-bold">Join Batch &amp; Go Live &rarr;</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Why Creators College */}
      <section className="py-20 bg-brand-gray/30 dark:bg-white/5 border-y border-gray-100 dark:border-white/5 text-left">
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
      <section className="py-20 bg-white dark:bg-[#090d16]">
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
                  className="inline-flex items-center justify-center bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-6 py-3 rounded-full text-sm transition shadow-lg"
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
      <section className="py-20 bg-brand-gray/30 dark:bg-white/5 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          
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

          <div className="relative border-l-2 border-brand-blue/20 ml-4 md:ml-32 space-y-12 text-left">
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
      <section className="py-20 bg-white dark:bg-[#090d16] text-left">
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
      <section className="py-20 bg-brand-gray/30 dark:bg-white/5 border-y border-gray-100 dark:border-white/5">
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
      <section className="py-20 bg-white dark:bg-[#090d16] text-left">
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
      <section className="py-20 bg-brand-blue text-white relative overflow-hidden text-left border-t border-brand-blue-dark">
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
