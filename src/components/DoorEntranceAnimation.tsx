"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface DoorEntranceAnimationProps {
  onComplete?: () => void;
}

export default function DoorEntranceAnimation({ onComplete }: DoorEntranceAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidingPanelRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scrolling during entrance push sequence
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        document.body.style.overflow = "";
        if (onComplete) onComplete();
      },
    });

    // 1. Initial positions
    tl.set(slidingPanelRef.current, { xPercent: 0 })
      .set(characterRef.current, { x: 0, opacity: 1 });

    // 2. Walking & Pushing step wiggle effect while moving across the screen
    const pushDuration = 1.8;

    // Leg/body exertion bobbing effect
    tl.to(characterRef.current, {
      y: -6,
      repeat: 7,
      yoyo: true,
      duration: 0.12,
      ease: "sine.inOut",
    }, 0);

    // 3. Boy pushes the door panel from left to right (0% -> 100% of viewport width)
    tl.to(slidingPanelRef.current, {
      xPercent: 100,
      duration: pushDuration,
      ease: "power2.inOut",
    }, 0)
    .to(characterRef.current, {
      x: () => window.innerWidth || 1400,
      duration: pushDuration,
      ease: "power2.inOut",
    }, 0)
    // 4. Fade out character as door finishes sliding open
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.3");

  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden bg-transparent"
    >
      {/* Sliding Door Cover Panel (Pushed by the boy) */}
      <div
        ref={slidingPanelRef}
        className="absolute inset-0 w-full h-full bg-[#ECE9E9] text-[#050505] shadow-[20px_0_60px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center border-r-4 border-[#171717]"
      >
        {/* Subdued branding watermark on the door panel being pushed */}
        <div className="flex flex-col items-center gap-4 opacity-15 select-none pointer-events-none">
          <span className="font-winterSolace text-6xl md:text-9xl font-bold tracking-tight text-[#171717]">
            CARCINO
          </span>
          <span className="font-spaceGrotesk text-xl font-bold tracking-[0.3em] uppercase text-[#171717]">
            FOUNDATION
          </span>
        </div>
      </div>

      {/* Pushing Boy Character Assembly */}
      <div
        ref={characterRef}
        className="absolute top-1/2 -translate-y-1/2 left-[-260px] md:left-[-320px] z-30 flex items-center pointer-events-none"
      >
        {/* Illustrated Boy Character (Matching huyml.co Pushing Pose) */}
        <div className="relative w-[280px] md:w-[340px] h-[360px] flex items-center justify-center">
          <svg
            width="340"
            height="360"
            viewBox="0 0 340 360"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
          >
            {/* Exertion / Sweat & Motion Lines */}
            <g opacity="0.85">
              {/* Motion Accent Lines behind character */}
              <path d="M40 120 C 25 120, 15 110, 10 100" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M30 160 C 18 160, 10 150, 5 140" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M45 200 C 30 200, 20 190, 12 180" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Sweat Droplets near head */}
              <path d="M185 85 Q 182 78 186 74 Q 190 78 185 85 Z" fill="#171717" />
              <path d="M198 100 Q 195 93 199 89 Q 203 93 198 100 Z" fill="#171717" />
            </g>

            {/* Back Leg (Left Leg Extended Back for pushing stance) */}
            <g id="back-leg">
              {/* Thigh & Calf */}
              <path
                d="M125 240 L70 290"
                stroke="#171717"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M70 290 L90 325"
                stroke="#171717"
                strokeWidth="20"
                strokeLinecap="round"
              />
              {/* Sock with Stripes */}
              <rect x="78" y="305" width="22" height="20" rx="3" fill="#FFFFFF" stroke="#171717" strokeWidth="2.5" />
              <line x1="78" y1="311" x2="100" y2="311" stroke="#171717" strokeWidth="2" />
              <line x1="78" y1="316" x2="100" y2="316" stroke="#171717" strokeWidth="2" />
              {/* Nike-Style Sneaker */}
              <path
                d="M70 325 L120 325 C125 325 128 328 128 333 L128 338 C128 343 124 345 118 345 L62 345 C58 345 55 340 57 334 L70 325 Z"
                fill="#FFFFFF"
                stroke="#171717"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Swoosh Logo */}
              <path d="M78 334 Q 92 338 112 330 Q 98 341 82 338 Z" fill="#171717" />
            </g>

            {/* Front Leg (Right Leg Bent Forward Pushing Stance) */}
            <g id="front-leg">
              {/* Thigh */}
              <path
                d="M150 240 L175 285"
                stroke="#171717"
                strokeWidth="26"
                strokeLinecap="round"
              />
              {/* Calf */}
              <path
                d="M175 285 L165 330"
                stroke="#171717"
                strokeWidth="22"
                strokeLinecap="round"
              />
              {/* Sock with Stripes */}
              <rect x="154" y="308" width="22" height="20" rx="3" fill="#FFFFFF" stroke="#171717" strokeWidth="2.5" />
              <line x1="154" y1="314" x2="176" y2="314" stroke="#171717" strokeWidth="2" />
              <line x1="154" y1="319" x2="176" y2="319" stroke="#171717" strokeWidth="2" />
              {/* Sneaker */}
              <path
                d="M148 330 L198 330 C204 330 208 333 208 338 L208 343 C208 348 204 350 198 350 L140 350 C136 350 134 344 137 339 L148 330 Z"
                fill="#FFFFFF"
                stroke="#171717"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Swoosh Logo */}
              <path d="M158 339 Q 172 343 192 335 Q 178 346 162 343 Z" fill="#171717" />
            </g>

            {/* Shorts */}
            <path
              d="M115 190 L175 190 L190 245 L145 245 L135 210 L105 245 L85 245 Z"
              fill="#FFFFFF"
              stroke="#171717"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Torso & Floral Short-Sleeve Shirt (Tilted Pushing Leaning Forward) */}
            <g id="torso">
              {/* Main Shirt Body */}
              <path
                d="M120 130 L210 150 L185 205 L105 185 Z"
                fill="#737373"
                stroke="#171717"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Shirt Floral Pattern Flowers */}
              {/* Flower 1 */}
              <g transform="translate(135, 145) scale(0.7)">
                <circle cx="0" cy="-6" r="4" fill="#FFFFFF" />
                <circle cx="6" cy="0" r="4" fill="#FFFFFF" />
                <circle cx="0" cy="6" r="4" fill="#FFFFFF" />
                <circle cx="-6" cy="0" r="4" fill="#FFFFFF" />
                <circle cx="0" cy="0" r="3" fill="#171717" />
              </g>
              {/* Flower 2 */}
              <g transform="translate(165, 160) scale(0.75)">
                <circle cx="0" cy="-6" r="4" fill="#FFFFFF" />
                <circle cx="6" cy="0" r="4" fill="#FFFFFF" />
                <circle cx="0" cy="6" r="4" fill="#FFFFFF" />
                <circle cx="-6" cy="0" r="4" fill="#FFFFFF" />
                <circle cx="0" cy="0" r="3" fill="#171717" />
              </g>
              {/* Flower 3 */}
              <g transform="translate(140, 175) scale(0.65)">
                <circle cx="0" cy="-6" r="4" fill="#FFFFFF" />
                <circle cx="6" cy="0" r="4" fill="#FFFFFF" />
                <circle cx="0" cy="6" r="4" fill="#FFFFFF" />
                <circle cx="-6" cy="0" r="4" fill="#FFFFFF" />
                <circle cx="0" cy="0" r="3" fill="#171717" />
              </g>
              {/* Flower 4 */}
              <g transform="translate(185, 175) scale(0.7)">
                <circle cx="0" cy="-6" r="4" fill="#FFFFFF" />
                <circle cx="6" cy="0" r="4" fill="#FFFFFF" />
                <circle cx="0" cy="6" r="4" fill="#FFFFFF" />
                <circle cx="-6" cy="0" r="4" fill="#FFFFFF" />
                <circle cx="0" cy="0" r="3" fill="#171717" />
              </g>

              {/* Sleeve */}
              <path
                d="M190 145 L225 160 L210 185 L180 170 Z"
                fill="#737373"
                stroke="#171717"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </g>

            {/* Head & Backwards Cap Facing Left */}
            <g id="head">
              {/* Head Profile */}
              <circle cx="170" cy="100" r="28" fill="#FFFFFF" stroke="#171717" strokeWidth="3.5" />

              {/* Glasses & Eye */}
              <circle cx="184" cy="98" r="8" fill="#FFFFFF" stroke="#171717" strokeWidth="3" />
              <circle cx="186" cy="98" r="3" fill="#171717" />
              {/* Ear */}
              <path d="M152 100 C 148 95, 148 107, 153 105" stroke="#171717" strokeWidth="2.5" fill="#FFFFFF" />

              {/* Focused Exertion Mouth */}
              <path d="M188 112 Q 194 114 186 117" stroke="#171717" strokeWidth="3" strokeLinecap="round" />

              {/* Backwards Cap (Visor pointing back to the left) */}
              <path
                d="M142 92 C 145 66, 195 66, 198 92 Z"
                fill="#525252"
                stroke="#171717"
                strokeWidth="3.5"
              />
              {/* Cap Visor pointing backward left */}
              <path
                d="M145 92 Q 115 95 125 106 Q 142 102 148 94 Z"
                fill="#171717"
                stroke="#171717"
                strokeWidth="2"
              />
              {/* Cap Top Button */}
              <circle cx="170" cy="70" r="4" fill="#171717" />
            </g>

            {/* Both Arms Extended Forward Pressed Against the Door Edge */}
            <g id="pushing-arms">
              {/* Wristwatch on Left Arm */}
              <rect x="228" y="152" width="8" height="14" rx="2" fill="#171717" />

              {/* Arm 1 (Under Arm) */}
              <path
                d="M205 162 L250 162 L275 160"
                stroke="#171717"
                strokeWidth="16"
                strokeLinecap="round"
              />

              {/* Arm 2 (Over Arm Pressed Hard against Door Edge) */}
              <path
                d="M210 152 L260 152 L280 150"
                stroke="#171717"
                strokeWidth="18"
                strokeLinecap="round"
              />

              {/* Hands & Palms Pressed Flat against the Door Boundary Line */}
              {/* Palm 1 */}
              <path
                d="M275 142 C275 138, 285 138, 285 152 C285 162, 275 162, 275 142 Z"
                fill="#FFFFFF"
                stroke="#171717"
                strokeWidth="3"
              />
              {/* Palm 2 */}
              <path
                d="M280 148 C280 144, 290 144, 290 158 C290 168, 280 168, 280 148 Z"
                fill="#FFFFFF"
                stroke="#171717"
                strokeWidth="3"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
