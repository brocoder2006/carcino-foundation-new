"use client";

import React, { useEffect, useState } from "react";
import { Radio, Plus, Trash2, ExternalLink, Play } from "lucide-react";
import { getDashboardPodcasts, createPodcastApi, deletePodcastApi } from "@/lib/api";
import { Podcast } from "@/lib/types";

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState("TCF 001");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const res = await getDashboardPodcasts();
      const items = Array.isArray(res) ? res : res.results || [];
      setPodcasts(items);
    } catch (err: any) {
      setError(err.message || "Failed to load podcasts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createPodcastApi({
        code,
        title,
        description,
        external_url: externalUrl,
      });
      setTitle("");
      setDescription("");
      setExternalUrl("");
      setShowModal(false);
      fetchPodcasts();
    } catch (err: any) {
      setError(err.message || "Failed to create podcast episode");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this podcast episode?")) return;
    try {
      await deletePodcastApi(id);
      setPodcasts(podcasts.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete podcast episode");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Radio className="w-7 h-7 text-blue-600" />
            <span>Oncology Podcasts & Media</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage Carcino Foundation audio episodes, expert panels, and audio-visual discussions.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Podcast Episode</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          {error}
        </div>
      )}

      {/* Podcasts Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 text-sm font-medium">
          Loading podcast episodes...
        </div>
      ) : podcasts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <Radio className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-700">No podcast episodes published</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Add podcast episodes featuring oncology experts, survivor stories, and clinical discussions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcasts.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                    <Play className="w-3 h-3 fill-blue-700" />
                    {p.code}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {p.publication_date ? new Date(p.publication_date).toLocaleDateString() : ""}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {p.description || "No episode description provided."}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {p.external_url ? (
                  <a
                    href={p.external_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Listen / Watch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-400">No external link</span>
                )}

                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete podcast episode"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add Podcast Episode</h3>

            <form onSubmit={handleCreate} className="space-y-4 text-sm">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block font-medium text-slate-700 mb-1">Code</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="TCF 001"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">Episode Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Navigating Precision Care"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Episode outline and topic highlights..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">External Listen/Watch URL</label>
                <input
                  type="url"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="https://oncodaily.com/voices/..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-sm"
                >
                  Save Episode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
