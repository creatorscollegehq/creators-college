"use client";

import React, { useState } from "react";
import { Building, GraduationCap, School, Briefcase, Award, ArrowRight, ShieldCheck, Mail, Phone, Users, CheckCircle, FileText, Settings, Layers, Calendar } from "lucide-react";
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

  // Lead target setter
  const handleScrollToForm = () => {
    const el = document.getElementById("proposal-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full bg-white dark:bg-[#090d16]">
      {/* Hero Header */}
      <section 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80')" }}
        className="relative bg-cover bg-center text-white py-20 md:py-28 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/45 dark:bg-black/70" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-xs font-bold uppercase bg-brand-orange text-white px-3 py-1 rounded-full">B2B &amp; Institutional Training</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            🏢 Corporate Training
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
            Empower your employees, students, educators, and business teams with practical Content Creation, Video Editing, Social Media Management, and Personal Branding skills through customized training programs from Creators College.
          </p>
        </div>
      </section>

      {/* Intro Overview Section */}
      <section className="py-20 bg-white dark:bg-[#090d16] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Info details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">Empower Your Team</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue dark:text-white tracking-tight">
                Corporate Content Creation Training &amp; Digital Skills Programs in Telugu
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                Our corporate and institutional training programs are designed to help organizations build a strong digital presence, improve internal communication, enhance marketing efforts, and develop future-ready digital skills. Whether you're a College, School, Corporate Company, Business, Startup, or Government Organization, we customize every training program to meet your learning objectives.
              </p>

              {/* Core Expertise bullets */}
              <div className="space-y-4 pt-2">
                <h4 className="font-bold text-sm text-brand-blue dark:text-white uppercase tracking-wider">Our Core Expertise:</h4>
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm font-bold text-brand-charcoal dark:text-white">
                  <div>✓ Content Creation</div>
                  <div>✓ Mobile Video Production</div>
                  <div>✓ Video Editing</div>
                  <div>✓ Social Media Management</div>
                  <div>✓ Personal Branding</div>
                  <div>✓ Business Content Strategy</div>
                  <div>✓ AI Tools for Content Creation</div>
                  <div>✓ Digital Marketing Fundamentals</div>
                </div>
              </div>
            </div>

            {/* Quick Proposal Action */}
            <div className="lg:col-span-5 bg-brand-gray/30 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold text-brand-blue dark:text-white">Request Training</h3>
              <p className="text-xs text-gray-500">Need a custom training proposal or discovery syllabus? Select an action below:</p>
              
              <div className="space-y-3">
                <button
                  onClick={handleScrollToForm}
                  className="w-full inline-flex items-center justify-center bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3.5 rounded-xl text-xs transition shadow-lg text-center cursor-pointer uppercase tracking-wider"
                >
                  Request a Corporate Training Proposal
                </button>
                <a
                  href="https://wa.me/918143937367"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center bg-white dark:bg-[#090d16] border border-gray-200 dark:border-white/10 text-brand-charcoal dark:text-white font-bold py-3.5 rounded-xl text-xs transition text-center uppercase tracking-wider"
                >
                  Schedule a Discovery Call
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Program Categories Section */}
      <section className="py-20 bg-brand-gray/30 dark:bg-white/5 border-y border-gray-100 dark:border-white/5 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">B2B Program Categories</span>
            <h2 className="text-3xl font-black text-brand-blue dark:text-white tracking-tight">Customized Training Solutions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 1. College Workshops */}
            <div className="bg-white dark:bg-brand-gray p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-blue dark:text-white">🎓 College Workshops</h3>
              <p className="text-xs text-gray-400">Preparing Students for the Creator Economy</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                We conduct engaging workshops for colleges to help students build industry-relevant digital skills before graduation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <h5 className="font-bold text-brand-blue dark:text-white uppercase tracking-wider mb-1">Topics:</h5>
                  <p className="text-gray-500">Content Intro, Personal Branding, Mobile shooting, Video Editing, AI Tools, Freelancing.</p>
                </div>
                <div>
                  <h5 className="font-bold text-brand-blue dark:text-white uppercase tracking-wider mb-1">Duration formats:</h5>
                  <p className="text-gray-500 font-semibold text-brand-orange">Half-Day • 1-Day • 2-Day Bootcamp</p>
                </div>
              </div>
              <div className="pt-2">
                <button onClick={handleScrollToForm} className="inline-flex items-center gap-1.5 bg-brand-blue text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow hover:bg-brand-blue-dark transition">
                  Book a College Workshop
                </button>
              </div>
            </div>

            {/* 2. School Programs */}
            <div className="bg-white dark:bg-brand-gray p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <School size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-blue dark:text-white">🏫 School Programs</h3>
              <p className="text-xs text-gray-400">Introducing Digital Skills to the Next Generation</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                Our school programs help students develop creativity, confidence, communication, and digital literacy through structured content creation activities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <h5 className="font-bold text-brand-blue dark:text-white uppercase tracking-wider mb-1">Outcomes:</h5>
                  <p className="text-gray-500">Public Speaking, Photography, Storytelling, Digital Safety, Confidence.</p>
                </div>
                <div>
                  <h5 className="font-bold text-brand-blue dark:text-white uppercase tracking-wider mb-1">Suitable For:</h5>
                  <p className="text-gray-500">High Schools, Junior Colleges, CBSE &amp; International campuses.</p>
                </div>
              </div>
              <div className="pt-2">
                <button onClick={handleScrollToForm} className="inline-flex items-center gap-1.5 bg-brand-blue text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow hover:bg-brand-blue-dark transition">
                  Book a School Program
                </button>
              </div>
            </div>

            {/* 3. Business Training */}
            <div className="bg-white dark:bg-brand-gray p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-blue dark:text-white">💼 Business Training</h3>
              <p className="text-xs text-gray-400">Content Creation Training for Business Growth</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                Help your business team create high-quality content without depending entirely on external digital agencies.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <h5 className="font-bold text-brand-blue dark:text-white uppercase tracking-wider mb-1">Includes:</h5>
                  <p className="text-gray-500 font-medium">Product Shoot, Mobile Production, Reels styling, Storytelling, Engagement.</p>
                </div>
                <div>
                  <h5 className="font-bold text-brand-blue dark:text-white uppercase tracking-wider mb-1">Ideal For:</h5>
                  <p className="text-gray-500">Retail, Real Estate, Clinics, Restaurants, Hotels, Startups.</p>
                </div>
              </div>
              <div className="pt-2">
                <button onClick={handleScrollToForm} className="inline-flex items-center gap-1.5 bg-brand-blue text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow hover:bg-brand-blue-dark transition">
                  Book Business Training
                </button>
              </div>
            </div>

            {/* 4. Corporate Content Creation Training */}
            <div className="bg-white dark:bg-brand-gray p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <Building size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-blue dark:text-white">🏢 Corporate Content Creation Training</h3>
              <p className="text-xs text-gray-400">Build an In-House Content Team</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                Train your marketing, HR, branding, and communication teams to create professional content for your organization.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <h5 className="font-bold text-brand-blue dark:text-white uppercase tracking-wider mb-1">Modules:</h5>
                  <p className="text-gray-500">Branding, Recruitment videos, LinkedIn setup, AI editing, Events coverage.</p>
                </div>
                <div>
                  <h5 className="font-bold text-brand-blue dark:text-white uppercase tracking-wider mb-1">Trained Teams:</h5>
                  <p className="text-gray-500 font-semibold text-brand-orange">Marketing • HR • Sales • Branding • PR</p>
                </div>
              </div>
              <div className="pt-2">
                <button onClick={handleScrollToForm} className="inline-flex items-center gap-1.5 bg-brand-blue text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow hover:bg-brand-blue-dark transition">
                  Talk to Our Corporate Team
                </button>
              </div>
            </div>

          </div>

          {/* 5. Customized proposal banner */}
          <div className="p-8 bg-white dark:bg-brand-gray border border-gray-100 dark:border-white/5 rounded-3xl space-y-4 text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="text-xl font-black text-brand-blue dark:text-white">🎯 Customized Training Programs</h3>
            <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Every organization has unique goals. We design tailor-made training programs based on your industry, team size, skill level, and business objectives.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-500 dark:text-gray-400 font-bold max-w-2xl mx-auto py-2">
              <div>✓ On-Campus Classrooms</div>
              <div>✓ On-Site Corporate Office</div>
              <div>✓ Online Live Sessions</div>
              <div>✓ Hybrid Formats</div>
              <div>✓ Weekend Workshops</div>
              <div>✓ Certification Programs</div>
            </div>
            <div className="pt-2">
              <button onClick={handleScrollToForm} className="inline-flex items-center gap-2 bg-brand-orange text-white text-xs font-bold py-3 px-8 rounded-full shadow hover:bg-brand-orange-dark transition">
                Request a Customized Proposal
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Why choose stats checklist */}
      <section className="py-20 bg-white dark:bg-[#090d16] text-left">
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

      {/* Organizations worked with marquee list */}
      <section className="py-16 bg-brand-gray/30 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 text-center">
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

      {/* FAQs Section */}
      <section className="py-20 bg-white dark:bg-[#090d16]">
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
                  className="w-full px-6 py-4 bg-white dark:bg-brand-gray hover:bg-brand-gray/30 dark:hover:bg-white/10 flex justify-between items-center text-left transition"
                >
                  <span className="font-bold text-xs sm:text-sm text-brand-blue dark:text-white">{faq.q}</span>
                  <span className="text-brand-orange font-bold text-lg">{activeFaq === idx ? "−" : "+"}</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 py-4 bg-white dark:bg-[#090d16] border-t border-gray-50 dark:border-white/5 animate-fadeIn">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Proposal Box form */}
      <section id="proposal-form" className="py-20 bg-brand-gray/30 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 text-left">
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
                <div>📧 Email: info@creatorscollege.in</div>
              </div>
            </div>

            {/* Right column form */}
            <div className="md:col-span-7">
              <LeadForm defaultCourse="Corporate Training Program" isLandingPage={false} />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
