"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { articlesList, ArticleItem } from "@/data/articlesData";
import { useAuth } from "@/context/AuthContext";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.id;
  const numericId = parseInt(rawId, 10);

  const { isArticleRead, markArticleAsRead, user } = useAuth();
  const [sanityArticle, setSanityArticle] = useState<ArticleItem | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [claps, setClaps] = useState(64);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    async function fetchSanityArticle() {
      try {
        const doc = await client.fetch(
          `*[_type == "article" && (_id == $id || slug.current == $id)][0]`,
          { id: rawId },
          { useCdn: false }
        );
        if (doc) {
          const extractedContent =
            doc.content && Array.isArray(doc.content) && doc.content.length > 0
              ? doc.content
                  .map((block: any) =>
                    typeof block === "string"
                      ? block
                      : block.children?.map((c: any) => c.text).join("") || ""
                  )
                  .filter(Boolean)
              : doc.desc
              ? doc.desc.split("\n\n").filter(Boolean)
              : [doc.title];

          setSanityArticle({
            id: doc._id,
            category: doc.category || "CLINICAL CARE",
            tag: doc.category || "CLINICAL CARE",
            title: doc.title,
            readTime: doc.readTime
              ? (doc.readTime.includes("min") ? doc.readTime : `${doc.readTime} min read`)
              : "5 min read",
            date: doc.date || "Sep 23, 2026",
            desc: doc.desc || "",
            author: doc.author || "Suditi Saha | Researcher",
            cover: doc.mainImage?.asset?.url || "/Cover.png",
            content: extractedContent,
          });
        }
      } catch (err) {
        console.error("Failed to fetch article from Sanity:", err);
      }
    }
    fetchSanityArticle();
  }, [rawId]);

  // Find local article match by id string, numeric id, or matching slug
  const localMatch = articlesList.find(
    (item) => item.id === rawId || (item.numericId && item.numericId === numericId)
  );
  const fallbackArticle = localMatch || articlesList[0];

  // Merge Sanity metadata with structured sections, FAQs, and citations
  const article: ArticleItem = {
    ...fallbackArticle,
    ...(sanityArticle || {}),
    sections: (sanityArticle?.sections && sanityArticle.sections.length > 0)
      ? sanityArticle.sections
      : fallbackArticle?.sections,
    faqs: (sanityArticle?.faqs && sanityArticle.faqs.length > 0)
      ? sanityArticle.faqs
      : fallbackArticle?.faqs,
    citations: (sanityArticle?.citations && sanityArticle.citations.length > 0)
      ? sanityArticle.citations
      : fallbackArticle?.citations,
    content: (sanityArticle?.content && sanityArticle.content.length > 0 && sanityArticle.content[0] !== sanityArticle.title)
      ? sanityArticle.content
      : fallbackArticle?.content,
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#181122] via-[#241A30] to-[#140D1D] text-[#F8F8F8] relative overflow-hidden flex flex-col">
      {/* Specular Ambient Glow Orbs */}
      <div className="absolute top-[8%] left-[20%] w-[600px] h-[600px] bg-[#C27AFF]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[550px] h-[550px] bg-[#39C69C]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[15%] w-[500px] h-[500px] bg-[#F6C656]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Fixed Top Navbar */}
      <header className="w-full py-3 px-6 md:px-16 flex items-center justify-between z-50 fixed top-0 left-0 right-0 glass-navbar">
        <Link
          href="/articles"
          className="flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Articles
        </Link>
        <span className="font-winterSolace text-lg font-bold text-[#CDA8E8]">
          The Carcino Foundation
        </span>
      </header>

      {/* SINGLE UNIFIED CONTINUOUS ARTICLE CONTAINER */}
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-16 md:pt-28 md:pb-24 flex-1 z-10 w-full">
        {/* Article Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="py-1 px-4 rounded-full bg-[#CDA8E8]/20 text-[#CDA8E8] text-xs font-semibold font-inter border border-[#CDA8E8]/30">
              {article.tag}
            </span>
            <span className="text-xs text-zinc-400 font-medium">
              {article.readTime}
            </span>
            <span className="text-xs text-zinc-500">•</span>
            <span className="text-xs text-zinc-400 font-medium">
              {article.date}
            </span>
          </div>

          <button
            onClick={() => markArticleAsRead(String(article.id), article.title)}
            className={`py-1.5 px-4 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isArticleRead(String(article.id))
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-white/25"
            }`}
          >
            {isArticleRead(String(article.id)) ? "Marked as Read ✓" : "Mark as Read"}
          </button>
        </div>

        {/* Title */}
        <h1 className="font-winterSolace text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.2] mb-6 tracking-tight bg-gradient-to-r from-white via-[#E9CDF8] to-[#CDA8E8] bg-clip-text text-transparent">
          {article.title}
        </h1>

        {/* Author Byline & Follow */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#CDA8E8] to-[#39C69C] flex items-center justify-center font-bold text-black text-base shrink-0 shadow-md">
              {article.author.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-base font-bold text-white font-inter">{article.author}</p>
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
              <p className="text-xs text-zinc-400 font-inter">Carcino Research &amp; Clinical Advisory</p>
            </div>
          </div>

          {/* Medium-style Social Action Bar */}
          <div className="flex items-center gap-4 text-xs font-inter">
            <button
              onClick={() => setClaps((c) => c + 1)}
              title="Clap for article"
              className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 font-bold transition-all cursor-pointer active:scale-95"
            >
              <span className="text-base">👏</span>
              <span>{claps}</span>
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              title="Bookmark story"
              className={`p-2 rounded-full transition-all cursor-pointer ${
                isBookmarked ? "text-emerald-400 bg-emerald-500/20" : "text-zinc-400 hover:text-white"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>

            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              title="Listen to audio"
              className={`p-2 rounded-full transition-all cursor-pointer ${
                isPlayingAudio ? "text-purple-400 bg-purple-500/20" : "text-zinc-400 hover:text-white"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </button>

            <button
              onClick={handleShare}
              title="Share link"
              className="p-2 rounded-full text-zinc-400 hover:text-white transition-all cursor-pointer relative"
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

        {/* Lead Quote Summary (Continuous Blockquote) */}
        {article.desc && (
          <blockquote className="border-l-4 border-[#CDA8E8] pl-6 py-2 my-8 text-xl md:text-2xl font-serif text-[#E9CDF8]/90 italic leading-relaxed">
            "{article.desc}"
          </blockquote>
        )}

        {/* CONTINUOUS EDITORIAL PROSE DOCUMENT STREAM */}
        <article className="flex flex-col gap-6 text-lg md:text-xl leading-[1.85] font-sans text-zinc-200 selection:bg-[#CDA8E8]/30">
          {/* Main content paragraphs */}
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="font-normal text-zinc-200">
              {paragraph}
            </p>
          ))}

          {/* Continuous Section Headings and Content */}
          {article.sections && article.sections.length > 0 && (
            <div className="flex flex-col gap-10 mt-6 pt-6">
              {article.sections.map((section, sIdx) => (
                <section key={sIdx} className="flex flex-col gap-4">
                  <h2 className="font-winterSolace text-2xl md:text-4xl font-bold text-white tracking-tight pb-3 border-b border-white/10 mt-4">
                    {section.heading}
                  </h2>
                  <div className="flex flex-col gap-4 text-base md:text-lg text-zinc-300 leading-relaxed">
                    {section.content.map((p, pIdx) => (
                      <p key={pIdx} className="text-zinc-200">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </article>

        {/* FAQs Section */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="mt-16 pt-10 border-t border-white/15">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-winterSolace">
              Frequently Asked Questions (FAQs)
            </h3>
            <div className="flex flex-col gap-4">
              {article.faqs.map((faq, fIdx) => {
                const isOpen = openFaq === fIdx;
                return (
                  <div key={fIdx} className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                      className="py-4 px-6 flex items-center justify-between w-full text-left font-medium text-white hover:text-[#CDA8E8] transition-colors cursor-pointer text-base md:text-lg"
                    >
                      <span>{faq.question}</span>
                      <span className="text-2xl font-bold ml-2 text-[#CDA8E8]">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-zinc-300 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Citations & Medical References Footnote */}
        {article.citations && article.citations.length > 0 && (
          <section className="mt-16 pt-8 border-t border-white/15">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#CDA8E8] mb-4 font-inter">
              Citations &amp; Medical References
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-zinc-400 font-inter">
              {article.citations.map((cite, cIdx) => (
                <li key={cIdx}>
                  <a
                    href={cite.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5 underline decoration-[#CDA8E8]/40"
                  >
                    <span>• {cite.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Footer Editorial Action Bar */}
        <div className="mt-14 pt-8 border-t border-white/15 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setClaps((c) => c + 1)}
              className="flex items-center gap-2 py-2.5 px-5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 font-bold text-sm transition-all cursor-pointer active:scale-95"
            >
              <span>👏 Clap for this article</span>
              <span className="bg-amber-500/20 py-0.5 px-2.5 rounded-full text-xs">
                {claps}
              </span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => markArticleAsRead(String(article.id), article.title)}
              className={`py-2.5 px-5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isArticleRead(String(article.id))
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
              }`}
            >
              {isArticleRead(String(article.id)) ? "Marked as Read ✓" : "Mark as Read"}
            </button>

            <Link
              href="/articles"
              className="py-2.5 px-6 rounded-full bg-gradient-to-r from-[#F6C656] to-[#D4AF37] text-[#0B0B0C] font-inter text-xs font-bold hover:brightness-110 transition-all shadow-md"
            >
              Explore More Articles ↗
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
