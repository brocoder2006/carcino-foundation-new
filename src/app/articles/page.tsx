"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { client } from "@/sanity/lib/client";
import { useLanguage } from "@/context/LanguageContext";
import EditorialMenuPopover from "@/components/EditorialMenuPopover";
import { articlesList } from "@/data/articlesData";

export default function ArticlesGalleryPage() {
  const { lang, toggleLang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All Insights");
  const [sanityArticles, setSanityArticles] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");

  const categories = [
    "All Insights",
    "Clinical Care",
    "Patient Stories",
    "Caregiving",
    "Treatment Tech",
    "Survivorship",
  ];

  const defaultArticles = articlesList.map(art => ({
    id: art.id,
    category: art.category.toUpperCase(),
    tag: art.tag.toUpperCase(),
    readTime: art.readTime.toUpperCase(),
    title: art.title,
    desc: art.desc,
    cover: art.cover,
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
            category: (doc.category || "CLINICAL CARE").toUpperCase(),
            tag: (doc.category || "CLINICAL CARE").toUpperCase(),
            title: doc.title || "Untitled Article",
            readTime: doc.readTime ? doc.readTime.toUpperCase() : "5 MIN READ",
            desc: doc.desc || "",
            cover: doc.mainImage?.asset?.url || "/Cover.png",
          }));
          setSanityArticles(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch Sanity articles:", err);
      }
    }

    fetchSanityArticles();
  }, []);

  const headerRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 45, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.14,
          }
        );
      }

      if (heroCardRef.current) {
        tl.fromTo(
          heroCardRef.current,
          { opacity: 0, y: 50, scale: 0.96, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
          },
          "-=0.4"
        );
      }

      if (gridRef.current) {
        const cards = Array.from(gridRef.current.children) as HTMLElement[];

        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.93, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        cards.forEach((card) => {
          const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(card, {
              rotateX: -y / 20,
              rotateY: x / 20,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.5,
              ease: "power3.out",
            });
          };

          card.addEventListener("mousemove", handleMouseMove);
          card.addEventListener("mouseleave", handleMouseLeave);
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const allArticlesList = [...sanityArticles, ...defaultArticles];

  const handleSearchExecute = () => {
    setActiveSearchQuery(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setActiveSearchQuery("");
  };

  const filteredArticles = allArticlesList.filter((art) => {
    const matchesCategory =
      activeCategory === "All Insights" ||
      art.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      activeCategory.toLowerCase().includes(art.category.toLowerCase());

    const term = (activeSearchQuery || searchInput).toLowerCase().trim();

    const matchesSearch =
      term === "" ||
      art.title.toLowerCase().includes(term) ||
      art.desc.toLowerCase().includes(term) ||
      art.category.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col items-start bg-gradient-to-b from-[#1E1727] via-[#30253C] to-[#160E21] min-w-full min-h-screen text-white overflow-x-hidden relative">
      {/* Specular Ambient Gradient Blur Orbs */}
      <div className="absolute top-10 left-10 w-[600px] h-[600px] bg-[#39C69C]/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[35%] right-0 w-[650px] h-[650px] bg-[#CDA8E8]/18 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[70%] left-10 w-[550px] h-[550px] bg-[#C9A867]/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="flex py-3 px-6 md:px-20 justify-between items-center glass-navbar w-full z-50 fixed top-0 left-0 right-0">
        <Link href="/" className="flex items-center gap-3 w-fit group cursor-pointer">
          <div className="rounded-lg bg-[#9875C1] w-8 h-8 flex items-center justify-center font-extrabold text-[#050505] text-xs group-hover:scale-105 transition-transform">
            TCF
          </div>
          <p className="text-[#FFF] font-instrumentSerif text-2xl w-fit tracking-tight">
            TCF JOURNAL
          </p>
        </Link>
        <div className="hidden md:flex items-center gap-8 w-fit">
          <Link href="/" className="text-[#FFF] font-inter text-sm font-medium w-fit hover:text-[#CDA8E8] transition-colors">
            {t("nav_home")}
          </Link>
          <Link href="/articles" className="text-[#CDA8E8] font-inter text-sm font-semibold w-fit border-b border-[#CDA8E8]">
            {t("nav_articles")}
          </Link>
          <Link href="/#podcasts-section" className="text-[#D5B0FF] font-inter text-sm font-medium w-fit hover:text-white transition-colors">
            {t("nav_podcasts")}
          </Link>
          <Link href="/#features-section" className="text-[#D5B0FF] font-inter text-sm font-medium w-fit hover:text-white transition-colors">
            {t("nav_features")}
          </Link>
          <Link href="/#features-section" className="text-[#D5B0FF] font-inter text-sm font-medium w-fit hover:text-white transition-colors">
            {t("nav_survivors")}
          </Link>
        </div>

        {/* Functional Search Bar with Action Button */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchExecute();
          }}
          className="flex py-1.5 pl-4 pr-1.5 items-center gap-2 rounded-[20px] border border-[rgba(255,255,255,0.15)] bg-[#0B0B0C] w-full max-w-[320px] focus-within:border-[#CDA8E8] transition-all shadow-md"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 w-4 h-4 overflow-hidden relative"
          >
            <path
              d="M14.0001 14.0001L11.1068 11.1068M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z"
              stroke="#CDA8E8"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setActiveSearchQuery(e.target.value);
            }}
            className="bg-transparent text-white placeholder-[#ACACAC] font-inter text-sm outline-none w-full"
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-zinc-400 hover:text-white px-1 text-xs font-bold cursor-pointer"
              title="Clear search"
            >
              ✕
            </button>
          )}
          <button
            type="submit"
            className="py-1 px-3.5 rounded-full bg-[#CDA8E8] hover:bg-[#39C69C] text-[#050505] font-inter text-xs font-semibold shrink-0 transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Language Toggle Button */}
        <button
          onClick={toggleLang}
          aria-label="Change language"
          title="Change language"
          className="flex items-center justify-center py-2 px-3.5 rounded-[20px] border border-[rgba(255,255,255,0.15)] bg-[#0B0B0C] hover:border-[#CDA8E8] font-inter text-xs font-bold gap-1.5 shrink-0 cursor-pointer transition-all text-white"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span>{lang}</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex pt-24 pb-6 px-6 md:pt-28 md:pb-20 md:px-20 flex-col items-start gap-12 w-full max-w-7xl mx-auto">
        {/* Banner Title */}
        <div ref={headerRef} className="flex flex-col items-center gap-6 w-full text-center">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 py-6 overflow-visible">
            <span className="font-winterSolace text-6xl md:text-[112px] bg-gradient-to-r from-[#C9A867] via-[#CDA8E8] to-[#39C69C] bg-clip-text text-transparent leading-[1.25em] pt-4 pb-2 px-2 inline-block">
              Article
            </span>
            <div className="py-4 md:py-6 px-8 md:px-14 rounded-[999px] bg-[#39C69C] shadow-lg flex items-center justify-center my-2 md:my-0 overflow-visible">
              <span className="text-[#050505] font-winterSolace text-5xl md:text-[90px] leading-[1.15em] font-bold pt-1 pb-1 inline-block">
                Gallery
              </span>
            </div>
            <span className="font-inter text-6xl md:text-[112px] font-bold text-[#F4F1E9] leading-[1.25em] pt-4 inline-block">
              .
            </span>
          </div>
          <p className="text-[#D5B0FF] font-inter text-base md:text-lg max-w-[600px] text-center leading-relaxed">
            A curated look at verified medical updates, structural survivorship
            protocols, and compassionate guides built to support you.
          </p>

          {/* Dedicated Page Search Bar */}
          <div className="w-full max-w-xl mx-auto mt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchExecute();
              }}
              className="flex items-center gap-3 p-2 rounded-full border border-white/20 bg-[#0B0B0C] shadow-[0_10px_30px_rgba(0,0,0,0.5)] focus-within:border-[#CDA8E8] transition-all"
            >
              <div className="flex items-center gap-3 pl-4 flex-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#CDA8E8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Type to search topics, symptoms, guides, authors..."
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setActiveSearchQuery(e.target.value);
                  }}
                  className="bg-transparent text-white placeholder-zinc-400 font-inter text-sm md:text-base outline-none w-full"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="text-zinc-400 hover:text-white px-2 text-sm font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="py-3 px-7 rounded-full bg-gradient-to-r from-[#CDA8E8] to-[#39C69C] hover:brightness-110 text-[#050505] font-inter text-sm font-bold shadow-md transition-all cursor-pointer shrink-0"
              >
                Search Articles
              </button>
            </form>
          </div>
        </div>

        {/* Active Search & Category Status Badge */}
        {(activeSearchQuery || activeCategory !== "All Insights") && (
          <div className="flex items-center gap-3 w-full justify-center md:justify-start pt-2">
            <span className="text-zinc-400 font-inter text-sm">Active Filters:</span>
            {activeCategory !== "All Insights" && (
              <span className="py-1 px-3.5 rounded-full bg-[#CDA8E8]/20 border border-[#CDA8E8]/40 text-[#CDA8E8] font-inter text-xs font-semibold flex items-center gap-2">
                Category: {activeCategory}
                <button onClick={() => setActiveCategory("All Insights")} className="hover:text-white cursor-pointer">
                  ✕
                </button>
              </span>
            )}
            {activeSearchQuery && (
              <span className="py-1 px-3.5 rounded-full bg-[#39C69C]/20 border border-[#39C69C]/40 text-[#39C69C] font-inter text-xs font-semibold flex items-center gap-2">
                Query: "{activeSearchQuery}"
                <button onClick={handleClearSearch} className="hover:text-white cursor-pointer">
                  ✕
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setActiveCategory("All Insights");
                handleClearSearch();
              }}
              className="text-xs text-zinc-400 hover:text-white underline cursor-pointer ml-2"
            >
              Reset all
            </button>
          </div>
        )}

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-3 w-full justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-2.5 px-5 rounded-[99px] font-inter text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#F6C656] text-[#050505] font-semibold shadow-md shadow-[#F6C656]/30 scale-105"
                  : "border border-[rgba(255,255,255,0.10)] bg-[#0B0B0C] text-[#E9CDF8] hover:border-[#F6C656] hover:text-[#F6C656] hover:bg-[#F6C656]/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Study Hero Card (visible when no search query or matches search query) */}
        {!activeSearchQuery && activeCategory === "All Insights" && (
          <div ref={heroCardRef} className="flex flex-col lg:flex-row items-center rounded-3xl border border-[rgba(255,255,255,0.10)] bg-[#0B0B0C] w-full min-h-[480px] overflow-hidden group hover:border-[#F6C656] transition-colors">
            <div className="w-full lg:w-1/2 h-64 lg:h-full relative overflow-hidden shrink-0">
              <img
                src="/Featuredimage.png"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Featured-Image"
              />
            </div>
            <div className="flex p-8 md:p-12 flex-col justify-center items-start gap-6 w-full lg:w-1/2">
              <div className="flex items-center gap-3 w-fit">
                <span className="text-[#F6C656] font-inter text-xs font-bold tracking-wider">
                  FEATURED STUDY
                </span>
                <div className="rounded-full bg-[#ACACAC] w-1.5 h-1.5"></div>
                <span className="text-[#ACACAC] font-inter text-xs font-medium">
                  10 MIN READ
                </span>
              </div>
              <h2 className="text-[#FFF] font-instrumentSerif text-3xl md:text-[40px] leading-[1.2em] w-full group-hover:text-[#F6C656] transition-colors">
                The First 30 Days: A Clinical Roadmap for Carcinoid Diagnosis
              </h2>
              <p className="text-[#D5B0FF] font-inter text-sm md:text-[15px] leading-[1.6em] w-full">
                Unpacking the emotional and medical milestones that define the
                immediate aftermath of a cancer diagnosis. Learn how oncology
                networks collaborate to construct your personalized care plan.
              </p>
              <div className="flex items-center gap-3 w-full pt-2">
                <img
                  src="/Rectangle.png"
                  className="rounded-[20px] w-10 h-10 object-cover border border-white/10"
                  alt="Dr. Helen Sterling"
                />
                <div className="flex flex-col items-start gap-0.5 w-fit">
                  <span className="text-[#FFF] font-inter text-sm font-semibold">
                    Dr. Helen Sterling
                  </span>
                  <span className="text-[#ACACAC] font-inter text-xs">
                    Oncology Advisory Board
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid & Empty Search Results State */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredArticles.map((art) => (
              <Link
                key={art.id}
                href={`/articles/${art.id}`}
                className="flex p-6 flex-col items-start gap-4 rounded-3xl border border-[rgba(255,255,255,0.10)] bg-[#0B0B0C] w-full transition-all duration-400 group hover:border-[#F6C656] hover:shadow-[0_15px_35px_rgba(246,198,86,0.25)] hover:-translate-y-1.5 cursor-pointer"
              >
                <div className="w-full h-[220px] rounded-2xl overflow-hidden relative">
                  <img
                    src={art.cover}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={art.title}
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-[#F6C656] font-inter text-xs font-semibold tracking-wider">
                    {art.tag}
                  </span>
                  <span className="text-[#ACACAC] font-inter text-xs">
                    {art.readTime}
                  </span>
                </div>
                <h3 className="line-clamp-2 overflow-hidden text-[#FFF] font-instrumentSerif text-2xl leading-[1.3em] w-full group-hover:text-[#F6C656] transition-colors">
                  {art.title}
                </h3>
                <p className="line-clamp-3 overflow-hidden text-[#D5B0FF] font-inter text-sm leading-relaxed w-full">
                  {art.desc}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex p-12 flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-[#0B0B0C] w-full text-center py-16">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl">
              🔍
            </div>
            <h3 className="text-[#FFF] font-instrumentSerif text-2xl font-bold">
              No articles found matching "{activeSearchQuery || searchInput}"
            </h3>
            <p className="text-[#D5B0FF] font-inter text-sm max-w-md">
              Try refining your search terms or select a different category from above.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All Insights");
                handleClearSearch();
              }}
              className="mt-2 py-2.5 px-6 rounded-full bg-[#CDA8E8] text-[#050505] font-inter text-sm font-semibold hover:bg-[#39C69C] transition-colors cursor-pointer"
            >
              Reset Search & View All
            </button>
          </div>
        )}

        {/* Newsletter Box */}
        <div className="flex p-8 md:p-16 flex-col items-center gap-8 rounded-[32px] border border-[rgba(255,255,255,0.10)] bg-[#0B0B0C] w-full text-center">
          <div className="flex flex-col items-center gap-3 w-full">
            <h3 className="text-[#FFF] font-instrumentSerif text-3xl md:text-4xl">
              Clinical clarity delivered to your inbox
            </h3>
            <p className="text-[#D5B0FF] font-inter text-sm md:text-base max-w-[580px]">
              Stay connected with verified clinical insights, caregiver support
              strategies, and inspiring survivor stories.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-[500px]">
            <div className="flex py-3.5 px-5 items-center rounded-xl border border-[rgba(255,255,255,0.10)] bg-[#050505] w-full">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-transparent text-white placeholder-[#ACACAC] font-inter text-sm outline-none w-full"
              />
            </div>
            <button className="flex py-3.5 px-6 justify-center items-center rounded-xl bg-[#39C69C] hover:bg-[#2fb18a] transition-colors w-full sm:w-fit shrink-0 cursor-pointer">
              <span className="text-[#050505] font-inter text-sm font-semibold">
                Subscribe
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex pt-16 md:pt-20 pr-6 md:pr-20 pb-10 pl-6 md:pl-20 flex-col items-start gap-16 border-t border-t-[rgba(255,255,255,0.10)] bg-[#050505] w-full mt-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 w-full max-w-7xl mx-auto">
          <div className="flex flex-col items-start gap-4 max-w-[360px]">
            <div className="flex items-center gap-3 w-fit">
              <div className="rounded-lg bg-[#CDA8E8] w-8 h-8 flex items-center justify-center font-bold text-[#050505] text-xs">
                TCF
              </div>
              <span className="text-[#FFF] font-instrumentSerif text-2xl">
                TCF JOURNAL
              </span>
            </div>
            <p className="text-[#D5B0FF] font-inter text-sm leading-[1.6em]">
              We specialize in providing understandable carcinoid guidance,
              clinical pathway demystification, and trusted oncology networks.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-12 md:gap-20 w-fit">
            <div className="flex flex-col items-start gap-4 w-fit">
              <span className="text-[#CDA8E8] font-inter text-xs font-bold tracking-wider">
                RESOURCES
              </span>
              <Link href="/#features-section" className="text-[#D5B0FF] hover:text-white font-inter text-sm transition-colors">
                Diagnosis Nav
              </Link>
              <Link href="/#features-section" className="text-[#D5B0FF] hover:text-white font-inter text-sm transition-colors">
                Expert Directory
              </Link>
              <Link href="/#podcasts-section" className="text-[#D5B0FF] hover:text-white font-inter text-sm transition-colors">
                Podcast Archive
              </Link>
            </div>
            <div className="flex flex-col items-start gap-4 w-fit">
              <span className="text-[#CDA8E8] font-inter text-xs font-bold tracking-wider">
                FOUNDATION
              </span>
              <Link href="/" className="text-[#D5B0FF] hover:text-white font-inter text-sm transition-colors">
                Our Mission
              </Link>
              <Link href="/articles" className="text-[#D5B0FF] hover:text-white font-inter text-sm transition-colors">
                Writing Team
              </Link>
              <Link href="/" className="text-[#D5B0FF] hover:text-white font-inter text-sm transition-colors">
                Annual Report
              </Link>
            </div>
            <div className="flex flex-col items-start gap-4 w-fit">
              <span className="text-[#CDA8E8] font-inter text-xs font-bold tracking-wider">
                LEGAL
              </span>
              <span className="text-[#D5B0FF] font-inter text-sm">
                Clinical Disclaimer
              </span>
              <span className="text-[#D5B0FF] font-inter text-sm">
                Privacy Policy
              </span>
              <span className="text-[#D5B0FF] font-inter text-sm">
                Terms of Use
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 w-full max-w-7xl mx-auto pt-6 border-t border-white/5">
          <p className="text-[#ACACAC] font-inter text-sm text-center sm:text-left">
            © 2026 The Carcino Foundation. All clinical content verified by
            our advisory board.
          </p>
          <div className="flex items-center gap-4 w-fit">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.8694 8.13075C15.9317 7.19303 14.6598 6.66623 13.3336 6.66623C12.0074 6.66623 10.7356 7.19303 9.7978 8.13075C8.86004 9.06848 8.33322 10.3403 8.33322 11.6664V17.5H11.6668V11.6664C11.6668 11.2244 11.8424 10.8005 12.155 10.4879C12.4676 10.1753 12.8916 9.9997 13.3336 9.9997C13.7757 9.9997 14.1996 10.1753 14.5122 10.4879C14.8248 10.8005 15.0004 11.2244 15.0004 11.6664V17.5H18.334V11.6664C18.334 10.3403 17.8072 9.06848 16.8694 8.13075Z" stroke="#ACACAC" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_201_779_footer)">
                  <path d="M16.6672 6.16616C17.7506 5.08278 18.334 3.3327 18.334 3.3327C18.334 3.3327 16.7506 4.33275 15.8338 4.33275C13.3336 1.99931 9.24996 3.9994 10 7.49956C7.16646 7.5829 4.3329 6.33284 2.49942 4.16607C0.415916 7.99958 2.49942 12.9165 6.66642 14.1665C5.33298 15.3333 3.4995 15.9166 1.66602 15.8333C8.83326 20.5835 18.0007 14.4999 16.6672 6.16616Z" stroke="#ACACAC" strokeWidth="2" strokeLinecap="round" />
                </g>
                <defs>
                  <clipPath id="clip0_201_779_footer">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
