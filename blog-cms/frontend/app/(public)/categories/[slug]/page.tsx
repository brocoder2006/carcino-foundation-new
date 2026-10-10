import React from "react";
import { getPublicPosts, getPublicCategoryBySlug } from "@/lib/api";
import { PostCard } from "@/components/blog/PostCard";
import { FolderKanban, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  let category: any = null;
  let posts: any[] = [];

  try {
    category = await getPublicCategoryBySlug(params.slug);
    if (!category) notFound();

    const postsRes = await getPublicPosts({ category: params.slug });
    posts = postsRes.results || [];
  } catch {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Articles
        </Link>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
          <FolderKanban className="w-4 h-4" />
          <span>Category</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{category.name}</h1>
        {category.description && (
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">{category.description}</p>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <p className="text-slate-500 font-medium">No published articles in this category yet.</p>
        </div>
      )}
    </div>
  );
}
