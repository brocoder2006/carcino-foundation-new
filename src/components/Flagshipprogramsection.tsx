"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "@/context/AuthContext";

gsap.registerPlugin(ScrollTrigger);

interface FlagshipprogramsectionProps {
  isLightMode?: boolean;
}

export default function Flagshipprogramsection({
  isLightMode = false,
}: FlagshipprogramsectionProps) {
  const { setIsAuthModalOpen } = useAuth();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
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

      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children) as HTMLElement[];
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
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
      ref={sectionRef}
      className={`flex py-[120px] px-6 md:px-[84px] flex-col items-start gap-14 min-w-full overflow-hidden transition-colors duration-400 ${
        isLightMode ? "bg-[#ECE9E9] text-[#171717]" : "bg-[#050505] text-white"
      }`}
    >
      {/* Title & Subtitle */}
      <div ref={headerRef} className="flex flex-col items-center gap-4 w-full">
        <h2 className="font-winterSolace text-[48px] sm:text-[76px] md:text-[96px] lg:text-[113px] leading-tight md:leading-[106px] bg-[linear-gradient(91deg,#C08A6E_0.02%,#B3A9C6_29.99%,#9DAE8B_54.96%,#C9A867_79.93%)] bg-clip-text text-transparent w-full text-center tracking-[-0.0356em] font-normal">
          the carcino pathway
        </h2>
        <div className="flex flex-col items-center w-full">
          <p
            className={`font-googleSansFlex text-base sm:text-lg font-light leading-[27px] w-full max-w-[640px] text-center tracking-[0.01em] ${
              isLightMode ? "text-[#581C87]" : "text-[#D5B0FF]"
            }`}
          >
            A flagship, four-stage integration model designed specifically to
            empower patients, caregivers, and clinical teams navigating
            neuroendocrine cancer.
          </p>
        </div>
      </div>

      {/* 4 Stage Cards Grid */}
      <div
        ref={cardsRef}
        className="flex flex-wrap lg:flex-nowrap justify-center items-stretch gap-6 w-full"
      >
        {/* Card 01 */}
        <div
          className={`flex p-6 flex-col items-start gap-4 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl w-full sm:w-[280px] lg:w-[300px] overflow-hidden ${
            isLightMode
              ? "bg-white/80 border-black/10 shadow-lg"
              : "bg-[#0B0B0C] border-[rgba(255,255,255,0.10)]"
          }`}
        >
          <img
            src="/CoverImage.png"
            className="flex flex-col items-start rounded-2xl w-full h-[180px] object-cover overflow-hidden max-w-none"
            alt="Clinical Navigation"
          />
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 w-fit">
              <p
                className={`font-inter text-xs font-bold w-fit ${
                  isLightMode
                    ? "text-gray-400"
                    : "text-[rgba(255,255,255,0.30)]"
                }`}
              >
                01
              </p>
              <p
                className={`font-googleSansFlex text-sm font-medium w-fit tracking-[0.01em] ${
                  isLightMode ? "text-[#7E22CE]" : "text-[#CDA8E8]"
                }`}
              >
                TCF PATHWAY
              </p>
            </div>
            <div
              className={`flex flex-col justify-center items-center rounded-2xl w-8 h-8 ${
                isLightMode ? "bg-gray-100" : "bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 w-4 h-4 overflow-hidden relative"
              >
                <g clipPath="url(#clip0_247_1273)">
                  <path
                    d="M8.00021 14.6672C11.6824 14.6672 14.6674 11.6822 14.6674 7.99996C14.6674 4.31777 11.6824 1.33276 8.00021 1.33276C4.31801 1.33276 1.33301 4.31777 1.33301 7.99996C1.33301 11.6822 4.31801 14.6672 8.00021 14.6672Z"
                    stroke={isLightMode ? "#171717" : "white"}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_247_1273">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <p
              className={`font-inter text-[22px] font-bold leading-7 w-full ${
                isLightMode ? "text-[#171717]" : "text-[#FFF]"
              }`}
            >
              Clinical Navigation
            </p>
            <p
              className={`font-googleSansFlex text-sm font-light leading-[21px] w-full tracking-[0.0129em] ${
                isLightMode ? "text-gray-600" : "text-[#D5B0FF]"
              }`}
            >
              Demystify complex pathology reports and establish a verified,
              structured diagnostic roadmap.
            </p>
          </div>
        </div>

        {/* Card 02 */}
        <div
          className={`flex p-6 flex-col items-start gap-4 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl w-full sm:w-[280px] lg:w-[300px] overflow-hidden ${
            isLightMode
              ? "bg-white/80 border-black/10 shadow-lg"
              : "bg-[#0B0B0C] border-[rgba(255,255,255,0.10)]"
          }`}
        >
          <img
            src="/CoverImage(1).png"
            className="flex flex-col items-start rounded-2xl w-full h-[180px] object-cover overflow-hidden max-w-none"
            alt="Integrative Care"
          />
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 w-fit">
              <p
                className={`font-inter text-xs font-bold w-fit ${
                  isLightMode
                    ? "text-gray-400"
                    : "text-[rgba(255,255,255,0.30)]"
                }`}
              >
                02
              </p>
              <p
                className={`font-googleSansFlex text-sm font-medium w-fit tracking-[0.01em] ${
                  isLightMode ? "text-[#7E22CE]" : "text-[#CDA8E8]"
                }`}
              >
                TCF ADVOCACY
              </p>
            </div>
            <div
              className={`flex flex-col justify-center items-center rounded-2xl w-8 h-8 ${
                isLightMode ? "bg-gray-100" : "bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 w-4 h-4 overflow-hidden relative"
              >
                <path
                  d="M8.2729 3.88312L6.39075 5.72438C6.14076 5.9744 6.00033 6.31347 6.00033 6.667C6.00033 7.02054 6.14076 7.35961 6.39075 7.60963C6.6408 7.85958 6.97991 8 7.33349 8C7.68707 8 8.02617 7.85958 8.27623 7.60963L9.41632 6.46968C9.56554 6.32042 9.7427 6.20201 9.93769 6.12123C10.1327 6.04045 10.3417 5.99887 10.5527 5.99887C10.7638 5.99887 10.9728 6.04045 11.1678 6.12123C11.3628 6.20201 11.54 6.32042 11.6892 6.46968L12.9433 7.72429C13.1933 7.97432 13.3337 8.31338 13.3337 8.66692C13.3337 9.02046 13.1933 9.35952 12.9433 9.60955C14.0007 8.55226 14.6674 7.66696 14.6674 6.33368C14.6674 5.59185 14.4423 4.86747 14.0219 4.25621C13.6015 3.64496 13.0056 3.17559 12.3128 2.91009C11.62 2.6446 10.863 2.59547 10.1417 2.76919C9.42041 2.94292 8.76879 3.33133 8.2729 3.88312ZM12.9433 9.60955C12.8118 9.74105 12.6556 9.84537 12.4838 9.91654C12.312 9.98771 12.1278 10.0243 11.9419 10.0243C11.7559 10.0243 11.5717 9.98771 11.3999 9.91654C11.2281 9.84537 11.0719 9.74105 10.9404 9.60955C11.0828 9.73828 11.1975 9.89461 11.2776 10.069C11.3577 10.2435 11.4015 10.4324 11.4063 10.6242C11.4111 10.8161 11.3769 11.0069 11.3057 11.1852C11.2344 11.3634 11.1277 11.5253 10.992 11.661C10.8563 11.7967 10.6943 11.9034 10.5161 11.9746C10.3378 12.0459 10.147 12.0801 9.95508 12.0753C9.76319 12.0705 9.57428 12.0267 9.39983 11.9466C9.22538 11.8665 9.06903 11.7518 8.94028 11.6095C9.0719 11.7405 9.17638 11.8963 9.24775 12.0678C9.31912 12.2393 9.35598 12.4231 9.35623 12.6089C9.35648 12.7946 9.3201 12.9786 9.24919 13.1503C9.17828 13.3219 9.07421 13.478 8.94295 13.6094C8.81626 13.7361 8.66532 13.836 8.49916 13.9031C8.33299 13.9701 8.15501 14.0031 7.97584 13.9998C7.79667 13.9966 7.61999 13.9573 7.45636 13.8842C7.29273 13.8112 7.1455 13.7059 7.02346 13.5747L3.33317 10.0002C2.33309 9.00024 1.33301 7.86695 1.33301 6.33368C1.33316 5.59191 1.55832 4.86762 1.97876 4.25647C2.39921 3.64532 2.99516 3.17605 3.68791 2.91064C4.38067 2.64523 5.13764 2.59615 5.85887 2.7699C6.5801 2.94365 7.23167 3.33204 7.72752 3.88379C7.80165 3.95267 7.89914 3.99091 8.00034 3.99078C8.10154 3.99066 8.19894 3.95219 8.2729 3.88312"
                  stroke={isLightMode ? "#171717" : "white"}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <p
              className={`font-inter text-[22px] font-bold leading-7 w-full ${
                isLightMode ? "text-[#171717]" : "text-[#FFF]"
              }`}
            >
              Integrative Care
            </p>
            <p
              className={`font-googleSansFlex text-sm font-light leading-[21px] w-full tracking-[0.0129em] ${
                isLightMode ? "text-gray-600" : "text-[#D5B0FF]"
              }`}
            >
              Access evidence-backed complementary therapies, tailored
              nutrition, and restorative wellness protocols.
            </p>
          </div>
        </div>

        {/* Card 03 */}
        <div
          className={`flex p-6 flex-col items-start gap-4 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl w-full sm:w-[280px] lg:w-[300px] overflow-hidden ${
            isLightMode
              ? "bg-white/80 border-black/10 shadow-lg"
              : "bg-[#0B0B0C] border-[rgba(255,255,255,0.10)]"
          }`}
        >
          <img
            src="/CoverImage(2).png"
            className="flex flex-col items-start rounded-2xl w-full h-[180px] object-cover overflow-hidden max-w-none"
            alt="Moderated Spaces"
          />
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 w-fit">
              <p
                className={`font-inter text-xs font-bold w-fit ${
                  isLightMode
                    ? "text-gray-400"
                    : "text-[rgba(255,255,255,0.30)]"
                }`}
              >
                03
              </p>
              <p
                className={`font-googleSansFlex text-sm font-medium w-fit tracking-[0.01em] ${
                  isLightMode ? "text-[#7E22CE]" : "text-[#CDA8E8]"
                }`}
              >
                TCF CONNECTION
              </p>
            </div>
            <div
              className={`flex flex-col justify-center items-center rounded-2xl w-8 h-8 ${
                isLightMode ? "bg-gray-100" : "bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 w-4 h-4 overflow-hidden relative"
              >
                <path
                  d="M10.6671 14V12.6667C10.6671 11.9594 10.3861 11.2811 9.88598 10.781C9.38584 10.281 8.70751 10 8.00021 10H3.99989C3.29259 10 2.61426 10.281 2.11412 10.781C1.61398 11.2811 1.33301 11.9594 1.33301 12.6667V14M10.6671 2.08529C11.239 2.23353 11.7454 2.56746 12.107 3.03466C12.4685 3.50186 12.6647 4.07588 12.6647 4.66662C12.6647 5.25736 12.4685 5.83138 12.107 6.29858C11.7454 6.76578 11.239 7.09971 10.6671 7.24795M14.6674 13.9999V12.6666C14.667 12.0757 14.4703 11.5018 14.1083 11.0348C13.7463 10.5678 13.2394 10.2343 12.6672 10.0866M8.66693 4.66667C8.66693 6.13943 7.47293 7.33333 6.00005 7.33333C4.52717 7.33333 3.33317 6.13943 3.33317 4.66667C3.33317 3.19391 4.52717 2 6.00005 2C7.47293 2 8.66693 3.19391 8.66693 4.66667Z"
                  stroke={isLightMode ? "#171717" : "white"}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <p
              className={`font-inter text-[22px] font-bold leading-7 w-full ${
                isLightMode ? "text-[#171717]" : "text-[#FFF]"
              }`}
            >
              Moderated Spaces
            </p>
            <p
              className={`font-googleSansFlex text-sm font-light leading-[21px] w-full tracking-[0.0129em] ${
                isLightMode ? "text-gray-600" : "text-[#D5B0FF]"
              }`}
            >
              Heal alongside peers in secure, facilitated circles guided by
              certified oncology social workers.
            </p>
          </div>
        </div>

        {/* Card 04 */}
        <div
          className={`flex p-6 flex-col items-start gap-4 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl w-full sm:w-[280px] lg:w-[300px] overflow-hidden ${
            isLightMode
              ? "bg-white/80 border-black/10 shadow-lg"
              : "bg-[#0B0B0C] border-[rgba(255,255,255,0.10)]"
          }`}
        >
          <img
            src="/CoverImage(3).png"
            className="flex flex-col items-start rounded-2xl w-full h-[180px] object-cover overflow-hidden max-w-none"
            alt="Survivorship Plans"
          />
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 w-fit">
              <p
                className={`font-inter text-xs font-bold w-fit ${
                  isLightMode
                    ? "text-gray-400"
                    : "text-[rgba(255,255,255,0.30)]"
                }`}
              >
                04
              </p>
              <p
                className={`font-googleSansFlex text-sm font-medium w-fit tracking-[0.01em] ${
                  isLightMode ? "text-[#7E22CE]" : "text-[#CDA8E8]"
                }`}
              >
                TCF VOICES
              </p>
            </div>
            <div
              className={`flex flex-col justify-center items-center rounded-2xl w-8 h-8 ${
                isLightMode ? "bg-gray-100" : "bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 w-4 h-4 overflow-hidden relative"
              >
                <path
                  d="M8.00021 12.667V14.6672M3.33301 6.66652V7.99996C3.33301 9.23774 3.82473 10.4248 4.7 11.3001C5.57527 12.1753 6.76239 12.667 8.00021 12.667C9.23803 12.667 10.4251 12.1753 11.3004 11.3001C12.1757 10.4248 12.6674 9.23774 12.6674 7.99996V6.66652M8.00021 1.33276C9.1049 1.33276 10.0004 2.22827 10.0004 3.33292V7.99996C10.0004 9.10462 9.1049 10.0001 8.00021 10.0001C6.89551 10.0001 5.99998 9.10462 5.99998 7.99996V3.33292C5.99998 2.22827 6.89551 1.33276 8.00021 1.33276Z"
                  stroke={isLightMode ? "#171717" : "white"}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <p
              className={`font-inter text-[22px] font-bold leading-7 w-full ${
                isLightMode ? "text-[#171717]" : "text-[#FFF]"
              }`}
            >
              Survivorship Plans
            </p>
            <p
              className={`font-googleSansFlex text-sm font-light leading-[21px] w-full tracking-[0.0129em] ${
                isLightMode ? "text-gray-600" : "text-[#D5B0FF]"
              }`}
            >
              Construct personalized long-term surveillance schedules and
              caregiver relief guides for life after active treatment.
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex flex-col items-center w-full">
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="cursor-pointer text-nowrap flex py-3.5 px-8 justify-center items-center gap-2 rounded-[999px] bg-[#39C69C] hover:bg-[#34b68f] hover:scale-105 active:scale-95 transition-all duration-300 w-fit shadow-lg shadow-[#39C69C]/20"
        >
          <p className="text-[#050505] font-googleSansFlex text-sm font-medium leading-5 w-fit">
            Begin Your Pathway Navigation
          </p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 overflow-hidden relative"
          >
            <path
              d="M3.33301 7.99996H12.6674M8.00021 12.6672L12.6674 7.99996L8.00021 3.33276"
              stroke="#050505"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
