"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Building2, PawPrint, GraduationCap } from "lucide-react";

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
      title: "Cancer Literacy",
      desc: "Understand the why. Turning knowledge into earlier action and better outcomes.",
      accent: "#9DAE8B",
      icon: <BookOpen className="w-5 h-5 text-[#9DAE8B]" />,
    },
    {
      id: "healthcare-equity",
      title: "Rural Cancer Care Infrastructure",
      desc: "Identify gaps in rural cancer care and build practical pathways to close them.",
      accent: "#CDA8E8",
      icon: <Building2 className="w-5 h-5 text-[#CDA8E8]" />,
    },
    {
      id: "run-by-students",
      title: "Veterinary Cancer Care",
      desc: "Extend cancer literacy, love and support to the animals who are part of our families..",
      accent: "#C9A867",
      icon: <PawPrint className="w-5 h-5 text-[#C9A867]" />,

    },
    {
      id: "early-detection",
      title: "Youth & Medical Community",
      desc: "Upskilling the youth to build stronger communities.",
      accent: "#39C69C",
      icon: <GraduationCap className="w-5 h-5 text-[#39C69C]" />,
    },
  ];

  return (
    <section
      id="vision-section"
      ref={sectionRef}
      className={`flex py-20 md:py-32 px-6 md:px-16 flex-col items-center justify-center w-full relative overflow-hidden transition-colors duration-500 ${isLightMode
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
            className={`font-inter text-6xl md:text-[112px] font-bold leading-[1.25em] pt-4 inline-block ${isLightMode ? "text-[#171717]" : "text-[#F4F1E9]"
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
              className={`p-6 md:p-7 rounded-2xl transition-all duration-400 flex flex-col justify-between items-start gap-6 min-h-[250px] relative overflow-hidden bg-transparent shadow-none border-none ${isLightMode ? "text-[#171717]" : "text-[#E6E6E6]"
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
                  {/* <span
                    className="text-[10px] font-bold font-inter tracking-widest px-2.5 py-0.5 rounded-full border uppercase"
                    style={{
                      borderColor: pillar.accent,
                      color: pillar.accent,
                      backgroundColor: `${pillar.accent}15`,
                    }}
                  >
                  </span> */}
                </div>
                <h3
                  className={`font-instrumentSerif text-2xl md:text-3xl tracking-wide ${isLightMode ? "text-[#163B2E]" : "text-[#E6E6E6]"
                    }`}
                >
                  {pillar.title}
                </h3>
              </div>

              <p
                className={`font-inter text-sm md:text-base font-light leading-snug ${isLightMode ? "text-[#9875C1]" : "text-[#E9CDF8]"
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
