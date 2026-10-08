import { NextRequest, NextResponse } from "next/server";

import { mockContent } from "@/data/mockContent";
import type { ContentCategory } from "@/types/content";

const PAGE_SIZE_DEFAULT = 6;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const category =
    (searchParams.get("category") as ContentCategory) ||
    "technology";

  const page = Number(
    searchParams.get("page") || "1",
  );

  const pageSize =
    Number(
      searchParams.get("pageSize"),
    ) || PAGE_SIZE_DEFAULT;

  const apiKey = process.env.NEWS_API_KEY;

  /*
   * Development fallback when no API key exists.
   */
  if (!apiKey) {
    const categoryItems = mockContent.filter(
      (item) =>
        item.category === category &&
        item.source === "news",
    );

    const start =
      (page - 1) * pageSize;

    const end =
      start + pageSize;

    const items =
      categoryItems.slice(
        start,
        end,
      );

    const totalPages =
      Math.ceil(
        categoryItems.length /
          pageSize,
      );

    return NextResponse.json({
      items,
      page,
      totalPages,
      totalResults:
        categoryItems.length,
      hasMore:
        page < totalPages,
      source: "mock",
    });
  }

  try {
    const url = new URL(
      "https://newsapi.org/v2/top-headlines",
    );

    /*
     * NewsAPI calls finance "business".
     */
    const newsCategory =
      category === "finance"
        ? "business"
        : category;

    url.searchParams.set(
      "category",
      newsCategory,
    );

    url.searchParams.set(
      "language",
      "en",
    );

    url.searchParams.set(
      "page",
      String(page),
    );

    url.searchParams.set(
      "pageSize",
      String(pageSize),
    );

    url.searchParams.set(
      "apiKey",
      apiKey,
    );

    const response =
      await fetch(
        url.toString(),
        {
          cache: "no-store",
        },
      );

    if (!response.ok) {
      throw new Error(
        "NewsAPI request failed",
      );
    }

    const data =
      await response.json();

    const totalResults =
      Number(
        data.totalResults || 0,
      );

    const totalPages =
      Math.ceil(
        totalResults /
          pageSize,
      );

    const items =
      (data.articles || []).map(
        (
          article: {
            url: string;
            title: string;
            description:
              | string
              | null;
            urlToImage:
              | string
              | null;
            publishedAt: string;
            author:
              | string
              | null;
            source?: {
              name?: string;
            };
          },
          index: number,
        ) => ({
          id: `news-${category}-${page}-${index}-${article.url}`,

          title:
            article.title,

          description:
            article.description ||
            "Read the latest story from this source.",

          image:
            article.urlToImage ||
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c",

          category,

          source:
            "news" as const,

          sourceName:
            article.source?.name ||
            "NewsAPI",

          publishedAt:
            article.publishedAt,

          url:
            article.url,

          author:
            article.author ||
            undefined,
        }),
      );

    return NextResponse.json({
      items,
      page,
      totalPages,
      totalResults,
      hasMore:
        page < totalPages,
      source: "newsapi",
    });
  } catch (error) {
    console.error(
      "News API error:",
      error,
    );

    return NextResponse.json({
      items: [],
      page,
      totalPages: 0,
      totalResults: 0,
      hasMore: false,
      source: "error",
      error:
        "Unable to fetch news.",
    });
  }
}
