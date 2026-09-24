import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Users,
  Video,
  CheckCircle2,
  Tv,
  Radio,
  Building2,
  Calendar,
  Layers,
  TrendingUp,
  MapPin,
  ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cecil Srungarapati | Founder & CEO of Creators College",
  description:
    "Cecil Srungarapati is the Founder & CEO of Creators College, founder of Telugu Tea Talks, and CEO of Perfect Prime News. Learn about his journey, experience and work.",
  keywords: [
    "Cecil Srungarapati",
    "Cecil Srungarapati Creators College",
    "Founder Creators College",
    "CEO Creators College",
    "Telugu Tea Talks Founder",
    "Perfect Prime News CEO",
    "Cecil Srungarapati Hyderabad",
    "Content Strategist Cecil Srungarapati",
    "Telugu Content Creation Educator",
    "Creators College Founder"
  ],
  alternates: {
    canonical: "https://www.creatorscollege.in/cecil-srungarapati",
  },
  openGraph: {
    title: "Cecil Srungarapati | Founder & CEO of Creators College",
    description:
      "Cecil Srungarapati is the Founder & CEO of Creators College, founder of Telugu Tea Talks, and CEO of Perfect Prime News. Learn about his journey, experience and work.",
    url: "https://www.creatorscollege.in/cecil-srungarapati",
    type: "profile",
    images: [
      {
        url: "https://www.creatorscollege.in/cecil.jpg",
        width: 800,
        height: 1000,
        alt: "Cecil Srungarapati - Founder & CEO of Creators College",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cecil Srungarapati | Founder & CEO of Creators College",
    description:
      "Cecil Srungarapati is the Founder & CEO of Creators College, founder of Telugu Tea Talks, and CEO of Perfect Prime News.",
    images: ["https://www.creatorscollege.in/cecil.jpg"],
  },
};

// Social icon helpers
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
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

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
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

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function CecilSrungarapatiPage() {
  // Canonical Cecil Person identity — this @id is referenced by
  // the site-wide Organization schemas and every BlogPosting author.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://www.creatorscollege.in/cecil-srungarapati#webpage",
        "url": "https://www.creatorscollege.in/cecil-srungarapati",
        "name": "Cecil Srungarapati | Founder & CEO of Creators College",
        "description":
          "Cecil Srungarapati is the Founder & CEO of Creators College, founder of Telugu Tea Talks, and CEO of Perfect Prime News. Learn about his journey, experience and work.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.creatorscollege.in"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Cecil Srungarapati",
              "item": "https://www.creatorscollege.in/cecil-srungarapati"
            }
          ]
        },
        "mainEntity": {
          "@id": "https://www.creatorscollege.in/cecil-srungarapati#person"
        }
      },
      {
        "@type": "Person",
        "@id": "https://www.creatorscollege.in/cecil-srungarapati#person",
        "name": "Cecil Srungarapati",
        "jobTitle": "Founder & CEO, Creators College",
        "description":
          "Cecil Srungarapati is an entrepreneur, educator, and content strategist based in Hyderabad, India. Founder & CEO of Creators College, founder of Telugu Tea Talks, and CEO of Perfect Prime News.",
        "image": "https://www.creatorscollege.in/cecil.jpg",
        "url": "https://www.creatorscollege.in/cecil-srungarapati",
        "worksFor": [
          {
            "@type": "EducationalOrganization",
            "@id": "https://www.creatorscollege.in#organization",
            "name": "Creators College",
            "url": "https://www.creatorscollege.in"
          },
          {
            "@type": "Organization",
            "name": "Telugu Tea Talks"
          },
          {
            "@type": "NewsMediaOrganization",
            "name": "Perfect Prime News"
          }
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Aarupadai Veedu Institute of Technology (AVIT), Chennai"
        },
        "sameAs": [
          "https://www.instagram.com/cecil_srungarapati/",
          "https://www.facebook.com/profile.php?id=100003936120952",
          "https://www.linkedin.com/in/cecilsrungarapati/"
        ]
      }
    ]
  };

  const currentRoles = [
    {
      title: "Founder & CEO",
      organization: "Creators College",
      type: "Content Creation Academy",
      description: "Content creation and video editing education for Telugu-speaking creators and professionals.",
      link: "https://www.creatorscollege.in/",
      isInternal: true,
      highlight: "Trained 300+ Students",
      badgeColor: "bg-brand-orange text-white"
    },
    {
      title: "Founder",
      organization: "Telugu Tea Talks",
      type: "Digital Media Platform",
      description: "Digital content and business promotions platform with an engaged community.",
      link: "https://www.instagram.com/cecil_srungarapati/",
      isInternal: false,
      highlight: "800,000+ Followers",
      badgeColor: "bg-blue-600 text-white"
    },
    {
      title: "CEO",
      organization: "Perfect Prime News",
      type: "News & Media Operations",
      description: "Digital media operations, team leadership, editorial workflows, and media execution.",
      link: "https://www.linkedin.com/in/cecilsrungarapati/",
      isInternal: false,
      highlight: "Editorial Leadership",
      badgeColor: "bg-emerald-600 text-white"
    }
  ];

  const itExperienceCompanies = [
    "Firstsource",
    "Omega Healthcare",
    "NTT DATA",
    "Access Healthcare",
    "Inventurus Knowledge Solutions (IKS)",
    "HCL",
    "Wipro",
    "Genpact"
  ];

  const focusAreas = [
    "Building and developing Creators College",
    "Content creation education & structured curriculums",
    "Training aspiring creators and business owners",
    "Content strategy and digital content systems",
    "Managing content teams and publishing workflows",
    "Building and operating digital media platforms"
  ];

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@cecil_srungarapati",
      label: "Cecil Srungarapati",
      url: "https://www.instagram.com/cecil_srungarapati/",
      icon: InstagramIcon,
      color: "hover:text-pink-500 hover:border-pink-500/30"
    },
    {
      name: "LinkedIn",
      handle: "in/cecilsrungarapati",
      label: "Cecil Srungarapati",
      url: "https://www.linkedin.com/in/cecilsrungarapati/",
      icon: LinkedInIcon,
      color: "hover:text-blue-500 hover:border-blue-500/30"
    },
    {
      name: "Facebook",
      handle: "Cecil Srungarapati Profile",
      label: "Cecil Srungarapati",
      url: "https://www.facebook.com/profile.php?id=100003936120952",
      icon: FacebookIcon,
      color: "hover:text-blue-600 hover:border-blue-600/30"
    },
    {
      name: "Official Academy",
      handle: "creatorscollege.in",
      label: "Creators College",
      url: "https://www.creatorscollege.in/",
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      color: "hover:text-brand-orange hover:border-brand-orange/30"
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-[#090d16] text-brand-charcoal dark:text-gray-100 min-h-screen">
      {/* Structured Schema.org data for Google, Bing, LLMs, and AEO — single canonical Person graph, no duplicates */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      {/* Hero Section */}
      <section className="relative text-white pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-gradient-to-br from-[#0f4cbe] via-[#0b3894] to-[#082870]">
        {/* Glow and Decorative Accents */}
        <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] rounded-full bg-brand-orange/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-white transition duration-150">
                  Home
                </Link>
              </li>
              <ChevronRight size={14} className="text-white/40" />
              <li className="text-brand-orange font-bold">Cecil Srungarapati</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white">
                <Sparkles size={14} className="text-brand-orange stroke-[2.5]" />
                Founder &amp; CEO Profile
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                  Cecil Srungarapati
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-brand-orange tracking-tight">
                  Founder &amp; CEO, Creators College
                </p>
              </div>

              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal max-w-2xl">
                Cecil Srungarapati is an entrepreneur, educator, and content strategist based in Hyderabad, India. He is the Founder &amp; CEO of Creators College, an academy focused on teaching content creation and professional video editing in Telugu.
              </p>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                He is also the founder of <strong className="text-white">Telugu Tea Talks</strong> and serves as the CEO of <strong className="text-white">Perfect Prime News</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="https://www.linkedin.com/in/cecilsrungarapati/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-6 py-3 rounded-full text-sm shadow-lg hover:shadow-brand-orange/30 transition duration-200 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <LinkedInIcon size={16} />
                  Connect on LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/cecil_srungarapati/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3 rounded-full text-sm backdrop-blur-md transition duration-200 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <InstagramIcon size={16} />
                  Follow on Instagram
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold px-4 py-3 underline underline-offset-4 decoration-white/40 hover:decoration-white transition"
                >
                  About Creators College &rarr;
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap gap-6 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-brand-orange" />
                  <span>Hyderabad, Telangana, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={15} className="text-brand-orange" />
                  <span>AVIT Chennai Alumni (2016)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={15} className="text-brand-orange" />
                  <span>300+ Students Trained</span>
                </div>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/20 bg-[#050c21] shadow-2xl group">
                <Image
                  src="/cecil.jpg"
                  alt="Cecil Srungarapati - Founder & CEO of Creators College"
                  fill
                  priority
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                />
                
                {/* Soft gradient vignette at the bottom */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#082870] via-[#082870]/70 to-transparent z-10" />

                {/* Floating Glassmorphic Badges */}
                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-[11px] font-bold text-white shadow-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Educator
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-20 space-y-1.5 bg-black/65 backdrop-blur-md border border-white/15 p-4 rounded-2xl shadow-xl select-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand-orange text-white px-2 py-0.5 rounded">
                      Leadership
                    </span>
                    <span className="text-[11px] text-white/80 font-bold">
                      Hyderabad, India
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">Cecil Srungarapati</h3>
                  <p className="text-[11px] text-gray-300 font-medium leading-snug">
                    Founder &amp; CEO, Creators College • Founder, Telugu Tea Talks • CEO, Perfect Prime News
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Current Roles Section */}
      <section className="py-12 md:py-16 bg-brand-gray/40 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-orange">
              Executive Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
              Current Roles &amp; Ventures
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Key initiatives and leadership roles led by Cecil Srungarapati.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentRoles.map((role, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1 text-left relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${role.badgeColor}`}>
                      {role.highlight}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">
                      {role.type}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                      {role.title}
                    </p>
                    <h3 className="text-xl font-black text-brand-blue dark:text-white tracking-tight">
                      {role.organization}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                    {role.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                  {role.isInternal ? (
                    <Link
                      href="/"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue dark:text-white hover:text-brand-orange transition"
                    >
                      Visit Creators College
                      <ArrowRight size={13} />
                    </Link>
                  ) : (
                    <a
                      href={role.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue dark:text-white hover:text-brand-orange transition"
                    >
                      Learn More
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Biography & Detailed Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Main Editorial Articles */}
            <div className="lg:col-span-8 space-y-14 text-left">
              
              {/* Section 1: Founder & CEO of Creators College */}
              <article className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
                  <Award size={16} />
                  Signature Academy
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
                  Founder &amp; CEO of Creators College
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  <p>
                    Cecil founded <strong className="text-brand-charcoal dark:text-white">Creators College in 2026</strong> with the goal of making practical content creation and video editing education accessible to Telugu-speaking learners.
                  </p>
                  <p>
                    Creators College provides training in content creation as well as professional video editing tools and workflows, including <span className="font-semibold text-brand-blue dark:text-blue-400">Adobe Premiere Pro</span>, <span className="font-semibold text-brand-blue dark:text-blue-400">Adobe After Effects</span>, <span className="font-semibold text-brand-blue dark:text-blue-400">DaVinci Resolve</span>, and <span className="font-semibold text-brand-blue dark:text-blue-400">CapCut</span>.
                  </p>
                  <p>
                    Cecil personally teaches content creation at Creators College, sharing practical knowledge from his experience building and managing digital content platforms and working with businesses.
                  </p>
                  <p>
                    Professional video editing courses at Creators College are handled by experienced trainers specializing in their respective editing tools and workflows.
                  </p>
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm shrink-0">
                      300+
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-brand-blue dark:text-blue-200 leading-snug">
                      Creators College has trained more than <strong>300 students</strong> in content creation and video editing across Telangana, Andhra Pradesh, and abroad.
                    </p>
                  </div>
                </div>
              </article>

              {/* Section 2: From Engineering and IT to Entrepreneurship */}
              <article className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
                  <Briefcase size={16} />
                  Career Evolution
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
                  From Engineering and IT to Entrepreneurship
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  <p>
                    Cecil studied <strong>Automobile Engineering at Aarupadai Veedu Institute of Technology (AVIT), Chennai</strong>, and graduated in 2016.
                  </p>
                  <p>
                    Before moving full-time into entrepreneurship, he built professional experience across the IT and business-services sectors. His career included experience with organizations such as:
                  </p>

                  {/* Company Pills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 pb-2">
                    {itExperienceCompanies.map((company, i) => (
                      <div
                        key={i}
                        className="bg-brand-gray/60 dark:bg-white/5 border border-gray-200/70 dark:border-white/10 px-3 py-2 rounded-xl text-xs font-bold text-brand-charcoal dark:text-white text-center flex items-center justify-center shadow-xs"
                      >
                        {company}
                      </div>
                    ))}
                  </div>

                  <p>
                    He later worked as an <strong>Application Owner in the IT sector</strong> before focusing on entrepreneurship, digital content, and education.
                  </p>
                </div>
              </article>

              {/* Section 3: Building Telugu Tea Talks */}
              <article className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
                  <Tv size={16} />
                  Digital Media Growth
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
                  Building Telugu Tea Talks
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  <p>
                    Cecil&apos;s journey in digital content began with an initiative called <strong>Creative Knight</strong>, which he initially started with his mother, <strong>Mary Stella</strong>, to create informative videos.
                  </p>
                  <p>
                    Creative Knight built an audience on YouTube and later evolved into <strong>Telugu Tea Talks</strong>.
                  </p>
                  <p>
                    Telugu Tea Talks was subsequently developed with <strong>Kusum Ganji</strong> and <strong>Lavanya Ganji</strong>, expanding into digital content and business promotions.
                  </p>
                  <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40 flex items-center gap-3.5">
                    <span className="text-2xl">🚀</span>
                    <p className="text-xs sm:text-sm font-semibold text-brand-charcoal dark:text-orange-200 leading-snug">
                      Cecil is the founder of Telugu Tea Talks. By 2026, Telugu Tea Talks had built a combined following of <strong>more than 800,000</strong> across its social media platforms.
                    </p>
                  </div>
                </div>
              </article>

              {/* Section 4: CEO of Perfect Prime News */}
              <article className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
                  <Radio size={16} />
                  Editorial Leadership
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
                  CEO of Perfect Prime News
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  <p>
                    Cecil also serves as <strong>CEO of Perfect Prime News</strong>, where he oversees the team and digital content operations.
                  </p>
                  <p>
                    His role includes managing content operations, team coordination, publishing workflows, and the overall execution of the digital media platform.
                  </p>
                </div>
              </article>

              {/* Section 5: Educator and Trainer */}
              <article className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
                  <GraduationCap size={16} />
                  Practical Education
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
                  Educator and Trainer
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  <p>
                    Alongside building digital platforms, Cecil works directly with aspiring creators, professionals, and business owners.
                  </p>
                  <p>
                    At Creators College, he teaches practical content creation, helping students understand areas such as content ideation, planning, scripting, content production, social media content, and the processes involved in building digital audiences.
                  </p>
                  <p>
                    He has also conducted external training and workshops, including a <strong>content creation workshop at HIITMS Academy in Ameerpet, Hyderabad</strong>.
                  </p>
                  <p>
                    His approach to education focuses on practical implementation and helping students understand how content is actually planned, produced, managed, and distributed in the modern creator economy.
                  </p>
                </div>
              </article>

            </div>

            {/* Sticky Sidebar (Focus Areas + Social Profiles + Academy Links) */}
            <div className="lg:col-span-4 space-y-8 sticky top-24 text-left">
              
              {/* Professional Focus Box */}
              <div className="bg-white dark:bg-[#131b2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-orange">
                    Core Competencies
                  </span>
                  <h3 className="text-lg font-black text-brand-blue dark:text-white tracking-tight">
                    Professional Focus
                  </h3>
                </div>

                <div className="space-y-3">
                  {focusAreas.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={13} className="stroke-[2.5]" />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  His primary focus is developing Creators College as a practical learning platform for Telugu-speaking students who want to build professional skills in content creation and video editing.
                </div>
              </div>

              {/* Official Profiles Card */}
              <div className="bg-white dark:bg-[#131b2e] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-orange">
                    Verified Channels
                  </span>
                  <h3 className="text-lg font-black text-brand-blue dark:text-white tracking-tight">
                    Official Profiles
                  </h3>
                </div>

                <div className="space-y-3">
                  {socialLinks.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02] transition duration-200 group ${item.color}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center text-brand-charcoal dark:text-white shadow-xs group-hover:scale-110 transition">
                            <IconComp size={16} />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-brand-charcoal dark:text-white">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-gray-400 font-medium">
                              {item.label}
                            </div>
                          </div>
                        </div>
                        <ExternalLink size={14} className="text-gray-400 group-hover:translate-x-0.5 transition" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Course CTA Card */}
              <div className="bg-gradient-to-br from-[#0c152b] to-[#12234f] text-white p-6 rounded-2xl border border-brand-orange/30 shadow-xl space-y-4">
                <span className="bg-brand-orange text-white text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded">
                  Learn with Cecil
                </span>
                <h4 className="text-base font-black text-white leading-tight">
                  Master Content Creation in Telugu
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Join the 20-day practical training batch directly taught by Cecil Srungarapati. Learn smartphone shooting, scripting, CapCut editing, and social media audience growth.
                </p>
                <Link
                  href="/checkout"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition duration-200 hover:scale-[1.02] shadow-md shadow-brand-orange/20"
                >
                  Enroll Now in Next Batch
                  <ArrowRight size={14} />
                </Link>
                <div className="text-center">
                  <Link
                    href="/blog"
                    className="text-[11px] text-gray-300 hover:text-brand-orange underline underline-offset-2 transition"
                  >
                    Read Articles Written by Cecil &rarr;
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Articles & Insights Link Banner */}
      <section className="py-12 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-brand-blue dark:text-white">
              Looking for creator guides and insights?
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Read step-by-step video editing tutorials, retention formulas, and platform growth blueprints on our Blog.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-3 px-6 rounded-full text-xs transition hover:scale-105 shadow-md"
            >
              <BookOpen size={15} />
              Read Blog Articles
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 hover:border-brand-orange text-brand-charcoal dark:text-white font-bold py-3 px-6 rounded-full text-xs transition hover:scale-105 shadow-sm"
            >
              <Video size={15} />
              View Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
