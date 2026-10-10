import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublicPostBySlug, getPublicPosts } from "@/lib/api";
import { formatDate, estimateReadingTime, renderTiptapNode } from "@/lib/utils";
import { Calendar, Clock, ArrowLeft, Share2, Tag as TagIcon } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";

export const revalidate = 60;

interface PostDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PostDetailPageProps) {
  try {
    const post = await getPublicPostBySlug(params.slug);
    if (!post) return { title: "Article Not Found" };
    return {
      title: post.seo_title || `${post.title} | ApexPulse Journal`,
      description: post.seo_description || post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.cover_image ? [{ url: post.cover_image }] : [],
      },
      alternates: {
        canonical: post.canonical_url || undefined,
      },
    };
  } catch {
    return { title: "Article Not Found" };
  }
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  let post: any = null;
  let relatedPosts: any[] = [];

  try {
    post = await getPublicPostBySlug(params.slug);
    if (!post) notFound();

    const allPostsRes = await getPublicPosts({ page: 1 });
    relatedPosts = (allPostsRes.results || [])
      .filter((p: any) => p.id !== post.id)
      .slice(0, 3);
  } catch (err) {
    notFound();
  }

  const readingTime = estimateReadingTime(post.content);
  const renderedContentHtml = post.content ? renderTiptapNode(post.content) : "";

  return (
    <article className="max-w-4xl mx-auto space-y-10">
      {/* Back Link */}
      <div>
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4 text-center sm:text-left">
        {post.category && (
          <Link
            href={`/categories/${post.category.slug}`}
            className="inline-block bg-blue-100 text-blue-700 font-semibold text-xs px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
          >
            {post.category.name}
          </Link>
        )}

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-normal">
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                {post.author.first_name?.[0] || post.author.username[0].toUpperCase()}
              </div>
              <span className="font-bold text-slate-900">
                {post.author.first_name ? `${post.author.first_name} ${post.author.last_name || ""}` : post.author.username}
              </span>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publication_date || post.created_at)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} min read
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              title="Share article"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {post.cover_image && (
        <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-md">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Article Body */}
      <div
        className="prose prose-slate max-w-none text-slate-800 font-normal leading-relaxed text-base sm:text-lg"
        dangerouslySetInnerHTML={{ __html: renderedContentHtml }}
      />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="pt-6 border-t border-slate-200 flex items-center gap-2 flex-wrap">
          <TagIcon className="w-4 h-4 text-slate-400 mr-1" />
          {post.tags.map((tag: any) => (
            <span key={tag.id} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pt-12 border-t border-slate-200 space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">More Articles to Read</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rPost: any) => (
              <PostCard key={rPost.id} post={rPost} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
