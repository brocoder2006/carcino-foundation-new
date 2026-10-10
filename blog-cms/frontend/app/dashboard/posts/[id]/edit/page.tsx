"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  getDashboardPostById,
  updatePostApi,
  getDashboardCategories,
  getDashboardTags,
  getUsersApi,
  createUserApi,
  uploadMediaApi,
  getPostRevisionsApi,
} from "@/lib/api";
import { Category, Tag, User, PostRevision } from "@/lib/types";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TiptapEditor } from "@/components/editor/TiptapEditor";
import { renderTiptapNode, formatDate } from "@/lib/utils";
import {
  Save,
  Globe,
  UploadCloud,
  Eye,
  X,
  CheckCircle2,
  FolderKanban,
  Tag as TagIcon,
  User as UserIcon,
  Search,
  History,
  Plus,
} from "lucide-react";


export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  // Form State
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState<any>({ type: "doc", content: [] });
  const [coverImage, setCoverImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("DRAFT");

  // SEO State
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");

  // Data State
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [authorsList, setAuthorsList] = useState<User[]>([]);
  const [revisions, setRevisions] = useState<PostRevision[]>([]);

  // UI State
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isRevisionsOpen, setIsRevisionsOpen] = useState(false);
  const [autosaveStatus, setAutosaveStatus] = useState("Loaded");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Quick Create Author Modal State
  const [authorModalOpen, setAuthorModalOpen] = useState(false);
  const [newAuthorFirstName, setNewAuthorFirstName] = useState("");
  const [newAuthorLastName, setNewAuthorLastName] = useState("");
  const [newAuthorEmail, setNewAuthorEmail] = useState("");
  const [newAuthorUsername, setNewAuthorUsername] = useState("");

  useEffect(() => {
    async function loadPostData() {
      setIsLoadingPost(true);
      try {
        const post = await getDashboardPostById(postId);
        setTitle(post.title || "");
        setExcerpt(post.excerpt || "");
        setContent(post.content || { type: "doc", content: [] });
        setCoverImage(post.cover_image || "");
        setCategoryId(post.category?.id || "");
        setAuthorId(post.author?.id || "");
        setSelectedTagIds(post.tags ? post.tags.map((t) => t.id) : []);
        setStatus(post.status);
        setSeoTitle(post.seo_title || "");
        setSeoDescription(post.seo_description || "");
        setCanonicalUrl(post.canonical_url || "");

        const revs: any = await getPostRevisionsApi(postId);
        setRevisions(revs.results || revs);
      } catch (err: any) {
        setErrorMessage(err.message || "Failed to load post.");
      } finally {
        setIsLoadingPost(false);
      }
    }

    getDashboardCategories().then((res: any) => setCategories(res.results || res)).catch(() => {});
    getDashboardTags().then((res: any) => setTags(res.results || res)).catch(() => {});
    getUsersApi().then((res: any) => setAuthorsList(res.results || res)).catch(() => {});

    if (postId) loadPostData();
  }, [postId]);


  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadMediaApi(file);
      if (res.url) setCoverImage(res.url);
    } catch (err: any) {
      alert(`Cover image upload failed: ${err.message || err}`);
    } finally {
      setIsUploading(false);
    }
  };

  const toggleTag = (id: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleQuickCreateAuthor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthorUsername.trim()) return;

    try {
      const createdUser = await createUserApi({
        username: newAuthorUsername.trim(),
        first_name: newAuthorFirstName.trim(),
        last_name: newAuthorLastName.trim(),
        email: newAuthorEmail.trim() || `${newAuthorUsername.trim()}@carcinofoundation.org`,
        password: "author123",
        role: "AUTHOR",
      });

      const updatedAuthors: any = await getUsersApi();
      setAuthorsList(updatedAuthors.results || updatedAuthors);
      setAuthorId(createdUser.id);
      setAuthorModalOpen(false);
      setNewAuthorFirstName("");
      setNewAuthorLastName("");
      setNewAuthorEmail("");
      setNewAuthorUsername("");
    } catch (err: any) {
      alert(err.message || "Failed to create author.");
    }
  };

  const handleSave = async (targetStatus?: "DRAFT" | "PUBLISHED") => {
    if (!title.trim()) {
      setErrorMessage("Please enter an article title.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    const newStatus = targetStatus || status;

    const payload = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content,
      cover_image: coverImage || null,
      category_id: categoryId || null,
      author_id: authorId || null,
      tag_ids: selectedTagIds,
      status: newStatus,
      seo_title: seoTitle.trim(),
      seo_description: seoDescription.trim(),
      canonical_url: canonicalUrl.trim() || null,
    };


    try {
      const updated = await updatePostApi(postId, payload);
      setStatus(updated.status);
      setAutosaveStatus("All changes saved");
      const revs: any = await getPostRevisionsApi(postId);
      setRevisions(revs.results || revs);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to update post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const restoreRevision = (rev: PostRevision) => {
    setTitle(rev.title_snapshot);
    setContent(rev.content_snapshot);
    setIsRevisionsOpen(false);
    setAutosaveStatus("Restored revision snapshot");
  };

  if (isLoadingPost) {
    return (
      <div className="min-h-screen flex items-center justify-center font-medium text-slate-500">
        Loading article editor...
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader
        title={`Edit Article: ${title || "Untitled"}`}
        subtitle="Update content, review revisions snapshot, or change publication status"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm font-medium">
            {errorMessage}
          </div>
        )}

        {/* Action Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 sticky top-20 z-20">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{autosaveStatus}</span>
            </span>

            <button
              type="button"
              onClick={() => setIsRevisionsOpen(true)}
              className="flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <History className="w-3.5 h-3.5" /> {revisions.length} Revision{revisions.length === 1 ? "" : "s"}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
            >
              <Eye className="w-4 h-4" /> Preview
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSave("DRAFT")}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> Save Draft
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSave("PUBLISHED")}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all disabled:opacity-50"
            >
              <Globe className="w-4 h-4" /> {status === "PUBLISHED" ? "Update Published" : "Publish Now"}
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <input
                type="text"
                placeholder="Article Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-2xl sm:text-4xl font-extrabold text-slate-900 placeholder:text-slate-300 border-none outline-none focus:ring-0 p-0"
              />

              <textarea
                rows={2}
                placeholder="Write a brief excerpt or summary..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Article Body Content
              </label>
              <TiptapEditor content={content} onChange={(json) => setContent(json)} />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-blue-600" />
                Cover Image
              </h3>

              {coverImage ? (
                <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-slate-200 group">
                  <Image src={coverImage} alt="Cover Preview" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setCoverImage("")}
                    className="absolute top-2 right-2 bg-slate-900/80 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
                  <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs font-bold text-slate-700">Upload Cover Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverUpload}
                    disabled={isUploading}
                  />
                </label>
              )}
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <FolderKanban className="w-4 h-4 text-purple-600" />
                  Category
                </h3>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  <option value="">Select Category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-blue-600" />
                    Article Author
                  </h3>
                  <button
                    type="button"
                    onClick={() => setAuthorModalOpen(true)}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> New Author
                  </button>
                </div>
                <select
                  value={authorId}
                  onChange={(e) => setAuthorId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  <option value="">Select Author...</option>
                  {authorsList.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.first_name ? `${a.first_name} ${a.last_name || ""}`.trim() : a.username} ({a.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <TagIcon className="w-4 h-4 text-emerald-600" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => {
                    const selected = selectedTagIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleTag(t.id)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-all ${
                          selected
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        #{t.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                SEO Metadata
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">SEO Title</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">SEO Description</label>
                <textarea
                  rows={2}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Canonical URL</label>
                <input
                  type="url"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Create Author Modal */}
      {authorModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form onSubmit={handleQuickCreateAuthor} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Create New Author Account</h3>
              <button type="button" onClick={() => setAuthorModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={newAuthorFirstName}
                  onChange={(e) => setNewAuthorFirstName(e.target.value)}
                  placeholder="Dr. Jane"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={newAuthorLastName}
                  onChange={(e) => setNewAuthorLastName(e.target.value)}
                  placeholder="Smith"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={newAuthorUsername}
                onChange={(e) => setNewAuthorUsername(e.target.value)}
                placeholder="janesmith"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={newAuthorEmail}
                onChange={(e) => setNewAuthorEmail(e.target.value)}
                placeholder="jane@carcinofoundation.org"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-medium"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAuthorModalOpen(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
              >
                Create Author
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Revision History Modal */}
      {isRevisionsOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-100 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-purple-600" /> Article Revisions History
              </h3>
              <button onClick={() => setIsRevisionsOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {revisions.map((rev) => (
                <div key={rev.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{rev.title_snapshot}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Edited by {rev.editor?.username || "Unknown"} on {formatDate(rev.created_at)}
                    </p>
                  </div>
                  <button
                    onClick={() => restoreRevision(rev)}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-all shrink-0"
                  >
                    Restore
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 overflow-y-auto p-4 sm:p-8 flex justify-center">
          <div className="bg-white max-w-4xl w-full rounded-3xl p-8 space-y-6 relative my-auto shadow-2xl">
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-6 right-6 bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                Article Preview
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">{title || "Untitled Article"}</h1>
              {excerpt && <p className="text-lg text-slate-600">{excerpt}</p>}
            </div>

            {coverImage && (
              <div className="relative h-[350px] w-full rounded-2xl overflow-hidden">
                <Image src={coverImage} alt="Cover Preview" fill className="object-cover" />
              </div>
            )}

            <div
              className="prose prose-slate max-w-none text-slate-800"
              dangerouslySetInnerHTML={{ __html: renderTiptapNode(content) }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

