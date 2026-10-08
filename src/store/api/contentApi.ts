import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { ContentItem, PaginatedContentResponse } from "@/types/content";

interface ContentResponse {
  items: ContentItem[];
  source?: string;
  error?: string;
}

export const contentApi = createApi({
  reducerPath: "contentApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),

  tagTypes: ["Content"],

  endpoints: (builder) => ({
    getNews: builder.query<
      PaginatedContentResponse,
      {
        category: string;
        page: number;
        pageSize?: number;
      }
    >({
      query: ({ category, page, pageSize = 6 }) =>
        `/news?category=${encodeURIComponent(
          category,
        )}&page=${page}&pageSize=${pageSize}`,

      providesTags: ["Content"],
    }),

    getRecommendations: builder.query<ContentResponse, void>({
      query: () => "/recommendations",

      providesTags: ["Content"],
    }),

    getSocial: builder.query<ContentResponse, void>({
      query: () => "/social",

      providesTags: ["Content"],
    }),

    searchContent: builder.query<ContentResponse, string>({
      query: (query) => `/search?q=${encodeURIComponent(query)}`,
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetRecommendationsQuery,
  useGetSocialQuery,
  useLazySearchContentQuery,
} = contentApi;
