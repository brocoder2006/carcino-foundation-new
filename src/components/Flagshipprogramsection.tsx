"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "@/context/AuthContext";
import { fetchDjangoCampaigns } from "@/lib/djangoApi";
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

  // Fetch campaigns live from Django REST API
  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const docs = await fetchDjangoCampaigns();

        if (docs && Array.isArray(docs) && docs.length > 0) {
          const formatted: CampaignCardItem[] = docs.map((doc: any, index: number) => {
            const stageInfo = STAGE_TAG_MAP[doc.pathway_stage] || {
              code: `0${(index % 4) + 1}`,
              tag: "TCF PATHWAY",
            };
            return {
              id: doc.id,
              code: stageInfo.code,
              tag: stageInfo.tag,
              pathwayStage: doc.pathway_stage,
              title: doc.title || "Pathway Campaign",
              desc: doc.summary || "Explore active initiatives in the Carcino Pathway.",
              cover: doc.banner_image || "/CoverImage.png",
              actionUrl: doc.action_url,
              status: doc.status,
            };
          });
          setSanityCampaigns(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch Django campaigns:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
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
      className={`flex py-[120px] px-6 md:px-[84px] flex-col items-start gap-14 min-w-full overflow-hidden transition-colors duration-400 ${isLightMode ? "bg-[#E5F2F0] text-[#163B2E]" : "bg-[#050505] text-white"
        }`}
    >
      {/* Title & Subtitle */}
      <div ref={headerRef} className="flex flex-col items-center gap-4 w-full">
        <h2 className={`font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[1.2em] w-full text-center tracking-[-0.0356em] py-2 overflow-visible ${isLightMode
            ? "text-[#163B2E]"
            : "bg-clip-text text-transparent bg-[linear-gradient(91deg,#C08A6E_0.02%,#B3A9C6_29.99%,#9DAE8B_54.96%,#C9A867_79.93%)]"
          }`}>
          happening now
        </h2>
        <div className="flex flex-col items-center w-full">
          <p
            className={`font-googleSansFlex text-base sm:text-lg font-light leading-[27px] w-full max-w-[640px] text-center tracking-[0.01em] ${isLightMode ? "text-[#2D5A4C]" : "text-[#D5B0FF]"
              }`}
          >
            Featured campaigns, events and current opportunities.
          </p>
        </div>
      </div>

      {/* Flagship Sanity Campaign Cards Grid */}
      <div
        ref={cardsRef}
        className="flex flex-wrap lg:flex-nowrap justify-center items-stretch gap-6 w-full min-h-[100px]"
      >
        {sanityCampaigns.length > 0 ? (
          sanityCampaigns.map((card, idx) => {
            const blockThemes = [
              {
                bg: "bg-[#E6DEC9]",
                tag: "text-[#5C5243]",
                title: "text-[#1C2925]",
                code: "text-[#5C5243]",
                desc: "text-[#3D3528]",
                actionBtn: "bg-[#1C2925] text-white",
              },
              {
                bg: "bg-[#F2BA36]",
                tag: "text-[#4A3600]",
                title: "text-[#1C1800]",
                code: "text-[#4A3600]",
                desc: "text-[#3B2E00]",
                actionBtn: "bg-[#1C1800] text-white",
              },
              {
                bg: "bg-[#E05333]",
                tag: "text-[#FFD6CC]",
                title: "text-white",
                code: "text-[#FFC2B3]",
                desc: "text-[#FFF5F2]",
                actionBtn: "bg-white text-[#E05333]",
              },
            ];
            const theme = blockThemes[idx % blockThemes.length];

            return (
              <motion.div
                key={card.id}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                onClick={() => handleCardClick(card)}
                className={`flex p-5 flex-col items-start gap-4 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 w-full sm:w-[280px] lg:w-[300px] overflow-hidden cursor-pointer group shadow-lg ${
                  isLightMode
                    ? `${theme.bg} border-none`
                    : "bg-[#0B0B0C] border border-[rgba(255,255,255,0.10)] hover:border-[#CDA8E8]/70"
                }`}
              >
                <div className="relative w-full h-[180px] rounded-2xl overflow-hidden shrink-0">
                  <img
                    src={card.cover}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={card.title}
                  />
                  {card.status && (
                    <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md ${
                      isLightMode ? "bg-[#1C2925] text-white" : "bg-[#2BA986] text-white"
                    }`}>
                      {card.status}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2 w-fit">
                    <p
                      className={`font-inter text-xs font-bold w-fit ${isLightMode ? theme.code : "text-[rgba(255,255,255,0.30)]"}`}
                    >
                      {card.code}
                    </p>
                    <p
                      className={`font-googleSansFlex text-xs font-bold uppercase tracking-wider w-fit ${isLightMode ? theme.tag : "text-[#CDA8E8]"}`}
                    >
                      {card.tag}
                    </p>
                  </div>

                  <div
                    className={`flex flex-col justify-center items-center rounded-xl w-8 h-8 transition-colors ${
                      isLightMode
                        ? theme.actionBtn
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
                    className={`font-inter text-[20px] font-extrabold leading-6 w-full ${isLightMode ? theme.title : "text-[#FFF]"}`}
                  >
                    {card.title}
                  </p>
                  <p
                    className={`font-googleSansFlex text-xs font-normal leading-[19px] w-full tracking-[0.0129em] line-clamp-3 ${isLightMode ? theme.desc : "text-[#D5B0FF]"}`}
                  >
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })
        ) : !loading ? (
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-[#CBE6E1] text-center max-w-md my-4 bg-white/60">
            <p className="font-googleSansFlex text-sm text-[#0D7A5F] font-medium">
              No active campaigns published in Sanity Studio yet.
            </p>
            <p className="font-inter text-xs text-[#5B8C7E] mt-1">
              Publish campaigns in <code className="text-[#2BA986]">/studio</code> under Pathway Campaigns to display them here live.
            </p>
          </div>
        ) : null}
      </div>

      {/* Action Button */}
      <div className="flex flex-col items-center w-full">
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className={`cursor-pointer text-nowrap flex py-3.5 px-8 justify-center items-center gap-2 rounded-[999px] hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300 w-fit shadow-lg ${
            isLightMode
              ? "bg-[#163B2E] text-white hover:bg-[#0E281F] shadow-[#163B2E]/20"
              : "bg-gradient-to-r from-[#F15E51] to-[#FCC8DF] text-[#050505] shadow-[#F15E51]/25"
          }`}
        >
          <p className={`font-googleSansFlex text-sm font-bold leading-5 w-fit ${isLightMode ? "text-white" : "text-[#050505]"}`}>
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
              stroke={isLightMode ? "#FFFFFF" : "#050505"}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
