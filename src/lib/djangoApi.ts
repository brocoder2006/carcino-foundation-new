const DJANGO_API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://127.0.0.1:8000";

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

export async function fetchDjangoPosts(category?: string, query?: string): Promise<DjangoPost[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== "All Insights") params.append("category", category);
    if (query) params.append("q", query);

    const res = await fetch(`${DJANGO_API_URL}/api/v1/posts/?${params.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.results || [];
  } catch (err) {
    console.error("Failed to fetch posts from Django API:", err);
    return [];
  }
}

export async function fetchDjangoPostBySlug(slug: string): Promise<DjangoPost | null> {
  try {
    const res = await fetch(`${DJANGO_API_URL}/api/v1/posts/${slug}/`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch post detail from Django API:", err);
    return null;
  }
}

export async function fetchDjangoCampaigns(): Promise<DjangoCampaign[]> {
  try {
    const res = await fetch(`${DJANGO_API_URL}/api/v1/campaigns/`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.results || [];
  } catch (err) {
    console.error("Failed to fetch campaigns from Django API:", err);
    return [];
  }
}

export async function fetchDjangoPodcasts(): Promise<DjangoPodcast[]> {
  try {
    const res = await fetch(`${DJANGO_API_URL}/api/v1/podcasts/`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.results || [];
  } catch (err) {
    console.error("Failed to fetch podcasts from Django API:", err);
    return [];
  }
}
