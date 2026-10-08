"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import BackButton from "@/components/ui/BackButton";
import ContentCard from "@/components/dashboard/ContentCard";
import LoadingGrid from "@/components/dashboard/LoadingGrid";
import EmptyState from "@/components/dashboard/EmptyState";

import {
  useGetNewsQuery,
  useGetRecommendationsQuery,
  useGetSocialQuery,
} from "@/store/api/contentApi";

import type { ContentItem } from "@/types/content";

export default function TrendingPage() {
  const newsQuery = useGetNewsQuery({
    category: "technology",
    page: 1,
    pageSize: 6,
  });

  const recommendationsQuery =
    useGetRecommendationsQuery();

  const socialQuery = useGetSocialQuery();

  const items: ContentItem[] = [
    ...(newsQuery.data?.items || []),
    ...(recommendationsQuery.data?.items || []),
    ...(socialQuery.data?.items || []),
  ];

  const uniqueItems = Array.from(
    new Map(
      items.map((item) => [item.id, item]),
    ).values(),
  ).slice(0, 6);

  const isLoading =
    newsQuery.isLoading ||
    recommendationsQuery.isLoading ||
    socialQuery.isLoading;

  return (
    <DashboardShell>
      <section className="mx-auto max-w-7xl">
        <BackButton />

        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            Discover what people are reading
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Trending
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
            A selection of popular news, recommendations,
            and social content from your connected sources.
          </p>
        </div>

        {isLoading ? (
          <LoadingGrid />
        ) : uniqueItems.length === 0 ? (
          <EmptyState
            title="No trending content"
            description="Trending content is not available right now. Please try again later."
          />
        ) : (
          <>
            <div className="mb-5">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Popular right now
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {uniqueItems.map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </DashboardShell>
  );
}
