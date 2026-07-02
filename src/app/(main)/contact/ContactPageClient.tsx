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
      {/* Header */}
      <section 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1200&q=80')" }}
        className="relative bg-cover bg-center text-white py-20 md:py-28 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/45 dark:bg-black/70" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-4">
          <span className="text-xs font-bold uppercase bg-brand-orange text-white px-3 py-1 rounded-full">Get In Touch</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Contact Creators College
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed font-medium">
            Looking to learn Content Creation, Video Editing, or explore our Corporate Training Programs? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 bg-white dark:bg-[#090d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Info details & Maps */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                  Reach Us
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue dark:text-white tracking-tight">
                  Get in Touch Instantly
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  Whether you're a Student, Job Seeker, Housewife, Business Owner, Working Professional, Freelancer, or an organization seeking Corporate Training, our team is here to guide you every step of the way.
                </p>
              </div>

              {/* Contact Icons */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start border-b border-gray-100 dark:border-white/5 pb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 dark:bg-white/5 text-brand-blue dark:text-white flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-blue dark:text-white">Campus Address</h4>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Creators College, KPHB, Hyderabad, Telangana, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-b border-gray-100 dark:border-white/5 pb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 dark:bg-white/5 text-brand-blue dark:text-white flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-brand-blue dark:text-white">Call Us</h4>
                    <p className="text-xs text-gray-400">Have questions about our courses or training programs? Our team is just a phone call away.</p>
                    <a href="tel:+918143937367" className="inline-flex items-center gap-2 bg-brand-orange text-white text-xs font-bold py-2 px-4 rounded-lg shadow hover:bg-brand-orange-dark transition">
                      📞 +91 81439 37367
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-b border-gray-100 dark:border-white/5 pb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 dark:bg-white/5 text-brand-blue dark:text-white flex items-center justify-center shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-brand-blue dark:text-white">WhatsApp Us</h4>
                    <p className="text-xs text-gray-400">Chat with us on WhatsApp to get instant assistance regarding: Course Details, Upcoming Batches, Fee Information, Demo Classes, Corporate Training, Workshops.</p>
                    <a href="https://wa.me/918143937367" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 px-4 rounded-lg shadow transition">
                      🟢 WhatsApp Now
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-b border-gray-100 dark:border-white/5 pb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 dark:bg-white/5 text-brand-blue dark:text-white flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-blue dark:text-white">Email Us</h4>
                    <p className="text-xs text-gray-400 mb-1">For course inquiries, partnerships, corporate training, or support, send us an email:</p>
                    <a href="mailto:info@creatorscollege.in" className="text-xs sm:text-sm font-bold text-brand-orange hover:underline transition">
                      info@creatorscollege.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
                <h4 className="font-bold text-sm text-brand-blue dark:text-white">Connect With Us</h4>
                <p className="text-xs text-gray-400">Stay updated with our latest courses, tutorials, success stories, and creator tips.</p>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/creatorscollege_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-brand-gray dark:bg-white/5 border border-gray-200 dark:border-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white hover:border-brand-orange transition duration-200 text-brand-charcoal dark:text-white"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61591290489327"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-brand-gray dark:bg-white/5 border border-gray-200 dark:border-white/5 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition duration-200 text-brand-charcoal dark:text-white"
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href="https://www.youtube.com/@creatorscollegeofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-brand-gray dark:bg-white/5 border border-gray-200 dark:border-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition duration-200 text-brand-charcoal dark:text-white"
                  >
                    <Youtube size={18} />
                  </a>
                </div>
              </div>

              {/* Google Map Iframe */}
              <div className="rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/5 bg-brand-gray dark:bg-brand-gray/20 aspect-video relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.292942475019!2d78.38883651119799!3d17.481617283350106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m3!2d78.38883651119799!3d17.481617283350106!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              </div>

            </div>

            {/* Custom inquiry form */}
            <div className="lg:col-span-6 w-full space-y-8">
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
                <form onSubmit={handleSubmit} className="bg-white dark:bg-brand-gray p-6 sm:p-8 rounded-3xl border border-brand-blue/15 shadow-xl space-y-4 text-left">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-brand-blue dark:text-white">📝 Send Us an Enquiry</h3>
                    <p className="text-xs text-gray-400">Interested in joining Creators College? Fill out the enquiry form below, and our team will contact you shortly.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="e.g. 9876543210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="anand@example.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="e.g. Hyderabad"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Profession</label>
                    <input
                      type="text"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      placeholder="e.g. Student, Shop Owner, Employee"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Course Interested In</label>
                      <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white"
                      >
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Complete Telugu Content Creation Course</option>
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Complete Telugu CapCut Video Editing Course (Mobile & PC)</option>
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Adobe Premiere Pro (Coming Soon)</option>
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Adobe After Effects (Coming Soon)</option>
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">DaVinci Resolve (Coming Soon)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Preferred Learning Mode</label>
                      <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white"
                      >
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Online</option>
                        <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Offline</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Inquiry Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs focus:outline-none bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-white"
                    >
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">General Enquiry</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Course Admission</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Free Demo Class</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Corporate Training</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">College Workshop</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">School Program</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Business Training</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Customized Training Program</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Partnership</option>
                      <option className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Your Message</label>
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
                    className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 rounded-xl text-xs transition shadow-lg text-center cursor-pointer uppercase tracking-wider"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </form>
              )}

              {/* Why Contact Creators College */}
              <div className="bg-brand-gray/30 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-6 rounded-2xl space-y-3">
                <h4 className="font-extrabold text-sm text-brand-blue dark:text-white">⭐ Why Contact Creators College?</h4>
                <p className="text-xs text-gray-400">When you reach out to us, we'll help you with:</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <div>✓ Course Selection Guidance</div>
                  <div>✓ Career Advice</div>
                  <div>✓ Batch Timings</div>
                  <div>✓ Course Curriculum</div>
                  <div>✓ Demo Classes</div>
                  <div>✓ Fee Details</div>
                  <div>✓ Corporate Training</div>
                  <div>✓ Workshops</div>
                  <div>✓ Learning Roadmap</div>
                  <div>✓ Enrollment Support</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Structured Directories Section */}
      <section className="py-16 bg-brand-gray/30 dark:bg-white/5 border-y border-gray-100 dark:border-white/5 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Our Courses */}
            <div className="bg-white dark:bg-brand-gray p-6 rounded-2xl border border-gray-100 dark:border-white/5 space-y-4">
              <h4 className="font-black text-sm text-brand-blue dark:text-white uppercase tracking-wider">🎓 Our Courses</h4>
              <div className="space-y-3 text-xs text-gray-500 dark:text-gray-400">
                <div className="space-y-1">
                  <h5 className="font-bold text-brand-charcoal dark:text-white">🎬 Content Creation Course</h5>
                  <p className="leading-relaxed">Master scripting, voiceover, mobile video shooting, editing, and page growth through practical Telugu training.</p>
                  <Link href="/courses" className="text-brand-orange font-bold hover:underline">View Course Details &rarr;</Link>
                </div>
                <div className="space-y-1 border-t border-gray-100 dark:border-white/5 pt-3">
                  <h5 className="font-bold text-brand-charcoal dark:text-white">✂️ CapCut Video Editing Course</h5>
                  <p className="leading-relaxed">Learn professional CapCut Video Editing, reels, shorts, animations, AI editing, and freelancing on Mobile &amp; PC.</p>
                  <Link href="/courses" className="text-brand-orange font-bold hover:underline">View Course Details &rarr;</Link>
                </div>
              </div>
            </div>

            {/* Upcoming Courses */}
            <div className="bg-white dark:bg-brand-gray p-6 rounded-2xl border border-gray-100 dark:border-white/5 space-y-4">
              <h4 className="font-black text-sm text-brand-blue dark:text-white uppercase tracking-wider">🚀 Upcoming Courses</h4>
              <div className="space-y-3 text-xs text-gray-500 dark:text-gray-400">
                <ul className="space-y-2 list-disc pl-4 font-bold text-brand-charcoal dark:text-white">
                  <li>Complete Telugu Adobe Premiere Pro Course</li>
                  <li>Complete Telugu Adobe After Effects Course</li>
                  <li>Complete Telugu DaVinci Resolve Course</li>
                </ul>
                <p className="text-[11px] text-gray-400">Curriculums are currently in development to deliver the best project-based tools workflows in Telugu.</p>
                <div className="pt-2">
                  <Link href="/courses" className="text-brand-orange font-bold hover:underline">Join the Waiting List &rarr;</Link>
                </div>
              </div>
            </div>

            {/* Corporate Training */}
            <div className="bg-white dark:bg-brand-gray p-6 rounded-2xl border border-gray-100 dark:border-white/5 space-y-4">
              <h4 className="font-black text-sm text-brand-blue dark:text-white uppercase tracking-wider">🏢 Corporate Training</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Creators College also offers customized training programs for: Colleges, Schools, Corporate Companies, Startups, Small Businesses, Government Organizations, and Educational Institutions.
              </p>
              <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300 font-semibold">
                <div>✓ College Workshops</div>
                <div>✓ School Programs</div>
                <div>✓ Business Training</div>
                <div>✓ Corporate Content Creation</div>
                <div>✓ Customized Formats</div>
              </div>
              <div className="pt-2">
                <Link href="/corporate-training" className="inline-flex items-center gap-1.5 bg-brand-orange text-white text-xs font-bold py-2 px-4 rounded-lg shadow hover:bg-brand-orange-dark transition">
                  Request Corporate Training
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-20 bg-white dark:bg-[#090d16]">
        <div className="max-w-3xl mx-auto px-4 text-left">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">FAQ</span>
            <h2 className="text-3xl font-black text-brand-blue dark:text-white">Contact Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {contactFaqs.map((faq, idx) => (
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

      {/* Bottom CTA Block */}
      <section className="py-16 bg-brand-blue text-white text-left relative overflow-hidden border-t border-brand-blue-dark">
        <div className="absolute inset-0 bg-brand-orange/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black">🚀 Ready to Start Your Creator Journey?</h2>
          <p className="text-sm text-white/80 leading-relaxed font-normal max-w-2xl">
            Take the first step toward becoming a professional Content Creator or Video Editor. Learn through practical, industry-focused Telugu training and build skills that help you create content, grow your brand, and unlock new career opportunities.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-white/70 font-bold border-y border-white/10 py-6">
            <div>🎥 2,000+ Business Projects</div>
            <div>🏢 100+ Brands Worked With</div>
            <div>🗓️ 5+ Years Experience</div>
            <div>📈 500M+ Content Views</div>
            <div>🌐 Live Online &amp; Offline</div>
            <div>📼 Lifetime Recordings</div>
            <div>📜 Completion Certificate</div>
            <div>💬 Lifetime Student Support</div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/checkout" className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 px-8 rounded-full text-xs shadow-lg transition">
              Enroll Now
            </Link>
            <a href="https://wa.me/918143937367" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-xs shadow transition">
              WhatsApp Us
            </a>
            <a href="tel:+918143937367" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-3 px-6 rounded-full text-xs transition">
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
