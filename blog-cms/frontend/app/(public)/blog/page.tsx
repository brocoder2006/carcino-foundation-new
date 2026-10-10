import React from "react";
import Link from "next/link";
import { getPublicPosts, getPublicCategories, getPublicTags } from "@/lib/api";
import { PostCard } from "@/components/blog/PostCard";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";

export const revalidate = 60;

interface BlogPageProps {
  searchParams: {
    page?: string;
    category?: string;
    tag?: string;
    q?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parseInt(searchParams.page || "1", 10);
  const category = searchParams.category || "";
  const tag = searchParams.tag || "";
  const q = searchParams.q || "";

  let postsData: any = { results: [], count: 0, next: null, previous: null };
  let categories: any[] = [];
  let tags: any[] = [];

  try {
    postsData = await getPublicPosts({ page, category, tag, q });
    categories = await getPublicCategories();
    tags = await getPublicTags();
  } catch (err) {
    console.error("Failed to load blog posts:", err);
  }

  const posts = postsData.results || [];
  const totalCount = postsData.count || 0;
  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Oncology Articles & Clinical Insights</h1>
        <p className="text-slate-500 text-sm mt-1">
          Showing {posts.length} of {totalCount} published article{totalCount === 1 ? "" : "s"}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider pr-2 border-r border-slate-200">
          <Filter className="w-3.5 h-3.5 text-blue-600" />
          <span>Filters</span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <Link
            href="/blog"
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              !category && !tag ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All
          </Link>
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.slug}`}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                category === cat.slug ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <p className="text-slate-500 font-medium">No articles match your criteria.</p>
          <Link href="/blog" className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline">
            Reset Filters
          </Link>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6">
          {page > 1 && (
            <Link
              href={`/blog?page=${page - 1}${category ? `&category=${category}` : ""}`}
              className="flex items-center gap-1 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Link>
          )}

          <span className="text-xs font-semibold text-slate-500">
            Page {page} of {totalPages}
          </span>

          {page < totalPages && (
            <Link
              href={`/blog?page=${page + 1}${category ? `&category=${category}` : ""}`}
              className="flex items-center gap-1 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
