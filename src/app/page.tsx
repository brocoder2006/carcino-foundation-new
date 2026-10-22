"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import EntranceAnimation from "@/components/EntranceAnimation";
import EditorialHeroSection from "@/components/EditorialHeroSection";
import WhatWeAreBuilding from "@/components/OurVisionSection";
import MissionStatementSection from "@/components/MissionStatementSection";
import HeroCarouselSection from "@/components/HeroCarouselSection";
import ImpactStatsSection from "@/components/ImpactStatsSection";
import ParallaxShowcaseSection from "@/components/ParallaxShowcaseSection";
import CredibilityTestimonialsSection from "@/components/CredibilityTestimonialsSection";
import FounderQuoteSection from "@/components/FounderQuoteSection";
import HappeningNow from "@/components/HappeningNow";
import PodcastSection from "@/components/PodcastSection";
import ContactFormSection from "@/components/ContactFormSection";
import FooterSection from "@/components/FooterSection";
import EditorialMenuPopover from "@/components/EditorialMenuPopover";
import BranchedMenu from "@/components/BranchedMenu";
import { Book02Icon, UserGroupIcon, Music01Icon } from "@hugeicons/core-free-icons";
import { useAuth } from "@/context/AuthContext";
import PartnershipModal from "@/components/PartnershipModal";
import VolunteerModal from "@/components/VolunteerModal";
import GetInvolvedDropdown from "@/components/GetInvolvedDropdown";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CarcinoFoundationLandingPage() {
  const router = useRouter();
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
      className={`flex flex-col items-center w-full max-w-full min-h-screen relative transition-colors duration-500 overflow-x-clip ${isLightMode
        ? "bg-[#ECE9E9] text-[#163B2E]"
        : "bg-[#30253C] text-[#F8F8F8]"
        }`}
    >
      {/* Split-Door Entrance Animation */}
      <EntranceAnimation />

      {/* Navigation Header */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex py-2 md:py-3 px-4 sm:px-6 md:px-8 lg:px-12 items-center justify-between w-full transition-all duration-300 pointer-events-none"
      >
        {/* Leftmost Corner Brand Text in Space Grotesk Font - same line as navbar */}
        <div className="hidden md:flex items-center pointer-events-auto shrink-0 z-10">
          <span
            onClick={scrollToTop}
            className={`font-spaceGrotesk text-sm lg:text-base xl:text-lg font-bold tracking-tight select-none cursor-pointer transition-colors duration-400 ${isLightMode ? "text-[#163B2E]" : "text-[#F8F8F8]"
              }`}
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            The Carcino Foundation
          </span>
        </div>

        {/* Mobile View Top Bar (Logo + Theme Toggle + Mobile Menu Trigger) */}
        <div className="flex items-center justify-between w-full md:hidden px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full glass-navbar border border-white/20 pointer-events-auto max-w-full overflow-hidden">
          <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0" onClick={scrollToTop}>
            <div className="flex items-center justify-center w-6 h-7 sm:w-7 sm:h-8 shrink-0">
              <img
                src="/tcf-ribbon-clean.png"
                alt="The Carcino Foundation Ribbon Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(152,117,193,0.35)]"
              />
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
        <div className="hidden md:flex items-center gap-2.5 w-fit pointer-events-auto absolute left-1/2 -translate-x-1/2">
          <div className="flex p-1.5 items-center gap-1 rounded-[999px] glass-navbar w-fit h-13 overflow-visible relative max-w-[calc(100vw-80px)]">
            <div className="flex flex-col items-start w-fit">
              <div className="flex justify-center items-center gap-1 w-fit">
                <div
                  className="flex pt-0 pr-1.5 pb-0 pl-2 flex-col justify-center items-start w-fit cursor-pointer"
                  onClick={scrollToTop}
                  title="The Carcino Foundation"
                >
                  <div className="flex flex-col justify-center items-center w-6 h-7 sm:w-7 sm:h-7 overflow-hidden">
                    <img
                      src="/tcf-ribbon-clean.png"
                      alt="The Carcino Foundation Ribbon Logo"
                      className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(152,117,193,0.35)] hover:scale-105 transition-transform"
                    />
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
                      Home
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
      <main
        ref={heroSectionRef}
        className="flex pt-28 md:pt-36 pr-6 md:pr-12 pb-20 md:pb-28 pl-6 md:pl-12 items-center justify-center w-full max-w-5xl mx-auto z-10 relative"
      >
        <div
          ref={heroRef}
          className="flex flex-col items-center text-center gap-7 w-full max-w-[960px] mx-auto"
        >
          <h1 className="w-full text-center text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-winterSolace font-bold tracking-tight leading-[1.2] py-2 overflow-visible">
            <span className={`inline-block pb-1 ${isLightMode ? "text-[#163B2E]" : "headline-textured"}`}>
              Where
            </span>{" "}
            <span className={`inline-block pb-1 ${isLightMode ? "text-[#163B2E]" : "headline-purple-accent"}`}>
              cancer
            </span>{" "}
            <span className={`inline-block pb-1 ${isLightMode ? "text-[#163B2E]" : "headline-accent"}`}>
              meets its questions.
            </span>
          </h1>
          <p
            className={`font-robotoMono text-center text-lg md:text-xl leading-[1.55em] w-full max-w-[780px] mx-auto transition-colors duration-400 ${isLightMode ? "text-[#163B2E]/80" : "text-[#E9CDF8]"
              }`}
          >
            From rural cancer care and veterinary oncology to cancer literacy for better detection and outcomes, we turn knowledge into action.
          </p>
        </div>
      </main>

      {/* Infinite Stylish Carousel Ticker Just After Hero */}
      <HeroCarouselSection isLightMode={isLightMode} />

      {/* What We Are Building Section Just Beneath Hero Landing */}
      <WhatWeAreBuilding />

      {/* Mission Statement Section with Scroll Word Color Reveal */}
      {/* <MissionStatementSection isLightMode={isLightMode} /> */}

      {/* Impact Stats Section (People Screened, Villages Reached, etc.) */}
      {/* <ImpactStatsSection isLightMode={isLightMode} /> */}

      {/* Parallax Showcase Section featuring 1.jpeg, 2.jpg, 3.jpg */}
      {/* <ParallaxShowcaseSection isLightMode={isLightMode} /> */}

      {/* Credibility & Testimonials Section (trusted paths) */}
      <CredibilityTestimonialsSection isLightMode={isLightMode} />

      {/* Founder's Quote Glassmorphic Section */}
      <FounderQuoteSection isLightMode={isLightMode} />

      {/* Happening Now Section */}
      <HappeningNow isLightMode={isLightMode} />

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

