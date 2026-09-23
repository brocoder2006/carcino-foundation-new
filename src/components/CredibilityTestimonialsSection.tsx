"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface CredibilityTestimonialsSectionProps {
  isLightMode?: boolean;
}

export default function CredibilityTestimonialsSection({
  isLightMode = false,
}: CredibilityTestimonialsSectionProps) {
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

      // 2. Testimonial Cards Grid Stagger & 3D Tilt
      if (gridRef.current) {
        const cards = Array.from(gridRef.current.children) as HTMLElement[];

        gsap.fromTo(
          cards,
          { opacity: 0, y: 55, scale: 0.94, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.95,
            stagger: 0.14,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: gridRef.current,
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
              rotateX: -y / 20,
              rotateY: x / 20,
              scale: 1.018,
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

  const testimonials = [
    {
      badgeText: "VERIFIED SURVIVOR",
      badgeColor: "#39C69C",
      quote:
        "When I was first diagnosed, I felt completely lost. The 30-day navigator broke down clinical pathways into steps I could actually process. Finding peers here saved my mental health.",
      name: "Sarah Jenkins",
      role: "Survivor, Carcinoid Lung Cancer",
      avatar: "/UserPortrait.png",
    },
    {
      badgeText: "VERIFIED CAREGIVER",
      badgeColor: "#CDA8E8",
      quote:
        "As a caregiver, you're always running on empty. The moderated spaces allowed me to connect with others who understood the silent burden of balancing medicine schedules and emotional support.",
      name: "David Vance",
      role: "Husband & Primary Caregiver",
      avatar: "/UserPortrait(1).png",
    },
    {
      badgeText: "VERIFIED SURVIVOR",
      badgeColor: "#39C69C",
      quote:
        "Having access to oncology networks who specialize specifically in neuroendocrine tumors made all the difference. We didn't have to explain our rare condition every single time.",
      name: "Elena Rostova",
      role: "Survivor, GI-NET",
      avatar: "/UserPortrait(2).png",
    },
    {
      badgeText: "VERIFIED CAREGIVER",
      badgeColor: "#CDA8E8",
      quote:
        "The Survivor Stories podcast series gave my father the courage to discuss his treatment choices openly. Hearing real, detailed recoveries removed the terrifying mystery of what came next.",
      name: "Marcus Brodie",
      role: "Son of survivor, TCF Advocate",
      avatar: "/UserPortrait(3).png",
    },
  ];

  return (
    <section
      id="survivors-section"
      ref={sectionRef}
      className={`w-full py-20 md:py-32 px-6 md:px-[84px] flex flex-col items-center justify-center gap-14 relative z-10 transition-colors duration-500 overflow-hidden ${
        isLightMode
          ? "bg-gradient-to-b from-[#F8F4FA] via-[#F3E8FF]/60 to-[#F8F4FA] text-[#171717]"
          : "bg-gradient-to-b from-[#1B1224] via-[#30253C] to-[#1B1224] text-[#F8F8F8]"
      }`}
    >
      {/* Ambient Gradient Blur Orbs */}
      <div
        className={`absolute top-1/3 left-10 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ${
          isLightMode ? "bg-[#CDA8E8]/35" : "bg-[#8B5CF6]/18"
        }`}
      />
      <div
        className={`absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none transition-all duration-700 ${
          isLightMode ? "bg-[#39C69C]/25" : "bg-[#39C69C]/15"
        }`}
      />

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-14 w-full relative z-10">
        {/* Section Header Title & Subtitle */}
        <div ref={headerRef} className="flex flex-col items-center gap-5 w-full text-center">
          <h2 className="font-winterSolace text-5xl md:text-[96px] leading-[1.05em] bg-gradient-to-r from-[#C08A6E] via-[#B3A9C6] via-[#9DAE8B] to-[#C9A867] bg-clip-text text-transparent w-full text-center">
            trusted paths
          </h2>
          <p
            className={`font-inter text-base md:text-xl font-light leading-relaxed max-w-[720px] text-center ${
              isLightMode ? "text-[#3B2852]" : "text-[#E9CDF8]"
            }`}
          >
            Real stories from our community. We are survivors, caregivers, and medical advisors working hand in hand to ensure no one navigates this diagnosis alone.
          </p>
        </div>

        {/* Testimonial Cards Grid (2x2 Desktop, 1-Col Mobile) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full"
        >
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className={`flex p-7 md:p-8 flex-col items-start gap-6 rounded-3xl border transition-all duration-400 w-full relative overflow-hidden shadow-xl ${
                isLightMode
                  ? "bg-white/85 border-black/10 shadow-purple-900/5 text-[#171717] hover:border-[#F6C656] hover:shadow-[0_15px_40px_rgba(246,198,86,0.25)]"
                  : "bg-[#0B0B0C] border-white/10 backdrop-blur-xl text-[#F8F8F8] hover:border-[#F6C656] hover:shadow-[0_15px_40px_rgba(246,198,86,0.25)]"
              }`}
            >
              {/* Badge & Quote Icon Header */}
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

                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-4 opacity-30 shrink-0"
                >
                  <path
                    d="M10.9393 2.39052C11.2206 2.14048 11.6022 2 12 2H14.25C14.6478 2 15.0294 2.14048 15.3107 2.39052C15.592 2.64057 15.75 2.97971 15.75 3.33333V10C15.75 11.0609 15.2759 12.0783 14.432 12.8284C13.5881 13.5786 12.4435 14 11.25 14C11.0511 14 10.8603 13.9298 10.7197 13.8047C10.579 13.6797 10.5 13.5101 10.5 13.3333V12C10.5 11.8232 10.579 11.6536 10.7197 11.5286C10.8603 11.4036 11.0511 11.3333 11.25 11.3333C11.6478 11.3333 12.0294 11.1929 12.3107 10.9428C12.592 10.6928 12.75 10.3536 12.75 10V9.33333C12.75 9.15652 12.671 8.98695 12.5303 8.86193C12.3897 8.73691 12.1989 8.66667 12 8.66667C11.6022 8.66667 11.2206 8.52619 10.9393 8.27614C10.658 8.02609 10.5 7.68696 10.5 7.33333V3.33333C10.5 2.97971 10.658 2.64057 10.9393 2.39052Z"
                    stroke={isLightMode ? "#171717" : "white"}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2.68934 2.39052C2.97064 2.14048 3.35218 2 3.75 2H6C6.39782 2 6.77936 2.14048 7.06066 2.39052C7.34196 2.64057 7.5 2.97971 7.5 3.33333V10C7.5 11.0609 7.02589 12.0783 6.18198 12.8284C5.33807 13.5786 4.19347 14 3 14C2.80109 14 2.61032 13.9298 2.46967 13.8047C2.32902 13.6797 2.25 13.5101 2.25 13.3333V12C2.25 11.8232 2.32902 11.6536 2.46967 11.5286C2.61032 11.4036 2.80109 11.3333 3 11.3333C3.39782 11.3333 3.77936 11.1929 4.06066 10.9428C4.34196 10.6928 4.5 10.3536 4.5 10V9.33333C4.5 9.15652 4.42098 8.98695 4.28033 8.86193C4.13968 8.73691 3.94891 8.66667 3.75 8.66667C3.35218 8.66667 2.97064 8.52619 2.68934 8.27614C2.40804 8.02609 2.25 7.68696 2.25 7.33333V3.33333C2.25 2.97971 2.40804 2.64057 2.68934 2.39052Z"
                    stroke={isLightMode ? "#171717" : "white"}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Quote Statement */}
              <p
                className={`font-inter text-base md:text-lg font-light leading-relaxed w-full ${
                  isLightMode ? "text-[#3B2852]" : "text-[#D5B0FF]"
                }`}
              >
                &quot;{item.quote}&quot;
              </p>

              {/* User Bio Footer */}
              <div className="flex items-center gap-4 w-full pt-2">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/20 shadow-md">
                  <img
                    src={item.avatar}
                    className="w-full h-full object-cover"
                    alt={item.name}
                  />
                </div>
                <div className="flex flex-col items-start gap-0.5 w-full">
                  <div className="flex items-center gap-1.5 w-full">
                    <span
                      className={`font-inter text-base font-bold ${
                        isLightMode ? "text-[#171717]" : "text-white"
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
                    className={`font-inter text-xs opacity-80 ${
                      isLightMode ? "text-[#4B3267]" : "text-[#D5B0FF]"
                    }`}
                  >
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read More Milestones Button */}
        <div className="flex justify-center items-center w-full mt-4">
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
