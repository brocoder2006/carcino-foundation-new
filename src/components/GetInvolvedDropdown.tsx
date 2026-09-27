"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogOut, HeartHandshake, Users, ChevronDown, UserPlus, ExternalLink, LogIn } from "lucide-react";

interface GetInvolvedDropdownProps {
  user: any;
  onOpenAuth: () => void;
  onOpenVolunteer: () => void;
  onOpenPartnership: () => void;
  onSignOut: () => void;
  isLightMode?: boolean;
  align?: "right" | "left" | "center";
}

export default function GetInvolvedDropdown({
  user,
  onOpenAuth,
  onOpenVolunteer,
  onOpenPartnership,
  onSignOut,
  isLightMode = false,
  align = "right",
}: GetInvolvedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  const getAlignClass = () => {
    if (align === "left") return "left-0";
    if (align === "center") return "left-1/2 -translate-x-1/2";
    return "right-0";
  };

  const JOIN_TEAM_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfhPy9AsGU5N1UrBstZeTpLd1jJ1ClJaESrq-P8ZrsRCXTVJw/viewform?usp=dialog";

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      {/* Primary Trigger Button */}
      <button
        type="button"
        onClick={handleButtonClick}
        aria-label="Get involved"
        className={`flex items-center justify-center px-3.5 md:px-4 h-9 md:h-10 rounded-full font-inter text-xs font-bold transition-all duration-300 gap-1.5 cursor-pointer shadow-md ${
          isLightMode
            ? "bg-[#163B2E] text-white hover:bg-[#235846] hover:scale-105 active:scale-95"
            : "glass-btn-primary text-white hover:scale-105 active:scale-95"
        }`}
      >
        <User className="w-3.5 h-3.5" />
        <span>Get involved</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-emerald-300" : "text-white/70"
          }`}
        />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div
          className={`absolute mt-2 w-64 max-w-[calc(100vw-32px)] rounded-2xl p-2 border shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50 ${getAlignClass()} ${
            isLightMode
              ? "bg-white/95 border-black/10 text-gray-900 shadow-xl"
              : "bg-[#0E0B14]/95 border-white/15 text-white shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
          }`}
        >
          {/* User Badge Section (if logged in) */}
          {user && (
            <div className="px-3 py-2 mb-1 border-b border-white/10 flex flex-col">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                Signed in as
              </span>
              <span className="text-xs font-bold truncate text-white">
                {user.fullName || user.email || "Member"}
              </span>
            </div>
          )}

          {/* Form & Action Options */}
          <div className="flex flex-col gap-1">
            {/* Volunteer Form */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                if (!user) {
                  onOpenAuth();
                } else {
                  onOpenVolunteer();
                }
              }}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                isLightMode
                  ? "hover:bg-emerald-50 text-gray-800"
                  : "hover:bg-white/10 text-zinc-200 hover:text-white"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold">Volunteer Form</span>
                <span className="text-[10px] text-zinc-400 truncate">Join our initiatives</span>
              </div>
            </button>

            {/* Partnership Form */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                if (!user) {
                  onOpenAuth();
                } else {
                  onOpenPartnership();
                }
              }}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                isLightMode
                  ? "hover:bg-purple-50 text-gray-800"
                  : "hover:bg-white/10 text-zinc-200 hover:text-white"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold">Partnership Form</span>
                <span className="text-[10px] text-zinc-400 truncate">Collaborate with Carcino</span>
              </div>
            </button>

            {/* Join the Team (Google Form Redirect) */}
            <a
              href={JOIN_TEAM_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                isLightMode
                  ? "hover:bg-blue-50 text-gray-800"
                  : "hover:bg-white/10 text-zinc-200 hover:text-white"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <UserPlus className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold">Join the Team</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 shrink-0 ml-1" />
                </div>
                <span className="text-[10px] text-zinc-400 truncate">Apply to work with Carcino</span>
              </div>
            </a>
          </div>

          {/* Auth Footer Option */}
          <div className="mt-1 pt-1 border-t border-white/10">
            {user ? (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onSignOut();
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/15 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenAuth();
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-emerald-400 hover:bg-emerald-500/15 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
