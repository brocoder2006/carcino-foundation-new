"use client";

import { useState } from "react";
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
    lines: ["CANCER WAS NEVER JUST", "ABOUT CANCER."],
  },
  {
    id: 2,
    image: "/assets/story-2.webp",
    lines: ["SO, WE STARTED", "ASKING WHY."],
  },
  {
    id: 3,
    image: "/assets/story-3.webp",
    lines: ["BECAUSE", "NO ONE", "CHANGES", "THE", "SYSTEM", "ALONE."],
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

  // Allow passing raw image URLs array as fallback
  const resolvedSlides: StorySlide[] = images && images.length > 0
    ? images.map((src, idx) => defaultSlides[idx] || { id: idx + 1, image: src, lines: [] })
    : slides;

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
          {resolvedSlides.map((slide, index) => (
            <span
              key={`${slide.image}-${index}`}
              className={`animated-story__slide animated-story__slide--${slide.id}`}
            >
              <span className="animated-story__card">
                <img
                  className="animated-story__image"
                  src={slide.image}
                  alt=""
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
                {slide.lines && slide.lines.length > 0 && (
                  <span className={`animated-story__overlay animated-story__overlay--${slide.id}`}>
                    <span className={`animated-story__title animated-story__title--${slide.id}`}>
                      {slide.lines.map((line, lIdx) => (
                        <span key={lIdx} className="animated-story__line">
                          {line}
                        </span>
                      ))}
                    </span>
                  </span>
                )}
              </span>
            </span>
          ))}
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

