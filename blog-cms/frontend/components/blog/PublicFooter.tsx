import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <span>ApexPulse CMS</span>
        </div>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} ApexPulse Headless Blog Engine. Built with Django REST & Next.js.
        </p>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Articles</Link>
          <Link href="/login" className="hover:text-white transition-colors">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
};
