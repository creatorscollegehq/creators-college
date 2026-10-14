import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Award,
  Briefcase,
  GraduationCap,
  Users,
  Building2,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Globe,
  Tv,
  Radio
} from "lucide-react";

export const metadata: Metadata = {
  title: "Lavanya Ganji – Founder & CEO of Telugu Twenty",
  description:
    "Learn about Lavanya Ganji, Founder & CEO of Telugu Twenty, her professional journey, business leadership, media experience, and work across multiple industries.",
  keywords: [
    "Lavanya Ganji",
    "Lavanya Ganji Telugu Twenty",
    "Founder Telugu Twenty",
    "CEO Telugu Twenty",
    "Telugu Tea Talks Managing Director",
    "Perfect Prime Media Managing Director",
    "Creators College Managing Partner",
    "Lavanya Ganji Hyderabad",
    "Telugu Twenty Founder",
    "Business content creator Hyderabad"
  ],
  alternates: {
    canonical: "https://www.creatorscollege.in/lavanya-ganji",
  },
  openGraph: {
    title: "Lavanya Ganji – Founder & CEO of Telugu Twenty",
    description:
      "Learn about Lavanya Ganji, Founder & CEO of Telugu Twenty, her professional journey, business leadership, media experience, and work across multiple industries.",
    url: "https://www.creatorscollege.in/lavanya-ganji",
    type: "profile",
    images: [
      {
        url: "https://www.creatorscollege.in/lavanya-ganji-founder-telugu-twenty.jpeg",
        width: 1200,
        height: 1495,
        alt: "Lavanya Ganji, Founder & CEO of Telugu Twenty",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lavanya Ganji – Founder & CEO of Telugu Twenty",
    description:
      "Learn about Lavanya Ganji, Founder & CEO of Telugu Twenty, her professional journey, business leadership, media experience, and work across multiple industries.",
    images: ["https://www.creatorscollege.in/lavanya-ganji-founder-telugu-twenty.jpeg"],
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

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
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
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

export default function LavanyaGanjiPage() {
  // Canonical Lavanya Person identity — single graph, no duplicates.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://www.creatorscollege.in/lavanya-ganji#webpage",
        "url": "https://www.creatorscollege.in/lavanya-ganji",
        "name": "Lavanya Ganji – Founder & CEO of Telugu Twenty",
        "description":
          "Learn about Lavanya Ganji, Founder & CEO of Telugu Twenty, her professional journey, business leadership, media experience, and work across multiple industries.",
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
              "name": "Lavanya Ganji",
              "item": "https://www.creatorscollege.in/lavanya-ganji"
            }
          ]
        },
        "mainEntity": {
          "@id": "https://www.creatorscollege.in/lavanya-ganji#person"
        }
      },
      {
        "@type": "Person",
        "@id": "https://www.creatorscollege.in/lavanya-ganji#person",
        "name": "Lavanya Ganji",
        "jobTitle": "Founder & CEO, Telugu Twenty",
        "description":
          "Lavanya Ganji is an entrepreneur and business leader based in Hyderabad, India. Founder & CEO of Telugu Twenty, Managing Director of Perfect Prime Media and Telugu Tea Talks, and Managing Partner of Creators College.",
        "image": "https://www.creatorscollege.in/lavanya-ganji-founder-telugu-twenty.jpeg",
        "url": "https://www.creatorscollege.in/lavanya-ganji",
        "worksFor": [
          {
            "@type": "Organization",
            "name": "Telugu Twenty",
            "url": "https://www.instagram.com/telugu_twenty/"
          },
          {
            "@type": "Organization",
            "name": "Perfect Prime Media"
          },
          {
            "@type": "Organization",
            "name": "Telugu Tea Talks"
          },
          {
            "@type": "EducationalOrganization",
            "@id": "https://www.creatorscollege.in#organization",
            "name": "Creators College",
            "url": "https://www.creatorscollege.in"
          }
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Bachelor of Technology (B.Tech.), Electrical and Electronics Engineering (EEE), 2014"
        },
        "sameAs": [
          "https://www.instagram.com/the_lavanya_ganji/",
          "https://www.facebook.com/profile.php?id=61578853408957",
          "https://www.instagram.com/telugu_twenty/",
          "https://www.youtube.com/@TeluguTeaTalks",
          "https://www.instagram.com/telugu_tea_talks/?hl=en",
          "https://www.facebook.com/teluguteatalks"
        ]
      }
    ]
  };

  const designations = [
    {
      title: "Founder & CEO",
      organization: "Telugu Twenty",
      type: "Business Media Brand",
      description: "Business-focused content creation and digital media brand working with businesses across multiple industries.",
      link: "https://www.instagram.com/telugu_twenty/",
      isInternal: false,
      highlight: "2,000+ Businesses",
      badgeColor: "bg-brand-orange text-white"
    },
    {
      title: "Managing Director",
      organization: "Perfect Prime Media",
      type: "Media & Business",
      description: "Business coordination, client communication, project management, and media-related initiatives. Perfect Prime News is part of Perfect Prime Media.",
      link: "https://www.creatorscollege.in/",
      isInternal: true,
      highlight: "Media Leadership",
      badgeColor: "bg-blue-600 text-white"
    },
    {
      title: "Managing Director",
      organization: "Telugu Tea Talks",
      type: "Digital Media Platform",
      description: "End-to-end coordination of business and production activities — shoots, clients, editing, deliverables, and handover.",
      link: "https://www.youtube.com/@TeluguTeaTalks",
      isInternal: false,
      highlight: "Production Leadership",
      badgeColor: "bg-emerald-600 text-white"
    },
    {
      title: "Managing Partner",
      organization: "Creators College",
      type: "Training Academy",
      description: "Management, admissions, operations, batch coordination, student management, business development, and marketing.",
      link: "https://www.creatorscollege.in/",
      isInternal: true,
      highlight: "Academy Partner",
      badgeColor: "bg-purple-600 text-white"
    }
  ];

  const industries = [
    "Steel doors, modern doors & home improvement",
    "Furniture, interiors & furnishings",
    "Water purifiers & air conditioning",
    "Lighting & bathroom products",
    "Hotels & hospitality",
    "Fashion, clothing & retail",
    "Food & food-related businesses",
    "Cars, bikes & automotive",
    "EV charging stations & infrastructure",
    "Other local & regional businesses"
  ];

  const portfolio = [
    "Noor Modern Doors",
    "MN Steel Wood Doors and Interiors, Khammam",
    "Dwaraka Doors",
    "SVV Interiors",
    "Middle Class Homes Furniture",
    "HOF Pragathi Nagar",
    "Sri Krishna Handloom & Furnishings",
    "Himajal Water Purifiers",
    "MAK Bath Lights",
    "Indras Flash EV Hub",
    "Bolt.Earth EV Charging Station",
    "Samskruti Boutique & Sarees",
    "SJ The Fashion Wear",
    "VRF Food Solutions",
    "Tharvi Hotels",
    "Saras Fair Hyderabad",
    "SRK TradeCorp Pvt. Ltd.",
    "Vcube Software Solutions",
    "The Tidy Traders",
    "Glooubha Skin and Hair Clinic",
    "Ananya Sewing Machine",
    "L&T brick-making machine project, Noida"
  ];

  const experience = [
    {
      company: "ExcelR",
      role: "Business Manager",
      duration: "2015–2019"
    },
    {
      company: "Genpact",
      role: "Professional experience including working with a Google client",
      duration: "2019–2020"
    },
    {
      company: "Premari / HSBC Client",
      role: "Senior Rally Manager",
      duration: "2020–2021"
    }
  ];

  const teaTalksWork = [
    "Shoot scheduling and coordination",
    "Client communication and follow-ups",
    "Production planning and coordination",
    "Video editing and revision follow-ups",
    "Deliverables and deadline tracking",
    "Final content handover"
  ];

  const focusAreas = [
    "Business management and operations",
    "Marketing and business development",
    "Client coordination and communication",
    "Production management and scheduling",
    "Media project execution and delivery",
    "Building and managing business initiatives"
  ];

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@the_lavanya_ganji",
      label: "Lavanya Ganji",
      url: "https://www.instagram.com/the_lavanya_ganji/",
      icon: InstagramIcon,
      color: "hover:text-pink-500 hover:border-pink-500/30"
    },
    {
      name: "Facebook",
      handle: "Lavanya Ganji Profile",
      label: "Lavanya Ganji",
      url: "https://www.facebook.com/profile.php?id=61578853408957",
      icon: FacebookIcon,
      color: "hover:text-blue-600 hover:border-blue-600/30"
    },
    {
      name: "Telugu Twenty",
      handle: "@telugu_twenty",
      label: "Business Media Brand",
      url: "https://www.instagram.com/telugu_twenty/",
      icon: InstagramIcon,
      color: "hover:text-brand-orange hover:border-brand-orange/30"
    },
    {
      name: "YouTube",
      handle: "@TeluguTeaTalks",
      label: "Telugu Tea Talks",
      url: "https://www.youtube.com/@TeluguTeaTalks",
      icon: YoutubeIcon,
      color: "hover:text-red-500 hover:border-red-500/30"
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
              <li className="text-brand-orange font-bold">Lavanya Ganji</li>
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
                  Lavanya Ganji
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-brand-orange tracking-tight">
                  Founder &amp; CEO, Telugu Twenty
                </p>
              </div>

              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal max-w-2xl">
                Lavanya Ganji is an entrepreneur and business leader based in Hyderabad, Telangana. She is the Founder &amp; CEO of Telugu Twenty, a business-focused content creation and digital media brand that works with businesses across multiple industries.
              </p>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                She is also the <strong className="text-white">Managing Director of Perfect Prime Media</strong> and <strong className="text-white">Telugu Tea Talks</strong>, and serves as a <strong className="text-white">Managing Partner of Creators College</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="https://www.instagram.com/the_lavanya_ganji/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-6 py-3 rounded-full text-sm shadow-lg hover:shadow-brand-orange/30 transition duration-200 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <InstagramIcon size={16} />
                  Connect on Instagram
                </a>
                <a
                  href="https://www.instagram.com/telugu_twenty/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3 rounded-full text-sm backdrop-blur-md transition duration-200 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Building2 size={16} />
                  Explore Telugu Twenty
                </a>
                <Link
                  href="/cecil-srungarapati"
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold px-4 py-3 underline underline-offset-4 decoration-white/40 hover:decoration-white transition"
                >
                  Meet Cecil Srungarapati &rarr;
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap gap-6 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-brand-orange" />
                  <span>KPHB, Hyderabad, Telangana</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={15} className="text-brand-orange" />
                  <span>B.Tech EEE (2014)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={15} className="text-brand-orange" />
                  <span>2,000+ Businesses Served</span>
                </div>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/20 bg-[#050c21] shadow-2xl group">
                <Image
                  src="/lavanya-ganji-founder-telugu-twenty.jpeg"
                  alt="Lavanya Ganji, Founder & CEO of Telugu Twenty"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 448px"
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                />

                {/* Soft gradient vignette at the bottom */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#082870] via-[#082870]/70 to-transparent z-10" />

                {/* Floating Glassmorphic Badges */}
                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-[11px] font-bold text-white shadow-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Business Leader
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
                  <h3 className="text-base font-bold text-white">Lavanya Ganji</h3>
                  <p className="text-[11px] text-gray-300 font-medium leading-snug">
                    Founder &amp; CEO, Telugu Twenty • MD, Perfect Prime Media • MD, Telugu Tea Talks • Partner, Creators College
                  </p>
                </div>
              </div>
              <figcaption className="mt-3 text-xs sm:text-sm text-white/70 font-medium text-center">
                Lavanya Ganji — Founder &amp; CEO of Telugu Twenty
              </figcaption>
            </div>

          </div>
        </div>
      </section>

      {/* Professional Designations Section */}
      <section className="py-12 md:py-16 bg-brand-gray/40 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-orange">
              Executive Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
              Professional Designations
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Key leadership roles held by Lavanya Ganji across media and business ventures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {designations.map((role, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#131b2e] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1 text-left relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${role.badgeColor}`}>
                      {role.highlight}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-gray-400">
                    {role.type}
                  </span>

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

      {/* Main Content & Sidebar Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Main Editorial Articles */}
            <div className="lg:col-span-8 space-y-14 text-left">

              {/* Section 1: Telugu Twenty */}
              <article className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
                  <Award size={16} />
                  Signature Venture
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
                  Founder &amp; CEO of Telugu Twenty
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  <p>
                    Telugu Twenty is a content creation and digital media brand focused on business promotions, video production, and social media content, based in <strong className="text-brand-charcoal dark:text-white">KPHB, Hyderabad, Telangana</strong>.
                  </p>
                  <p>
                    Her professional experience includes business management, operations, marketing, client coordination, production management, and business development. She has been involved in building and managing media and business initiatives, coordinating projects from initial client communication and shoot scheduling through production, editing, revisions, deliverables, and final handover.
                  </p>
                  <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40 flex items-center gap-3.5">
                    <span className="text-2xl">🚀</span>
                    <p className="text-xs sm:text-sm font-semibold text-brand-charcoal dark:text-orange-200 leading-snug">
                      Telugu Twenty has reportedly worked with <strong>more than 2,000 businesses</strong> across Hyderabad, Vijayawada, Khammam, Warangal, Visakhapatnam, Siddipet, and surrounding areas.
                    </p>
                  </div>
                  <div className="pt-2">
                    <a
                      href="https://www.instagram.com/telugu_twenty/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue dark:text-white hover:text-brand-orange transition"
                    >
                      <InstagramIcon size={15} />
                      Follow Telugu Twenty on Instagram
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* Industries Served */}
                <div className="pt-4 space-y-3">
                  <h3 className="text-lg sm:text-xl font-extrabold text-brand-blue dark:text-white tracking-tight">
                    Industries Served
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {industries.map((item, i) => (
                      <div
                        key={i}
                        className="bg-brand-gray/60 dark:bg-white/5 border border-gray-200/70 dark:border-white/10 px-3 py-2.5 rounded-xl text-xs font-bold text-brand-charcoal dark:text-white flex items-center gap-2.5 shadow-xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Portfolio */}
                <div className="pt-4 space-y-3">
                  <h3 className="text-lg sm:text-xl font-extrabold text-brand-blue dark:text-white tracking-tight">
                    Project Portfolio
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {portfolio.map((item, i) => (
                      <div
                        key={i}
                        className="bg-white dark:bg-[#131b2e] border border-gray-200/70 dark:border-white/10 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2.5 shadow-xs"
                      >
                        <CheckCircle2 size={14} className="text-brand-orange shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              {/* Section 2: Perfect Prime Media */}
              <article className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
                  <Radio size={16} />
                  Media Leadership
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
                  Managing Director of Perfect Prime Media
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  <p>
                    Perfect Prime Media is a media and business organization associated with Lavanya Ganji. <strong className="text-brand-charcoal dark:text-white">Perfect Prime News is part of Perfect Prime Media</strong>, not a separate business entity.
                  </p>
                  <p>
                    Lavanya&apos;s professional involvement includes business coordination, client communication, project management, and media-related initiatives across the organization.
                  </p>
                </div>
              </article>

              {/* Section 3: Telugu Tea Talks */}
              <article className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
                  <Tv size={16} />
                  Digital Media Operations
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
                  Managing Director of Telugu Tea Talks
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  <p>
                    Lavanya is involved in the end-to-end coordination of Telugu Tea Talks business and production activities, including:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {teaTalksWork.map((item, i) => (
                      <div
                        key={i}
                        className="bg-brand-gray/60 dark:bg-white/5 border border-gray-200/70 dark:border-white/10 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2.5 shadow-xs"
                      >
                        <CheckCircle2 size={14} className="text-brand-orange shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href="https://www.youtube.com/@TeluguTeaTalks"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue dark:text-white hover:text-brand-orange transition"
                    >
                      <YoutubeIcon size={15} />
                      YouTube
                      <ExternalLink size={13} />
                    </a>
                    <a
                      href="https://www.instagram.com/telugu_tea_talks/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue dark:text-white hover:text-brand-orange transition"
                    >
                      <InstagramIcon size={15} />
                      Instagram
                      <ExternalLink size={13} />
                    </a>
                    <a
                      href="https://www.facebook.com/teluguteatalks"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue dark:text-white hover:text-brand-orange transition"
                    >
                      <FacebookIcon size={15} />
                      Facebook
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </article>

              {/* Section 4: Creators College */}
              <article className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
                  <GraduationCap size={16} />
                  Academy Partnership
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
                  Managing Partner of Creators College
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  <p>
                    Lavanya is associated with Creators College, a content creation training academy in Hyderabad. Her responsibilities include management, admissions, operations, batch coordination, student management, business development, and marketing.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue dark:text-white hover:text-brand-orange transition"
                    >
                      <Globe size={15} />
                      creatorscollege.in
                      <ArrowRight size={13} />
                    </Link>
                    <a
                      href="https://www.instagram.com/creatorscollege_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue dark:text-white hover:text-brand-orange transition"
                    >
                      <InstagramIcon size={15} />
                      Creators College Instagram
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </article>

              {/* Section 5: Corporate Experience & Education */}
              <article className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
                  <Briefcase size={16} />
                  Career Background
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
                  Previous Corporate Experience
                </h2>
                <div className="space-y-3">
                  {experience.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-[#131b2e] border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3 justify-between"
                    >
                      <div className="space-y-1">
                        <h3 className="text-base font-black text-brand-blue dark:text-white tracking-tight">
                          {item.company}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                          {item.role}
                        </p>
                      </div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider bg-brand-blue/10 text-brand-blue dark:text-blue-300 px-3 py-1.5 rounded-full shrink-0">
                        {item.duration}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-brand-blue dark:text-blue-200 leading-snug">
                    Bachelor of Technology (B.Tech.) in <strong>Electrical and Electronics Engineering (EEE)</strong> — graduated in <strong>2014</strong>.
                  </p>
                </div>
              </article>

              {/* Section 6: Founding History */}
              <article className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider">
                  <Users size={16} />
                  Collaboration
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white tracking-tight">
                  Founding and Collaboration History
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  <p>
                    Lavanya Ganji, Kusum Ganji, and Cecil Srungarapati were involved in the early development of <strong className="text-brand-charcoal dark:text-white">Telugu Tea Talks</strong>, <strong className="text-brand-charcoal dark:text-white">Perfect Prime Media</strong>, and <strong className="text-brand-charcoal dark:text-white">Middle Class Homes</strong>.
                  </p>
                  <p>
                    Telugu Twenty was established by <strong className="text-brand-charcoal dark:text-white">Lavanya Ganji and Cecil Srungarapati</strong>.
                  </p>
                  <p>
                    <Link href="/cecil-srungarapati" className="text-brand-orange font-semibold hover:underline">
                      Learn more about Cecil Srungarapati
                    </Link>
                    {" "}— Founder &amp; CEO of Creators College.
                  </p>
                </div>
              </article>

            </div>

            {/* Sticky Sidebar (Focus Areas + Social Profiles + Connect CTA) */}
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
                  Her primary focus is building Telugu Twenty as a business-focused content and media brand serving local and regional businesses.
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

              {/* Connect CTA Card */}
              <div className="bg-gradient-to-br from-[#0c152b] to-[#12234f] text-white p-6 rounded-2xl border border-brand-orange/30 shadow-xl space-y-4">
                <span className="bg-brand-orange text-white text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded">
                  Collaborate
                </span>
                <h4 className="text-base font-black text-white leading-tight">
                  Connect with Lavanya Ganji
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Looking to collaborate on business growth, brand promotions, content creation, or digital media projects? Explore business opportunities and creative collaborations.
                </p>
                <a
                  href="https://www.instagram.com/the_lavanya_ganji/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition duration-200 hover:scale-[1.02] shadow-md shadow-brand-orange/20"
                >
                  Connect on Instagram
                  <ArrowRight size={14} />
                </a>
                <div className="text-center">
                  <a
                    href="https://www.facebook.com/profile.php?id=61578853408957"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-gray-300 hover:text-brand-orange underline underline-offset-2 transition"
                  >
                    Connect on Facebook &rarr;
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Connect Banner */}
      <section className="py-12 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-brand-blue dark:text-white">
              Looking to grow your business with content?
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Discover Telugu Twenty&apos;s work with 2,000+ businesses, or explore content creation training at Creators College.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="https://www.instagram.com/telugu_twenty/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 px-6 rounded-full text-xs transition hover:scale-105 shadow-md"
            >
              <InstagramIcon size={15} />
              Explore Telugu Twenty
            </a>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 hover:border-brand-orange text-brand-charcoal dark:text-white font-bold py-3 px-6 rounded-full text-xs transition hover:scale-105 shadow-sm"
            >
              <GraduationCap size={15} />
              View Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
