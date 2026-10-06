"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface FooterSectionProps {
  isLightMode?: boolean;
}

export default function FooterSection({ isLightMode = false }: FooterSectionProps) {
  const { t } = useLanguage();
  return (
    <footer
      className={`w-full py-16 md:py-24 px-6 md:px-[84px] border-t transition-colors duration-500 relative z-10 overflow-hidden ${isLightMode
        ? "bg-gradient-to-br from-[#9875C1] to-[#FCC8DF] border-black/10 text-[#163B2E]"
        : "bg-gradient-to-b from-[#050505] via-[#12071a] to-[#050505] border-white/10 text-[#F8F8F8]"
        }`}
    >
      {/* Section-Specific Glow Refraction & Blur Orbs (Optimized Blur) */}
      <div
        className={`absolute bottom-0 right-10 w-[450px] h-[400px] rounded-full blur-[60px] pointer-events-none transition-all duration-700 will-change-transform ${isLightMode ? "bg-[#C27AFF]/35" : "bg-[#B185E5]/20"
          }`}
      />
      <div
        className={`absolute top-0 -left-20 w-[350px] h-[350px] rounded-full blur-[50px] pointer-events-none transition-all duration-700 will-change-transform ${isLightMode ? "bg-[#E9D5FF]/60" : "bg-[#6B21A8]/25"
          }`}
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        {/* Top Section: Brand + Contact & Socials */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 w-full pb-12 border-b border-white/10">
          {/* Brand Logo & Name */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full lg:w-auto">
            <div className="flex items-center justify-center shrink-0 opacity-90 hover:opacity-100 transition-opacity">
              <div className="relative w-[120px] h-[130px] flex items-center justify-center">
                <svg
                  width="144"
                  height="202"
                  viewBox="0 0 144 202"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-24 h-auto"
                >
                  <path
                    d="M37.7966 57.7035C38.6376 50.5423 39.7435 46.4503 45.253 38.723C55.0486 27.0693 62.5347 25.8367 75.4047 23.7175L75.5322 23.6967C93.6082 22.6798 102.195 31.4922 106.488 41.2084C110.782 50.9247 110.148 67.9846 108.861 77.1359C107.574 86.2873 102.421 110.268 73.1589 133.88C81.1805 136.705 81.8977 136.256 91.5745 137.693C100.839 127.864 106.134 120.6 119.48 104.703C132.828 88.8057 140.422 66.7418 142.528 53.1843C144.635 39.6269 145.127 23.6967 133.942 12.1728C122.757 0.648843 100.726 -1.27176 87.1684 0.648849C73.6107 2.56947 49.8854 12.1728 33.3904 25.3914C16.8954 38.61 9.21287 53.1843 3.11194 72.8428C-2.98909 92.5012 0.523859 108.627 8.08301 128.768C20.9198 155.22 36.6668 173.169 50.3372 181.981C64.0082 190.794 73.6107 195.538 88.6371 220.62C107.166 191.358 114.473 180.33 128.745 163.678C119.48 152.381 107.505 145.981 84.0056 142.777C60.5058 139.573 52.9388 131.999 48.5299 131.818C44.121 131.637 39.0395 131.592 37.4577 131.14C35.876 130.688 35.4363 130.624 34.1812 127.864C32.8271 122.983 34.1812 115.888 34.1812 114.871C34.1812 113.854 32.0346 112.499 32.0346 111.142C32.0346 109.787 32.757 108.982 34.2942 108.205C34.2942 108.205 30.7919 106.285 30.7919 104.703C30.7919 103.122 32.3734 97.1338 32.0346 95.7773C31.6958 94.4219 23.6741 92.7272 25.1429 90.0156C26.6117 87.3041 38.074 73.4352 39.4913 70.5831C40.9086 67.7311 37.9966 64.5065 37.7966 57.7035Z"
                    fill={isLightMode ? "#6B21A8" : "#B185E5"}
                  />
                </svg>
                <svg
                  width="91"
                  height="58"
                  viewBox="0 0 91 58"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-14 h-auto absolute -left-1 bottom-1"
                >
                  <path
                    d="M78.0689 0C51.9503 15.3194 34.5305 24.2 12.6537 30.2783L0 57.0541C12.6537 56.1505 56.0379 35.2493 90.0446 10.394L78.0689 0Z"
                    fill={isLightMode ? "#6B21A8" : "#B185E5"}
                  />
                </svg>
              </div>
            </div>
            <h2
              className={`font-winterSolace text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-tight leading-[1.2em] py-2 overflow-visible max-w-xl ${isLightMode ? "text-[#581C87]" : "text-[#9875C1]"
                }`}
            >
              The Carcino Foundation
            </h2>
          </div>

          {/* Social Icons & Contact Section */}
          <div className="flex flex-col items-start lg:items-end gap-5">
            {/* Social Media Icons: X, Instagram, LinkedIn, Medium, YouTube */}
            <div className="flex flex-wrap items-center gap-3">
              {/* X (formerly Twitter) */}
              <a
                href="https://x.com/carcinoofficial?s=20"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                title="X (Twitter)"
                className={`p-3 rounded-full border transition-all duration-300 hover:scale-110 ${isLightMode
                    ? "border-purple-300 bg-white/70 hover:bg-[#CDA8E8] text-[#581C87]"
                    : "border-[#D5B0FF]/30 bg-white/5 hover:bg-[#D5B0FF] hover:text-[#050505] text-[#D5B0FF]"
                  }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/thecarcinofoundation/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className={`p-3 rounded-full border transition-all duration-300 hover:scale-110 ${isLightMode
                    ? "border-purple-300 bg-white/70 hover:bg-[#CDA8E8] text-[#581C87]"
                    : "border-[#D5B0FF]/30 bg-white/5 hover:bg-[#D5B0FF] hover:text-[#050505] text-[#D5B0FF]"
                  }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/thecarcinofoundation/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className={`p-3 rounded-full border transition-all duration-300 hover:scale-110 ${isLightMode
                    ? "border-purple-300 bg-white/70 hover:bg-[#CDA8E8] text-[#581C87]"
                    : "border-[#D5B0FF]/30 bg-white/5 hover:bg-[#D5B0FF] hover:text-[#050505] text-[#D5B0FF]"
                  }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H3.67V10.9h2.79M5.07 6.56a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
                </svg>
              </a>

              {/* Medium */}
              <a
                href="https://medium.com/@thecarcinofoundation"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medium"
                title="Medium"
                className={`p-3 rounded-full border transition-all duration-300 hover:scale-110 ${isLightMode
                    ? "border-purple-300 bg-white/70 hover:bg-[#CDA8E8] text-[#581C87]"
                    : "border-[#D5B0FF]/30 bg-white/5 hover:bg-[#D5B0FF] hover:text-[#050505] text-[#D5B0FF]"
                  }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@carcinofoundation"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube"
                className={`p-3 rounded-full border transition-all duration-300 hover:scale-110 ${isLightMode
                    ? "border-purple-300 bg-white/70 hover:bg-[#CDA8E8] text-[#581C87]"
                    : "border-[#D5B0FF]/30 bg-white/5 hover:bg-[#D5B0FF] hover:text-[#050505] text-[#D5B0FF]"
                  }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col items-start lg:items-end gap-1 font-googleSansFlex">
              <span className="font-inter text-xs font-extrabold tracking-widest text-[#CDA8E8] uppercase">
                {t("foot_contact")}
              </span>
              <a
                href="mailto:carcinofoundation.contact@gmail.com"
                className={`text-base hover:underline transition-colors ${isLightMode ? "text-[#2E1640]" : "text-[#D5B0FF]"
                  }`}
              >
                carcinofoundation.contact@gmail.com
              </a>
              <a
                href="tel:+918777429831"
                className={`text-base hover:underline transition-colors ${isLightMode ? "text-[#2E1640]" : "text-[#D5B0FF]"
                  }`}
              >
                +91 87774 29831
              </a>
            </div>
          </div>
        </div>

        {/* Middle Section: Quick Navigation */}
        <div className="flex flex-wrap items-center justify-start gap-8 w-full">
          <Link
            href="/team"
            className={`font-spaceGrotesk text-base font-semibold hover:underline transition-colors ${isLightMode ? "text-[#581C87]" : "text-[#CDA8E8]"
              }`}
          >
            Our Team
          </Link>
          <Link
            href="/#about"
            className={`font-googleSansFlex text-base hover:underline transition-colors ${isLightMode ? "text-[#2E1640]" : "text-[#D5B0FF]"
              }`}
          >
            {t("foot_tribute")}
          </Link>
        </div>

        {/* Bottom Section: Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10 font-googleSansFlex text-sm">
          <p className={isLightMode ? "text-zinc-600" : "text-[#D5B0FF]/80"}>
            {t("foot_rights")}
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline transition-colors ${isLightMode ? "text-[#2E1640]" : "text-[#D5B0FF]"
                }`}
            >
              {t("foot_privacy")}
            </Link>
            <Link
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline transition-colors ${isLightMode ? "text-[#2E1640]" : "text-[#D5B0FF]"
                }`}
            >
              {t("foot_terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
