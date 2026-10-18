"use client";

import { useState, useEffect, useRef } from "react";
import { fetchDjangoPodcasts } from "@/lib/djangoApi";
import { useLanguage } from "@/context/LanguageContext";

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
  embedUrl?: string;
  externalUrl?: string;
}

export default function PodcastSection({ isLightMode = false }: PodcastSectionProps) {
  const { t } = useLanguage();
  const [activeVideoEpisode, setActiveVideoEpisode] = useState<Episode | null>(null);
  const [cmsPodcasts, setCmsPodcasts] = useState<Episode[]>([]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCarcinoCmsPodcasts() {
      try {
        const docs = await fetchDjangoPodcasts();
        if (docs && Array.isArray(docs) && docs.length > 0) {
          const formatted = docs.map((doc: any) => ({
            id: doc.id,
            code: doc.code || "TCF PODCAST",
            title: doc.title || "Untitled Episode",
            desc: doc.description || "",
            cover: doc.cover_image || "/Cover.png",
            videoUrl: doc.external_url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            externalUrl: doc.external_url,
            hasPlayIcon: true,
          }));
          setCmsPodcasts(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch Django podcasts:", err);
      }
    }

    fetchCarcinoCmsPodcasts();
  }, []);


  const episodes: Episode[] = [
    {
      id: "ep1",
      code: "TCF 001",
      title: t("pod_ep1_title"),
      desc: t("pod_ep1_desc"),
      cover: "/podcasts/episode_1_jyotirup_goswami.jpg",
      hasPlayIcon: true,
      videoUrl: "https://www.youtube.com/watch?v=6WDD_M63yHE",
      embedUrl: "https://www.youtube.com/embed/6WDD_M63yHE?si=FW4e9qOKvOv0boR5&autoplay=1",
      externalUrl: "https://www.youtube.com/watch?v=6WDD_M63yHE",
    },
    {
      id: "ep2",
      code: "TCF 002",
      title: t("pod_ep2_title"),
      desc: t("pod_ep2_desc"),
      cover: "/podcasts/episode_2_soirindhri_banerjee.jpg",
      hasPlayIcon: true,
      videoUrl: "https://www.youtube.com/watch?v=ySNu4Mq91HQ",
      embedUrl: "https://www.youtube.com/embed/ySNu4Mq91HQ?si=_P_zIZ_Ip6D2CV92&autoplay=1",
      externalUrl: "https://www.youtube.com/watch?v=ySNu4Mq91HQ",
    },
    {
      id: "ep3",
      code: "TCF 003",
      title: t("pod_ep3_title"),
      desc: t("pod_ep3_desc"),
      cover: "/podcasts/episode_3_amelia_corl.jpg",
      hasPlayIcon: true,
      videoUrl: "https://www.youtube.com/watch?v=q_Uzxgolr-A",
      embedUrl: "https://www.youtube.com/embed/q_Uzxgolr-A?si=eiFiVQiYjTa4MqYf&autoplay=1",
      externalUrl: "https://www.youtube.com/watch?v=q_Uzxgolr-A",
    },
  ];

  const allEpisodes = [...cmsPodcasts, ...episodes];
  // Repeat cards so the carousel has ample content to scroll horizontally across all viewport sizes
  const repeatFactor = Math.max(3, Math.ceil(12 / (allEpisodes.length || 1)));
  const infiniteEpisodes = Array.from({ length: repeatFactor }, () => allEpisodes).flat();

  const handleEpisodeClick = (ep: Episode) => {
    if (ep.externalUrl) {
      window.open(ep.externalUrl, "_blank");
    } else {
      setActiveVideoEpisode(ep);
    }
  };

  const scrollCarousel = (direction: "prev" | "next") => {
    if (trackRef.current) {
      const cardWidth = 304; // 280px + 24px gap
      const scrollAmount = direction === "next" ? cardWidth : -cardWidth;

      // Handle edge wrapping smoothly
      if (direction === "prev" && trackRef.current.scrollLeft <= 20) {
        trackRef.current.scrollLeft = trackRef.current.scrollWidth / 2;
      } else if (
        direction === "next" &&
        trackRef.current.scrollLeft >= trackRef.current.scrollWidth - trackRef.current.clientWidth - 20
      ) {
        trackRef.current.scrollLeft = 0;
      }

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

  const [isDraggingState, setIsDraggingState] = useState(false);
  const isMouseDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Smooth continuous horizontal auto-drift loop (pauses on hover, drag, or active video modal)
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const step = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (
        trackRef.current &&
        !isHoveredRef.current &&
        !isMouseDownRef.current &&
        !activeVideoEpisode
      ) {
        // Drift at ~68px per second (faster automatic scrolling)
        const pixelsToMove = (68 * delta) / 1000;
        trackRef.current.scrollLeft += pixelsToMove;

        // Loop seamlessly back to start when halfway through repeated items
        const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;
        if (trackRef.current.scrollLeft >= maxScroll - 20) {
          trackRef.current.scrollLeft = 0;
        }
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [activeVideoEpisode]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    isMouseDownRef.current = true;
    isDraggingRef.current = false;
    setIsDraggingState(false);
    startXRef.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isMouseDownRef.current = false;
    isHoveredRef.current = false;
    setTimeout(() => {
      isDraggingRef.current = false;
      setIsDraggingState(false);
    }, 80);
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    setTimeout(() => {
      isDraggingRef.current = false;
      setIsDraggingState(false);
    }, 80);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 4) {
      isDraggingRef.current = true;
      setIsDraggingState(true);
    }
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };



  /* Scrollable Marquee Track */
  return (
    <section
      id="podcasts-section"
      ref={sectionRef}
      className={`w-full max-w-full py-16 md:py-20 px-0 flex flex-col items-center justify-center gap-10 relative z-10 transition-colors duration-500 overflow-x-hidden ${isLightMode
          ? "bg-[#ECE9E9] text-[#163B2E]"
          : "bg-[#30253C] text-[#F8F8F8]"
        }`}
    >
      {/* Section-Specific Ambient Gradient Blur Orbs (Optimized) */}
      <div
        className={`absolute -top-20 -right-20 w-[450px] h-[450px] rounded-full blur-[60px] pointer-events-none transition-all duration-700 will-change-transform ${isLightMode ? "bg-[#FF5500]/25" : "bg-[#F43F5E]/18"
          }`}
      />
      <div
        className={`absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full blur-[50px] pointer-events-none transition-all duration-700 will-change-transform ${isLightMode ? "bg-[#FB923C]/30" : "bg-[#D97706]/18"
          }`}
      />
      <div
        className={`absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[50px] pointer-events-none transition-all duration-700 will-change-transform ${isLightMode ? "bg-[#CDA8E8]/35" : "bg-[#C27AFF]/15"
          }`}
      />
      {/* Center Aligned Title, Subtitle & Navigation Buttons */}
      <div
        ref={headerRef}
        className="w-full max-w-6xl px-6 mx-auto flex flex-col items-center justify-center gap-6 text-center"
      >
        <h2 className={`font-syne font-extrabold text-[clamp(1.75rem,7.5vw,5.25rem)] leading-[1.15em] w-full text-center py-2 overflow-visible tracking-tight break-words hyphens-auto ${
          isLightMode
            ? "text-[#163B2E]"
            : "bg-clip-text text-transparent bg-gradient-to-r from-[#C08A6E] via-[#B3A9C6] to-[#9DAE8B]"
        }`}>
          {t("pod_title")}
        </h2>
        <div className="flex flex-col items-center justify-center w-full">
          <p
            className={`font-googleSansFlex text-base md:text-lg leading-7 w-full max-w-[480px] text-center ${isLightMode ? "text-[#2E1640]" : "text-[#E9CDF8]"
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
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isLightMode
                ? "bg-white/80 text-black border border-black/10 hover:bg-[#F6C656] hover:border-[#F6C656] shadow-md hover:scale-110 active:scale-95"
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
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isLightMode
                ? "bg-white/80 text-black border border-black/10 hover:bg-[#F6C656] hover:border-[#F6C656] shadow-md hover:scale-110 active:scale-95"
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
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        className="relative w-full max-w-full overflow-hidden py-4 group/carousel"
      >

        {/* Scrollable & Draggable Track */}
        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onTouchStart={() => {
            isHoveredRef.current = true;
          }}
          onTouchEnd={() => {
            setTimeout(() => {
              isHoveredRef.current = false;
            }, 500);
          }}
          style={{ WebkitOverflowScrolling: "touch" }}
          className={`flex items-stretch gap-6 px-6 md:px-16 py-4 overflow-x-auto scrollbar-none select-none active:cursor-grabbing cursor-grab ${
            isDraggingState ? "scroll-auto" : "scroll-smooth"
          }`}
        >
          {infiniteEpisodes.map((ep, idx) => {
            const blockThemes = [
              {
                bg: "bg-[#E6DEC9]",
                tag: "text-[#5C5243]",
                title: "text-[#1C2925]",
                desc: "text-[#3D3528]",
                btn: "bg-[#1C2925] text-white hover:bg-black",
              },
              {
                bg: "bg-[#F2BA36]",
                tag: "text-[#4A3600]",
                title: "text-[#1C1800]",
                desc: "text-[#3B2E00]",
                btn: "bg-[#1C1800] text-white hover:bg-black",
              },
              {
                bg: "bg-[#E05333]",
                tag: "text-[#FFD6CC]",
                title: "text-white",
                desc: "text-[#FFF5F2]",
                btn: "bg-white text-[#E05333] hover:bg-[#FFF5F2]",
              },
            ];
            const theme = blockThemes[idx % blockThemes.length];

            return (
              <div
                key={`${ep.id}-${idx}`}
                onClick={(e) => {
                  if (isDraggingRef.current) {
                    e.stopPropagation();
                    return;
                  }
                  handleEpisodeClick(ep);
                }}
                className={`flex p-5 flex-col justify-between gap-3 rounded-3xl transition-all duration-300 w-[280px] h-[450px] shrink-0 group cursor-pointer hover:scale-[1.03] shadow-lg ${isLightMode
                    ? `${theme.bg} border-none hover:-translate-y-1.5`
                    : "bg-[#0B0B0C] border border-[rgba(255,255,255,0.10)] hover:border-[#CDA8E8]/70 hover:shadow-[0_16px_40px_rgba(205,168,232,0.25)] hover:-translate-y-1.5"
                  }`}
              >
                <div className="relative w-full h-[190px] shrink-0 rounded-2xl overflow-hidden">
                  <img
                    src={ep.cover}
                    className="w-full h-full object-cover overflow-hidden transition-transform duration-500 group-hover:scale-105"
                    alt={ep.title}
                  />
                </div>

                <div className="flex flex-col gap-2 flex-1 justify-start overflow-hidden">
                  <div className="flex justify-between items-center w-full shrink-0">
                    <p
                      className={`font-googleSansFlex text-[11px] font-extrabold uppercase tracking-wider leading-4 w-fit ${isLightMode ? theme.tag : "text-[#CDA8E8]"
                        }`}
                    >
                      {ep.code}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2.5 w-full shrink-0">
                    <p
                      className={`font-inter text-lg font-extrabold leading-snug line-clamp-2 flex-1 ${isLightMode ? theme.title : "text-[var(--color-surface,#FFF)]"
                        }`}
                    >
                      {ep.title}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEpisodeClick(ep);
                      }}
                      aria-label={`Play ${ep.title}`}
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-md group-hover:scale-110 active:scale-95 cursor-pointer ${isLightMode
                          ? theme.btn
                          : "bg-[#CDA8E8] text-[#160E21] group-hover:bg-white group-hover:text-black"
                        }`}
                    >
                      <svg
                        className="w-3.5 h-3.5 fill-current ml-0.5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>

                  <p
                    className={`font-googleSansFlex text-xs font-normal leading-relaxed line-clamp-3 w-full ${ep.descClass
                        ? ep.descClass
                        : isLightMode
                          ? theme.desc
                          : "text-[#D5B0FF]"
                      }`}
                  >
                    {ep.desc}
                  </p>
                </div>
              </div>
            );
          })}
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
              {activeVideoEpisode.embedUrl ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={activeVideoEpisode.embedUrl}
                  title={activeVideoEpisode.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              ) : (
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
              )}
            </div>

            {/* Modal Footer Description */}
            <div className="p-6 bg-[#0E0E10] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-[#D5B0FF] font-googleSansFlex text-base leading-relaxed max-w-2xl">
                {activeVideoEpisode.desc}
              </p>
              <div className="flex items-center gap-3 shrink-0">
                {activeVideoEpisode.externalUrl && (
                  <a
                    href={activeVideoEpisode.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Watch on YouTube ↗</span>
                  </a>
                )}
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





