"use client";

import { useEffect, useRef } from "react";
import styles from "./OurVisionSection.module.css";

const IMAGES = [
  "/1.jpeg",
  "/2.jpg",
  "/3.jpg",
  "/img.jpeg",
];

interface NoteItem {
  text: string;
  description?: string;
  top: string;
  left: string;
  rotation: string;
  mobileTop: string;
  mobileLeft?: string;
  mobileRight?: string;
}

const NOTES: NoteItem[] = [
  {
    text: "Cancer Literacy",
    description: "Understand the why. Turning knowledge into earlier action and better outcomes.",
    top: "30%",
    left: "9%",
    rotation: "-3deg",
    mobileTop: "15%",
    mobileLeft: "6%",
  },
  {
    text: "Rural Cancer Care Infrastructure.",
    description: "Identify gaps in rural cancer care and build practical pathways to close them.",
    top: "60%",
    left: "27%",
    rotation: "2deg",
    mobileTop: "30%",
    mobileRight: "6%",
  },
  {
    text: "Veterinary Cancer Care.",
    description: "Extend cancer literacy, love and support to the animals who are part of our families.",
    top: "34%",
    left: "45%",
    rotation: "-2deg",
    mobileTop: "45%",
    mobileLeft: "6%",
  },
  {
    text: "Youth & Medical Community.",
    description: "Upskilling the youth to build stronger communities.",
    top: "58%",
    left: "68%",
    rotation: "3deg",
    mobileTop: "60%",
    mobileRight: "6%",
  },
  {
    text: "For creatives, from self-doubt to creative sovereignty.",
    top: "24%",
    left: "80%",
    rotation: "-3deg",
    mobileTop: "74%",
    mobileLeft: "6%",
  },
];

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(Math.max(value, minimum), maximum);
}

function progressBetween(start: number, end: number, value: number) {
  return clamp((value - start) / (end - start));
}

function easeIn(value: number, power: number) {
  return value ** power;
}

function easeOut(value: number, power: number) {
  return 1 - (1 - value) ** power;
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export default function WhatWeAreBuilding() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const notesRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return;
    }

    let animationFrame = 0;

    function update() {
      animationFrame = 0;

      const section = sectionRef.current;
      const mask = maskRef.current;

      if (!section || !mask) {
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const scrollDistance = section.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) {
        return;
      }

      const scrollProgress = clamp(-sectionRect.top / scrollDistance);

      /*
       * Photograph timeline
       *
       * Converts the overall scroll progress into a value from 0–3.
       * This lets each adjacent pair of images crossfade smoothly.
       */
      const imagePhase = scrollProgress * (IMAGES.length - 1);
      const activeImage = Math.min(
        Math.floor(imagePhase),
        IMAGES.length - 1,
      );
      const imageBlend = imagePhase - activeImage;

      imagesRef.current.forEach((image, index) => {
        if (!image) {
          return;
        }

        let opacity = 0;

        if (index === activeImage) {
          opacity = 1 - imageBlend;
        }

        if (index === activeImage + 1) {
          opacity = imageBlend;
        }

        const depth = index - imagePhase;
        const translateY = depth * 12;
        const scale = 1.08 + Math.abs(depth) * 0.025;

        image.style.opacity = String(opacity);
        image.style.transform = `
          translate3d(0, ${translateY}vh, 0)
          scale(${scale})
        `;
      });

      /*
       * Text-mask zoom
       *
       * The zoom is constrained to a safe texture size so large screens
       * do not cause the SVG to exceed GPU texture limits or break into fragments.
       */
      const maskProgress = easeIn(
        progressBetween(0.05, 0.55, scrollProgress),
        2.5,
      );

      const maxDim = Math.max(
        typeof window !== "undefined" ? window.innerWidth : 1200,
        typeof window !== "undefined" ? window.innerHeight : 800,
      );
      // Keep maximum raster texture dimension well under hardware limits (4800px)
      const safeMaxZoom = Math.min(5.5, Math.max(3.8, 4800 / maxDim));
      const maskScale = lerp(1, safeMaxZoom, maskProgress);

      /*
       * White field fades away near the end of the mask zoom.
       */
      const maskFade = easeOut(
        progressBetween(0.4, 0.56, scrollProgress),
        2,
      );

      if (scrollProgress >= 0.56) {
        // Completely unload mask from GPU compositor tree to prevent tile fragmentation
        mask.style.opacity = "0";
        mask.style.display = "none";
        mask.style.visibility = "hidden";
        mask.style.transform = "none";
      } else {
        mask.style.display = "block";
        mask.style.visibility = "visible";
        mask.style.opacity = String(1 - maskFade);
        mask.style.transform =
          maskProgress > 0
            ? `translate3d(0, 0, 0) scale(${maskScale})`
            : "none";
      }

      /*
       * Notes enter sequentially between 58% and 92% of the timeline.
       */
      const notesStart = 0.58;
      const notesEnd = 0.92;
      const noteDuration = (notesEnd - notesStart) / NOTES.length;

      notesRef.current.forEach((note, index) => {
        if (!note) {
          return;
        }

        const start = notesStart + index * noteDuration;

        const noteProgress = easeOut(
          progressBetween(
            start,
            start + noteDuration * 1.4,
            scrollProgress,
          ),
          2,
        );

        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        const slideOffset = isMobile ? 30 : 80;

        note.style.opacity = String(noteProgress);
        note.style.transform = `
          translate3d(${lerp(slideOffset, 0, noteProgress)}px, 0, 0)
          rotate(${NOTES[index].rotation})
        `;
      });

      /*
       * Hide the scroll prompt shortly after scrolling starts.
       */
      if (hintRef.current) {
        hintRef.current.style.opacity = String(
          1 - clamp(scrollProgress / 0.06),
        );
      }
    }

    function requestUpdate() {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(update);
      }
    }

    update();

    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });

    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="what-we-are-building-title"
    >
      <div className={styles.sticky}>
        <div className={styles.gallery} aria-hidden="true">
          {IMAGES.map((source, index) => (
            <img
              key={source}
              ref={(element) => {
                imagesRef.current[index] = element;
              }}
              className={styles.image}
              src={source}
              alt=""
            />
          ))}
        </div>

        <div className={styles.notes}>
          {NOTES.map((note, index) => (
            <div
              key={note.text}
              ref={(element) => {
                notesRef.current[index] = element;
              }}
              className={styles.note}
              style={
                {
                  "--top": note.top,
                  "--left": note.left,
                  "--m-top": note.mobileTop,
                  "--m-left": note.mobileLeft || "auto",
                  "--m-right": note.mobileRight || "auto",
                } as React.CSSProperties
              }
            >
              <p className={styles.noteTitle}>{note.text}</p>
              {note.description && (
                <p className={styles.noteDesc}>{note.description}</p>
              )}
            </div>
          ))}
        </div>

        <div ref={maskRef} className={styles.mask}>
          <svg
            viewBox="0 0 1000 560"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <mask
                id="what-we-are-building-mask"
                maskUnits="userSpaceOnUse"
                x="-20"
                y="-20"
                width="1040"
                height="600"
              >
                <rect
                  x="-20"
                  y="-20"
                  width="1040"
                  height="600"
                  fill="white"
                />

                {/* Desktop Text */}
                <text
                  className={styles.desktopText}
                  x="500"
                  y="280"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="black"
                  stroke="black"
                  strokeWidth="3"
                  textLength="880"
                  lengthAdjust="spacingAndGlyphs"
                >
                  WHAT WE ARE BUILDING
                </text>

                {/* Mobile Text: 2 lines fitted precisely within mobile portrait viewport */}
                <text
                  className={styles.mobileText}
                  x="500"
                  y="240"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="black"
                  stroke="black"
                  strokeWidth="3"
                >
                  <tspan
                    x="500"
                    dy="-38"
                    textLength="240"
                    lengthAdjust="spacingAndGlyphs"
                  >
                    WHAT WE
                  </tspan>
                  <tspan
                    x="500"
                    dy="76"
                    textLength="250"
                    lengthAdjust="spacingAndGlyphs"
                  >
                    ARE BUILDING
                  </tspan>
                </text>
              </mask>
            </defs>

            <rect
              x="-20"
              y="-20"
              width="1040"
              height="600"
              fill="white"
              mask="url(#what-we-are-building-mask)"
            />
          </svg>
        </div>

        <h2 id="what-we-are-building-title" className={styles.srOnly}>
          What We Are Building
        </h2>

        <div ref={hintRef} className={styles.scrollHint}>
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  );
}