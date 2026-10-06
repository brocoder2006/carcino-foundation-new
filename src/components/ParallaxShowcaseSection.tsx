"use client";

import React, { useEffect, useRef } from "react";
import firstImage from "../../public/1.jpeg";
import secondImage from "../../public/2.jpg";
import thirdImage from "../../public/3.jpg";
import "./ParallaxShowcaseSection.css";

interface ParallaxShowcaseSectionProps {
  isLightMode?: boolean;
}

const photographs = [
  {
    src: firstImage,
    number: "01",
    title: "A quiet pause",
    detail: "Between one moment and the next",
    alt: "An older man sitting alone on a blue bench",
    position: "50% 48%",
  },
  {
    src: secondImage,
    number: "02",
    title: "In conversation",
    detail: "Stories held in the afternoon light",
    alt: "Two men talking beside a rickshaw in warm sunlight",
    position: "50% 46%",
  },
  {
    src: thirdImage,
    number: "03",
    title: "The day’s work",
    detail: "Light spills into the market",
    alt: "A market worker standing among sacks and newspapers",
    position: "50% 50%",
  },
];

const getImageSrc = (src: unknown): string => {
  if (typeof src === "string") return src;
  if (src && typeof src === "object" && "src" in src) {
    return (src as { src: string }).src;
  }
  return String(src);
};

function GalleryCard({
  photograph,
}: {
  photograph: (typeof photographs)[number];
}) {
  return (
    <figure className="gallery-card">
      <img
        src={getImageSrc(photograph.src)}
        alt={photograph.alt}
        style={{ objectPosition: photograph.position }}
      />
      <div className="gallery-card-shade" aria-hidden="true" />
      <figcaption>
        <span>{photograph.number}</span>
        <div>
          <h2>{photograph.title}</h2>
          <p>{photograph.detail}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function OpposingGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const leftTrackRef = useRef<HTMLDivElement>(null);
  const rightTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frameElement = frameRef.current;
    const leftTrack = leftTrackRef.current;
    const rightTrack = rightTrackRef.current;
    if (!section || !frameElement || !leftTrack || !rightTrack) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      return;
    }

    let frame = 0;
    let currentProgress = 0;
    let targetProgress = 0;
    let initialized = false;

    const render = () => {
      currentProgress += (targetProgress - currentProgress) * 0.12;

      const leftDistance = Math.max(
        0,
        leftTrack.scrollHeight - frameElement.clientHeight
      );
      const rightDistance = Math.max(
        0,
        rightTrack.scrollHeight - frameElement.clientHeight
      );

      leftTrack.style.transform = `translate3d(0, ${-currentProgress * leftDistance}px, 0)`;
      rightTrack.style.transform = `translate3d(0, ${-(1 - currentProgress) * rightDistance}px, 0)`;

      if (Math.abs(targetProgress - currentProgress) > 0.0001) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const scrollDistance = section.offsetHeight - window.innerHeight;
      targetProgress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(1, scrollDistance))
      );

      if (!initialized) {
        currentProgress = targetProgress;
        initialized = true;
      }

      if (!frame) frame = window.requestAnimationFrame(render);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="photographs"
      className="opposing-gallery"
      aria-label="Street photograph gallery"
    >
      <div ref={frameRef} className="opposing-frame">
        <div className="gallery-column gallery-column--left">
          <div ref={leftTrackRef} className="gallery-track">
            {photographs.map((photograph) => (
              <GalleryCard
                key={`left-${photograph.number}`}
                photograph={photograph}
              />
            ))}
          </div>
        </div>

        <div className="gallery-axis" aria-hidden="true">
          <span>Up</span>
          <span className="axis-line" />
          <span>Down</span>
        </div>

        <div className="gallery-column gallery-column--right">
          <div ref={rightTrackRef} className="gallery-track">
            {[...photographs].reverse().map((photograph) => (
              <GalleryCard
                key={`right-${photograph.number}`}
                photograph={photograph}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ParallaxShowcaseSection({
  isLightMode = false,
}: ParallaxShowcaseSectionProps) {
  return (
    <div className={`opposing-gallery-wrapper w-full relative ${isLightMode ? "light" : ""}`}>
      <section className="intro" id="top">
        <p className="eyebrow">Observations in passing</p>
        <h1>
          Life moves.
          <br />
          <em>We look closer.</em>
        </h1>
        <div className="intro-footer">
          <p>
            Three unguarded moments, held briefly in the warmth and shadow of
            the street.
          </p>
          <a href="#photographs" className="scroll-cue">
            <span>Scroll to explore</span>
            <span className="scroll-line" aria-hidden="true" />
          </a>
        </div>
      </section>

      <OpposingGallery />
    </div>
  );
}
