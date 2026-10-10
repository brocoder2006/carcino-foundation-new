"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { loginApi } from "@/lib/api";
import { BookOpen, LogIn, Lock, User as UserIcon, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { refreshUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await loginApi({
        username_or_email: usernameOrEmail.trim(),
        password: password,
      });
      await refreshUser();
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const setQuickCreds = (u: string, p: string) => {
    setUsernameOrEmail(u);
    setPassword(p);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black mx-auto shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">CMS Editorial Portal</h1>
          <p className="text-slate-500 text-sm">Sign in to manage blog posts and publishing workflows.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Username or Email
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin or user@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{isSubmitting ? "Authenticating..." : "Sign In to Dashboard"}</span>
          </button>
        </form>

        {/* Demo Seed Credentials Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quick Demo Logins:</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setQuickCreds("admin", "admin123")}
              className="bg-white border border-slate-200 text-slate-800 text-[11px] font-semibold py-1.5 px-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setQuickCreds("editor", "editor123")}
              className="bg-white border border-slate-200 text-slate-800 text-[11px] font-semibold py-1.5 px-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
            >
              Editor
            </button>
            <button
              type="button"
              onClick={() => setQuickCreds("author", "author123")}
              className="bg-white border border-slate-200 text-slate-800 text-[11px] font-semibold py-1.5 px-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
            >
              Author
            </button>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">
            ← Return to Public Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
