"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { client } from "@/sanity/lib/client";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import EditorialMenuPopover from "@/components/EditorialMenuPopover";
import PartnershipModal from "@/components/PartnershipModal";
import VolunteerModal from "@/components/VolunteerModal";
import GetInvolvedDropdown from "@/components/GetInvolvedDropdown";
import { articlesList } from "@/data/articlesData";

export default function ArticlesGalleryPage() {
  const { lang, toggleLang, t } = useLanguage();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All Insights");
  const [sanityArticles, setSanityArticles] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

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
            id: doc.slug?.current || doc._id,
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
              duration: 0.3,
              ease: "power2.out",
            });
          };

          card.addEventListener("mousemove", handleMouseMove);
          card.addEventListener("mouseleave", handleMouseLeave);
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const getKeys = (art: { id?: string; title?: string }) => {
    const rawId = (art.id || "").toLowerCase().trim();
    const rawTitle = (art.title || "").toLowerCase().trim();
    const cleanId = rawId.replace(/[^a-z0-9]/g, "");
    const cleanTitle = rawTitle.replace(/[^a-z0-9]/g, "");
    const topicSlug = rawId.split("-")[0] || "";
    return [rawId, rawTitle, cleanId, cleanTitle, topicSlug].filter(Boolean);
  };

  const seenKeys = new Set<string>();
  const allArticlesList: typeof defaultArticles = [];

  const addUnique = (art: (typeof defaultArticles)[0]) => {
    const keys = getKeys(art);
    const isDuplicate = keys.some((k) => seenKeys.has(k));
    if (!isDuplicate) {
      keys.forEach((k) => seenKeys.add(k));
      allArticlesList.push(art);
    }
  };

  sanityArticles.forEach(addUnique);
  defaultArticles.forEach(addUnique);

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

  const getCategoryStyle = (cat: string) => {
    const c = (cat || "").toLowerCase();
    if (c.includes("medical") || c.includes("clinical")) {
      return {
        glow: "hover:border-[#CDA8E8] hover:shadow-[0_0_50px_rgba(194,122,255,0.55)] group-hover:from-[#26133B] group-hover:to-[#0B0B0C]",
        tagColor: "text-[#CDA8E8]",
        badgeBg: "bg-[#CDA8E8]/15 border-[#CDA8E8]/30 text-[#CDA8E8]",
        titleHover: "group-hover:text-[#CDA8E8]",
        isMedical: true,
      };
    }
    if (c.includes("patient") || c.includes("survivor story") || c.includes("voices")) {
      return {
        glow: "hover:border-[#F6C656] hover:shadow-[0_0_50px_rgba(246,198,86,0.5)] group-hover:from-[#2A1D0B] group-hover:to-[#0B0B0C]",
        tagColor: "text-[#F6C656]",
        badgeBg: "bg-[#F6C656]/15 border-[#F6C656]/30 text-[#F6C656]",
        titleHover: "group-hover:text-[#F6C656]",
        isMedical: false,
      };
    }
    if (c.includes("care")) {
      return {
        glow: "hover:border-[#39C69C] hover:shadow-[0_0_50px_rgba(57,198,156,0.5)] group-hover:from-[#0B2A22] group-hover:to-[#0B0B0C]",
        tagColor: "text-[#39C69C]",
        badgeBg: "bg-[#39C69C]/15 border-[#39C69C]/30 text-[#39C69C]",
        titleHover: "group-hover:text-[#39C69C]",
        isMedical: false,
      };
    }
    if (c.includes("tech") || c.includes("wellness") || c.includes("treatment")) {
      return {
        glow: "hover:border-[#F43F5E] hover:shadow-[0_0_50px_rgba(244,63,94,0.5)] group-hover:from-[#2F0F1B] group-hover:to-[#0B0B0C]",
        tagColor: "text-[#F43F5E]",
        badgeBg: "bg-[#F43F5E]/15 border-[#F43F5E]/30 text-[#F43F5E]",
        titleHover: "group-hover:text-[#F43F5E]",
        isMedical: false,
      };
    }
    return {
      glow: "hover:border-[#38BDF8] hover:shadow-[0_0_50px_rgba(56,189,248,0.5)] group-hover:from-[#0A2234] group-hover:to-[#0B0B0C]",
      tagColor: "text-[#38BDF8]",
      badgeBg: "bg-[#38BDF8]/15 border-[#38BDF8]/30 text-[#38BDF8]",
      titleHover: "group-hover:text-[#38BDF8]",
      isMedical: false,
    };
  };

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
          <p className="text-[#FFF] font-winterSolace text-xl w-fit tracking-tight">
            The Carcino Foundation
          </p>
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-8 w-fit">
            <Link href="/" className="text-[#FFF] font-inter text-sm font-medium w-fit hover:text-[#CDA8E8] transition-colors">
              {t("nav_home")}
            </Link>
            <Link href="/articles" className="text-[#CDA8E8] font-inter text-sm font-semibold w-fit border-b border-[#CDA8E8]">
              {t("nav_articles")}
            </Link>
            <Link href="/blogs" className="text-[#D5B0FF] font-inter text-sm font-medium w-fit hover:text-white transition-colors">
              Perspective &amp; Blogs
            </Link>
          </div>
          <GetInvolvedDropdown
            user={user}
            onOpenAuth={() => setIsPartnershipModalOpen(true)}
            onOpenVolunteer={() => setIsVolunteerModalOpen(true)}
            onOpenPartnership={() => setIsPartnershipModalOpen(true)}
            onSignOut={() => setIsPartnershipModalOpen(true)}
            align="right"
          />
        </div>


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
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 py-6 overflow-visible flex-wrap">
            <span className="font-winterSolace text-3xl sm:text-5xl md:text-6xl lg:text-[76px] bg-gradient-to-r from-[#C9A867] via-[#CDA8E8] to-[#39C69C] bg-clip-text text-transparent leading-[1.15em] pt-2 pb-2 px-2 inline-block">
              Cancer Knowledge
            </span>
            <div className="py-2.5 md:py-4 px-6 md:px-10 rounded-[999px] bg-[#39C69C] shadow-lg flex items-center justify-center my-2 md:my-0 overflow-visible">
              <span className="text-[#050505] font-winterSolace text-2xl sm:text-4xl md:text-5xl lg:text-[64px] leading-[1.1em] font-bold pt-1 pb-1 inline-block">
                Hub
              </span>
            </div>
            <span className="font-inter text-3xl sm:text-5xl md:text-6xl lg:text-[76px] font-bold text-[#F4F1E9] leading-[1.15em] pt-2 inline-block">
              .
            </span>
          </div>
          <p className="text-[#D5B0FF] font-inter text-base md:text-lg max-w-[650px] text-center leading-relaxed">
            Clear, accessible reads that break down cancer, science, and the questions that matter. We turn complex information into something everyone can understand, engage with, and learn from.
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
              className={`py-2.5 px-5 rounded-[99px] font-inter text-sm font-medium transition-all duration-300 cursor-pointer ${activeCategory === cat
                ? "bg-[#F6C656] text-[#050505] font-semibold shadow-md shadow-[#F6C656]/30 scale-105"
                : "border border-[rgba(255,255,255,0.10)] bg-[#0B0B0C] text-[#E9CDF8] hover:border-[#F6C656] hover:text-[#F6C656] hover:bg-[#F6C656]/10"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>



        {/* Article Grid & Empty Search Results State */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredArticles.map((art) => {
              const catStyle = getCategoryStyle(art.category || art.tag);
              return (
                <Link
                  key={art.id}
                  href={`/articles/${art.id}`}
                  className={`flex p-8 flex-col justify-between items-start gap-4 rounded-3xl border border-[rgba(255,255,255,0.10)] bg-gradient-to-b from-[#0B0B0C] to-[#0B0B0C] w-full min-h-[260px] transition-all duration-400 group hover:-translate-y-1.5 cursor-pointer ${catStyle.glow}`}
                >
                  <div className="flex justify-between items-center w-full">
                    {!catStyle.isMedical ? (
                      <span className={`py-1 px-3.5 rounded-full font-inter text-xs font-semibold tracking-wider ${catStyle.badgeBg}`}>
                        {art.tag}
                      </span>
                    ) : (
                      <span className="text-xs text-purple-400/80 font-mono font-medium tracking-wide">
                        ● PURPLE INSIGHT
                      </span>
                    )}
                    <span className="text-[#ACACAC] font-inter text-xs">
                      {art.readTime}
                    </span>
                  </div>
                  <h3 className={`line-clamp-2 overflow-hidden text-[#FFF] font-instrumentSerif text-2xl leading-[1.3em] w-full transition-colors ${catStyle.titleHover}`}>
                    {art.title}
                  </h3>
                  <p className="line-clamp-3 overflow-hidden text-[#D5B0FF] font-inter text-sm leading-relaxed w-full">
                    {art.desc}
                  </p>
                </Link>
              );
            })}
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
              <span className="text-[#FFF] font-winterSolace text-xl tracking-tight">
                The Carcino Foundation
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
          <div className="flex items-center gap-3 w-fit">
            {/* X (Twitter) */}
            <a
              href="https://x.com/carcinoofficial?s=20"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              title="X (Twitter)"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D5B0FF] hover:text-[#050505] text-[#D5B0FF] transition-all duration-300 hover:scale-110"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/thecarcinofoundation/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D5B0FF] hover:text-[#050505] text-[#D5B0FF] transition-all duration-300 hover:scale-110"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/thecarcinofoundation/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D5B0FF] hover:text-[#050505] text-[#D5B0FF] transition-all duration-300 hover:scale-110"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H3.67V10.9h2.79M5.07 6.56a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
              </svg>
            </a>
            {/* Medium */}
            <a
              href="https://medium.com/@thecarcinofoundation"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium"
              title="Medium"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D5B0FF] hover:text-[#050505] text-[#D5B0FF] transition-all duration-300 hover:scale-110"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@carcinofoundation"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              title="YouTube"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D5B0FF] hover:text-[#050505] text-[#D5B0FF] transition-all duration-300 hover:scale-110"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Modals for Partnerships and Volunteering */}
      <PartnershipModal
        isOpen={isPartnershipModalOpen}
        onClose={() => setIsPartnershipModalOpen(false)}
      />
      <VolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />
    </div>
  );
}
