"use client";

import React, { useState, useMemo } from "react";
import { Search, X, Building2, Grid, Layers } from "lucide-react";
import { BRANDS_DATA, BrandItem } from "@/data/brands";

export default function BrandsMarquee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const row1Brands = [
    { name: "Swiggy", color: "text-[#FC8019] dark:text-[#FFA04D]", bg: "bg-[#FC8019]/5 dark:bg-white/5", border: "border-[#FC8019]/25 dark:border-white/10" },
    { name: "Decathlon", color: "text-[#007EA7] dark:text-[#33B3E6]", bg: "bg-[#007EA7]/5 dark:bg-white/5", border: "border-[#007EA7]/25 dark:border-white/10" },
    { name: "Spinny", color: "text-[#008080] dark:text-[#33B2B2]", bg: "bg-[#008080]/5 dark:bg-white/5", border: "border-[#008080]/25 dark:border-white/10" },
    { name: "Perfect Prime News", color: "text-[#D90429] dark:text-[#FF4D6D]", bg: "bg-[#D90429]/5 dark:bg-white/5", border: "border-[#D90429]/25 dark:border-white/10" },
    { name: "Telugu Tea Talks", color: "text-[#D4AF37] dark:text-[#F3E5AB]", bg: "bg-[#D4AF37]/5 dark:bg-white/5", border: "border-[#D4AF37]/25 dark:border-white/10" },
    { name: "The Chennai Shopping Mall", color: "text-[#800020] dark:text-[#C70039]", bg: "bg-[#800020]/5 dark:bg-white/5", border: "border-[#800020]/25 dark:border-white/10" }
  ];

  const row2Brands = [
    { name: "Bajaj Electronics", color: "text-[#003049] dark:text-[#66B2FF]", bg: "bg-[#003049]/5 dark:bg-white/5", border: "border-[#003049]/25 dark:border-white/10" },
    { name: "HIITMS Academy", color: "text-[#F77F00] dark:text-[#FFB366]", bg: "bg-[#F77F00]/5 dark:bg-white/5", border: "border-[#F77F00]/25 dark:border-white/10" },
    { name: "Himajal", color: "text-[#118AB2] dark:text-[#4FD1C5]", bg: "bg-[#118AB2]/5 dark:bg-white/5", border: "border-[#118AB2]/25 dark:border-white/10" },
    { name: "SRK Trade Corp", color: "text-[#073B4C] dark:text-[#90CDF4]", bg: "bg-[#073B4C]/5 dark:bg-white/5", border: "border-[#073B4C]/25 dark:border-white/10" },
    { name: "Electronics Cart", color: "text-[#4F5D75] dark:text-[#A0AEC0]", bg: "bg-[#4F5D75]/5 dark:bg-white/5", border: "border-[#4F5D75]/25 dark:border-white/10" }
  ];

  const row3Brands = [
    { name: "Mak Bath & Lights", color: "text-[#2D3142] dark:text-[#CBD5E0]", bg: "bg-[#2D3142]/5 dark:bg-white/5", border: "border-[#2D3142]/25 dark:border-white/10" },
    { name: "Sri Vaishnavi Vensai Interiors", color: "text-[#D81159] dark:text-[#FF66A3]", bg: "bg-[#D81159]/5 dark:bg-white/5", border: "border-[#D81159]/25 dark:border-white/10" },
    { name: "Swiggy Instamart", color: "text-[#FF4500] dark:text-[#FF7F50]", bg: "bg-[#FF4500]/5 dark:bg-white/5", border: "border-[#FF4500]/25 dark:border-white/10" },
    { name: "Amity Global", color: "text-[#000080] dark:text-[#9999FF]", bg: "bg-[#000080]/5 dark:bg-white/5", border: "border-[#000080]/25 dark:border-white/10" },
    { name: "Rapido", color: "text-[#D4AF37] dark:text-[#FFD700]", bg: "bg-[#D4AF37]/5 dark:bg-white/5", border: "border-[#D4AF37]/25 dark:border-white/10" },
    { name: "Asus Laptop Store", color: "text-[#0051BA] dark:text-[#66B2FF]", bg: "bg-[#0051BA]/5 dark:bg-white/5", border: "border-[#0051BA]/25 dark:border-white/10" },
    { name: "IKEA", color: "text-[#FFCC00] dark:text-[#FFFF66]", bg: "bg-[#FFCC00]/5 dark:bg-white/5", border: "border-[#FFCC00]/25 dark:border-white/10" }
  ];

  // All unique categories for filtering
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    BRANDS_DATA.forEach((b) => {
      if (b.category) cats.add(b.category.trim());
    });
    return Array.from(cats);
  }, []);

  // Filtered brand items based on search and category
  const filteredBrands = useMemo(() => {
    return BRANDS_DATA.filter((brand) => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || brand.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="w-full py-12 bg-white dark:bg-[#090d16] overflow-hidden relative">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange">
          Proven Industry Trust
        </h3>
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-blue dark:text-white mt-2">
          Empowering Creators &amp; Local Businesses
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto mt-2">
          We have trained employees, founders, and content leads from some of India's biggest brands and over 500+ local businesses.
        </p>
      </div>

      {/* Sliding Marquee Tickers */}
      <div className="relative w-full overflow-hidden py-6 space-y-5 bg-brand-gray/30 dark:bg-white/5 border-y border-gray-100 dark:border-white/5 mb-8">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-[#090d16] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-[#090d16] to-transparent z-10 pointer-events-none" />
        
        {/* Row 1: Left Moving */}
        <div className="relative w-full flex items-center">
          <div className="animate-marquee-row1 whitespace-nowrap flex gap-6 tracking-wider items-center">
            {row1Brands.map((brand, i) => (
              <div key={`r1-1-${i}`} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full border ${brand.border} ${brand.bg} ${brand.color} shadow-sm font-extrabold text-xs sm:text-sm tracking-wide`}>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 animate-pulse" />
                {brand.name}
              </div>
            ))}
            {row1Brands.map((brand, i) => (
              <div key={`r1-2-${i}`} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full border ${brand.border} ${brand.bg} ${brand.color} shadow-sm font-extrabold text-xs sm:text-sm tracking-wide`}>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 animate-pulse" />
                {brand.name}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right Moving */}
        <div className="relative w-full flex items-center">
          <div className="animate-marquee-row2 whitespace-nowrap flex gap-6 tracking-wider items-center">
            {row2Brands.map((brand, i) => (
              <div key={`r2-1-${i}`} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full border ${brand.border} ${brand.bg} ${brand.color} shadow-sm font-extrabold text-xs sm:text-sm tracking-wide`}>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 animate-pulse" />
                {brand.name}
              </div>
            ))}
            {row2Brands.map((brand, i) => (
              <div key={`r2-2-${i}`} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full border ${brand.border} ${brand.bg} ${brand.color} shadow-sm font-extrabold text-xs sm:text-sm tracking-wide`}>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 animate-pulse" />
                {brand.name}
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Left Moving */}
        <div className="relative w-full flex items-center">
          <div className="animate-marquee-row3 whitespace-nowrap flex gap-6 tracking-wider items-center">
            {row3Brands.map((brand, i) => (
              <div key={`r3-1-${i}`} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full border ${brand.border} ${brand.bg} ${brand.color} shadow-sm font-extrabold text-xs sm:text-sm tracking-wide`}>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 animate-pulse" />
                {brand.name}
              </div>
            ))}
            {row3Brands.map((brand, i) => (
              <div key={`r3-2-${i}`} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full border ${brand.border} ${brand.bg} ${brand.color} shadow-sm font-extrabold text-xs sm:text-sm tracking-wide`}>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 animate-pulse" />
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Modal Trigger */}
      <div className="text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-6 py-3 rounded-full text-sm tracking-wide transition duration-200 hover-lift shadow-md cursor-pointer"
        >
          <Building2 size={16} />
          Explore All 500+ Brand Partners
        </button>
      </div>

      {/* Brands Directory Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#131b2e] w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-gray-100 dark:border-white/5">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-brand-blue dark:bg-brand-gray text-white">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Creators College Alumni Network</h3>
                <p className="text-xs text-white/80 mt-1">Search and filter the 527 businesses trained by our academy</p>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter Bar */}
            <div className="p-4 sm:p-6 bg-gray-50 dark:bg-[#090d16]/30 border-b border-gray-100 dark:border-white/5 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search brand by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 bg-white dark:bg-white/5 text-brand-charcoal dark:text-white text-sm"
                />
              </div>

              {/* Category dropdown */}
              <div className="flex items-center gap-2">
                <Layers className="text-gray-400 shrink-0" size={18} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 bg-white dark:bg-white/5 text-brand-charcoal dark:text-white text-sm min-w-[160px]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-white dark:bg-[#131b2e] text-brand-charcoal dark:text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Brands Grid (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-[#090d16]">
              {filteredBrands.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredBrands.map((brand) => (
                    <div
                      key={brand.rank}
                      className="p-4 rounded-xl border border-gray-100 dark:border-white/5 bg-brand-gray/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-brand-blue/20 hover:shadow-md transition duration-150 flex items-center justify-between"
                    >
                      <div className="space-y-1 pr-2">
                        <div className="text-xs font-bold text-gray-400 dark:text-gray-500 font-mono">#{brand.rank}</div>
                        <div className="text-sm font-semibold text-brand-charcoal dark:text-white line-clamp-1">{brand.name}</div>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {brand.category || "General"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 text-gray-400">
                    <Grid size={24} />
                  </div>
                  <h4 className="text-base font-semibold text-gray-600 dark:text-gray-300">No Brand Partners Found</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Try adjusting your search criteria or changing the category filter.</p>
                </div>
              )}
            </div>

            {/* Modal Footer Stats */}
            <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#090d16]/30 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <div>
                Showing <strong>{filteredBrands.length}</strong> of <strong>{BRANDS_DATA.length}</strong> partners
              </div>
              <div className="hidden sm:block">
                Total Businesses Scaled: <strong>500+</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
