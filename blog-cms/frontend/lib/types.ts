export type UserRole = "ADMIN" | "EDITOR" | "AUTHOR";

export interface User {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: UserRole;
  bio?: string;
  avatar_url?: string;
  is_active?: boolean;
  date_joined?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
  post_count?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  post_count?: number;
}

export type PostStatus = "DRAFT" | "PUBLISHED" | "SCHEDULED";

export interface PostRevision {
  id: string;
  post: string;
  title_snapshot: string;
  content_snapshot: any;
  editor?: User;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: any;
  cover_image?: string;
  author: User;
  category?: Category;
  tags?: Tag[];
  status: PostStatus;
  publication_date?: string;
  created_at: string;
  updated_at: string;
  seo_title?: string;
  seo_description?: string;
  canonical_url?: string;
  revisions?: PostRevision[];
}

export interface DashboardAnalytics {
  total_posts: number;
  published_posts: number;
  draft_posts: number;
  scheduled_posts: number;
  total_categories: number;
  total_tags: number;
  total_authors: number;
  recent_posts: Post[];
  recent_activity: PostRevision[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface MediaAsset {
  id: string;
  name: string;
  file_url: string;
  alt_text?: string;
  caption?: string;
  file_size?: number;
  file_type?: string;
  created_at?: string;
}

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  pathway_stage: string;
  summary?: string;
  banner_image?: string;
  action_url?: string;
  status: string;
  start_date?: string;
  end_date?: string;
  created_at?: string;
}

export interface Podcast {
  id: string;
  code: string;
  title: string;
  description?: string;
  cover_image?: string;
  video_url?: string;
  embed_url?: string;
  external_url?: string;
  publication_date?: string;
}

