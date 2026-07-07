"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, CheckCircle, MessageSquare, X } from "lucide-react";

const Instagram = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" fill="currentColor" />
  </svg>
);

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeBox, setActiveBox] = useState<number | null>(null);

  const whyContactBoxes = [
    { icon: "🎓", title: "Course Selection Guidance", desc: "Our team helps you match your goals with the best course syllabus (Content Creation vs. Editing)." },
    { icon: "💼", title: "Career Advice", desc: "Get expert counseling on how to transition into a full-time creator or high-paying freelance editor." },
    { icon: "🕒", title: "Batch Timings", desc: "Learn about our morning, evening, and weekend batches for online and offline classes." },
    { icon: "📄", title: "Course Curriculum", desc: "Get details of our step-by-step practical modules covering research, scripting, shoots, and post-production." },
    { icon: "🎥", title: "Demo Classes", desc: "Book a free online session or visit our Hyderabad campus to attend a live class." },
    { icon: "💳", title: "Fee Details", desc: "Get exact pricing information, ongoing discounts, and special launch offers." },
    { icon: "🏢", title: "Corporate Training", desc: "Customized content creation bootcamps and workshops for businesses and agencies." },
    { icon: "🏫", title: "Workshops", desc: "Enquire about our upcoming weekend bootcamps and guest sessions on specialized creator tools." },
    { icon: "🗺️", title: "Learning Roadmap", desc: "Get a customized step-by-step pathway from complete beginner to landing your first paid clients." },
    { icon: "🛡️", title: "Enrollment Support", desc: "Step-by-step guidance on registration, payment methods, and batch allocation." }
  ];

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [profession, setProfession] = useState("");
  const [course, setCourse] = useState("Complete Telugu Content Creation Course");
  const [mode, setMode] = useState("Online");
  const [category, setCategory] = useState("General Enquiry");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !city) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Save lead details
    const savedContacts = JSON.parse(localStorage.getItem("contact_leads") || "[]");
    savedContacts.push({
      name,
      phone,
      email,
      city,
      profession,
      course,
      mode,
      category,
      message,
      time: new Date().toLocaleString(),
    });
    localStorage.setItem("contact_leads", JSON.stringify(savedContacts));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const contactFaqs = [
    { q: "Can I visit your office before enrolling?", a: "Yes. You're welcome to visit our Hyderabad Office to meet our team, understand the courses, and get complete guidance before enrolling." },
    { q: "How quickly will I receive a response?", a: "Our team usually responds within 24 hours on working days." },
    { q: "Do you provide support through WhatsApp?", a: "Yes. You can contact us directly on WhatsApp for faster assistance." },
    { q: "Can I book a free demo class?", a: "Absolutely. Contact us through Phone, WhatsApp, or submit the enquiry form to reserve your free demo class." },
    { q: "Do you provide guidance on choosing the right course?", a: "Yes. Based on your goals and interests, our team will help you choose the most suitable course." }
  ];

  return (
    <div className="w-full bg-white dark:bg-[#090d16]">
      {/* Rebuilt Split Header matching mockup edge-to-edge */}
      <section className="relative bg-[#0a1931] dark:bg-brand-gray text-white border-b border-brand-blue-dark dark:border-white/5 overflow-hidden">
        
        {/* Right Side Full-Bleed Image Background */}
        <div className="relative md:absolute md:top-0 md:bottom-0 md:right-0 w-full md:w-[45%] z-0 h-[280px] md:h-full overflow-hidden">
          <img
            src="/contact_mug.png"
            alt="Creators College Mug Mockup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0a1931]/10" />
          
          {/* Curved divider border representing golden circular arc */}
          <div className="hidden md:block absolute top-0 bottom-0 -left-12 w-24 bg-[#0a1931] dark:bg-brand-gray z-10 rounded-r-full border-r-[3.5px] border-brand-orange shadow-[4px_0_15px_rgba(0,0,0,0.5)]" />
        </div>

        {/* Decorative Floating Outline Icons */}
        <div className="absolute top-8 left-[30%] text-white/10 pointer-events-none animate-float">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </div>
        <div className="absolute top-12 left-12 text-white/5 pointer-events-none">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <div className="absolute bottom-6 left-[15%] text-white/5 pointer-events-none">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-2.855C3.48 16.62 3 14.399 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        </div>

        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 w-full items-center">
            
            {/* Left Content Column */}
            <div className="md:col-span-7 py-12 md:py-20 space-y-4 text-left pr-4 relative z-20">
              <div className="inline-block self-start text-[10px] font-black uppercase bg-brand-orange text-white px-3 py-1 rounded-full tracking-wider">
                Get In Touch
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Contact <br />
                <span className="text-brand-orange">Creators College</span>
              </h1>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium max-w-xl">
                Looking to learn Content Creation, Video Editing, or explore our Corporate Training Programs? We'd love to hear from you.
              </p>
            </div>

            {/* Right Column Spacer - holds grid flow on desktop, hidden on mobile */}
            <div className="hidden md:block md:col-span-5 pointer-events-none" />

          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-12 md:py-20 bg-white dark:bg-[#090d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
            {/* Left Column: Info details cards in 2x2 grid + connect card */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-sm font-black uppercase tracking-widest text-brand-orange">
                  Reach Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-brand-blue dark:text-white tracking-tight">
                  Get in Touch Instantly
                </h2>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  Whether you're a Student, Job Seeker, Housewife, Business Owner, Working Professional, Freelancer, or an organization seeking Corporate Training, our team is here to guide you every step of the way.
                </p>
              </div>

              {/* Contact Grid layout matching mockup */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Address Card */}
                <div className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand-blue/10 dark:bg-white/5 text-brand-blue dark:text-white flex items-center justify-center shrink-0">
                      <MapPin size={24} />
                    </div>
                    <h4 className="font-black text-base sm:text-lg text-brand-blue dark:text-white">Campus Address</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    Creators College, KPHB, Hyderabad, Telangana, India
                  </p>
                </div>

                {/* Call Us Card */}
                <div className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                      <Phone size={24} />
                    </div>
                    <h4 className="font-black text-base sm:text-lg text-brand-blue dark:text-white">Call Us</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Have questions about our courses or training? Our team is just a call away.
                  </p>
                  <a href="tel:+918143937367" className="block text-sm sm:text-base font-black text-brand-orange hover:underline transition">
                    📞 +91 81439 37367
                  </a>
                </div>

                {/* WhatsApp Us Card */}
                <div className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                      <MessageSquare size={24} />
                    </div>
                    <h4 className="font-black text-base sm:text-lg text-brand-blue dark:text-white">WhatsApp Us</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 leading-relaxed">Chat with us to get instant assistance regarding:</p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold">
                      <div>✓ Course Details</div>
                      <div>✓ Upcoming Batches</div>
                      <div>✓ Fee Information</div>
                      <div>✓ Demo Classes</div>
                      <div>✓ Corporate Training</div>
                      <div>✓ Workshops</div>
                    </div>
                  </div>
                  <a href="https://wa.me/918143937367" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-green-600 text-white text-xs font-black py-3 px-6 rounded-xl shadow transition tracking-wider uppercase">
                    🟢 WhatsApp Now
                  </a>
                </div>

                {/* Email Us Card */}
                <div className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand-blue/10 dark:bg-white/5 text-brand-blue dark:text-white flex items-center justify-center shrink-0">
                      <Mail size={24} />
                    </div>
                    <h4 className="font-black text-base sm:text-lg text-brand-blue dark:text-white">Email Us</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    For course inquiries, partnerships, corporate training, or support, send us an email:
                  </p>
                  <a href="mailto:info@creatorscollege.in" className="block text-sm sm:text-base font-black text-[#0066cc] hover:underline transition">
                    info@creatorscollege.in
                  </a>
                </div>

              </div>

              {/* Connect With Us Full-Width Card */}
              <div className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 dark:bg-white/5 text-brand-blue dark:text-white flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                  </div>
                  <h4 className="font-black text-base sm:text-lg text-brand-blue dark:text-white">Connect With Us</h4>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
                    Stay updated with our latest courses, tutorials, success stories, and creator tips.
                  </p>
                  <div className="flex gap-3">
                    <a href="https://www.instagram.com/creatorscollege_/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#f09433] hover:opacity-90 text-white flex items-center justify-center transition shadow-sm">
                      <Instagram size={18} />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61591290489327" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#3b5998] hover:opacity-90 text-white flex items-center justify-center transition shadow-sm">
                      <Facebook size={18} />
                    </a>
                    <a href="https://www.youtube.com/@creatorscollegeofficial" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#ff0000] hover:opacity-90 text-white flex items-center justify-center transition shadow-sm">
                      <Youtube size={18} />
                    </a>
                    <a href="https://t.me/creatorscollege" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0088cc] hover:opacity-90 text-white flex items-center justify-center transition shadow-sm">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m22 2-11 11M22 2l-7 20-4-9-9-4Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

            </div>
            <div className="lg:col-span-6 w-full">
              {isSuccess ? (
                <div className="bg-brand-blue/10 border border-brand-blue/30 p-8 rounded-3xl text-center space-y-6 shadow-xl">
                  <span className="text-4xl inline-block">🎉</span>
                  <h3 className="text-2xl font-bold text-brand-blue dark:text-white">Enquiry Submitted!</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Thank you <strong>{name}</strong>. Your enquiry has been registered. An academy coordinator will contact you on WhatsApp/Phone at <strong>{phone}</strong> within the next 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-2 px-6 rounded-lg text-xs transition"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-[#131b2e] p-6 sm:p-8 rounded-3xl border border-brand-blue/10 shadow-xl space-y-4 text-left">
                  <div className="flex gap-4 items-start border-b border-gray-100 dark:border-white/5 pb-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0 shadow-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase text-brand-orange tracking-widest block mb-0.5">Send Us an Enquiry</span>
                      <h3 className="text-base sm:text-lg font-black text-brand-blue dark:text-white leading-tight">
                        Interested in joining Creators College?
                      </h3>
                      <p className="text-[11px] text-gray-400 font-medium leading-none">Fill out the enquiry form below, and our team will contact you shortly.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="e.g., 9876543210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="anand@example.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="e.g. Hyderabad"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Profession</label>
                    <input
                      type="text"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      placeholder="e.g. Student, Shop Owner, Employee"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course Interested In</label>
                      <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white"
                      >
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Complete Telugu Content Creation Course</option>
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Complete Telugu CapCut Video Editing Course (Mobile & PC)</option>
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Adobe Premiere Pro (Coming Soon)</option>
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Adobe After Effects (Coming Soon)</option>
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">DaVinci Resolve (Coming Soon)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Preferred Learning Mode</label>
                      <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white"
                      >
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Online</option>
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Offline</option>
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Recorded</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Inquiry Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white"
                    >
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">General Enquiry</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Course Enrollment</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Free Demo Class</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Corporate Training</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">College Workshop</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Partnership</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Your Message</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      placeholder="Type details of your request here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3.5 rounded-xl text-xs transition shadow-lg text-center cursor-pointer uppercase tracking-wider"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Why Contact Section (10 styled Feature Icon cards) */}
      <section className="py-12 bg-white dark:bg-[#090d16] border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
              ⭐ <span className="text-brand-orange">Why</span> Contact Creators College?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-medium">When you reach out to us, we'll help you with:</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
            {whyContactBoxes.map((box, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveBox(activeBox === idx ? null : idx)}
                className={`border p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 shadow-sm hover:shadow transition duration-200 cursor-pointer w-full text-center ${
                  activeBox === idx
                    ? "bg-brand-orange text-white border-brand-orange scale-105"
                    : "bg-white dark:bg-[#131b2e] border-gray-100 dark:border-white/5 hover:border-brand-orange/30"
                }`}
              >
                <span className="text-2xl">{box.icon}</span>
                <h5 className={`text-[10px] font-black leading-tight ${activeBox === idx ? "text-white" : "text-brand-blue dark:text-white"}`}>
                  {box.title}
                </h5>
              </button>
            ))}
          </div>

          {activeBox !== null && (
            <div className="bg-brand-blue/5 dark:bg-white/5 border border-brand-orange/20 rounded-2xl p-6 text-left max-w-2xl mx-auto animate-fadeIn mt-6 space-y-2">
              <h4 className="font-black text-sm text-brand-orange uppercase tracking-wider flex items-center gap-2">
                <span>{whyContactBoxes[activeBox].icon}</span>
                <span>{whyContactBoxes[activeBox].title}</span>
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                {whyContactBoxes[activeBox].desc}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Our Courses Catalog */}
      <section className="py-12 md:py-20 bg-brand-gray/30 dark:bg-white/5 border-y border-gray-100 dark:border-white/5 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h3 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white flex items-center gap-2">
            🎓 Our Courses
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Course Card 1 */}
            <div className="bg-white dark:bg-[#131b2e] rounded-2xl border border-gray-100 dark:border-white/5 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition">
              <img
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80"
                alt="Content Creation Course"
                className="w-full h-44 object-cover"
              />
              <div className="p-6 space-y-4 flex flex-col justify-between flex-grow">
                <div className="space-y-2">
                  <h4 className="font-black text-base text-brand-blue dark:text-white">🎬 Content Creation Course</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    Master scripting, voiceover, mobile video shooting, editing, and page growth through practical Telugu training.
                  </p>
                </div>
                <Link href="/courses" className="inline-flex items-center justify-center w-full bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold py-2.5 rounded-lg shadow transition">
                  View Course Details &rarr;
                </Link>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white dark:bg-[#131b2e] rounded-2xl border border-gray-100 dark:border-white/5 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition">
              <img
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80"
                alt="CapCut Editing Course"
                className="w-full h-44 object-cover"
              />
              <div className="p-6 space-y-4 flex flex-col justify-between flex-grow">
                <div className="space-y-2">
                  <h4 className="font-black text-base text-brand-orange">✂️ CapCut Video Editing Course</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    Learn professional CapCut Video Editing, reels, shorts, animations, AI editing, and freelancing on Mobile &amp; PC.
                  </p>
                </div>
                <Link href="/courses" className="inline-flex items-center justify-center w-full bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold py-2.5 rounded-lg shadow transition">
                  View Course Details &rarr;
                </Link>
              </div>
            </div>

            {/* Upcoming Card (Dashed Border style) */}
            <div className="bg-white dark:bg-[#131b2e] rounded-2xl border-2 border-dashed border-brand-orange/30 p-6 flex flex-col justify-between hover:shadow-lg transition">
              <div className="space-y-4">
                <h4 className="font-black text-base text-brand-blue dark:text-white flex items-center gap-2">
                  🚀 Upcoming Courses
                </h4>
                <ul className="space-y-2 text-xs text-brand-charcoal dark:text-white font-bold pl-4 list-disc">
                  <li>Complete Telugu Adobe Premiere Pro Course</li>
                  <li>Complete Telugu Adobe After Effects Course</li>
                  <li>Complete Telugu DaVinci Resolve Course</li>
                </ul>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed font-normal">
                  Curriculums are currently in development to deliver the best project-based tools workflows in Telugu.
                </p>
              </div>
              <Link href="/courses" className="inline-flex items-center justify-center w-full bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold py-2.5 rounded-lg shadow transition mt-6">
                Join the Waiting List &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Corporate Training Block */}
      <section className="py-12 md:py-20 bg-white dark:bg-[#090d16] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left lists */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white flex items-center gap-2">
                  🏢 Corporate Training
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-medium">
                  Creators College also offers customized training programs for:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-brand-charcoal dark:text-white font-bold">
                <div className="flex items-center gap-2">🟢 Colleges</div>
                <div className="flex items-center gap-2">🟢 Schools</div>
                <div className="flex items-center gap-2">🟢 Corporate Companies</div>
                <div className="flex items-center gap-2">🟢 Startups</div>
                <div className="flex items-center gap-2">🟢 Small Businesses</div>
                <div className="flex items-center gap-2">🟢 Government Organizations</div>
                <div className="flex items-center gap-2">🟢 Educational Institutions</div>
              </div>
            </div>

            {/* Right details */}
            <div className="lg:col-span-5 bg-white dark:bg-[#131b2e] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-md space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] text-gray-500 dark:text-gray-400 font-extrabold">
                <div className="flex items-center gap-2">🏫 College Workshops</div>
                <div className="flex items-center gap-2">🎒 School Programs</div>
                <div className="flex items-center gap-2">💼 Business Training</div>
                <div className="flex items-center gap-2">🎬 Corporate Content Creation</div>
                <div className="flex items-center gap-2 col-span-1 sm:col-span-2">⚙️ Customized Formats</div>
              </div>
              <Link href="/corporate-training" className="inline-flex items-center justify-center w-full bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold py-3 rounded-xl shadow transition">
                Request Corporate Training &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-12 md:py-20 bg-brand-gray/30 dark:bg-white/5 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white">Contact Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Left FAQ Col */}
            <div className="space-y-4">
              {contactFaqs.slice(0, 3).map((faq, idx) => (
                <div key={idx} className="border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-[#131b2e]">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 flex justify-between items-center text-left transition"
                  >
                    <span className="font-bold text-xs sm:text-sm text-brand-blue dark:text-white">{faq.q}</span>
                    <span className="text-brand-orange font-bold text-lg">{activeFaq === idx ? "−" : "+"}</span>
                  </button>
                  {activeFaq === idx && (
                    <div className="px-6 py-4 bg-white dark:bg-[#131b2e] border-t border-gray-50 dark:border-white/5 animate-fadeIn">
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right FAQ Col */}
            <div className="space-y-4">
              {contactFaqs.slice(3).map((faq, idx) => {
                const adjustedIdx = idx + 3;
                return (
                  <div key={adjustedIdx} className="border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-[#131b2e]">
                    <button
                      onClick={() => setActiveFaq(activeFaq === adjustedIdx ? null : adjustedIdx)}
                      className="w-full px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 flex justify-between items-center text-left transition"
                    >
                      <span className="font-bold text-xs sm:text-sm text-brand-blue dark:text-white">{faq.q}</span>
                      <span className="text-brand-orange font-bold text-lg">{activeFaq === adjustedIdx ? "−" : "+"}</span>
                    </button>
                    {activeFaq === adjustedIdx && (
                      <div className="px-6 py-4 bg-white dark:bg-[#131b2e] border-t border-gray-50 dark:border-white/5 animate-fadeIn">
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="py-12 md:py-20 bg-brand-blue text-white text-left relative overflow-hidden border-t border-brand-blue-dark">
        <div className="absolute inset-0 bg-brand-orange/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left info */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange flex items-center gap-1.5">
                🚀 Ready to Start Your Creator Journey?
              </span>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal max-w-2xl">
                Take the first step toward becoming a professional Content Creator or Video Editor. Learn through practical, industry-focused Telugu training and build skills that help you create content, grow your brand, and unlock new career opportunities.
              </p>
            </div>

            {/* Right actions & metrics */}
            <div className="lg:col-span-5 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-[10px] text-white/70 font-bold border-b border-white/10 pb-6">
                <div>🎥 2,000+ Business Projects</div>
                <div>🏢 100+ Brands Worked With</div>
                <div>🗓️ 5+ Years Experience</div>
                <div>📈 500M+ Content Views</div>
                <div>🌐 Live Online &amp; Offline</div>
                <div>📼 Lifetime Recordings</div>
                <div>📜 Completion Certificate</div>
                <div>💬 Lifetime Student Support</div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/checkout" className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 px-6 rounded-full text-xs shadow-lg transition animate-enroll">
                  Enroll Now
                </Link>
                <a href="https://wa.me/918143937367" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-full text-xs shadow transition">
                  WhatsApp Us
                </a>
                <a href="tel:+918143937367" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-3 px-5 rounded-full text-xs transition">
                  Call Now
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
