"use client";

import { useEffect, useState } from "react";
import "./EntranceAnimation.css";

const NAME = Array.from("THE CARCINO FOUNDATION");

function Wordmark() {
  return <span className="wordmark">THE CARCINO FOUNDATION</span>;
}

function AnimatedName() {
  return (
    <div className="animated-name">
      {[0, 1].map((row) => (
        <div
          className={`mark-line ${row === 0 ? "mark-line-top" : "mark-line-bottom"}`}
          key={row}
          aria-hidden={row === 0}
        >
          {NAME.map((letter, index) => {
            const isSpace = letter === " ";
            return (
              <span
                className={`mark-letter mark-letter-${index} ${isSpace ? "mark-space" : ""}`}
                style={{ animationDelay: `${index * 0.04}s` }}
                key={`${row}-${index}`}
              >
                {isSpace ? "\u00a0" : letter}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function LoaderGlyph() {
  return (
    <div className="loader-glyph" aria-hidden="true">
      <svg viewBox="0 0 30 30">
        <rect x="1" y="1" width="28" height="28" rx="2" />
        <path d="M8 15h14M15 8l7 7-7 7" />
      </svg>
      <svg viewBox="0 0 30 30">
        <rect x="1" y="1" width="28" height="28" rx="2" />
        <path className="glyph-fill" d="M15 25A10 10 0 0 1 15 5Z" />
      </svg>
      <svg viewBox="0 0 30 30">
        <ellipse cx="15" cy="6" rx="13" ry="4" />
        <ellipse cx="15" cy="15" rx="13" ry="4" />
        <ellipse cx="15" cy="24" rx="13" ry="4" />
      </svg>
    </div>
  );
}

interface EntranceAnimationProps {
  onComplete?: () => void;
}

export default function EntranceAnimation({ onComplete }: EntranceAnimationProps) {
  const [sequence, setSequence] = useState(0);
  const [ready, setReady] = useState(false);
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setComplete(true);
      if (onComplete) onComplete();
      return;
    }

    setReady(false);
    setPreloaderComplete(false);
    setComplete(false);
    document.body.style.overflow = "hidden";

    const readyTimer = window.setTimeout(() => setReady(true), 1700);
    const preloaderTimer = window.setTimeout(
      () => setPreloaderComplete(true),
      3600
    );
    const completeTimer = window.setTimeout(() => {
      setComplete(true);
      document.body.style.overflow = "";
      if (onComplete) onComplete();
    }, 5700);

    return () => {
      window.clearTimeout(readyTimer);
      window.clearTimeout(preloaderTimer);
      window.clearTimeout(completeTimer);
      document.body.style.overflow = "";
    };
  }, [sequence, onComplete]);

  return (
    <>
      {!complete && (
        <div key={sequence} className="entrance-container">
          {/* Top Header - ONLY "THE CARCINO FOUNDATION", NO EXTRA TEXT */}
          <header className="entrance-nav" aria-label="Top Brand Header">
            <Wordmark />
          </header>

          {/* Logo Stage reveals underneath after the split doors open */}
          <div className="logo-stage" aria-label="The Carcino Foundation">
            <div className="logo-orbit logo-orbit-outer" />
            <div className="logo-orbit logo-orbit-inner" />
            <div className="logo-glow" />
            <img
              className="carcino-logo"
              src="/carcino-logo.png"
              alt="The Carcino Foundation"
            />
          </div>

          {/* Entrance Preloader */}
          <div
            className={`entrance ${ready ? "entrance-ready" : ""} ${
              preloaderComplete ? "entrance-complete" : ""
            }`}
            aria-label="Loading"
          >
            <div className="entrance-wordmark">
              <AnimatedName />
              <div className="foundation-initials" aria-hidden="true">
                <span>T</span>
                <span>C</span>
                <span>F</span>
              </div>
            </div>
            <LoaderGlyph />
          </div>
        </div>
      )}

      {/* Replay Intro Button */}
      <button
        className={`replay ${complete ? "replay-visible" : ""}`}
        type="button"
        onClick={() => setSequence((value) => value + 1)}
        aria-label="Replay entrance animation"
      >
        <span />
        Replay intro
      </button>
    </>
  );
}
