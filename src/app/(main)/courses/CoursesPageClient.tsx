"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Calendar, Laptop, Clock, Award, HelpCircle, CheckCircle } from "lucide-react";
import LeadForm from "@/components/LeadForm";

interface SyllabusModule {
  title: string;
  lessons: string[];
}

export default function CoursesPage() {
  const [activeCourseId, setActiveCourseId] = useState<string>("creation");
  const [activeSyllabusIndex, setActiveSyllabusIndex] = useState<number>(0);
  const [waitlistCourse, setWaitlistCourse] = useState<string | null>(null);

  // FAQ Accordion states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Waitlist form states
  const [waitlistName, setWaitlistName] = useState("");
  const [waitlistPhone, setWaitlistPhone] = useState("");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistCity, setWaitlistCity] = useState("");
  const [waitlistProfession, setWaitlistProfession] = useState("");
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistName || !waitlistPhone || !waitlistCity) return;

    // Send lead to Google Sheets API
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: waitlistName,
          phone: waitlistPhone,
          email: waitlistEmail || "N/A",
          course: waitlistCourse || "General Course Waitlist",
          message: `City: ${waitlistCity} | Profession: ${waitlistProfession || "N/A"}`,
          source: `Course Page Waitlist Form`,
          type: "enrollment",
        }),
      });
    } catch (err) {
      console.error("Failed to post waitlist lead to Google Sheets:", err);
    }

    // Save lead details
    const savedWaitlists = JSON.parse(localStorage.getItem("course_waitlists") || "[]");
    savedWaitlists.push({
      name: waitlistName,
      phone: waitlistPhone,
      email: waitlistEmail,
      city: waitlistCity,
      profession: waitlistProfession,
      course: waitlistCourse,
      time: new Date().toLocaleString(),
    });
    localStorage.setItem("course_waitlists", JSON.stringify(savedWaitlists));

    setWaitlistSuccess(true);
    setTimeout(() => {
      setWaitlistSuccess(false);
      setWaitlistCourse(null);
      setWaitlistName("");
      setWaitlistPhone("");
      setWaitlistEmail("");
      setWaitlistCity("");
      setWaitlistProfession("");
    }, 4000);
  };

  const contentCreationSyllabus: SyllabusModule[] = [
    { title: "Module 1 – Content Creation Fundamentals", lessons: ["Understanding Content Creation", "Social Media Platforms Overview", "Choosing the Right Niche", "Content Strategy Mapping"] },
    { title: "Module 2 – Content Research & Scripting", lessons: ["Advanced Content Research", "Script Writing Frameworks", "Pacing & Storytelling Techniques", "High-Retention Hook Creation"] },
    { title: "Module 3 – Voice Over & Communication", lessons: ["Voice Recording Techniques", "Speaking with On-Camera Confidence", "Teleprompter & Camera Communication"] },
    { title: "Module 4 – Mobile Video Shooting", lessons: ["Mobile Camera Professional Settings", "Three-Point Lighting Techniques", "Cinematic Camera Angles & Pans", "Audio Recording & Hardware Setup", "Hands-on Video Shooting Assignments"] },
    { title: "Module 5 – Video Editing (Mobile & PC)", lessons: ["Professional Editing Workflow", "CapCut Editing Fundamentals", "Adding Keyframe Transitions & Effects", "Dynamic Text, Titles & Auto Captions", "Background Music Ducking & Enhancements", "Color Grading & Filter Effects", "Optimized Video Export Settings"] },
    { title: "Module 6 – Social Media Account Creation", lessons: ["Instagram Professional Profile Setup", "Facebook Page Branding Configuration", "YouTube Channel Creation & Verification", "Bio and Profile Optimization"] },
    { title: "Module 7 – Social Media Page Management", lessons: ["Publishing Timelines & Uploading Guide", "Content Calendars & Scheduling", "Audience Comment & Engagement Strategies", "Multi-Platform Page Management"] },
    { title: "Module 8 – Social Media Growth", lessons: ["Instagram Reels Algorithm Growth Tips", "YouTube Search & Suggestion SEO", "Facebook Organic reach scaling", "Organic Traffic Strategies", "Personal Branding Fundamentals"] },
    { title: "Module 9 – Freelancing & Client Acquisition", lessons: ["Building a Video Editor Portfolio", "Local & Global Client Acquisition", "Pricing Your Content Services", "Earning Streams Through Creators Economy"] }
  ];

  const capcutSyllabus: SyllabusModule[] = [
    { title: "Module 1 – Introduction to Video Editing", lessons: ["Understanding Video Editing Rules", "Types of Video Content & Formats", "Standard Editing Workflow", "Mobile vs PC Editing Interfaces"] },
    { title: "Module 2 – CapCut Installation & VPN Setup", lessons: ["Downloading CapCut Mobile & Desktop", "VPN Installation & Connection Setup", "Creating a CapCut Cloud Account", "Free vs Pro version highlights", "CapCut interface and layout"] },
    { title: "Module 3 – Professional Editing Basics", lessons: ["Importing Assets & Video Formats", "Timeline navigation rules", "Trim, split, crop, and cut tools", "Multi-layer track editing", "Speed control & curve adjustment", "Reverse & freeze-frame effects", "Managing multiple projects"] },
    { title: "Module 4 – Advanced Editing Techniques", lessons: ["Applying Professional Transitions", "Keyframe Position/Scale Animation", "Zoom & Pan Effects", "Smooth Motion Effects & Tracking", "Advanced Video Overlay layouts"] },
    { title: "Module 5 – Text, Titles & Captions", lessons: ["Creating Professional Title Screens", "Animated Subtitles & Font Selection", "CapCut Auto-Captions Generation", "Subtitle text styles & design cards"] },
    { title: "Module 6 – Audio Editing", lessons: ["Selecting Royalty-Free Background Music", "Voice Over Recording & Enhancements", "Background Noise Removal", "Audio & Video Timeline Synchronization", "Applying sound effects (SFX) for pacing"] },
    { title: "Module 7 – Color Correction & AI Features", lessons: ["Color Grading: HSL & Curves", "Adjusting Brightness & Contrast", "Applying Aesthetic Cinematic Filters", "AI Background Removal & Cutouts", "AI Body & Face Enhancements", "AI-Powered Smart Effects"] },
    { title: "Module 8 – Social Media Video Editing", lessons: ["Editing Widescreen YouTube Videos", "Editing Portrait Instagram Reels & Shorts", "Talking-head Video Pacing cuts", "Business promotional ads & edits", "Travel & product showcases"] },
    { title: "Module 9 – Export & Delivery", lessons: ["Choosing Best Export Settings", "High Definition, 2K & 4K exports", "Compression and file formats", "Watermark-free export setup", "Organized client deliverable exports"] },
    { title: "Module 10 – Freelancing & Career Growth", lessons: ["Building your editing showreel", "Finding client work on Upwork & Fiverr", "Pricing structure for editing", "Client communication & contract rules"] }
  ];

  const contentCreationFaqs = [
    { q: "Is this course suitable for beginners?", a: "Yes. The course is specially designed for complete beginners and taught step by step in Telugu." },
    { q: "Do I need a laptop?", a: "No. You can complete the entire content creation course using just your mobile phone. A laptop is optional but recommended." },
    { q: "Can I join online?", a: "Yes. We offer interactive live online batches that you can attend from anywhere." },
    { q: "Will I receive a certificate?", a: "Yes. Students who successfully complete the course modules and practical assignments will receive a Course Completion Certificate." },
    { q: "Will I get lifetime recordings?", a: "Yes. Every student receives lifetime access to all live class recordings." },
    { q: "Will I learn freelancing?", a: "Yes. We include a full module on portfolio building, setting up freelance accounts, and client contracts." },
    { q: "Will I learn how to get clients?", a: "Yes. We teach you step-by-step methods to approach businesses, pitch content strategy, and acquire paid clients." }
  ];

  const capcutFaqs = [
    { q: "Is this course suitable for beginners?", a: "Yes. This course is specially designed for complete beginners with no prior video editing experience." },
    { q: "Can I learn using only a mobile phone?", a: "Yes. You can complete the entire course using only an Android phone or iPhone. A laptop is recommended but completely optional." },
    { q: "Will I receive lifetime recordings?", a: "Yes. Every student gets lifetime access to all CapCut video editing recordings." },
    { q: "Do I need the CapCut Paid Version?", a: "No. Purchasing the paid version is optional. However, the course is taught using the Paid version to cover all premium AI effects and transition assets." },
    { q: "Will I receive a certificate?", a: "Yes. Students who submit all project assignments will receive an Academy Course Completion Certificate." },
    { q: "Will I learn how to earn through video editing?", a: "Yes. We teach portfolio building, client acquisition, freelancing platform setups, and pricing video editing services." }
  ];

  return (
    <div className="w-full bg-white dark:bg-[#090d16]">
      {/* Hero Header */}
      <section 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80')" }}
        className="relative bg-cover bg-center text-white py-12 md:py-20 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/45 dark:bg-black/70" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-xs font-bold uppercase bg-brand-orange text-white px-3 py-1 rounded-full">Telugu Training Academy</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Current &amp; Upcoming Courses
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
            At Creators College, our courses are designed to help you build real-world skills through practical learning, live projects, and step-by-step guidance.
          </p>
        </div>
      </section>

      {/* Course Selection Tabs */}
      <section className="py-12 bg-brand-gray/30 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange">Academic Catalog</h3>
            <h2 className="text-2xl font-black text-brand-blue dark:text-white">Select a Course to Explore</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => { setActiveCourseId("creation"); setActiveSyllabusIndex(0); setOpenFaqIndex(null); }}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                activeCourseId === "creation"
                  ? "bg-brand-blue text-white shadow-md"
                  : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/5 hover:bg-gray-50"
              }`}
            >
              🎬 Content Creation Course
            </button>
            <button
              onClick={() => { setActiveCourseId("capcut"); setActiveSyllabusIndex(0); setOpenFaqIndex(null); }}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                activeCourseId === "capcut"
                  ? "bg-brand-blue text-white shadow-md"
                  : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/5 hover:bg-gray-50"
              }`}
            >
              ✂️ CapCut Video Editing Course
            </button>
            <button
              onClick={() => { setActiveCourseId("premiere"); }}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                activeCourseId === "premiere"
                  ? "bg-brand-orange text-white shadow-md"
                  : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/5 hover:bg-gray-50"
              }`}
            >
              🚀 Adobe Premiere Pro (Soon)
            </button>
            <button
              onClick={() => { setActiveCourseId("aftereffects"); }}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                activeCourseId === "aftereffects"
                  ? "bg-brand-orange text-white shadow-md"
                  : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/5 hover:bg-gray-50"
              }`}
            >
              ✨ Adobe After Effects (Soon)
            </button>
            <button
              onClick={() => { setActiveCourseId("davinci"); }}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                activeCourseId === "davinci"
                  ? "bg-brand-orange text-white shadow-md"
                  : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/5 hover:bg-gray-50"
              }`}
            >
              🎨 DaVinci Resolve (Soon)
            </button>
          </div>
        </div>
      </section>

      {/* Main Course Details Section */}
      <section className="py-12 md:py-20 bg-white dark:bg-[#090d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 1. Complete Telugu Content Creation Course DETAILS */}
          {activeCourseId === "creation" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Syllabus and Modules */}
              <div className="lg:col-span-7 space-y-8 text-left animate-fadeIn">
                <div className="space-y-4">
                  <span className="text-xs font-black uppercase bg-green-500 text-white px-2.5 py-1 rounded-full">Current Course</span>
                  <h2 className="text-3xl font-extrabold text-brand-blue dark:text-white">Complete Telugu Content Creation Course</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    Learn Content Creation in Telugu – From Beginner to Professional. Build a successful career in Content Creation. Learn how to research content, write scripts, record voice-overs, shoot professional videos, edit content, publish on social media, manage pages, grow your audience, and build your personal brand through practical, step-by-step Telugu training.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-gray-100 dark:border-white/5 py-4 text-xs font-bold text-brand-charcoal dark:text-white">
                  <div>⏳ Duration: 20 Days</div>
                  <div>🌐 Mode: Live Online &amp; Offline</div>
                  <div>🗣️ Language: Telugu</div>
                  <div>📜 Certificate: Yes</div>
                </div>

                {/* Why Learn Content Creation */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white">🚀 Why Learn Content Creation?</h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Content creation is one of today's most in-demand digital skills. Businesses, influencers, educators, and professionals all need high-quality content to grow online. At Creators College, you'll learn the complete content creation workflow used by professionals—from planning and shooting to editing, publishing, and growing your social media presence.
                  </p>
                </div>

                {/* Detailed Module Selector */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white">📚 What You'll Learn ({contentCreationSyllabus.length} Modules)</h3>
                  <div className="flex flex-wrap gap-2">
                    {contentCreationSyllabus.map((mod, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSyllabusIndex(idx)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition cursor-pointer ${
                          activeSyllabusIndex === idx
                            ? "bg-brand-blue text-white"
                            : "bg-brand-gray dark:bg-white/5 text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        Module {idx + 1}
                      </button>
                    ))}
                  </div>

                  <div className="bg-brand-gray/30 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                    <h4 className="font-extrabold text-brand-blue dark:text-white border-b border-gray-200/50 dark:border-white/5 pb-2 mb-3">
                      {contentCreationSyllabus[activeSyllabusIndex].title}
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {contentCreationSyllabus[activeSyllabusIndex].lessons.map((lesson, lIdx) => (
                        <li key={lIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Who Can Join */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white">👨🎓 Who Can Join This Course?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {["Students", "Job Seekers", "Housewives", "Business Owners", "Working Professionals", "Freelancers", "Entrepreneurs", "YouTubers", "Instagram Creators", "Beginners"].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* What you'll receive */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white">📦 What You'll Receive</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "20-Day Practical Training",
                      "Lifetime Course Recordings",
                      "Course Completion Certificate",
                      "Real Business Projects",
                      "Practical Assignments",
                      "Lifetime Student Support",
                      "WhatsApp Community Access"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <CheckCircle size={14} className="text-brand-orange shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Opportunities */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white">💼 Career Opportunities</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Content Creator", "Social Media Manager", "Freelance Content Creator", "Video Content Specialist", "YouTube Creator", "Instagram Creator", "Personal Brand Consultant", "Digital Creator", "Business Content Strategist"].map((role, idx) => (
                      <span key={idx} className="text-xs bg-brand-blue/5 dark:bg-white/5 border border-gray-100 dark:border-white/5 px-3 py-1.5 rounded-full text-brand-blue dark:text-white font-bold">{role}</span>
                    ))}
                  </div>
                </div>

                {/* FAQs Section */}
                <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white">❓ Frequently Asked Questions</h3>
                  <div className="space-y-2">
                    {contentCreationFaqs.map((faq, idx) => (
                      <div key={idx} className="border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                          className="w-full px-5 py-3 bg-brand-gray/20 dark:bg-white/5 flex justify-between items-center text-left"
                        >
                          <span className="font-bold text-xs sm:text-sm text-brand-blue dark:text-white">{faq.q}</span>
                          <span className="text-brand-orange font-bold">{openFaqIndex === idx ? "−" : "+"}</span>
                        </button>
                        {openFaqIndex === idx && (
                          <div className="px-5 py-3 bg-white dark:bg-brand-gray border-t border-gray-50 dark:border-white/5">
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sidebar Signup & Payments */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="bg-brand-blue p-8 rounded-3xl text-white space-y-6 shadow-xl border border-brand-blue-dark relative overflow-hidden">
                  <span className="text-[10px] font-extrabold bg-brand-orange text-white py-1 px-3 rounded-full">Limited Launch Offer</span>
                  <div className="space-y-1 pt-2">
                    <div className="text-xs text-white/70 line-through">Original Value: ₹30,000</div>
                    <div className="text-3xl font-black text-brand-orange">₹5,000 <span className="text-xs text-white font-normal">one-time fee</span></div>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-orange">Course Highlights</div>
                  <ul className="text-xs space-y-2 text-white/80 border-t border-white/10 pt-4">
                    <li>✅ 20-Day Practical Training</li>
                    <li>✅ Live Online &amp; Offline Classes</li>
                    <li>✅ Lifetime Course Recordings</li>
                    <li>✅ Real Business Projects</li>
                    <li>✅ Course Completion Certificate</li>
                  </ul>
                  <div className="space-y-3 pt-2">
                    <Link
                      href="/checkout"
                      className="w-full inline-flex items-center justify-center bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg animate-enroll"
                    >
                      Enroll Now
                    </Link>
                    <Link
                      href="/lp/free-demo"
                      className="w-full inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 rounded-xl text-sm transition"
                    >
                      Book a Free Demo Class
                    </Link>
                  </div>
                </div>

                {/* Lead Form */}
                <LeadForm defaultCourse="Complete Telugu Content Creation Course" />
              </div>
            </div>
          )}

          {/* 2. Complete Telugu CapCut Video Editing Course DETAILS */}
          {activeCourseId === "capcut" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Syllabus and Modules */}
              <div className="lg:col-span-7 space-y-8 text-left animate-fadeIn">
                <div className="space-y-4">
                  <span className="text-xs font-black uppercase bg-green-500 text-white px-2.5 py-1 rounded-full">Current Course</span>
                  <h2 className="text-3xl font-extrabold text-brand-blue dark:text-white">Complete Telugu CapCut Video Editing Course (Mobile &amp; PC)</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    Learn Professional Video Editing in Telugu with CapCut – From Beginner to Advanced. Master CapCut Video Editing using both Mobile and PC with our practical, step-by-step Telugu training. Learn how to edit professional Instagram Reels, YouTube Videos, Facebook Videos, Advertisements, Business Promotional Videos, Talking Videos, Travel Videos, Product Videos, and Cinematic Content using CapCut.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-gray-100 dark:border-white/5 py-4 text-xs font-bold text-brand-charcoal dark:text-white">
                  <div>⏳ Duration: 20 Days</div>
                  <div>🌐 Mode: Live Online &amp; Offline</div>
                  <div>🗣️ Language: Telugu</div>
                  <div>📜 Certificate: Yes</div>
                </div>

                {/* Course Overview */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white">🎬 Course Overview</h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Video Editing is one of the most in-demand digital skills today. Every business, influencer, creator, and brand requires high-quality videos to attract audiences and grow online. The Complete Telugu CapCut Video Editing Course (Mobile &amp; PC) is designed to teach you professional editing techniques from scratch using CapCut. From installation to advanced editing, AI features, and freelancing, you'll learn everything required to become a confident video editor.
                  </p>
                </div>

                {/* Detailed Module Selector */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white">📚 What You'll Learn ({capcutSyllabus.length} Modules)</h3>
                  <div className="flex flex-wrap gap-2">
                    {capcutSyllabus.map((mod, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSyllabusIndex(idx)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition cursor-pointer ${
                          activeSyllabusIndex === idx
                            ? "bg-brand-blue text-white"
                            : "bg-brand-gray dark:bg-white/5 text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        Module {idx + 1}
                      </button>
                    ))}
                  </div>

                  <div className="bg-brand-gray/30 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                    <h4 className="font-extrabold text-brand-blue dark:text-white border-b border-gray-200/50 dark:border-white/5 pb-2 mb-3">
                      {capcutSyllabus[activeSyllabusIndex].title}
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {capcutSyllabus[activeSyllabusIndex].lessons.map((lesson, lIdx) => (
                        <li key={lIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Who Can Join */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white">👨🎓 Who Can Join This Course?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {["Students", "Job Seekers", "Housewives", "Business Owners", "Working Professionals", "Freelancers", "YouTubers", "Instagram Creators", "Social Media Managers", "Content Creators", "Beginners"].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* System requirements info */}
                <div className="bg-brand-gray/30 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-6 rounded-2xl space-y-3">
                  <h4 className="font-bold text-sm text-brand-blue dark:text-white">💻 System Requirements</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">You can learn using:</p>
                  <ul className="list-disc pl-5 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <li>Android Phone / iPhone</li>
                    <li>Windows Laptop / MacBook</li>
                    <li>Recommended Minimum: 4GB RAM &amp; 10GB Free Storage</li>
                  </ul>
                </div>

                {/* What you'll receive */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white">📦 What You'll Receive</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "20-Day Practical Training",
                      "Live Online Classes",
                      "Offline Classroom Training",
                      "Lifetime Course Recordings",
                      "Real Editing Projects",
                      "Practice Assignments",
                      "Course Completion Certificate",
                      "Lifetime Student Support",
                      "WhatsApp Community Access"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <CheckCircle size={14} className="text-brand-orange shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Opportunities */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white">💼 Career Opportunities</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Professional Video Editor", "CapCut Video Editor", "Freelance Video Editor", "Instagram Reels Editor", "YouTube Video Editor", "Social Media Video Editor", "Content Creator", "Business Video Editor", "Digital Marketing Video Editor", "Personal Brand Video Editor"].map((role, idx) => (
                      <span key={idx} className="text-xs bg-brand-blue/5 dark:bg-white/5 border border-gray-100 dark:border-white/5 px-3 py-1.5 rounded-full text-brand-blue dark:text-white font-bold">{role}</span>
                    ))}
                  </div>
                </div>

                {/* FAQs Section */}
                <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white">❓ Frequently Asked Questions</h3>
                  <div className="space-y-2">
                    {capcutFaqs.map((faq, idx) => (
                      <div key={idx} className="border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                          className="w-full px-5 py-3 bg-brand-gray/20 dark:bg-white/5 flex justify-between items-center text-left"
                        >
                          <span className="font-bold text-xs sm:text-sm text-brand-blue dark:text-white">{faq.q}</span>
                          <span className="text-brand-orange font-bold">{openFaqIndex === idx ? "−" : "+"}</span>
                        </button>
                        {openFaqIndex === idx && (
                          <div className="px-5 py-3 bg-white dark:bg-brand-gray border-t border-gray-50 dark:border-white/5">
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sidebar Signup & Payments */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="bg-brand-blue p-8 rounded-3xl text-white space-y-6 shadow-xl border border-brand-blue-dark relative overflow-hidden">
                  <span className="text-[10px] font-extrabold bg-brand-orange text-white py-1 px-3 rounded-full">Limited Launch Offer</span>
                  <div className="space-y-1 pt-2">
                    <div className="text-xs text-white/70 line-through">Original Value: ₹30,000</div>
                    <div className="text-3xl font-black text-brand-orange">₹5,000 <span className="text-xs text-white font-normal">one-time fee</span></div>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-orange">Course Highlights</div>
                  <ul className="text-xs space-y-2 text-white/80 border-t border-white/10 pt-4">
                    <li>✅ 20-Day Practical Training</li>
                    <li>✅ Mobile &amp; PC Editing</li>
                    <li>✅ Real Project-Based Learning</li>
                    <li>✅ Lifetime Course Recordings</li>
                    <li>✅ Course Completion Certificate</li>
                  </ul>
                  <div className="space-y-3 pt-2">
                    <Link
                      href="/checkout"
                      className="w-full inline-flex items-center justify-center bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg animate-enroll"
                    >
                      Enroll Now
                    </Link>
                    <Link
                      href="/lp/free-demo"
                      className="w-full inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 rounded-xl text-sm transition"
                    >
                      Book a Free Demo Class
                    </Link>
                  </div>
                </div>

                {/* Lead Form */}
                <LeadForm defaultCourse="Complete Telugu CapCut Video Editing Course (Mobile & PC)" />
              </div>
            </div>
          )}

          {/* 3. Upcoming Courses: Adobe Premiere Pro, After Effects, DaVinci Resolve */}
          {(activeCourseId === "premiere" || activeCourseId === "aftereffects" || activeCourseId === "davinci") && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-fadeIn">
              
              {/* Left Column Information */}
              <div className="lg:col-span-7 text-left space-y-6">
                <span className="text-xs font-black uppercase bg-brand-orange text-white px-2.5 py-1 rounded-full">Coming Soon</span>
                
                {activeCourseId === "premiere" && (
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-brand-blue dark:text-white">Complete Telugu Adobe Premiere Pro Course</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                      We're building a comprehensive Telugu Adobe Premiere Pro Course designed to help beginners and professionals master industry-standard video editing used by filmmakers, YouTubers, content creators, agencies, and production houses. Our curriculum is currently under development to ensure you receive practical, project-based training with the latest editing techniques.
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-brand-blue dark:text-white uppercase tracking-wider">🚀 What You'll Learn:</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        Professional Video Editing Workflow • Adobe Premiere Pro Interface • Timeline Editing • Multi-Camera Editing • Professional Transitions • Motion Graphics Integration • Audio Editing &amp; Mixing • Color Correction &amp; Color Grading • Cinematic Editing • Green Screen Editing • YouTube &amp; Reels Editing • Export Settings • Freelancing &amp; Career Guidance.
                      </p>
                    </div>
                  </div>
                )}

                {activeCourseId === "aftereffects" && (
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-brand-blue dark:text-white">Complete Telugu Adobe After Effects Course</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                      Learn Motion Graphics, Visual Effects &amp; Animation in Telugu. The Complete Telugu Adobe After Effects Course is coming soon at Creators College. Learn professional Motion Graphics, Visual Effects (VFX), Logo Animation, Text Animation, YouTube Intro Animation, Instagram Reels Animation, 2D Motion Design, and Cinematic Effects through practical Telugu training.
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-brand-blue dark:text-white uppercase tracking-wider">🚀 What You'll Learn:</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        Adobe After Effects Interface • Motion Graphics Fundamentals • Logo Animation • Text Animation • Shape Layers • Keyframe Animation &amp; Graph Editor • Masking Techniques • Motion Tracking • Green Screen (Keying) • Visual Effects (VFX) • Camera &amp; 3D Layers • Particle Effects • Kinetic Typography • AI-Powered Motion Graphics • Rendering &amp; Export • Freelancing &amp; Career Guidance.
                      </p>
                    </div>
                  </div>
                )}

                {activeCourseId === "davinci" && (
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-brand-blue dark:text-white">Complete Telugu DaVinci Resolve Course</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                      Learn Professional Video Editing &amp; Color Grading in Telugu. The Complete Telugu DaVinci Resolve Course is coming soon at Creators College. Learn Professional Video Editing, Advanced Color Grading, Color Correction, Audio Editing, Motion Graphics, Fusion Visual Effects, YouTube Video Editing, Instagram Reels, Film Editing, and Cinematic Post-Production through practical Telugu training.
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-brand-blue dark:text-white uppercase tracking-wider">🚀 What You'll Learn:</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        DaVinci Resolve Interface &amp; Project Setup • Professional Video Editing &amp; Multi-Cam • Audio Editing &amp; Fairlight • Color Correction &amp; Advanced Color Grading • LUTs &amp; Cinematic Looks • Fusion Motion Graphics &amp; VFX • Green Screen Editing • YouTube &amp; Reels workflows • Film Editing • Export Settings • Client Delivery &amp; Freelancing.
                      </p>
                    </div>
                  </div>
                )}

                <div className="border-l-4 border-brand-orange pl-4 bg-brand-gray/30 dark:bg-white/5 py-4 px-3 rounded-r-xl">
                  <h4 className="text-xs font-bold text-brand-orange uppercase tracking-wide">Waiting List Benefits</h4>
                  <ul className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed list-disc pl-4 space-y-1">
                    <li>Be the first to receive launch updates</li>
                    <li>Access early bird launch discounts</li>
                    <li>Secure invites to free demo sessions</li>
                    <li>Gain bonus learning resources</li>
                  </ul>
                </div>
              </div>

              {/* Right Column Waiting List Form */}
              <div className="lg:col-span-5 bg-white dark:bg-brand-gray p-6 sm:p-8 rounded-3xl border border-brand-blue/15 shadow-xl text-left">
                {waitlistSuccess ? (
                  <div className="text-center py-12 space-y-4">
                    <span className="text-4xl">🎉</span>
                    <h3 className="text-xl font-bold text-brand-blue dark:text-white">Added to Waitlist!</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Thank you. We have saved your preferences. Our coordinator will contact you as soon as the course goes live.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-brand-blue dark:text-white">Join the Waiting List</h3>
                      <p className="text-xs text-gray-400">Secure early discounts and exclusive launch deals.</p>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Your Name</label>
                      <input
                        type="text"
                        required
                        value={waitlistName}
                        onChange={(e) => setWaitlistName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none dark:bg-[#090d16] dark:text-white"
                        placeholder="e.g. Anand Rao"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={waitlistPhone}
                        onChange={(e) => setWaitlistPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none dark:bg-[#090d16] dark:text-white"
                        placeholder="e.g. 9876543210"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none dark:bg-[#090d16] dark:text-white"
                        placeholder="e.g. anand@example.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">City</label>
                        <input
                          type="text"
                          required
                          value={waitlistCity}
                          onChange={(e) => setWaitlistCity(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none dark:bg-[#090d16] dark:text-white"
                          placeholder="e.g. Hyderabad"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Profession</label>
                        <input
                          type="text"
                          value={waitlistProfession}
                          onChange={(e) => setWaitlistProfession(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none dark:bg-[#090d16] dark:text-white"
                          placeholder="e.g. Student"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      onClick={() => setWaitlistCourse(activeCourseId)}
                      className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 rounded-xl text-xs transition shadow-lg text-center cursor-pointer uppercase tracking-wider"
                    >
                      Notify Me When Course Launches
                    </button>
                  </form>
                )}
              </div>

            </div>
          )}

        </div>
      </section>

      {/* Trust factors bottom banner */}
      <section className="py-16 bg-brand-gray/30 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h3 className="text-xl font-extrabold text-brand-blue dark:text-white">Why Learn Content Creation at Creators College?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div className="p-4 bg-white dark:bg-[#090d16] border border-gray-100 dark:border-white/5 rounded-xl space-y-1">
              <span className="text-lg">🔥</span>
              <h4 className="font-bold text-xs text-brand-blue dark:text-white">2,000+ Projects</h4>
              <p className="text-[10px] text-gray-400">Trained with real-world case studies.</p>
            </div>
            <div className="p-4 bg-white dark:bg-[#090d16] border border-gray-100 dark:border-white/5 rounded-xl space-y-1">
              <span className="text-lg">🤝</span>
              <h4 className="font-bold text-xs text-brand-blue dark:text-white">100+ Brands</h4>
              <p className="text-[10px] text-gray-400">Strong partner network for jobs.</p>
            </div>
            <div className="p-4 bg-white dark:bg-[#090d16] border border-gray-100 dark:border-white/5 rounded-xl space-y-1">
              <span className="text-lg">📈</span>
              <h4 className="font-bold text-xs text-brand-blue dark:text-white">500M+ Views</h4>
              <p className="text-[10px] text-gray-400">Learn strategies that get viral reach.</p>
            </div>
            <div className="p-4 bg-white dark:bg-[#090d16] border border-gray-100 dark:border-white/5 rounded-xl space-y-1">
              <span className="text-lg">🎙️</span>
              <h4 className="font-bold text-xs text-brand-blue dark:text-white">Live Reviews</h4>
              <p className="text-[10px] text-gray-400">Weekly live class doubts &amp; assignments.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
