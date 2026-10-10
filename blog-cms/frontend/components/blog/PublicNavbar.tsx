"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, BookOpen, User as UserIcon, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const PublicNavbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-slate-900 font-bold text-xl tracking-tight hover:opacity-90">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <span>ApexPulse <span className="text-blue-600 font-normal">Journal</span></span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden sm:flex items-center relative max-w-xs w-full">
          <Search className="w-4 h-4 absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search published articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-full pl-9 pr-4 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </form>

        {/* Nav Navigation */}
        <nav className="flex items-center gap-4">
          <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            All Articles
          </Link>

          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>CMS Dashboard</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              <UserIcon className="w-4 h-4" />
              <span>Editor Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
