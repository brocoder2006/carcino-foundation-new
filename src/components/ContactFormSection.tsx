"use client";

import { useState, useEffect } from "react";
import FadeInUp from "./FadeInUp";

interface ContactFormSectionProps {
  isLightMode?: boolean;
}

function TypewriterText({
  text,
  speed = 70,
  delay = 2200,
}: {
  text: string;
  speed?: number;
  delay?: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
    } else if (!isDeleting && displayText.length === text.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delay);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length - 1));
      }, speed / 2);
    } else if (isDeleting && displayText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, text, speed, delay]);

  return (
    <span className="inline-flex items-center">
      <span>{displayText}</span>
      <span className="inline-block w-[2px] h-[1.1em] ml-1 bg-current animate-pulse" />
    </span>
  );
}

export default function ContactFormSection({ isLightMode = false }: ContactFormSectionProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({
          type: "success",
          text: data.message || "Thank you! Your registration has been saved.",
        });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        setStatusMsg({
          type: "error",
          text: data.error || "Failed to submit contact form. Please try again.",
        });
      }
    } catch (err: any) {
      setStatusMsg({
        type: "error",
        text: err.message || "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact-form"
      className="w-full py-24 px-4 sm:px-6 relative z-10 transition-colors duration-500 overflow-hidden bg-[#9875C1]"
    >
      <div className="max-w-4xl mx-auto w-full">
        <FadeInUp>
          <div className="flex flex-col items-center text-center mb-12">
            {/* Typewriter Eyebrow Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs sm:text-sm font-robotoMono font-semibold tracking-wider uppercase border transition-colors ${isLightMode
                  ? "bg-white/15 border-white/30 text-white"
                  : "bg-[#30253C]/20 border-[#30253C]/40 text-[#30253C]"
                }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <TypewriterText text="Your next idea starts here" speed={75} delay={2400} />
            </div>

            <h2 className={`text-4xl md:text-5xl font-extrabold font-syne tracking-tight mb-4 leading-[1.25em] py-2 overflow-visible ${isLightMode ? "text-[#2E1640]" : "text-white"
              }`}>
              Get in Touch With Us
            </h2>
            <p className={`text-base max-w-xl ${isLightMode ? "text-[#2E1640]/90 font-medium" : "text-[#1E112A] font-medium"}`}>
              Have questions about clinical research, survivor resources, or partnerships? Send us a message
            </p>
          </div>

          {/* Form Container */}
          <div className={`backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden transition-colors duration-400 ${isLightMode
              ? "bg-white/95 border border-purple-200/80 shadow-[0_25px_60px_rgba(0,0,0,0.15)]"
              : "bg-[#30253C] border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
            }`}>
            <div className="absolute top-0 right-0 w-60 h-60 bg-[#C27AFF]/15 rounded-full blur-[100px] pointer-events-none"></div>

            {statusMsg && (
              <div
                className={`p-4 mb-6 rounded-2xl border text-sm font-medium ${statusMsg.type === "success"
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                  : "bg-red-500/15 border-red-500/30 text-red-300"
                  }`}
              >
                {statusMsg.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-xs font-semibold mb-2 ${isLightMode ? "text-[#163B2E]" : "text-[#E9CDF8]/90"}`}>
                    Full Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Debjani"
                    className={`w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-purple-400 transition-colors ${isLightMode
                        ? "bg-[#ECE9E9]/60 border border-black/15 text-[#163B2E] placeholder-gray-500"
                        : "bg-white/5 border border-white/15 text-white placeholder-gray-500"
                      }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-2 ${isLightMode ? "text-[#163B2E]" : "text-[#E9CDF8]/90"}`}>
                    Email Address <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="debjani@example.com"
                    className={`w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-purple-400 transition-colors ${isLightMode
                        ? "bg-[#ECE9E9]/60 border border-black/15 text-[#163B2E] placeholder-gray-500"
                        : "bg-white/5 border border-white/15 text-white placeholder-gray-500"
                      }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-xs font-semibold mb-2 ${isLightMode ? "text-[#163B2E]" : "text-[#E9CDF8]/90"}`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91xxxxxxxx"
                    className={`w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-purple-400 transition-colors ${isLightMode
                        ? "bg-[#ECE9E9]/60 border border-black/15 text-[#163B2E] placeholder-gray-500"
                        : "bg-white/5 border border-white/15 text-white placeholder-gray-500"
                      }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-2 ${isLightMode ? "text-[#163B2E]" : "text-[#E9CDF8]/90"}`}>
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-purple-400 transition-colors ${isLightMode
                        ? "bg-[#ECE9E9]/80 border border-black/15 text-[#163B2E]"
                        : "bg-[#120a1c] border border-white/15 text-white"
                      }`}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Research & Clinical Data">Research & Clinical Data</option>
                    <option value="Survivor Support Circle">Survivor Support Circle</option>
                    <option value="Foundation Partnership">Foundation Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-2 ${isLightMode ? "text-[#163B2E]" : "text-[#E9CDF8]/90"}`}>
                  Message <span className="text-purple-400">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className={`w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-purple-400 transition-colors ${isLightMode
                      ? "bg-[#ECE9E9]/60 border border-black/15 text-[#163B2E] placeholder-gray-500"
                      : "bg-white/5 border border-white/15 text-white placeholder-gray-500"
                    }`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full glass-btn-primary font-bold text-sm text-white cursor-pointer disabled:opacity-50 transition-all shadow-lg hover:scale-[1.01]"
              >
                {loading ? "Submitting Registration..." : "Submit Registration"}
              </button>
            </form>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
