"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { articlesList, ArticleItem } from "@/data/articlesData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ArticlesSectionProps {
  isLightMode?: boolean;
}

export default function ArticlesSection({ isLightMode = false }: ArticlesSectionProps) {
  const { t } = useLanguage();
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(0);
  const [claps, setClaps] = useState<Record<string, number>>({
    "cancer-screening": 52,
    "anal-cancer": 38,
    "bone-cancer": 44,
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const articleCardRef = useRef<HTMLDivElement>(null);

  const currentArticle: ArticleItem = articlesList[selectedArticleIndex] || articlesList[0];
  const currentClapCount = claps[currentArticle.id] || 52;

  const handleClap = () => {
    setClaps((prev) => ({
      ...prev,
      [currentArticle.id]: (prev[currentArticle.id] || 50) + 1,
    }));
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Continuous Article Card Reveal
      if (articleCardRef.current) {
        gsap.fromTo(
          articleCardRef.current,
          { opacity: 0, y: 50, scale: 0.96, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: articleCardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedArticleIndex]);

  return (
    <section
      id="articles-section"
      ref={sectionRef}
      className={`w-full py-16 md:py-24 px-4 md:px-12 flex flex-col items-center justify-center relative z-10 transition-colors duration-500 overflow-hidden ${
        isLightMode
          ? "bg-gradient-to-b from-[#F7F2FA] via-[#FAFAF9] to-[#F7F2FA] text-[#171717]"
          : "bg-gradient-to-b from-[#160E21] via-[#21182D] to-[#160E21] text-[#F8F8F8]"
      }`}
    >
      {/* Section Ambient Glow Orbs */}
      <div
        className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none transition-all duration-700 ${
          isLightMode ? "bg-[#F6C656]/20" : "bg-[#CDA8E8]/12"
        }`}
      />
      <div
        className={`absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
          isLightMode ? "bg-[#39C69C]/20" : "bg-[#39C69C]/10"
        }`}
      />

      {/* Header Container */}
      <div
        ref={headerRef}
        className="flex max-w-4xl flex-col items-center gap-6 w-full text-center relative z-10 mb-10"
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 overflow-visible">
          <span className="font-winterSolace text-5xl md:text-[90px] leading-[1.2em] font-extrabold bg-gradient-to-r from-[#F6C656] via-[#CDA8E8] to-[#39C69C] bg-clip-text text-transparent inline-block">
            {t("art_title_1")}
          </span>
          <div className="py-2.5 md:py-4 px-8 md:px-12 rounded-full bg-[#F6C656] shadow-lg flex items-center justify-center">
            <span className="text-[#0B0B0C] font-winterSolace text-3xl md:text-[70px] leading-[1.1em] font-bold">
              {t("art_title_2")}
            </span>
          </div>
          <span className="font-inter text-5xl md:text-[90px] font-bold text-[#F6C656] leading-[1.2em] inline-block">
            .
          </span>
        </div>

        <p
          className={`font-inter text-base md:text-lg max-w-2xl text-center leading-relaxed ${
            isLightMode ? "text-[#2E1640]" : "text-[#E9CDF8]/90"
          }`}
        >
          {t("art_subtitle")}
        </p>

        {/* Article Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          {articlesList.slice(0, 5).map((art, idx) => (
            <button
              key={art.id}
              onClick={() => setSelectedArticleIndex(idx)}
              className={`py-2 px-4 rounded-full text-xs font-inter font-semibold transition-all duration-300 cursor-pointer ${
                selectedArticleIndex === idx
                  ? "bg-[#F6C656] text-[#0B0B0C] shadow-md shadow-[#F6C656]/30 scale-105 font-bold"
                  : isLightMode
                  ? "bg-white/80 text-[#2E1640] hover:bg-[#F6C656]/20 border border-black/10"
                  : "bg-white/10 text-zinc-300 hover:bg-[#CDA8E8]/20 hover:text-[#CDA8E8] border border-white/10"
              }`}
            >
              {art.title.length > 32 ? `${art.title.slice(0, 32)}...` : art.title}
            </button>
          ))}
        </div>
      </div>

      {/* CONTINUOUS EDITORIAL ARTICLE READER CONTAINER (Medium Style) */}
      <div
        ref={articleCardRef}
        className={`w-full max-w-4xl rounded-3xl p-6 md:p-12 border transition-all duration-500 shadow-2xl relative z-10 ${
          isLightMode
            ? "bg-white border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-[#171717]"
            : "bg-[#0E0E10] border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.6)] text-[#F8F8F8]"
        }`}
      >
        {/* Article Headline */}
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight leading-[1.25] mb-4">
          {currentArticle.title}
        </h2>

        {/* Byline */}
        <p className={`font-inter text-base md:text-lg mb-6 ${isLightMode ? "text-zinc-600" : "text-zinc-400"}`}>
          by <span className="font-semibold text-emerald-500">{currentArticle.author}</span>
        </p>

        {/* Publication Badge & Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-zinc-500/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-amber-500 flex items-center justify-center font-bold text-white text-xs shadow-md shrink-0">
              TCF
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm font-inter">The Carcino Foundation</span>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`py-0.5 px-3 rounded-full text-xs font-semibold font-inter transition-all cursor-pointer ${
                    isFollowing
                      ? "bg-emerald-500 text-black font-bold"
                      : "border border-emerald-500/60 text-emerald-400 hover:bg-emerald-500/20"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
              <span className={`text-xs font-inter ${isLightMode ? "text-zinc-500" : "text-zinc-400"}`}>
                {currentArticle.readTime} · {currentArticle.date}
              </span>
            </div>
          </div>

          {/* Social Action Tools (Claps, Comments, Repost, Bookmark, Audio, Share) */}
          <div className="flex items-center gap-4 text-xs font-inter">
            {/* Clap Button */}
            <button
              onClick={handleClap}
              title="Clap for article"
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-bold transition-all cursor-pointer active:scale-95"
            >
              <span className="text-base">👏</span>
              <span>{currentClapCount}</span>
            </button>

            {/* Comment Counter */}
            <span className="flex items-center gap-1 text-zinc-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>1</span>
            </span>

            {/* Repost Counter */}
            <span className="flex items-center gap-1 text-zinc-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 1l4 4-4 4"></path>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                <path d="M7 23l-4-4 4-4"></path>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
              </svg>
              <span>1</span>
            </span>

            {/* Bookmark Button */}
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              title="Bookmark story"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                isBookmarked ? "text-emerald-400 bg-emerald-500/10" : "text-zinc-400 hover:text-white"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>

            {/* Audio Player Button */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              title="Listen to article audio"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                isPlayingAudio ? "text-purple-400 bg-purple-500/20" : "text-zinc-400 hover:text-white"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </button>

            {/* Share Link Button */}
            <button
              onClick={handleShare}
              title="Share article"
              className="p-1.5 rounded-full text-zinc-400 hover:text-white transition-all cursor-pointer relative"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              {copiedLink && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 py-1 px-2.5 rounded bg-emerald-500 text-black font-bold text-[10px] whitespace-nowrap shadow-lg">
                  Link copied!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* CONTINUOUS PROSE ARTICLE BODY */}
        <div className="flex flex-col gap-5 text-base md:text-lg leading-relaxed font-sans opacity-95">
          {currentArticle.content.map((paragraph, pIdx) => (
            <p
              key={pIdx}
              className={`${
                pIdx === 0
                  ? "font-medium text-lg md:text-xl text-amber-500/90 italic border-l-2 border-amber-500 pl-4 py-1"
                  : ""
              }`}
            >
              {paragraph}
            </p>
          ))}

          {/* Render article sections continuously if present */}
          {currentArticle.sections &&
            currentArticle.sections.map((sec, secIdx) => (
              <div key={secIdx} className="flex flex-col gap-3 mt-4 pt-4 border-t border-zinc-500/10">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-emerald-400">
                  {sec.heading}
                </h3>
                {sec.content.map((p, itemIdx) => (
                  <p key={itemIdx} className="text-base leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}
        </div>

        {/* Bottom Editorial Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 mt-8 border-t border-zinc-500/20">
          <div className="flex items-center gap-3">
            <button
              onClick={handleClap}
              className="flex items-center gap-2 py-2 px-4 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 font-bold text-sm transition-all cursor-pointer active:scale-95"
            >
              <span>👏 Clap for this story</span>
              <span className="bg-amber-500/20 py-0.5 px-2 rounded-full text-xs">
                {currentClapCount}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/articles/${currentArticle.id}`}
              className="py-2.5 px-6 rounded-full bg-gradient-to-r from-[#F6C656] to-[#D4AF37] text-[#0B0B0C] font-inter text-xs font-bold hover:brightness-110 transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Read Full Article & Citations ↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Explore All Articles CTA Button */}
      <div className="mt-12 text-center relative z-10">
        <Link
          href="/articles"
          className="inline-flex py-4 px-8 rounded-full bg-gradient-to-r from-[#F6C656] via-[#E5C158] to-[#D4AF37] hover:brightness-110 text-[#0B0B0C] font-inter text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 items-center gap-2 cursor-pointer"
        >
          <span>Explore All 29 Articles in Full Gallery</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.33325 8H12.6666M8.00008 12.6667L12.6666 8L8.00008 3.33334"
              stroke="#0B0B0C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
