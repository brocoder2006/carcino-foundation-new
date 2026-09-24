"use client";

import { useState } from "react";

interface OpportunityRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunityTitle?: string;
  category?: string;
}

export default function OpportunityRegistrationModal({
  isOpen,
  onClose,
  opportunityTitle = "Clinical Research Partner",
  category = "Clinical Opportunity",
}: OpportunityRegistrationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/opportunities/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          opportunityTitle,
          category,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({
          type: "success",
          text: data.message || "Registration submitted successfully!",
        });
        setFormData({ fullName: "", email: "", phone: "", message: "" });
      } else {
        setStatusMsg({
          type: "error",
          text: data.error || "Registration failed. Please try again.",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#12081d] border border-purple-500/20 rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl overflow-hidden">
        {/* Ambient Blur */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#C27AFF]/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex justify-between items-center mb-6 relative z-10">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/20 text-[#E9CDF8] border border-purple-500/30">
              {category}
            </span>
            <h3 className="text-xl font-bold text-white font-winterSolace mt-2">
              Register: {opportunityTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {statusMsg && (
          <div
            className={`p-4 mb-5 rounded-2xl border text-sm font-medium ${
              statusMsg.type === "success"
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                : "bg-red-500/15 border-red-500/30 text-red-300"
            }`}
          >
            {statusMsg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-semibold text-[#E9CDF8] mb-1.5">
              Full Name <span className="text-purple-400">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Dr. Alex Vance"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#E9CDF8] mb-1.5">
              Email Address <span className="text-purple-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@research.org"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#E9CDF8] mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#E9CDF8] mb-1.5">
              Message / Application Statement
            </label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Briefly state your experience or reason for registering..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-2/3 py-3 rounded-full glass-btn-primary font-bold text-xs text-white cursor-pointer disabled:opacity-50 transition-all shadow-md hover:scale-[1.02]"
            >
              {loading ? "Registering..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
