"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "@/context/AuthContext";
import { client } from "@/sanity/lib/client";
import { ExternalLink } from "lucide-react";
import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  offscreen: {
    y: 120,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.35,
      duration: 0.8,
    },
  },
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FlagshipprogramsectionProps {
  isLightMode?: boolean;
}

interface CampaignCardItem {
  id: string;
  code: string;
  tag: string;
  title: string;
  desc: string;
  cover: string;
  actionUrl?: string;
  status?: string;
  pathwayStage?: string;
}

const STAGE_TAG_MAP: Record<string, { code: string; tag: string }> = {
  "stage-01": { code: "01", tag: "TCF PATHWAY" },
  "stage-02": { code: "02", tag: "TCF ADVOCACY" },
  "stage-03": { code: "03", tag: "TCF CONNECTION" },
  "stage-04": { code: "04", tag: "TCF VOICES" },
  "general-flagship": { code: "FLAGSHIP", tag: "CAMPAIGN" },
};

export default function Flagshipprogramsection({
  isLightMode = false,
}: FlagshipprogramsectionProps) {
  const { setIsAuthModalOpen } = useAuth();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [sanityCampaigns, setSanityCampaigns] = useState<CampaignCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch campaigns live from Sanity Studio & listen for real-time updates
  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const docs = await client.fetch(
          `*[_type == "campaign" && !(_id in path("drafts.**"))] | order(startDate desc) {
            _id,
            title,
            pathwayStage,
            status,
            summary,
            "bannerUrl": bannerImage.asset->url,
            actionUrl
          }`,
          {},
          { useCdn: false }
        );

        if (docs && Array.isArray(docs)) {
          const formatted: CampaignCardItem[] = docs.map((doc: any, index: number) => {
            const stageInfo = STAGE_TAG_MAP[doc.pathwayStage] || {
              code: `0${(index % 4) + 1}`,
              tag: "TCF PATHWAY",
            };
            return {
              id: doc._id,
              code: stageInfo.code,
              tag: stageInfo.tag,
              pathwayStage: doc.pathwayStage,
              title: doc.title || "Pathway Campaign",
              desc: doc.summary || "Explore active initiatives in the Carcino Pathway.",
              cover: doc.bannerUrl || "/CoverImage.png",
              actionUrl: doc.actionUrl,
              status: doc.status,
            };
          });
          setSanityCampaigns(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch Sanity campaigns:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();

    const subscription = client
      .listen(`*[_type == "campaign"]`)
      .subscribe(() => {
        fetchCampaigns();
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
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

      if (cardsRef.current && cardsRef.current.children.length > 0) {
        const cards = Array.from(cardsRef.current.children) as HTMLElement[];
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "back.out(1.2)",
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
  }, [sanityCampaigns.length]);

  const handleCardClick = (card: CampaignCardItem) => {
    if (card.actionUrl) {
      window.open(card.actionUrl, "_blank", "noopener,noreferrer");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`flex py-[120px] px-6 md:px-[84px] flex-col items-start gap-14 min-w-full overflow-hidden transition-colors duration-400 ${
        isLightMode ? "bg-[#ECE9E9] text-[#171717]" : "bg-[#050505] text-white"
      }`}
    >
      {/* Title & Subtitle */}
      <div ref={headerRef} className="flex flex-col items-center gap-4 w-full">
        <h2 className={`font-winterSolace text-4xl sm:text-6xl md:text-7xl lg:text-[84px] leading-tight bg-clip-text text-transparent w-full text-center tracking-[-0.0356em] font-normal pb-1 ${
          isLightMode
            ? "bg-gradient-to-r from-[#163B2E] via-[#0B3E4C] to-[#163B2E]"
            : "bg-[linear-gradient(91deg,#C08A6E_0.02%,#B3A9C6_29.99%,#9DAE8B_54.96%,#C9A867_79.93%)]"
        }`}>
          the carcino pathway
        </h2>
        <div className="flex flex-col items-center w-full">
          <p
            className={`font-googleSansFlex text-base sm:text-lg font-light leading-[27px] w-full max-w-[640px] text-center tracking-[0.01em] ${
              isLightMode ? "text-[#2E1640]" : "text-[#D5B0FF]"
            }`}
          >
            A flagship, four-stage integration model designed specifically to
            empower patients, caregivers, and clinical teams navigating
            neuroendocrine cancer.
          </p>
        </div>
      </div>

      {/* Flagship Sanity Campaign Cards Grid */}
      <div
        ref={cardsRef}
        className="flex flex-wrap lg:flex-nowrap justify-center items-stretch gap-6 w-full min-h-[100px]"
      >
        {sanityCampaigns.length > 0 ? (
          sanityCampaigns.map((card) => (
            <motion.div
              key={card.id}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              onClick={() => handleCardClick(card)}
              className={`flex p-6 flex-col items-start gap-4 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl w-full sm:w-[280px] lg:w-[300px] overflow-hidden cursor-pointer group ${
                isLightMode
                  ? "bg-white/80 border-black/10 shadow-lg hover:border-[#7E22CE]"
                  : "bg-[#0B0B0C] border-[rgba(255,255,255,0.10)] hover:border-[#CDA8E8]/70"
              }`}
            >
              <div className="relative w-full h-[180px] rounded-2xl overflow-hidden shrink-0">
                <img
                  src={card.cover}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={card.title}
                />
                {card.status && (
                  <span className="absolute top-3 left-3 bg-[#39C69C] text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                    {card.status}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2 w-fit">
                  <p
                    className={`font-inter text-xs font-bold w-fit ${
                      isLightMode
                        ? "text-gray-400"
                        : "text-[rgba(255,255,255,0.30)]"
                    }`}
                  >
                    {card.code}
                  </p>
                  <p
                    className={`font-googleSansFlex text-sm font-medium w-fit tracking-[0.01em] ${
                      isLightMode ? "text-[#7E22CE]" : "text-[#CDA8E8]"
                    }`}
                  >
                    {card.tag}
                  </p>
                </div>

                <div
                  className={`flex flex-col justify-center items-center rounded-2xl w-8 h-8 transition-colors ${
                    isLightMode
                      ? "bg-gray-100 group-hover:bg-[#7E22CE] group-hover:text-white text-[#171717]"
                      : "bg-[rgba(255,255,255,0.04)] group-hover:bg-[#CDA8E8] group-hover:text-black text-white"
                  }`}
                >
                  {card.actionUrl ? (
                    <ExternalLink className="w-4 h-4" />
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 w-4 h-4 overflow-hidden relative"
                    >
                      <g clipPath="url(#clip0_247_1273)">
                        <path
                          d="M8.00021 14.6672C11.6824 14.6672 14.6674 11.6822 14.6674 7.99996C14.6674 4.31777 11.6824 1.33276 8.00021 1.33276C4.31801 1.33276 1.33301 4.31777 1.33301 7.99996C1.33301 11.6822 4.31801 14.6672 8.00021 14.6672Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_247_1273">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-2 w-full flex-1">
                <p
                  className={`font-inter text-[22px] font-bold leading-7 w-full ${
                    isLightMode ? "text-[#171717]" : "text-[#FFF]"
                  }`}
                >
                  {card.title}
                </p>
                <p
                  className={`font-googleSansFlex text-sm font-light leading-[21px] w-full tracking-[0.0129em] line-clamp-3 ${
                    isLightMode ? "text-[#2E1640]" : "text-[#D5B0FF]"
                  }`}
                >
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))
        ) : !loading ? (
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-white/20 text-center max-w-md my-4">
            <p className="font-googleSansFlex text-sm text-[#CDA8E8] font-medium">
              No active campaigns published in Sanity Studio yet.
            </p>
            <p className="font-inter text-xs text-gray-400 mt-1">
              Publish campaigns in <code className="text-[#39C69C]">/studio</code> under Pathway Campaigns to display them here live.
            </p>
          </div>
        ) : null}
      </div>

      {/* Action Button */}
      <div className="flex flex-col items-center w-full">
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="cursor-pointer text-nowrap flex py-3.5 px-8 justify-center items-center gap-2 rounded-[999px] bg-gradient-to-r from-[#F15E51] to-[#FCC8DF] hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300 w-fit shadow-lg shadow-[#F15E51]/25"
        >
          <p className="text-[#050505] font-googleSansFlex text-sm font-bold leading-5 w-fit">
            Begin Your Pathway Navigation
          </p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 overflow-hidden relative"
          >
            <path
              d="M3.33301 7.99996H12.6674M8.00021 12.6672L12.6674 7.99996L8.00021 3.33276"
              stroke="#050505"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
