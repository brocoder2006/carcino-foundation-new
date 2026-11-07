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
    src: typeof heroPhoto === "string" ? heroPhoto : heroPhoto.src,
    alt: "FinFlare installation at South City International School",
  },
  {
    src: typeof auditoriumPhoto === "string" ? auditoriumPhoto : auditoriumPhoto.src,
    alt: "Students seated together in the auditorium",
  },
  {
    src: typeof selfiePhoto === "string" ? selfiePhoto : selfiePhoto.src,
    alt: "Friends taking a group selfie at FinFlare",
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
          delay: 0.75,
          ease: "power4.out",
        },
      );

      const photoSettings = [
        {
          selector: ".ff-photo-main",
          from: "inset(0% 100% 0% 0%)",
          rotation: 0,
          y: -35,
        },
        {
          selector: ".ff-photo-top",
          from: "inset(100% 0% 0% 0%)",
          rotation: 0,
          y: -65,
        },
        {
          selector: ".ff-photo-bottom",
          from: "inset(0% 0% 100% 0%)",
          rotation: 0,
          y: -40,
        },
      ];

      photoSettings.forEach(({ selector, from, rotation, y }, index) => {
        const photo = gsap.utils.toArray<HTMLElement>(selector)[0];
        if (!photo) return;

        gsap.fromTo(
          photo,
          { clipPath: from, y: 120, rotation },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 1.5,
            ease: "power4.inOut",
            delay: 0.12 + index * 0.14,
          },
        );

        gsap.fromTo(
          photo.querySelector("img"),
          { scale: 1.22 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: photo,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          },
        );

        gsap.to(photo, {
          y,
          ease: "none",
          scrollTrigger: {
            trigger: photo,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
          },
        });
      });

      gsap.to(".ff-orb-one", {
        xPercent: -48,
        yPercent: 70,
        rotation: 70,
        ease: "none",
        scrollTrigger: {
          trigger: collection,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(".ff-orb-two", {
        xPercent: 55,
        yPercent: -45,
        scale: 1.35,
        ease: "none",
        scrollTrigger: {
          trigger: collection,
          start: "top bottom",
          end: "bottom top",
          scrub: 2.5,
        },
      });
    }, galleryRef);

    const moveX = gsap.quickTo(".ff-collection .ff-photo", "x", {
      duration: 1.4,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(".ff-collection .ff-photo", "yPercent", {
      duration: 1.4,
      ease: "power3.out",
    });

    const handlePointerMove = (event: PointerEvent) => {
      if (window.innerWidth < 800) return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      moveX(x * 18);
      moveY(y * 2.5);
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

        <button
          className="ff-photo ff-photo-main"
          type="button"
          onClick={() => setActive(0)}
          aria-label="Open first photograph"
        >
          <img src={photos[0].src} alt={photos[0].alt} />
          <span className="ff-photo-glow" />
        </button>

        <button
          className="ff-photo ff-photo-top"
          type="button"
          onClick={() => setActive(1)}
          aria-label="Open auditorium photograph"
        >
          <img src={photos[1].src} alt={photos[1].alt} />
          <span className="ff-photo-glow" />
        </button>

        <button
          className="ff-photo ff-photo-bottom"
          type="button"
          onClick={() => setActive(2)}
          aria-label="Open group photograph"
        >
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
