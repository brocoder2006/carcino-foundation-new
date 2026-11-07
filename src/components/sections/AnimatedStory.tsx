"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { typewriterAudio } from "@/utils/typewriterAudio";
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
  const sectionRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const isInViewRef = useRef(true);

  // Tracks the last character for which audio has played to ensure 1:1 frame-accurate sync
  const prevCharRef = useRef<{ slide: number; line: number; char: number }>({
    slide: -1,
    line: -1,
    char: -1,
  });

  // Allow passing raw image URLs array as fallback
  const resolvedSlides: StorySlide[] =
    images && images.length > 0
      ? images.map((src, idx) => defaultSlides[idx] || { id: idx + 1, image: src, lines: [] })
      : slides;

  // Mount check, reduced motion detection, and global audio unlock on user gesture
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener("change", handler);

      const unlockAudio = () => {
        typewriterAudio.resume();
      };
      window.addEventListener("pointerdown", unlockAudio, { once: true });
      window.addEventListener("keydown", unlockAudio, { once: true });

      return () => {
        mq.removeEventListener("change", handler);
        window.removeEventListener("pointerdown", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
      };
    }
  }, []);

  // Scroll and visibility detection: automatically stops sound when scrolled down
  useEffect(() => {
    const checkVisibility = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Automatically stop sound if user scrolled down past 120px or hero is leaving viewport
      const isVisible = window.scrollY <= 120 && rect.bottom > window.innerHeight * 0.4;
      isInViewRef.current = isVisible;
      setIsInView(isVisible);
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });

    let observer: IntersectionObserver | null = null;
    if (sectionRef.current && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          const isVisible =
            entry.isIntersecting && entry.intersectionRatio >= 0.35 && window.scrollY <= 120;
          isInViewRef.current = isVisible;
          setIsInView(isVisible);
        },
        { threshold: [0, 0.25, 0.35, 0.5, 0.75] }
      );
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
      if (observer) observer.disconnect();
    };
  }, []);

  // Frame-accurate sound sync: plays keystroke sound at the exact instant each character appears on screen
  useEffect(() => {
    if (!isMounted || !isPlaying || !isInView) return;

    const currentSlide = resolvedSlides[activeSlideIndex];
    if (!currentSlide || !currentSlide.lines) return;

    const currentLine = currentSlide.lines[currentLineIndex] ?? "";

    // Trigger sound only when a new character has just rendered in the DOM
    if (
      currentCharIndex > 0 &&
      currentCharIndex <= currentLine.length &&
      (prevCharRef.current.slide !== activeSlideIndex ||
        prevCharRef.current.line !== currentLineIndex ||
        prevCharRef.current.char !== currentCharIndex)
    ) {
      prevCharRef.current = {
        slide: activeSlideIndex,
        line: currentLineIndex,
        char: currentCharIndex,
      };

      const char = currentLine[currentCharIndex - 1] || "";
      const isSpace = char === " ";
      typewriterAudio.playKeystroke(isSpace);
    }
  }, [
    activeSlideIndex,
    currentLineIndex,
    currentCharIndex,
    isPlaying,
    isMounted,
    isInView,
    resolvedSlides,
  ]);

  // Typewriter progression timer loop
  useEffect(() => {
    if (!isMounted || !isPlaying) return;

    const currentSlide = resolvedSlides[activeSlideIndex];
    if (!currentSlide || !currentSlide.lines || currentSlide.lines.length === 0) {
      const timer = setTimeout(() => {
        setActiveSlideIndex((prev) => (prev + 1) % resolvedSlides.length);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, 2500);
      return () => clearTimeout(timer);
    }

    // If reduced motion is requested, cycle slides normally without typewriter
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setActiveSlideIndex((prev) => (prev + 1) % resolvedSlides.length);
      }, 4000);
      return () => clearTimeout(timer);
    }

    const lines = currentSlide.lines;
    const currentLine = lines[currentLineIndex] ?? "";

    // 1. Still typing characters in the active line
    if (currentCharIndex < currentLine.length) {
      // Opening breath before first character of slide (180ms)
      // Brief pause before first character of a new line (160ms)
      // Normal typing speed between characters (42ms)
      const delay =
        currentCharIndex === 0
          ? currentLineIndex === 0
            ? 180
            : 160
          : 42;

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
      }, 160);
      return () => clearTimeout(timer);
    }

    // 3. All lines in this slide finished typing - hold, ring bell, and transition to next slide!
    const bellTimer = setTimeout(() => {
      if (isInViewRef.current) {
        typewriterAudio.playBell();
      }
    }, 100);

    const holdDuration = lines.length > 3 ? 900 : 700;
    const transitionTimer = setTimeout(() => {
      setActiveSlideIndex((prev) => (prev + 1) % resolvedSlides.length);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
    }, holdDuration);

    return () => {
      clearTimeout(bellTimer);
      clearTimeout(transitionTimer);
    };
  }, [
    isMounted,
    isPlaying,
    activeSlideIndex,
    currentLineIndex,
    currentCharIndex,
    prefersReducedMotion,
    resolvedSlides,
  ]);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = typewriterAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <section
      ref={sectionRef}
      className={`animated-story ${className}`}
      aria-label="Animated story"
    >
      <button
        className={`animated-story__stage ${
          isPlaying ? "" : "animated-story__stage--paused"
        }`}
        type="button"
        onClick={() => {
          typewriterAudio.resume();
          setIsPlaying((playing) => !playing);
        }}
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
                          } else {
                            // Inactive slide (fading out): maintain full text so it doesn't pop away during crossfade
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

        {/* Play/Pause Indicator Center Icon */}
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

      {/* Typewriter Audio Sound Toggle Pill */}
      <button
        type="button"
        className={`animated-story__sound-toggle ${
          isMuted ? "animated-story__sound-toggle--muted" : ""
        }`}
        onClick={handleToggleMute}
        aria-label={isMuted ? "Unmute typewriter sound" : "Mute typewriter sound"}
        title={isMuted ? "Unmute typewriter sound" : "Mute typewriter sound"}
      >
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 shrink-0 opacity-80" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 shrink-0 text-white" />
        )}
        <span className="animated-story__sound-text">
          {isMuted ? "Sound Off" : "Sound On"}
        </span>
      </button>
    </section>
  );
}
