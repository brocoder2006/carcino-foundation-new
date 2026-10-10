"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getDashboardPosts,
  deletePostApi,
  publishPostApi,
  unpublishPostApi,
  schedulePostApi,
  getDashboardCategories,
} from "@/lib/api";
import { Post, Category } from "@/lib/types";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { formatDate } from "@/lib/utils";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Globe,
  EyeOff,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

export default function DashboardPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Filters state
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // Modals state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [scheduleModalPost, setScheduleModalPost] = useState<Post | null>(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await getDashboardPosts({
        status: statusFilter,
        category: categoryFilter,
        q: searchQuery,
        page,
      });
      setPosts(res.results || []);
      setTotalCount(res.count || 0);
    } catch (err: any) {
      console.error("Failed to load dashboard posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [statusFilter, categoryFilter, page]);

  useEffect(() => {
    getDashboardCategories()
      .then((res: any) => setCategories(res.results || res))
      .catch(() => {});
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPosts();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deletePostApi(deleteId);
      setDeleteId(null);
      fetchPosts();
    } catch (err: any) {
      setActionError(err.message || "Failed to delete post");
    }
  };

  const handlePublishToggle = async (post: Post) => {
    try {
      if (post.status === "PUBLISHED") {
        await unpublishPostApi(post.id);
      } else {
        await publishPostApi(post.id);
      }
      fetchPosts();
    } catch (err: any) {
      alert(err.message || "Action failed");
    }
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleModalPost || !scheduleDate) return;
    try {
      await schedulePostApi(scheduleModalPost.id, new Date(scheduleDate).toISOString());
      setScheduleModalPost(null);
      fetchPosts();
    } catch (err: any) {
      alert(err.message || "Failed to schedule post");
    }
  };

  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div>
      <DashboardHeader
        title="Articles Management"
        subtitle="Manage drafts, published stories, and upcoming scheduled posts"
        action={{
          label: "Create Article",
          href: "/dashboard/posts/new",
        }}
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by title or excerpt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </form>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="DRAFT">Drafts</option>
              <option value="PUBLISHED">Published</option>
              <option value="SCHEDULED">Scheduled</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <p className="text-sm text-slate-400 py-16 text-center">Loading posts...</p>
          ) : posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 px-4">Article</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Author</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Updated</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                            {post.cover_image ? (
                              <Image src={post.cover_image} alt={post.title} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full bg-slate-200 text-slate-400 font-bold flex items-center justify-center text-xs">
                                Doc
                              </div>
                            )}
                          </div>
                          <div>
                            <Link
                              href={`/dashboard/posts/${post.id}/edit`}
                              className="font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1 max-w-xs"
                            >
                              {post.title}
                            </Link>
                            <p className="text-xs text-slate-400 truncate max-w-xs">{post.slug}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-slate-600">
                        {post.category ? (
                          <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-semibold">
                            {post.category.name}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">Uncategorized</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {post.author.username}
                      </td>

                      <td className="py-3.5 px-4">
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
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-500 font-medium">
                        {formatDate(post.updated_at)}
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        <Link
                          href={`/dashboard/posts/${post.id}/edit`}
                          className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-600 font-semibold text-xs bg-slate-100 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </Link>

                        <button
                          onClick={() => handlePublishToggle(post)}
                          className={`inline-flex items-center gap-1 font-semibold text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                            post.status === "PUBLISHED"
                              ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              : "bg-emerald-600 text-white hover:bg-emerald-700"
                          }`}
                        >
                          {post.status === "PUBLISHED" ? <EyeOff className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
                          {post.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                        </button>

                        <button
                          onClick={() => setScheduleModalPost(post)}
                          className="inline-flex items-center gap-1 text-purple-700 hover:bg-purple-50 font-semibold text-xs bg-purple-100 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5" /> Schedule
                        </button>

                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="inline-flex items-center gap-1 text-red-600 hover:bg-red-50 font-semibold text-xs bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm text-slate-400 font-medium">No articles match your search or filter.</p>
            </div>
          )}

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Page {page} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 disabled:opacity-30 hover:bg-slate-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 disabled:opacity-30 hover:bg-slate-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto font-bold">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Delete Article?</h3>
              <p className="text-xs text-slate-500">
                This action is permanent and will remove the post and its revision history.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {scheduleModalPost && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form onSubmit={handleScheduleSubmit} className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-100">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Schedule Publication</h3>
              <p className="text-xs text-slate-500">Select when &quot;{scheduleModalPost.title}&quot; should be published automatically.</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Publication Date & Time
              </label>
              <input
                type="datetime-local"
                required
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium"
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setScheduleModalPost(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Set Schedule
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
