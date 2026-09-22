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
        ? "bg-[#F8F4FA] border-purple-200/60 text-[#171717]"
        : "bg-[#050505] border-white/10 text-[#F8F8F8]"
        }`}
    >
      {/* Glow Refraction Orbs */}
      <div
        className={`absolute bottom-0 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${isLightMode ? "bg-[#C27AFF]/15" : "bg-[#B185E5]/10"
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
                  width="100"
                  height="140"
                  viewBox="0 0 144 221"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-24 h-auto"
                >
                  <path
                    d="M37.7966 57.6996C38.6376 50.5384 39.7435 46.4464 45.253 38.7191C55.0486 27.0654 62.5347 25.8328 75.4047 23.7136L75.5322 23.6928C93.6082 22.6759 102.195 31.4883 106.488 41.2045C110.782 50.9208 110.148 67.9807 108.861 77.132C107.574 86.2834 102.421 110.264 73.1589 133.876C81.1805 136.702 81.8977 136.253 91.5745 137.689C100.839 127.86 106.134 120.596 119.48 104.699C132.828 88.8018 140.422 66.7379 142.528 53.1804C144.635 39.6229 145.127 23.6928 133.942 12.1688C122.757 0.644937 100.726 -1.27567 87.1684 0.644943C73.6107 2.56556 49.8854 12.1688 33.3904 25.3875C16.8954 38.6061 9.21287 53.1804 3.11194 72.8389C-2.98909 92.4972 0.523859 108.623 8.08301 128.764C20.9198 155.216 36.6668 173.165 50.3372 181.977C64.0082 190.79 73.6107 195.534 88.6371 220.616C107.166 191.354 114.473 180.326 128.745 163.674C119.48 152.377 107.505 145.977 84.0056 142.773C60.5058 139.569 52.9388 131.995 48.5299 131.814C44.121 131.633 39.0395 131.588 37.4577 131.136C35.876 130.684 35.4363 130.62 34.1812 127.86C32.8271 122.979 34.1812 115.884 34.1812 114.867C34.1812 113.85 32.0346 112.495 32.0346 111.138C32.0346 109.783 32.757 108.978 34.2942 108.201C34.2942 108.201 30.7919 106.281 30.7919 104.699C30.7919 103.118 32.3734 97.1299 32.0346 95.7734C31.6958 94.4179 23.6741 92.7233 25.1429 90.0117C26.6117 87.3002 38.074 73.4313 39.4913 70.5792C40.9086 67.7272 37.9966 64.5026 37.7966 57.6996Z"
                    fill={isLightMode ? "#6B21A8" : "#B185E5"}
                  />
                </svg>
              </div>
            </div>
            <h2
              className={`font-winterSolace text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-tight leading-tight max-w-xl ${isLightMode ? "text-[#581C87]" : "text-[#B185E5]"
                }`}
            >
              The Carcino Foundation
            </h2>
          </div>

          {/* Social Icons & Contact Section */}
          <div className="flex flex-col items-start lg:items-end gap-5">
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className={`p-2.5 rounded-full border transition-all duration-300 hover:scale-110 ${isLightMode
                  ? "border-purple-300 bg-white/70 hover:bg-[#CDA8E8] text-[#581C87]"
                  : "border-[#D5B0FF]/30 bg-white/5 hover:bg-[#D5B0FF] hover:text-[#050505] text-[#D5B0FF]"
                  }`}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.125 0.625H4.79167C2.49048 0.625 0.625 2.49048 0.625 4.79167V13.125C0.625 15.4262 2.49048 17.2917 4.79167 17.2917H13.125C15.4262 17.2917 17.2917 15.4262 17.2917 13.125V4.79167C17.2917 2.49048 15.4262 0.625 13.125 0.625Z"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.25562 3.46939C7.35846 4.16293 7.24 4.87124 6.91708 5.49357C6.59416 6.1159 6.08324 6.62057 5.45697 6.93579C4.8307 7.251 4.12099 7.36072 3.42877 7.24934C2.73655 7.13795 2.09708 6.81113 1.60131 6.31536C1.10555 5.81959 0.778725 5.18012 0.667338 4.4879C0.555951 3.79569 0.66567 3.08597 0.980887 2.4597C1.2961 1.83344 1.80077 1.32251 2.4231 0.999593C3.04543 0.676677 3.75374 0.558216 4.44728 0.661059C5.15472 0.765962 5.80966 1.09561 6.31536 1.60131C6.82106 2.10702 7.15071 2.76196 7.25562 3.46939Z"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className={`p-2.5 rounded-full border transition-all duration-300 hover:scale-110 ${isLightMode
                  ? "border-purple-300 bg-white/70 hover:bg-[#CDA8E8] text-[#581C87]"
                  : "border-[#D5B0FF]/30 bg-white/5 hover:bg-[#D5B0FF] hover:text-[#050505] text-[#D5B0FF]"
                  }`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.0002 1.6665H12.5002C11.3951 1.6665 10.3353 2.10549 9.55388 2.88689C8.77248 3.66829 8.3335 4.7281 8.3335 5.83317V8.33317H5.8335V11.6665H8.3335V18.3332H11.6668V11.6665H14.1668L15.0002 8.33317H11.6668V5.83317C11.6668 5.61216 11.7546 5.4002 11.9109 5.24391C12.0672 5.08763 12.2791 4.99984 12.5002 4.99984H15.0002V1.6665Z"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className={`p-2.5 rounded-full border transition-all duration-300 hover:scale-110 ${isLightMode
                  ? "border-purple-300 bg-white/70 hover:bg-[#CDA8E8] text-[#581C87]"
                  : "border-[#D5B0FF]/30 bg-white/5 hover:bg-[#D5B0FF] hover:text-[#050505] text-[#D5B0FF]"
                  }`}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.625 0.625C6.95108 0.625 8.22285 1.15178 9.16053 2.08947C10.0982 3.02715 10.625 4.29892 10.625 5.625V11.4583H7.29167V5.625C7.29167 5.18297 7.11607 4.75905 6.80351 4.44649C6.49095 4.13393 6.06703 3.95833 5.625 3.95833C5.18297 3.95833 4.75905 4.13393 4.44649 4.44649C4.13393 4.75905 3.95833 5.18297 3.95833 5.625V11.4583H0.625V5.625C0.625 4.29892 1.15178 3.02715 2.08947 2.08947C3.02715 1.15178 4.29892 0.625 5.625 0.625Z"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col items-start lg:items-end gap-1 font-googleSansFlex">
              <span className="font-inter text-xs font-extrabold tracking-widest text-[#CDA8E8] uppercase">
                {t("foot_contact")}
              </span>
              <a
                href="mailto:support@carcino.work"
                className={`text-base hover:underline transition-colors ${isLightMode ? "text-[#581C87]" : "text-[#D5B0FF]"
                  }`}
              >
                support@carcino.work
              </a>
              <a
                href="tel:+918777429831"
                className={`text-base hover:underline transition-colors ${isLightMode ? "text-[#581C87]" : "text-[#D5B0FF]"
                  }`}
              >
                +91 87774 29831
              </a>
            </div>
          </div>
        </div>

        {/* Middle Section: Tribute */}
        <div className="flex items-center justify-start w-full">
          <Link
            href="/#about"
            className={`font-googleSansFlex text-base hover:underline transition-colors ${isLightMode ? "text-[#581C87]" : "text-[#D5B0FF]"
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
              className={`hover:underline transition-colors ${isLightMode ? "text-[#581C87]" : "text-[#D5B0FF]"
                }`}
            >
              {t("foot_privacy")}
            </Link>
            <Link
              href="/terms"
              className={`hover:underline transition-colors ${isLightMode ? "text-[#581C87]" : "text-[#D5B0FF]"
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
