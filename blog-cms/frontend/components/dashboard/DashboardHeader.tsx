"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Plus, Menu } from "lucide-react";
import { useSidebar } from "./SidebarContext";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle, action }) => {
  const { user } = useAuth();
  const { toggle } = useSidebar();

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 sticky top-0 z-20 shadow-xs">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={toggle}
          className="lg:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight truncate">{title}</h1>
          {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-0.5 line-clamp-1">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 shrink-0">
        {action && (
          action.href ? (
            <Link
              href={action.href}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{action.label}</span>
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{action.label}</span>
            </button>
          )
        )}

        <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 hidden md:inline-block">
            Signed in as <strong className="text-slate-900 font-bold">{user?.username}</strong>
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {user?.role}
          </span>
        </div>
      </div>
    </header>
  );
};
