"use client";

import Link from "next/link";
import { Flame } from "lucide-react";

import { useAppSelector } from "@/store/hooks";

import ContentCard from "./ContentCard";

export default function TrendingSection() {
  const items = useAppSelector((state) => state.feed.items);

  const trending = [...items].slice(0, 3);

  if (trending.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Flame size={20} />

            <h2 className="text-xl font-bold">Trending now</h2>
          </div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Popular content from your feed.
          </p>
        </div>

        <Link
          href="/trending"
          className="text-sm font-semibold hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {trending.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
