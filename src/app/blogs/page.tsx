"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import FooterSection from "@/components/FooterSection";
import PartnershipModal from "@/components/PartnershipModal";
import VolunteerModal from "@/components/VolunteerModal";
import GetInvolvedDropdown from "@/components/GetInvolvedDropdown";

export default function Carcinoblogssection() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center bg-[#050505] min-w-full min-h-screen text-white overflow-x-hidden relative">
      {/* Specular Ambient Gradient Blur Orbs */}
      <div className="absolute top-10 left-10 w-[600px] h-[600px] bg-[#39C69C]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[35%] right-0 w-[650px] h-[650px] bg-[#CDA8E8]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[70%] left-10 w-[550px] h-[550px] bg-[#C9A867]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Navigation */}
      <header className="flex py-4 px-6 md:px-20 justify-between items-center glass-navbar w-full z-50 fixed top-0 left-0 right-0 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3 w-fit group cursor-pointer">
          <div className="rounded-lg bg-[#9875C1] w-8 h-8 flex items-center justify-center font-extrabold text-[#050505] text-xs group-hover:scale-105 transition-transform">
            TCF
          </div>
          <p className="text-white font-winterSolace text-xl tracking-tight">
            The Carcino Foundation
          </p>
        </Link>

        <div className="hidden md:flex items-center gap-8 w-fit font-inter text-sm">
          <Link href="/" className="text-zinc-300 hover:text-white transition-colors font-medium">
            {t("nav_home")}
          </Link>
          <Link href="/articles" className="text-zinc-300 hover:text-white transition-colors font-medium">
            {t("nav_articles")}
          </Link>
          <Link href="/blogs" className="text-[#CDA8E8] font-semibold border-b border-[#CDA8E8]">
            Perspective &amp; Blogs
          </Link>
          <GetInvolvedDropdown
            user={user}
            onOpenAuth={() => setIsPartnershipModalOpen(true)}
            onOpenVolunteer={() => setIsVolunteerModalOpen(true)}
            onOpenPartnership={() => setIsPartnershipModalOpen(true)}
            onSignOut={() => setIsPartnershipModalOpen(true)}
          />
        </div>

        <Link
          href="/"
          className="flex py-2 px-5 items-center gap-2 rounded-full border border-white/15 bg-white/5 text-xs font-bold text-white cursor-pointer hover:bg-white/10 hover:scale-105 transition-all shadow-md"
        >
          <span>← Back to Home</span>
        </Link>
      </header>

      {/* Main Blog Page Content */}
      <main className="flex py-[120px] px-6 md:px-[84px] flex-col items-start gap-14 bg-[#050505] w-full max-w-7xl mx-auto pt-32">
        <div className="flex flex-col items-center gap-4 w-full text-center">
          <h1
            className="font-winterSolace text-5xl md:text-[113px] md:leading-[106px] w-full text-center tracking-[-0.0356em] bg-clip-text text-transparent pb-2"
            style={{
              backgroundImage:
                "linear-gradient(91deg, #C08A6E 0.02%, #B3A9C6 29.99%, #9DAE8B 54.96%, #C9A867 79.93%)",
            }}
          >
            The Carcino Perspective
          </h1>
          <div className="flex flex-col items-center w-full">
            <p className="text-[#D5B0FF] font-googleSansFlex text-base md:text-lg font-light leading-[27px] max-w-[640px] text-center tracking-[0.01em]">
              Thoughts, insights, and conversations that go beyond the facts. Our
              blogs explore the social, emotional, scientific, and everyday
              realities of cancer — and encourage you to look at the bigger
              picture.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-stretch gap-6 w-full">
          {/* Card 1 */}
          <Link
            href="/articles/anal-cancer"
            className="flex p-6 flex-col items-start justify-between gap-4 rounded-3xl border border-[rgba(255,255,255,0.10)] bg-[#0B0B0C] w-full overflow-hidden hover:border-[#CDA8E8] hover:shadow-[0_10px_30px_rgba(205,168,232,0.15)] transition-all duration-300 group cursor-pointer"
          >
            <div className="flex flex-col gap-4 w-full">
              <img
                src="/CoverImage.png"
                className="flex flex-col items-start rounded-2xl w-full h-[180px] object-cover overflow-hidden max-w-none group-hover:scale-105 transition-transform duration-500"
                alt="Cover Image"
              />
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2 w-fit">
                  <p className="text-[rgba(255,255,255,0.30)] font-inter text-sm font-bold w-fit">
                    01
                  </p>
                  <p className="text-[#CDA8E8] font-googleSansFlex text-sm font-medium w-fit tracking-[0.01em]">
                    TCF INSIGHTS
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center rounded-2xl bg-[rgba(255,255,255,0.04)] w-8 h-8 group-hover:bg-[#CDA8E8] transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 w-4 h-4 overflow-hidden relative"
                  >
                    <g clipPath="url(#clip0_305_1231)">
                      <path
                        d="M8.00021 14.6672C11.6824 14.6672 14.6674 11.6822 14.6674 7.99996C14.6674 4.31777 11.6824 1.33276 8.00021 1.33276C4.31801 1.33276 1.33301 4.31777 1.33301 7.99996C1.33301 11.6822 4.31801 14.6672 8.00021 14.6672Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="group-hover:stroke-[#050505] transition-colors"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_305_1231">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <p className="line-clamp-1 overflow-hidden text-[#FFF] text-ellipsis font-inter text-[22px] font-bold leading-7 w-full group-hover:text-[#CDA8E8] transition-colors">
                  Understanding NET Pathology
                </p>
                <p className="line-clamp-3 overflow-hidden text-[#D5B0FF] text-ellipsis font-googleSansFlex text-sm font-light leading-[21px] w-full tracking-[0.0129em]">
                  A patient's clear guide to deciphering Ki-67 indexes, tumor
                  grading, and specialized pathology reports.
                </p>
              </div>
            </div>
            <div className="w-full space-y-3">
              <div className="bg-[rgba(255,255,255,0.05)] h-[1px] w-full"></div>
              <div className="flex justify-between items-center w-full">
                <p className="line-clamp-1 overflow-hidden text-[rgba(255,255,255,0.50)] text-ellipsis font-googleSansFlex text-[13px] w-fit">
                  By Dr. Aris Vance
                </p>
                <p className="text-[#CDA8E8] font-googleSansFlex text-[13px] w-fit">
                  6 min read
                </p>
              </div>
            </div>
          </Link>

          {/* Card 2 */}
          <Link
            href="/articles/stomach-cancer"
            className="flex p-6 flex-col items-start justify-between gap-4 rounded-3xl border border-[rgba(255,255,255,0.10)] bg-[#0B0B0C] w-full overflow-hidden hover:border-[#CDA8E8] hover:shadow-[0_10px_30px_rgba(205,168,232,0.15)] transition-all duration-300 group cursor-pointer"
          >
            <div className="flex flex-col gap-4 w-full">
              <img
                src="/CoverImage(1).png"
                className="flex flex-col items-start rounded-2xl w-full h-[180px] object-cover overflow-hidden max-w-none group-hover:scale-105 transition-transform duration-500"
                alt="Cover Image"
              />
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2 w-fit">
                  <p className="text-[rgba(255,255,255,0.30)] font-inter text-sm font-bold w-fit">
                    02
                  </p>
                  <p className="text-[#CDA8E8] font-googleSansFlex text-sm font-medium w-fit tracking-[0.01em]">
                    TCF ADVOCACY
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center rounded-2xl bg-[rgba(255,255,255,0.04)] w-8 h-8 group-hover:bg-[#CDA8E8] transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 w-4 h-4 overflow-hidden relative"
                  >
                    <g clipPath="url(#clip0_305_1247)">
                      <path
                        d="M8.2729 2.7634L6.39075 4.92986C6.14076 5.22404 6.00033 5.62299 6.00033 6.03897C6.00033 6.45495 6.14076 6.8539 6.39075 7.14808C6.6408 7.44218 6.97991 7.6074 7.33349 7.6074C7.68707 7.6074 8.02617 7.44218 8.27623 7.14808L9.41632 5.80679C9.56553 5.63117 9.7427 5.49185 9.93769 5.3968C10.1327 5.30175 10.3417 5.25283 10.5527 5.25283C10.7638 5.25283 10.9728 5.30175 11.1678 5.3968C11.3628 5.49185 11.54 5.63117 11.6892 5.80679L12.9433 7.283C13.1933 7.57719 13.3337 7.97613 13.3337 8.39211C13.3337 8.80809 13.1933 9.20704 12.9433 9.50123C14.0007 8.2572 14.6674 7.21554 14.6674 5.64678C14.6674 4.77392 14.4423 3.9216 14.0219 3.20239C13.6015 2.48317 13.0056 1.9309 12.3128 1.61851C11.62 1.30613 10.863 1.24832 10.1417 1.45273C9.42041 1.65714 8.76879 2.11415 8.2729 2.7634ZM12.9433 9.50123C12.8118 9.65596 12.6556 9.7787 12.4838 9.86244C12.312 9.94618 12.1278 9.98928 11.9419 9.98928C11.7559 9.98928 11.5717 9.94618 11.3999 9.86244C11.2281 9.7787 11.0719 9.65596 10.9404 9.50123C11.0828 9.65269 11.1975 9.83663 11.2776 10.0419C11.3577 10.2471 11.4015 10.4694 11.4063 10.6951C11.4111 10.9209 11.3769 11.1454 11.3057 11.3551C11.2344 11.5648 11.1277 11.7553 10.992 11.915C10.8563 12.0747 10.6943 12.2003 10.5161 12.284C10.3378 12.3678 10.147 12.4081 9.95508 12.4025C9.76319 12.3968 9.57427 12.3453 9.39983 12.2511C9.22538 12.1568 9.06903 12.0219 8.94028 11.8544C9.0719 12.0086 9.17637 12.1918 9.24775 12.3936C9.31912 12.5954 9.35598 12.8117 9.35623 13.0303C9.35648 13.2488 9.3201 13.4653 9.24919 13.6673C9.17828 13.8693 9.07421 14.0529 8.94295 14.2075C8.81626 14.3566 8.66532 14.4741 8.49916 14.5531C8.33299 14.632 8.15501 14.6707 7.97584 14.6669C7.79667 14.6631 7.61999 14.6168 7.45636 14.5309C7.29273 14.445 7.1455 14.3211 7.02346 14.1667L3.33317 9.96087C2.33309 8.7843 1.33301 7.45086 1.33301 5.64678C1.33316 4.77399 1.55832 3.92178 1.97876 3.20269C2.39921 2.48359 2.99516 1.93145 3.68791 1.61916C4.38067 1.30687 5.13764 1.24913 5.85887 1.45356C6.5801 1.65799 7.23167 2.11498 7.72752 2.76418C7.80165 2.84523 7.89914 2.89022 8.00034 2.89008C8.10154 2.88993 8.19894 2.84466 8.2729 2.7634"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="group-hover:stroke-[#050505] transition-colors"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_305_1247">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <p className="line-clamp-1 overflow-hidden text-[#FFF] text-ellipsis font-inter text-[22px] font-bold leading-7 w-full group-hover:text-[#CDA8E8] transition-colors">
                  Nutrition &amp; NETs: What to Know
                </p>
                <p className="line-clamp-3 overflow-hidden text-[#D5B0FF] text-ellipsis font-googleSansFlex text-sm font-light leading-[21px] w-full tracking-[0.0129em]">
                  Evidence-backed dietary strategies, symptom management, and
                  restorative recipes designed for carcinoid syndrome.
                </p>
              </div>
            </div>
            <div className="w-full space-y-3">
              <div className="bg-[rgba(255,255,255,0.05)] h-[1px] w-full"></div>
              <div className="flex justify-between items-center w-full">
                <p className="line-clamp-1 overflow-hidden text-[rgba(255,255,255,0.50)] text-ellipsis font-googleSansFlex text-[13px] w-fit">
                  By Elena Rostova
                </p>
                <p className="text-[#CDA8E8] font-googleSansFlex text-[13px] w-fit">
                  8 min read
                </p>
              </div>
            </div>
          </Link>

          {/* Card 3 */}
          <Link
            href="/articles/colon-cancer"
            className="flex p-6 flex-col items-start justify-between gap-4 rounded-3xl border border-[rgba(255,255,255,0.10)] bg-[#0B0B0C] w-full overflow-hidden hover:border-[#CDA8E8] hover:shadow-[0_10px_30px_rgba(205,168,232,0.15)] transition-all duration-300 group cursor-pointer"
          >
            <div className="flex flex-col gap-4 w-full">
              <img
                src="/CoverImage(2).png"
                className="flex flex-col items-start rounded-2xl w-full h-[180px] object-cover overflow-hidden max-w-none group-hover:scale-105 transition-transform duration-500"
                alt="Cover Image"
              />
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2 w-fit">
                  <p className="text-[rgba(255,255,255,0.30)] font-inter text-sm font-bold w-fit">
                    03
                  </p>
                  <p className="text-[#CDA8E8] font-googleSansFlex text-sm font-medium w-fit tracking-[0.01em]">
                    TCF CONNECTION
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center rounded-2xl bg-[rgba(255,255,255,0.04)] w-8 h-8 group-hover:bg-[#CDA8E8] transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 w-4 h-4 overflow-hidden relative"
                  >
                    <g clipPath="url(#clip0_305_1263)">
                      <path
                        d="M10.6671 14.6672V13.1856C10.6671 12.3997 10.3861 11.646 9.88598 11.0903C9.38584 10.5346 8.70751 10.2224 8.00021 10.2224H3.99989C3.29259 10.2224 2.61426 10.5346 2.11412 11.0903C1.61398 11.646 1.33301 12.3997 1.33301 13.1856V14.6672M10.6671 1.42753C11.239 1.59227 11.7454 1.96333 12.107 2.48248C12.4685 3.00163 12.6647 3.63948 12.6647 4.29591C12.6647 4.95234 12.4685 5.59019 12.107 6.10934C11.7454 6.6285 11.239 6.99956 10.6671 7.16429M14.6674 14.6671V13.1855C14.667 12.5289 14.4703 11.8911 14.1083 11.3722C13.7463 10.8533 13.2394 10.4827 12.6672 10.3186M8.66693 4.29596C8.66693 5.93249 7.47292 7.25916 6.00005 7.25916C4.52717 7.25916 3.33317 5.93249 3.33317 4.29596C3.33317 2.65943 4.52717 1.33276 6.00005 1.33276C7.47292 1.33276 8.66693 2.65943 8.66693 4.29596Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="group-hover:stroke-[#050505] transition-colors"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_305_1263">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <p className="line-clamp-1 overflow-hidden text-[#FFF] text-ellipsis font-inter text-[22px] font-bold leading-7 w-full group-hover:text-[#CDA8E8] transition-colors">
                  Navigating the Scanxiety Cycle
                </p>
                <p className="line-clamp-3 overflow-hidden text-[#D5B0FF] text-ellipsis font-googleSansFlex text-sm font-light leading-[21px] w-full tracking-[0.0129em]">
                  Oncology social workers share clinical coping mechanisms for
                  dealing with emotional stress before routine surveillance.
                </p>
              </div>
            </div>
            <div className="w-full space-y-3">
              <div className="bg-[rgba(255,255,255,0.05)] h-[1px] w-full"></div>
              <div className="flex justify-between items-center w-full">
                <p className="line-clamp-1 overflow-hidden text-[rgba(255,255,255,0.50)] text-ellipsis font-googleSansFlex text-[13px] w-fit">
                  By Sarah Jenkins, LCSW
                </p>
                <p className="text-[#CDA8E8] font-googleSansFlex text-[13px] w-fit">
                  5 min read
                </p>
              </div>
            </div>
          </Link>

          {/* Card 4 */}
          <Link
            href="/articles/breast-cancer"
            className="flex p-6 flex-col items-start justify-between gap-4 rounded-3xl border border-[rgba(255,255,255,0.10)] bg-[#0B0B0C] w-full overflow-hidden hover:border-[#CDA8E8] hover:shadow-[0_10px_30px_rgba(205,168,232,0.15)] transition-all duration-300 group cursor-pointer"
          >
            <div className="flex flex-col gap-4 w-full">
              <img
                src="/CoverImage(3).png"
                className="flex flex-col items-start rounded-2xl w-full h-[180px] object-cover overflow-hidden max-w-none group-hover:scale-105 transition-transform duration-500"
                alt="Cover Image"
              />
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2 w-fit">
                  <p className="text-[rgba(255,255,255,0.30)] font-inter text-sm font-bold w-fit">
                    04
                  </p>
                  <p className="text-[#CDA8E8] font-googleSansFlex text-sm font-medium w-fit tracking-[0.01em]">
                    TCF VOICES
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center rounded-2xl bg-[rgba(255,255,255,0.04)] w-8 h-8 group-hover:bg-[#CDA8E8] transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 w-4 h-4 overflow-hidden relative"
                  >
                    <g clipPath="url(#clip0_305_1279)">
                      <path
                        d="M8.00021 12.667V14.6672M1.33301 6.66652V7.99996C1.33301 9.23774 2.03544 10.4248 3.28579 11.3001C4.53613 12.1753 6.23196 12.667 8.00021 12.667C9.76846 12.667 11.4643 12.1753 12.7146 11.3001C13.965 10.4248 14.6674 9.23774 14.6674 7.99996V6.66652M8.00021 1.33276C9.57829 1.33276 10.8576 2.22827 10.8576 3.33292V7.99996C10.8576 9.10462 9.57829 10.0001 8.00021 10.0001C6.42213 10.0001 5.14284 9.10462 5.14284 7.99996V3.33292C5.14284 2.22827 6.42213 1.33276 8.00021 1.33276Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="group-hover:stroke-[#050505] transition-colors"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_305_1279">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <p className="line-clamp-1 overflow-hidden text-[#FFF] text-ellipsis font-inter text-[22px] font-bold leading-7 w-full group-hover:text-[#CDA8E8] transition-colors">
                  The Power of Patient Advocacy
                </p>
                <p className="line-clamp-3 overflow-hidden text-[#D5B0FF] text-ellipsis font-googleSansFlex text-sm font-light leading-[21px] w-full tracking-[0.0129em]">
                  How active self-advocacy and expert second opinions transform
                  long-term outcomes in neuroendocrine care.
                </p>
              </div>
            </div>
            <div className="w-full space-y-3">
              <div className="bg-[rgba(255,255,255,0.05)] h-[1px] w-full"></div>
              <div className="flex justify-between items-center w-full">
                <p className="line-clamp-1 overflow-hidden text-[rgba(255,255,255,0.50)] text-ellipsis font-googleSansFlex text-[13px] w-fit">
                  By Marcus Brody
                </p>
                <p className="text-[#CDA8E8] font-googleSansFlex text-[13px] w-fit">
                  4 min read
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Explore Button */}
        <div className="flex flex-col items-center w-full pt-4">
          <Link
            href="/articles"
            className="cursor-pointer text-nowrap flex py-3.5 px-8 justify-center items-center gap-2 rounded-[999px] bg-[#39C69C] hover:bg-[#2fb18a] hover:scale-105 transition-all w-fit shadow-lg"
          >
            <p className="text-[#050505] font-googleSansFlex text-sm font-medium leading-5 w-fit">
              Explore All Journal Articles
            </p>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 overflow-hidden relative"
            >
              <path
                d="M3.33301 7.99996H12.6674M8.00021 12.6672L12.6674 7.99996L8.00021 3.33276"
                stroke="#050505"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>
      </main>

      {/* Footer Section */}
      <FooterSection isLightMode={false} />

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
