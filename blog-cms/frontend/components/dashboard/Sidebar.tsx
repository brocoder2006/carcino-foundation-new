"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Tag as TagIcon,
  Image as ImageIcon,
  Compass,
  Radio,
  Users,
  Settings,
  LogOut,
  PlusCircle,
  BookOpen,
  Globe,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useSidebar } from "./SidebarContext";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { isOpen, close } = useSidebar();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Posts", href: "/dashboard/posts", icon: FileText },
    { label: "Media Library", href: "/dashboard/media", icon: ImageIcon },
    { label: "Campaigns", href: "/dashboard/campaigns", icon: Compass },
    { label: "Podcasts", href: "/dashboard/podcasts", icon: Radio },
    { label: "Categories", href: "/dashboard/categories", icon: FolderKanban },
    { label: "Tags", href: "/dashboard/tags", icon: TagIcon },
  ];

  if (user?.role === "ADMIN") {
    navItems.push({ label: "Authors & Roles", href: "/dashboard/authors", icon: Users });
  }

  navItems.push({ label: "Settings", href: "/dashboard/settings", icon: Settings });

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300">
      {/* Brand Header */}
      <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
        <Link
          href="/dashboard"
          onClick={close}
          className="flex items-center gap-2.5 text-white font-bold text-lg tracking-tight"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <span>Carcino <span className="text-blue-500 font-medium">CMS</span></span>
        </Link>

        {/* Mobile close button */}
        <button
          onClick={close}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Action Button */}
      <div className="p-4">
        <Link
          href="/dashboard/posts/new"
          onClick={close}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-xl shadow-md transition-all text-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600/15 text-blue-400 font-semibold border border-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Links */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 text-xs font-medium text-slate-400 hover:text-white transition-colors px-2 py-1"
        >
          <Globe className="w-4 h-4 text-slate-500" />
          <span>View Public Blog ↗</span>
        </Link>

        {/* User Badge */}
        <div className="bg-slate-800/60 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
              {user?.first_name?.[0] || user?.username[0].toUpperCase() || "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.username}</p>
              <span className="inline-block text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/50">
                {user?.role}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-all"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 h-screen sticky top-0 border-r border-slate-800 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Off-Canvas Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={close}
          className={`absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        {/* Sliding Panel */}
        <div
          className={`absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-slate-900 shadow-2xl transition-transform duration-300 ease-out transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
};
