"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface DoorEntranceAnimationProps {
  onComplete?: () => void;
}

export default function DoorEntranceAnimation({ onComplete }: DoorEntranceAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const boyFigureRef = useRef<HTMLDivElement>(null);
  const centerSeamRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while doors are opening
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        document.body.style.overflow = "";
        if (onComplete) onComplete();
      },
    });

    // 1. Initial State
    tl.set(leftDoorRef.current, { xPercent: 0 })
      .set(rightDoorRef.current, { xPercent: 0 })
      .set(boyFigureRef.current, { x: 0, opacity: 0, scale: 0.9 })
      .set(centerSeamRef.current, { opacity: 1, scaleY: 1 });

    // 2. Boy Figure entrance slide in at center door seam
    tl.to(boyFigureRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    })
    // 3. Boy figure slides rightward, pulling and opening the sliding doors!
    .to(boyFigureRef.current, {
      x: 180,
      duration: 0.9,
      ease: "power3.inOut",
    }, "+=0.15")
    // 4. Center seam glow fades
    .to(centerSeamRef.current, {
      opacity: 0,
      scaleY: 0,
      duration: 0.4,
      ease: "power2.in",
    }, "-=0.85")
    // 5. Left door slides out to left (-100%), Right door slides out to right (+100%)
    .to(leftDoorRef.current, {
      xPercent: -100,
      duration: 1.1,
      ease: "power4.inOut",
    }, "-=0.8")
    .to(rightDoorRef.current, {
      xPercent: 100,
      duration: 1.1,
      ease: "power4.inOut",
    }, "-=1.1")
    // 6. Boy figure fades out into background as doors fully reveal
    .to(boyFigureRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: "power2.in",
    }, "-=0.4");

  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center overflow-hidden"
    >
      {/* Left Sliding Door Panel */}
      <div
        ref={leftDoorRef}
        className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-[#07050A] via-[#120B1A] to-[#1B1224] border-r border-[#CDA8E8]/30 shadow-2xl flex items-center justify-end pr-8"
      >
        <div className="w-1.5 h-32 rounded-full bg-gradient-to-b from-[#39C69C] via-[#CDA8E8] to-[#F6C656] opacity-70 shadow-[0_0_15px_#CDA8E8]" />
      </div>

      {/* Right Sliding Door Panel */}
      <div
        ref={rightDoorRef}
        className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#07050A] via-[#120B1A] to-[#1B1224] border-l border-[#CDA8E8]/30 shadow-2xl flex items-center justify-start pl-8"
      >
        <div className="w-1.5 h-32 rounded-full bg-gradient-to-b from-[#39C69C] via-[#CDA8E8] to-[#F6C656] opacity-70 shadow-[0_0_15px_#CDA8E8]" />
      </div>

      {/* Center Seam Glow Line */}
      <div
        ref={centerSeamRef}
        className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#CDA8E8] to-transparent z-10 shadow-[0_0_20px_#CDA8E8]"
      />

      {/* Boy Figure Sliding the Door */}
      <div
        ref={boyFigureRef}
        className="relative z-20 flex flex-col items-center gap-3 pointer-events-auto bg-[#1B1224]/90 backdrop-blur-xl border border-[#CDA8E8]/40 p-5 rounded-3xl shadow-[0_20px_60px_rgba(205,168,232,0.35)]"
      >
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Animated Boy Vector Character Graphic */}
          <svg
            width="72"
            height="72"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 transform -scale-x-100"
          >
            {/* Character Head & Hair */}
            <circle cx="32" cy="18" r="10" fill="#CDA8E8" />
            <path d="M22 18C22 12 42 12 42 18" stroke="#39C69C" strokeWidth="3" strokeLinecap="round" />
            {/* Character Torso */}
            <path
              d="M20 40C20 28 44 28 44 40V56H20V40Z"
              fill="#9875C1"
              rx="6"
            />
            {/* Extended Arm Sliding/Pulling the Door */}
            <path
              d="M40 32L58 26"
              stroke="#F6C656"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Hand grasping the door handle */}
            <circle cx="58" cy="26" r="3.5" fill="#39C69C" />
            {/* Legs */}
            <path d="M26 56V64" stroke="#CDA8E8" strokeWidth="4" strokeLinecap="round" />
            <path d="M38 56V64" stroke="#CDA8E8" strokeWidth="4" strokeLinecap="round" />
          </svg>

          {/* Sliding Motion Particles */}
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#39C69C] animate-ping" />
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="font-winterSolace text-lg font-bold bg-gradient-to-r from-[#CDA8E8] via-[#39C69C] to-[#F6C656] bg-clip-text text-transparent">
            Welcome to Carcino
          </span>
          <span className="font-spaceGrotesk text-[11px] font-medium text-[#E9CDF8]/80 tracking-wider uppercase">
            Opening Doors to Care
          </span>
        </div>
      </div>
    </div>
  );
}
