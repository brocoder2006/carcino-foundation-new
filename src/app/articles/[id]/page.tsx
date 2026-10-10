"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { fetchDjangoPostBySlug } from "@/lib/djangoApi";
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
    async function fetchCarcinoCmsArticle() {

      try {
        const doc = await fetchDjangoPostBySlug(rawId);
        if (doc) {
          let extractedContent: string[] = [];
          if (typeof doc.content === "string") {
            extractedContent = [doc.content];
          } else if (doc.content?.content && Array.isArray(doc.content.content)) {
            extractedContent = doc.content.content.map((block: any) => {
              if (block.content && Array.isArray(block.content)) {
                return block.content.map((child: any) => child.text || "").join("");
              }
              return block.text || "";
            }).filter(Boolean);
          } else if (doc.excerpt) {
            extractedContent = [doc.excerpt];
          } else {
            extractedContent = [doc.title];
          }

          setSanityArticle({
            id: doc.slug || doc.id,
            category: doc.category?.name || "CLINICAL CARE",
            tag: doc.category?.name || "CLINICAL CARE",
            title: doc.title,
            readTime: doc.read_time || "5 min read",
            date: doc.publication_date
              ? new Date(doc.publication_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Oct 10, 2026",
            desc: doc.excerpt || "",
            author: doc.author?.username || "Carcino Research Team",
            cover: doc.cover_image || "/Cover.png",
            content: extractedContent,
          });
        }
      } catch (err) {
        console.error("Failed to fetch article from Django API:", err);
      }
    }
    fetchCarcinoCmsArticle();
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
        <div className="flex items-center gap-3 mb-6">
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

        {/* Title */}
        <h1 className="font-horizon text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.2] mb-6 tracking-tight bg-gradient-to-r from-white via-[#E9CDF8] to-[#CDA8E8] bg-clip-text text-transparent">
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
                  className={`py-0.5 px-3 rounded-full text-xs font-semibold font-inter transition-all cursor-pointer ${isFollowing
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
        </div>

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
                  <h2 className="font-horizon text-2xl md:text-3xl font-bold text-white tracking-tight pb-3 border-b border-white/10 mt-4">
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
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-horizon">
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
        <div className="mt-14 pt-8 border-t border-white/15 flex items-center justify-center">
          <Link
            href="/articles"
            className="py-3 px-8 rounded-full bg-gradient-to-r from-[#F6C656] to-[#D4AF37] text-[#0B0B0C] font-inter text-sm font-bold hover:brightness-110 transition-all shadow-md"
          >
            Explore More Articles ↗
          </Link>
        </div>
      </main>
    </div>
  );
}
