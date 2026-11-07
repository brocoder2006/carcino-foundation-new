export interface ArticleSection {
  heading: string;
  content: string[];
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface ArticleCitation {
  name: string;
  url: string;
}

export interface ArticleItem {
  id: string;
  numericId?: number;
  category: string;
  tag: string;
  title: string;
  readTime: string;
  date: string;
  desc: string;
  author: string;
  cover?: string;
  sections?: ArticleSection[];
  content: string[];
  faqs?: ArticleFAQ[];
  citations?: ArticleCitation[];
}
