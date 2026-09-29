"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { AnimatedTooltip, TeamMemberItem } from "@/components/AnimatedTooltip";
import GetInvolvedDropdown from "@/components/GetInvolvedDropdown";
import PartnershipModal from "@/components/PartnershipModal";
import VolunteerModal from "@/components/VolunteerModal";
import FooterSection from "@/components/FooterSection";

const teamMembers: TeamMemberItem[] = [
  {
    id: 1,
    name: "Rajannya Das",
    designation: "Founder & CEO",
    category: "Leadership",
    image: "/ceo.jpeg",
    badge: "FOUNDER & CEO",
    badgeColor: "#F6C656",
    bio: "Leading global oncology advocacy, patient guidance, and youth-led health equity initiatives.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com/carcinoofficial"
    }
  },
  {
    id: 2,
    name: "Sambit Bhattacharjee",
    designation: "Researcher",
    category: "Clinical & Research",
    image: "/sambit_bhattacharjee.jpeg",
    badge: "RESEARCHER",
    badgeColor: "#39C69C",
    bio: "Oncology researcher contributing to healthcare equity, data analysis, and clinical research literacy at The Carcino Foundation.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com/carcinoofficial"
    }
  },
  {
    id: 3,
    name: "Aayush Singh",
    designation: "Chief Operating Officer",
    category: "Leadership",
    image: "/aayush_singh.jpeg",
    badge: "CHIEF OPERATING OFFICER",
    badgeColor: "#CDA8E8",
    bio: "Chief Operating Officer overseeing organizational strategy, operational workflows, and community healthcare initiatives.",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com/carcinoofficial"
    }
  }
];

export default function OurTeamPage() {
  const { lang, toggleLang } = useLanguage();
  const { user, setIsAuthModalOpen } = useAuth();
  const [isLightMode, setIsLightMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  const filteredMembers =
    activeCategory === "All"
      ? teamMembers
      : teamMembers.filter((m) => m.category === activeCategory);

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
      <header className="fixed top-0 left-0 right-0 z-50 flex py-2 sm:py-3 px-3 sm:px-4 md:px-[84px] justify-between items-center w-full max-w-7xl mx-auto transition-all duration-300">
        <Link
          href="/"
          className="flex items-center gap-1.5 py-1.5 px-3 sm:px-4 rounded-full glass-navbar cursor-pointer hover:scale-105 transition-all shrink-0"
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

        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full glass-navbar cursor-pointer hover:scale-105 transition-all shrink-0"
          >
            {isLightMode ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F8F8F8" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line></svg>
            )}
          </button>

          <button
            onClick={toggleLang}
            className="flex items-center justify-center px-2.5 sm:px-3.5 h-8 sm:h-10 rounded-full glass-navbar cursor-pointer hover:scale-105 transition-all font-spaceGrotesk text-xs font-bold gap-1 shrink-0"
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
      <main className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-[84px] gap-16 relative z-10">
        
        {/* Section Title Header */}
        <div className="flex flex-col items-center text-center gap-5 w-full max-w-3xl">
          <div className="flex items-center gap-2 py-1 px-4 rounded-full border bg-white/5 border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#39C69C] animate-pulse" />
            <span className={`font-spaceGrotesk text-xs font-bold uppercase tracking-widest ${isLightMode ? "text-[#0B3E4C]" : "text-[#CDA8E8]"}`}>
              THE PEOPLE BEHIND THE MISSION
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-spaceGrotesk font-bold tracking-tight leading-[1.2em] py-2 overflow-visible">
            <span className={isLightMode ? "bg-gradient-to-r from-[#163B2E] via-[#0B3E4C] to-[#163B2E] bg-clip-text text-transparent" : "headline-textured"}>
              People Behind
            </span>{" "}
            <span className={isLightMode ? "bg-gradient-to-r from-[#0B3E4C] to-[#163B2E] bg-clip-text text-transparent" : "headline-accent"}>
              Carcino
            </span>
          </h1>

          <p className={`font-spaceGrotesk text-base md:text-xl font-light leading-relaxed ${isLightMode ? "text-[#2E1640]" : "text-[#E9CDF8]"}`}>
            Clinical specialists, student researchers, and community leaders united to turn oncology knowledge into accessible care and hope.
          </p>
        </div>

        {/* OVERLAPPING HORIZONTAL TEAM AVATARS WITH SMOOTH POPUP TOOLTIPS */}
        <div className="flex flex-col items-center justify-center gap-3 py-6 px-8 rounded-3xl backdrop-blur-2xl border transition-all w-full max-w-4xl shadow-2xl"
          style={{
            borderColor: isLightMode ? "rgba(147, 51, 234, 0.25)" : "rgba(255, 255, 255, 0.15)",
            backgroundColor: isLightMode ? "rgba(255, 255, 255, 0.7)" : "rgba(11, 11, 12, 0.6)"
          }}
        >
          <span className="font-spaceGrotesk text-xs uppercase font-bold tracking-widest opacity-60">
            HOVER OVER A MEMBER TO VIEW NAME & DESIGNATION
          </span>

          <AnimatedTooltip items={teamMembers} isLightMode={isLightMode} />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          {["All", "Leadership", "Clinical & Research", "Youth & Community"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-2.5 px-6 rounded-full font-spaceGrotesk text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "glass-btn-primary shadow-lg scale-105"
                  : isLightMode
                    ? "bg-white/80 border border-purple-200 text-[#163B2E] hover:bg-white"
                    : "bg-white/5 border border-white/15 text-white/80 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Detailed Team Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`p-7 rounded-3xl border transition-all duration-500 flex flex-col justify-between items-start gap-6 backdrop-blur-xl relative overflow-hidden group hover:-translate-y-2 ${
                isLightMode
                  ? "bg-white/85 border-purple-200/80 shadow-lg hover:border-[#39C69C] hover:shadow-2xl"
                  : "bg-[#0B0B0C]/85 border-white/15 shadow-2xl hover:border-[#CDA8E8]/60 hover:shadow-[0_20px_50px_rgba(194,122,255,0.2)]"
              }`}
            >
              {/* Top Header & Badge */}
              <div className="flex items-center justify-between w-full">
                <div
                  className="flex py-1 px-3 items-center gap-1.5 rounded-full border w-fit"
                  style={{
                    borderColor: member.badgeColor,
                    backgroundColor: `${member.badgeColor}20`,
                  }}
                >
                  <span
                    className="font-spaceGrotesk text-[10px] font-bold tracking-wider uppercase"
                    style={{ color: member.badgeColor }}
                  >
                    {member.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {member.socials?.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-[#39C69C] hover:text-black transition-all"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Avatar + Member Details */}
              <div className="flex items-center gap-4 w-full">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex flex-col items-start overflow-hidden">
                  <h3 className={`font-spaceGrotesk text-lg sm:text-xl font-bold truncate ${isLightMode ? "text-[#163B2E]" : "text-white"}`}>
                    {member.name}
                  </h3>
                  <p className="font-spaceGrotesk text-xs font-semibold tracking-wide" style={{ color: member.badgeColor || "#CDA8E8" }}>
                    {member.designation}
                  </p>
                </div>
              </div>

              {/* Bio Summary */}
              <p className={`font-spaceGrotesk text-xs sm:text-sm font-light leading-relaxed ${isLightMode ? "text-[#2E1640]" : "text-[#E9CDF8]"}`}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Join the Team CTA */}
        <div className="w-full rounded-3xl p-8 sm:p-12 border backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl"
          style={{
            borderColor: isLightMode ? "rgba(57, 198, 156, 0.4)" : "rgba(205, 168, 232, 0.3)",
            backgroundColor: isLightMode ? "rgba(255, 255, 255, 0.85)" : "rgba(11, 11, 12, 0.75)"
          }}
        >
          <div className="flex flex-col items-start gap-3 text-left max-w-xl">
            <h3 className={`font-spaceGrotesk text-2xl sm:text-4xl font-bold ${isLightMode ? "text-[#163B2E]" : "text-white"}`}>
              Want to Join Our Mission?
            </h3>
            <p className={`font-spaceGrotesk text-sm sm:text-base font-light ${isLightMode ? "text-[#2E1640]" : "text-[#E9CDF8]"}`}>
              We are constantly seeking clinical advisors, student researchers, and community advocates to collaborate with us.
            </p>
          </div>

          <button
            onClick={() => setIsVolunteerModalOpen(true)}
            className="py-3.5 px-8 rounded-full glass-btn-primary font-spaceGrotesk text-sm font-bold shadow-lg hover:scale-105 transition-all shrink-0 cursor-pointer"
          >
            Apply to Join Team
          </button>
        </div>

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
