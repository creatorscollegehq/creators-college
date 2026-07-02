"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock, ArrowRight } from "lucide-react";
import LeadForm from "@/components/LeadForm";

interface PostContent {
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  html: React.ReactNode;
}

export default function BlogPostDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const postsData: Record<string, PostContent> = {
    "3-second-hook-formula": {
      title: "The 3-Second Hook Formula to Double Your Views",
      category: "Content Creation Tips",
      date: "2026-06-25",
      author: "Creators College Team",
      readTime: "4 min read",
      html: (
        <div className="space-y-6 text-gray-600 text-sm leading-relaxed text-left">
          <p>
            In the fast-paced world of short-form content (YouTube Shorts, Instagram Reels, TikTok), average view duration is the single most critical ranking factor. If users swipe away within the first few seconds, the platform algorithm stops distributing your video.
          </p>
          <h3 className="text-lg font-bold text-brand-blue">Why Hooks Matter</h3>
          <p>
            A hook is the visual, auditory, or textual cue at the beginning of a video designed to grab a viewer's attention. Without a compelling hook, even the most high-value video edit will go unnoticed.
          </p>
          <h3 className="text-lg font-bold text-brand-blue">The Core Hook Framework</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>The Question Hook:</strong> Start with an intriguing question like <em>"Why do 90% of editors make this mistake?"</em> to spark curiosity.</li>
            <li><strong>The Visual Pattern Interrupt:</strong> Drop sudden high-contrast movement, a custom graphic banner, or close-up cropping in the first 0.5 seconds.</li>
            <li><strong>The Negativity Hook:</strong> Highlight a risk or problem: <em>"Stop editing your reels like this..."</em></li>
          </ul>
          <p>
            By implementing these frameworks, our students at Creators College have seen audience retention averages increase from 30% to over 70%, triggering the algorithm to recommend their videos to wider pools of viewers.
          </p>
        </div>
      )
    },
    "capcut-editing-hacks": {
      title: "5 CapCut Mobile Editing Hacks for Snappy Reels",
      category: "Video Editing Tips",
      date: "2026-06-18",
      author: "Editing Specialist",
      readTime: "3 min read",
      html: (
        <div className="space-y-6 text-gray-600 text-sm leading-relaxed text-left">
          <p>
            CapCut has revolutionized mobile video post-production. It allows creators to edit professional, commercial-grade videos on the go. Here are 5 quick tips to optimize your pacing.
          </p>
          <h3 className="text-lg font-bold text-brand-blue">1. Master Cut Pacing</h3>
          <p>
            Trim all filler words ("um," "uh," silent breathing gaps). Keep your sentences tight and overlapping using J-cuts (audio starts before the visual clip cuts).
          </p>
          <h3 className="text-lg font-bold text-brand-blue">2. Kinetic Auto-Captions</h3>
          <p>
            Reels with text overlays gain 40% higher retention. Use CapCut's auto-caption engine, style them in bold yellow-white fonts, and position them in the screen center to maximize readability.
          </p>
          <h3 className="text-lg font-bold text-brand-blue">3. Subtle Sound Design (SFX)</h3>
          <p>
            Incorporate whooshes for transitions, typing sounds for text, and camera shutters for slide popups. Keep SFX levels at -12dB so they don't overpower your primary voice track.
          </p>
        </div>
      )
    },
    "essential-ai-tools-2026": {
      title: "Top AI Tools for Content Creators in 2026",
      category: "AI Tools",
      date: "2026-06-10",
      author: "Tech Advisor",
      readTime: "5 min read",
      html: (
        <div className="space-y-6 text-gray-600 text-sm leading-relaxed text-left">
          <p>
            AI tools are no longer optional for creators—they are key workflow accelerators. Here are the core applications our team recommends to boost efficiency.
          </p>
          <h3 className="text-lg font-bold text-brand-blue">Script Writing & Outlining</h3>
          <p>
            Use advanced models to brainstorm high-retention outlines. Prompt them specifically with your target audience profile to refine hooks and call-to-actions.
          </p>
          <h3 className="text-lg font-bold text-brand-blue">Automated Typography & Assets</h3>
          <p>
            Leverage AI tools for sound mixing, background noise removal, and rendering clickable graphics. This allows editors to focus on pacing and visual flow.
          </p>
        </div>
      )
    },
    "youtube-shorts-algorithm-guide": {
      title: "Demystifying the 2026 YouTube Shorts Algorithm",
      category: "Social Media Growth",
      date: "2026-06-01",
      author: "Growth Strategy Group",
      readTime: "6 min read",
      html: (
        <div className="space-y-6 text-gray-600 text-sm leading-relaxed text-left">
          <p>
            YouTube Shorts is a powerful engine for organic reach. Understanding how YouTube measures engagement will save you hours of guesswork.
          </p>
          <h3 className="text-lg font-bold text-brand-blue">The Swipe-Away Ratio</h3>
          <p>
            YouTube tracks the percentage of users who choose to watch your short versus those who swipe away immediately. A healthy account maintains a watch ratio of 65% or higher.
          </p>
          <h3 className="text-lg font-bold text-brand-blue">Re-watch and Loop Metrics</h3>
          <p>
            Ensure your video loops seamlessly. If the viewer watches your clip 1.5 times, YouTube classifies your content as highly engaging and distributes it to wider feeds.
          </p>
        </div>
      )
    },
    "how-sandeep-scaled-youtube": {
      title: "Success Story: How Sandeep Scaled to 100K Subscribers",
      category: "Creator Success Stories",
      date: "2026-05-15",
      author: "Creators College Team",
      readTime: "5 min read",
      html: (
        <div className="space-y-6 text-gray-600 text-sm leading-relaxed text-left">
          <p>
            Sandeep was a student at our Hyderabad batch who wanted to share tech tutorials. This case study details how he grew from zero to 100,000 subscribers.
          </p>
          <h3 className="text-lg font-bold text-brand-blue">The Challenge</h3>
          <p>
            Highly competitive tech space. Sandeep struggled to get views beyond his immediate family and friends.
          </p>
          <h3 className="text-lg font-bold text-brand-blue">The Strategy</h3>
          <p>
            We co-designed his topic map. Instead of generic reviews, we pivoted his channel to localized software configurations and budget setups in Telugu.
          </p>
        </div>
      )
    }
  };

  const post = postsData[slug];

  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4">
        <h2 className="text-2xl font-bold text-brand-blue">Article Not Found</h2>
        <p className="text-sm text-gray-500">The blog post you are looking for does not exist.</p>
        <Link href="/blog" className="bg-brand-blue text-white px-5 py-2.5 rounded-full text-xs font-bold transition hover-lift">
          Back to Blog Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      {/* Article Header */}
      <section className="bg-brand-blue text-white py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-left space-y-4">
          <button 
            onClick={() => router.push("/blog")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-white transition"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </button>
          
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

      {/* Article Content Layout */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Post text */}
            <div className="lg:col-span-8 space-y-8 prose prose-blue max-w-none">
              {post.html}
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-4 space-y-6 sticky top-24">
              
              <div className="bg-brand-gray/30 p-6 rounded-2xl border border-gray-100 space-y-4 text-left">
                <h4 className="font-extrabold text-sm text-brand-blue uppercase tracking-wider">
                  Learn directly from experts
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Enjoyed this article? Get hands-on mentorship, review worksheets, and direct critiques by enrolling in our next student batch.
                </p>
                <Link
                  href="/courses"
                  className="w-full inline-flex items-center justify-center gap-1 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-2.5 rounded-lg text-xs transition hover-lift shadow-md"
                >
                  View Course Details
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Intake Form */}
              <LeadForm defaultCourse="Complete Telugu Content Creation Course" />

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
