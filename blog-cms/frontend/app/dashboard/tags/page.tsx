"use client";

import React, { useEffect, useState } from "react";
import {
  getDashboardTags,
  createTagApi,
  updateTagApi,
  deleteTagApi,
} from "@/lib/api";
import { Tag } from "@/lib/types";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Tag as TagIcon, Edit, Trash2, X } from "lucide-react";

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res: any = await getDashboardTags();
      setTags(res.results || res);
    } catch (err: any) {
      console.error("Failed to load tags:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const openCreateModal = () => {
    setEditingTag(null);
    setName("");
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (t: Tag) => {
    setEditingTag(t);
    setName(t.name);
    setError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setError(null);
    try {
      if (editingTag) {
        await updateTagApi(editingTag.id, { name: name.trim() });
      } else {
        await createTagApi({ name: name.trim() });
      }
      setModalOpen(false);
      fetchTags();
    } catch (err: any) {
      setError(err.message || "Operation failed.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tag?")) return;
    try {
      await deleteTagApi(id);
      fetchTags();
    } catch (err: any) {
      alert(err.message || "Failed to delete tag");
    }
  };

  return (
    <div>
      <DashboardHeader
        title="Tag Management"
        subtitle="Manage keyword tags assigned to articles"
        action={{
          label: "Add Tag",
          onClick: openCreateModal,
        }}
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <p className="text-sm text-slate-400 py-16 text-center">Loading tags...</p>
          ) : tags.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 px-4">Tag Name</th>
                    <th className="py-3.5 px-4">Slug</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {tags.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                        <TagIcon className="w-4 h-4 text-emerald-600" />
                        <span>#{t.name}</span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-xs text-slate-500">{t.slug}</td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(t)}
                          className="inline-flex items-center gap-1 text-slate-700 hover:text-blue-600 font-semibold text-xs bg-slate-100 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
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
              <p className="text-sm text-slate-400 font-medium">No tags created yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {editingTag ? "Edit Tag" : "Create New Tag"}
              </h3>
              <button type="button" onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl">{error}</div>}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tag Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Python, React, etc."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-medium"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
              >
                {editingTag ? "Save Tag" : "Create Tag"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
