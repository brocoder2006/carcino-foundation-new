"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { client } from "@/sanity/lib/client";
import { createSanityAttribute } from "@/sanity/lib/visualEditing";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PodcastSectionProps {
  isLightMode?: boolean;
}

interface Episode {
  id: string;
  code: string;
  title: string;
  desc: string;
  cover: string;
  hasPlayIcon?: boolean;
  descClass?: string;
  videoUrl?: string;
}

export default function PodcastSection({ isLightMode = false }: PodcastSectionProps) {
  const { t } = useLanguage();
  const [activeVideoEpisode, setActiveVideoEpisode] = useState<Episode | null>(null);
  const [sanityPodcasts, setSanityPodcasts] = useState<Episode[]>([]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchSanityPodcasts() {
      try {
        const docs = await client.fetch(
          `*[_type == "podcast" && !(_id in path("drafts.**"))] | order(_createdAt desc) {
            _id,
            code,
            title,
            desc,
            cover,
            videoUrl,
            "coverImageUrl": coverImage.asset->url,
            "videoFileUrl": videoFile.asset->url
          }`,
          {},
          { useCdn: false }
        );
        if (docs && Array.isArray(docs)) {
          const formatted = docs.map((doc: any) => ({
            id: doc._id,
            code: doc.code || "TCF PODCAST",
            title: doc.title || "Untitled Episode",
            desc: doc.desc || "",
            cover: doc.coverImageUrl || doc.cover || "/Cover.png",
            videoUrl: doc.videoFileUrl || doc.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            hasPlayIcon: true,
          }));
          setSanityPodcasts(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch Sanity podcasts:", err);
      }
    }

    fetchSanityPodcasts();

    const subscription = client
      .listen(`*[_type == "podcast"]`)
      .subscribe(() => {
        fetchSanityPodcasts();
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const episodes: Episode[] = [
    {
      id: "ep1",
      code: "TCF 001",
      title: t("pod_ep1_title"),
      desc: t("pod_ep1_desc"),
      cover: "/Cover.png",
      hasPlayIcon: true,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: "ep2",
      code: "TCF 002",
      title: t("pod_ep2_title"),
      desc: t("pod_ep2_desc"),
      cover: "/Cover(1).png",
      hasPlayIcon: true,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      id: "ep3",
      code: "TCF 003",
      title: t("pod_ep3_title"),
      desc: t("pod_ep3_desc"),
      cover: "/Cover(2).png",
      hasPlayIcon: true,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    {
      id: "ep4",
      code: "TCF 001",
      title: "Navigating Diagnosis",
      desc: "A compassionate guide for the first 30 days after receiving a cancer diagnosis.",
      cover: "/Cover(3).png",
      hasPlayIcon: true,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    },
    {
      id: "ep5",
      code: "TCF 002",
      title: "Caregiver Burnout",
      desc: "Practical strategies for caregivers to maintain their own mental and physical health.",
      cover: "/Cover(4).png",
      hasPlayIcon: true,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    },
    {
      id: "ep6",
      code: "EP 03",
      title: "Survivorship 101",
      desc: "Rebuilding life after treatment: finding new normals and managing long-term side effects.",
      cover: "/Cover(5).png",
      hasPlayIcon: true,
      descClass: "text-[#39C69C]",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylines.mp4",
    },
  ];

  const allEpisodes = [...sanityPodcasts, ...episodes];

  // Duplicate for seamless infinite loop marquee animation
  const infiniteEpisodes = [...allEpisodes, ...allEpisodes];

  const scrollCarousel = (direction: "prev" | "next") => {
    if (trackRef.current) {
      const scrollAmount = direction === "next" ? 340 : -340;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideoEpisode(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="podcasts-section"
      ref={sectionRef}
      className={`w-full max-w-full py-16 md:py-20 px-0 flex flex-col items-center justify-center gap-10 relative z-10 transition-colors duration-500 overflow-x-hidden ${
        isLightMode
          ? "bg-gradient-to-b from-[#F7F2FA] via-[#FFF1F2]/60 to-[#F7F2FA] text-[#171717]"
          : "bg-gradient-to-b from-[#050505] via-[#210912] to-[#050505] text-[#F8F8F8]"
      }`}
    >
      {/* Section-Specific Ambient Gradient Blur Orbs (Sunset Crimson & Rose Amber Theme) */}
      <div
        className={`absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none transition-all duration-700 ${
          isLightMode ? "bg-[#FF5500]/25" : "bg-[#F43F5E]/18"
        }`}
      />
      <div
        className={`absolute bottom-0 -left-20 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
          isLightMode ? "bg-[#FB923C]/30" : "bg-[#D97706]/18"
        }`}
      />
      <div
        className={`absolute top-1/2 left-1/3 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none transition-all duration-700 ${
          isLightMode ? "bg-[#CDA8E8]/35" : "bg-[#C27AFF]/15"
        }`}
      />
      {/* Center Aligned Title, Subtitle & Navigation Buttons */}
      <div
        ref={headerRef}
        className="w-full max-w-6xl px-6 mx-auto flex flex-col items-center justify-center gap-6 text-center"
      >
        <h2 className="font-winterSolace text-6xl md:text-[113px] leading-tight md:leading-[106.88px] bg-gradient-to-r from-[#C08A6E] via-[#B3A9C6] to-[#9DAE8B] bg-clip-text text-transparent w-full text-center">
          {t("pod_title")}{" "}
        </h2>
        <div className="flex flex-col items-center justify-center w-full">
          <p
            className={`font-googleSansFlex text-base md:text-lg leading-7 w-full max-w-[480px] text-center ${
              isLightMode ? "text-[#581C87]" : "text-[#D5B0FF]"
            }`}
          >
            {t("pod_subtitle")}
          </p>
        </div>

        {/* Navigation Control Buttons */}
        <div className="flex items-center justify-center gap-4 pt-2 z-30">
          <button
            onClick={() => scrollCarousel("prev")}
            aria-label="Previous podcasts"
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
              isLightMode
                ? "bg-white/80 text-black border border-black/10 hover:bg-[#CDA8E8] shadow-md hover:scale-110 active:scale-95"
                : "glass-navbar text-white border border-white/20 hover:border-[#CDA8E8] hover:bg-[#CDA8E8] hover:text-black shadow-lg hover:scale-110 active:scale-95"
            }`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            onClick={() => scrollCarousel("next")}
            aria-label="Next podcasts"
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
              isLightMode
                ? "bg-white/80 text-black border border-black/10 hover:bg-[#CDA8E8] shadow-md hover:scale-110 active:scale-95"
                : "glass-navbar text-white border border-white/20 hover:border-[#CDA8E8] hover:bg-[#CDA8E8] hover:text-black shadow-lg hover:scale-110 active:scale-95"
            }`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative w-full max-w-full overflow-hidden py-4 group/carousel"
      >
        {/* Soft edge gradients for seamless appearance */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-16 md:w-32 z-20 pointer-events-none transition-colors duration-500 ${
            isLightMode
              ? "bg-gradient-to-r from-[#F7F2FA] to-transparent"
              : "bg-gradient-to-r from-[#050505] to-transparent"
          }`}
        ></div>
        <div
          className={`absolute right-0 top-0 bottom-0 w-16 md:w-32 z-20 pointer-events-none transition-colors duration-500 ${
            isLightMode
              ? "bg-gradient-to-l from-[#F7F2FA] to-transparent"
              : "bg-gradient-to-l from-[#050505] to-transparent"
          }`}
        ></div>

        {/* Scrollable Marquee Track */}
        <div
          ref={trackRef}
          className="animate-marquee flex items-start gap-6 px-3 overflow-x-auto scrollbar-none scroll-smooth"
        >
          {infiniteEpisodes.map((ep, idx) => (
            <div
              key={`${ep.id}-${idx}`}
              onClick={() => setActiveVideoEpisode(ep)}
              className={`flex p-6 flex-col items-start gap-4 rounded-3xl border transition-all duration-300 w-80 shrink-0 group cursor-pointer ${
                isLightMode
                  ? "bg-white/80 border-black/10 shadow-lg hover:border-[#CDA8E8] hover:shadow-purple-200 hover:-translate-y-2"
                  : "bg-[#0B0B0C] border-[rgba(255,255,255,0.10)] hover:border-[#CDA8E8]/60 hover:shadow-[0_12px_35px_rgba(205,168,232,0.18)] hover:-translate-y-2"
              }`}
            >
              <div className="relative w-full h-[180px] rounded-2xl overflow-hidden">
                <img
                  data-sanity={typeof ep.id === "string" ? createSanityAttribute(ep.id, "podcast", "coverImage") : undefined}
                  src={ep.cover}
                  className="flex flex-col items-start rounded-2xl w-full h-[180px] object-cover overflow-hidden max-w-none transition-transform duration-500 group-hover:scale-105"
                  alt="Cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="ml-1"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start w-full">
                <p
                  data-sanity={typeof ep.id === "string" ? createSanityAttribute(ep.id, "podcast", "code") : undefined}
                  className="text-[var(--color-violet-78,#CDA8E8)] font-googleSansFlex text-sm font-medium leading-5 w-fit"
                >
                  {ep.code}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVideoEpisode(ep);
                  }}
                  aria-label={`Play ${ep.title}`}
                  className="cursor-pointer hover:scale-110 transition-transform"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 overflow-hidden relative"
                  >
                    <path
                      d="M5.26806 3.99832C5.0918 4.30289 4.99904 4.64858 4.99915 5.00046V18.9995C4.99904 19.3514 5.0918 19.6971 5.26806 20.0017C5.44432 20.3063 5.69784 20.5589 6.00302 20.7342C6.3082 20.9095 6.65423 21.0012 7.00618 21C7.35813 20.9988 7.70353 20.9048 8.00752 20.7274L20.009 13.7279C20.3115 13.5517 20.5624 13.2992 20.7367 12.9957C20.9111 12.6921 20.0026 12.3482 21.0023 11.9981C21.002 11.6481 20.9099 11.3043 20.735 11.0011C20.5602 10.6978 20.3088 10.4458 20.006 10.2701L8.00752 3.27257C7.70353 3.09523 7.35813 3.00121 7.00618 3.00001C6.65423 2.99882 6.3082 3.09049 6.00302 3.26577C5.69784 3.44105 5.44432 3.69374 5.26806 3.99832Z"
                      stroke={isLightMode ? "#581C87" : "white"}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <p
                data-sanity={typeof ep.id === "string" ? createSanityAttribute(ep.id, "podcast", "title") : undefined}
                className={`font-inter text-3xl font-bold leading-[30px] w-full ${
                  isLightMode ? "text-[#171717]" : "text-[var(--color-surface,#FFF)]"
                }`}
              >
                {ep.title}
              </p>
              <p
                data-sanity={typeof ep.id === "string" ? createSanityAttribute(ep.id, "podcast", "desc") : undefined}
                className={`font-googleSansFlex text-lg font-light leading-[27px] w-full ${
                  ep.descClass
                    ? ep.descClass
                    : isLightMode
                    ? "text-purple-900"
                    : "text-[#D5B0FF]"
                }`}
              >
                {ep.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Popup Modal */}
      {activeVideoEpisode && (
        <div
          onClick={() => setActiveVideoEpisode(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#0B0B0C] border border-[#CDA8E8]/40 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(194,122,255,0.3)] flex flex-col group"
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-3">
                <span className="py-1 px-3 rounded-full text-xs font-semibold bg-[#CDA8E8]/20 text-[#CDA8E8] border border-[#CDA8E8]/30">
                  {activeVideoEpisode.code}
                </span>
                <h3 className="text-xl font-bold text-white font-inter">
                  {activeVideoEpisode.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideoEpisode(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
              <video
                src={
                  activeVideoEpisode.videoUrl ||
                  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                }
                controls
                autoPlay
                poster={activeVideoEpisode.cover}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-6 bg-[#0E0E10] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-[#D5B0FF] font-googleSansFlex text-base leading-relaxed max-w-2xl">
                {activeVideoEpisode.desc}
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setActiveVideoEpisode(null)}
                  className="py-2.5 px-6 rounded-full glass-btn-primary text-xs font-bold text-[#0C2822] cursor-pointer"
                >
                  Close Player
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}





