"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface OurVisionSectionProps {
  isLightMode?: boolean;
}

export default function OurVisionSection({ isLightMode = false }: OurVisionSectionProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Main Title & Pill Staggered Entrance
      if (titleRef.current) {
        const children = titleRef.current.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 50, scale: 0.92, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.14,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Vision Cards 2x2 Grid Stagger & 3D Tilt
      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children) as HTMLElement[];

        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.9, rotateY: -8, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.14,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: cardsRef.current,
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
              rotateX: -y / 18,
              rotateY: x / 18,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const visionPillars = [
    {
      id: "rural-care",
      title: "Rural Care",
      desc: "We aim to contribute toward a more decentralized and equitable rural cancer support infrastructure.",
      accent: "#9DAE8B",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M15.7912 1.66699L18.3162 15.877C18.3444 16.0443 18.321 16.2163 18.2489 16.3699C18.1768 16.5235 18.0595 16.6515 17.9127 16.7367C17.7659 16.8218 17.5967 16.8601 17.4275 16.8465C17.2584 16.8329 17.0974 16.7679 16.9662 16.6603L10.9995 12.182C10.7115 11.9668 10.3615 11.8505 10.002 11.8505C9.64245 11.8505 9.29254 11.9668 9.0045 12.182L3.02783 16.6587C2.8967 16.7661 2.73594 16.8309 2.56699 16.8446C2.39805 16.8582 2.22896 16.82 2.08227 16.7351C1.93559 16.6502 1.81829 16.5225 1.74603 16.3692C1.67377 16.2159 1.64998 16.0442 1.67783 15.877L4.20117 1.66699"
            stroke={isLightMode ? "#2A1A3F" : "#E6E6E6"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.6665 21.6665C17.1894 21.6665 21.6665 17.1894 21.6665 11.6665C21.6665 6.14366 17.1894 1.6665 11.6665 1.6665C6.14366 1.6665 1.6665 6.14366 1.6665 11.6665C1.6665 17.1894 6.14366 21.6665 11.6665 21.6665Z"
            stroke={isLightMode ? "#9DAE8B" : "#9DAE8B"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "healthcare-equity",
      title: "Healthcare Equity",
      desc: "No individual should progress to advanced-stage cancer due to delayed diagnosis, financial unawareness, or limited access to healthcare resources.",
      accent: "#CDA8E8",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M30.286 14.9998L16.9527 1.6665L2.61936 15.9998C2.0086 16.6229 1.6665 17.4607 1.6665 18.3332C1.6665 19.2057 2.0086 20.0434 2.61936 20.6665L11.286 29.3332C12.6194 30.6665 14.6194 30.6665 15.9527 29.3332L30.286 14.9998Z"
            stroke={isLightMode ? "#2A1A3F" : "#E6E6E6"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.6665 1.6665L9.99984 9.99984"
            stroke={isLightMode ? "#CDA8E8" : "#CDA8E8"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.6665 16.6665H26.6665"
            stroke={isLightMode ? "#CDA8E8" : "#CDA8E8"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "run-by-students",
      title: "Run by Students",
      desc: "We believe that our generation can redefine cancer. And we try our best to educate our community.",
      accent: "#C9A867",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 27 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M24.9998 16.6665V13.3332C24.9998 11.5651 24.2975 9.86937 23.0472 8.61913C21.797 7.36888 20.1013 6.6665 18.3332 6.6665H8.33317C6.56506 6.6665 4.86937 7.36888 3.61913 8.61913C2.36888 9.86937 1.6665 11.5651 1.6665 13.3332V16.6665"
            stroke={isLightMode ? "#2A1A3F" : "#E6E6E6"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.33317 14.9998C12.0151 14.9998 14.9998 12.0151 14.9998 8.33317C14.9998 4.65127 12.0151 1.6665 8.33317 1.6665C4.65127 1.6665 1.6665 4.65127 1.6665 8.33317C1.6665 12.0151 4.65127 14.9998 8.33317 14.9998Z"
            stroke={isLightMode ? "#C9A867" : "#C9A867"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.6665 12.9998L4.99984 16.3332L11.6665 9.6665"
            stroke={isLightMode ? "#C9A867" : "#C9A867"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "early-detection",
      title: "Early Detection",
      desc: "It is the strongest defense against cancer, and we work to ensure that no life is lost simply because the signs were missed too late.",
      accent: "#39C69C",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M28.3332 1.6665H4.99984C3.15889 1.6665 1.6665 3.15889 1.6665 4.99984V28.3332C1.6665 30.1741 3.15889 31.6665 4.99984 31.6665H28.3332C30.1741 31.6665 31.6665 30.1741 31.6665 28.3332V4.99984C31.6665 3.15889 30.1741 1.6665 28.3332 1.6665Z"
            stroke={isLightMode ? "#2A1A3F" : "#E6E6E6"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.6665 11.6665H31.6665"
            stroke={isLightMode ? "#2A1A3F" : "#E6E6E6"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.6665 20.9998L13.9998 25.3332L24.6665 16.6665"
            stroke={isLightMode ? "#39C69C" : "#39C69C"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="vision-section"
      ref={sectionRef}
      className={`flex py-20 md:py-32 px-6 md:px-16 flex-col items-center justify-center w-full relative overflow-hidden transition-colors duration-500 ${
        isLightMode
          ? "bg-gradient-to-b from-[#ECE9E9]/60 via-[#E2DDDD] to-[#ECE9E9]"
          : "bg-gradient-to-b from-[#1E1727] via-[#30253C] to-[#1B1324]"
      }`}
    >
      {/* Specular Ambient Refraction Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#9DAE8B]/18 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-[#CDA8E8]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="flex max-w-5xl flex-col items-center gap-10 w-full z-10 relative">
        {/* Main Title Heading: Our Mission . */}
        <div
          ref={titleRef}
          className="w-full flex flex-col md:flex-row items-center justify-center gap-3 py-2 overflow-visible"
        >
          <span className="font-winterSolace text-6xl md:text-[112px] bg-gradient-to-r from-[#C08A6E] via-[#B3A9C6] via-[#9DAE8B] to-[#C9A867] bg-clip-text text-transparent leading-[1.25em] pt-4 pb-2 px-2 inline-block">
            {t("vis_our")}
          </span>
          <div className="py-3 md:py-5 px-8 md:px-14 rounded-[999px] bg-[#9875C1] shadow-2xl flex items-center justify-center my-2 md:my-0 overflow-visible transform hover:scale-105 transition-transform duration-300">
            <span className="text-[#0B0B0C] font-winterSolace text-5xl md:text-[92px] leading-[1.15em] font-bold pt-1 pb-1 inline-block">
              {t("vis_vision")}
            </span>
          </div>
          <span
            className={`font-inter text-6xl md:text-[112px] font-bold leading-[1.25em] pt-4 inline-block ${
              isLightMode ? "text-[#171717]" : "text-[#F4F1E9]"
            }`}
          >
            .
          </span>
        </div>

        {/* Continuous Single Row Structure of Our Mission Cards (Corner-Only Borders/Margins) */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 w-full max-w-7xl mt-6"
        >
          {visionPillars.map((pillar) => (
            <div
              key={pillar.id}
              className={`p-6 md:p-7 rounded-2xl transition-all duration-400 flex flex-col justify-between items-start gap-6 min-h-[250px] relative overflow-hidden bg-transparent shadow-none border-none ${
                isLightMode ? "text-[#171717]" : "text-[#E6E6E6]"
              }`}
            >

              <div className="flex flex-col items-start gap-3.5 w-full">
                <div className="flex items-center justify-between w-full">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
                    style={{
                      borderColor: `${pillar.accent}40`,
                      backgroundColor: `${pillar.accent}15`,
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <span
                    className="text-[10px] font-bold font-inter tracking-widest px-2.5 py-0.5 rounded-full border uppercase"
                    style={{
                      borderColor: pillar.accent,
                      color: pillar.accent,
                      backgroundColor: `${pillar.accent}15`,
                    }}
                  >
                    TCF MISSION
                  </span>
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
                className={`font-inter text-sm md:text-base font-light leading-snug ${
                  isLightMode ? "text-[#9875C1]" : "text-[#E9CDF8]"
                }`}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
