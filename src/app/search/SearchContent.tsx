"use client";

import { useEffect } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

import ContentCard from "@/components/dashboard/ContentCard";
import LoadingGrid from "@/components/dashboard/LoadingGrid";
import EmptyState from "@/components/dashboard/EmptyState";
import BackButton from "@/components/ui/BackButton";

import { useLazySearchContentQuery } from "@/store/api/contentApi";

export default function SearchContent() {
  const searchParams = useSearchParams();

  const query =
    searchParams.get("q")?.trim() || "";

  const [
    searchContent,
    {
      data,
      isLoading,
      isFetching,
      isError,
    },
  ] = useLazySearchContentQuery();

  useEffect(() => {
    if (!query) {
      return;
    }

    searchContent(query);
  }, [query, searchContent]);

  if (!query) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <BackButton />

        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900">
            <Search size={22} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Search
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Search across your personalized content.
          </p>
        </div>

        <EmptyState
          title="Start searching"
          description="Use the search bar above to find news, recommendations, and social content."
        />
      </main>
    );
  }

  if (isLoading || isFetching) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <BackButton />

        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Search results
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Results for &quot;{query}&quot;
          </h1>
        </div>

        <LoadingGrid />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <BackButton />

        <EmptyState
          title="Search failed"
          description="We couldn't load your search results. Please try again."
        />
      </main>
    );
  }

  const items = data?.items || [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <BackButton />

      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Search results
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Results for &quot;{query}&quot;
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {items.length}{" "}
          {items.length === 1
            ? "result"
            : "results"}{" "}
          found
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="No results found"
          description={`We couldn't find any content matching "${query}". Try another search term.`}
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}
    </main>
  );
}
