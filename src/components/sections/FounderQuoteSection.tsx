"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FounderQuoteSectionProps {
  isLightMode?: boolean;
}

export default function FounderQuoteSection({ isLightMode = false }: FounderQuoteSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Reveal Animation
      if (cardsContainerRef.current) {
        gsap.fromTo(
          [leftCardRef.current, rightCardRef.current],
          { opacity: 0, y: 60, scale: 0.94, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Optimized Interactive 3D Perspective Tilt on Mouse Movement using quickTo
      if (cardsContainerRef.current) {
        const container = cardsContainerRef.current;
        
        const leftRotateXTo = leftCardRef.current ? gsap.quickTo(leftCardRef.current, "rotateX", { duration: 0.4, ease: "power2.out" }) : null;
        const leftRotateYTo = leftCardRef.current ? gsap.quickTo(leftCardRef.current, "rotateY", { duration: 0.4, ease: "power2.out" }) : null;
        const rightRotateXTo = rightCardRef.current ? gsap.quickTo(rightCardRef.current, "rotateX", { duration: 0.4, ease: "power2.out" }) : null;
        const rightRotateYTo = rightCardRef.current ? gsap.quickTo(rightCardRef.current, "rotateY", { duration: 0.4, ease: "power2.out" }) : null;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          if (leftRotateXTo && leftRotateYTo) {
            leftRotateXTo(-y / 25);
            leftRotateYTo(x / 25);
          }
          if (rightRotateXTo && rightRotateYTo) {
            rightRotateXTo(-y / 35);
            rightRotateYTo(x / 35);
          }
        };

        const handleMouseLeave = () => {
          if (leftRotateXTo && leftRotateYTo) {
            leftRotateXTo(0);
            leftRotateYTo(0);
          }
          if (rightRotateXTo && rightRotateYTo) {
            rightRotateXTo(0);
            rightRotateYTo(0);
          }
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="founder-quote-section"
      ref={sectionRef}
      className={`w-full py-20 md:py-32 px-6 md:px-[84px] relative z-10 transition-colors duration-500 overflow-hidden flex justify-center items-center ${
        isLightMode
          ? "bg-[#9875C1] text-white"
          : "bg-[#30253C] text-white"
      }`}
    >
      {/* Specular Ambient Refraction Glow Orbs (Optimized Blur) */}
      <div
        className={`absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[60px] pointer-events-none transition-all duration-700 will-change-transform ${
          isLightMode ? "bg-[#CDA8E8]/35" : "bg-[#8B5CF6]/22"
        }`}
      />
      <div
        className={`absolute bottom-0 right-10 w-[400px] h-[400px] rounded-full blur-[50px] pointer-events-none transition-all duration-700 will-change-transform ${
          isLightMode ? "bg-[#F6C656]/30" : "bg-[#39C69C]/18"
        }`}
      />

      {/* Asymmetric Cards Composition Container */}
      <div
        ref={cardsContainerRef}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 perspective-1000"
      >
        {/* Asymmetric Card 1: Left Founder Avatar Badge Frame */}
        <div
          ref={leftCardRef}
          className={`lg:col-span-4 flex flex-col items-center justify-between p-8 rounded-tl-[48px] rounded-br-[48px] rounded-tr-[16px] rounded-bl-[16px] border backdrop-blur-2xl relative overflow-hidden transition-all duration-500 group shadow-2xl hover:scale-[1.02] transform -rotate-1 lg:-rotate-3 ${
            isLightMode
              ? "bg-white/85 border-purple-200/80 shadow-[0_20px_50px_rgba(152,117,193,0.2)] hover:border-[#39C69C]"
              : "bg-[#0B0B0C]/90 border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.6)] hover:border-[#CDA8E8]/60"
          }`}
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#39C69C]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Founder Portrait Avatar Graphic Container */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-tl-[36px] rounded-br-[36px] rounded-tr-[12px] rounded-bl-[12px] overflow-hidden border-2 border-[#39C69C]/60 shadow-xl mb-6 group-hover:scale-105 transition-transform duration-500">
            <img
              src="/ceo.jpeg"
              alt="Rajannya Das - Founder & CEO"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Founder Metadata Badge */}
          <div className="flex flex-col items-center text-center gap-1.5 w-full">
            <div className="flex items-center gap-2 py-1 px-3 rounded-full border bg-white/5 border-white/15 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#39C69C] animate-pulse" />
              <span
                className={`font-spaceGrotesk text-[11px] font-bold uppercase tracking-widest ${
                  isLightMode ? "text-[#581C87]" : "text-[#CDA8E8]"
                }`}
              >
                FOUNDER &amp; CEO
              </span>
            </div>

            <h3
              className={`font-syne text-2xl font-extrabold tracking-wide ${
                isLightMode ? "text-[#2E1640]" : "text-white"
              }`}
            >
              Rajannya Das
            </h3>
            <p
              className={`font-syne text-xs font-semibold tracking-wider uppercase ${
                isLightMode ? "text-[#2E1640]" : "text-[#D5B0FF]"
              }`}
            >
              The Carcino Foundation
            </p>
          </div>
        </div>

        {/* Asymmetric Card 2: Right Main Quote & Message Card */}
        <div
          ref={rightCardRef}
          className={`lg:col-span-8 flex flex-col items-start justify-center p-8 sm:p-12 rounded-tr-[56px] rounded-bl-[56px] rounded-tl-[20px] rounded-br-[20px] border backdrop-blur-2xl relative overflow-hidden transition-all duration-500 shadow-2xl transform lg:translate-y-4 rotate-1 ${
            isLightMode
              ? "bg-white/85 border-purple-200/80 shadow-[0_25px_60px_rgba(152,117,193,0.2)] hover:border-[#F6C656]"
              : "bg-[#0B0B0C]/90 border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.6)] hover:border-[#CDA8E8]/70"
          }`}
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#CDA8E8]/15 rounded-full blur-3xl pointer-events-none" />


          {/* Main Giant Quote Statement */}
          <blockquote
            className={`font-winterSolace text-2xl sm:text-4xl md:text-[44px] leading-[1.25em] font-extrabold tracking-tight py-2 px-1 overflow-visible inline-block ${
              isLightMode
                ? "text-[#2E1640]"
                : "bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] via-[#E2D4F7] to-[#CDA8E8]"
            }`}
          >
            “The human spirit was built to outlast despair.”
          </blockquote>
        </div>
      </div>
    </section>
  );
}

