export interface DjangoAuthor {
  username: string;
  first_name?: string;
  last_name?: string;
}

export interface DjangoCategory {
  name: string;
  slug: string;
}

export interface DjangoTag {
  name: string;
  slug: string;
}

export interface DjangoPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  cover_image?: string;
  read_time?: string;
  author?: DjangoAuthor;
  category?: DjangoCategory;
  tags?: DjangoTag[];
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
