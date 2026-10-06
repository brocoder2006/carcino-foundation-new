"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImpactStatsSectionProps {
  isLightMode?: boolean;
}

const statsList = [
  {
    id: "people-screened",
    numId: "num-people-screened",
    targetValue: 15000,
    suffix: "+",
    label: "People Screened",
    desc: "Comprehensive early cancer screening & diagnostic literacy provided across regions.",
    accent: "#39C69C",
  },
  {
    id: "villages-reached",
    numId: "num-villages-reached",
    targetValue: 120,
    suffix: "+",
    label: "Villages Reached",
    desc: "Rural communities empowered with active healthcare infrastructure & direct outreach.",
    accent: "#CDA8E8",
  },
  {
    id: "lives-impacted",
    numId: "num-lives-impacted",
    targetValue: 25000,
    suffix: "+",
    label: "Lives Impacted",
    desc: "Patients, caregivers, and families supported through guidance, stories, and care pathways.",
    accent: "#F6C656",
  },
  {
    id: "guidance-rate",
    numId: "num-guidance-rate",
    targetValue: 98,
    suffix: "%",
    label: "Early Guidance Rate",
    desc: "Participants guided to timely medical consultations and clinical follow-ups.",
    accent: "#F15E51",
  },
];

export default function ImpactStatsSection({ isLightMode = false }: ImpactStatsSectionProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Grid Cards Fade Up Reveal
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. ScrollTrigger-tied dynamic count-up & scramble for stat numbers
      statsList.forEach((stat) => {
        const numEl = document.getElementById(stat.numId);
        const cardEl = document.getElementById(stat.id);
        if (!numEl || !cardEl) return;

        const counterObj = { val: 0 };

        gsap.to(counterObj, {
          val: stat.targetValue,
          ease: "power1.out",
          scrollTrigger: {
            trigger: cardEl,
            start: "top 88%",
            end: "top 40%",
            scrub: 1,
            onUpdate: (self) => {
              const currentVal = Math.floor(counterObj.val);
              if (self.direction === -1 && currentVal > 0 && currentVal < stat.targetValue) {
                // Scramble random digits when scrolling back up
                const rawStr = currentVal.toString();
                const scrambled = rawStr
                  .split("")
                  .map((ch) => (Math.random() < 0.35 ? Math.floor(Math.random() * 10) : ch))
                  .join("");
                numEl.innerText = `${scrambled}${stat.suffix}`;
              } else {
                numEl.innerText = `${currentVal.toLocaleString()}${stat.suffix}`;
              }
            },
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`w-full py-20 md:py-32 px-6 md:px-[84px] relative z-10 transition-colors duration-500 overflow-hidden ${
        isLightMode
          ? "bg-gradient-to-br from-[#9875C1] to-[#FCC8DF] text-[#163B2E]"
          : "bg-gradient-to-b from-[#1B1324] via-[#261A34] to-[#1B1324] text-white"
      }`}
    >
      {/* Specular Glow Orbs (Optimized Blur) */}
      <div
        className={`absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[60px] pointer-events-none transition-all duration-700 will-change-transform ${
          isLightMode ? "bg-[#39C69C]/20" : "bg-[#39C69C]/12"
        }`}
      />
      <div
        className={`absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full blur-[50px] pointer-events-none transition-all duration-700 will-change-transform ${
          isLightMode ? "bg-[#CDA8E8]/30" : "bg-[#CDA8E8]/15"
        }`}
      />

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-14 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center gap-4 w-full text-center">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 overflow-visible py-2">
            <span
              className={`font-winterSolace text-3xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.2em] font-extrabold bg-clip-text text-transparent inline-block pb-2 ${
                isLightMode
                  ? "bg-gradient-to-r from-[#163B2E] to-[#0B3E4C]"
                  : "bg-gradient-to-r from-[#C08A6E] via-[#B3A9C6] to-[#39C69C]"
              }`}
            >
              Real World
            </span>
            <div className="py-2 md:py-3.5 px-6 md:px-10 rounded-full shadow-lg flex items-center justify-center bg-[#39C69C] transform hover:scale-105 transition-transform duration-300 overflow-visible">
              <span className="font-winterSolace text-2xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.2em] font-bold text-[#050505] inline-block pb-1">
                Impact
              </span>
            </div>
            <span className="font-inter text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-[#39C69C] leading-[1.2em] inline-block pb-1">
              .
            </span>
          </div>

          <p
            className={`font-spaceGrotesk text-base md:text-xl font-light leading-relaxed max-w-[680px] text-center ${
              isLightMode ? "text-[#2E1640]" : "text-[#E9CDF8]"
            }`}
          >
            Measurable outreach, community screening, and direct healthcare accessibility driven by youth leadership.
          </p>
        </div>

        {/* 4 Stats Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl"
        >
          {statsList.map((stat) => (
            <div
              key={stat.id}
              id={stat.id}
              className={`p-7 sm:p-8 rounded-3xl border transition-all duration-400 flex flex-col justify-between items-start gap-6 relative overflow-hidden group hover:-translate-y-2 ${
                isLightMode
                  ? "bg-white/80 border-black/10 shadow-lg hover:border-[#39C69C] hover:shadow-[0_20px_45px_rgba(57,198,156,0.2)]"
                  : "bg-[#0B0B0C]/80 border-white/12 shadow-2xl hover:border-white/30 hover:shadow-[0_20px_50px_rgba(194,122,255,0.25)]"
              }`}
            >
              {/* Stat Accent Bar */}
              <div
                className="w-12 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-x-125 origin-left"
                style={{ backgroundColor: stat.accent }}
              />

              {/* Number Count Display */}
              <div className="flex flex-col items-start gap-1 w-full">
                <span
                  id={stat.numId}
                  className="font-googleSansFlex text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${
                      isLightMode ? "#163B2E" : "#FFFFFF"
                    } 0%, ${stat.accent} 100%)`,
                  }}
                >
                  0{stat.suffix}
                </span>

                <h3
                  className={`font-inter text-lg sm:text-xl font-bold tracking-wide mt-3 ${
                    isLightMode ? "text-[#163B2E]" : "text-white"
                  }`}
                >
                  {stat.label}
                </h3>
              </div>

              {/* Description Subtext */}
              <p
                className={`font-googleSansFlex text-xs sm:text-sm font-light leading-relaxed ${
                  isLightMode ? "text-[#2E1640]" : "text-[#D5B0FF]/80"
                }`}
              >
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

