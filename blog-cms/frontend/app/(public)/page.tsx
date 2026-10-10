import React from "react";
import Link from "next/link";
import { getPublicPosts, getPublicCategories } from "@/lib/api";
import { PostCard } from "@/components/blog/PostCard";
import { Sparkles, ArrowRight, FolderKanban } from "lucide-react";

export const revalidate = 60; // SSR with ISR 60s revalidation

export default async function HomePage() {
  let posts: any[] = [];
  let categories: any[] = [];

  try {
    const postRes = await getPublicPosts({ page: 1 });
    posts = postRes.results || [];
    categories = await getPublicCategories();
  } catch (err) {
    console.error("Failed to fetch public posts:", err);
  }

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Carcino Foundation Publishing Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Oncology Insights, Clinical Guidance & Cancer Research
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Explore peer-reviewed articles, patient stories, treatment pathways, and cancer care insights published cleanly through our custom Headless CMS.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all shadow-md"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Pills Bar */}
      {categories.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <FolderKanban className="w-4 h-4 text-blue-600" />
            <span>Browse By Category</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Link
              href="/blog"
              className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all shrink-0 shadow-sm"
            >
              All Topics
            </Link>
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-4 py-2 rounded-full transition-all shrink-0 hover:border-blue-300"
              >
                {cat.name} ({cat.post_count || 0})
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Post */}
      {featuredPost && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Featured Story</h2>
          </div>
          <PostCard post={featuredPost} featured={true} />
        </section>
      )}

      {/* Latest Articles Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Latest Articles</h2>
          <Link href="/blog" className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {remainingPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          !featuredPost && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 font-medium">No published articles yet.</p>
            </div>
          )
        )}
      </section>
    </div>
  );
}
