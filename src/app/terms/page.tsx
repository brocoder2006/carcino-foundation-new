"use client";

import Link from "next/link";
import FooterSection from "@/components/FooterSection";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#1E1727] via-[#30253C] to-[#160E21] min-w-full min-h-screen text-white overflow-x-hidden relative">
      {/* Specular Ambient Gradient Blur Orbs */}
      <div className="absolute top-10 left-10 w-[600px] h-[600px] bg-[#39C69C]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[30%] right-0 w-[650px] h-[650px] bg-[#CDA8E8]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[65%] left-10 w-[550px] h-[550px] bg-[#C9A867]/12 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="flex py-4 px-6 md:px-20 justify-between items-center glass-navbar w-full z-50 fixed top-0 left-0 right-0">
        <Link href="/" className="flex items-center gap-3 w-fit group cursor-pointer">
          <div className="rounded-lg bg-[#9875C1] w-8 h-8 flex items-center justify-center font-extrabold text-[#050505] text-xs group-hover:scale-105 transition-transform">
            TCF
          </div>
          <p className="text-white font-winterSolace text-xl tracking-tight">
            The Carcino Foundation
          </p>
        </Link>
        <Link
          href="/"
          className="flex py-2 px-5 items-center gap-2 rounded-full glass-btn-primary text-xs font-bold text-white cursor-pointer hover:scale-105 transition-all shadow-md"
        >
          <span>← Back to Home</span>
        </Link>
      </header>

      {/* Main Content Container */}
      <main className="flex pt-32 pb-20 px-6 flex-col items-center w-full max-w-4xl mx-auto relative z-10">
        {/* Title Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14 w-full">
          <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-[#E9CDF8] inline-block">
            LEGAL AGREEMENT
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-winterSolace text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-[#E9CDF8] font-inter text-sm font-medium">
            Effective Date: 20/02/2025
          </p>
        </div>

        {/* Content Box */}
        <div className="w-full bg-[#120a1c]/80 backdrop-blur-xl border border-white/10 p-8 md:p-14 rounded-3xl shadow-2xl flex flex-col gap-10 text-[#E9CDF8]/90 font-inter text-base leading-relaxed">
          
          <p className="text-lg text-white font-medium">
            Welcome to The Carcino Foundation. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
          </p>

          {/* Section 1 */}
          <section className="space-y-3 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              1. Acceptance of Terms
            </h2>
            <p>
              By using this site, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave the website accordingly.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              2. Medical Disclaimer
            </h2>
            <p>
              The content on this website is for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <div className="space-y-3 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm">
              <p>
                • Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
              <p>
                • Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              3. Intellectual Property
            </h2>
            <p>
              All materials and services provided on this website are the property of The Carcino Foundation, its affiliates, directors, developers, designers, employees or licensors including all copyrights and other intellectual property.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              4. User Accounts & Contributions
            </h2>
            <p>If you post personal stories, comments, or images to our site:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                You grant The Carcino Foundation a non-exclusive license to use, reproduce, and publish that content in connection with our mission.
              </li>
              <li>
                You agree not to post content that is defamatory, obscene, or violates the privacy of others.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              5. Limitation of Liability
            </h2>
            <p>
              The Carcino Foundation is not liable for any damages that may occur to you as a result of your misuse of our website. We reserve the right to edit, modify, and change this Agreement at any time.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              6. Governing Law
            </h2>
            <p>
              By visiting this website, you agree that the laws of India will govern these terms and conditions, or any dispute of any sort that might come between The Carcino Foundation and you.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              7. External Links
            </h2>
            <p>
              Our website may contain links to third-party websites (such as medical journals or partner organizations). We are not responsible for the content or accuracy of these external sites.
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
