import React from "react";
import { Award, Eye, Rocket, CheckSquare, Target, BookOpen, Users, Star, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Creators College | Telugu Content Creation & Editing Academy",
  description: "Learn the story behind Creators College. Empowering students, professionals, and businesses with professional content creation, CapCut video editing, and digital marketing skills in Telugu.",
  keywords: [
    "About Creators College",
    "Cecil Kumar",
    "Telugu Content Creation Academy",
    "Video Editing Institute Hyderabad",
    "Telugu Creator Academy"
  ]
};

export default function AboutPage() {
  const teachTopics = [
    { title: "Content Creation", desc: "Core concepts of planning, building, and launching creative content." },
    { title: "Planning & Scripting", desc: "How to design high-retention hook structures and scripts in Telugu." },
    { title: "Professional Shooting", desc: "Framing, exposure settings, composition, and budget lighting setups." },
    { title: "Mobile & PC Video Editing", desc: "Mastering pacing, transitions, overlay cards, and caption cuts." },
    { title: "Page Management & Setup", desc: "Optimizing bios, tagging strategies, and content distribution calendars." }
  ];

  const currentCourses = [
    "Content Creation Course",
    "CapCut Video Editing (Mobile & PC)"
  ];

  const upcomingCourses = [
    "Adobe Premiere Pro",
    "Adobe After Effects",
    "DaVinci Resolve"
  ];

  return (
    <div className="w-full bg-white dark:bg-[#090d16]">
      {/* Page Header Banner */}
      <section 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=1200&q=80')" }}
        className="relative bg-cover bg-center text-white py-12 md:py-20 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/50 dark:bg-black/75" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            About Creators College
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed font-medium">
            Learn. Create. Grow. Turn ideas into viral content with practical, step-by-step training.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-10 md:py-20 bg-white dark:bg-[#090d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            
            {/* Left Story Column */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Our Foundation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue dark:text-white tracking-tight">
                Learn. Create. Grow.
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-4 leading-relaxed font-normal">
                <p>
                  Creators College is a practical Content Creation Academy built for anyone who wants to start creating content on social media. We believe that talent has no age, language, or background limits. If you have the passion to create, we provide the practical skills to turn your ideas into highly engaging, impactful content.
                </p>
                <p>
                  Many people dream of becoming content creators, but don't know where to begin. Questions like <em>What should I shoot? How do I edit? Which platform should I use? How do I post consistently?</em> stop thousands of aspiring creators from taking their first step.
                </p>
                <p>
                  Creators College was established to solve exactly these challenges.
                </p>
                <p>
                  We teach everything from the ground up—from planning content ideas and scripting to shooting professional videos, editing, page management, and publishing across social media platforms. Our courses are designed in Telugu and taught step by step, making them easy to understand for complete beginners as well as creators looking to improve their skills.
                </p>
              </div>
            </div>

            {/* Right Quick Info Card */}
            <div className="lg:col-span-5 bg-brand-gray/30 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 p-6 sm:p-8 rounded-3xl space-y-6 text-left">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-brand-blue dark:text-white uppercase tracking-wider">Learning Modes Offered</h3>
                <p className="text-xs text-gray-400">Pick what suits your schedule best:</p>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  "Live Online Training (Mentored sessions)",
                  "Offline Classroom Sessions (Hyderabad Campus)",
                  "Course Recordings (Self-paced study)",
                  "College Workshops & Campus Bootcamps"
                ].map((mode, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-brand-charcoal dark:text-white font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    {mode}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200/50 dark:border-white/5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Our Syllabus Focus</h4>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[10px] bg-brand-blue/10 dark:bg-white/10 text-brand-blue dark:text-white font-bold px-2.5 py-1 rounded-md">Topic Research</span>
                  <span className="text-[10px] bg-brand-blue/10 dark:bg-white/10 text-brand-blue dark:text-white font-bold px-2.5 py-1 rounded-md">Mobile CapCut</span>
                  <span className="text-[10px] bg-brand-blue/10 dark:bg-white/10 text-brand-blue dark:text-white font-bold px-2.5 py-1 rounded-md">YouTube SEO</span>
                  <span className="text-[10px] bg-brand-blue/10 dark:bg-white/10 text-brand-blue dark:text-white font-bold px-2.5 py-1 rounded-md">Reels Growth</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-10 md:py-20 bg-brand-gray/30 dark:bg-white/5 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
            
            {/* Mission */}
            <div className="bg-white dark:bg-brand-gray p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-md space-y-4 text-left">
              <div className="w-12 h-12 bg-brand-orange/15 text-brand-orange rounded-xl flex items-center justify-center">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-blue dark:text-white">Our Mission</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                To empower every aspiring creator with practical, step-by-step training to confidently shoot, edit, publish, and grow on social media.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-brand-gray p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-md space-y-4 text-left">
              <div className="w-12 h-12 bg-brand-blue/15 text-brand-blue rounded-xl flex items-center justify-center">
                <Rocket size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-blue dark:text-white">Our Vision</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                To become India's most trusted Content Creation Academy by helping millions of creators build successful digital careers, personal brands, and businesses through practical education.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* What We Teach & Course Curriculum */}
      <section className="py-10 md:py-20 bg-white dark:bg-[#090d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange animate-pulse">Curriculum Modules</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue dark:text-white tracking-tight">
              What We Teach
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              A comprehensive toolkit of skills essential to thrive in the modern creator economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {teachTopics.map((topic, idx) => (
              <div
                key={idx}
                className="bg-brand-gray/30 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/50 dark:border-white/5 hover:border-brand-blue/20 hover:shadow-md transition duration-200 flex gap-4 items-start text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 dark:bg-white/5 text-brand-blue dark:text-white flex items-center justify-center shrink-0 mt-1">
                  <CheckSquare size={16} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm sm:text-base text-brand-blue dark:text-white">{topic.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">{topic.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Active vs Upcoming programs grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-4">
            {/* Active Courses */}
            <div className="bg-brand-gray/30 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 p-6 sm:p-8 rounded-3xl text-left space-y-4">
              <h3 className="text-lg font-bold text-brand-blue dark:text-white flex items-center gap-2">
                <BookOpen className="text-brand-orange animate-pulse" size={20} />
                Current Active Courses
              </h3>
              <div className="space-y-2">
                {currentCourses.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-brand-charcoal dark:text-white font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {c}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Programs */}
            <div className="bg-brand-gray/30 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 p-6 sm:p-8 rounded-3xl text-left space-y-4">
              <h3 className="text-lg font-bold text-brand-blue dark:text-white flex items-center gap-2">
                <Award className="text-brand-orange" size={20} />
                Upcoming Programs
              </h3>
              <div className="space-y-2">
                {upcomingCourses.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-brand-charcoal dark:text-white opacity-85 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    {c} (Opening Soon)
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Creators College - Journey in Numbers */}
      <section className="py-10 md:py-20 bg-brand-gray/30 dark:bg-white/5 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* Journey Details */}
            <div className="lg:col-span-7 text-left space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Real Industry Experience
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue dark:text-white tracking-tight">
                Why Choose Creators College?
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                Creators College is built on real industry experience—not just classroom theory. Over the last 5+ years, we have successfully worked with 2,000+ unique businesses, delivering complete content solutions including strategy, scripting, shoots, editing, influencer collaborations, and social page management. Every business brought different challenges, giving us practical experience that is now shared with every student.
              </p>
            </div>

            {/* Journey Stats Blocks */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-brand-gray border border-gray-200/50 dark:border-white/5 p-4 sm:p-6 rounded-2xl text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-brand-orange">2,000+</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Projects</div>
              </div>
              <div className="bg-white dark:bg-brand-gray border border-gray-200/50 dark:border-white/5 p-4 sm:p-6 rounded-2xl text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-brand-orange">5+ Yrs</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Experience</div>
              </div>
              <div className="bg-white dark:bg-brand-gray border border-gray-200/50 dark:border-white/5 p-4 sm:p-6 rounded-2xl text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-brand-orange">100+</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Brands</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Founder Cecil Srungarapati Section */}
      <section className="py-10 md:py-20 bg-white dark:bg-[#090d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* Left Founder Photo Column */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-brand-gray group">
                <img
                  src="/cecil.jpg"
                  alt="Cecil Srungarapati - Founder of Creators College"
                  className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 z-10" />
                <div className="absolute bottom-6 left-6 right-6 text-white z-20 text-left">
                  <h4 className="text-xl font-black tracking-tight">Cecil Srungarapati</h4>
                  <p className="text-xs text-white/80 font-medium">Founder &amp; Digital Entrepreneur</p>
                </div>
              </div>
            </div>

            {/* Right Accolades Details */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Meet the Founder
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue dark:text-white tracking-tight">
                Cecil Srungarapati
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                Cecil Srungarapati is the Founder of Creators College and a digital entrepreneur with extensive experience in content creation, influencer marketing, and social media growth. His vision is to make professional content creation education simple, practical, and accessible to everyone.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex gap-2.5 items-start text-xs sm:text-sm text-brand-charcoal dark:text-white font-bold">
                  <Trophy size={16} className="text-brand-orange shrink-0 mt-0.5" />
                  <div>Worked with <strong>10+ multinational companies</strong>.</div>
                </div>
                <div className="flex gap-2.5 items-start text-xs sm:text-sm text-brand-charcoal dark:text-white font-bold">
                  <Star size={16} className="text-brand-orange shrink-0 mt-0.5" />
                  <div>Founder of <strong>Telugu Tea Talks</strong>, with <strong>800,000+ followers</strong>.</div>
                </div>
                <div className="flex gap-2.5 items-start text-xs sm:text-sm text-brand-charcoal dark:text-white font-bold">
                  <CheckSquare size={16} className="text-brand-orange shrink-0 mt-0.5" />
                  <div>Managed <strong>2,000+ business projects</strong> through content creation.</div>
                </div>
                <div className="flex gap-2.5 items-start text-xs sm:text-sm text-brand-charcoal dark:text-white font-bold">
                  <Users size={16} className="text-brand-orange shrink-0 mt-0.5" />
                  <div>CEO of <strong>Perfect Prime News</strong>, with <strong>110 million+ views</strong>.</div>
                </div>
              </div>

              {/* Founder quote banner */}
              <div className="border-l-4 border-brand-orange pl-4 bg-brand-gray/30 dark:bg-white/5 py-4 px-3 rounded-r-xl">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 italic font-medium">
                  "At Creators College, we don't just teach software—we teach you how to create content that connects with people, builds your personal brand, and creates real opportunities."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-10 md:py-20 bg-brand-gray/30 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange font-bold">Our Pillars</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue dark:text-white tracking-tight">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white dark:bg-brand-gray p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-sm space-y-2 text-left">
              <h4 className="font-bold text-base sm:text-lg text-brand-blue dark:text-white">Practical Learning</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-normal">Everything we teach is centered around hands-on projects, assignments, and real-life client tasks.</p>
            </div>
            <div className="bg-white dark:bg-brand-gray p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-sm space-y-2 text-left">
              <h4 className="font-bold text-base sm:text-lg text-brand-blue dark:text-white">Creativity</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-normal">Helping you find your unique creative voice and building video arcs that stand out in crowded feeds.</p>
            </div>
            <div className="bg-white dark:bg-brand-gray p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-sm space-y-2 text-left">
              <h4 className="font-bold text-base sm:text-lg text-brand-blue dark:text-white">Step-by-Step Teaching</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-normal">Courses taught in clear, basic Telugu, from starting your channels up to advanced platform algorithms.</p>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-brand-blue dark:text-white">Learn Today. Lead Tomorrow.</h3>
            <div className="pt-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3.5 rounded-full text-xs shadow-lg cursor-pointer"
              >
                Explore Active Courses
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
