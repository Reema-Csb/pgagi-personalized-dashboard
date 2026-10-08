export type ContentSource =
  | "news"
  | "recommendation"
  | "social";

export type ContentCategory =
  | "technology"
  | "sports"
  | "finance"
  | "entertainment";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: ContentCategory;
  source: ContentSource;
  sourceName: string;
  publishedAt: string;
  url?: string;
  author?: string;
}

export interface PaginatedContentResponse {
  items: ContentItem[];
  page?: number;
  totalPages?: number;
  totalResults?: number;
  hasMore?: boolean;
  source?: string;
  error?: string;
}
