"use client";

import { useEffect, useRef } from "react";
import "./EditorialHeroSection.css";

const PHOTO =
  "https://images.unsplash.com/photo-1647100762439-d29798758d08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5jZXIlMjBzdXJ2aXZvciUyMG1hbiUyMHBvcnRyYWl0JTIwc3RhbmRpbmclMjBob3BlJTIwYXdhcmVuZXNzfGVufDF8fHx8MTc5MTMxNTY4MHww&ixlib=rb-4.1.0&q=90&w=2000";

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 3v13M5 11l5 5 5-5" />
    </svg>
  );
}

export default function EditorialHeroSection() {
  const storyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const story = storyRef.current;
      if (!story) return;

      const rect = story.getBoundingClientRect();
      const distance = story.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      story.style.setProperty("--progress", progress.toFixed(4));
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="w-full relative z-10">
      <section className="editorial-story" id="story" ref={storyRef}>
        <div className="editorial-stage">
          <div
            className="editorial-ambient"
            style={{ backgroundImage: `url(${PHOTO})` }}
          />

          <p className="editorial-side-note editorial-side-note-left">
            Awareness changes outcomes
          </p>
          <p className="editorial-side-note editorial-side-note-right">
            Scroll to understand
          </p>

          <div className="editorial-title title-back" aria-hidden="true">
            <span>Know The Why.</span>
            <span>Find The Gaps.</span>
            <span>Change The System.</span>
          </div>

          <figure className="editorial-portrait">
            <img
              src={PHOTO}
              alt="A man standing in a wide green landscape"
            />
            <figcaption>
              <span>38° 43′ N</span>
              <span>09° 08′ W</span>
            </figcaption>
          </figure>

          <div className="editorial-title editorial-title-front">
            <span>KNOW THE WHY.</span>
            <span>FIND THE GAPS.</span>
            <span>CHANGE THE SYSTEM.</span>
          </div>

          <p className="editorial-hero-subtext">
            From rural cancer care and veterinary oncology to cancer literacy for better detection and outcomes, we turn knowledge into action.
          </p>

          <div className="editorial-chapter editorial-chapter-one">
            <span className="editorial-chapter-number">01</span>
            <p>Every statistic is someone’s life.</p>
          </div>

          <div className="editorial-chapter editorial-chapter-two">
            <span className="editorial-chapter-number">02</span>
            <p>Earlier detection can change the story.</p>
          </div>

          <div className="editorial-progress" aria-hidden="true">
            <span>01</span>
            <i>
              <b />
            </i>
            <span>03</span>
          </div>

          <a className="editorial-scroll-cue" href="#epilogue">
            <span>Scroll to understand</span>
            <Arrow />
          </a>

          <p className="editorial-credit">
            Photograph by Oswald Elsaboath / Unsplash
          </p>
        </div>
      </section>
    </div>
  );
}
