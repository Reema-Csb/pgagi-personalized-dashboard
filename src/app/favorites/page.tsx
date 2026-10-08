"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import BackButton from "@/components/ui/BackButton";
import ContentCard from "@/components/dashboard/ContentCard";
import EmptyState from "@/components/dashboard/EmptyState";

import { useAppSelector } from "@/store/hooks";

export default function FavoritesPage() {
  const favorites = useAppSelector(
    (state) => state.favorites.items,
  );

  return (
    <DashboardShell>
      <section className="mx-auto max-w-7xl">
        <BackButton />

        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            Your saved content
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Favorites
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Articles and recommendations you saved for later.
          </p>
        </div>

        {favorites.length === 0 ? (
          <EmptyState
            title="No favorites yet"
            description="Tap the heart on any content card to save it here."
          />
        ) : (
          <>
            <div className="mb-5">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {favorites.length}{" "}
                {favorites.length === 1
                  ? "saved item"
                  : "saved items"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {favorites.map((item) => (
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
