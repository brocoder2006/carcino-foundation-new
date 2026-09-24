"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Eye, EyeOff, X, ShieldCheck } from "lucide-react";

export default function AuthModal() {
  const {
    user,
    isAuthModalOpen,
    setIsAuthModalOpen,
    signIn,
    signUp,
    signInWithOAuth,
    resetPassword,
    signOut,
    isSupabaseConnected,
  } = useAuth();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      if (isResetMode) {
        if (!email.trim()) {
          setErrorMsg("Please enter your email address.");
          setLoading(false);
          return;
        }
        const res = await resetPassword(email);
        if (!res.success) {
          setErrorMsg(res.error || "Failed to send reset link.");
        } else {
          setSuccessMsg("Password reset link sent to your email!");
          setTimeout(() => {
            setIsResetMode(false);
            setSuccessMsg("");
          }, 3000);
        }
      } else if (isSignUpMode) {
        if (!fullName.trim()) {
          setErrorMsg("Please enter your full name.");
          setLoading(false);
          return;
        }
        if (!password || password.length < 6) {
          setErrorMsg("Password must be at least 6 characters.");
          setLoading(false);
          return;
        }
        const res = await signUp(email, password, fullName);
        if (!res.success) {
          setErrorMsg(res.error || "Failed to create account.");
        } else if (res.requiresEmailConfirmation) {
          setSuccessMsg("Account created! Please check your email to confirm your subscription.");
        } else {
          setSuccessMsg("Account created successfully!");
          setTimeout(() => setIsAuthModalOpen(false), 1200);
        }
      } else {
        if (!password) {
          setErrorMsg("Please enter your password.");
          setLoading(false);
          return;
        }
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

  const handleSocialLogin = async (provider: "google" = "google") => {
    setErrorMsg("");
    setSuccessMsg("Connecting to Google...");
    setLoading(true);
    try {
      const res = await signInWithOAuth(provider);
      if (!res.success) {
        setErrorMsg(res.error || "Failed to sign in with Google.");
        setSuccessMsg("");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "OAuth login failed.");
      setSuccessMsg("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setIsAuthModalOpen(false)}
      className="fixed inset-0 z-[120] bg-black min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto animate-in fade-in duration-300"
    >
      {/* 1. Global Background */}
      <div className="fixed inset-0 w-full h-full bg-black overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
          src="https://cdn.midjourney.com/video/71048e88-d8e6-470e-88ef-555c01eacb12/0.mp4"
        />
        {/* Fixed overlay with 10% black opacity and backdrop-blur-sm */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
      </div>

      {/* 2. Main Center Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-[1040px] min-h-[650px] bg-white border border-gray-200/80 rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] flex flex-col md:flex-row p-3 md:p-3 overflow-hidden my-auto"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-6 right-6 z-30 p-2 rounded-full bg-gray-100/90 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 3. Left Side (Video Mask Area) */}
        <div className="w-full md:w-[45%] shrink-0 min-h-[280px] md:min-h-[626px] bg-[#0c0c0e] rounded-[2rem] relative overflow-hidden flex flex-col justify-between p-8 text-white">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="https://cdn.midjourney.com/video/71048e88-d8e6-470e-88ef-555c01eacb12/0.mp4"
          />
          {/* Supabase Status Tag overlay */}
          <div className="relative z-10 self-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              {isSupabaseConnected ? "Supabase Auth Active" : "Demo Mode"}
            </span>
          </div>

          <div className="relative z-10 space-y-2">
            <p className="text-xs uppercase tracking-widest text-white/70 font-semibold">The Carcino Foundation</p>
            <h3 className="text-2xl font-bold font-winterSolace text-white">Hope, Research & Care</h3>
          </div>
        </div>

        {/* 4. Right Side (Form Area) */}
        <div className="w-full md:w-[55%] p-6 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden bg-white rounded-[2rem] gap-6">
          {/* Decorative Sunset Gradient Blurred Circle */}
          <div
            className="absolute -top-10 -left-10 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #FF512F 0%, #F09819 100%)",
            }}
          />

          {/* Logged in state view */}
          {user ? (
            <div className="relative z-10 flex flex-col items-center text-center space-y-6 my-auto py-8">
              <h2 className="text-[40px] font-semibold tracking-tight text-gray-900 leading-tight">
                Account Profile
              </h2>
              <div className="w-full bg-gray-50 border border-gray-200 rounded-[1.25rem] p-6 space-y-2 text-left">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Signed in with Supabase</div>
                <div className="text-lg font-bold text-gray-900">{user.fullName || "User"}</div>
                <div className="text-sm text-gray-600 font-mono">{user.email}</div>
                <div className="pt-2 text-xs text-emerald-600 font-medium">● Connected & Authenticated</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  setIsAuthModalOpen(false);
                }}
                className="w-full py-4 rounded-[1.25rem] bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm transition-colors cursor-pointer border border-red-200"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex flex-col items-center text-center space-y-1.5 z-10 pt-2">
                <h2 className="text-[36px] sm:text-[40px] font-semibold tracking-tight text-gray-900 leading-tight">
                  {isResetMode
                    ? "Reset password"
                    : isSignUpMode
                    ? "Create account"
                    : "Welcome back"}
                </h2>
                <p className="text-sm text-gray-500">
                  {isResetMode
                    ? "Enter your email to receive a password reset link"
                    : isSignUpMode
                    ? "Sign up for a new account powered by Supabase"
                    : "Sign in to your account with Supabase Auth"}
                </p>
              </div>

              {!isResetMode && (
                /* Social Buttons */
                <div className="space-y-3 z-10">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSocialLogin("google")}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200/80 rounded-[1.25rem] p-4 text-sm font-medium text-gray-800 transition-all duration-200 group cursor-pointer disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
                  </button>
                </div>
              )}

              {!isResetMode && (
                /* Divider */
                <div className="flex items-center justify-center my-1 z-10 w-full">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300" />
                  <span className="px-3 text-[10px] font-medium tracking-widest text-gray-400 uppercase">OR</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300" />
                </div>
              )}

              {/* Form & Input Group */}
              <form onSubmit={handleSubmit} className="z-10 space-y-3">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium text-center">
                    {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-medium text-center">
                    {successMsg}
                  </div>
                )}

                {isSignUpMode && !isResetMode && (
                  <div className="bg-gray-50 border border-gray-200 rounded-[1.25rem] p-2 pl-5 flex items-center justify-between gap-3 focus-within:bg-white focus-within:border-gray-400 transition-all">
                    <div className="flex flex-col flex-1 min-w-0">
                      <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="bg-transparent focus:outline-none text-sm text-gray-900 w-full placeholder:text-gray-400 font-normal py-0.5"
                      />
                    </div>
                  </div>
                )}

                {/* Email Input Group with Circular Submit Button */}
                <div className="bg-gray-50 border border-gray-200 rounded-[1.25rem] p-2 pl-5 flex items-center justify-between gap-3 focus-within:bg-white focus-within:border-gray-400 transition-all">
                  <div className="flex flex-col flex-1 min-w-0">
                    <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="bg-transparent focus:outline-none text-sm text-gray-900 w-full placeholder:text-gray-400 font-normal py-0.5"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="relative w-[52px] h-[52px] shrink-0 group cursor-pointer">
                    <div
                      className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 blur-md group-hover:animate-spin transition-opacity duration-300 pointer-events-none"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #00c6ff, #0072ff, #ff007a, #ff8a00, #00c6ff)",
                      }}
                    />
                    <div
                      className="absolute -inset-[2.5px] rounded-full group-hover:animate-spin transition-all duration-300 pointer-events-none"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #00c6ff, #0072ff, #ff007a, #ff8a00, #00c6ff)",
                      }}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      aria-label="Submit"
                      className="relative w-full h-full rounded-full bg-black flex items-center justify-center text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.25)] cursor-pointer z-10 border-0 outline-none active:scale-95 transition-transform disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ArrowRight className="w-5 h-5 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password field */}
                {!isResetMode && (
                  <div className="bg-gray-50 border border-gray-200 rounded-[1.25rem] p-2 pl-5 pr-4 flex items-center justify-between gap-3 focus-within:bg-white focus-within:border-gray-400 transition-all">
                    <div className="flex flex-col flex-1 min-w-0">
                      <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-transparent focus:outline-none text-sm text-gray-900 w-full placeholder:text-gray-400 font-normal py-0.5"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                )}

                {/* Forgot Password toggle link */}
                {!isSignUpMode && !isResetMode && (
                  <div className="text-right text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsResetMode(true);
                        setErrorMsg("");
                        setSuccessMsg("");
                      }}
                      className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
              </form>

              {/* Footer navigation */}
              <div className="text-center text-sm text-gray-500 pt-2 z-10">
                {isResetMode ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(false);
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className="font-medium bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer inline-block"
                  >
                    ← Back to Sign in
                  </button>
                ) : (
                  <>
                    <span>{isSignUpMode ? "Already have an account? " : "Don't have an account? "}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUpMode(!isSignUpMode);
                        setIsResetMode(false);
                        setErrorMsg("");
                        setSuccessMsg("");
                      }}
                      className="font-medium bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer ml-1 inline-block"
                    >
                      {isSignUpMode ? "Sign in" : "Sign up"}
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

