"use client";

import React from "react";

interface HeroCarouselSectionProps {
  isLightMode?: boolean;
}

const marqueeItems = [
  "HEALTHCARE EQUITY",
  "RUN BY STUDENTS",
  "RESEARCH & ADVOCACY",
  "CANCER LITERACY",
  "EARLY DETECTION",
  "RURAL CANCER CARE",
  "VETERINARY CARE",
  "COMMUNITY EMPOWERMENT",
];

export default function HeroCarouselSection({ isLightMode = false }: HeroCarouselSectionProps) {
  // Triple array for continuous seamless infinite scroll loop
  const infiniteItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section
      className={`w-full py-3 md:py-3.5 mb-0 relative z-20 overflow-hidden border-y transition-colors duration-500 shimmer ${
        isLightMode
          ? "bg-[#E5F2F0] border-[#CBE6E1] text-[#163B2E]"
          : "bg-[#0A070D]/90 border-white/10 text-white backdrop-blur-xl"
      }`}
    >
      {/* Left and Right Soft Edge Fade Overlays */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-20 md:w-40 z-20 pointer-events-none transition-all duration-500 ${
          isLightMode
            ? "bg-gradient-to-r from-[#E5F2F0] to-transparent"
            : "bg-gradient-to-r from-[#1B1324] to-transparent"
        }`}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-20 md:w-40 z-20 pointer-events-none transition-all duration-500 ${
          isLightMode
            ? "bg-gradient-to-l from-[#E5F2F0] to-transparent"
            : "bg-gradient-to-l from-[#1B1324] to-transparent"
        }`}
      />

      {/* Infinite Marquee Track */}
      <div className="animate-marquee flex items-center gap-7 md:gap-11 whitespace-nowrap select-none">
        {infiniteItems.map((item, idx) => (
          <div key={`${item}-${idx}`} className="flex items-center gap-7 md:gap-11 shrink-0">
            {/* 4-point Diamond Star Spark Icon */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`shrink-0 transition-transform duration-300 hover:scale-125 ${
                isLightMode ? "text-[#0D7A5F]" : "text-[#CDA8E8]"
              }`}
            >
              <path
                d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                fill="currentColor"
              />
            </svg>

            {/* Marquee Text Item */}
            <span
              className={`font-inter text-base sm:text-lg md:text-xl font-extrabold tracking-[0.13em] uppercase transition-colors duration-300 ${
                isLightMode
                  ? "text-[#163B2E] hover:text-[#0D7A5F]"
                  : "text-white hover:text-[#CDA8E8]"
              }`}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
