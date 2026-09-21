"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ArticlesSectionProps {
  isLightMode?: boolean;
}

export default function ArticlesSection({ isLightMode = false }: ArticlesSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredArticleId, setHoveredArticleId] = useState<number | null>(null);
  const router = useRouter();

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    "Medical Insights",
    "Survivor Stories",
    "Caregiver Guide",
    "Wellness & Recovery",
  ];

  const allArticles = [
    {
      id: 1,
      category: "Medical Insights",
      tag: "Medical Insights",
      title: "Understanding Carcinoma Types & Early Detection",
      readTime: "5 min read",
      date: "Sep 20, 2026",
      desc: "A beginner-friendly breakdown of different carcinoma classifications, symptoms, and key screening protocols.",
      author: "Dr. Sarah Jenkins",
    },
    {
      id: 2,
      category: "Survivor Stories",
      tag: "Survivor Stories",
      title: "Navigating Diagnosis With Mental Resilience",
      readTime: "7 min read",
      date: "Sep 18, 2026",
      desc: "Practical strategies for patients and families to manage anxiety, grief, and build community strength.",
      author: "Elena Rostova",
    },
    {
      id: 3,
      category: "Caregiver Guide",
      tag: "Caregiver Guide",
      title: "How Care Teams & Local Foundations Collaborate",
      readTime: "4 min read",
      date: "Sep 15, 2026",
      desc: "Exploring how Carcino Foundation connects patients with local care teams for seamless support.",
      author: "Marcus Vance",
    },
    {
      id: 4,
      category: "Medical Insights",
      tag: "Medical Insights",
      title: "Immunotherapy Breakthroughs in 2026: What You Need to Know",
      readTime: "6 min read",
      date: "Sep 12, 2026",
      desc: "An accessible guide to targeted T-cell therapies, modern clinical trials, and personalized oncology.",
      author: "Dr. Aris Thorne",
    },
    {
      id: 5,
      category: "Wellness & Recovery",
      tag: "Wellness & Recovery",
      title: "Nutrition & Integrative Care During Treatment",
      readTime: "8 min read",
      date: "Sep 10, 2026",
      desc: "Evidence-backed dietary strategies, hydration practices, and holistic wellness rituals during chemo.",
      author: "Sophia Lin, RD",
    },
    {
      id: 6,
      category: "Survivor Stories",
      tag: "Survivor Stories",
      title: "Life Beyond Remission: Finding Purpose & Renewed Vitality",
      readTime: "6 min read",
      date: "Sep 08, 2026",
      desc: "Personal reflections on post-treatment transition, long-term health tracking, and peer mentorship.",
      author: "David K. Miller",
    },
  ];

  const filteredArticles =
    activeCategory === "All"
      ? allArticles
      : allArticles.filter((art) => art.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header GSAP ScrollTrigger animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Cards Stagger GSAP ScrollTrigger animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 60, scale: 0.93 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "back.out(1.3)",
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
        isLightMode ? "bg-[#F8F4FA] text-[#171717]" : "bg-[#050505] text-[#F8F8F8]"
      }`}
    >
      {/* Full Screen Ambient Light Purple Gradient Overlay on Hover */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ease-out z-0 ${
          hoveredArticleId !== null ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(120% 120% at 50% 50%, rgba(194, 122, 255, 0.45) 0%, rgba(224, 180, 255, 0.25) 45%, rgba(194, 122, 255, 0.08) 80%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      {/* Header Container */}
      <div
        ref={headerRef}
        className="flex max-w-[960px] flex-col items-center gap-[29px] w-full text-center relative z-10"
      >
        {/* Title Group */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 relative min-h-[180px] md:min-h-[220px]">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <span className="font-winterSolace text-6xl md:text-[100px] leading-tight font-extrabold bg-gradient-to-r from-[#C08A6E] via-[#B3A9C6] to-[#9DAE8B] bg-clip-text text-transparent">
              Article
            </span>
            <div className="py-2.5 md:py-4 px-6 md:px-12 rounded-[999px] bg-[#9DAE8B] shadow-lg flex items-center justify-center">
              <span className="text-[#0B0B0C] font-winterSolace text-4xl md:text-[80px] leading-none font-bold">
                Gallery
              </span>
            </div>
            <span className="font-inter text-6xl md:text-[100px] font-bold text-[#F4F1E9]">
              .
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <div className="max-w-[600px] mx-auto">
          <p
            className={`font-inter text-base md:text-lg leading-relaxed text-center ${
              isLightMode ? "text-[#581C87]" : "text-[#D5B0FF]"
            }`}
          >
            Here's the latest collection of articles we offer, tailored to be
            understandable by everyone, made with love and care by our Writing
            Team.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-2 px-5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#9DAE8B] text-[#0B0B0C] shadow-md scale-105"
                  : isLightMode
                  ? "bg-white/80 text-zinc-700 hover:bg-[#9DAE8B]/20 border border-black/5"
                  : "bg-white/10 text-zinc-300 hover:bg-white/20 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Article Cards Grid */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-12 mx-auto relative z-10"
      >
        {filteredArticles.map((art) => (
          <Link
            key={art.id}
            href={`/articles/${art.id}`}
            onMouseEnter={() => setHoveredArticleId(art.id)}
            onMouseLeave={() => setHoveredArticleId(null)}
            className={`flex flex-col justify-between p-8 rounded-[32px] transition-all duration-500 group cursor-pointer ${
              hoveredArticleId === art.id
                ? "bg-white/90 border-[#C27AFF] shadow-[0_20px_50px_rgba(194,122,255,0.45)] -translate-y-2 scale-[1.02]"
                : isLightMode
                ? "bg-white/75 backdrop-blur-md border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
                : "glass-card"
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-4">
                <span
                  className={`py-1 px-3 rounded-full font-inter transition-colors ${
                    hoveredArticleId === art.id
                      ? "bg-[#C27AFF] text-white"
                      : "bg-[#9DAE8B]/20 text-[#9DAE8B]"
                  }`}
                >
                  {art.tag}
                </span>
                <span
                  className={
                    hoveredArticleId === art.id
                      ? "text-purple-900 font-medium"
                      : isLightMode
                      ? "text-zinc-500"
                      : "text-zinc-400"
                  }
                >
                  {art.readTime}
                </span>
              </div>
              <h3
                className={`font-winterSolace text-xl font-bold mb-3 transition-colors ${
                  hoveredArticleId === art.id
                    ? "text-[#6B21A8]"
                    : isLightMode
                    ? "text-[#171717]"
                    : "text-white"
                }`}
              >
                {art.title}
              </h3>
              <p
                className={`font-inter text-sm leading-relaxed mb-6 transition-colors ${
                  hoveredArticleId === art.id
                    ? "text-purple-950 font-medium"
                    : isLightMode
                    ? "text-zinc-600"
                    : "text-zinc-300"
                }`}
              >
                {art.desc}
              </p>
            </div>
            <div
              className={`flex items-center justify-between pt-4 border-t text-xs transition-colors ${
                hoveredArticleId === art.id
                  ? "border-purple-300 text-purple-900"
                  : "border-white/10"
              }`}
            >
              <span
                className={`font-semibold ${
                  hoveredArticleId === art.id
                    ? "text-[#6B21A8]"
                    : isLightMode
                    ? "text-zinc-700"
                    : "text-zinc-300"
                }`}
              >
                {art.author}
              </span>
              <span
                className={
                  hoveredArticleId === art.id
                    ? "text-purple-700"
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
    </section>
  );
}
