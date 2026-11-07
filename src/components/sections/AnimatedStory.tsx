"use client";

import { useState, useEffect } from "react";
import "./AnimatedStory.css";

type StorySlide = {
  id: number;
  image: string;
  lines: string[];
};

const defaultSlides: StorySlide[] = [
  {
    id: 1,
    image: "/assets/story-1.webp",
    lines: ["Cancer was never just", "about cancer."],
  },
  {
    id: 2,
    image: "/assets/story-2.webp",
    lines: ["So, we started", "asking why."],
  },
  {
    id: 3,
    image: "/assets/story-3.webp",
    lines: ["Because", "no one", "changes", "the", "system", "alone."],
  },
];

type AnimatedStoryProps = {
  slides?: StorySlide[];
  images?: string[];
  className?: string;
};

export default function AnimatedStory({
  slides = defaultSlides,
  images,
  className = "",
}: AnimatedStoryProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isSlideTypingDone, setIsSlideTypingDone] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Allow passing raw image URLs array as fallback
  const resolvedSlides: StorySlide[] =
    images && images.length > 0
      ? images.map((src, idx) => defaultSlides[idx] || { id: idx + 1, image: src, lines: [] })
      : slides;

  // Mount check and reduced motion detection
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  // Typewriter effect state machine
  useEffect(() => {
    if (!isMounted || !isPlaying) return;

    const currentSlide = resolvedSlides[activeSlideIndex];
    if (!currentSlide || !currentSlide.lines || currentSlide.lines.length === 0) {
      const timer = setTimeout(() => {
        setActiveSlideIndex((prev) => (prev + 1) % resolvedSlides.length);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setIsSlideTypingDone(false);
      }, 2500);
      return () => clearTimeout(timer);
    }

    // If reduced motion is preferred, cycle slides without typewriter
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setActiveSlideIndex((prev) => (prev + 1) % resolvedSlides.length);
      }, 4000);
      return () => clearTimeout(timer);
    }

    const lines = currentSlide.lines;
    const currentLine = lines[currentLineIndex] ?? "";

    // 1. Typing characters in the active line
    if (currentCharIndex < currentLine.length) {
      // Gentle initial breath (160ms) before typing the very first character of the slide
      const delay = currentCharIndex === 0 && currentLineIndex === 0 ? 160 : 38;
      const timer = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }

    // 2. Line finished typing - pause briefly before starting next line
    if (currentLineIndex < lines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 180);
      return () => clearTimeout(timer);
    }

    // 3. All lines in this slide finished typing
    if (!isSlideTypingDone) {
      setIsSlideTypingDone(true);
    }

    // Hold slide for user to comfortably read the complete statement, then transition to next slide
    const holdDuration = lines.length > 3 ? 2300 : 1900;
    const timer = setTimeout(() => {
      setActiveSlideIndex((prev) => (prev + 1) % resolvedSlides.length);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      setIsSlideTypingDone(false);
    }, holdDuration);

    return () => clearTimeout(timer);
  }, [
    isMounted,
    isPlaying,
    activeSlideIndex,
    currentLineIndex,
    currentCharIndex,
    isSlideTypingDone,
    prefersReducedMotion,
    resolvedSlides,
  ]);

  return (
    <section
      className={`animated-story ${className}`}
      aria-label="Animated story"
    >
      <button
        className={`animated-story__stage ${
          isPlaying ? "" : "animated-story__stage--paused"
        }`}
        type="button"
        onClick={() => setIsPlaying((playing) => !playing)}
        aria-label={isPlaying ? "Pause animation" : "Play animation"}
      >
        <span className="animated-story__slides" aria-hidden="true">
          {resolvedSlides.map((slide, slideIndex) => {
            const isActive = slideIndex === activeSlideIndex;

            return (
              <span
                key={`${slide.image}-${slideIndex}`}
                className={`animated-story__slide animated-story__slide--${slide.id} ${
                  isActive ? "animated-story__slide--active" : ""
                }`}
              >
                {/* Ambient blurred backdrop for mobile/portrait screen coverage */}
                <img
                  className="animated-story__ambient"
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                />
                <span className="animated-story__card">
                  <img
                    className="animated-story__image"
                    src={slide.image}
                    alt=""
                    fetchPriority={slideIndex === 0 ? "high" : "auto"}
                  />
                  {slide.lines && slide.lines.length > 0 && (
                    <span
                      className={`animated-story__overlay animated-story__overlay--${slide.id}`}
                    >
                      <span
                        className={`animated-story__title animated-story__title--${slide.id}`}
                        aria-label={slide.lines.join(" ")}
                      >
                        {slide.lines.map((line, lIdx) => {
                          let visibleText = line;
                          let hiddenText = "";
                          let showCursor = false;

                          if (!isMounted || prefersReducedMotion) {
                            visibleText = line;
                            hiddenText = "";
                            showCursor = false;
                          } else if (isActive) {
                            if (lIdx < currentLineIndex) {
                              visibleText = line;
                              hiddenText = "";
                              showCursor = false;
                            } else if (lIdx === currentLineIndex) {
                              visibleText = line.slice(0, currentCharIndex);
                              hiddenText = line.slice(currentCharIndex);
                              showCursor = true;
                            } else {
                              visibleText = "";
                              hiddenText = line;
                              showCursor = false;
                            }

                            // If all lines in slide are done typing, keep cursor blinking on the last line
                            if (isSlideTypingDone && lIdx === slide.lines.length - 1) {
                              showCursor = true;
                            }
                          } else {
                            // Inactive slide (fading out): maintain full text so it doesn't abruptly disappear during crossfade
                            visibleText = line;
                            hiddenText = "";
                            showCursor = false;
                          }

                          return (
                            <span key={lIdx} className="animated-story__line">
                              <span>{visibleText}</span>
                              {showCursor && (
                                <span
                                  className="animated-story__cursor"
                                  aria-hidden="true"
                                />
                              )}
                              {hiddenText && (
                                <span
                                  className="animated-story__char--hidden"
                                  aria-hidden="true"
                                >
                                  {hiddenText}
                                </span>
                              )}
                            </span>
                          );
                        })}
                      </span>
                    </span>
                  )}
                </span>
              </span>
            );
          })}
        </span>

        <span
          className={`animated-story__play ${
            isPlaying ? "" : "animated-story__play--visible"
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24">
            <path d="M8.3 5.5v13l10-6.5-10-6.5Z" />
          </svg>
        </span>
      </button>
    </section>
  );
}
