"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

type AnimatedGalleryProps = {
  images?: [GalleryImage, GalleryImage, GalleryImage] | GalleryImage[];
};

const DEFAULT_IMAGES: [GalleryImage, GalleryImage, GalleryImage] = [
  {
    src: "/gallery/gallery-1.jpg",
    alt: "The Carcino Foundation team and youth delegates at FinFlare 2025 in the auditorium",
  },
  {
    src: "/gallery/gallery-3.jpg",
    alt: "Carcino Foundation student organizers celebrating together",
  },
  {
    src: "/gallery/gallery-2.jpg",
    alt: "FinFlare 2025 Grand Finale banner at South City International School",
  },
];

function ArrowIcon({ reverse = false }: { reverse?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className={reverse ? "ag-reverse" : ""}
    >
      <path d="M4 16h23M19 8l8 8-8 8" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path d="M7 7l18 18M25 7 7 25" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path d="M12 5H5v7M20 5h7v7M12 27H5v-7M20 27h7v-7" />
    </svg>
  );
}

export default function AnimatedGallery({
  images = DEFAULT_IMAGES,
}: AnimatedGalleryProps) {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const galleryRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const collectionRef = useRef<HTMLElement>(null);

  const galleryImages = images && images.length >= 3 ? images : DEFAULT_IMAGES;

  const nextImage = () => {
    setActiveImage((current) =>
      current === null ? 0 : (current + 1) % galleryImages.length,
    );
  };

  const previousImage = () => {
    setActiveImage((current) =>
      current === null
        ? galleryImages.length - 1
        : (current - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  useEffect(() => {
    if (activeImage === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight") nextImage();
      if (event.key === "ArrowLeft") previousImage();
    };

    document.body.classList.add("ag-locked");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("ag-locked");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage, galleryImages.length]);

  useIsomorphicLayoutEffect(() => {
    if (
      !galleryRef.current ||
      !heroRef.current ||
      !collectionRef.current
    ) {
      return;
    }

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const collection = collectionRef.current;
    const hero = heroRef.current;

    const context = gsap.context(() => {
      const entrance = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
        scrollTrigger: {
          trigger: hero,
          start: "top 80%",
          once: true,
        },
      });

      entrance
        .fromTo(
          ".ag-hero-frame",
          {
            clipPath: "inset(9% 8%)",
            scale: 1.12,
            filter: "blur(10px)",
          },
          {
            clipPath: "inset(0% 0%)",
            scale: 1,
            filter: "blur(0px)",
            duration: 1.8,
          },
        )
        .fromTo(
          ".ag-hero-frame img",
          {
            scale: 1.18,
          },
          {
            scale: 1.04,
            duration: 2.2,
          },
          0,
        )
        .fromTo(
          [".ag-hero-expand", ".ag-scroll-cue"],
          {
            autoAlpha: 0,
            y: 24,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
          },
          1,
        );

      gsap.to(".ag-hero-frame img", {
        yPercent: 18,
        scale: 1.13,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".ag-hero-shade", {
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom 15%",
          scrub: true,
        },
      });

      const frames = [
        {
          selector: ".ag-photo-one",
          clip: "inset(0% 100% 0% 0%)",
          rotation: -1.2,
        },
        {
          selector: ".ag-photo-two",
          clip: "inset(100% 0% 0% 0%)",
          rotation: 2.4,
        },
        {
          selector: ".ag-photo-three",
          clip: "inset(0% 0% 100% 0%)",
          rotation: -3.6,
        },
      ];

      frames.forEach(({ selector, clip, rotation }) => {
        const element =
          galleryRef.current?.querySelector<HTMLElement>(selector);

        if (!element) return;

        gsap.fromTo(
          element,
          {
            clipPath: clip,
            y: 120,
            rotation,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              end: "top 38%",
              scrub: 1,
            },
          },
        );

        const img = element.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            {
              scale: 1.22,
            },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            },
          );
        }
      });

      gsap.to(".ag-orb-one", {
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

      gsap.to(".ag-orb-two", {
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

    const photos = collection.querySelectorAll<HTMLElement>(".ag-photo");
    const moveX = gsap.quickTo(photos, "x", {
      duration: 1.4,
      ease: "power3.out",
    });

    const moveY = gsap.quickTo(photos, "yPercent", {
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

    collection.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    return () => {
      collection.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      context.revert();
    };
  }, []);

  const img0 = galleryImages[0];
  const img1 = galleryImages[1];
  const img2 = galleryImages[2];
  const img3 = galleryImages[3] || galleryImages[0];

  return (
    <section className="ag-gallery w-full" ref={galleryRef} id="gallery-section">
      <section className="ag-hero" ref={heroRef}>
        <div className="ag-hero-frame">
          <img
            src={img0.src}
            alt={img0.alt ?? ""}
          />
        </div>

        <div className="ag-hero-shade" />

        <button
          className="ag-expand ag-hero-expand"
          type="button"
          onClick={() => setActiveImage(0)}
          aria-label="Open first photograph"
        >
          <ExpandIcon />
        </button>

        <a
          className="ag-scroll-cue"
          href="#animated-gallery-images"
          aria-label="View more photographs"
          onClick={(e) => {
            e.preventDefault();
            collectionRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span />
        </a>
      </section>

      <section
        className="ag-collection"
        id="animated-gallery-images"
        ref={collectionRef}
      >
        <div className="ag-orb ag-orb-one" />
        <div className="ag-orb ag-orb-two" />

        <button
          className="ag-photo ag-photo-one"
          type="button"
          onClick={() => setActiveImage(1)}
          aria-label="Open second photograph"
        >
          <img
            src={img1.src}
            alt={img1.alt ?? ""}
          />

          <span className="ag-photo-glow" />

          <span className="ag-expand">
            <ExpandIcon />
          </span>
        </button>

        <button
          className="ag-photo ag-photo-two"
          type="button"
          onClick={() => setActiveImage(2)}
          aria-label="Open third photograph"
        >
          <img
            src={img2.src}
            alt={img2.alt ?? ""}
          />

          <span className="ag-photo-glow" />

          <span className="ag-expand">
            <ExpandIcon />
          </span>
        </button>

        <button
          className="ag-photo ag-photo-three"
          type="button"
          onClick={() => setActiveImage(galleryImages[3] ? 3 : 0)}
          aria-label={`Open ${galleryImages[3] ? "fourth" : "first"} photograph`}
        >
          <img src={img3.src} alt={img3.alt ?? ""} />

          <span className="ag-photo-glow" />

          <span className="ag-expand">
            <ExpandIcon />
          </span>
        </button>
      </section>

      {activeImage !== null && (
        <div
          className="ag-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div className="ag-viewer-wash" />

          <img
            key={activeImage}
            className="ag-viewer-image"
            src={galleryImages[activeImage].src}
            alt={galleryImages[activeImage].alt ?? ""}
          />

          <button
            className="ag-viewer-close"
            type="button"
            onClick={() => setActiveImage(null)}
            aria-label="Close viewer"
          >
            <CloseIcon />
          </button>

          <button
            className="ag-viewer-arrow ag-viewer-arrow-left"
            type="button"
            onClick={previousImage}
            aria-label="Previous photograph"
          >
            <ArrowIcon reverse />
          </button>

          <button
            className="ag-viewer-arrow ag-viewer-arrow-right"
            type="button"
            onClick={nextImage}
            aria-label="Next photograph"
          >
            <ArrowIcon />
          </button>

          <div className="ag-viewer-dots" aria-hidden="true">
            {galleryImages.map((image, index) => (
              <span
                key={`${image.src}-${index}`}
                className={
                  index === activeImage ? "ag-active" : ""
                }
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

