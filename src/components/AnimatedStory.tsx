"use client";

import { useState } from "react";
import "./AnimatedStory.css";

type AnimatedStoryProps = {
  images?: string[];
  className?: string;
};

const defaultImages = [
  "/assets/story-bg-1.webp",
  "/assets/story-bg-2.webp",
  "/assets/story-bg-3.webp",
];

export default function AnimatedStory({
  images = defaultImages,
  className = "",
}: AnimatedStoryProps) {
  const [isPlaying, setIsPlaying] = useState(true);

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
          {images.map((source, index) => (
            <img
              key={`${source}-${index}`}
              className={`animated-story__slide animated-story__slide--${
                index + 1
              }`}
              src={source}
              alt=""
              fetchPriority={index === 0 ? "high" : "auto"}
            />
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

