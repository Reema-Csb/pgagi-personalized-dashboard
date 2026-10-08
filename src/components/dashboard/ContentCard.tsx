"use client";

import { Heart, ExternalLink, Clock, GripVertical } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { DragEvent, MouseEvent } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { toggleFavorite } from "@/store/slices/favoritesSlice";

import type { ContentItem } from "@/types/content";

interface ContentCardProps {
  item: ContentItem;
  onDragStart?: (event: DragEvent<HTMLDivElement>) => void;
  isDragging?: boolean;
}

export default function ContentCard({
  item,
  onDragStart,
  isDragging = false,
}: ContentCardProps) {
  const dispatch = useAppDispatch();

  const reduxIsFavorite = useAppSelector((state) =>
    state.favorites.items.some((favorite) => favorite.id === item.id),
  );

  const [clickedFavorite, setClickedFavorite] = useState<boolean | null>(null);

  const isFavorite = clickedFavorite ?? reduxIsFavorite;

  function handleFavorite(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const nextFavorite = !isFavorite;

    setClickedFavorite(nextFavorite);

    dispatch(toggleFavorite(item));
  }

  function handleDragStart(event: DragEvent<HTMLDivElement>) {
    onDragStart?.(event);
  }

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 ${
        isDragging ? "ring-2 ring-slate-400" : ""
      }`}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";
          }}
        />

        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold capitalize text-slate-800 shadow-sm backdrop-blur">
            {item.category}
          </span>
        </div>

        {onDragStart && (
          <div
            draggable
            onDragStart={handleDragStart}
            title="Drag to reorder"
            aria-label={`Drag ${item.title} to reorder`}
            className="absolute bottom-3 left-3 z-10 flex cursor-grab items-center justify-center rounded-full bg-white/90 p-2.5 text-slate-700 shadow-sm backdrop-blur transition hover:scale-105 active:cursor-grabbing"
          >
            <GripVertical size={18} />
          </div>
        )}

        <button
          type="button"
          data-testid="favorite-button"
          draggable={false}
          aria-label={
            isFavorite
              ? `Remove ${item.title} from favorites`
              : `Add ${item.title} to favorites`
          }
          aria-pressed={isFavorite}
          onClick={handleFavorite}
          className="absolute right-3 top-3 z-20 rounded-full bg-white/90 p-2.5 text-slate-700 shadow-sm backdrop-blur transition hover:scale-105"
        >
          <Heart size={18} className={isFavorite ? "fill-current" : ""} />
        </button>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">{item.sourceName}</span>

          <span>|</span>

          <span className="flex items-center gap-1">
            <Clock size={12} />
            {item.publishedAt}
          </span>
        </div>

        <h2 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight">
          {item.title}
        </h2>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {item.description}
        </p>

        <div className="mt-5">
          <a
            href={item.url || "#"}
            target={item.url ? "_blank" : undefined}
            rel={item.url ? "noreferrer" : undefined}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline dark:text-white"
          >
            Read more
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
