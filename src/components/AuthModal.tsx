"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabaseClient";

export default function AuthModal() {
  const { user, isAuthModalOpen, setIsAuthModalOpen, signIn, signUp, signOut } = useAuth();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (isSignUpMode) {
        if (!fullName.trim()) {
          setErrorMsg("Please enter your full name.");
          setLoading(false);
          return;
        }
        const res = await signUp(email, password, fullName);
        if (!res.success) {
          setErrorMsg(res.error || "Failed to create account.");
        } else {
          setSuccessMsg("Account created successfully!");
          setTimeout(() => setIsAuthModalOpen(false), 1200);
        }
      } else {
        const res = await signIn(email, password);
        if (!res.success) {
          setErrorMsg(res.error || "Invalid login credentials.");
        } else {
          setSuccessMsg("Logged in successfully!");
          setTimeout(() => setIsAuthModalOpen(false), 1000);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setIsAuthModalOpen(false)}
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-all animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#120a1c] border border-purple-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-[0_20px_50px_rgba(194,122,255,0.25)] relative overflow-hidden"
      >
        {/* Decorative Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#C27AFF]/30 rounded-full blur-[60px] pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 relative z-10">
          <div>
            <h3 className="font-winterSolace text-2xl font-bold tracking-tight">
              {user ? "Account Profile" : isSignUpMode ? "Create Account" : "User Login"}
            </h3>
            <p className="text-xs text-purple-300/80 mt-1">
              {isSupabaseConfigured ? "Connected to Supabase PostgreSQL" : "Demo Session Active"}
            </p>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Logged In View */}
        {user ? (
          <div className="space-y-6 relative z-10">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
              <div className="text-xs text-gray-400">Logged in as</div>
              <div className="text-base font-bold text-white">{user.fullName || "User"}</div>
              <div className="text-xs text-purple-300 font-mono">{user.email}</div>
              <div className="text-[10px] text-zinc-500 font-mono mt-1">User ID: {user.id}</div>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  signOut();
                  setIsAuthModalOpen(false);
                }}
                className="w-full py-3 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 font-semibold text-sm transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-medium">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                {successMsg}
              </div>
            )}

            {isSignUpMode && (
              <div>
                <label className="block text-xs font-semibold text-[#E9CDF8]/90 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#E9CDF8]/90 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@domain.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#E9CDF8]/90 mb-1">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-full glass-btn-primary font-bold text-sm text-white cursor-pointer disabled:opacity-50 transition-all shadow-lg"
            >
              {loading
                ? "Processing..."
                : isSignUpMode
                ? "Create Account & Store Credentials"
                : "Sign In"}
            </button>

            <div className="pt-4 text-center border-t border-white/10 mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsSignUpMode(!isSignUpMode);
                  setErrorMsg("");
                }}
                className="text-xs text-purple-300 hover:text-purple-200 transition-colors underline cursor-pointer"
              >
                {isSignUpMode
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
