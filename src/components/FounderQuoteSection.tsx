"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FounderQuoteSectionProps {
  isLightMode?: boolean;
}

export default function FounderQuoteSection({ isLightMode = false }: FounderQuoteSectionProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 50, scale: 0.96, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="founder-quote-section"
      ref={sectionRef}
      className={`w-full py-16 md:py-24 px-6 md:px-[84px] relative z-10 transition-colors duration-500 overflow-hidden flex justify-center items-center ${
        isLightMode
          ? "bg-[#ECE9E9] text-[#163B2E]"
          : "bg-gradient-to-b from-[#1B1224] via-[#261A34] to-[#160E21] text-white"
      }`}
    >
      {/* Specular Ambient Refraction Glow Orbs */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[170px] pointer-events-none transition-all duration-700 pulse-glow ${
          isLightMode ? "bg-[#CDA8E8]/30" : "bg-[#8B5CF6]/20"
        }`}
      />
      <div
        className={`absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full blur-[150px] pointer-events-none transition-all duration-700 pulse-glow ${
          isLightMode ? "bg-[#F6C656]/25" : "bg-[#39C69C]/15"
        }`}
      />

      {/* Glass-Morphic Founder Quote Container */}
      <div
        ref={cardRef}
        className={`w-full max-w-5xl rounded-[36px] p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center gap-8 text-center relative z-10 backdrop-blur-2xl border transition-all duration-500 shadow-2xl ${
          isLightMode
            ? "bg-white/80 border-purple-200/80 shadow-[0_20px_60px_rgba(152,117,193,0.18)]"
            : "bg-[#0B0B0C]/85 border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.5)]"
        }`}
      >
        {/* Subtle Decorative Quote Icon Badge */}
        <div className="flex items-center gap-2 py-1.5 px-4 rounded-full border bg-white/5 border-white/15">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isLightMode ? "#6B21A8" : "#CDA8E8"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h4c0 2.5-1 4-3 5.5" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h4c0 2.5-1 4-3 5.5" />
          </svg>
          <span
            className={`font-spaceGrotesk text-xs font-bold uppercase tracking-widest ${
              isLightMode ? "text-[#581C87]" : "text-[#CDA8E8]"
            }`}
          >
            FOUNDER'S WORDS
          </span>
        </div>

        {/* Main Quote Text */}
        <blockquote
          className={`font-winterSolace text-2xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.25em] font-extrabold tracking-tight max-w-4xl bg-clip-text text-transparent ${
            isLightMode
              ? "bg-gradient-to-r from-[#163B2E] via-[#0B3E4C] to-[#163B2E]"
              : "bg-gradient-to-r from-[#FFFFFF] via-[#E2D4F7] to-[#CDA8E8]"
          }`}
        >
          “The human spirit was built to outlast despair.”
        </blockquote>

        {/* Divider Spark Line */}
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[#39C69C] via-[#CDA8E8] to-[#F6C656]" />

        {/* Founder Signature & Title in Syne Font */}
        <div className="flex flex-col items-center gap-1.5 pt-1">
          <h3
            className={`font-syne text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide ${
              isLightMode ? "text-[#163B2E]" : "text-white"
            }`}
          >
            Rajannya Das
          </h3>
          <p
            className={`font-syne text-sm sm:text-base font-semibold tracking-widest uppercase ${
              isLightMode ? "text-[#581C87]" : "text-[#CDA8E8]"
            }`}
          >
            Founder &amp; CEO
          </p>
        </div>
      </div>
    </section>
  );
}
