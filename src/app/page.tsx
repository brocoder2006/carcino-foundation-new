"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ArticlesSection from "@/components/ArticlesSection";
import PodcastSection from "@/components/PodcastSection";

export default function CarcinoFoundationLandingPage() {
  const [isLightMode, setIsLightMode] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [isLightMode]);

  useEffect(() => {
    // GSAP Entrance Animations
    const ctx = gsap.context(() => {
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 }
        );
      }

      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollToArticles = () => {
    const section = document.getElementById("articles-gallery");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPodcasts = () => {
    const section = document.getElementById("podcasts-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`flex flex-col items-center w-full max-w-full min-h-screen relative transition-colors duration-500 overflow-x-hidden ${
        isLightMode
          ? "bg-gradient-to-r from-[#F5EAFB] via-[#EFE6F7] to-[#E5D5F5] text-[#171717]"
          : "bg-gradient-to-r from-[#0B0B0C] via-[#171717] to-[#2A1A3F] text-[#F8F8F8]"
      }`}
    >
      {/* Specular Background Refraction Orbs */}
      <div
        className={`absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
          isLightMode ? "bg-[#C27AFF]/30" : "bg-[#C27AFF]/15"
        }`}
      ></div>
      <div
        className={`absolute top-[35%] right-[15%] w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
          isLightMode ? "bg-[#FF7A00]/20" : "bg-[#FF5500]/15"
        }`}
      ></div>

      {/* Dynamic Background Image - Prominent Soft Blur */}
      <img
        src={isLightMode ? "/LightBackgroundImage.jpg" : "/DynamicBackgroundImage.png"}
        className={`absolute top-0 left-0 w-full h-screen object-cover pointer-events-none transition-all duration-700 blur-sm scale-102 ${
          isLightMode ? "opacity-90 brightness-105 contrast-105" : "opacity-75"
        }`}
        alt="Background image"
      />
      <div
        className={`absolute top-[200px] w-full h-[620px] pointer-events-none transition-all duration-500 ${
          isLightMode
            ? "bg-gradient-to-t from-[#f02938]/10 via-[#f02938]/5 to-transparent"
            : "bg-gradient-to-t from-[#cc0d1f]/40 via-[#f02938]/20 to-transparent"
        }`}
      ></div>

      {/* Navigation Header */}
      <header
        ref={navRef}
        className="flex pt-7 pr-6 md:pr-[84px] pb-0 pl-6 md:pl-[84px] justify-between items-center w-full overflow-hidden z-10"
      >
        <div className="flex flex-col items-start w-px h-px overflow-hidden"></div>

        <div className="flex items-center gap-3 w-fit mx-auto">
          <div className="flex p-2 items-center gap-1 rounded-[999px] glass-navbar w-fit h-16 overflow-hidden">
            <div className="flex flex-col items-start w-fit">
              <div className="flex justify-center items-center gap-1 w-fit">
                <div className="flex pt-0 pr-1.5 pb-0 pl-2 flex-col justify-center items-start w-fit">
                  <div className="flex flex-col justify-center items-center w-7 h-7 overflow-hidden">
                    <div className="shrink-0 opacity-100 w-[25px] h-[30px] overflow-hidden relative">
                      <svg
                        width="19"
                        height="28"
                        viewBox="0 0 19 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-100 w-[18px] h-[29px] absolute left-[7px] top-0 "
                      >
                        <path
                          d="M4.84679 6.37826C4.95465 5.44042 5.09643 4.90454 5.80295 3.89256C7.05911 2.36641 8.01902 2.20498 9.66947 1.92746L9.68572 1.92472C12.0038 1.79156 13.1048 2.94563 13.6554 4.21806C14.2059 5.4905 14.1246 7.72467 13.9596 8.92311C13.7946 10.1216 13.1338 13.2621 9.38143 16.3544C10.4101 16.7243 10.5021 16.6656 11.743 16.8536C12.931 15.5664 13.6099 14.6152 15.3214 12.5333C17.033 10.4514 18.0067 7.56191 18.277 5.78643C18.5471 4.01094 18.6102 1.92472 17.1759 0.415554C15.7416 -1.09362 12.9164 -1.34514 11.178 -1.09362C9.43938 -0.842092 6.39697 0.415554 4.28179 2.14666C2.16655 3.87777 1.1814 5.78643 0.39905 8.36088C-0.383298 10.9353 0.0671754 13.0472 1.03651 15.6848C2.6826 19.149 4.70188 21.4995 6.45492 22.6536C8.20795 23.8077 9.43938 24.4291 11.3663 27.7137C13.7422 23.8817 14.6793 22.4375 16.5095 20.2567C15.3214 18.7771 13.7857 17.939 10.7722 17.5194C7.75884 17.0999 6.78858 16.1079 6.22313 16.0843C5.65777 16.0606 5.00617 16.0547 4.80331 15.9955C4.60054 15.9363 4.54411 15.9279 4.38322 15.5664C4.20956 14.9273 4.38322 13.9981 4.38322 13.8649C4.38322 13.7318 4.10795 13.5542 4.10795 13.3767C4.10795 13.1991 4.20054 13.0936 4.39768 12.9919C4.39768 12.9919 3.94858 12.7404 3.94858 12.5333C3.94858 12.3261 4.15134 11.5419 4.10795 11.3644C4.06447 11.1869 3.03581 10.965 3.2242 10.6098C3.41251 10.2547 4.88233 8.43846 5.06411 8.06498C5.24581 7.69147 4.87242 7.26917 4.84679 6.37826Z"
                          fill={isLightMode ? "#171717" : "#F8F8F8"}
                        />
                      </svg>
                      <svg
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-100 w-3 h-[7px] absolute left-0 top-[23px] "
                      >
                        <path
                          d="M10.0111 0C6.66177 2.00625 4.42796 3.1692 1.62262 3.96527L0 7.47187C1.62262 7.35348 7.18593 4.61625 11.5467 1.36125L10.0111 0Z"
                          fill={isLightMode ? "#171717" : "#F8F8F8"}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex pr-0.5 flex-col items-start w-fit">
                  <button className="cursor-pointer text-nowrap flex py-2.5 px-5 justify-center items-center rounded-[999px] glass-btn-primary w-fit">
                    <p className="text-[#0C2822] font-inter text-base font-bold w-fit">
                      Home
                    </p>
                  </button>
                </div>
                <div className="flex pr-0.5 flex-col items-start w-fit">
                  <button className="cursor-pointer text-nowrap flex py-2.5 px-5 justify-center items-center rounded-[999px] glass-nav-item w-fit">
                    <p
                      className={`font-inter text-base font-medium w-fit ${
                        isLightMode ? "text-[#171717]" : "text-[#F8F8F8]"
                      }`}
                    >
                      About
                    </p>
                  </button>
                </div>
                <div className="flex pr-0.5 flex-col items-start w-fit">
                  <button
                    onClick={scrollToArticles}
                    className="cursor-pointer text-nowrap flex py-2.5 px-5 justify-center items-center rounded-[999px] glass-nav-item w-fit"
                  >
                    <p
                      className={`font-inter text-base font-medium w-fit ${
                        isLightMode ? "text-[#171717]" : "text-[#F8F8F8]"
                      }`}
                    >
                      Articles
                    </p>
                  </button>
                </div>
                <div className="flex pr-0.5 flex-col items-start w-fit">
                  <button
                    onClick={scrollToPodcasts}
                    className="cursor-pointer text-nowrap flex py-2.5 px-5 justify-center items-center rounded-[999px] glass-nav-item w-fit"
                  >
                    <p
                      className={`font-inter text-base font-medium w-fit ${
                        isLightMode ? "text-[#171717]" : "text-[#F8F8F8]"
                      }`}
                    >
                      Podcasts
                    </p>
                  </button>
                </div>
                <div className="flex pr-1 flex-col items-start w-fit">
                  <button className="cursor-pointer text-nowrap flex py-2.5 px-5 justify-center items-center rounded-[999px] glass-nav-item w-fit">
                    <p
                      className={`font-inter text-base font-medium w-fit ${
                        isLightMode ? "text-[#171717]" : "text-[#F8F8F8]"
                      }`}
                    >
                      Survivors
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-12 h-12 rounded-full glass-navbar cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {isLightMode ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#171717"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F8F8F8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>
        </div>

        <div className="flex flex-col items-start w-px h-px overflow-hidden"></div>
      </header>

      {/* Main Hero Section */}
      <main className="flex pt-12 pr-6 md:pr-[84px] pb-[72px] pl-6 md:pl-[84px] items-center justify-center gap-16 w-full max-w-7xl mx-auto my-8 overflow-hidden z-10 relative">
        <div ref={heroRef} className="flex flex-col items-start gap-7 w-full max-w-[960px] overflow-hidden">
          <h1 className="shrink-0 text-4xl md:text-6xl font-winterSolace font-bold tracking-tight leading-tight headline-textured">
            Breaking Down <span className="headline-purple-accent">Cancer</span>{" "}
            for <span className="headline-accent">Everyone</span> with pride.
          </h1>
          <p
            className={`font-robotoMono text-lg md:text-xl leading-[1.55em] w-full transition-colors duration-400 ${
              isLightMode ? "text-[#18181B]" : "text-[#F8F8F8] opacity-90"
            }`}
          >
            Carcino Foundation helps people navigate the emotional and practical
            realities of cancer. We work alongside local care teams and
            community organizations so support is easier to find and simpler to
            use.
          </p>
          <div className="flex items-center gap-4 w-fit overflow-hidden pt-2">
            <button
              onClick={scrollToArticles}
              className="flex py-[15px] px-6 items-center gap-2.5 rounded-[999px] glass-btn-primary w-fit overflow-hidden cursor-pointer"
            >
              <span className="text-[#0C2822] font-winterSolace text-sm font-bold w-fit">
                Read Articles
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 overflow-hidden relative"
              >
                <path
                  d="M2.91626 7.00006H11.0839M7.00006 11.0839L11.0839 7.00006L7.00006 2.91626"
                  stroke="#0C2822"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              onClick={scrollToPodcasts}
              className="flex py-[15px] px-6 items-center gap-2.5 rounded-[999px] glass-btn-secondary w-fit overflow-hidden cursor-pointer"
            >
              <span
                className={`font-winterSolace text-sm font-semibold w-fit ${
                  isLightMode ? "text-[#171717]" : "text-[#F8F8F8]"
                }`}
              >
                View podcasts
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 overflow-hidden relative"
              >
                <path
                  d="M2.91626 7.00006H11.0839M7.00006 11.0839L11.0839 7.00006L7.00006 2.91626"
                  stroke={isLightMode ? "#171717" : "#F8F8F8"}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>

      {/* Articles Section Just Beneath Hero Landing */}
      <ArticlesSection isLightMode={isLightMode} />

      {/* Podcast Section Just Beneath Articles Section */}
      <PodcastSection isLightMode={isLightMode} />
    </div>
  );
}
