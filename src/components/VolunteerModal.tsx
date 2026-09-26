"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VolunteerModal({ isOpen, onClose }: VolunteerModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: "",
    areaOfInterest: "Clinical Content Review",
    availability: "2-5 hours/week",
    experience: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.fullName || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/volunteers/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({
          type: "success",
          text: data.message || "Volunteer registration submitted successfully!",
        });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          areaOfInterest: "Clinical Content Review",
          availability: "2-5 hours/week",
          experience: "",
        });
      } else {
        setStatusMsg({
          type: "error",
          text: data.error || "Submission failed. Please try again.",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0D0B12] border border-[#39C69C]/30 rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(57,198,156,0.2)] overflow-hidden text-white">
        {/* Ambient Blur Orb */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#39C69C]/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#CDA8E8]/15 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#39C69C]/20 text-[#39C69C] border border-[#39C69C]/30 inline-block uppercase tracking-wider">
              JOIN OUR MISSION
            </span>
            <h3 className="text-2xl font-bold font-winterSolace text-white mt-2">
              Volunteer with TCF
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Contribute your skills to empower carcinoid patients &amp; clinical advocacy.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {statusMsg ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#39C69C]/20 border border-[#39C69C]/40 text-[#39C69C] flex items-center justify-center text-2xl mx-auto">
              ✓
            </div>
            <h4 className="text-xl font-bold text-white font-winterSolace">Welcome to the Team!</h4>
            <p className="text-sm text-[#D5B0FF] max-w-xs mx-auto leading-relaxed">
              {statusMsg.text}
            </p>
            <button
              onClick={() => {
                setStatusMsg(null);
                onClose();
              }}
              className="mt-4 py-2.5 px-6 rounded-full bg-[#39C69C] text-[#050505] font-inter text-sm font-bold hover:bg-[#2fb18a] transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Alex Morgan"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39C69C] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39C69C] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 xxxxxxxxxx"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39C69C] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Area of Interest
                </label>
                <select
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#160E21] border border-white/10 text-white text-sm focus:outline-none focus:border-[#39C69C] transition-colors"
                >
                  <option value="Clinical Content Review">Clinical Content Review</option>
                  <option value="Patient Advocacy & Support">Patient Advocacy &amp; Support</option>
                  <option value="Event & Community Coordination">Event Coordination</option>
                  <option value="Graphic Design & Media">Design &amp; Social Media</option>
                  <option value="Translation & Localization">Translation &amp; Localization</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Weekly Availability
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#160E21] border border-white/10 text-white text-sm focus:outline-none focus:border-[#39C69C] transition-colors"
                >
                  <option value="1-3 hours/week">1-3 hours/week</option>
                  <option value="3-5 hours/week">3-5 hours/week</option>
                  <option value="5+ hours/week">5+ hours/week</option>
                  <option value="Project-based / Flexible">Project-based / Flexible</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Background &amp; Motivation
              </label>
              <textarea
                name="experience"
                rows={3}
                value={formData.experience}
                onChange={handleChange}
                placeholder="Tell us a little bit about your background and why you want to volunteer..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#39C69C] transition-colors resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-zinc-400 hover:text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-full bg-[#39C69C] hover:bg-[#2fb18a] text-[#050505] text-xs font-bold transition-all cursor-pointer shadow-lg disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Volunteer Application"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
