"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import ContentCard from "./ContentCard";
import LoadingGrid from "./LoadingGrid";
import EmptyState from "./EmptyState";
import ErrorState from "@/components/ui/ErrorState";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { setFeedItems, reorderFeed } from "@/store/slices/feedSlice";

import {
  useGetNewsQuery,
  useGetRecommendationsQuery,
  useGetSocialQuery,
} from "@/store/api/contentApi";

import type { ContentItem } from "@/types/content";

const PAGE_SIZE = 6;
const API_POOL_SIZE = 20;

export default function ContentGrid() {
  const dispatch = useAppDispatch();

  const selectedCategories = useAppSelector(
    (state) => state.preferences.categories,
  );

  const feedItems = useAppSelector((state) => state.feed.items);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  /*
   * Fetch one reasonably large pool for each
   * selected category.
   *
   * Pagination is handled locally from this
   * combined pool. This prevents the race condition
   * that previously caused:
   *
   * 6 -> 15
   *
   * when multiple categories were selected.
   */
  const technologyQuery = useGetNewsQuery(
    {
      category: "technology",
      page: 1,
      pageSize: API_POOL_SIZE,
    },
    {
      skip: !selectedCategories.includes("technology"),
    },
  );

  const sportsQuery = useGetNewsQuery(
    {
      category: "sports",
      page: 1,
      pageSize: API_POOL_SIZE,
    },
    {
      skip: !selectedCategories.includes("sports"),
    },
  );

  const financeQuery = useGetNewsQuery(
    {
      category: "finance",
      page: 1,
      pageSize: API_POOL_SIZE,
    },
    {
      skip: !selectedCategories.includes("finance"),
    },
  );

  const entertainmentQuery = useGetNewsQuery(
    {
      category: "entertainment",
      page: 1,
      pageSize: API_POOL_SIZE,
    },
    {
      skip: !selectedCategories.includes("entertainment"),
    },
  );

  /*
   * Recommendations and social content are loaded
   * once and become part of the same unified pool.
   */
  const recommendationsQuery = useGetRecommendationsQuery();

  const socialQuery = useGetSocialQuery();

  /*
   * Combine all selected news categories.
   */
  const newsItems = useMemo(() => {
    const items: ContentItem[] = [];

    if (selectedCategories.includes("technology")) {
      items.push(...(technologyQuery.data?.items || []));
    }

    if (selectedCategories.includes("sports")) {
      items.push(...(sportsQuery.data?.items || []));
    }

    if (selectedCategories.includes("finance")) {
      items.push(...(financeQuery.data?.items || []));
    }

    if (selectedCategories.includes("entertainment")) {
      items.push(...(entertainmentQuery.data?.items || []));
    }

    return items;
  }, [
    selectedCategories,
    technologyQuery.data,
    sportsQuery.data,
    financeQuery.data,
    entertainmentQuery.data,
  ]);

  /*
   * Build one unified content pool and remove
   * duplicate IDs.
   */
  const allContentItems = useMemo(() => {
    const combined: ContentItem[] = [
      ...newsItems,
      ...(recommendationsQuery.data?.items || []),
      ...(socialQuery.data?.items || []),
    ];

    const seen = new Set<string>();

    return combined.filter((item) => {
      if (seen.has(item.id)) {
        return false;
      }

      seen.add(item.id);
      return true;
    });
  }, [newsItems, recommendationsQuery.data, socialQuery.data]);

  /*
   * Only show the number of items requested by
   * the local pagination state.
   */
  const visibleItems = useMemo(() => {
    return allContentItems.slice(0, visibleCount);
  }, [allContentItems, visibleCount]);

  /*
   * Determine whether anything is still loading.
   */
  const isLoading =
    technologyQuery.isLoading ||
    sportsQuery.isLoading ||
    financeQuery.isLoading ||
    entertainmentQuery.isLoading ||
    recommendationsQuery.isLoading ||
    socialQuery.isLoading;

  /*
   * Detect API errors.
   */
  const hasError =
    technologyQuery.isError &&
    sportsQuery.isError &&
    financeQuery.isError &&
    entertainmentQuery.isError &&
    recommendationsQuery.isError &&
    socialQuery.isError;

  /*
   * Reset local pagination whenever the selected
   * categories change.
   */
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setDraggedIndex(null);
  }, [selectedCategories]);

  /*
   * Keep Redux feed synchronized with the visible
   * portion of the unified content pool.
   *
   * We use setFeedItems rather than appendFeedItems
   * because visibleCount itself represents the
   * complete currently visible feed.
   */
  useEffect(() => {
    if (!isLoading && visibleItems.length > 0) {
      dispatch(setFeedItems(visibleItems));
    }
  }, [dispatch, isLoading, visibleItems]);

  /*
   * Load exactly six more cards.
   */
  function handleLoadMore() {
    setVisibleCount((current) => {
      return Math.min(current + PAGE_SIZE, allContentItems.length);
    });
  }

  /*
   * Drag and drop.
   */
  function handleDragStart(index: number) {
    setDraggedIndex(index);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDrop(
    event: React.DragEvent<HTMLDivElement>,
    targetIndex: number,
  ) {
    event.preventDefault();

    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      return;
    }

    dispatch(
      reorderFeed({
        fromIndex: draggedIndex,
        toIndex: targetIndex,
      }),
    );

    setDraggedIndex(null);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
  }

  /*
   * Loading state.
   */
  if (isLoading && feedItems.length === 0) {
    return <LoadingGrid />;
  }

  /*
   * Error state.
   */
  if (hasError && allContentItems.length === 0) {
    return <ErrorState message="Unable to load your personalized content." />;
  }

  /*
   * Empty state.
   */
  if (!isLoading && allContentItems.length === 0) {
    return (
      <EmptyState
        title="No content available"
        description="Try selecting another category or check again later."
      />
    );
  }

  /*
   * Use Redux feed for the actual rendered order.
   * This allows drag-and-drop ordering to work.
   */
  const renderedItems = feedItems.length > 0 ? feedItems : visibleItems;

  /*
   * More content exists in the local pool.
   */
  const hasMore = visibleCount < allContentItems.length;

  return (
    <section aria-label="Personalized content">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Your Feed</h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {renderedItems.length}{" "}
            {renderedItems.length === 1 ? "story" : "stories"} available
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {renderedItems.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
            onDragEnd={handleDragEnd}
            className={
              draggedIndex === index
                ? "cursor-grabbing opacity-60"
                : "cursor-grab"
            }
          >
            <ContentCard item={item} isDragging={draggedIndex === index} />
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && renderedItems.length > 0 && (
        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          You&apos;ve reached the end of your personalized feed.
        </p>
      )}
    </section>
  );
}
