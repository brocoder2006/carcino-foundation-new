"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const { isArticleRead, markArticleAsRead, setIsAuthModalOpen, user } = useAuth();
  const [sanityArticle, setSanityArticle] = useState<ArticleItem | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  // Find local article match by id string or numeric id
  const localMatch = articlesList.find(
    (item) => item.id === rawId || (item.numericId && item.numericId === numericId)
  );
  const fallbackArticle = localMatch || articlesList[0];
  const article = sanityArticle || fallbackArticle;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1727] via-[#30253C] to-[#160E21] text-[#F8F8F8] relative overflow-hidden flex flex-col">
      {/* Specular Background Refraction Orbs */}
      <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-[#C27AFF]/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-[45%] right-[10%] w-[550px] h-[550px] bg-[#39C69C]/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[15%] w-[500px] h-[500px] bg-[#9DAE8B]/12 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Header Navigation */}
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
        <span className="font-winterSolace text-lg font-bold text-[#9875C1]">
          Carcino Editorial
        </span>
      </header>

      {/* Main Article Content */}
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-12 md:pt-28 md:pb-20 flex-1 z-10 w-full">
        {/* Category & Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="py-1 px-4 rounded-full bg-[#9DAE8B]/20 text-[#9DAE8B] text-xs font-semibold font-inter">
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
        <h1 className="font-winterSolace text-3xl md:text-5xl font-bold leading-tight mb-6 headline-textured">
          {article.title}
        </h1>

        {/* Author Bylines */}
        <div className="flex items-center gap-3 pb-8 mb-8 border-b border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C27AFF] to-[#9DAE8B] flex items-center justify-center font-bold text-black text-sm shrink-0">
            {article.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{article.author}</p>
            <p className="text-xs text-zinc-400">Carcino Research & Clinical Advisory</p>
          </div>
        </div>

        {/* Article Overview / Summary Box */}
        {article.desc && (
          <div className="bg-[#1C1C1E]/80 backdrop-blur-xl border border-purple-500/20 p-6 rounded-2xl mb-10 text-gray-300 italic text-base leading-relaxed">
            "{article.desc}"
          </div>
        )}

        {/* Render Structured Sections if available */}
        {article.sections && article.sections.length > 0 ? (
          <div className="space-y-10">
            {article.sections.map((section, sIdx) => (
              <div key={sIdx} className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4 font-winterSolace border-b border-white/10 pb-3">
                  {section.heading}
                </h2>
                <div className="space-y-3 text-gray-300 leading-relaxed text-base">
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className="text-gray-300">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Standard Paragraph Output */
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-zinc-200 font-inter">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Render FAQs if present */}
        {article.faqs && article.faqs.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 font-winterSolace">
              Frequently Asked Questions (FAQs)
            </h3>
            <div className="space-y-4">
              {article.faqs.map((faq, fIdx) => {
                const isOpen = openFaq === fIdx;
                return (
                  <div key={fIdx} className="border border-white/10 rounded-xl bg-white/5 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                      className="py-4 px-6 flex items-center justify-between w-full text-left font-medium text-white hover:text-purple-300 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <span className="text-xl font-bold ml-2">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-gray-300 text-sm leading-relaxed border-t border-white/5 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Render Citations & Medical Sources */}
        {article.citations && article.citations.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/10">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-purple-300 mb-4">
              Citations & Medical References
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-400">
              {article.citations.map((cite, cIdx) => (
                <li key={cIdx}>
                  <a
                    href={cite.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5 underline decoration-purple-500/40"
                  >
                    <span>• {cite.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/articles"
            className="flex py-3 px-6 rounded-full glass-btn-primary text-sm font-bold text-white"
          >
            Explore More Articles
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => markArticleAsRead(String(article.id), article.title)}
              className={`py-3 px-6 rounded-full text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isArticleRead(String(article.id))
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
              }`}
            >
              {isArticleRead(String(article.id)) ? "Marked as Read ✓" : "Mark as Read"}
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: article.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Article link copied to clipboard!");
                }
              }}
              className="flex py-3 px-6 rounded-full glass-btn-secondary text-sm font-semibold text-white cursor-pointer"
            >
              Share Article
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
