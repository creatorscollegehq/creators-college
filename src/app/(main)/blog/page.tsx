"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Calendar, User, ArrowRight, Sparkles, BookOpen } from "lucide-react";

export default function BlogHubPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = [
    {
      slug: "3-second-hook-formula",
      title: "The 3-Second Hook Formula to Double Your Views",
      category: "Content Creation Tips",
      date: "2026-06-25",
      author: "Creators College Team",
      excerpt: "Discover the psychological framework behind high-retention hooks. Learn how to stop the scroll on YouTube Shorts and Instagram Reels.",
      featured: true,
      readTime: "4 min read"
    },
    {
      slug: "capcut-editing-hacks",
      title: "5 CapCut Mobile Editing Hacks for Snappy Reels",
      category: "Video Editing Tips",
      date: "2026-06-18",
      author: "Editing Specialist",
      excerpt: "Master quick trims, keyframe audio ducking, and text animations directly from your phone. Level up your post-production speed.",
      featured: false,
      readTime: "3 min read"
    },
    {
      slug: "essential-ai-tools-2026",
      title: "Top AI Tools for Content Creators in 2026",
      category: "AI Tools",
      date: "2026-06-10",
      author: "Tech Advisor",
      excerpt: "From automated captioning to AI thumbnail generation, here are the tools to speed up your content workflow by 10x.",
      featured: false,
      readTime: "5 min read"
    },
    {
      slug: "youtube-shorts-algorithm-guide",
      title: "Demystifying the 2026 YouTube Shorts Algorithm",
      category: "Social Media Growth",
      date: "2026-06-01",
      author: "Growth Strategy Group",
      excerpt: "An in-depth analysis of how watch history, swipes, and viewer retention shape distribution on the Shorts feed.",
      featured: false,
      readTime: "6 min read"
    },
    {
      slug: "how-sandeep-scaled-youtube",
      title: "Success Story: How Sandeep Scaled to 100K Subscribers",
      category: "Creator Success Stories",
      date: "2026-05-15",
      author: "Creators College Team",
      excerpt: "The exact step-by-step case study of Sandeep's Tech YouTube channel, detailing monetization and early production hacks.",
      featured: false,
      readTime: "5 min read"
    }
  ];

  const categories = ["All", "Content Creation Tips", "Video Editing Tips", "AI Tools", "Social Media Growth", "Creator Success Stories"];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredPost = useMemo(() => {
    return blogPosts.find((p) => p.featured);
  }, []);

  const normalPosts = useMemo(() => {
    return filteredPosts.filter((p) => !p.featured);
  }, [filteredPosts]);

  return (
    <div className="w-full">
      {/* Header */}
      <section 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80')" }}
        className="relative bg-cover bg-center text-white py-20 md:py-28 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/45 dark:bg-black/70" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Creator Insights Blog
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed font-medium">
            Free resources, tutorials, strategy guides, and case studies to accelerate your digital growth.
          </p>
        </div>
      </section>

      {/* Main Blog Hub */}
      <section className="py-20 bg-white dark:bg-[#090d16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-brand-gray/30 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 bg-white dark:bg-white/5 text-brand-charcoal dark:text-white text-sm"
              />
            </div>

            {/* Categories Tills */}
            <div className="flex flex-wrap gap-1.5 items-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${
                    selectedCategory === cat
                      ? "bg-brand-blue text-white"
                      : "bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post Card (only shown when 'All' is selected and search is empty) */}
          {selectedCategory === "All" && !searchTerm && featuredPost && (
            <div className="bg-brand-charcoal text-white rounded-3xl overflow-hidden border border-white/5 shadow-xl hover:border-brand-orange/30 transition duration-300 grid grid-cols-1 lg:grid-cols-12">
              
              {/* Media placeholder */}
              <div className="lg:col-span-6 bg-gradient-to-tr from-brand-blue to-brand-orange aspect-video lg:aspect-auto flex items-center justify-center p-8 relative">
                <BookOpen size={48} className="text-white/40" />
                <span className="absolute top-4 left-4 bg-brand-orange text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                  Featured Article
                </span>
              </div>

              {/* Copy details */}
              <div className="lg:col-span-6 p-8 flex flex-col justify-between space-y-6 text-left">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-brand-orange font-bold">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{featuredPost.date}</span>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 rounded-full font-bold transition hover-lift text-xs"
                  >
                    Read Post
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

            </div>
          )}

          {/* Normal Posts Grid */}
          <div>
            <h3 className="text-xl font-extrabold text-brand-blue dark:text-white mb-8 tracking-tight">
              {searchTerm || selectedCategory !== "All" ? "Search Results" : "Latest Articles"}
            </h3>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Fallback to render all matching posts if search is active, otherwise render non-featured */}
                {(searchTerm || selectedCategory !== "All" ? filteredPosts : normalPosts).map((post) => (
                  <div
                    key={post.slug}
                    className="bg-white dark:bg-brand-gray rounded-2xl border border-gray-200/50 dark:border-white/5 overflow-hidden shadow-sm hover:border-brand-blue/20 hover:shadow-md transition duration-300 flex flex-col justify-between text-left"
                  >
                    <div className="p-6 space-y-3">
                      <span className="text-[10px] uppercase tracking-widest text-brand-orange font-extrabold">
                        {post.category}
                      </span>
                      <h4 className="font-extrabold text-base sm:text-lg text-brand-blue dark:text-white line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="px-6 py-4 bg-brand-gray/30 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex justify-between items-center text-xs text-gray-400 dark:text-gray-500">
                      <span>{post.readTime}</span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-bold text-brand-blue dark:text-white hover:text-brand-orange transition flex items-center gap-1.5"
                      >
                        Read More
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 space-y-2">
                <p className="text-gray-500 font-medium">No articles matched your criteria.</p>
                <p className="text-xs text-gray-400">Try adjusting your filters or search keywords.</p>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
