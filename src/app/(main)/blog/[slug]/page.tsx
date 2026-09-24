import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, ArrowRight, BookOpen } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import LeadForm from "@/components/LeadForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Dynamic ISR revalidation

// Canonical Cecil Person identity — must match
// src/app/(main)/cecil-srungarapati/page.tsx Person @id exactly.
const CECIL_PERSON_ID = "https://www.creatorscollege.in/cecil-srungarapati#person";
const CECIL_PROFILE_URL = "https://www.creatorscollege.in/cecil-srungarapati";
const CECIL_IMAGE = "https://www.creatorscollege.in/cecil.jpg";
const CECIL_SAME_AS = [
  "https://www.instagram.com/cecil_srungarapati/",
  "https://www.facebook.com/profile.php?id=100003936120952",
  "https://www.linkedin.com/in/cecilsrungarapati/",
];

// Fetch post data by slug helper
async function getPostData(slug: string) {
  return await client.fetch<any>(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      "category": category->title,
      "date": publishedAt,
      author,
      authorRole,
      authorProfileUrl,
      readTime,
      mainImage,
      body,
      excerpt,
      metaTitle,
      metaDescription
    }`,
    { slug }
  );
}

// Generate dynamic meta SEO tags
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return {
      title: "Post Not Found | Creators College Blogs",
    };
  }

  return {
    title: post.metaTitle || `${post.title} | Creators College`,
    description:
      post.metaDescription ||
      post.excerpt ||
      "Read dynamic creator tutorials, video editing tips, and digital brand scaling blueprints.",
  };
}

// PortableText custom render components
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="relative my-8 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-lg max-w-3xl mx-auto">
        <img
          src={urlFor(value).width(1200).url()}
          alt={value.alt || "Creators College Blog Content Image"}
          className="w-full h-auto object-cover max-h-[520px]"
        />
        {value.caption && (
          <div className="bg-brand-gray/30 dark:bg-white/5 text-center text-xs text-gray-500 dark:text-gray-400 py-3 px-4 border-t border-gray-100 dark:border-white/5 font-medium">
            {value.caption}
          </div>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-2xl sm:text-3xl font-black text-brand-blue dark:text-white pt-8 pb-3 text-left tracking-tight border-b border-gray-100 dark:border-white/5 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl sm:text-2xl font-black text-brand-blue dark:text-white pt-7 pb-2.5 text-left tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg sm:text-xl font-extrabold text-brand-blue dark:text-white pt-6 pb-2 text-left tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-base sm:text-lg font-bold text-brand-blue dark:text-white pt-4 pb-1 text-left tracking-tight">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-left py-2 font-normal">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-brand-orange bg-brand-gray/30 dark:bg-white/5 pl-4 py-3 my-4 rounded-r-lg text-left italic text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 py-2 space-y-2 text-left text-sm sm:text-base text-gray-600 dark:text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 py-2 space-y-2 text-left text-sm sm:text-base text-gray-600 dark:text-gray-300">
        {children}
      </ol>
    ),
  },
  marks: {
    underline: ({ children }: any) => <u className="underline">{children}</u>,
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-orange hover:underline font-semibold"
      >
        {children}
      </a>
    ),
  },
};

export default async function BlogPostDetail({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4 bg-white dark:bg-[#090d16]">
        <h2 className="text-2xl font-bold text-brand-blue dark:text-white">Article Not Found</h2>
        <p className="text-sm text-gray-500">The blog post you are looking for does not exist.</p>
        <Link
          href="/blog"
          className="bg-brand-blue text-white px-5 py-2.5 rounded-full text-xs font-bold transition hover:scale-102"
        >
          Back to Blog Hub
        </Link>
      </div>
    );
  }

  // Author resolution: default every Cecil article (including legacy posts
  // without authorProfileUrl) to the canonical Cecil Person. A custom
  // authorProfileUrl supports guest authors without breaking the link.
  const authorName: string = post.author || "Cecil Srungarapati";
  const isCecilAuthor =
    authorName.includes("Cecil") ||
    !post.authorProfileUrl ||
    post.authorProfileUrl === CECIL_PROFILE_URL;
  const authorProfileUrl: string = isCecilAuthor
    ? CECIL_PROFILE_URL
    : post.authorProfileUrl;
  const authorSchema = isCecilAuthor
    ? {
        "@type": "Person",
        "@id": CECIL_PERSON_ID,
        "name": "Cecil Srungarapati",
        "url": CECIL_PROFILE_URL,
        "image": CECIL_IMAGE,
        "jobTitle": post.authorRole || "Founder & CEO, Creators College",
        "sameAs": CECIL_SAME_AS,
        "worksFor": [
          {
            "@type": "EducationalOrganization",
            "@id": "https://www.creatorscollege.in#organization",
            "name": "Creators College",
            "url": "https://www.creatorscollege.in"
          },
          { "@type": "Organization", "name": "Telugu Tea Talks" },
          { "@type": "NewsMediaOrganization", "name": "Perfect Prime News" }
        ]
      }
    : {
        "@type": "Person",
        "name": authorName,
        "jobTitle": post.authorRole || "Team Member",
        "url": authorProfileUrl
      };

  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.mainImage ? urlFor(post.mainImage).width(1200).url() : "https://www.creatorscollege.in/hero_collage_wide.jpg",
    "datePublished": post.date || new Date().toISOString(),
    "author": authorSchema,
    "publisher": {
      "@type": "Organization",
      "name": "Creators College",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.creatorscollege.in/logo/2%20Horizontal%20Logo.png"
      }
    },
    "description": post.excerpt || post.metaDescription || "Read video editing, scripting, and digital creation insights on the Creators College Blog."
  };

  return (
    <div className="w-full bg-white dark:bg-[#090d16] transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema).replace(/</g, "\\u003c") }}
      />
      {/* Article Header */}
      <section className="bg-brand-blue dark:bg-brand-gray text-white pt-6 pb-16 md:pt-8 md:pb-20 relative overflow-hidden">
        {/* Decorative background visual accent */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-orange/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back to Blog Hub
          </Link>

          <span className="block text-sm sm:text-base uppercase tracking-widest text-brand-orange font-extrabold">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-6 pt-2 text-sm sm:text-base text-white/80">
            <div className="flex items-center gap-2">
              <User size={16} className="text-brand-orange" />
              <span>
                Written by{" "}
                {isCecilAuthor ? (
                  <Link
                    href="/cecil-srungarapati"
                    className="font-bold underline decoration-brand-orange/60 hover:text-brand-orange transition duration-150"
                  >
                    {authorName}
                  </Link>
                ) : (
                  <a
                    href={authorProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline decoration-brand-orange/60 hover:text-brand-orange transition duration-150"
                  >
                    {authorName}
                  </a>
                )}
                <span className="text-white/60 font-semibold">
                  {" "}
                  ({post.authorRole || "Founder & CEO, Creators College"})
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-brand-orange" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-brand-orange" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image Banner (if available) */}
      {post.mainImage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
          <div className="aspect-video sm:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-brand-charcoal">
            <img
              src={urlFor(post.mainImage).width(1600).height(685).url()}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Article Content Layout */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Rich Text Content */}
            <div className="lg:col-span-8 space-y-6 prose prose-blue dark:prose-invert max-w-none">
              <PortableText value={post.body} components={portableTextComponents} />

              {/* Author Attribution Box — links to the Author Profile URL (defaults to Cecil Srungarapati) */}
              <div className="not-prose mt-12 p-6 rounded-2xl bg-brand-gray/50 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-sm text-left">
                {isCecilAuthor ? (
                  <Link href="/cecil-srungarapati" className="shrink-0 group">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-orange group-hover:scale-105 transition shadow-md">
                      <img
                        src="/cecil.jpg"
                        alt="Cecil Srungarapati - Founder & CEO of Creators College"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </Link>
                ) : null}
                <div className="space-y-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-brand-orange">
                    Written By
                  </div>
                  {isCecilAuthor ? (
                    <Link
                      href="/cecil-srungarapati"
                      className="text-lg font-bold text-brand-blue dark:text-white hover:text-brand-orange transition inline-flex items-center gap-1.5"
                    >
                      <span>{authorName}</span>
                      <ArrowRight size={14} className="text-brand-orange" />
                    </Link>
                  ) : (
                    <a
                      href={authorProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-brand-blue dark:text-white hover:text-brand-orange transition inline-flex items-center gap-1.5"
                    >
                      <span>{authorName}</span>
                      <ArrowRight size={14} className="text-brand-orange" />
                    </a>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {post.authorRole || "Founder & CEO, Creators College"}
                    {isCecilAuthor ? " • Founder, Telugu Tea Talks • CEO, Perfect Prime News" : ""}
                  </p>
                  {isCecilAuthor ? (
                    <p className="text-xs text-gray-600 dark:text-gray-300 font-normal pt-1">
                      Entrepreneur, educator, and content strategist helping creators and professionals build profitable digital brands in Telugu.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Sidebar CTA widgets */}
            <div className="lg:col-span-4 space-y-6 sticky top-24">
              
              <div className="bg-gradient-to-br from-[#0c152b] to-[#12234f] text-white p-6 rounded-2xl border border-brand-orange/30 space-y-4 text-left shadow-lg relative overflow-hidden">
                {/* Decorative badge */}
                <span className="absolute top-0 right-0 bg-brand-orange text-white text-[9px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-bl-lg shadow">
                  Limited Slots
                </span>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-brand-orange">
                  ⚡ Early-Bird Offer
                </h4>
                <div className="space-y-2">
                  <p className="text-xs leading-relaxed font-semibold text-gray-100">
                    Next cohort starts soon! Only <strong className="text-brand-orange">3 seats remaining</strong> for the Telugu Content Creation Batch.
                  </p>
                  <p className="text-[11px] text-gray-300 leading-relaxed font-normal">
                    Secure your 50% off discount, lifetime community access, and 1-on-1 expert reviews before the price increases by ₹2,000!
                  </p>
                </div>
                <Link
                  href="/checkout"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-brand-orange/90 hover:from-brand-orange-dark hover:to-brand-orange text-white font-extrabold py-3 rounded-xl text-xs tracking-wider transition-all duration-300 hover:scale-[1.03] shadow-md shadow-brand-orange/20 uppercase"
                >
                  Enroll Now &amp; Save 50%
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Dynamic registration Lead Form */}
              <LeadForm defaultCourse="Complete Telugu Content Creation Course" />

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
