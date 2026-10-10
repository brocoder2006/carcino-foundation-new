import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/types";
import { formatDate, estimateReadingTime } from "@/lib/utils";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  const readingTime = estimateReadingTime(post.content);

  if (featured) {
    return (
      <div className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[340px] bg-slate-100 overflow-hidden">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-4xl">
              ApexPulse
            </div>
          )}
          {post.category && (
            <Link
              href={`/categories/${post.category.slug}`}
              className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-blue-700 font-semibold text-xs px-3 py-1.5 rounded-full shadow-sm hover:bg-white transition-colors"
            >
              {post.category.name}
            </Link>
          )}
        </div>

        <div className="lg:col-span-5 p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 text-slate-500 text-xs font-medium mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {formatDate(post.publication_date || post.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {readingTime} min read
              </span>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight leading-tight mb-4">
                {post.title}
              </h2>
            </Link>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm shadow-inner">
                {post.author.first_name?.[0] || post.author.username[0].toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {post.author.first_name ? `${post.author.first_name} ${post.author.last_name || ""}` : post.author.username}
                </p>
                <p className="text-[11px] text-slate-500 capitalize">{post.author.role.toLowerCase()}</p>
              </div>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-blue-600 text-slate-700 group-hover:text-white flex items-center justify-center transition-all shadow-sm"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-400 font-bold text-xl">
              Article
            </div>
          )}
          {post.category && (
            <Link
              href={`/categories/${post.category.slug}`}
              className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-blue-700 font-semibold text-[11px] px-2.5 py-1 rounded-full shadow-sm hover:bg-white transition-colors"
            >
              {post.category.name}
            </Link>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 text-slate-400 text-xs mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publication_date || post.created_at)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readingTime} min read
            </span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-2 mb-2 leading-snug">
              {post.title}
            </h3>
          </Link>

          {post.excerpt && (
            <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
              {post.excerpt}
            </p>
          )}
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-50 mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">
            {post.author.first_name?.[0] || post.author.username[0].toUpperCase()}
          </div>
          <span className="text-xs font-semibold text-slate-700 truncate max-w-[120px]">
            {post.author.first_name ? `${post.author.first_name} ${post.author.last_name || ""}` : post.author.username}
          </span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="text-xs font-semibold text-blue-600 group-hover:underline flex items-center gap-0.5"
        >
          Read <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
