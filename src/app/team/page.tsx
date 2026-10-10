"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import Team01 from "@/components/ui/team-01";
import GetInvolvedDropdown from "@/components/GetInvolvedDropdown";
import PartnershipModal from "@/components/PartnershipModal";
import VolunteerModal from "@/components/VolunteerModal";
import FooterSection from "@/components/FooterSection";

export default function OurTeamPage() {
  const { lang, toggleLang } = useLanguage();
  const { user, setIsAuthModalOpen } = useAuth();
  const [isLightMode, setIsLightMode] = useState(false);
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  return (
    <div
      className={`flex flex-col items-center w-full min-h-screen relative transition-colors duration-500 overflow-x-hidden ${
        isLightMode
          ? "bg-[#ECE9E9] text-[#163B2E]"
          : "bg-gradient-to-br from-[#1E1727] via-[#30253C] to-[#1B1324] text-[#F8F8F8]"
      }`}
    >
      {/* Background Ambient Orbs */}
      <div
        className={`absolute top-[10%] left-[20%] w-[450px] h-[450px] rounded-full blur-[60px] pointer-events-none transition-all duration-500 ${
          isLightMode ? "bg-[#C27AFF]/15" : "bg-[#C27AFF]/08"
        }`}
      />
      <div
        className={`absolute top-[40%] right-[15%] w-[400px] h-[400px] rounded-full blur-[60px] pointer-events-none transition-all duration-500 ${
          isLightMode ? "bg-[#39C69C]/15" : "bg-[#39C69C]/08"
        }`}
      />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex py-2 sm:py-3 px-2 sm:px-4 md:px-[84px] justify-between items-center w-full max-w-7xl mx-auto transition-all duration-300">
        <Link
          href="/"
          className="flex items-center gap-1.5 py-1 px-2.5 sm:px-4 rounded-full glass-navbar cursor-pointer hover:scale-105 transition-all shrink-0"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-spaceGrotesk text-xs sm:text-sm font-bold">Home</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded-full glass-navbar cursor-pointer hover:scale-105 transition-all shrink-0"
          >
            {isLightMode ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F8F8F8" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line></svg>
            )}
          </button>

          <button
            onClick={toggleLang}
            className="flex items-center justify-center px-2 sm:px-3.5 h-7 sm:h-10 rounded-full glass-navbar cursor-pointer hover:scale-105 transition-all font-spaceGrotesk text-xs font-bold gap-1 shrink-0"
          >
            <span>{lang}</span>
          </button>

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

      {/* Main Page Container */}
      <main className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-[84px] gap-10 md:gap-14 relative z-10">
        {/* Section Title Header */}
        <div className="flex flex-col items-center text-center w-full max-w-3xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-spaceGrotesk font-bold tracking-tight leading-[1.2em] py-2 overflow-visible" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
            <span
              className={
                isLightMode
                  ? "bg-gradient-to-r from-[#163B2E] via-[#0B3E4C] to-[#163B2E] bg-clip-text text-transparent font-spaceGrotesk font-bold"
                  : "headline-textured font-spaceGrotesk font-bold"
              }
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              People Behind
            </span>{" "}
            <span
              className={
                isLightMode
                  ? "bg-gradient-to-r from-[#0B3E4C] to-[#163B2E] bg-clip-text text-transparent font-spaceGrotesk font-bold"
                  : "headline-accent font-spaceGrotesk font-bold"
              }
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Carcino
            </span>
          </h1>
        </div>

        {/* Team Grid (Team01 Layout) */}
        <Team01 isLightMode={isLightMode} />
      </main>

      {/* Modals */}
      <PartnershipModal
        isOpen={isPartnershipModalOpen}
        onClose={() => setIsPartnershipModalOpen(false)}
      />
      <VolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />

      {/* Footer */}
      <FooterSection isLightMode={isLightMode} />
    </div>
  );
}
