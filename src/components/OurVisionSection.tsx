"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, Variants } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const cardVariants: Variants = {
  offscreen: {
    y: 80,
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

interface OurVisionSectionProps {
  isLightMode?: boolean;
}

export default function OurVisionSection({ isLightMode = false }: OurVisionSectionProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // GSAP.com/scroll Pinned & Scrubbed Interactive Master Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=110%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current.children,
          { opacity: 0, y: 60, scale: 0.88, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }

      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children) as HTMLElement[];

        tl.fromTo(
          cards,
          {
            opacity: 0,
            y: 90,
            scale: 0.85,
            rotateX: 25,
            transformPerspective: 1000,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.25,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile Unpinned Standard Entrance
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current.children,
          { opacity: 0, y: 40, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children) as HTMLElement[];
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    // 3D Tilt Hover interaction using quickTo for maximum performance
    if (cardsRef.current) {
      const cards = Array.from(cardsRef.current.children) as HTMLElement[];
      cards.forEach((card) => {
        const rotateXTo = gsap.quickTo(card, "rotateX", { duration: 0.3, ease: "power2.out" });
        const rotateYTo = gsap.quickTo(card, "rotateY", { duration: 0.3, ease: "power2.out" });
        const scaleTo = gsap.quickTo(card, "scale", { duration: 0.3, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          rotateXTo(-y / 18);
          rotateYTo(x / 18);
          scaleTo(1.02);
        };

        const handleMouseLeave = () => {
          rotateXTo(0);
          rotateYTo(0);
          scaleTo(1);
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
      });
    }

    return () => mm.revert();
  }, []);

  const visionPillars = [
    {
      id: "rural-care",
      title: "Cancer Literacy",
      desc: "Understand the why. Turning knowledge into earlier action and better outcomes.",
      accent: "#9DAE8B",
      lightAccent: "#047857",
      icon: (isLight: boolean) => (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isLight ? "#047857" : "#9DAE8B"}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          <path d="M6 8h2" />
          <path d="M16 8h2" />
          <path d="M6 12h2" />
          <path d="M16 12h2" />
        </svg>
      ),
    },
    {
      id: "healthcare-equity",
      title: "Rural Cancer Care Infrastructure",
      desc: "Identify gaps in rural cancer care and build practical pathways to close them.",
      accent: "#CDA8E8",
      lightAccent: "#6D28D9",
      icon: (isLight: boolean) => (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isLight ? "#6D28D9" : "#CDA8E8"}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
        >
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
          <path d="M6 12H4a2 2 0 0 0-2 2v8" />
          <path d="M18 9h2a2 2 0 0 1 2 2v11" />
          <path d="M10 6h4" />
          <path d="M10 10h4" />
          <path d="M12 14v4" />
          <path d="M10 16h4" />
          <path d="M2 22h20" />
        </svg>
      ),
    },
    {
      id: "run-by-students",
      title: "Veterinary Cancer Care",
      desc: "Extend cancer literacy, love and support to the animals who are part of our families..",
      accent: "#C9A867",
      lightAccent: "#D97706",
      icon: (isLight: boolean) => (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isLight ? "#D97706" : "#C9A867"}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
        >
          <circle cx="11" cy="4" r="2" />
          <circle cx="18" cy="8" r="2" />
          <circle cx="6" cy="8" r="2" />
          <path d="M12 10.5c-3.2 0-6 2.5-6 6.5 0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4 0-4-2.8-6.5-6-6.5z" />
        </svg>
      ),
    },
    {
      id: "early-detection",
      title: "Youth & Medical Community",
      desc: "Upskilling the youth to build stronger communities.",
      accent: "#39C69C",
      lightAccent: "#0284C7",
      icon: (isLight: boolean) => (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isLight ? "#0284C7" : "#39C69C"}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="vision-section"
      ref={sectionRef}
      className={`flex pt-4 md:pt-8 pb-20 md:pb-28 px-6 md:px-16 flex-col items-center justify-center w-full relative overflow-hidden transition-colors duration-500 ${
        isLightMode
          ? "bg-gradient-to-br from-[#9875C1] to-[#FCC8DF] text-[#163B2E]"
          : "bg-gradient-to-b from-[#1E1727] via-[#30253C] to-[#1B1324]"
      }`}
    >
      {/* Specular Ambient Refraction Orbs (Optimized Blur) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#9DAE8B]/18 rounded-full blur-[60px] pointer-events-none will-change-transform" />
      <div className="absolute top-10 right-10 w-[380px] h-[380px] bg-[#CDA8E8]/15 rounded-full blur-[50px] pointer-events-none will-change-transform" />

      <div className="flex max-w-5xl flex-col items-center gap-10 w-full z-10 relative">
        {/* Main Title Heading: What We Are Building . */}
        <div
          ref={titleRef}
          className="w-full flex flex-col items-center justify-center gap-2 sm:gap-4 py-3 text-center overflow-visible"
        >
          {/* Line 1: What We Are */}
          <span className={`font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[76px] bg-clip-text text-transparent leading-[1.2em] py-1 px-2 inline-block whitespace-nowrap ${
            isLightMode
              ? "bg-gradient-to-r from-[#163B2E] to-[#0B3E4C]"
              : "bg-gradient-to-r from-[#C08A6E] via-[#B3A9C6] via-[#9DAE8B] to-[#C9A867]"
          }`}>
            {t("vis_our")}
          </span>

          {/* Line 2: Building . */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-visible whitespace-nowrap">
            <div className={`py-2 px-5 sm:py-3.5 sm:px-9 md:py-4 md:px-10 rounded-[999px] shadow-2xl flex items-center justify-center my-0 overflow-visible transform hover:scale-105 transition-transform duration-300 ${
              isLightMode ? "bg-gradient-to-r from-[#163B2E] to-[#0B3E4C]" : "bg-[#9875C1]"
            }`}>
              <span className={`font-syne font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[66px] leading-[1.2em] pt-0.5 pb-1 inline-block ${
                isLightMode ? "text-white" : "text-[#0B0B0C]"
              }`}>
                {t("vis_vision")}
              </span>
            </div>
            <span
              className={`font-inter text-3xl sm:text-5xl md:text-6xl lg:text-[76px] font-bold leading-[1.2em] py-1 inline-block ${
                isLightMode ? "text-[#171717]" : "text-[#F4F1E9]"
              }`}
            >
              .
            </span>
          </div>
        </div>

        {/* Continuous Single Row Structure of Our Mission Cards with Stylish Dividers */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-7xl mt-6 relative"
        >
          {visionPillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className={`p-6 md:p-7 rounded-2xl transition-all duration-400 flex flex-col justify-between items-start gap-6 min-h-[250px] relative overflow-visible bg-transparent shadow-none border-none group ${
                isLightMode ? "text-[#171717]" : "text-[#E6E6E6]"
              }`}
            >
              <div className="flex flex-col items-start gap-3.5 w-full">
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110 shadow-md ${
                      isLightMode
                        ? "bg-white/90 shadow-[0_4px_15px_rgba(0,0,0,0.12)] border-black/10"
                        : "bg-white/5 border-white/15"
                    }`}
                    style={{
                      borderColor: isLightMode ? pillar.lightAccent : "rgba(255, 255, 255, 0.2)",
                      boxShadow: isLightMode
                        ? `0 6px 20px ${pillar.lightAccent}40`
                        : `0 6px 20px ${pillar.accent}25`,
                    }}
                  >
                    {pillar.icon(isLightMode)}
                  </div>
                </div>
                <h3
                  className={`font-instrumentSerif text-2xl md:text-3xl tracking-wide ${
                    isLightMode ? "text-[#163B2E]" : "text-[#E6E6E6]"
                  }`}
                >
                  {pillar.title}
                </h3>
              </div>

              <p
                className={`font-spaceGrotesk text-sm md:text-base font-light leading-snug ${
                  isLightMode ? "text-[#2E1640]" : "text-[#E9CDF8]"
                }`}
              >
                {pillar.desc}
              </p>

              {/* Stylish Vertical Divider Line between tiles (Desktop) */}
              {idx < visionPillars.length - 1 && (
                <div
                  className={`hidden lg:block absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 h-[75%] w-[1px] pointer-events-none transition-all duration-400 ${
                    isLightMode
                      ? "bg-gradient-to-b from-transparent via-[#163B2E]/30 to-transparent"
                      : "bg-gradient-to-b from-transparent via-[#CDA8E8]/40 to-transparent"
                  }`}
                >
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
                      isLightMode ? "bg-[#0B3E4C]/50" : "bg-[#CDA8E8]/70 shadow-[0_0_8px_#CDA8E8]"
                    }`}
                  />
                </div>
              )}

              {/* Stylish Horizontal Divider Line between tiles (Mobile) */}
              {idx < visionPillars.length - 1 && (
                <div
                  className={`lg:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 w-[80%] h-[1px] pointer-events-none transition-all duration-400 ${
                    isLightMode
                      ? "bg-gradient-to-r from-transparent via-[#163B2E]/25 to-transparent"
                      : "bg-gradient-to-r from-transparent via-[#CDA8E8]/30 to-transparent"
                  }`}
                >
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
                      isLightMode ? "bg-[#0B3E4C]/50" : "bg-[#CDA8E8]/70 shadow-[0_0_8px_#CDA8E8]"
                    }`}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
