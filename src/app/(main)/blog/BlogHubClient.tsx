"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Calendar, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  featured?: boolean;
  readTime: string;
  mainImage: any;
}

interface BlogHubClientProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogHubClient({ posts, categories }: BlogHubClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, posts]);

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured);
  }, [posts]);

  const normalPosts = useMemo(() => {
    return filteredPosts.filter((p) => !p.featured);
  }, [filteredPosts]);

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80')",
        }}
        className="relative bg-cover bg-center text-white py-20 md:py-28 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/45 dark:bg-black/70" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-brand-orange/20 text-brand-orange border border-brand-orange/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            Creators College Hub
          </div>
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
          
          {/* Header of Section + Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-brand-blue dark:text-white tracking-tight">
                Browse by Section
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Click a section card to filter articles.
              </p>
            </div>
            {/* Search */}
            <div className="relative w-full md:max-w-xs shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 bg-white dark:bg-white/5 text-brand-charcoal dark:text-white text-xs"
              />
            </div>
          </div>

          {/* Large boxes grid for categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const count = posts.filter((p) => cat === "All" || p.category === cat).length;
              const isSelected = selectedCategory === cat;
              
              // Assign custom icon/emoji based on section title
              let emoji = "📝";
              const lowerCat = cat.toLowerCase();
              if (lowerCat === "all") emoji = "📂";
              else if (lowerCat.includes("capcut")) emoji = "🎬";
              else if (lowerCat.includes("premiere") || lowerCat.includes("pro")) emoji = "🎞️";
              else if (lowerCat.includes("davinci") || lowerCat.includes("resolve")) emoji = "🎨";
              else if (lowerCat.includes("ai") || lowerCat.includes("tool")) emoji = "🤖";
              else if (lowerCat.includes("growth") || lowerCat.includes("media")) emoji = "📈";
              else if (lowerCat.includes("success") || lowerCat.includes("story")) emoji = "🏆";
              else if (lowerCat.includes("tips") || lowerCat.includes("creation")) emoji = "💡";

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-32 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                    isSelected
                      ? "bg-gradient-to-br from-[#0c152b] to-[#12234f] text-white border-brand-orange shadow-lg shadow-brand-orange/10"
                      : "bg-brand-gray/30 dark:bg-white/5 text-brand-charcoal dark:text-white border-gray-100 dark:border-white/5 hover:border-gray-250 dark:hover:border-white/10"
                  }`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm tracking-tight line-clamp-1">
                      {cat}
                    </h4>
                    <p className={`text-[10px] font-bold mt-1 ${isSelected ? "text-brand-orange" : "text-gray-400"}`}>
                      {count} {count === 1 ? "Article" : "Articles"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Featured Post Card (only shown when 'All' is selected and search is empty) */}
          {selectedCategory === "All" && !searchTerm && featuredPost && (
            <div className="bg-brand-charcoal text-white rounded-3xl overflow-hidden border border-white/5 shadow-xl hover:border-brand-orange/30 transition duration-300 grid grid-cols-1 lg:grid-cols-12">
              
              {/* Image Section */}
              <div className="lg:col-span-6 aspect-video lg:aspect-auto relative bg-brand-gray">
                {featuredPost.mainImage ? (
                  <img
                    src={urlFor(featuredPost.mainImage).width(800).height(500).url()}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-tr from-brand-blue to-brand-orange">
                    <BookOpen size={48} className="text-white/40" />
                  </div>
                )}
                <span className="absolute top-4 left-4 bg-brand-orange text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow">
                  Featured Article
                </span>
              </div>

              {/* Description Details */}
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
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-5 py-2.5 rounded-full font-bold transition hover:scale-[1.02] active:scale-[0.98] text-xs"
                  >
                    Read Post
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

            </div>
          )}

          {/* Articles Grid */}
          <div>
            <h3 className="text-xl font-extrabold text-brand-blue dark:text-white mb-8 tracking-tight">
              {searchTerm || selectedCategory !== "All" ? "Search Results" : "Latest Articles"}
            </h3>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(searchTerm || selectedCategory !== "All" ? filteredPosts : normalPosts).map((post) => (
                  <div
                    key={post.slug}
                    className="bg-white dark:bg-brand-gray rounded-2xl border border-gray-200/50 dark:border-white/5 overflow-hidden shadow-sm hover:border-brand-blue/20 hover:shadow-md transition duration-300 flex flex-col justify-between text-left"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="aspect-video relative bg-brand-gray/50 dark:bg-black/25 overflow-hidden border-b border-gray-100 dark:border-white/5">
                        {post.mainImage ? (
                          <img
                            src={urlFor(post.mainImage).width(400).height(250).url()}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-brand-gray">
                            <BookOpen size={24} className="text-gray-400" />
                          </div>
                        )}
                      </div>

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
