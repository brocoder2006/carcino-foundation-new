import {
  Post,
  Category,
  Tag,
  User,
  DashboardAnalytics,
  PaginatedResponse,
  PostRevision,
  MediaAsset,
  Campaign,
  Podcast,
} from "./types";


const API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://127.0.0.1:8000";

function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("blog_cms_token");
  }
  return null;
}

export function setAuthToken(token: string | null) {
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("blog_cms_token", token);
    } else {
      localStorage.removeItem("blog_cms_token");
    }
  }
}

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "omit",
  });

  if (!response.ok) {
    let errorMessage = `API Error ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.error) errorMessage = errorData.error;
      else if (errorData.detail) errorMessage = errorData.detail;
      else if (errorData.message) errorMessage = errorData.message;
      else if (typeof errorData === "object") errorMessage = JSON.stringify(errorData);
    } catch {
      // JSON parse error
    }
    throw new Error(errorMessage);
  }

  if (response.status === 244 || response.status === 204) {
    return {} as T;
  }

  return response.json();
}

// ==========================================
// PUBLIC API HELPERS
// ==========================================

export async function getPublicPosts(params: { page?: number; category?: string; tag?: string; q?: string } = {}): Promise<PaginatedResponse<Post>> {
  try {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.category) query.append("category", params.category);
    if (params.tag) query.append("tag", params.tag);
    if (params.q) query.append("q", params.q);

    return await apiFetch<PaginatedResponse<Post>>(`/api/v1/posts/?${query.toString()}`, {
      next: { revalidate: 60 },
    });
  } catch (err) {
    console.error("Failed to fetch public posts:", err);
    return { count: 0, next: null, previous: null, results: [] };
  }
}

export async function getPublicPostBySlug(slug: string): Promise<Post> {
  try {
    return await apiFetch<Post>(`/api/v1/posts/${slug}/`, {
      next: { revalidate: 60 },
    });
  } catch (err) {
    console.error(`Failed to fetch post for slug ${slug}:`, err);
    return null as any;
  }
}

export async function getPublicCategories(): Promise<Category[]> {
  try {
    return await apiFetch<Category[]>(`/api/v1/categories/`, {
      next: { revalidate: 300 },
    });
  } catch (err) {
    console.error("Failed to fetch public categories:", err);
    return [];
  }
}

export async function getPublicCategoryBySlug(slug: string): Promise<Category> {
  try {
    return await apiFetch<Category>(`/api/v1/categories/${slug}/`);
  } catch (err) {
    console.error(`Failed to fetch category ${slug}:`, err);
    return null as any;
  }
}

export async function getPublicTags(): Promise<Tag[]> {
  try {
    return await apiFetch<Tag[]>(`/api/v1/tags/`);
  } catch (err) {
    console.error("Failed to fetch public tags:", err);
    return [];
  }
}

export async function searchPublicPosts(q: string): Promise<PaginatedResponse<Post>> {
  try {
    return await apiFetch<PaginatedResponse<Post>>(`/api/v1/search/?q=${encodeURIComponent(q)}`);
  } catch (err) {
    console.error("Failed to search public posts:", err);
    return { count: 0, next: null, previous: null, results: [] };
  }
}

// ==========================================
// AUTH API HELPERS
// ==========================================

export async function loginApi(credentials: { username_or_email: string; password: string }): Promise<{ token: string; user: User }> {
  const data = await apiFetch<{ token: string; user: User }>("/api/v1/accounts/login/", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  setAuthToken(data.token);
  return data;
}

export async function logoutApi(): Promise<void> {
  try {
    await apiFetch("/api/v1/accounts/logout/", { method: "POST" });
  } finally {
    setAuthToken(null);
  }
}

export async function getCurrentUser(): Promise<User> {
  return apiFetch<User>("/api/v1/accounts/me/");
}

export async function getUsersApi(): Promise<PaginatedResponse<User> | User[]> {
  return apiFetch<any>("/api/v1/accounts/users/");
}

export async function createUserApi(data: Partial<User> & { password: string }): Promise<User> {
  return apiFetch<User>("/api/v1/accounts/users/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateUserApi(id: string, data: Partial<User>): Promise<User> {
  return apiFetch<User>(`/api/v1/accounts/users/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// ==========================================
// DASHBOARD API HELPERS
// ==========================================

export async function getDashboardAnalytics(): Promise<DashboardAnalytics> {
  return apiFetch<DashboardAnalytics>("/api/v1/dashboard/analytics/");
}

export async function getDashboardPosts(params: { status?: string; category?: string; author?: string; q?: string; page?: number } = {}): Promise<PaginatedResponse<Post>> {
  const query = new URLSearchParams();
  if (params.status) query.append("status", params.status);
  if (params.category) query.append("category", params.category);
  if (params.author) query.append("author", params.author);
  if (params.q) query.append("q", params.q);
  if (params.page) query.append("page", params.page.toString());

  return apiFetch<PaginatedResponse<Post>>(`/api/v1/dashboard/posts/?${query.toString()}`);
}

export async function getDashboardPostById(id: string): Promise<Post> {
  return apiFetch<Post>(`/api/v1/dashboard/posts/${id}/`);
}

export async function createPostApi(postData: any): Promise<Post> {
  return apiFetch<Post>("/api/v1/dashboard/posts/", {
    method: "POST",
    body: JSON.stringify(postData),
  });
}

export async function updatePostApi(id: string, postData: any): Promise<Post> {
  return apiFetch<Post>(`/api/v1/dashboard/posts/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(postData),
  });
}

export async function deletePostApi(id: string): Promise<void> {
  return apiFetch<void>(`/api/v1/dashboard/posts/${id}/`, {
    method: "DELETE",
  });
}

export async function publishPostApi(id: string): Promise<{ message: string; post: Post }> {
  return apiFetch<{ message: string; post: Post }>(`/api/v1/dashboard/posts/${id}/publish/`, {
    method: "POST",
  });
}

export async function unpublishPostApi(id: string): Promise<{ message: string; post: Post }> {
  return apiFetch<{ message: string; post: Post }>(`/api/v1/dashboard/posts/${id}/unpublish/`, {
    method: "POST",
  });
}

export async function schedulePostApi(id: string, publication_date: string): Promise<{ message: string; post: Post }> {
  return apiFetch<{ message: string; post: Post }>(`/api/v1/dashboard/posts/${id}/schedule/`, {
    method: "POST",
    body: JSON.stringify({ publication_date }),
  });
}

export async function getPostRevisionsApi(id: string): Promise<PaginatedResponse<PostRevision> | PostRevision[]> {
  return apiFetch<any>(`/api/v1/dashboard/posts/${id}/revisions/`);
}

// Categories & Tags Dashboard
export async function getDashboardCategories(): Promise<PaginatedResponse<Category> | Category[]> {
  return apiFetch<any>("/api/v1/dashboard/categories/");
}

export async function createCategoryApi(data: { name: string; description?: string }): Promise<Category> {
  return apiFetch<Category>("/api/v1/dashboard/categories/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCategoryApi(id: string, data: { name?: string; description?: string }): Promise<Category> {
  return apiFetch<Category>(`/api/v1/dashboard/categories/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteCategoryApi(id: string): Promise<void> {
  return apiFetch<void>(`/api/v1/dashboard/categories/${id}/`, {
    method: "DELETE",
  });
}

export async function getDashboardTags(): Promise<PaginatedResponse<Tag> | Tag[]> {
  return apiFetch<any>("/api/v1/dashboard/tags/");
}

export async function createTagApi(data: { name: string }): Promise<Tag> {
  return apiFetch<Tag>("/api/v1/dashboard/tags/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTagApi(id: string, data: { name: string }): Promise<Tag> {
  return apiFetch<Tag>(`/api/v1/dashboard/tags/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteTagApi(id: string): Promise<void> {
  return apiFetch<void>(`/api/v1/dashboard/tags/${id}/`, {
    method: "DELETE",
  });
}

// Media Assets API
export async function getDashboardMedia(): Promise<PaginatedResponse<MediaAsset> | MediaAsset[]> {
  return apiFetch<any>("/api/v1/dashboard/media/");
}

export async function uploadMediaApi(file: File): Promise<{ url: string; public_id?: string; message?: string }> {
  const formData = new FormData();
  formData.append("file", file);

  return apiFetch<{ url: string; public_id?: string; message?: string }>("/api/v1/media/upload/", {
    method: "POST",
    body: formData,
  });
}

export async function deleteMediaApi(id: string): Promise<void> {
  return apiFetch<void>(`/api/v1/dashboard/media/${id}/`, {
    method: "DELETE",
  });
}

// Campaigns API
export async function getDashboardCampaigns(): Promise<PaginatedResponse<Campaign> | Campaign[]> {
  return apiFetch<any>("/api/v1/dashboard/campaigns/");
}

export async function createCampaignApi(data: Partial<Campaign>): Promise<Campaign> {
  return apiFetch<Campaign>("/api/v1/dashboard/campaigns/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteCampaignApi(id: string): Promise<void> {
  return apiFetch<void>(`/api/v1/dashboard/campaigns/${id}/`, {
    method: "DELETE",
  });
}

// Podcasts API
export async function getDashboardPodcasts(): Promise<PaginatedResponse<Podcast> | Podcast[]> {
  return apiFetch<any>("/api/v1/dashboard/podcasts/");
}

export async function createPodcastApi(data: Partial<Podcast>): Promise<Podcast> {
  return apiFetch<Podcast>("/api/v1/dashboard/podcasts/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deletePodcastApi(id: string): Promise<void> {
  return apiFetch<void>(`/api/v1/dashboard/podcasts/${id}/`, {
    method: "DELETE",
  });
}

