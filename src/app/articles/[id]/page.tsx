"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { client } from "@/sanity/lib/client";

interface ArticleData {
  id: string | number;
  category: string;
  tag: string;
  title: string;
  readTime: string;
  date: string;
  desc: string;
  author: string;
  content: string[];
}

const articlesDatabase: Record<number, ArticleData> = {
  1: {
    id: 1,
    category: "Medical Insights",
    tag: "Medical Insights",
    title: "Understanding Carcinoma Types & Early Detection",
    readTime: "5 min read",
    date: "Sep 20, 2026",
    desc: "A beginner-friendly breakdown of different carcinoma classifications, symptoms, and key screening protocols.",
    author: "Dr. Sarah Jenkins",
    content: [
      "Carcinoma is the most common type of cancer, originating in the epithelial cells that line the inner and outer surfaces of the body. Understanding its early warning signs is vital for effective intervention.",
      "Primary classifications include Adenocarcinoma (developing in glandular tissue), Squamous Cell Carcinoma (forming in flat epithelial cells), and Basal Cell Carcinoma (typically affecting the skin layer).",
      "Early detection protocols prioritize routine screenings, biomarker blood tests, high-resolution imaging, and genetic counseling for individuals with family histories.",
      "Carcino Foundation works alongside clinical care teams to ensure diagnostic data is demystified and accessible for patients at every step.",
    ],
  },
  2: {
    id: 2,
    category: "Survivor Stories",
    tag: "Survivor Stories",
    title: "Navigating Diagnosis With Mental Resilience",
    readTime: "7 min read",
    date: "Sep 18, 2026",
    desc: "Practical strategies for patients and families to manage anxiety, grief, and build community strength.",
    author: "Elena Rostova",
    content: [
      "Receiving a diagnosis often brings an overwhelming flood of emotions. Building a supportive mental health framework is just as critical as medical treatment.",
      "Practicing structured mindfulness, joining peer survivor groups, and maintaining open dialogue with loved ones fosters resilience during treatment phases.",
      "Remember that seeking mental health support is a sign of strength. Carcino Foundation offers dedicated emotional wellness toolkits and local support connections.",
    ],
  },
  3: {
    id: 3,
    category: "Caregiver Guide",
    tag: "Caregiver Guide",
    title: "How Care Teams & Local Foundations Collaborate",
    readTime: "4 min read",
    date: "Sep 15, 2026",
    desc: "Exploring how Carcino Foundation connects patients with local care teams for seamless support.",
    author: "Marcus Vance",
    content: [
      "Navigating medical appointments, prescription schedules, and emotional care requires a coordinated network.",
      "Carcino Foundation acts as a bridge between specialized hospital care teams and local community support groups, streamlining resource delivery.",
      "Caregivers can leverage our integrated checklists, appointment planners, and emergency helpline network.",
    ],
  },
  4: {
    id: 4,
    category: "Medical Insights",
    tag: "Medical Insights",
    title: "Immunotherapy Breakthroughs in 2026: What You Need to Know",
    readTime: "6 min read",
    date: "Sep 12, 2026",
    desc: "An accessible guide to targeted T-cell therapies, modern clinical trials, and personalized oncology.",
    author: "Dr. Aris Thorne",
    content: [
      "Modern immunotherapy harnesses the body's natural defense mechanisms to pinpoint and neutralize cancer cells with minimal damage to healthy tissue.",
      "Recent breakthroughs in CAR-T cell engineering and mRNA cancer vaccines offer promising avenues for targeted treatment plans.",
    ],
  },
  5: {
    id: 5,
    category: "Wellness & Recovery",
    tag: "Wellness & Recovery",
    title: "Nutrition & Integrative Care During Treatment",
    readTime: "8 min read",
    date: "Sep 10, 2026",
    desc: "Evidence-backed dietary strategies, hydration practices, and holistic wellness rituals during chemo.",
    author: "Sophia Lin, RD",
    content: [
      "Optimal nutrition maintains strength and reduces treatment side effects during chemotherapy and radiation.",
      "Focusing on anti-inflammatory whole foods, proper electrolyte balance, and gentle physical activity supports recovery.",
    ],
  },
  6: {
    id: 6,
    category: "Survivor Stories",
    tag: "Survivor Stories",
    title: "Life Beyond Remission: Finding Purpose & Renewed Vitality",
    readTime: "6 min read",
    date: "Sep 08, 2026",
    desc: "Personal reflections on post-treatment transition, long-term health tracking, and peer mentorship.",
    author: "David K. Miller",
    content: [
      "Entering remission marks the start of a new chapter filled with hope and ongoing self-care.",
      "Mentoring newly diagnosed patients and participating in community advocacy empowers survivors to transform lived experience into positive impact.",
    ],
  },
};

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const articleId = parseInt(resolvedParams.id, 10);
  const [sanityArticle, setSanityArticle] = useState<ArticleData | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchSanityArticle() {
      try {
        const doc = await client.fetch(
          `*[_type == "article" && (_id == $id || slug.current == $id)][0]`,
          { id: resolvedParams.id },
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
            category: doc.category || "Medical Insights",
            tag: doc.category || "Medical Insights",
            title: doc.title,
            readTime: doc.readTime
              ? (doc.readTime.includes("min") ? doc.readTime : `${doc.readTime} min read`)
              : "5 min read",
            date: doc.date || "Sep 22, 2026",
            desc: doc.desc || "",
            author: doc.author || "Sayantan Pal",
            content: extractedContent,
          });
        }
      } catch (err) {
        console.error("Failed to fetch article from Sanity:", err);
      }
    }
    fetchSanityArticle();
  }, [resolvedParams.id]);

  const fallbackArticle = articlesDatabase[articleId] || articlesDatabase[1];
  const article = sanityArticle || fallbackArticle;


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0B0C] via-[#150a21] to-[#0B0B0C] text-[#F8F8F8] relative overflow-hidden flex flex-col">
      {/* Specular Background Refraction Orbs */}
      <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-[#C27AFF]/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[45%] right-[10%] w-[550px] h-[550px] bg-[#39C69C]/18 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[15%] w-[500px] h-[500px] bg-[#9DAE8B]/15 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Header Navigation */}
      <header className="w-full py-6 px-6 md:px-16 flex items-center justify-between z-10 border-b border-white/10 glass-navbar">
        <Link
          href="/"
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
          Back to Carcino Foundation
        </Link>
        <span className="font-winterSolace text-lg font-bold text-[#C27AFF]">
          Article Reader
        </span>
      </header>

      {/* Main Article Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex-1 z-10">
        <div className="flex items-center gap-3 mb-6">
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

        <h1 className="font-winterSolace text-3xl md:text-5xl font-bold leading-tight mb-6 headline-textured">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 pb-8 mb-8 border-b border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C27AFF] to-[#9DAE8B] flex items-center justify-center font-bold text-black text-sm">
            {article.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{article.author}</p>
            <p className="text-xs text-zinc-400">Carcino Medical Advisory Board</p>
          </div>
        </div>

        <div className="space-y-6 text-base md:text-lg leading-relaxed text-zinc-200 font-inter">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/#articles-gallery"
            className="flex py-3 px-6 rounded-full glass-btn-primary text-sm font-bold text-[#0C2822]"
          >
            Explore More Articles
          </Link>
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
      </main>
    </div>
  );
}
