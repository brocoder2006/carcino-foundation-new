"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import BranchedMenu from "./BranchedMenu";
import { Book02Icon, UserGroupIcon, Music01Icon } from "@hugeicons/core-free-icons";

interface EditorialMenuPopoverProps {
  isLightMode?: boolean;
  activeNavItem?: string;
  setActiveNavItem?: (item: string) => void;
}

export default function EditorialMenuPopover({
  isLightMode = false,
  activeNavItem = "",
  setActiveNavItem,
}: EditorialMenuPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setIsOpen(false);
    if (value === "articles") {
      if (setActiveNavItem) setActiveNavItem("Articles");
      router.push("/articles");
    } else if (value === "survivors") {
      if (setActiveNavItem) setActiveNavItem("Survivors");
      const section = document.getElementById("survivors-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else if (value === "podcasts") {
      if (setActiveNavItem) setActiveNavItem("Podcasts");
      const section = document.getElementById("podcasts-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isEditorialActive =
    activeNavItem === "Articles" || activeNavItem === "Survivors" || activeNavItem === "Podcasts";

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Editorial Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer text-nowrap flex py-2 px-4 justify-center items-center rounded-[999px] transition-all duration-300 gap-1.5 ${
          isEditorialActive ? "glass-btn-primary" : "glass-nav-item"
        }`}
      >
        <span
          className={`font-inter text-sm ${
            isEditorialActive
              ? "text-[#0C2822] font-bold"
              : `font-medium ${isLightMode ? "text-[#171717]" : "text-[#F8F8F8]"}`
          }`}
        >
          Editorial
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isEditorialActive ? "#0C2822" : isLightMode ? "#171717" : "#F8F8F8"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Floating Popover Container */}
      {isOpen && (
        <div
          className={`absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 z-[100] p-5 rounded-2xl glass-navbar border transition-all duration-300 animate-in fade-in zoom-in-95 shadow-2xl ${
            isLightMode
              ? "bg-white/95 border-purple-300/80 text-[#7E22CE] shadow-purple-900/10"
              : "bg-[#0B0B0C]/95 border-purple-500/35 text-[#E9CDF8] shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(194,122,255,0.25)]"
          }`}
          style={{ width: 280 }}
        >
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
            color={isLightMode ? "#7E22CE" : "#E9CDF8"}
            accentColor={isLightMode ? "#9333EA" : "#C27AFF"}
            lineColor={isLightMode ? "rgba(147, 51, 234, 0.35)" : "rgba(194, 122, 255, 0.45)"}
            width={240}
            rowHeight={38}
            indent={42}
            trunk={14}
            radius={10}
            lineWidth={1.5}
            fontSize={14}
            onSelect={(value) => handleSelect(value)}
          />
        </div>
      )}
    </div>
  );
}
