"use client";

import React, { useEffect, useState } from "react";
import { Compass, Plus, Trash2, ExternalLink } from "lucide-react";
import { getDashboardCampaigns, createCampaignApi, deleteCampaignApi } from "@/lib/api";
import { Campaign } from "@/lib/types";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [pathwayStage, setPathwayStage] = useState("stage-01");
  const [summary, setSummary] = useState("");
  const [actionUrl, setActionUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await getDashboardCampaigns();
      const items = Array.isArray(res) ? res : res.results || [];
      setCampaigns(items);
    } catch (err: any) {
      setError(err.message || "Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createCampaignApi({
        title,
        pathway_stage: pathwayStage,
        summary,
        action_url: actionUrl,
        status: "active",
      });
      setTitle("");
      setSummary("");
      setActionUrl("");
      setShowModal(false);
      fetchCampaigns();
    } catch (err: any) {
      setError(err.message || "Failed to create campaign");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this campaign stage?")) return;
    try {
      await deleteCampaignApi(id);
      setCampaigns(campaigns.filter((c) => c.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete campaign");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Compass className="w-7 h-7 text-blue-600" />
            <span>TCF Pathway & Campaigns</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage Carcino Foundation clinical navigation stages, advocacy programs, and flagship campaign initiatives.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Campaign</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          {error}
        </div>
      )}

      {/* Campaigns Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 text-sm font-medium">
          Loading campaign initiatives...
        </div>
      ) : campaigns.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <Compass className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-700">No active campaigns configured</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Create campaign cards representing TCF Pathway stages (Clinical Navigation, Integrative Care, Moderated Spaces, Survivorship Plans).
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
              <div className="space-y-2">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {c.pathway_stage}
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">{c.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {c.summary || "No summary provided for this campaign stage."}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {c.action_url ? (
                  <a
                    href={c.action_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Action Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-400">No external link</span>
                )}

                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete campaign"
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
            <h3 className="text-lg font-bold text-slate-900">Create New Campaign Stage</h3>

            <form onSubmit={handleCreate} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Clinical Navigation Support"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Pathway Stage</label>
                <select
                  value={pathwayStage}
                  onChange={(e) => setPathwayStage(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="stage-01">Stage 01: Clinical Navigation (TCF PATHWAY)</option>
                  <option value="stage-02">Stage 02: Integrative Care (TCF ADVOCACY)</option>
                  <option value="stage-03">Stage 03: Moderated Spaces (TCF CONNECTION)</option>
                  <option value="stage-04">Stage 04: Survivorship Plans (TCF VOICES)</option>
                  <option value="general-flagship">General Flagship Campaign</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Summary Description</label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Describe the initiative's objectives and reach..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Action URL (Optional)</label>
                <input
                  type="url"
                  value={actionUrl}
                  onChange={(e) => setActionUrl(e.target.value)}
                  placeholder="https://oncodaily.com/..."
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
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
