import React from "react";
import { 
  Award, 
  Eye, 
  Rocket, 
  CheckSquare, 
  Target, 
  BookOpen, 
  Users, 
  Star, 
  Trophy, 
  ArrowRight, 
  Video, 
  Smartphone, 
  Globe, 
  Share2,
  Building
} from "lucide-react";
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
    <div className="w-full bg-white dark:bg-[#090d16] text-left">
      
      {/* SECTION 1: Meet Our Founder & The Vision */}
      <section className="py-12 md:py-20 bg-white dark:bg-[#090d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-4 space-y-6">
              <span className="inline-block bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full">
                👤 MEET OUR FOUNDER
              </span>
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-black text-brand-blue dark:text-white tracking-tight">
                  The Vision Behind <span className="text-brand-orange">Creators College</span>
                </h1>
                <p className="text-xs sm:text-sm font-black text-[#0066cc] uppercase tracking-wider">
                  Content Creator. Entrepreneur. Visionary.
                </p>
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 space-y-4 leading-relaxed font-normal">
                <p>
                  Creators College was built with a simple belief — that anyone with a smartphone and the right knowledge can create content that inspires, informs and creates impact.
                </p>
                <p>
                  My goal is to make professional content creation education simple, practical, and accessible to everyone.
                </p>
              </div>

              {/* Signature block */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/5 space-y-1">
                <p className="font-serif italic text-2xl font-semibold text-brand-orange tracking-wide" style={{ fontFamily: "Georgia, serif" }}>
                  Cecil Srungarapati
                </p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  Founder, Creators College
                </p>
              </div>
            </div>

            {/* Middle Cecil Profile Photo */}
            <div className="lg:col-span-4 relative flex justify-center w-full aspect-square sm:aspect-[4/3] lg:aspect-[0.9] bg-brand-gray/30 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-white/5">
              <img
                src="/cecil.jpg"
                alt="Cecil Srungarapati - Founder of Creators College"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-[9px] font-black bg-brand-orange text-white px-2 py-0.5 rounded uppercase tracking-widest">CEO and Founder</span>
                  <p className="text-xs font-bold text-gray-200">Cecil Srungarapati at Creators College Academy</p>
                </div>
              </div>
            </div>

            {/* Right Mission, Vision, Values Column Card */}
            <div className="lg:col-span-4 bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-md space-y-6">
              
              {/* Mission */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                    <Target size={16} />
                  </div>
                  <h4 className="font-black text-sm text-brand-blue dark:text-white uppercase tracking-wider">Our Mission</h4>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal pl-10">
                  To empower creators with practical skills, real-world knowledge and the confidence to build a successful career or business through content.
                </p>
              </div>

              {/* Vision */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center shrink-0">
                    <Eye size={16} />
                  </div>
                  <h4 className="font-black text-sm text-brand-blue dark:text-white uppercase tracking-wider">Our Vision</h4>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal pl-10">
                  To become India's most trusted platform for content creation education, helping millions turn their creativity into opportunities.
                </p>
              </div>

              {/* Values */}
              <div className="space-y-3 border-t border-gray-50 dark:border-white/5 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue dark:text-white flex items-center justify-center shrink-0">
                    <Award size={16} />
                  </div>
                  <h4 className="font-black text-sm text-brand-blue dark:text-white uppercase tracking-wider">Our Values</h4>
                </div>
                <div className="grid grid-cols-2 gap-2 pl-10 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold">
                  <div>✓ Creativity</div>
                  <div>✓ Consistency</div>
                  <div>✓ Authenticity</div>
                  <div>✓ Impact</div>
                  <div>✓ Discipline</div>
                  <div>✓ Growth</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: Metrics Bar */}
      <section className="py-8 bg-[#0a1931] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center text-xs font-black">
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-black text-brand-orange">110M+</div>
              <p className="text-[10px] text-white/70">Views Generated Across Platforms</p>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-black text-brand-orange">800K+</div>
              <p className="text-[10px] text-white/77">Followers Across Social Platforms</p>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-black text-brand-orange">2,000+</div>
              <p className="text-[10px] text-white/70">Business Projects Completed</p>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-black text-brand-orange">10+</div>
              <p className="text-[10px] text-white/77">Multinational Companies Worked</p>
            </div>
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <div className="text-xl sm:text-2xl font-black text-brand-orange">5+</div>
              <p className="text-[10px] text-white/70">Years of Experience in Content</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2.5: Preserved About Narrative Story */}
      <section className="py-12 md:py-20 bg-white dark:bg-[#090d16] border-b border-gray-100 dark:border-white/5 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase text-brand-orange tracking-widest block">
              OUR FOUNDATION STORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
              Learn. Create. Grow.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
            <div className="space-y-4">
              <p>
                Creators College is a practical Content Creation Academy built for anyone who wants to start creating content on social media. We believe that talent has no age, language, or background limits. If you have the passion to create, we provide the practical skills to turn your ideas into highly engaging, impactful content.
              </p>
              <p>
                Many people dream of becoming content creators, but don't know where to begin. Questions like <em>What should I shoot? How do I edit? Which platform should I use? How do I post consistently?</em> stop thousands of aspiring creators from taking their first step.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Creators College was established to solve exactly these challenges.
              </p>
              <p>
                We teach everything from the ground up—from planning content ideas and scripting to shooting professional videos, editing, page management, and publishing across social media platforms. Our courses are designed in Telugu and taught step by step, making them easy to understand for complete beginners as well as creators looking to improve their skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: A Track Record of Impact */}
      <section className="py-12 md:py-20 bg-brand-gray/30 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase text-brand-orange tracking-widest block">
              PORTFOLIO HIGHLIGHTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
              A Track Record of Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 p-6 rounded-2xl shadow-sm space-y-3 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                <Building size={20} />
              </div>
              <h4 className="font-black text-sm text-brand-blue dark:text-white leading-tight">Worked with 10+ Multinational Companies</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                Trusted by global brands for content strategy, production and growth.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 p-6 rounded-2xl shadow-sm space-y-3 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <Users size={20} />
              </div>
              <h4 className="font-black text-sm text-brand-blue dark:text-white leading-tight">Founder of Telugu Tea Talks</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                Built a community of 800,000+ followers across platforms.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 p-6 rounded-2xl shadow-sm space-y-3 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                <Trophy size={20} />
              </div>
              <h4 className="font-black text-sm text-brand-blue dark:text-white leading-tight">Managed 2,000+ Business Projects</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                Helped 2,000+ businesses grow their brand and reach through content.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 p-6 rounded-2xl shadow-sm space-y-3 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <Eye size={20} />
              </div>
              <h4 className="font-black text-sm text-brand-blue dark:text-white leading-tight">CEO of Perfect Prime News</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                Leading a digital news platform with 110 million+ views and growing.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: Cecil Quote Banner */}
      <section className="py-12 bg-[#0a1931] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Quote details */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-4xl text-brand-orange block">“</span>
              <p className="text-base sm:text-lg md:text-xl font-bold leading-relaxed italic max-w-3xl">
                At Creators College, we don't just teach software—we teach you how to create content that connects with people, builds your personal brand, and creates real opportunities.
              </p>
            </div>

            {/* Quote image setup */}
            <div className="lg:col-span-4 relative aspect-video bg-[#0c1b3d] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <img
                src="/cecil.jpg"
                alt="Cecil Srungarapati Workspace"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: What I Do */}
      <section className="py-12 md:py-20 bg-white dark:bg-[#090d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase text-brand-orange tracking-widest block">
              EXPERTISE AREAS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
              What I Do
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            
            {/* Item 1 */}
            <div className="bg-[#131b2e] text-white border border-white/5 p-6 rounded-2xl shadow-sm space-y-3 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
                <Video size={22} />
              </div>
              <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider">Content Creation &amp; Strategy</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed font-normal">
                Creating content that informs, entertains and drives results.
              </p>
            </div>

            {/* Item 2 */}
            <div className="bg-[#131b2e] text-white border border-white/5 p-6 rounded-2xl shadow-sm space-y-3 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
                <Users size={22} />
              </div>
              <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider">Influencer Marketing</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed font-normal">
                Helping brands connect with the right audience through creators.
              </p>
            </div>

            {/* Item 3 */}
            <div className="bg-[#131b2e] text-white border border-white/5 p-6 rounded-2xl shadow-sm space-y-3 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
                <Trophy size={22} />
              </div>
              <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider">Social Media Growth</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed font-normal">
                Building and scaling platforms with organic strategies.
              </p>
            </div>

            {/* Item 4 */}
            <div className="bg-[#131b2e] text-white border border-white/5 p-6 rounded-2xl shadow-sm space-y-3 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
                <Award size={22} />
              </div>
              <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider">Brand Collaborations</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed font-normal">
                Partnering with brands to create impactful campaigns.
              </p>
            </div>

            {/* Item 5 */}
            <div className="bg-[#131b2e] text-white border border-white/5 p-6 rounded-2xl shadow-sm space-y-3 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
                <BookOpen size={22} />
              </div>
              <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider">Digital Storytelling</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed font-normal">
                Turning ideas into stories that leave a lasting impression.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: Remaining Info (Learning Modes, Syllabus Tags, Curriculum Modules) */}
      <section className="py-12 md:py-20 bg-brand-gray/30 dark:bg-white/5 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Learning Modes & Syllabus focus */}
            <div className="lg:col-span-6 bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-brand-blue dark:text-white uppercase tracking-wider">Learning Modes Offered</h3>
                <p className="text-xs text-gray-400 font-semibold">Pick what suits your schedule best:</p>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  "Live Online Training (Mentored sessions)",
                  "Offline Classroom Sessions (Hyderabad Campus)",
                  "Course Recordings (Self-paced study)",
                  "College Workshops & Campus Bootcamps"
                ].map((mode, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-brand-charcoal dark:text-white font-bold">
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

            {/* Active & Upcoming programs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Active Courses */}
              <div className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 p-6 rounded-2xl text-left space-y-4">
                <h3 className="text-base font-bold text-brand-blue dark:text-white flex items-center gap-2">
                  <BookOpen className="text-brand-orange" size={18} />
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
              <div className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 p-6 rounded-2xl text-left space-y-4">
                <h3 className="text-base font-bold text-brand-blue dark:text-white flex items-center gap-2">
                  <Award className="text-brand-orange" size={18} />
                  Upcoming Programs
                </h3>
                <div className="space-y-2">
                  {upcomingCourses.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-brand-charcoal dark:text-white font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                      {c} (Opening Soon)
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Curriculum Modules Grid */}
          <div className="space-y-6 pt-8 border-t border-gray-100 dark:border-white/5">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange font-bold">Curriculum Modules</span>
              <h2 className="text-xl sm:text-2xl font-black text-brand-blue dark:text-white tracking-tight">
                What We Teach
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#131b2e] p-6 rounded-2xl border border-gray-200/50 dark:border-white/5 hover:border-brand-blue/20 hover:shadow-sm transition duration-200 flex gap-4 items-start text-left"
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
          </div>

          <div className="text-center pt-8 border-t border-gray-100 dark:border-white/5 space-y-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-brand-blue dark:text-white">Learn Today. Lead Tomorrow.</h3>
            <div>
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
