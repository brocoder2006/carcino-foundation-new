"use client";

import React, { useEffect, useState } from "react";
import { Image as ImageIcon, Upload, Trash2, Copy, Check, Search } from "lucide-react";
import { getDashboardMedia, uploadMediaApi, deleteMediaApi } from "@/lib/api";
import { MediaAsset } from "@/lib/types";

export default function MediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await getDashboardMedia();
      const items = Array.isArray(res) ? res : res.results || [];
      setMediaList(items);
    } catch (err: any) {
      setError(err.message || "Failed to load media assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      await uploadMediaApi(file);
      await fetchMedia();
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media asset?")) return;
    try {
      await deleteMediaApi(id);
      setMediaList(mediaList.filter((m) => m.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete asset");
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = mediaList.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.alt_text && m.alt_text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <ImageIcon className="w-7 h-7 text-blue-600" />
            <span>Media Assets Library</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload, preview, and manage images and media references across all blog articles.
          </p>
        </div>

        <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0">
          <Upload className="w-4 h-4" />
          <span>{uploading ? "Uploading..." : "Upload New Asset"}</span>
          <input type="file" onChange={handleFileUpload} accept="image/*" className="hidden" disabled={uploading} />
        </label>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          {error}
        </div>
      )}

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search media files by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 text-sm font-medium">
          Loading assets library...
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-700">No media assets found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Upload images to store persistent media and copy direct URLs to embed into Tiptap article content.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {filteredMedia.map((asset) => (
            <div key={asset.id} className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between transition-all hover:shadow-md">
              <div className="relative aspect-video bg-slate-100 overflow-hidden flex items-center justify-center">
                <img
                  src={asset.file_url}
                  alt={asset.alt_text || asset.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3 flex flex-col gap-2 flex-1 justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-800 truncate" title={asset.name}>
                    {asset.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {asset.file_size ? `${(asset.file_size / 1024).toFixed(0)} KB` : "Asset"}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => copyUrl(asset.file_url, asset.id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium py-1.5 px-2 rounded-lg transition-colors"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3 h-3 text-green-600" />
                        <span className="text-green-600 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-500" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(asset.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
