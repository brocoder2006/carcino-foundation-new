"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Plus, Bell } from "lucide-react";

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

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {action && (
          action.href ? (
            <Link
              href={action.href}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{action.label}</span>
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{action.label}</span>
            </button>
          )
        )}

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline-block">
            Signed in as <strong className="text-slate-900 font-bold">{user?.username}</strong>
          </span>
          <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {user?.role}
          </span>
        </div>
      </div>
    </header>
  );
};
