"use client";

import React, { useState, useMemo } from "react";
import { Play, Search, Video, X } from "lucide-react";
import { VIDEOS_DATA, VideoItem } from "@/data/videos";

export default function VideoGallery() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const tabs = [
    { label: "All Resources", val: "All" },
    { label: "Masterclasses (YouTube)", val: "youtube" },
    { label: "Quick Tips (Shorts)", val: "short" },
    { label: "Student Edits (Reels)", val: "instagram" },
    { label: "Campus & Workshops", val: "news" }
  ];

  const getYouTubeShortId = (url: string) => {
    const parts = url.split("/shorts/");
    if (parts.length > 1) {
      return parts[1].split("?")[0].split("&")[0];
    }
    return null;
  };

  const getInstagramReelId = (url: string) => {
    const parts = url.split("/reel/");
    if (parts.length > 1) {
      return parts[1].split("/")[0].split("?")[0];
    }
    return null;
  };

  const filteredVideos = useMemo(() => {
    return VIDEOS_DATA.filter((v) => {
      const matchesSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "All" || v.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [activeTab, searchTerm]);

  const embedUrl = useMemo(() => {
    if (!activeVideo) return "";
    const shortId = getYouTubeShortId(activeVideo.url);
    
    if (shortId) {
      return `https://www.youtube.com/embed/${shortId}?autoplay=1`;
    } else if (activeVideo.embedId) {
      return `https://www.youtube.com/embed/${activeVideo.embedId}?autoplay=1`;
    } else if (activeVideo.type === "instagram" || activeVideo.type === "news") {
      const reelId = getInstagramReelId(activeVideo.url);
      if (reelId) {
        return `https://www.instagram.com/reel/${reelId}/embed/`;
      }
    }
    return "";
  }, [activeVideo]);

  return (
    <div className="w-full py-16 bg-white dark:bg-[#090d16] border-t border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">Creative Showcase</span>
          <h2 className="text-3xl font-extrabold text-brand-blue dark:text-white tracking-tight">
            This is Our Work We Have Done
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Browse our actual assignments, client video edits, and campus workshop snippets.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-brand-gray/30 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search resource titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 bg-white dark:bg-white/5 text-brand-charcoal dark:text-white text-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {tabs.map((tab) => (
              <button
                key={tab.val}
                onClick={() => setActiveTab(tab.val)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                  activeTab === tab.val
                    ? "bg-brand-orange text-white"
                    : "bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {filteredVideos.map((video) => {
              // Determine thumbnail
              let thumbSrc = "";
              const shortId = getYouTubeShortId(video.url);
              if (shortId) {
                thumbSrc = `https://img.youtube.com/vi/${shortId}/mqdefault.jpg`;
              } else if (video.embedId) {
                thumbSrc = `https://img.youtube.com/vi/${video.embedId}/mqdefault.jpg`;
              }

              return (
                <div
                  key={video.id}
                  className="bg-white dark:bg-brand-gray rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-white/5 overflow-hidden hover:border-brand-blue/20 hover:shadow-lg transition duration-300 flex flex-col justify-between text-left group"
                >
                  
                  {/* Thumb Container */}
                  <div 
                    onClick={() => setActiveVideo(video)}
                    className="aspect-video bg-black/95 relative flex items-center justify-center cursor-pointer overflow-hidden"
                  >
                    {thumbSrc ? (
                      <img 
                        src={thumbSrc} 
                        alt={video.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/80 to-brand-orange/80 opacity-90" />
                    )}

                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />

                    {/* Play Button Overlay */}
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition z-10">
                      <Play size={16} fill="currentColor" className="ml-0.5 sm:size-5" />
                    </div>

                    {/* Duration / Source badge */}
                    <span className="absolute bottom-2 left-2 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wide bg-brand-blue text-white px-2 py-0.5 rounded shadow">
                      {video.type}
                    </span>
                  </div>

                  {/* Info block */}
                  <div className="p-3 sm:p-5 flex-grow flex flex-col justify-between space-y-3 sm:space-y-4">
                    <h4 className="font-extrabold text-[11px] sm:text-base text-brand-blue dark:text-white line-clamp-2 leading-tight">
                      {video.title}
                    </h4>
                    <div className="flex justify-between items-center text-[10px] sm:text-xs pt-1.5 sm:pt-2 border-t border-gray-100 dark:border-white/5">
                      <span className="text-gray-400 hidden sm:inline">Creators College</span>
                      <button
                        onClick={() => setActiveVideo(video)}
                        className="font-bold text-brand-orange hover:text-brand-orange-dark transition inline-flex items-center gap-0.5 cursor-pointer"
                      >
                        <span className="hidden sm:inline">{video.type === "youtube" ? "Watch Video" : "View Clip"}</span>
                        <span className="sm:hidden">Play</span>
                        &rarr;
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 space-y-2 bg-brand-gray/20 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
            <Video className="text-gray-400 mx-auto" size={32} />
            <h4 className="font-bold text-gray-500">No Videos Found</h4>
            <p className="text-xs text-gray-400">Try adjusting your filters or search keywords.</p>
          </div>
        )}

      </div>

      {/* Dynamic Overlay Modal Player */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className={`w-full bg-black rounded-2xl overflow-hidden relative shadow-2xl transition-all duration-300 flex flex-col justify-center items-center ${
              activeVideo.type === "youtube" 
                ? "max-w-4xl aspect-video" 
                : "max-w-[350px] aspect-[9/16] max-h-[85vh]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 sm:right-2 text-white/80 hover:text-white flex items-center gap-1 text-xs sm:text-sm font-bold bg-white/10 py-1 px-3 rounded-full hover:bg-white/20 transition cursor-pointer"
              aria-label="Close video"
            >
              <X size={14} />
              Close
            </button>
            <iframe
              src={embedUrl}
              title={activeVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
