"use client";

import { useSyncExternalStore } from "react";

export interface ScrollState {
  scrollY: number;
  isScrolled: boolean;
}

function getScrollSnapshot(threshold: number): () => ScrollState {
  return () => {
    if (typeof window === "undefined") {
      return { scrollY: 0, isScrolled: false };
    }
    const y = window.scrollY;
    return {
      scrollY: y,
      isScrolled: y > threshold,
    };
  };
}

export function useScroll(threshold = 30): ScrollState {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("scroll", callback, { passive: true });
      return () => window.removeEventListener("scroll", callback);
    },
    getScrollSnapshot(threshold),
    () => ({ scrollY: 0, isScrolled: false })
  );
}
