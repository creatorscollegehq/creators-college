"use client";

import React, { useState } from "react";
import { 
  Building, 
  GraduationCap, 
  School, 
  Briefcase, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Users, 
  CheckCircle, 
  FileText, 
  Settings, 
  Layers, 
  Calendar, 
  Lightbulb, 
  Edit, 
  Video, 
  Smartphone, 
  Globe, 
  Share2, 
  HelpCircle, 
  ArrowDown 
} from "lucide-react";
import LeadForm from "@/components/LeadForm";

export default function CorporateTrainingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const corporateFaqs = [
    { q: "Do you provide training at our location?", a: "Yes. We conduct training at colleges, schools, corporate offices, and business locations across India." },
    { q: "Can the training be customized?", a: "Absolutely. Every program can be tailored to your organization's objectives and audience." },
    { q: "Is online corporate training available?", a: "Yes. We offer both online live sessions and offline classroom training." },
    { q: "Do participants receive certificates?", a: "Yes. All eligible participants receive a Course Completion Certificate." },
    { q: "What is the minimum batch size?", a: "We offer training for small teams as well as large groups. Contact us for a customized proposal." }
  ];

  const clientBrands = [
    "Perfect Prime News", "Telugu Tea Talks", "Swiggy", "Spinny", "Decathlon", 
    "The Chennai Shopping Mall", "Bajaj Electronics", "HIITMS Academy", "Himajal", 
    "SRK Trade Corp", "Electronics Cart", "Mak Bath & Lights", "Sri Vaishnavi Vensai Interiors"
  ];

  const handleScrollToForm = () => {
    const el = document.getElementById("proposal-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full bg-white dark:bg-[#090d16] text-left">
      
      {/* 1. Mockup Hero Header Section */}
      <section className="relative bg-[#061129] dark:bg-brand-gray text-white py-12 md:py-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#061129] via-[#091a3e]/80 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full">
                B2B &amp; INSTITUTIONAL TRAINING
              </span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0">
                  <Building size={28} />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  Corporate <span className="text-brand-orange">Training</span>
                </h1>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed font-normal">
                Empower your employees, students, educators, and business teams with practical Content Creation skills through customized training programs from Creators College.
              </p>
              
              {/* Bottom stats boxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs font-black text-white/95">
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 p-3.5 rounded-xl shadow-sm">
                  <span className="text-xl">👥</span>
                  <div>
                    <h5 className="leading-tight">Practical</h5>
                    <p className="text-[10px] text-white/60">Training</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 p-3.5 rounded-xl shadow-sm">
                  <span className="text-xl">🎯</span>
                  <div>
                    <h5 className="leading-tight">Industry</h5>
                    <p className="text-[10px] text-white/60">Relevant</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 p-3.5 rounded-xl shadow-sm">
                  <span className="text-xl">⚙️</span>
                  <div>
                    <h5 className="leading-tight">Custom</h5>
                    <p className="text-[10px] text-white/60">Solutions</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 p-3.5 rounded-xl shadow-sm">
                  <span className="text-xl">📈</span>
                  <div>
                    <h5 className="leading-tight">Measurable</h5>
                    <p className="text-[10px] text-white/60">Results</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Classroom Mockup Graphic */}
            <div className="lg:col-span-5 relative w-full aspect-video sm:aspect-[4/3] lg:aspect-[1.15] bg-[#0c1b3d] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                alt="Corporate Training Classroom"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061129] via-transparent to-transparent flex flex-col justify-end p-6 space-y-2">
                <span className="inline-block self-start text-[9px] font-black bg-brand-orange text-white px-2 py-0.5 rounded-md tracking-widest">LIVE SESSION</span>
                <h4 className="font-extrabold text-sm sm:text-base text-white">Content Creation: From Script to Publishing</h4>
                <p className="text-[10px] text-gray-400">Customized workshop format tailored for colleges and corporations.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Core Expertise & Request Training Split Block */}
      <section className="py-12 md:py-24 bg-white dark:bg-[#090d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
            
            {/* Left Content column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs sm:text-sm font-black uppercase text-brand-orange tracking-widest block">
                EMPOWER YOUR TEAM
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-blue dark:text-white leading-tight">
                Corporate Content Creation Training &amp; Digital Skills Programs in Telugu
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                <p>
                  Our corporate and institutional training programs are designed to help organizations build a strong digital presence, improve internal communication, enhance marketing efforts, and develop future-ready digital skills.
                </p>
                <p>
                  Whether you're a College, School, Corporate Company, Business, Startup, or Government Organization, we customize every training program to meet your learning objectives.
                </p>
              </div>

              {/* Core Expertise Checklist Grid */}
              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
                <span className="text-[10px] sm:text-xs font-black uppercase text-brand-orange tracking-widest block">
                  OUR CORE EXPERTISE: CONTENT CREATION
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-extrabold text-brand-charcoal dark:text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm shrink-0">✓</span> Content Strategy &amp; Idea Generation
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm shrink-0">✓</span> Thumbnail &amp; Creative Design Basics
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm shrink-0">✓</span> Topic Research &amp; Content Planning
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm shrink-0">✓</span> Reels, Shorts &amp; Long-form Video Creation
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm shrink-0">✓</span> Script Writing &amp; Storytelling
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm shrink-0">✓</span> Social Media Publishing
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm shrink-0">✓</span> Mobile &amp; Camera Video Shooting
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm shrink-0">✓</span> Content Calendar &amp; Consistency
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm shrink-0">✓</span> Lighting, Audio &amp; Framing Techniques
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm shrink-0">✓</span> Personal Branding
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm shrink-0">✓</span> Professional Video Editing (Mobile &amp; PC)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm shrink-0">✓</span> Organic Social Media Growth
                  </div>
                </div>
              </div>
            </div>

            {/* Right Callout Box column */}
            <div className="lg:col-span-5 w-full bg-[#0a1931] text-white p-6 sm:p-8 rounded-3xl border border-white/5 shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">Request Training</h3>
                <p className="text-xs text-gray-300 font-medium leading-relaxed">
                  Need a custom training proposal or discovery syllabus? Select an action below:
                </p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleScrollToForm}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-black py-4 px-6 rounded-xl text-xs tracking-wider uppercase shadow-lg transition duration-200"
                >
                  <FileText size={16} /> REQUEST A CORPORATE TRAINING PROPOSAL
                </button>
                <a 
                  href="https://wa.me/918143937367" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#132c52] hover:bg-[#1b3d71] border border-white/10 text-white font-black py-4 px-6 rounded-xl text-xs tracking-wider uppercase shadow transition duration-200"
                >
                  <Calendar size={16} /> SCHEDULE A DISCOVERY CALL
                </a>
              </div>

              {/* Box Footer Stats icons */}
              <div className="grid grid-cols-4 gap-2 pt-6 border-t border-white/10 text-center text-[9px] text-gray-300 font-black">
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-white/5 mx-auto flex items-center justify-center text-brand-orange">⚙️</div>
                  <p>Custom Programs</p>
                </div>
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-white/5 mx-auto flex items-center justify-center text-brand-orange">👨‍🏫</div>
                  <p>Expert Trainers</p>
                </div>
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-white/5 mx-auto flex items-center justify-center text-brand-orange">🕒</div>
                  <p>Flexible Formats</p>
                </div>
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-white/5 mx-auto flex items-center justify-center text-brand-orange">📈</div>
                  <p>Measurable Impact</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. B2B Program Categories - Customized Solutions */}
      <section className="py-12 md:py-24 bg-brand-gray/30 dark:bg-white/5 border-y border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="inline-block bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full">
              B2B PROGRAM CATEGORIES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-blue dark:text-white tracking-tight">
              Customized Training Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Card 1: College Workshops */}
            <div className="bg-white dark:bg-[#131b2e] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <div className="relative aspect-[4/3] bg-brand-gray">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80" 
                  alt="College Workshops"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs">🎓</div>
              </div>
              <div className="p-4 space-y-3 flex flex-col flex-grow justify-between">
                <div className="space-y-2">
                  <h4 className="font-black text-sm text-brand-blue dark:text-white leading-tight">College Workshops</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Same curriculum, examples tailored for students.</p>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 space-y-1 font-bold pt-1 border-t border-gray-50 dark:border-white/5">
                    <div>✓ Engaging &amp; practical sessions</div>
                    <div>✓ Industry-ready skills</div>
                    <div>✓ Real-time projects</div>
                  </div>
                </div>
                <button 
                  onClick={handleScrollToForm}
                  className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white text-[10px] font-black py-2 rounded-lg shadow-sm uppercase tracking-wider text-center mt-3"
                >
                  Book a College Workshop &rarr;
                </button>
              </div>
            </div>

            {/* Card 2: School Programs */}
            <div className="bg-white dark:bg-[#131b2e] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <div className="relative aspect-[4/3] bg-brand-gray">
                <img 
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=400&q=80" 
                  alt="School Programs" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs">🏫</div>
              </div>
              <div className="p-4 space-y-3 flex flex-col flex-grow justify-between">
                <div className="space-y-2">
                  <h4 className="font-black text-sm text-brand-blue dark:text-white leading-tight">School Programs</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Same curriculum, simplified for younger learners.</p>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 space-y-1 font-bold pt-1 border-t border-gray-50 dark:border-white/5">
                    <div>✓ Creative &amp; interactive learning</div>
                    <div>✓ Build confidence</div>
                    <div>✓ Digital literacy through creation</div>
                  </div>
                </div>
                <button 
                  onClick={handleScrollToForm}
                  className="w-full bg-[#0a1931] hover:bg-[#132c52] text-white text-[10px] font-black py-2 rounded-lg shadow-sm uppercase tracking-wider text-center mt-3"
                >
                  Book a School Program &rarr;
                </button>
              </div>
            </div>

            {/* Card 3: Business Training */}
            <div className="bg-white dark:bg-[#131b2e] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <div className="relative aspect-[4/3] bg-brand-gray">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80" 
                  alt="Business Training" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs">💼</div>
              </div>
              <div className="p-4 space-y-3 flex flex-col flex-grow justify-between">
                <div className="space-y-2">
                  <h4 className="font-black text-sm text-brand-blue dark:text-white leading-tight">Business Training</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Same curriculum, focused on product marketing &amp; growth.</p>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 space-y-1 font-bold pt-1 border-t border-gray-50 dark:border-white/5">
                    <div>✓ Create your own content</div>
                    <div>✓ Promote your products</div>
                    <div>✓ Grow your business</div>
                  </div>
                </div>
                <button 
                  onClick={handleScrollToForm}
                  className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white text-[10px] font-black py-2 rounded-lg shadow-sm uppercase tracking-wider text-center mt-3"
                >
                  Book Business Training &rarr;
                </button>
              </div>
            </div>

            {/* Card 4: Corporate Training */}
            <div className="bg-white dark:bg-[#131b2e] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <div className="relative aspect-[4/3] bg-brand-gray">
                <img 
                  src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=400&q=80" 
                  alt="Corporate Training" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs">🏢</div>
              </div>
              <div className="p-4 space-y-3 flex flex-col flex-grow justify-between">
                <div className="space-y-2">
                  <h4 className="font-black text-sm text-brand-blue dark:text-white leading-tight">Corporate Content Training</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Same curriculum, focused on internal branding, HR &amp; PR.</p>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 space-y-1 font-bold pt-1 border-t border-gray-50 dark:border-white/5">
                    <div>✓ Build in-house content team</div>
                    <div>✓ Consistent brand presence</div>
                    <div>✓ Professional communication</div>
                  </div>
                </div>
                <button 
                  onClick={handleScrollToForm}
                  className="w-full bg-[#0a1931] hover:bg-[#132c52] text-white text-[10px] font-black py-2 rounded-lg shadow-sm uppercase tracking-wider text-center mt-3"
                >
                  Talk to Our Corporate Team &rarr;
                </button>
              </div>
            </div>

            {/* Card 5: Customized Programs */}
            <div className="bg-white dark:bg-[#131b2e] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <div className="relative aspect-[4/3] bg-brand-gray">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80" 
                  alt="Customized Programs" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs">🎯</div>
              </div>
              <div className="p-4 space-y-3 flex flex-col flex-grow justify-between">
                <div className="space-y-2">
                  <h4 className="font-black text-sm text-brand-blue dark:text-white leading-tight">Customized Programs</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Same curriculum, tailored to goals, duration &amp; audience.</p>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 space-y-1 font-bold pt-1 border-t border-gray-50 dark:border-white/5">
                    <div>✓ As per your goals</div>
                    <div>✓ As per your team level</div>
                    <div>✓ As per your industry</div>
                  </div>
                </div>
                <button 
                  onClick={handleScrollToForm}
                  className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white text-[10px] font-black py-2 rounded-lg shadow-sm uppercase tracking-wider text-center mt-3"
                >
                  Request Customized Proposal &rarr;
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Horizontal Curriculum Flowchart (One Practical Curriculum) */}
      <section className="py-12 md:py-24 bg-white dark:bg-[#090d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column info details */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] sm:text-xs font-black uppercase text-brand-orange tracking-widest block">
                ONE PRACTICAL CURRICULUM
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0a1931] dark:text-white uppercase leading-tight">
                Customized for Every Team
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                We don't teach isolated software. We teach the complete content creation process—from planning and scripting to shooting, editing, publishing, and growing on social media.
              </p>
              
              <div className="flex items-center gap-2 pt-2 text-[#0a1931] dark:text-white">
                <span className="w-6 h-6 rounded bg-[#0a1931] text-white flex items-center justify-center font-black text-xs">C</span>
                <span className="font-black text-xs uppercase tracking-wider">Creators College</span>
              </div>
            </div>

            {/* Right Column circles flowchart flow layout */}
            <div className="lg:col-span-8 space-y-4">
              <h4 className="text-[10px] sm:text-xs font-black uppercase text-brand-orange tracking-widest block text-center lg:text-left">
                WE TEACH CONTENT CREATION FROM START TO FINISH
              </h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-center text-center">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-brand-orange/10 border-2 border-brand-orange text-brand-orange flex items-center justify-center shadow-sm">
                    <Lightbulb size={24} />
                  </div>
                  <h5 className="text-[10px] font-black text-brand-blue dark:text-white uppercase tracking-wider leading-tight">IDEA &amp; PLANNING</h5>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-brand-orange/10 border-2 border-brand-orange text-brand-orange flex items-center justify-center shadow-sm">
                    <Edit size={20} />
                  </div>
                  <h5 className="text-[10px] font-black text-brand-blue dark:text-white uppercase tracking-wider leading-tight">SCRIPTING &amp; STORYTELLING</h5>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-brand-orange/10 border-2 border-brand-orange text-brand-orange flex items-center justify-center shadow-sm">
                    <Video size={22} />
                  </div>
                  <h5 className="text-[10px] font-black text-brand-blue dark:text-white uppercase tracking-wider leading-tight">SHOOTING (PROFESSIONAL)</h5>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-brand-orange/10 border-2 border-brand-orange text-brand-orange flex items-center justify-center shadow-sm">
                    <Smartphone size={24} />
                  </div>
                  <h5 className="text-[10px] font-black text-brand-blue dark:text-white uppercase tracking-wider leading-tight">EDITING (MOBILE &amp; PC)</h5>
                </div>

                {/* Step 5 */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-brand-orange/10 border-2 border-brand-orange text-brand-orange flex items-center justify-center shadow-sm">
                    <Globe size={22} />
                  </div>
                  <h5 className="text-[10px] font-black text-brand-blue dark:text-white uppercase tracking-wider leading-tight">PUBLISHING &amp; POSTING</h5>
                </div>

                {/* Step 6 */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-brand-orange/10 border-2 border-brand-orange text-brand-orange flex items-center justify-center shadow-sm">
                    <Share2 size={22} />
                  </div>
                  <h5 className="text-[10px] font-black text-brand-blue dark:text-white uppercase tracking-wider leading-tight">GROWTH &amp; ENGAGEMENT</h5>
                </div>

              </div>
              <p className="text-[11px] text-gray-400 text-center font-bold tracking-wide pt-4">One proven framework. Customized examples. Real results.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Extra Details Already Present (Why Choose, Client Brands, FAQs, Proposal Form) */}
      
      {/* Client Brands */}
      <section className="py-10 md:py-16 bg-brand-gray/30 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">🤝 Organizations We've Worked With</span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
              Our experience includes working with businesses and organizations such as:
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {clientBrands.map((brand, idx) => (
              <span key={idx} className="text-xs bg-white dark:bg-brand-gray border border-gray-200 dark:border-white/10 text-brand-charcoal dark:text-white font-bold px-3 py-1.5 rounded-full">
                {brand}
              </span>
            ))}
          </div>

          <p className="text-[10px] text-gray-400 max-w-lg mx-auto leading-relaxed mt-4">
            ...and 100+ brands across education, retail, healthcare, manufacturing, real estate, hospitality, and digital businesses.
          </p>
        </div>
      </section>

      {/* Why Choose Stats checklist */}
      <section className="py-12 md:py-20 bg-white dark:bg-[#090d16] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Stats */}
            <div className="lg:col-span-5 bg-brand-gray/30 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-8 rounded-3xl space-y-6">
              <h3 className="font-extrabold text-brand-blue dark:text-white text-lg">⭐ Why Organizations Choose Creators College</h3>
              
              <div className="space-y-4 text-xs font-bold text-brand-charcoal dark:text-white">
                <div>🎥 2,000+ Business Projects</div>
                <div>🏢 100+ Brands Worked With</div>
                <div>📈 500M+ Content Views Overall</div>
                <div>🗓️ 5+ Years of Industry Experience</div>
                <div>🎬 Real Projects &amp; Case Studies</div>
                <div>📁 Flexible Delivery (Online/Offline/Hybrid)</div>
              </div>
            </div>

            {/* Right Column copy block */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">Why Choose Creators College for Corporate Training?</span>
              <h2 className="text-3xl font-black text-brand-blue dark:text-white tracking-tight">Practical Learning That Drives Business Growth</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                At Creators College, we bring practical experience from working on 2,000+ business projects, collaborating with 100+ brands, and generating 500M+ content views across digital platforms. Unlike traditional classroom training, our sessions are completely practical, interactive, and focused on real-world implementation.
              </p>
              
              <div className="border-l-4 border-brand-orange pl-4 bg-brand-gray/30 dark:bg-white/5 py-4 px-3 rounded-r-xl">
                <h4 className="text-xs font-bold text-brand-blue dark:text-white uppercase tracking-wider mb-1">Flexibility first</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  We schedule programs around your team's timeline. Offered as online live interactions, hybrid bootcamps, or on-site classroom sessions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 md:py-20 bg-white dark:bg-[#090d16] border-t border-gray-100 dark:border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-left">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">FAQ</span>
            <h2 className="text-3xl font-black text-brand-blue dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {corporateFaqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 bg-brand-gray/30 dark:bg-white/5 hover:bg-brand-gray/50 dark:hover:bg-white/10 flex justify-between items-center text-left transition"
                >
                  <span className="font-bold text-xs sm:text-sm text-brand-blue dark:text-white">{faq.q}</span>
                  <span className="text-brand-orange font-bold text-lg">{activeFaq === idx ? "−" : "+"}</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 py-4 bg-white dark:bg-[#090d16] border-t border-gray-50 dark:border-white/5 animate-fadeIn">
                     <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Submission Anchor */}
      <section id="proposal-form" className="py-12 md:py-20 bg-brand-gray/30 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 text-left">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Left column info */}
            <div className="md:col-span-5 space-y-6">
              <span className="text-xs font-black bg-brand-orange text-white py-1 px-3 rounded-full">🚀 Ready to Upskill Your Team?</span>
              <h3 className="text-2xl font-black text-brand-blue dark:text-white">Let's build your customized training program.</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-normal">
                Help your students, employees, or business teams master Content Creation, Video Editing, Social Media Management, and Digital Communication through practical, industry-focused training from Creators College.
              </p>
              
              <div className="text-xs text-gray-400 space-y-2">
                <div className="font-bold">📱 Direct Assistance:</div>
                <div>📞 Call / WhatsApp: +91 81439 37367</div>
                <div>📧 Email: enquiry@creatorscollege.com</div>
              </div>
            </div>

            {/* Right column form */}
            <div className="md:col-span-7">
              <LeadForm defaultCourse="Corporate Training Program" isLandingPage={false} />
            </div>

          </div>
        </div>
      </section>

      {/* 6. Handshaking Footer CTA Banner */}
      <section className="py-8 bg-[#0a1931] text-white relative overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left content block */}
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-white/5 text-brand-orange flex items-center justify-center shrink-0 text-2xl shadow">
                🤝
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-base sm:text-lg">Let's Build a Content-Driven Future Together</h4>
                <p className="text-xs text-gray-300">Upskill your team with practical Content Creation training that creates real impact.</p>
              </div>
            </div>

            {/* Right action links */}
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={handleScrollToForm}
                className="bg-brand-orange hover:bg-brand-orange-dark text-white font-black py-3 px-6 rounded-full text-xs tracking-wider uppercase shadow-lg transition duration-200"
              >
                CONNECT WITH OUR TRAINING TEAM &rarr;
              </button>
              <div className="text-xs font-black space-y-0.5">
                <a href="tel:+918143937367" className="block text-brand-orange hover:underline">📞 81439 37367</a>
                <a href="https://www.creatorscollege.in" className="block text-white/80 hover:underline">🌐 www.creatorscollege.in</a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
