"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AnimatedGallery,
  FooterSection,
  GetInvolvedDropdown,
  PartnershipModal,
  VolunteerModal,
} from "@/components";
import { useAuth } from "@/context/AuthContext";

export default function GalleryPage() {
  const { user, setIsAuthModalOpen } = useAuth();
  const [isLightMode, setIsLightMode] = useState(false);
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  return (
    <div
      className={`flex flex-col items-center w-full min-h-screen relative transition-colors duration-500 overflow-x-hidden ${
        isLightMode
          ? "bg-[#ECE9E9] text-[#163B2E]"
          : "bg-[#080a08] text-[#F8F8F8]"
      }`}
    >
      {/* Top Floating Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex py-3 px-4 sm:px-6 md:px-12 justify-between items-center w-full pointer-events-none">
        <Link
          href="/"
          className="flex items-center gap-2 py-2 px-4 rounded-full glass-navbar cursor-pointer hover:scale-105 transition-all shrink-0 pointer-events-auto backdrop-blur-md bg-black/40 border border-white/20 text-white"
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
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span className="font-spaceGrotesk text-xs sm:text-sm font-semibold tracking-tight">
            Back to Home
          </span>
        </Link>

        <div className="flex items-center gap-2.5 pointer-events-auto">
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

      {/* Main Animated Gallery */}
      <div className="w-full">
        <AnimatedGallery isLightMode={isLightMode} />
      </div>

      {/* Footer Section */}
      <FooterSection isLightMode={isLightMode} />

      {/* Modals */}
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

