"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
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

interface CredibilityTestimonialsSectionProps {
  isLightMode?: boolean;
}

export default function CredibilityTestimonialsSection({
  isLightMode = false,
}: CredibilityTestimonialsSectionProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const glassyBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 45, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Glassy Container & Shoutout Cards One-by-One Text Reveal
      if (glassyBoxRef.current) {
        gsap.fromTo(
          glassyBoxRef.current,
          { opacity: 0, y: 60, scale: 0.95, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: glassyBoxRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const shoutoutCards = Array.from(glassyBoxRef.current.querySelectorAll(".grid > div")) as HTMLElement[];
        shoutoutCards.forEach((card) => {
          const quote = card.querySelector("p");

          if (quote) {
            gsap.fromTo(
              quote,
              { opacity: 0, y: 25, filter: "blur(4px)" },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialShoutouts = [
    {
      id: "dr-soirindhri",
      badgeText: "CLINICAL ONCOLOGIST",
      badgeColor: "#CDA8E8",
      name: "Dr. Soirindhri Banerjee",
      role: "Senior Clinical Fellow, Clinical Oncology",
      quote:
        "Massive shoutout to The Carcino Foundation for allowing me to share my thoughts on cancer treatment today. It was indeed a pleasure to speak to the young bright and talented Rajannya Das and her team.",
      avatar: "/podcasts/episode_2_soirindhri_banerjee.jpg",
      link: "https://x.com/carcinoofficial",
    },
    {
      id: "amelia-corl",
      badgeText: "GEORGETOWN UNIVERSITY",
      badgeColor: "#F6C656",
      name: "Amelia Corl",
      role: "Project Manager @ Georgetown University | Cancer Research",
      quote:
        "So grateful to Rajannya Das with The Carcino Foundation for the opportunity to speak about these important topics!",
      avatar: "/podcasts/episode_3_amelia_corl.jpg",
      link: "https://x.com/carcinoofficial",
    },
    {
      id: "curtis-corl",
      badgeText: "EXECUTIVE RECOGNITION",
      badgeColor: "#C9A867",
      name: "Curtis Corl, MBA, MA",
      role: "Chief Marketing Officer",
      quote:
        "Just viewed it in its entirety. Great insights and the excellent dialogue on these very important topics.",
      avatar: "/UserPortrait.png",
      link: "https://x.com/carcinoofficial",
    },
    {
      id: "julie-cawoski",
      badgeText: "SOCIAL CARE LEADERSHIP",
      badgeColor: "#39C69C",
      name: "Julie Cawoski",
      role: "Former Director of Social Care and Volunteerism",
      quote:
        "What an insightful and positive interview! Thank you both for sharing it with the world!",
      avatar: "/UserPortrait(1).png",
      link: "https://x.com/carcinoofficial",
    },
  ];

  return (
    <section
      id="survivors-section"
      ref={sectionRef}
      className={`w-full py-20 md:py-32 px-4 sm:px-6 md:px-[84px] flex flex-col items-center justify-center gap-14 relative z-10 transition-colors duration-500 overflow-hidden ${
        isLightMode
          ? "bg-[#ECE9E9] text-[#163B2E]"
          : "bg-gradient-to-b from-[#1B1224] via-[#30253C] to-[#1B1224] text-[#F8F8F8]"
      }`}
    >
      {/* Ambient Gradient Blur Orbs */}
      <div
        className={`absolute top-1/3 left-10 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ${
          isLightMode ? "bg-[#F6C656]/25" : "bg-[#F6C656]/18"
        }`}
      />
      <div
        className={`absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none transition-all duration-700 ${
          isLightMode ? "bg-[#39C69C]/25" : "bg-[#39C69C]/15"
        }`}
      />

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 w-full relative z-10">
        {/* Section Header Title & Subtitle */}
        <div ref={headerRef} className="flex flex-col items-center gap-4 w-full text-center">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 overflow-visible">
            <span className={`font-winterSolace text-3xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.15em] font-extrabold bg-clip-text text-transparent inline-block ${
              isLightMode
                ? "bg-gradient-to-r from-[#163B2E] to-[#0B3E4C]"
                : "bg-gradient-to-r from-[#C08A6E] via-[#B3A9C6] to-[#C9A867]"
            }`}>
              Beyond Our
            </span>
            <div className="py-2 md:py-3.5 px-6 md:px-10 rounded-full shadow-lg flex items-center justify-center bg-[#F6C656] transform hover:scale-105 transition-transform duration-300">
              <span className="font-winterSolace text-2xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.1em] font-bold text-[#0B0B0C]">
                Own Words
              </span>
            </div>
            <span className="font-inter text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-[#F6C656] leading-[1.15em] inline-block">
              .
            </span>
          </div>
          <p
            className={`font-inter text-base md:text-xl font-light leading-relaxed max-w-[720px] text-center ${
              isLightMode ? "text-[#2E1640]" : "text-[#E9CDF8]"
            }`}
          >
            Hear from the people, clinical leaders, and global publications that have encountered The Carcino Foundation and its work.
          </p>
        </div>

        {/* Embedded Glassy Box Container */}
        <div
          ref={glassyBoxRef}
          className={`w-full rounded-[36px] border p-6 sm:p-10 md:p-12 flex flex-col gap-10 shadow-[0_25px_80px_rgba(0,0,0,0.35)] relative overflow-hidden backdrop-blur-2xl transition-all duration-500 ${
            isLightMode
              ? "bg-white/80 border-purple-200/80 shadow-purple-900/10 text-[#171717]"
              : "bg-[#0B0B0C]/85 border-white/15 text-[#F8F8F8]"
          }`}
        >
          {/* Inner Specular Refraction Glow */}
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-[#CDA8E8]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[#39C69C]/15 rounded-full blur-[120px] pointer-events-none" />

          {/* Spotlight Feature 1: OncoDaily Banner Card */}
          <div
            className={`flex flex-col lg:flex-row items-center gap-8 rounded-3xl p-6 sm:p-8 border transition-all duration-400 relative overflow-hidden group ${
              isLightMode
                ? "bg-white/90 border-purple-200 shadow-md hover:border-[#39C69C]"
                : "bg-white/[0.04] border-white/10 hover:border-[#39C69C]/60 hover:shadow-[0_15px_40px_rgba(57,198,156,0.15)]"
            }`}
          >
            {/* Banner Thumbnail */}
            <div className="relative w-full lg:w-[420px] h-[220px] sm:h-[260px] rounded-2xl overflow-hidden shrink-0 shadow-lg">
              <img
                src="/podcasts/episode_2_soirindhri_banerjee.jpg"
                alt="OncoDaily Feature - Dr. Soirindhri Banerjee"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-white/90 font-inter text-xs italic">
                  The Carcino Foundation / LinkedIn / OncoDaily
                </span>
              </div>
            </div>

            {/* Feature Content */}
            <div className="flex flex-col items-start gap-4 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="py-1 px-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#39C69C]/15 text-[#39C69C] border border-[#39C69C]/30">
                  ONCODAILY FEATURE
                </span>
                <span
                  className={`text-xs font-medium ${
                    isLightMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Global Oncology Publication
                </span>
              </div>

              <h3
                className={`font-winterSolace text-2xl sm:text-3xl md:text-4xl leading-tight font-bold ${
                  isLightMode ? "text-[#163B2E]" : "text-white"
                }`}
              >
                Soirindhri Banerjee Breaks Down the Complexities of Cancer Treatment – The Carcino Foundation
              </h3>

              <p
                className={`font-googleSansFlex text-sm sm:text-base leading-relaxed font-light ${
                  isLightMode ? "text-[#2E1640]" : "text-[#D5B0FF]"
                }`}
              >
                Global oncology portal OncoDaily featured clinical specialist Dr. Soirindhri Banerjee in an in-depth dialogue with founder Rajannya Das, exploring treatment pathways and patient empowerment.
              </p>

              <a
                href="https://x.com/carcinoofficial?s=20"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 py-2.5 px-6 rounded-full bg-[#39C69C] hover:bg-[#34b68f] text-[#050505] font-bold text-xs flex items-center gap-2 transition-all hover:scale-105 shadow-md"
              >
                <span>Read Feature Story</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Grid of Verified Clinical & Professional Shoutouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {socialShoutouts.map((item) => (
              <motion.div
                key={item.id}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className={`flex p-6 sm:p-7 flex-col justify-between items-start gap-5 rounded-2xl border transition-all duration-400 w-full relative overflow-hidden group hover:-translate-y-1.5 ${
                  isLightMode
                    ? "bg-white/90 border-purple-200/60 shadow-sm hover:border-[#CDA8E8] hover:shadow-lg"
                    : "bg-white/[0.03] border-white/10 hover:border-[#CDA8E8]/50 hover:shadow-[0_12px_35px_rgba(205,168,232,0.15)]"
                }`}
              >
                {/* Badge Header */}
                <div className="flex justify-between items-center w-full">
                  <div
                    className="flex py-1 px-3 items-center gap-1.5 rounded-full border w-fit"
                    style={{
                      borderColor: item.badgeColor,
                      backgroundColor: `${item.badgeColor}15`,
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 shrink-0"
                    >
                      <path
                        d="M9.08343 4.16678C9.27371 5.10066 9.1381 6.07154 8.6992 6.91753C8.26029 7.76352 7.54463 8.43347 6.67156 8.81567C5.79848 9.19786 4.82077 9.26919 3.90147 9.01777C2.98216 8.76635 2.17684 8.20737 1.61979 7.43404C1.06274 6.66072 0.787643 5.7198 0.840369 4.7682C0.893094 3.81659 1.27046 2.91182 1.90953 2.20477C2.5486 1.49772 3.41075 1.03113 4.3522 0.882807C5.29365 0.734483 6.2575 0.913393 7.08301 1.3897M3.74984 4.58325L4.99984 5.83325L9.1665 1.66659"
                        stroke={item.badgeColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span
                      className="font-inter text-[10px] font-bold tracking-wider uppercase"
                      style={{ color: item.badgeColor }}
                    >
                      {item.badgeText}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    LinkedIn
                  </span>
                </div>

                {/* Quote Text */}
                <p
                  className={`font-inter text-sm sm:text-base font-light leading-relaxed w-full italic ${
                    isLightMode ? "text-[#2E1640]" : "text-[#E9CDF8]"
                  }`}
                >
                  &quot;{item.quote}&quot;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 w-full pt-2 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/20 shadow-md">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-0.5 flex-1 overflow-hidden">
                    <div className="flex items-center gap-1.5 w-full">
                      <span
                        className={`font-inter text-sm font-bold truncate ${
                          isLightMode ? "text-[#163B2E]" : "text-white"
                        }`}
                      >
                        {item.name}
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
                          d="M5.24976 6.99943L6.41642 8.1661L8.74976 5.83276M2.2457 5.02782C2.16056 4.64429 2.17363 4.24548 2.28371 3.86835C2.39379 3.49122 2.5973 3.148 2.87539 2.87049C3.15348 2.59299 3.49713 2.39019 3.87449 2.2809C4.25185 2.17161 4.65069 2.15937 5.03403 2.24532C5.24503 1.91533 5.5357 1.64376 5.87926 1.45565C6.22281 1.26754 6.60819 1.16895 6.99987 1.16895C7.39155 1.16895 7.77693 1.26754 8.12048 1.45565C8.46403 1.64376 8.7547 1.91533 8.9657 2.24532C9.34963 2.159 9.74916 2.17118 10.1271 2.28074C10.5051 2.39029 10.8492 2.59365 11.1274 2.87191C11.4057 3.15017 11.6091 3.49428 11.7186 3.87224C11.8282 4.2502 11.8404 4.64972 11.754 5.03365C12.084 5.24465 12.3556 5.53532 12.5437 5.87887C12.7318 6.22243 12.8304 6.60781 12.8304 6.99949C12.8304 7.39117 12.7318 7.77655 12.5437 8.1201C12.3556 8.46365 12.084 8.75432 11.754 8.96532C11.84 9.34867 11.8277 9.74751 11.7185 10.1249C11.6092 10.5022 11.4064 10.8459 11.1289 11.124C10.8514 11.4021 10.5081 11.6056 10.131 11.7156C9.75388 11.8257 9.35506 11.8388 8.97153 11.7537C8.76081 12.0849 8.46991 12.3576 8.12577 12.5466C7.78164 12.7355 7.39538 12.8346 7.00278 12.8346C6.61019 12.8346 6.22393 12.7355 5.87979 12.5466C5.53566 12.3576 5.24476 12.0849 5.03403 11.7537C4.65069 11.8396 4.25185 11.8274 3.87449 11.7181C3.49713 11.6088 3.15348 11.406 2.87539 11.1285C2.5973 10.851 2.39379 10.5077 2.28371 10.1306C2.17363 9.7535 2.16056 9.35468 2.2457 8.97115C1.91318 8.76071 1.63928 8.46959 1.44948 8.12486C1.25968 7.78014 1.16016 7.39301 1.16016 6.99949C1.16016 6.60597 1.25968 6.21884 1.44948 5.87411C1.63928 5.52939 1.91318 5.23826 2.2457 5.02782Z"
                          stroke="#39C69C"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <p
                      className={`font-inter text-xs truncate ${
                        isLightMode ? "text-[#2E1640]" : "text-[#D5B0FF]"
                      }`}
                    >
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Read More Milestones Button */}
        <div className="flex justify-center items-center w-full mt-2">
          <Link
            href="/articles"
            className="flex py-3.5 px-7 items-center gap-2.5 rounded-full glass-btn-secondary w-fit cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <span
              className={`font-inter text-sm font-semibold w-fit ${
                isLightMode ? "text-[#171717]" : "text-[#FFF]"
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
