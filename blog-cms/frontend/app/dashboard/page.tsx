"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getDashboardAnalytics } from "@/lib/api";
import { DashboardAnalytics } from "@/lib/types";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { formatDate } from "@/lib/utils";
import {
  FileText,
  CheckCircle,
  FileClock,
  Clock,
  PlusCircle,
  History,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDashboardAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      <DashboardHeader
        title="Dashboard Overview"
        subtitle="Real-time publishing metrics and recent editorial activity"
        action={{
          label: "New Article",
          href: "/dashboard/posts/new",
        }}
      />

      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Posts</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {loading ? "..." : analytics?.total_posts || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Published</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {loading ? "..." : analytics?.published_posts || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Drafts</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {loading ? "..." : analytics?.draft_posts || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <FileClock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-purple-600">Scheduled</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {loading ? "..." : analytics?.scheduled_posts || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Content Section: Recent Activity & Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Articles Table */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Recent Articles
              </h2>
              <Link href="/dashboard/posts" className="text-xs font-semibold text-blue-600 hover:underline">
                View All Posts →
              </Link>
            </div>

            {loading ? (
              <p className="text-sm text-slate-400 py-8 text-center">Loading articles...</p>
            ) : analytics?.recent_posts && analytics.recent_posts.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {analytics.recent_posts.map((post) => (
                  <div key={post.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <Link
                        href={`/dashboard/posts/${post.id}/edit`}
                        className="font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors truncate block"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-slate-400 mt-0.5">
                        By {post.author.username} • {formatDate(post.updated_at)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                          post.status === "PUBLISHED"
                            ? "bg-emerald-100 text-emerald-800"
                            : post.status === "SCHEDULED"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {post.status}
                      </span>
                      <Link
                        href={`/dashboard/posts/${post.id}/edit`}
                        className="text-slate-400 hover:text-blue-600 text-xs font-medium"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-sm text-slate-400">No articles created yet.</p>
                <Link
                  href="/dashboard/posts/new"
                  className="mt-3 inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  <PlusCircle className="w-4 h-4" /> Create First Article
                </Link>
              </div>
            )}
          </div>

          {/* Activity / Revision Log */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-purple-600" />
              Revision Activity Log
            </h2>

            {loading ? (
              <p className="text-sm text-slate-400 py-8 text-center">Loading revision logs...</p>
            ) : analytics?.recent_activity && analytics.recent_activity.length > 0 ? (
              <div className="space-y-3">
                {analytics.recent_activity.map((rev) => (
                  <div key={rev.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{rev.title_snapshot}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Edits by {rev.editor?.username || "Editor"}</span>
                      <span>{formatDate(rev.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No recent revisions recorded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
