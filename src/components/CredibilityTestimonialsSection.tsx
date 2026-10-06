"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const SQRT_5000 = Math.sqrt(5000);

const credibilityTestimonials = [
  {
    tempId: 0,
    testimonial: "Massive shoutout to The Carcino Foundation for allowing me to share my thoughts on cancer treatment today. It was indeed a pleasure to speak to Rajannya Das and her team.",
    by: "Dr. Soirindhri Banerjee, Senior Clinical Fellow in Oncology",
    imgSrc: "/podcasts/episode_2_soirindhri_banerjee.jpg",
    badge: "CLINICAL ONCOLOGY",
    badgeColor: "#CDA8E8"
  },
  {
    tempId: 1,
    testimonial: "So grateful to Rajannya Das with The Carcino Foundation for the opportunity to speak about these important cancer research topics!",
    by: "Amelia Corl, Project Manager @ Georgetown University",
    imgSrc: "/podcasts/episode_3_amelia_corl.jpg",
    badge: "GEORGETOWN UNIV",
    badgeColor: "#F6C656"
  },
  {
    tempId: 2,
    testimonial: "Just viewed the interview in its entirety. Great insights and excellent dialogue on these very important cancer care topics.",
    by: "Curtis Corl, MBA, MA, Chief Marketing Officer",
    imgSrc: "/UserPortrait.png",
    badge: "EXECUTIVE RECOGNITION",
    badgeColor: "#C9A867"
  },
  {
    tempId: 3,
    testimonial: "What an insightful and positive interview! Thank you both for sharing it with the world!",
    by: "Julie Cawoski, Former Director of Social Care & Volunteerism",
    imgSrc: "/UserPortrait(1).png",
    badge: "SOCIAL CARE",
    badgeColor: "#39C69C"
  },
  {
    tempId: 4,
    testimonial: "Soirindhri Banerjee Breaks Down the Complexities of Cancer Treatment in an in-depth feature with The Carcino Foundation.",
    by: "OncoDaily, Global Oncology Publication",
    imgSrc: "/podcasts/episode_2_soirindhri_banerjee.jpg",
    badge: "ONCODAILY FEATURE",
    badgeColor: "#39C69C"
  },
  {
    tempId: 5,
    testimonial: "Empowering patients with accessible, evidence-based oncology knowledge and youth-led community support.",
    by: "Clinical Oncology Network",
    imgSrc: "/UserPortrait.png",
    badge: "GLOBAL IMPACT",
    badgeColor: "#CDA8E8"
  },
  {
    tempId: 6,
    testimonial: "Bridging the critical gap between cutting-edge cancer research and everyday understanding for families worldwide.",
    by: "Patient Advocacy Group",
    imgSrc: "/UserPortrait(1).png",
    badge: "COMMUNITY ADVOCACY",
    badgeColor: "#F6C656"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof credibilityTestimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
  isLightMode?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
  isLightMode = false,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-7 sm:p-8 transition-all duration-500 ease-in-out select-none flex flex-col justify-between overflow-hidden backdrop-blur-xl",
        isCenter
          ? isLightMode
            ? "z-20 bg-[#163B2E] text-white border-[#39C69C] shadow-2xl"
            : "z-20 bg-gradient-to-b from-[#2A1F3D] to-[#1B1224] text-white border-[#CDA8E8] shadow-[0_15px_40px_rgba(205,168,232,0.3)]"
          : isLightMode
            ? "z-0 bg-white/90 text-[#171717] border-purple-200/80 hover:border-[#39C69C]/60 hover:shadow-lg opacity-85"
            : "z-0 bg-[#0B0B0C]/85 text-[#F8F8F8] border-white/15 hover:border-[#CDA8E8]/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] opacity-80"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.45) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? isLightMode
            ? "0px 8px 0px 4px #163B2E"
            : "0px 8px 0px 4px #CDA8E8"
          : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-[#CDA8E8]/40"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />

      <div>
        {/* Top Header Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div
            className="flex py-1 px-3 items-center gap-1.5 rounded-full border w-fit"
            style={{
              borderColor: testimonial.badgeColor,
              backgroundColor: `${testimonial.badgeColor}20`,
            }}
          >
            <span
              className="font-inter text-[10px] font-bold tracking-wider uppercase"
              style={{ color: testimonial.badgeColor }}
            >
              {testimonial.badge}
            </span>
          </div>
          <span className="font-spaceGrotesk text-[10px] uppercase font-bold tracking-widest opacity-60">
            RECOGNITION
          </span>
        </div>

        {/* User Image */}
        <div className="relative mb-4 h-14 w-14 rounded-full overflow-hidden border-2 border-white/20 shadow-md">
          <img
            src={testimonial.imgSrc}
            alt={testimonial.by.split(',')[0]}
            className="h-full w-full object-cover object-top"
          />
        </div>

        {/* Quote text */}
        <h3 className={cn(
          "font-spaceGrotesk text-sm sm:text-base md:text-lg font-medium leading-snug tracking-tight line-clamp-4",
          isCenter ? "text-white font-semibold" : "text-foreground opacity-90"
        )}>
          &quot;{testimonial.testimonial}&quot;
        </h3>
      </div>

      {/* Author information */}
      <div className="pt-3 border-t border-white/10 mt-2">
        <p className={cn(
          "font-spaceGrotesk text-xs sm:text-sm font-bold truncate",
          isCenter ? "text-[#F6C656]" : "text-muted-foreground"
        )}>
          {testimonial.by}
        </p>
      </div>
    </div>
  );
};

interface CredibilityTestimonialsSectionProps {
  isLightMode?: boolean;
}

export default function CredibilityTestimonialsSection({
  isLightMode = false,
}: CredibilityTestimonialsSectionProps) {
  const { t } = useLanguage();
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(credibilityTestimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section
      id="survivors-section"
      className={`w-full py-20 md:py-28 px-4 sm:px-6 md:px-[84px] flex flex-col items-center justify-center gap-10 relative z-10 transition-colors duration-500 overflow-hidden ${isLightMode
          ? "bg-[#ECE9E9] text-[#163B2E]"
          : "bg-gradient-to-b from-[#1B1224] via-[#30253C] to-[#1B1224] text-[#F8F8F8]"
        }`}
    >
      {/* Ambient Orbs (Optimized Blur) */}
      <div
        className={`absolute top-1/4 left-10 w-[450px] h-[450px] rounded-full blur-[60px] pointer-events-none transition-all duration-700 will-change-transform ${isLightMode ? "bg-[#F6C656]/20" : "bg-[#F6C656]/15"
          }`}
      />
      <div
        className={`absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full blur-[50px] pointer-events-none transition-all duration-700 will-change-transform ${isLightMode ? "bg-[#39C69C]/20" : "bg-[#39C69C]/15"
          }`}
      />

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10 w-full relative z-10">
        {/* Header Title */}
        <div className="flex flex-col items-center gap-4 w-full text-center">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 overflow-visible py-2">
            <span className={`font-winterSolace text-3xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.2em] font-extrabold bg-clip-text text-transparent inline-block pb-2 ${isLightMode
                ? "bg-gradient-to-r from-[#163B2E] to-[#0B3E4C]"
                : "bg-gradient-to-r from-[#C08A6E] via-[#B3A9C6] to-[#C9A867]"
              }`}>
              Beyond Our
            </span>
            <div className="py-2 md:py-3.5 px-6 md:px-10 rounded-full shadow-lg flex items-center justify-center bg-[#F6C656] transform hover:scale-105 transition-transform duration-300 overflow-visible">
              <span className="font-winterSolace text-2xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.2em] font-bold text-[#0B0B0C] inline-block pb-1">
                Own Words
              </span>
            </div>
            <span className="font-inter text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-[#F6C656] leading-[1.2em] inline-block pb-1">
              .
            </span>
          </div>
          <p
            className={`font-spaceGrotesk text-base md:text-xl font-light leading-relaxed max-w-[720px] text-center ${isLightMode ? "text-[#2E1640]" : "text-[#E9CDF8]"
              }`}
          >
            Hear from the clinical leaders, researchers, and supporters who have joined hands with The Carcino Foundation.
          </p>
        </div>

        {/* Staggered Testimonial Cards Carousel Container */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: 600,
          }}
        >
          {testimonialsList.map((testimonial, index) => {
            const position = testimonialsList.length % 2
              ? index - (testimonialsList.length + 1) / 2
              : index - testimonialsList.length / 2;
            return (
              <TestimonialCard
                key={testimonial.tempId}
                testimonial={testimonial}
                handleMove={handleMove}
                position={position}
                cardSize={cardSize}
                isLightMode={isLightMode}
              />
            );
          })}

          {/* Nav Controls */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 z-30">
            <button
              onClick={() => handleMove(-1)}
              className={cn(
                "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center text-2xl transition-all rounded-full border-2 shadow-lg hover:scale-110",
                isLightMode
                  ? "bg-white text-[#163B2E] border-[#163B2E] hover:bg-[#163B2E] hover:text-white"
                  : "bg-[#1B1224] text-[#CDA8E8] border-[#CDA8E8] hover:bg-[#CDA8E8] hover:text-[#1B1224]"
              )}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
            <button
              onClick={() => handleMove(1)}
              className={cn(
                "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center text-2xl transition-all rounded-full border-2 shadow-lg hover:scale-110",
                isLightMode
                  ? "bg-white text-[#163B2E] border-[#163B2E] hover:bg-[#163B2E] hover:text-white"
                  : "bg-[#1B1224] text-[#CDA8E8] border-[#CDA8E8] hover:bg-[#CDA8E8] hover:text-[#1B1224]"
              )}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>
        </div>

        {/* Read More Milestones Button */}
        <div className="flex justify-center items-center w-full mt-2">
          <Link
            href="/articles"
            className="flex py-3.5 px-7 items-center gap-2.5 rounded-full glass-btn-secondary w-fit cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <span
              className={`font-spaceGrotesk text-sm font-semibold w-fit ${isLightMode ? "text-[#171717]" : "text-[#FFF]"
                }`}
            >
              Read more community milestones
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 shrink-0"
            >
              <path
                d="M2.91602 7.00006H11.0836M6.99982 11.0839L11.0836 7.00006L6.99982 2.91626"
                stroke={isLightMode ? "#171717" : "#CDA8E8"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
