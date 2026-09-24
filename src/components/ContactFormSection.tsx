"use client";

import { useState } from "react";
import FadeInUp from "./FadeInUp";

interface ContactFormSectionProps {
  isLightMode?: boolean;
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
    <section id="contact-form" className="py-24 px-6 max-w-4xl mx-auto w-full relative z-10">
      <FadeInUp>
        <div className="flex flex-col items-center text-center mb-12">
          <span className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-[#E9CDF8] mb-4 inline-block">
            ✉️ Contact Owner
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-winterSolace text-white tracking-tight mb-4">
            Get in Touch With Us
          </h2>
          <p className="text-[#E9CDF8] text-base max-w-xl">
            Have questions about clinical research, survivor resources, or partnerships? Send us a message and the foundation owner will receive your details automatically via email with an Excel report attached.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#150a21]/90 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-[#C27AFF]/15 rounded-full blur-[100px] pointer-events-none"></div>

          {statusMsg && (
            <div
              className={`p-4 mb-6 rounded-2xl border text-sm font-medium ${
                statusMsg.type === "success"
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
                <label className="block text-xs font-semibold text-[#E9CDF8]/90 mb-2">
                  Full Name <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E9CDF8]/90 mb-2">
                  Email Address <span className="text-purple-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#E9CDF8]/90 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E9CDF8]/90 mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#120a1c] border border-white/15 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Research & Clinical Data">Research & Clinical Data</option>
                  <option value="Survivor Support Circle">Survivor Support Circle</option>
                  <option value="Foundation Partnership">Foundation Partnership</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#E9CDF8]/90 mb-2">
                Message <span className="text-purple-400">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400 transition-colors"
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
    </section>
  );
}
