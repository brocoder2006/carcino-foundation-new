"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, UserCheck, Check, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import FooterSection from "@/components/FooterSection";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-lg border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export default function LoginPage() {
  const {
    user,
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
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // 3D Card tilt motion hooks
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      if (isResetMode) {
        if (!email.trim()) {
          setErrorMsg("Please enter your email address.");
          setIsLoading(false);
          return;
        }
        const res = await resetPassword(email);
        if (!res.success) {
          setErrorMsg(res.error || "Failed to send reset link.");
        } else {
          setSuccessMsg("Password reset link sent to your email address!");
          setTimeout(() => {
            setIsResetMode(false);
            setSuccessMsg("");
          }, 3000);
        }
      } else if (isSignUpMode) {
        if (!fullName.trim()) {
          setErrorMsg("Please enter your full name.");
          setIsLoading(false);
          return;
        }
        if (!password || password.length < 6) {
          setErrorMsg("Password must be at least 6 characters.");
          setIsLoading(false);
          return;
        }
        const res = await signUp(email, password, fullName);
        if (!res.success) {
          setErrorMsg(res.error || "Failed to create account.");
        } else if (res.requiresEmailConfirmation) {
          setSuccessMsg("Account created! Please check your email to confirm.");
        } else {
          setSuccessMsg("Account created successfully!");
        }
      } else {
        if (!password) {
          setErrorMsg("Please enter your password.");
          setIsLoading(false);
          return;
        }
        const res = await signIn(email, password);
        if (!res.success) {
          setErrorMsg(res.error || "Invalid login credentials.");
        } else {
          setSuccessMsg("Logged in successfully!");
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setSuccessMsg("Redirecting to Google...");
    setIsLoading(true);
    try {
      const res = await signInWithOAuth("google");
      if (!res.success) {
        setErrorMsg(res.error || "Failed to sign in with Google.");
        setSuccessMsg("");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "OAuth login failed.");
      setSuccessMsg("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black relative overflow-x-hidden flex flex-col justify-between">
      {/* Background gradient effect - purple OnlyPipe aesthetic */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900/40 via-purple-950/60 to-black pointer-events-none z-0" />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] mix-blend-soft-light pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Top ambient radial glow */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-purple-500/20 blur-[80px] pointer-events-none z-0" />
      <motion.div
        className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-purple-400/20 blur-[60px] pointer-events-none z-0"
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <motion.div
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[90vh] h-[90vh] rounded-t-full bg-purple-500/20 blur-[60px] pointer-events-none z-0"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 1,
        }}
      />

      {/* Top Fixed Navbar */}
      <header className="flex py-4 px-6 md:px-20 justify-between items-center glass-navbar w-full z-50 fixed top-0 left-0 right-0 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 w-fit group cursor-pointer">
          <div className="rounded-lg bg-[#CDA8E8] w-8 h-8 flex items-center justify-center font-extrabold text-[#050505] text-xs group-hover:scale-105 transition-transform">
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

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center pt-28 pb-16 px-4 z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md relative"
          style={{ perspective: 1500 }}
        >
          <motion.div
            className="relative"
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ z: 8 }}
          >
            <div className="relative group">
              {/* Traveling light beam effect */}
              <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-0 left-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-80"
                  animate={{
                    left: ["-50%", "100%"],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    left: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 },
                    opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror" },
                  }}
                />
                <motion.div
                  className="absolute top-0 right-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-purple-300 to-transparent opacity-80"
                  animate={{
                    top: ["-50%", "100%"],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    top: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 0.6 },
                    opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: 0.6 },
                  }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-80"
                  animate={{
                    right: ["-50%", "100%"],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    right: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.2 },
                    opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: 1.2 },
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-purple-300 to-transparent opacity-80"
                  animate={{
                    bottom: ["-50%", "100%"],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    bottom: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.8 },
                    opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: 1.8 },
                  }}
                />
              </div>

              {/* Glass Card Container */}
              <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Subtle Inner Pattern */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)`,
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Brand Logo & Header */}
                <div className="text-center space-y-2 mb-6 relative z-10">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="mx-auto w-12 h-12 rounded-full border border-purple-400/40 bg-purple-500/20 flex items-center justify-center relative overflow-hidden shadow-lg"
                  >
                    <span className="text-lg font-bold font-winterSolace text-white">TCF</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
                  </motion.div>

                  {/* USER REQUESTED HEADINGS AND SUBTITLE TEXT */}
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-bold font-winterSolace bg-clip-text text-transparent bg-gradient-to-r from-white via-[#CDA8E8] to-[#39C69C]"
                  >
                    Be Part Of The Change
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-zinc-300 font-inter text-xs md:text-sm leading-relaxed max-w-sm mx-auto"
                  >
                    Cancer literacy needs more than conversations. Whether you want to collaborate, volunteer, or help change the systems behind the problem, there’s a way for you to contribute.
                  </motion.p>
                </div>

                {/* Logged In View */}
                {user ? (
                  <div className="relative z-10 flex flex-col items-center text-center space-y-5 py-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                      <UserCheck className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-white font-winterSolace">
                        Welcome Back!
                      </h2>
                      <p className="text-xs text-emerald-400 font-medium font-inter">
                        {isSupabaseConnected ? "● Session Active via Supabase" : "● Demo Session Active"}
                      </p>
                    </div>

                    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left space-y-1">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold font-inter">
                        Account Details
                      </div>
                      <div className="text-base font-bold text-white font-inter">
                        {user.fullName || "Member"}
                      </div>
                      <div className="text-xs text-purple-300 font-mono truncate">{user.email}</div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                      <Link
                        href="/"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#CDA8E8] to-[#39C69C] text-[#050505] font-bold text-xs transition-all text-center cursor-pointer shadow-md hover:brightness-110"
                      >
                        Return to Homepage
                      </Link>
                      <button
                        type="button"
                        onClick={() => signOut()}
                        className="py-2.5 px-5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold text-xs transition-all cursor-pointer border border-red-500/30"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Login / Signup / Reset Password Form */
                  <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    {/* Error & Success Messages */}
                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-medium text-center font-inter">
                        {errorMsg}
                      </div>
                    )}
                    {successMsg && (
                      <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium text-center font-inter">
                        {successMsg}
                      </div>
                    )}

                    <div className="space-y-3">
                      {/* Full Name field if Sign Up mode */}
                      {isSignUpMode && !isResetMode && (
                        <motion.div
                          className={`relative ${focusedInput === "fullName" ? "z-10" : ""}`}
                          whileFocus={{ scale: 1.01 }}
                          whileHover={{ scale: 1.005 }}
                        >
                          <div className="relative flex items-center overflow-hidden rounded-xl">
                            <span className="absolute left-3 text-white/40 text-xs">👤</span>
                            <Input
                              type="text"
                              required
                              placeholder="Full Name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              onFocus={() => setFocusedInput("fullName")}
                              onBlur={() => setFocusedInput(null)}
                              className="w-full bg-white/5 border-white/10 focus:border-purple-400 text-white placeholder:text-white/40 h-10 pl-9 pr-3 transition-all"
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* Email input */}
                      <motion.div
                        className={`relative ${focusedInput === "email" ? "z-10" : ""}`}
                        whileFocus={{ scale: 1.01 }}
                        whileHover={{ scale: 1.005 }}
                      >
                        <div className="relative flex items-center overflow-hidden rounded-xl">
                          <Mail
                            className={`absolute left-3 w-4 h-4 transition-all duration-300 ${
                              focusedInput === "email" ? "text-purple-300" : "text-white/40"
                            }`}
                          />
                          <Input
                            type="email"
                            required
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocusedInput("email")}
                            onBlur={() => setFocusedInput(null)}
                            className="w-full bg-white/5 border-white/10 focus:border-purple-400 text-white placeholder:text-white/40 h-10 pl-9 pr-3 transition-all"
                          />
                        </div>
                      </motion.div>

                      {/* Password input */}
                      {!isResetMode && (
                        <motion.div
                          className={`relative ${focusedInput === "password" ? "z-10" : ""}`}
                          whileFocus={{ scale: 1.01 }}
                          whileHover={{ scale: 1.005 }}
                        >
                          <div className="relative flex items-center overflow-hidden rounded-xl">
                            <Lock
                              className={`absolute left-3 w-4 h-4 transition-all duration-300 ${
                                focusedInput === "password" ? "text-purple-300" : "text-white/40"
                              }`}
                            />
                            <Input
                              type={showPassword ? "text" : "password"}
                              required
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              onFocus={() => setFocusedInput("password")}
                              onBlur={() => setFocusedInput(null)}
                              className="w-full bg-white/5 border-white/10 focus:border-purple-400 text-white placeholder:text-white/40 h-10 pl-9 pr-10 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 text-white/40 hover:text-white cursor-pointer"
                            >
                              {showPassword ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    {!isResetMode && (
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <input
                              id="remember-me"
                              name="remember-me"
                              type="checkbox"
                              checked={rememberMe}
                              onChange={() => setRememberMe(!rememberMe)}
                              className="appearance-none h-4 w-4 rounded border border-white/20 bg-white/5 checked:bg-purple-500 checked:border-purple-400 focus:outline-none cursor-pointer transition-all"
                            />
                            {rememberMe && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 flex items-center justify-center text-white pointer-events-none"
                              >
                                <Check className="w-3 h-3 stroke-[3]" />
                              </motion.div>
                            )}
                          </div>
                          <label
                            htmlFor="remember-me"
                            className="text-white/70 hover:text-white cursor-pointer font-inter select-none"
                          >
                            Remember me
                          </label>
                        </div>

                        {!isSignUpMode && (
                          <button
                            type="button"
                            onClick={() => {
                              setIsResetMode(true);
                              setErrorMsg("");
                              setSuccessMsg("");
                            }}
                            className="text-purple-300 hover:text-purple-200 transition-colors cursor-pointer font-inter"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                    )}

                    {/* Main Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full relative group/button mt-4 cursor-pointer"
                    >
                      <div className="relative overflow-hidden bg-gradient-to-r from-[#CDA8E8] via-[#39C69C] to-[#CDA8E8] text-[#050505] font-bold h-11 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg">
                        <AnimatePresence mode="wait">
                          {isLoading ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center justify-center"
                            >
                              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            </motion.div>
                          ) : (
                            <motion.span
                              key="button-text"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center justify-center gap-1.5 text-sm font-bold font-inter"
                            >
                              <span>
                                {isResetMode
                                  ? "Send Reset Email"
                                  : isSignUpMode
                                  ? "Create Account"
                                  : "Sign In"}
                              </span>
                              <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>

                    {/* Divider */}
                    {!isResetMode && (
                      <div className="relative my-4 flex items-center">
                        <div className="flex-grow border-t border-white/10" />
                        <span className="mx-3 text-xs text-white/40 font-mono">OR</span>
                        <div className="flex-grow border-t border-white/10" />
                      </div>
                    )}

                    {/* Google Sign In */}
                    {!isResetMode && (
                      <motion.button
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="w-full relative group/google cursor-pointer"
                      >
                        <div className="relative overflow-hidden bg-white/5 text-white font-medium h-10 rounded-xl border border-white/15 hover:border-purple-300/40 transition-all duration-300 flex items-center justify-center gap-2">
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                          <span className="text-xs font-semibold text-white/90 group-hover/google:text-white transition-colors">
                            Sign in with Google
                          </span>
                        </div>
                      </motion.button>
                    )}

                    {/* Mode Toggle Footer */}
                    <div className="text-center text-xs text-white/60 pt-3">
                      {isResetMode ? (
                        <button
                          type="button"
                          onClick={() => {
                            setIsResetMode(false);
                            setErrorMsg("");
                            setSuccessMsg("");
                          }}
                          className="text-purple-300 hover:text-white font-medium cursor-pointer"
                        >
                          ← Back to Sign in
                        </button>
                      ) : (
                        <p className="font-inter">
                          {isSignUpMode ? "Already have an account? " : "Don't have an account? "}
                          <button
                            type="button"
                            onClick={() => {
                              setIsSignUpMode(!isSignUpMode);
                              setIsResetMode(false);
                              setErrorMsg("");
                              setSuccessMsg("");
                            }}
                            className="text-[#CDA8E8] hover:text-white font-bold cursor-pointer underline ml-1"
                          >
                            {isSignUpMode ? "Sign in" : "Sign up"}
                          </button>
                        </p>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
