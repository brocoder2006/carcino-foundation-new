import React from "react";
import { searchPublicPosts } from "@/lib/api";
import { PostCard } from "@/components/blog/PostCard";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  let posts: any[] = [];

  if (query.trim()) {
    try {
      const res = await searchPublicPosts(query.trim());
      posts = res.results || [];
    } catch (err) {
      console.error("Search failed:", err);
    }
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
          <Search className="w-4 h-4" /> Search Results
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {query ? `Results for "${query}"` : "Search Articles"}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Found {posts.length} published article{posts.length === 1 ? "" : "s"}
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <p className="text-slate-500 font-medium">
            {query ? `No matching articles found for "${query}".` : "Enter a search term above."}
          </p>
        </div>
      )}
    </div>
  );
}
