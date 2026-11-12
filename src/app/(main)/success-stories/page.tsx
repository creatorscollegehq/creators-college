"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";
import VideoGallery from "@/components/VideoGallery";

export default function SuccessStoriesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const projects = [
    {
      title: "Telugu Tech Review Reel",
      creator: "Sandeep K.",
      category: "YouTube Growth",
      stats: "320K Views • 45K Likes",
      vibe: "Tech Product Review"
    },
    {
      title: "Ethnic Wear Showcase",
      creator: "Pranitha R.",
      category: "Instagram Reels",
      stats: "180K Views • 22K Likes",
      vibe: "Lifestyle Styling Transition"
    },
    {
      title: "Real Estate Property Tour",
      creator: "Vamsi K. (Edited)",
      category: "Freelance Editing",
      stats: "85K Views • 12 Clients Acquired",
      vibe: "Cinematic Interior Tour"
    }
  ];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full">
      {/* Header */}
      <section 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80')" }}
        className="relative bg-cover bg-center text-white py-5 md:py-8 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/45 dark:bg-black/70" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Creator Success Stories
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed font-medium">
            Explore real videos made, shot, and edited by students who turned their skills into channels and freelance careers.
          </p>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-5 md:py-7 bg-brand-gray/40 border-t border-gray-200/30 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Practical Output
            </h3>
            <h2 className="text-3xl font-semibold text-brand-blue dark:text-white tracking-tight">
              Featured Student Projects
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Explore actual videos made, shot, or edited by students during our academy bootcamps.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {["All", "YouTube Growth", "Instagram Reels", "Freelance Editing"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-blue text-white"
                    : "bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200/60 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredProjects.map((proj, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-brand-gray rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-md overflow-hidden hover:border-brand-blue/30 transition duration-300 group"
              >
                {/* Media Placeholder Grid */}
                <div className="aspect-video bg-black/95 relative flex items-center justify-center group-hover:opacity-90 transition">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="w-10 h-10 rounded-full bg-brand-orange/90 flex items-center justify-center text-white shadow-lg shrink-0 z-10">
                    <Play size={16} fill="currentColor" className="ml-0.5" />
                  </div>
                  <span className="absolute bottom-3 left-3 text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded backdrop-blur-sm z-10">
                    {proj.vibe}
                  </span>
                </div>

                {/* Project Meta details */}
                <div className="p-5 text-left space-y-2">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-brand-orange">
                    {proj.category}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-brand-blue dark:text-white">{proj.title}</h4>
                  
                  <div className="pt-2 border-t border-gray-100 dark:border-white/5 flex justify-between items-center text-xs text-gray-400 dark:text-gray-500">
                    <span>Creator: <strong>{proj.creator}</strong></span>
                    <span>{proj.stats}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Video Resources Showcase */}
      <VideoGallery />
    </div>
  );
}
