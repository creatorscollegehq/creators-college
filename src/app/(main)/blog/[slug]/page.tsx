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

// Fetch post data by slug helper
async function getPostData(slug: string) {
  return await client.fetch<any>(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      "category": category->title,
      "date": publishedAt,
      author,
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
      <div className="relative my-6 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-md">
        <img
          src={urlFor(value).width(800).url()}
          alt="Blog content graphic"
          className="w-full h-auto object-cover"
        />
      </div>
    ),
  },
  block: {
    h3: ({ children }: any) => (
      <h3 className="text-lg sm:text-xl font-black text-brand-blue dark:text-white pt-6 pb-2 text-left tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-base sm:text-lg font-extrabold text-brand-blue dark:text-white pt-4 pb-1 text-left tracking-tight">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-left py-1 font-normal">
        {children}
      </p>
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

  return (
    <div className="w-full bg-white dark:bg-[#090d16] transition-colors duration-200">
      {/* Article Header */}
      <section className="bg-brand-blue dark:bg-brand-gray text-white py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-left space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-white transition"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>

          <span className="block text-xs uppercase tracking-widest text-brand-orange font-bold">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4 pt-2 text-xs text-white/70">
            <div className="flex items-center gap-1.5">
              <User size={14} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image Banner (if available) */}
      {post.mainImage && (
        <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <img
              src={urlFor(post.mainImage).width(1200).height(675).url()}
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
            </div>

            {/* Sidebar CTA widgets */}
            <div className="lg:col-span-4 space-y-6 sticky top-24">
              
              <div className="bg-brand-gray/30 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5 space-y-4 text-left">
                <h4 className="font-extrabold text-sm text-brand-blue dark:text-white uppercase tracking-wider">
                  Learn directly from experts
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  Enjoyed this article? Get hands-on mentorship, review worksheets, and direct critiques by enrolling in our next student batch.
                </p>
                <Link
                  href="/courses"
                  className="w-full inline-flex items-center justify-center gap-1 bg-brand-blue hover:bg-brand-blue-dark dark:bg-brand-orange dark:hover:bg-brand-orange-dark text-white font-bold py-2.5 rounded-lg text-xs transition hover:scale-[1.02] shadow-md"
                >
                  View Course Details
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
