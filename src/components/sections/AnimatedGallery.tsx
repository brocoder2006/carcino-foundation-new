"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroPhoto from "./assets/gallery/finflare-venue.jpg";
import auditoriumPhoto from "./assets/gallery/auditorium-team.jpg";
import selfiePhoto from "./assets/gallery/team-selfie.jpg";
import "./AnimatedGallery.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type GalleryImage = {
  src: string;
  alt?: string;
};

const photos = [
  {
    src: typeof auditoriumPhoto === "string" ? auditoriumPhoto : auditoriumPhoto.src,
    alt: "Students seated together in the auditorium at South City International School",
    tag: "01",
  },
  {
    src: typeof selfiePhoto === "string" ? selfiePhoto : selfiePhoto.src,
    alt: "Students taking a group selfie at FinFlare",
    tag: "02",
  },
  {
    src: typeof heroPhoto === "string" ? heroPhoto : heroPhoto.src,
    alt: "FinFlare installation and stage at South City International School",
    tag: "03",
  },
];

function Arrow({ reverse = false }: { reverse?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className={reverse ? "ff-reverse" : ""}
    >
      <path d="M4 16h23M19 8l8 8-8 8" />
    </svg>
  );
}

function Close() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path d="M7 7l18 18M25 7 7 25" />
    </svg>
  );
}

type AnimateGalleryProps = {
  isLightMode?: boolean;
};

export default function AnimateGallery({
  isLightMode = false,
}: AnimateGalleryProps = {}) {
  const [active, setActive] = useState<number | null>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const collectionRef = useRef<HTMLElement>(null);

  const next = () =>
    setActive((current) => (current === null ? 0 : (current + 1) % photos.length));

  const previous = () =>
    setActive((current) =>
      current === null ? photos.length - 1 : (current - 1 + photos.length) % photos.length,
    );

  useEffect(() => {
    if (active === null) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };

    document.body.classList.add("ff-locked");
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.classList.remove("ff-locked");
      window.removeEventListener("keydown", handleKey);
    };
  }, [active]);

  useIsomorphicLayoutEffect(() => {
    if (
      !galleryRef.current ||
      !collectionRef.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const collection = collectionRef.current;
    const context = gsap.context(() => {
      // 1. Text reveal when scrolled into view
      gsap.fromTo(
        ".ff-collage-title > *",
        {
          autoAlpha: 0,
          y: 28,
          letterSpacing: "0.22em",
        },
        {
          autoAlpha: 1,
          y: 0,
          letterSpacing: "0.04em",
          duration: 1.2,
          stagger: 0.16,
          ease: "power4.out",
          scrollTrigger: {
            trigger: collection,
            start: "top 75%",
          },
        },
      );

      // 2. Sections Entrance: Reveal into the 3-part layout
      const photoSettings = [
        {
          selector: ".ff-photo-top",
          from: "inset(0% 0% 100% 0%)",
        },
        {
          selector: ".ff-photo-bottom",
          from: "inset(100% 0% 0% 0%)",
        },
        {
          selector: ".ff-photo-main",
          from: "inset(0% 0% 0% 100%)",
        },
      ];

      photoSettings.forEach(({ selector, from }, index) => {
        const photo = gsap.utils.toArray<HTMLElement>(selector)[0];
        if (!photo) return;

        gsap.fromTo(
          photo,
          { clipPath: from, opacity: 0.7 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.4,
            ease: "power3.inOut",
            delay: 0.1 + index * 0.12,
            clearProps: "clipPath",
            scrollTrigger: {
              trigger: collection,
              start: "top 80%",
            },
          },
        );

        // Internal Image Scale & Drift Parallax (containers stay firmly locked together with 0 gap)
        const img = photo.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15, yPercent: -4 },
            {
              scale: 1.02,
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: collection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            },
          );
        }
      });

      gsap.to(".ff-orb-one", {
        xPercent: -40,
        yPercent: 60,
        rotation: 60,
        ease: "none",
        scrollTrigger: {
          trigger: collection,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(".ff-orb-two", {
        xPercent: 50,
        yPercent: -40,
        scale: 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: collection,
          start: "top bottom",
          end: "bottom top",
          scrub: 2.5,
        },
      });
    }, galleryRef);

    // Interactive pointer movement: gently shift the images inside the frame
    const moveImgX = gsap.quickTo(".ff-photo img", "x", {
      duration: 1.2,
      ease: "power3.out",
    });
    const moveImgY = gsap.quickTo(".ff-photo img", "y", {
      duration: 1.2,
      ease: "power3.out",
    });

    const handlePointerMove = (event: PointerEvent) => {
      if (window.innerWidth < 800) return;
      const rect = collection.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      moveImgX(x * 14);
      moveImgY(y * 10);
    };

    collection.addEventListener("pointermove", handlePointerMove);

    return () => {
      collection.removeEventListener("pointermove", handlePointerMove);
      context.revert();
    };
  }, []);

  return (
    <main
      className={`ff-gallery ${isLightMode ? "ff-gallery--light" : ""}`}
      ref={galleryRef}
    >
      <section className="ff-collection" id="collection" ref={collectionRef}>
        <div className="ff-orb ff-orb-one" />
        <div className="ff-orb ff-orb-two" />
        <div className="ff-collage-title">
          <h1>FINFLARE 2025</h1>
          <p>social impact partner</p>
        </div>

        {/* Section 1: Top-Left */}
        <button
          className="ff-photo ff-photo-top"
          type="button"
          onClick={() => setActive(0)}
          aria-label="Open auditorium photograph (Section 1)"
        >
          <span className="ff-photo-badge">01</span>
          <img src={photos[0].src} alt={photos[0].alt} />
          <span className="ff-photo-glow" />
        </button>

        {/* Section 2: Bottom-Left */}
        <button
          className="ff-photo ff-photo-bottom"
          type="button"
          onClick={() => setActive(1)}
          aria-label="Open group photograph (Section 2)"
        >
          <span className="ff-photo-badge">02</span>
          <img src={photos[1].src} alt={photos[1].alt} />
          <span className="ff-photo-glow" />
        </button>

        {/* Section 3: Right (Full Height) */}
        <button
          className="ff-photo ff-photo-main"
          type="button"
          onClick={() => setActive(2)}
          aria-label="Open FinFlare venue photograph (Section 3)"
        >
          <span className="ff-photo-badge">03</span>
          <img src={photos[2].src} alt={photos[2].alt} />
          <span className="ff-photo-glow" />
        </button>
      </section>

      {active !== null && (
        <div
          className="ff-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div className="ff-viewer-wash" />
          <img
            key={active}
            className="ff-viewer-image"
            src={photos[active].src}
            alt={photos[active].alt}
          />
          <button
            className="ff-viewer-close"
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close viewer"
          >
            <Close />
          </button>
          <button
            className="ff-viewer-arrow ff-viewer-arrow-left"
            type="button"
            onClick={previous}
            aria-label="Previous photograph"
          >
            <Arrow reverse />
          </button>
          <button
            className="ff-viewer-arrow ff-viewer-arrow-right"
            type="button"
            onClick={next}
            aria-label="Next photograph"
          >
            <Arrow />
          </button>
          <div className="ff-viewer-dots" aria-hidden="true">
            {photos.map((photo, index) => (
              <span
                className={index === active ? "ff-active" : ""}
                key={photo.src}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export { AnimateGallery as AnimatedGallery };
