const rawApiUrl = process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://127.0.0.1:8000";
const DJANGO_API_URL = rawApiUrl.replace(/\/+$/, "");

export interface DjangoPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  cover_image?: string;
  read_time?: string;
  author?: {
    username: string;
    first_name?: string;
    last_name?: string;
  };
  category?: {
    name: string;
    slug: string;
  };
  tags?: { name: string; slug: string }[];
  status: string;
  publication_date?: string;
  created_at: string;
}

export interface DjangoCampaign {
  id: string;
  title: string;
  slug: string;
  pathway_stage: string;
  summary: string;
  banner_image?: string;
  action_url?: string;
  status: string;
}

export interface DjangoPodcast {
  id: string;
  code: string;
  title: string;
  description: string;
  cover_image?: string;
  external_url?: string;
  publication_date: string;
}

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
  } catch (err: any) {
    // Graceful offline fallback: avoid triggering Next.js error overlay when Django backend is not started
    if (process.env.NODE_ENV === "development") {
      const isConnectionRefused =
        err?.message?.includes("Failed to fetch") ||
        err?.cause?.code === "ECONNREFUSED" ||
        err?.name === "AbortError";
      if (!isConnectionRefused) {
        console.warn(`[Django API] Notice: ${endpoint} unreachable (${err?.message || err})`);
      }
    }
    return null;
  }
}

export async function fetchDjangoPosts(category?: string, query?: string): Promise<DjangoPost[]> {
  const params = new URLSearchParams();
  if (category && category !== "All Insights") params.append("category", category);
  if (query) params.append("q", query);

  const qs = params.toString() ? `?${params.toString()}` : "";
  const data = await safeFetchJson<any>(`/api/v1/posts/${qs}`);
  if (!data) return [];
  return Array.isArray(data) ? data : data.results || [];
}

export async function fetchDjangoPostBySlug(slug: string): Promise<DjangoPost | null> {
  return await safeFetchJson<DjangoPost>(`/api/v1/posts/${slug}/`);
}

export async function fetchDjangoCampaigns(): Promise<DjangoCampaign[]> {
  const data = await safeFetchJson<any>("/api/v1/campaigns/");
  if (!data) return [];
  return Array.isArray(data) ? data : data.results || [];
}

export async function fetchDjangoPodcasts(): Promise<DjangoPodcast[]> {
  const data = await safeFetchJson<any>("/api/v1/podcasts/");
  if (!data) return [];
  return Array.isArray(data) ? data : data.results || [];
}
