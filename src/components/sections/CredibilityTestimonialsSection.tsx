"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

const credibilityTestimonials = [
  {
    tempId: 0,
    name: "Dr. Soirindhri Banerjee",
    designation: "Senior Clinical Fellow, Clinical Oncology",
    testimonial: "Massive shoutout to The Carcino Foundation for allowing me to share my thoughts on cancer treatment today. It was indeed a pleasure to speak to the young bright and talented Rajannya Das and her team.",
    by: "Dr. Soirindhri Banerjee, Senior Clinical Fellow, Clinical Oncology",
    imgSrc: "/soirindhri_banerjee_avatar.jpg",
    badge: "CLINICAL ONCOLOGY",
    badgeColor: "#CDA8E8",
    externalUrl: "https://oncodaily.com/voices/soirindhri-banerjee-563365"
  },
  {
    tempId: 1,
    name: "Sneha Ganguly",
    designation: "Clinical Research & Scientific Publishing | Molecular Biology",
    testimonial: "I recently conducted my second mentoring session with The Carcino Foundation focusing on “Literature Review.” A special thank you to The Carcino Foundation for giving me this rare opportunity to mentor and support young learners in understanding the research process.",
    by: "Sneha Ganguly, Clinical Research & Scientific Publishing | Molecular Biology",
    imgSrc: "/sneha_ganguly.jpg",
    badge: "RESEARCH MENTORSHIP",
    badgeColor: "#39C69C"
  },
  {
    tempId: 2,
    name: "Amelia Corl",
    designation: "Project Manager @ Georgetown University | Cancer Research",
    testimonial: "So grateful to Rajannya Das with The Carcino Foundation for the opportunity to speak about these important topics!",
    by: "Amelia Corl, Project Manager @ Georgetown University | Cancer Research",
    imgSrc: "/amelia_corl_avatar.jpg",
    badge: "GEORGETOWN UNIV",
    badgeColor: "#F6C656"
  },
  {
    tempId: 3,
    name: "Dr. Aruni Ghose",
    designation: "Medical Oncologist & Clinical Researcher",
    testimonial: "Solid questions. Didn’t see that coming from you or your team. Left me awestruck.",
    by: "Dr. Aruni Ghose, Medical Oncologist & Clinical Researcher",
    imgSrc: "/tcf-ribbon-clean.png",
    badge: "MEDICAL ONCOLOGY",
    badgeColor: "#CDA8E8"
  },
  {
    tempId: 4,
    name: "Curtis Corl, MBA, MA",
    designation: "Chief Marketing Officer",
    testimonial: "Just viewed it in its entirety. Great insights and the excellent dialogue on these very important topics.",
    by: "Curtis Corl, MBA, MA, Chief Marketing Officer",
    imgSrc: "/curtis_corl.jpg",
    badge: "EXECUTIVE RECOGNITION",
    badgeColor: "#C9A867"
  },
  {
    tempId: 5,
    name: "Julie Cawoski",
    designation: "Former Director of Social Care and Volunteers",
    testimonial: "What an insightful and positive interview! Thank you both for sharing it with the world!",
    by: "Julie Cawoski, Former Director of Social Care and Volunteers",
    imgSrc: "/julie_cawoski.jpg",
    badge: "SOCIAL CARE",
    badgeColor: "#39C69C"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof credibilityTestimonials[0] & { externalUrl?: string };
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

  const handleClick = () => {
    if (isCenter && testimonial.externalUrl) {
      window.open(testimonial.externalUrl, "_blank", "noopener,noreferrer");
    } else {
      handleMove(position);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-7 transition-all duration-500 ease-in-out select-none flex flex-col justify-between overflow-hidden backdrop-blur-xl group",
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

      <div className="flex flex-col gap-3.5">
        {/* Header: Name & Designation (No PFP) */}
        <div className="flex flex-col min-w-0">
          <h4 className={cn(
            "font-syne font-bold text-base sm:text-lg tracking-tight truncate",
            isCenter
              ? "text-white"
              : isLightMode ? "text-[#163B2E]" : "text-[#F8F8F8]"
          )}>
            {testimonial.name}
          </h4>
          <p className={cn(
            "font-spaceGrotesk text-xs sm:text-[13px] leading-tight line-clamp-2 mt-1",
            isCenter
              ? isLightMode ? "text-white/85 font-medium" : "text-[#CDA8E8] font-medium"
              : isLightMode ? "text-[#2E1640]/75" : "text-zinc-400"
          )}>
            {testimonial.designation}
          </p>
        </div>

        {/* Quote text */}
        <p className={cn(
          "font-spaceGrotesk text-xs sm:text-sm md:text-[14.5px] font-normal leading-relaxed tracking-tight line-clamp-5",
          isCenter
            ? "text-white font-medium"
            : isLightMode ? "text-[#163B2E]/90" : "text-zinc-300"
        )}>
          &ldquo;{testimonial.testimonial}&rdquo;
        </p>
      </div>

      {/* Footer / Direct Link */}
      {testimonial.externalUrl && (
        <div className="pt-2.5 border-t border-white/10 mt-1 flex items-center justify-end">
          <a
            href={testimonial.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-xs font-bold text-[#39C69C] hover:text-[#52e4b6] transition-colors flex items-center gap-1 shrink-0 underline decoration-[#39C69C]/50 underline-offset-2"
          >
            Read Feature ↗
          </a>
        </div>
      )}
    </div>
  );
};

interface CredibilityTestimonialsSectionProps {
  isLightMode?: boolean;
}

export default function CredibilityTestimonialsSection({
  isLightMode = false,
}: CredibilityTestimonialsSectionProps) {
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
      const width = window.innerWidth;
      if (width < 640) {
        setCardSize(280);
      } else if (width < 1024) {
        setCardSize(330);
      } else if (width < 1280) {
        setCardSize(310);
      } else {
        setCardSize(350);
      }
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
        : "bg-[#9875C1] text-white"
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
            <span className={`font-syne text-3xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.2em] font-extrabold inline-block pb-2 ${isLightMode
              ? "text-[#163B2E]"
              : "bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] via-[#F8EEF4] to-[#FFFFFF]"
              }`}>
              Beyond Our
            </span>
            <div className="py-2 md:py-3.5 px-6 md:px-10 rounded-full shadow-lg flex items-center justify-center bg-[#F6C656] transform hover:scale-105 transition-transform duration-300 overflow-visible">
              <span className={`font-syne text-2xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.2em] font-bold inline-block pb-1 ${isLightMode ? "text-[#163B2E]" : "text-[#0B0B0C]"
                }`}>
                Own Words
              </span>
            </div>
            <span className="font-inter text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-[#F6C656] leading-[1.2em] inline-block pb-1">

            </span>
          </div>
          <p
            className={`font-spaceGrotesk text-base md:text-xl font-light leading-relaxed max-w-[720px] text-center ${isLightMode ? "text-[#2E1640]" : "text-[#1E112A] font-medium"
              }`}
          >
            Hear from the clinical leaders, researchers, and supporters who have joined hands with The Carcino Foundation.
          </p>
        </div>

        {/* Content Layout: Featured Press Coverage to the Left + Testimonial Tabs Carousel to the Right */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 lg:gap-8 xl:gap-10 w-full mt-2">
          {/* Featured Press Spotlight (Left of Tabs) */}
          <div className="w-full max-w-[420px] lg:w-[350px] xl:w-[390px] shrink-0 flex flex-col justify-center">
            <a
              href="https://oncodaily.com/voices/soirindhri-banerjee-563365"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read OncoDaily feature on Dr. Soirindhri Banerjee and The Carcino Foundation"
              className={cn(
                "group relative flex flex-col justify-between rounded-3xl border-2 p-5 sm:p-6 transition-all duration-300 backdrop-blur-xl overflow-hidden shadow-xl hover:-translate-y-1 hover:shadow-2xl h-full",
                isLightMode
                  ? "bg-white text-[#163B2E] border-[#163B2E]/20 hover:border-[#39C69C]"
                  : "bg-gradient-to-b from-[#2A1F3D]/95 via-[#1E1428]/95 to-[#150D1C]/95 text-white border-[#CDA8E8]/40 hover:border-[#CDA8E8] shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              )}
            >
              {/* Corner accent glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-20"
                style={{
                  background: isLightMode
                    ? "radial-gradient(circle at top right, #39C69C, transparent 70%)"
                    : "radial-gradient(circle at top right, #CDA8E8, transparent 70%)"
                }}
              />

              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-black/10 dark:border-white/10">
                <span className={cn(
                  "font-spaceGrotesk text-xs font-bold tracking-wider uppercase",
                  isLightMode ? "text-[#163B2E]" : "text-white"
                )}>
                  OncoDaily Spotlight
                </span>
                <span className={cn(
                  "font-spaceGrotesk text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-colors flex items-center gap-1",
                  isLightMode
                    ? "border-[#163B2E]/20 text-[#163B2E]/80 group-hover:border-[#39C69C] group-hover:text-[#163B2E]"
                    : "border-[#CDA8E8]/30 text-[#CDA8E8] group-hover:border-[#CDA8E8] group-hover:text-white"
                )}>
                  oncodaily.com <ExternalLink className="w-3 h-3 inline-block" />
                </span>
              </div>

              {/* Image Preview Container */}
              <div className="my-3.5 relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md group-hover:shadow-lg transition-all duration-300 bg-white">
                <img
                  src="/oncodaily_feature.jpg"
                  alt="OncoDaily Feature: Soirindhri Banerjee Breaks Down the Complexities of Cancer Treatment – The Carcino Foundation"
                  className="w-full h-[220px] sm:h-[250px] object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                />
                {/* Subtle gradient overlay at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-spaceGrotesk font-medium">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md">
                    Voices • 1 Min Read
                  </span>
                </div>
              </div>

              {/* Editorial Copy */}
              <div className="flex flex-col gap-1.5 flex-1">
                <h4 className={cn(
                  "font-syne font-bold text-base sm:text-lg leading-snug line-clamp-2 transition-colors",
                  isLightMode
                    ? "text-[#163B2E] group-hover:text-[#39C69C]"
                    : "text-white group-hover:text-[#CDA8E8]"
                )}>
                  Soirindhri Banerjee Breaks Down the Complexities of Cancer Treatment
                </h4>
                <p className={cn(
                  "font-spaceGrotesk text-xs sm:text-[13px] leading-relaxed line-clamp-2 mt-1",
                  isLightMode ? "text-[#2E1640]/75" : "text-zinc-300"
                )}>
                  The Carcino Foundation featured on international oncology media OncoDaily, exploring precision oncology, treatment nuances, and clinical pathways.
                </p>
              </div>

              {/* CTA Button */}
              <div className={cn(
                "mt-4 w-full py-2.5 px-4 rounded-xl font-syne font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md",
                isLightMode
                  ? "bg-[#163B2E] text-white group-hover:bg-[#39C69C] group-hover:text-[#163B2E]"
                  : "bg-[#CDA8E8] text-[#1B1224] group-hover:bg-white group-hover:text-[#1B1224]"
              )}>
                <span>Read Feature on OncoDaily</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          </div>

          {/* Staggered Testimonial Cards Carousel Container ("Tabs") */}
          <div
            className="relative flex-1 w-full min-h-[560px] lg:min-h-[580px] h-[580px] overflow-hidden"
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
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 flex -translate-x-1/2 gap-3 z-30">
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
        </div>
      </div>
    </section>
  );
}
