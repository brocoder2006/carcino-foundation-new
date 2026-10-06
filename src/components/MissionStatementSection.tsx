"use client";

import React, { useEffect, useRef } from "react";
import "./MissionStatementSection.css";

interface MissionStatementSectionProps {
  isLightMode?: boolean;
}

const mission =
  "We believe that our generation can redefine cancer. Every life deserves dignity, visibility, and compassionate care — not as a privilege, but as a right. We break down barriers, not just biology.";

export default function MissionStatementSection({
  isLightMode = false,
}: MissionStatementSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const words = wordsRef.current;
    if (!section || !words.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Resting & Active colors based on theme
    const restingColor = isLightMode ? [170, 160, 185] : [75, 62, 95];
    const activeColor = isLightMode ? [126, 34, 206] : [194, 122, 255]; // Glowing Purple
    let frame = 0;

    const render = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = reduceMotion
        ? 1
        : Math.min(1, Math.max(0, -rect.top / distance));

      // Orbital Ball & Motion Graphics Properties
      const angle = progress * Math.PI * 2;
      const dotX = 50 + Math.sin(angle * 1.15) * 34;
      const dotY = 48 + Math.sin(angle * 2.1) * 25;
      const lineScale = Math.sin(Math.min(1, progress * 1.2) * Math.PI);

      section.style.setProperty("--mission-progress", progress.toFixed(4));
      section.style.setProperty("--dot-x", `${dotX.toFixed(2)}%`);
      section.style.setProperty("--dot-y", `${dotY.toFixed(2)}%`);
      section.style.setProperty("--line-scale", Math.max(0.08, lineScale).toFixed(4));
      section.style.setProperty("--orbit-turn", `${progress * 420}deg`);
      section.style.setProperty("--orbit-turn-reverse", `${progress * -294}deg`);
      section.style.setProperty(
        "--orbit-one-opacity",
        (0.15 + progress * 0.55).toFixed(3)
      );
      section.style.setProperty(
        "--orbit-two-opacity",
        (0.55 - progress * 0.3).toFixed(3)
      );
      section.style.setProperty(
        "--portal-opacity",
        (0.25 + progress * 0.45).toFixed(3)
      );
      section.style.setProperty("--capsule-down", `${progress * 34}vh`);
      section.style.setProperty("--capsule-up", `${progress * -28}vh`);

      // Word-by-word color reveal
      words.forEach((word, index) => {
        if (!word) return;
        const wordProgress = Math.min(
          1,
          Math.max(0, progress * (words.length + 5) - index)
        );
        const eased = wordProgress * wordProgress * (3 - 2 * wordProgress);
        const color = restingColor.map((channel, colorIndex) =>
          Math.round(
            channel + (activeColor[colorIndex] - channel) * eased
          )
        );
        word.style.color = `rgb(${color.join(", ")})`;
      });
    };

    const update = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isLightMode]);

  return (
    <section
      ref={sectionRef}
      id="mission-section"
      className={`w-full min-h-[140vh] relative z-10 transition-colors duration-500 overflow-hidden ${
        isLightMode
          ? "bg-gradient-to-br from-[#9875C1] to-[#FCC8DF] text-[#163B2E]"
          : "bg-gradient-to-b from-[#1B1324] via-[#261A34] to-[#1B1324] text-white"
      }`}
      aria-labelledby="mission-heading"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-6 md:px-[84px] max-w-6xl mx-auto py-12 pointer-events-none relative z-10">
        <div className="w-full flex flex-col items-start gap-8 pointer-events-auto relative z-10">
          {/* Mission Kicker Badge */}
          <div className="flex items-center gap-3 py-1.5 px-4 rounded-full border border-[#CDA8E8]/30 bg-[#CDA8E8]/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#CDA8E8] animate-pulse" />
            <p
              id="mission-heading"
              className="font-robotoMono text-xs font-bold uppercase tracking-[0.2em] text-[#CDA8E8]"
            >
              ( Carcino / Our Mission )
            </p>
          </div>

          {/* Mission Statement text word-by-word turning purple on scroll */}
          <p
            className="font-spaceGrotesk text-3xl sm:text-5xl md:text-6xl lg:text-[60px] font-bold tracking-tight leading-[1.25] text-left"
            aria-label={mission}
          >
            {mission.split(" ").map((word, index) => (
              <span
                aria-hidden="true"
                key={`${word}-${index}`}
                ref={(element) => {
                  if (element) wordsRef.current[index] = element;
                }}
                className="inline-block transition-colors duration-150 mr-[0.28em]"
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Orbital Ball & Motion Graphics Layer */}
        <div className="mission-motion" aria-hidden="true">
          <span className="mission-rule" />
          <span className="mission-orbit mission-orbit--one" />
          <span className="mission-orbit mission-orbit--two" />
          <span className="mission-portal">
            <i />
          </span>
          <span className="mission-capsule mission-capsule--one" />
          <span className="mission-capsule mission-capsule--two" />
          <span className="mission-traveler" />
        </div>
      </div>
    </section>
  );
}
