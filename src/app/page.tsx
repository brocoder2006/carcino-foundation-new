"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import DoorEntranceAnimation from "@/components/DoorEntranceAnimation";
import EditorialHeroSection from "@/components/EditorialHeroSection";
import OurVisionSection from "@/components/OurVisionSection";
import MissionStatementSection from "@/components/MissionStatementSection";
import HeroCarouselSection from "@/components/HeroCarouselSection";
import ImpactStatsSection from "@/components/ImpactStatsSection";
import ParallaxShowcaseSection from "@/components/ParallaxShowcaseSection";
import CredibilityTestimonialsSection from "@/components/CredibilityTestimonialsSection";
import FounderQuoteSection from "@/components/FounderQuoteSection";
import Flagshipprogramsection from "@/components/Flagshipprogramsection";
import PodcastSection from "@/components/PodcastSection";
import ContactFormSection from "@/components/ContactFormSection";
import FooterSection from "@/components/FooterSection";
import EditorialMenuPopover from "@/components/EditorialMenuPopover";
import BranchedMenu from "@/components/BranchedMenu";
import { Book02Icon, UserGroupIcon, Music01Icon } from "@hugeicons/core-free-icons";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import PartnershipModal from "@/components/PartnershipModal";
import VolunteerModal from "@/components/VolunteerModal";
import GetInvolvedDropdown from "@/components/GetInvolvedDropdown";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CarcinoFoundationLandingPage() {
  const router = useRouter();
  const { lang, toggleLang, t } = useLanguage();
  const { user, setIsAuthModalOpen } = useAuth();
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroLightVideoRef = useRef<HTMLVideoElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [isLightMode]);

  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Master Timeline & Ambient Floating Animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Floating Specular Orbs Continuous Animation
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          y: -35,
          x: 20,
          rotation: 5,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          y: 40,
          x: -25,
          rotation: -5,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      }

      // 2. Navbar Reveal
      if (navRef.current) {
        tl.fromTo(
          navRef.current,
          { opacity: 0, y: -40, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" },
          0.1
        );
      }

      // 3. Hero Content Stagger Timeline
      if (heroRef.current) {
        tl.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 50, scale: 0.95, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.18,
            ease: "power3.out",
          },
          0.3
        );
      }

      // 4. Real-time Hero Parallax Scroll Effect
      if (heroSectionRef.current) {
        if (heroRef.current) {
          gsap.to(heroRef.current, {
            y: -75,
            ease: "none",
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
        if (heroVideoRef.current) {
          gsap.to(heroVideoRef.current, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
        if (heroLightVideoRef.current) {
          gsap.to(heroLightVideoRef.current, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollToVision = () => {
    setIsMobileMenuOpen(false);
    setActiveNavItem("About");
    const section = document.getElementById("vision-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPodcasts = () => {
    setIsMobileMenuOpen(false);
    setActiveNavItem("Podcasts");
    const section = document.getElementById("podcasts-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    setIsMobileMenuOpen(false);
    setActiveNavItem("Home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`flex flex-col items-center w-full max-w-full min-h-screen relative transition-colors duration-500 overflow-x-hidden ${isLightMode
        ? "bg-[#ECE9E9] text-[#163B2E]"
        : "bg-gradient-to-br from-[#1E1727] via-[#30253C] to-[#1B1324] text-[#F8F8F8]"
        }`}
    >
      {/* Sliding Door Entrance Loader Animation (Inspired by huyml.co) */}
      <DoorEntranceAnimation />
      {/* Specular Background Refraction Orbs - Velorah Specular Ambient Glow */}
      <div
        ref={orb1Ref}
        className={`absolute top-[5%] left-[15%] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none transition-all duration-500 will-change-transform ${isLightMode ? "bg-[#C27AFF]/25" : "bg-[#9875C1]/30"
          }`}
      ></div>
      <div
        ref={orb2Ref}
        className={`absolute top-[30%] right-[10%] w-[450px] h-[450px] rounded-full blur-[100px] pointer-events-none transition-all duration-500 will-change-transform ${isLightMode ? "bg-[#FF7A00]/20" : "bg-[#39C69C]/25"
          }`}
      ></div>

      {/* Hero Full-Screen Ambient Video Layer (Botanical Blooming Flowers for Light Mode + Velorah for Dark Mode) */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        {/* Light Mode Animating Botanical Flowers Video Background */}
        <video
          ref={heroLightVideoRef}
          key="light-floral-video"
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 will-change-transform scale-105 ${isLightMode ? "opacity-75 brightness-105 contrast-110 saturate-125" : "opacity-0 pointer-events-none"
            }`}
        >
          <source
            src="https://cdn.sceneai.art/Hero%20Section%20Video/b42aa08b-868a-4c92-8e5b-973c6be6c534.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Mode Velorah Ambient Video Background */}
        <video
          ref={heroVideoRef}
          key="dark-velorah-video"
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 will-change-transform scale-105 ${!isLightMode ? "opacity-45 brightness-95 contrast-115 saturate-125" : "opacity-0 pointer-events-none"
            }`}
        >
          <source
            src="https://cdn.sceneai.art/Hero%20Section%20Video/50b4f304-cdca-4e12-8735-580d225834be.mp4"
            type="video/mp4"
          />
        </video>

        {/* Ethereal Floating Botanical Spores / Golden Dandelion Particles Overlay for Light Mode */}
        {isLightMode && (
          <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden opacity-70">
            <div className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-[#FCC8DF] blur-[1px] animate-pulse"></div>
            <div className="absolute top-[38%] left-[68%] w-2.5 h-2.5 rounded-full bg-[#9875C1] blur-[1px] animate-bounce duration-[4000ms]"></div>
            <div className="absolute top-[62%] left-[22%] w-2 h-2 rounded-full bg-[#F6C656] blur-[1px] animate-pulse duration-[3000ms]"></div>
            <div className="absolute top-[28%] right-[18%] w-3 h-3 rounded-full bg-[#39C69C]/80 blur-[1px] animate-ping duration-[5000ms]"></div>
            <div className="absolute top-[72%] right-[32%] w-2.5 h-2.5 rounded-full bg-[#FCC8DF] blur-[1px] animate-pulse duration-[3500ms]"></div>
            <div className="absolute top-[45%] left-[45%] w-1.5 h-1.5 rounded-full bg-white blur-[0.5px] animate-pulse duration-[2500ms]"></div>
          </div>
        )}

        {/* Velorah Liquid Vignette Overlay - Top Dark-Glass Fade for Navigation */}
        <div
          className={`absolute top-0 left-0 right-0 h-56 pointer-events-none transition-all duration-500 z-[2] ${isLightMode
            ? "bg-gradient-to-b from-[#ECE9E9]/90 via-[#ECE9E9]/45 to-transparent"
            : "bg-gradient-to-b from-black/85 via-black/45 to-transparent"
            }`}
        ></div>

        {/* Center Specular Radial Highlight */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-500 z-[2] ${isLightMode
            ? "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.25)_0%,rgba(152,117,193,0.12)_55%,rgba(236,233,233,0.45)_100%)]"
            : "bg-[radial-gradient(ellipse_at_center,rgba(152,117,193,0.15)_0%,rgba(27,19,36,0.65)_100%)]"
            }`}
        ></div>

        {/* Velorah Liquid Vignette Overlay - Bottom Seamless Fade to Carousel */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-64 pointer-events-none transition-all duration-500 z-[2] ${isLightMode
            ? "bg-gradient-to-t from-[#ECE9E9] via-[#ECE9E9]/70 to-transparent"
            : "bg-gradient-to-t from-[#1B1324] via-[#1B1324]/80 to-transparent"
            }`}
        ></div>
      </div>

      {/* Navigation Header */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex py-2 md:py-3 px-2 sm:px-4 md:px-[84px] justify-center items-center w-full max-w-7xl mx-auto transition-all duration-300 pointer-events-none"
      >
        {/* Mobile View Top Bar (Logo + Theme Toggle + Mobile Menu Trigger) */}
        <div className="flex items-center justify-between w-full md:hidden px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full glass-navbar border border-white/20 pointer-events-auto max-w-full overflow-hidden">
          <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0" onClick={scrollToTop}>
            <div className="flex items-center justify-center w-6 h-6">
              <svg
                width="16"
                height="24"
                viewBox="0 0 19 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-5"
              >
                <path
                  d="M4.84679 6.37826C4.95465 5.44042 5.09643 4.90454 5.80295 3.89256C7.05911 2.36641 8.01902 2.20498 9.66947 1.92746L9.68572 1.92472C12.0038 1.79156 13.1048 2.94563 13.6554 4.21806C14.2059 5.4905 14.1246 7.72467 13.9596 8.92311C13.7946 10.1216 13.1338 13.2621 9.38143 16.3544C10.4101 16.7243 10.5021 16.6656 11.743 16.8536C12.931 15.5664 13.6099 14.6152 15.3214 12.5333C17.033 10.4514 18.0067 7.56191 18.277 5.78643C18.5471 4.01094 18.6102 1.92472 17.1759 0.415554C15.7416 -1.09362 12.9164 -1.34514 11.178 -1.09362C9.43938 -0.842092 6.39697 0.415554 4.28179 2.14666C2.16655 3.87777 1.1814 5.78643 0.39905 8.36088C-0.383298 10.9353 0.0671754 13.0472 1.03651 15.6848C2.6826 19.149 4.70188 21.4995 6.45492 22.6536C8.20795 23.8077 9.43938 24.4291 11.3663 27.7137C13.7422 23.8817 14.6793 22.4375 16.5095 20.2567C15.3214 18.7771 13.7857 17.939 10.7722 17.5194C7.75884 17.0999 6.78858 16.1079 6.22313 16.0843C5.65777 16.0606 5.00617 16.0547 4.80331 15.9955C4.60054 15.9363 4.54411 15.9279 4.38322 15.5664C4.20956 14.9273 4.38322 13.9981 4.38322 13.8649C4.38322 13.7318 4.10795 13.5542 4.10795 13.3767C4.10795 13.1991 4.20054 13.0936 4.39768 12.9919C4.39768 12.9919 3.94858 12.7404 3.94858 12.5333C3.94858 12.3261 4.15134 11.5419 4.10795 11.3644C4.06447 11.1869 3.03581 10.965 3.2242 10.6098C3.41251 10.2547 4.88233 8.43846 5.06411 8.06498C5.24581 7.69147 4.87242 7.26917 4.84679 6.37826Z"
                  fill={isLightMode ? "#171717" : "#F8F8F8"}
                />
              </svg>
            </div>
            <span className="font-winterSolace text-sm font-bold tracking-tight">Carcino</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <GetInvolvedDropdown
              user={user}
              isLightMode={isLightMode}
              onOpenAuth={() => setIsAuthModalOpen(true)}
              onOpenVolunteer={() => setIsVolunteerModalOpen(true)}
              onOpenPartnership={() => setIsPartnershipModalOpen(true)}
              onSignOut={() => setIsAuthModalOpen(true)}
              align="right"
            />

            <button
              onClick={() => setIsLightMode(!isLightMode)}
              aria-label="Toggle theme"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all cursor-pointer shrink-0"
            >
              {isLightMode ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F8F8F8" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line></svg>
              )}
            </button>

            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLang}
              aria-label="Change language"
              className="px-2 h-7 sm:h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-xs font-bold transition-all cursor-pointer gap-1 shrink-0"
            >
              <span className={isLightMode ? "text-[#171717]" : "text-white"}>
                {lang}
              </span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shrink-0"
            >
              {isMobileMenuOpen ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={isLightMode ? "#171717" : "white"} strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={isLightMode ? "#171717" : "white"} strokeWidth="2.5"><line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line></svg>
              )}
            </button>
          </div>
        </div>

        {/* Desktop View Floating Pill Navbar */}
        <div className="hidden md:flex items-center gap-2.5 w-fit mx-auto pointer-events-auto">
          <div className="flex p-1.5 items-center gap-1 rounded-[999px] glass-navbar w-fit h-13 overflow-visible relative max-w-[calc(100vw-80px)]">
            <div className="flex flex-col items-start w-fit">
              <div className="flex justify-center items-center gap-1 w-fit">
                <div className="flex pt-0 pr-1.5 pb-0 pl-2 flex-col justify-center items-start w-fit">
                  <div className="flex flex-col justify-center items-center w-6 h-6 overflow-hidden">
                    <div className="shrink-0 opacity-100 w-[22px] h-[26px] overflow-hidden relative">
                      <svg
                        width="17"
                        height="25"
                        viewBox="0 0 19 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-100 w-[16px] h-[26px] absolute left-[5px] top-0 "
                      >
                        <path
                          d="M4.84679 6.37826C4.95465 5.44042 5.09643 4.90454 5.80295 3.89256C7.05911 2.36641 8.01902 2.20498 9.66947 1.92746L9.68572 1.92472C12.0038 1.79156 13.1048 2.94563 13.6554 4.21806C14.2059 5.4905 14.1246 7.72467 13.9596 8.92311C13.7946 10.1216 13.1338 13.2621 9.38143 16.3544C10.4101 16.7243 10.5021 16.6656 11.743 16.8536C12.931 15.5664 13.6099 14.6152 15.3214 12.5333C17.033 10.4514 18.0067 7.56191 18.277 5.78643C18.5471 4.01094 18.6102 1.92472 17.1759 0.415554C15.7416 -1.09362 12.9164 -1.34514 11.178 -1.09362C9.43938 -0.842092 6.39697 0.415554 4.28179 2.14666C2.16655 3.87777 1.1814 5.78643 0.39905 8.36088C-0.383298 10.9353 0.0671754 13.0472 1.03651 15.6848C2.6826 19.149 4.70188 21.4995 6.45492 22.6536C8.20795 23.8077 9.43938 24.4291 11.3663 27.7137C13.7422 23.8817 14.6793 22.4375 16.5095 20.2567C15.3214 18.7771 13.7857 17.939 10.7722 17.5194C7.75884 17.0999 6.78858 16.1079 6.22313 16.0843C5.65777 16.0606 5.00617 16.0547 4.80331 15.9955C4.60054 15.9363 4.54411 15.9279 4.38322 15.5664C4.20956 14.9273 4.38322 13.9981 4.38322 13.8649C4.38322 13.7318 4.10795 13.5542 4.10795 13.3767C4.10795 13.1991 4.20054 13.0936 4.39768 12.9919C4.39768 12.9919 3.94858 12.7404 3.94858 12.5333C3.94858 12.3261 4.15134 11.5419 4.10795 11.3644C4.06447 11.1869 3.03581 10.965 3.2242 10.6098C3.41251 10.2547 4.88233 8.43846 5.06411 8.06498C5.24581 7.69147 4.87242 7.26917 4.84679 6.37826Z"
                          fill={isLightMode ? "#171717" : "#F8F8F8"}
                        />
                      </svg>
                      <svg
                        width="11"
                        height="6"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-100 w-2.5 h-[6px] absolute left-0 top-[20px] "
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
                  <button
                    onClick={scrollToTop}
                    className={`cursor-pointer text-nowrap flex py-2 px-4 justify-center items-center rounded-[999px] transition-all duration-300 w-fit ${activeNavItem === "Home" ? "glass-btn-primary" : "glass-nav-item"
                      }`}
                  >
                    <p
                      className={`font-inter text-sm w-fit ${activeNavItem === "Home"
                        ? "text-[#0C2822] font-bold"
                        : `font-medium ${isLightMode ? "text-[#171717]" : "text-[#F8F8F8]"}`
                        }`}
                    >
                      {t("nav_home")}
                    </p>
                  </button>
                </div>
                {/* Standalone Our Team Navigation Button */}
                <div className="flex pr-0.5 flex-col items-start w-fit">
                  <Link
                    href="/team"
                    onClick={() => setActiveNavItem("Team")}
                    className={`cursor-pointer text-nowrap flex py-2 px-4 justify-center items-center rounded-[999px] transition-all duration-300 w-fit ${activeNavItem === "Team" ? "glass-btn-primary" : "glass-nav-item"
                      }`}
                  >
                    <p
                      className={`font-spaceGrotesk text-sm w-fit ${activeNavItem === "Team"
                        ? "text-[#0C2822] font-bold"
                        : `font-medium ${isLightMode ? "text-[#171717]" : "text-[#F8F8F8]"}`
                        }`}
                    >
                      Our Team
                    </p>
                  </Link>
                </div>
                {/* Editorial Branched Menu Button */}
                <div className="flex pr-0.5 flex-col items-start w-fit">
                  <EditorialMenuPopover
                    isLightMode={isLightMode}
                    activeNavItem={activeNavItem}
                    setActiveNavItem={setActiveNavItem}
                  />
                </div>

              </div>
            </div>
          </div>

          {/* Desktop Theme Toggle Button */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-10 h-10 rounded-full glass-navbar cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {isLightMode ? (
              <svg
                width="18"
                height="18"
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
                width="18"
                height="18"
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

          {/* Desktop Language Toggle Button */}
          <button
            onClick={toggleLang}
            aria-label="Change language"
            title="Change language"
            className="flex items-center justify-center px-3.5 h-10 rounded-full glass-navbar cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 font-inter text-xs font-bold gap-1.5 shrink-0"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isLightMode ? "#171717" : "#F8F8F8"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span className={isLightMode ? "text-[#171717]" : "text-[#F8F8F8]"}>
              {lang}
            </span>
          </button>

          {/* User Account & Get Involved Dropdown Button */}
          <GetInvolvedDropdown
            user={user}
            isLightMode={isLightMode}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onOpenVolunteer={() => setIsVolunteerModalOpen(true)}
            onOpenPartnership={() => setIsPartnershipModalOpen(true)}
            onSignOut={() => setIsAuthModalOpen(true)}
          />
        </div>
      </header>

      {/* Mobile Glassy Dropdown Menu Modal */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex flex-col pt-20 px-6 pb-12 transition-all duration-300 animate-in fade-in md:hidden"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`flex flex-col gap-4 p-6 rounded-3xl border ${isLightMode
              ? "bg-white/95 border-black/10 text-[#171717] shadow-2xl"
              : "bg-[#0B0B0C]/95 border-white/20 text-white shadow-[0_20px_50px_rgba(194,122,255,0.25)]"
              }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-winterSolace text-xl font-bold">Navigation</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <button
              onClick={scrollToTop}
              className={`py-3 px-5 rounded-2xl text-left transition-all duration-300 cursor-pointer ${activeNavItem === "Home"
                ? "glass-btn-primary font-bold text-[#0C2822]"
                : "glass-nav-item font-medium"
                }`}
            >
              Home
            </button>

            <Link
              href="/team"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setActiveNavItem("Team");
              }}
              className={`py-3 px-5 rounded-2xl text-left transition-all duration-300 cursor-pointer ${activeNavItem === "Team"
                ? "glass-btn-primary font-bold text-[#0C2822]"
                : "glass-nav-item font-medium"
                }`}
            >
              Our Team
            </Link>

            {/* Mobile Branched Menu for Editorial */}
            <div className="p-3 rounded-2xl border border-white/10 bg-white/5">
              <BranchedMenu
                items={[
                  {
                    label: "Editorial",
                    children: [
                      { value: "articles", label: "Articles & Blogs", icon: Book02Icon },
                      { value: "survivors", label: "Survivor Stories", icon: UserGroupIcon },
                      { value: "podcasts", label: "Podcast Episodes", icon: Music01Icon },
                    ],
                  },
                ]}
                defaultOpen={0}
                color={isLightMode ? "#171717" : "#F8F8F8"}
                accentColor="#39C69C"
                lineColor={isLightMode ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)"}
                width={280}
                rowHeight={36}
                indent={40}
                onSelect={(value) => {
                  setIsMobileMenuOpen(false);
                  if (value === "articles") {
                    setActiveNavItem("Articles");
                    router.push("/articles");
                  } else if (value === "survivors") {
                    setActiveNavItem("Survivors");
                    const section = document.getElementById("survivors-section");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                  } else if (value === "podcasts") {
                    setActiveNavItem("Podcasts");
                    const section = document.getElementById("podcasts-section");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              />
            </div>

            {/* Get Involved Options Section in Mobile Drawer */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#CDA8E8] px-1">Get Involved</span>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsVolunteerModalOpen(true);
                }}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-between cursor-pointer transition-all"
              >
                <span>Volunteer Form</span>
                <span>→</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPartnershipModalOpen(true);
                }}
                className="w-full py-3 px-4 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 font-bold text-xs flex items-center justify-between cursor-pointer transition-all"
              >
                <span>Partnership Form</span>
                <span>→</span>
              </button>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfhPy9AsGU5N1UrBstZeTpLd1jJ1ClJaESrq-P8ZrsRCXTVJw/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 font-bold text-xs flex items-center justify-between cursor-pointer transition-all"
              >
                <span>Join the Team</span>
                <span>↗</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-3 px-4 rounded-xl glass-btn-primary font-bold text-xs text-white flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>{user ? (user.fullName || user.email || "Account") : "Sign In / Register"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Hero Section */}
      {isLightMode ? (
        <EditorialHeroSection />
      ) : (
        <main ref={heroSectionRef} className="flex pt-20 md:pt-28 pr-6 md:pr-[84px] pb-[72px] pl-6 md:pl-[84px] items-center justify-center gap-16 w-full max-w-7xl mx-auto my-8 z-10 relative">
          <div ref={heroRef} className="flex flex-col items-start gap-7 w-full max-w-[960px]">
            <h1 className="w-full text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-winterSolace font-bold tracking-tight leading-[1.2] py-2 overflow-visible">
              <span className="headline-textured inline-block pb-1">
                {t("hero_headline_1")}
              </span>{" "}
              <span className="headline-purple-accent inline-block pb-1">
                {t("hero_headline_cancer")}
              </span>{" "}
              <span className="headline-accent inline-block pb-1">
                {t("hero_headline_2")}
              </span>
            </h1>
            <p className="font-robotoMono text-lg md:text-xl leading-[1.55em] w-full text-[#E9CDF8] transition-colors duration-400">
              {t("hero_desc")}
            </p>
          </div>
        </main>
      )}

      {/* Infinite Stylish Carousel Ticker Just After Hero */}
      <HeroCarouselSection isLightMode={isLightMode} />

      {/* Our Vision Section Just Beneath Hero Landing */}
      <OurVisionSection isLightMode={isLightMode} />

      {/* Mission Statement Section with Scroll Word Color Reveal */}
      <MissionStatementSection isLightMode={isLightMode} />

      {/* Impact Stats Section (People Screened, Villages Reached, etc.) */}
      <ImpactStatsSection isLightMode={isLightMode} />

      {/* Parallax Showcase Section featuring 1.jpeg, 2.jpg, 3.jpg */}
      <ParallaxShowcaseSection isLightMode={isLightMode} />

      {/* Credibility & Testimonials Section (trusted paths) */}
      <CredibilityTestimonialsSection isLightMode={isLightMode} />

      {/* Founder's Quote Glassmorphic Section */}
      <FounderQuoteSection isLightMode={isLightMode} />

      {/* Flagship Program Section (The Carcino Pathway) */}
      <Flagshipprogramsection isLightMode={isLightMode} />

      {/* Podcast Section Just Beneath Flagship Program Section */}
      <PodcastSection isLightMode={isLightMode} />


      {/* Contact Form Section (Saves to Supabase & Sends Excel Mail to Owner) */}
      <ContactFormSection isLightMode={isLightMode} />

      {/* Footer Section */}
      <FooterSection isLightMode={isLightMode} />

      {/* Modals for Partnerships and Volunteering */}
      <PartnershipModal
        isOpen={isPartnershipModalOpen}
        onClose={() => setIsPartnershipModalOpen(false)}
      />
      <VolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />
    </div>
  );
}

