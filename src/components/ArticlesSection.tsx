"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { client } from "@/sanity/lib/client";
import { createSanityAttribute } from "@/sanity/lib/visualEditing";
import { useLanguage } from "@/context/LanguageContext";
import { articlesList } from "@/data/articlesData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ArticlesSectionProps {
  isLightMode?: boolean;
}

export default function ArticlesSection({ isLightMode = false }: ArticlesSectionProps) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredArticleId, setHoveredArticleId] = useState<string | number | null>(null);
  const [sanityArticles, setSanityArticles] = useState<any[]>([]);
  const router = useRouter();

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const categories = [
    t("art_cat_all"),
    t("art_cat_medical"),
    t("art_cat_survivor"),
    t("art_cat_caregiver"),
    t("art_cat_wellness"),
  ];

  const defaultArticles = articlesList.map((art) => ({
    id: art.id,
    category: art.category,
    tag: art.tag,
    title: art.title,
    readTime: art.readTime,
    date: art.date,
    desc: art.desc,
    author: art.author,
  }));

  useEffect(() => {
    async function fetchSanityArticles() {
      try {
        const docs = await client.fetch(
          `*[_type == "article" && !(_id in path("drafts.**"))] | order(_createdAt desc)`,
          {},
          { useCdn: false }
        );
        if (docs && Array.isArray(docs)) {
          const formatted = docs.map((doc: any) => ({
            id: doc._id,
            category: doc.category || "Medical Insights",
            tag: doc.category || "Medical Insights",
            title: doc.title || "Untitled Article",
            readTime: doc.readTime
              ? (doc.readTime.includes("min") ? doc.readTime : `${doc.readTime} min read`)
              : "5 min read",
            date: doc.date || "Sep 22, 2026",
            desc: doc.desc || "",
            author: doc.author || "Sayantan Pal",
          }));
          setSanityArticles(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch Sanity articles:", err);
      }
    }

    fetchSanityArticles();

    // Subscribe to live Sanity mutations to update the gallery instantly when published
    const subscription = client
      .listen(`*[_type == "article"]`)
      .subscribe(() => {
        fetchSanityArticles();
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const allArticles = [...sanityArticles, ...defaultArticles];

  const filteredArticles =
    activeCategory === "All"
      ? allArticles
      : allArticles.filter((art) => art.category === activeCategory);


  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header ScrollTrigger Timeline
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 50, scale: 0.94, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
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

      // 2. Cards Stagger ScrollTrigger Animation with 3D Perspective
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 70, scale: 0.9, rotateX: 12, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.95,
            stagger: 0.14,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="articles-gallery"
      ref={sectionRef}
      className={`w-full py-20 md:py-[120px] px-6 md:px-12 flex flex-col items-center justify-center relative z-10 transition-colors duration-500 overflow-hidden ${
        isLightMode
          ? "bg-gradient-to-b from-[#F8F4FA] via-[#ECFDF5]/60 to-[#F8F4FA] text-[#171717]"
          : "bg-gradient-to-b from-[#050505] via-[#0D0B05] to-[#050505] text-[#F8F8F8]"
      }`}
    >
      {/* Section-Specific Ambient Gradient Blur Orbs */}
      <div
        className={`absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
          isLightMode ? "bg-[#F6C656]/25" : "bg-[#F6C656]/15"
        }`}
      />
      <div
        className={`absolute top-1/2 -right-32 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none transition-all duration-700 ${
          isLightMode ? "bg-[#D4AF37]/30" : "bg-[#D4AF37]/15"
        }`}
      />

      {/* Full Screen Ambient Gold Gradient Overlay on Hover */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ease-out z-0 ${
          hoveredArticleId !== null ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(140% 140% at 50% 50%, rgba(246, 198, 86, 0.55) 0%, rgba(212, 175, 55, 0.35) 45%, rgba(180, 130, 20, 0.15) 75%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      {/* Header Container */}
      <div
        ref={headerRef}
        className="flex max-w-[960px] flex-col items-center gap-[29px] w-full text-center relative z-10"
      >
        {/* Title Group */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 relative min-h-[180px] md:min-h-[220px] overflow-visible">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 overflow-visible">
            <span className="font-winterSolace text-6xl md:text-[100px] leading-[1.25em] font-extrabold bg-gradient-to-r from-[#F6C656] via-[#E5C158] to-[#C9A867] bg-clip-text text-transparent pt-4 pb-2 px-2 inline-block">
              {t("art_title_1")}
            </span>
            <div className="py-3.5 md:py-5 px-8 md:px-14 rounded-[999px] bg-[#F6C656] shadow-lg flex items-center justify-center overflow-visible">
              <span className="text-[#0B0B0C] font-winterSolace text-4xl md:text-[80px] leading-[1.15em] font-bold pt-1 pb-1 inline-block">
                {t("art_title_2")}
              </span>
            </div>
            <span className="font-inter text-6xl md:text-[100px] font-bold text-[#F6C656] leading-[1.25em] pt-4 inline-block">
              .
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <div className="max-w-[600px] mx-auto">
          <p
            className={`font-inter text-base md:text-lg leading-relaxed text-center ${
              isLightMode ? "text-[#2E1640]" : "text-[#F6C656]/90"
            }`}
          >
            {t("art_subtitle")}
          </p>
        </div>

        {/* Category Pills & Explore Button */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-2 px-5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#F6C656] text-[#0B0B0C] shadow-md shadow-[#F6C656]/30 scale-105"
                  : isLightMode
                  ? "bg-white/80 text-[#2E1640] hover:bg-[#F6C656]/20 hover:border-[#F6C656] border border-black/5"
                  : "bg-white/10 text-zinc-300 hover:bg-[#F6C656]/20 hover:border-[#F6C656] hover:text-[#F6C656] border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
          <Link
            href="/articles"
            className="py-2 px-5 rounded-full text-xs md:text-sm font-bold bg-[#F6C656] text-[#0B0B0C] hover:bg-[#E5C158] transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer ml-1"
          >
            <span>{t("btn_explore_articles")}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.91626 7.00006H11.0839M7.00006 11.0839L11.0839 7.00006L7.00006 2.91626" stroke="#0B0B0C" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Article Cards Grid - Pure Square Tiles */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-12 mx-auto relative z-10"
      >
        {filteredArticles.slice(0, 6).map((art) => (
          <Link
            key={art.id}
            href={`/articles/${art.id}`}
            onMouseEnter={() => setHoveredArticleId(art.id)}
            onMouseLeave={() => setHoveredArticleId(null)}
            className={`aspect-square flex flex-col justify-between p-6 md:p-8 rounded-[32px] transition-all duration-500 group cursor-pointer ${
              hoveredArticleId === art.id
                ? "bg-[#1A1408] border-[#F6C656] shadow-[0_20px_60px_rgba(246,198,86,0.45)] -translate-y-2 scale-[1.03]"
                : isLightMode
                ? "bg-white/80 backdrop-blur-md border border-black/5 hover:border-[#F6C656] shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
                : "glass-card border border-white/10 hover:border-[#F6C656]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-3">
                <span
                  data-sanity={typeof art.id === "string" ? createSanityAttribute(art.id, "article", "category") : undefined}
                  className={`py-1 px-3.5 rounded-full font-inter transition-colors ${
                    hoveredArticleId === art.id
                      ? "bg-[#F6C656] text-[#0B0B0C] font-bold"
                      : "bg-[#F6C656]/20 text-[#F6C656]"
                  }`}
                >
                  {art.tag}
                </span>
                <span
                  data-sanity={typeof art.id === "string" ? createSanityAttribute(art.id, "article", "readTime") : undefined}
                  className={
                    hoveredArticleId === art.id
                      ? "text-[#F6C656] font-semibold"
                      : isLightMode
                      ? "text-[#2E1640]"
                      : "text-zinc-400"
                  }
                >
                  {art.readTime}
                </span>
              </div>
              <h3
                data-sanity={typeof art.id === "string" ? createSanityAttribute(art.id, "article", "title") : undefined}
                className={`font-googleSansFlex text-lg md:text-xl font-bold tracking-tight leading-snug mb-3 line-clamp-3 transition-colors ${
                  hoveredArticleId === art.id
                    ? "text-[#F6C656]"
                    : isLightMode
                    ? "text-[#163B2E]"
                    : "text-white"
                }`}
              >
                {art.title}
              </h3>
              <p
                data-sanity={typeof art.id === "string" ? createSanityAttribute(art.id, "article", "desc") : undefined}
                className={`font-inter text-xs md:text-sm leading-relaxed line-clamp-3 transition-colors ${
                  hoveredArticleId === art.id
                    ? "text-amber-200 font-medium"
                    : isLightMode
                    ? "text-zinc-600"
                    : "text-zinc-300"
                }`}
              >
                {art.desc}
              </p>
            </div>
            <div
              className={`flex items-center justify-between pt-3 border-t text-xs transition-colors ${
                hoveredArticleId === art.id
                  ? "border-[#F6C656]/40 text-amber-300"
                  : "border-white/10"
              }`}
            >
              <span
                data-sanity={typeof art.id === "string" ? createSanityAttribute(art.id, "article", "author") : undefined}
                className={`font-semibold line-clamp-1 ${
                  hoveredArticleId === art.id
                    ? "text-[#F6C656]"
                    : isLightMode
                    ? "text-zinc-700"
                    : "text-zinc-300"
                }`}
              >
                {art.author}
              </span>
              <span
                data-sanity={typeof art.id === "string" ? createSanityAttribute(art.id, "article", "date") : undefined}
                className={
                  hoveredArticleId === art.id
                    ? "text-amber-400"
                    : isLightMode
                    ? "text-zinc-400"
                    : "text-zinc-500"
                }
              >
                {art.date}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Articles CTA Button */}
      <div className="mt-12 text-center relative z-10">
        <Link
          href="/articles"
          className="inline-flex py-4 px-8 rounded-full bg-gradient-to-r from-[#F6C656] via-[#E5C158] to-[#D4AF37] hover:brightness-110 text-[#0B0B0C] font-inter text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 items-center gap-2 cursor-pointer"
        >
          <span>View All 29 Articles in Full Gallery</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33325 8H12.6666M8.00008 12.6667L12.6666 8L8.00008 3.33334" stroke="#0B0B0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
