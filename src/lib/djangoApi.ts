import type { DjangoPost, DjangoCampaign, DjangoPodcast } from "@/types";

export type { DjangoPost, DjangoCampaign, DjangoPodcast };

const rawApiUrl = process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://127.0.0.1:8000";
const DJANGO_API_URL = rawApiUrl.replace(/\/+$/, "");

async function safeFetchJson<T>(endpoint: string): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${DJANGO_API_URL}${endpoint}`, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    return await res.json();
  } catch (err: unknown) {
    // Graceful offline fallback: avoid triggering Next.js error overlay when Django backend is not started
    if (process.env.NODE_ENV === "development") {
      const errorObj = err as { message?: string; cause?: { code?: string }; name?: string };
      const isConnectionRefused =
        errorObj?.message?.includes("Failed to fetch") ||
        errorObj?.cause?.code === "ECONNREFUSED" ||
        errorObj?.name === "AbortError";
      if (!isConnectionRefused) {
        console.warn(`[Django API] Notice: ${endpoint} unreachable (${errorObj?.message || String(err)})`);
      }
    }
    return null;
  }
}

interface PaginatedResponse<T> {
  results?: T[];
}

export async function fetchDjangoPosts(category?: string, query?: string): Promise<DjangoPost[]> {
  const params = new URLSearchParams();
  if (category && category !== "All Insights") params.append("category", category);
  if (query) params.append("q", query);

  const qs = params.toString() ? `?${params.toString()}` : "";
  const data = await safeFetchJson<DjangoPost[] | PaginatedResponse<DjangoPost>>(`/api/v1/posts/${qs}`);
  if (!data) return [];
  return Array.isArray(data) ? data : data.results || [];
}

export async function fetchDjangoPostBySlug(slug: string): Promise<DjangoPost | null> {
  return await safeFetchJson<DjangoPost>(`/api/v1/posts/${slug}/`);
}

export async function fetchDjangoCampaigns(): Promise<DjangoCampaign[]> {
  const data = await safeFetchJson<DjangoCampaign[] | PaginatedResponse<DjangoCampaign>>("/api/v1/campaigns/");
  if (!data) return [];
  return Array.isArray(data) ? data : data.results || [];
}

export async function fetchDjangoPodcasts(): Promise<DjangoPodcast[]> {
  const data = await safeFetchJson<DjangoPodcast[] | PaginatedResponse<DjangoPodcast>>("/api/v1/podcasts/");
  if (!data) return [];
  return Array.isArray(data) ? data : data.results || [];
}
