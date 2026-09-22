"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeaturesSectionProps {
  isLightMode?: boolean;
}

export default function FeaturesSection({ isLightMode = false }: FeaturesSectionProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      id: "trusted-care",
      badge: t("feat_1_badge"),
      title: t("feat_1_title"),
      desc: t("feat_1_desc"),
      img: "/CoverImage.png",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 w-4 h-4 overflow-hidden relative"
        >
          <path
            d="M8.27265 3.88288L6.3905 5.72413C6.14052 5.97416 6.00009 6.31322 6.00009 6.66676C6.00009 7.0203 6.14052 7.35936 6.3905 7.60939C6.64056 7.85934 6.97966 7.99975 7.33324 7.99975C7.68682 7.99975 8.02593 7.85934 8.27599 7.60939L9.41608 6.46944C9.56529 6.32017 9.74245 6.20177 9.93745 6.12099C10.1324 6.0402 10.3414 5.99862 10.5525 5.99862C10.7636 5.99862 10.9726 6.0402 11.1676 6.12099C11.3625 6.20177 11.5397 6.32017 11.6889 6.46944L12.943 7.72405C13.193 7.97408 13.3334 8.31314 13.3334 8.66668C13.3334 9.02021 13.193 9.35928 12.943 9.6093C14.0004 8.55202 14.6672 7.66672 14.6672 6.33344C14.6672 5.59161 14.4421 4.86722 14.0217 4.25597C13.6013 3.64471 13.0054 3.17534 12.3126 2.90985C11.6198 2.64435 10.8628 2.59522 10.1415 2.76895C9.42017 2.94268 8.76854 3.33108 8.27265 3.88288ZM12.943 9.6093C12.8115 9.74081 12.6554 9.84512 12.4836 9.91629C12.3118 9.98746 12.1276 10.0241 11.9416 10.0241C11.7556 10.0241 11.5715 9.98746 11.3996 9.91629C11.2278 9.84512 11.0717 9.74081 10.9402 9.6093C11.0826 9.73803 11.1973 9.89436 11.2774 10.0688C11.3575 10.2432 11.4012 10.4321 11.4061 10.624C11.4109 10.8158 11.3766 11.0067 11.3054 11.1849C11.2342 11.3632 11.1275 11.525 10.9917 11.6608C10.856 11.7965 10.6941 11.9032 10.5159 11.9744C10.3376 12.0456 10.1467 12.0799 9.95484 12.075C9.76294 12.0702 9.57403 12.0264 9.39958 11.9464C9.22513 11.8663 9.06878 11.7516 8.94004 11.6092C9.07165 11.7403 9.17613 11.896 9.2475 12.0675C9.31887 12.239 9.35574 12.4229 9.35599 12.6086C9.35623 12.7944 9.31986 12.9783 9.24895 13.15C9.17803 13.3217 9.07397 13.4777 8.94271 13.6091C8.81601 13.7359 8.66508 13.8357 8.49891 13.9028C8.33275 13.9699 8.15477 14.0028 7.9756 13.9996C7.79643 13.9963 7.61975 13.957 7.45612 13.884C7.29248 13.8109 7.14525 13.7057 7.02322 13.5745L3.33292 9.99996C2.33284 9 1.33276 7.86671 1.33276 6.33344C1.33291 5.59166 1.55808 4.86737 1.97852 4.25622C2.39897 3.64507 2.99491 3.17581 3.68767 2.9104C4.38042 2.64498 5.1374 2.59591 5.85863 2.76966C6.57986 2.9434 7.23142 3.33179 7.72728 3.88354C7.80141 3.95243 7.89889 3.99066 8.00009 3.99054C8.1013 3.99042 8.19869 3.95194 8.27265 3.88288"
            stroke={isLightMode ? "#171717" : "white"}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: "treatment-nav",
      badge: t("feat_2_badge"),
      title: t("feat_2_title"),
      desc: t("feat_2_desc"),
      img: "/CoverImage(1).png",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 w-4 h-4 overflow-hidden relative"
        >
          <g clipPath="url(#clip0_182_695)">
            <path
              d="M7.99996 14.6674C11.6822 14.6674 14.6672 11.6824 14.6672 8.00021C14.6672 4.31801 11.6822 1.33301 7.99996 1.33301C4.31777 1.33301 1.33276 4.31801 1.33276 8.00021C1.33276 11.6824 4.31777 14.6674 7.99996 14.6674Z"
              stroke={isLightMode ? "#171717" : "white"}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_182_695">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: "connection",
      badge: t("feat_3_badge"),
      title: t("feat_3_title"),
      desc: t("feat_3_desc"),
      img: "/CoverImage(2).png",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 w-4 h-4 overflow-hidden relative"
        >
          <path
            d="M10.6668 14V12.6667C10.6668 11.9594 10.3859 11.2811 9.88573 10.781C9.3856 10.281 8.70726 10 7.99996 10H3.99964C3.29234 10 2.61401 10.281 2.11387 10.781C1.61374 11.2811 1.33276 11.9594 1.33276 12.6667V14M10.6668 2.08529C11.2387 2.23353 11.7452 2.56746 12.1067 3.03466C12.4683 3.50186 12.6645 4.07588 12.6645 4.66662C12.6645 5.25736 12.4683 5.83138 12.1067 6.29858C11.7452 6.76578 11.2387 7.09971 10.6668 7.24795M14.6672 13.9999V12.6666C14.6667 12.0757 14.4701 11.5018 14.108 11.0348C13.746 10.5678 13.2391 10.2343 12.667 10.0866M8.66668 4.66667C8.66668 6.13943 7.47268 7.33333 5.9998 7.33333C4.52693 7.33333 3.33292 6.13943 3.33292 4.66667C3.33292 3.19391 4.52693 2 5.9998 2C7.47268 2 8.66668 3.19391 8.66668 4.66667Z"
            stroke={isLightMode ? "#171717" : "white"}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: "voices",
      badge: t("feat_4_badge"),
      title: t("feat_4_title"),
      desc: t("feat_4_desc"),
      img: "/CoverImage(3).png",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 w-4 h-4 overflow-hidden relative"
        >
          <path
            d="M7.99996 12.6672V14.6674M3.33276 6.66677V8.00021C3.33276 9.23798 3.82449 10.4251 4.69975 11.3003C5.57502 12.1755 6.76215 12.6672 7.99996 12.6672C9.23778 12.6672 10.4249 12.1755 11.3002 11.3003C12.1754 10.4251 12.6672 9.23798 12.6672 8.00021V6.66677M7.99996 1.33301C9.10466 1.33301 10.0002 2.22851 10.0002 3.33317V8.00021C10.0002 9.10487 9.10466 10.0004 7.99996 10.0004C6.89527 10.0004 5.99974 9.10487 5.99974 8.00021V3.33317C5.99974 2.22851 6.89527 1.33301 7.99996 1.33301Z"
            stroke={isLightMode ? "#171717" : "white"}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
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
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 55, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
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
      id="features-section"
      ref={sectionRef}
      className={`w-full py-20 md:py-24 px-6 md:px-[84px] flex flex-col items-center justify-center gap-14 relative z-10 transition-colors duration-500 overflow-hidden ${
        isLightMode ? "bg-[#F8F4FA] text-[#171717]" : "bg-[#050505] text-[#F8F8F8]"
      }`}
    >
      {/* Header Container */}
      <div ref={headerRef} className="flex flex-col items-center gap-4 w-full text-center max-w-5xl mx-auto">
        <h2 className="font-winterSolace text-6xl md:text-[113px] leading-tight md:leading-[106px] bg-[linear-gradient(91deg,#C08A6E_0.02%,#B3A9C6_29.99%,#9DAE8B_54.96%,#C9A867_79.93%)] bg-clip-text text-transparent w-full text-center tracking-[-0.0356em] capitalize">
          {t("feat_title")}
        </h2>
        <div className="flex flex-col items-center w-full">
          <p
            className={`font-googleSansFlex text-base md:text-lg font-light leading-[27px] w-full max-w-[640px] text-center tracking-[0.01em] ${
              isLightMode ? "text-[#581C87]" : "text-[#D5B0FF]"
            }`}
          >
            {t("feat_subtitle")}
          </p>
        </div>
      </div>

      {/* Cards Container */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto overflow-hidden"
      >
        {features.map((item) => (
          <div
            key={item.id}
            className={`flex p-6 flex-col items-start gap-4 rounded-3xl border transition-all duration-400 w-full overflow-hidden group cursor-pointer ${
              isLightMode
                ? "bg-white/80 border-black/10 shadow-lg hover:border-[#CDA8E8] hover:shadow-purple-200 hover:-translate-y-2"
                : "bg-[#0B0B0C] border-[rgba(255,255,255,0.10)] hover:border-[#CDA8E8]/60 hover:shadow-[0_12px_35px_rgba(205,168,232,0.18)] hover:-translate-y-2"
            }`}
          >
            <div className="relative w-full h-[180px] rounded-2xl overflow-hidden">
              <img
                src={item.img}
                className="flex flex-col items-start rounded-2xl w-full h-[180px] object-cover overflow-hidden max-w-none transition-transform duration-500 group-hover:scale-105"
                alt={item.title}
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <p
                className={`font-googleSansFlex text-sm font-medium w-fit tracking-[0.01em] ${
                  isLightMode ? "text-[#7E22CE]" : "text-[#CDA8E8]"
                }`}
              >
                {item.badge}
              </p>
              <div
                className={`flex justify-center items-center rounded-2xl w-8 h-8 transition-colors ${
                  isLightMode ? "bg-black/5 border border-black/10" : "bg-[rgba(255,255,255,0.04)]"
                }`}
              >
                {item.icon}
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 w-full">
              <p
                className={`font-inter text-[22px] font-bold leading-[22px] w-full ${
                  isLightMode ? "text-[#171717]" : "text-[#FFF]"
                }`}
              >
                {item.title}
              </p>
              <p
                className={`font-googleSansFlex text-sm font-light leading-[21px] w-full tracking-[0.0129em] ${
                  isLightMode ? "text-purple-900" : "text-[#D5B0FF]"
                }`}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
