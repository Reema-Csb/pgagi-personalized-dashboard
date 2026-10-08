"use client";

import {
  Bell,
  Menu,
  Moon,
  Search,
  Sun,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import {
  toggleTheme,
} from "@/store/slices/preferencesSlice";

import {
  setSearchQuery,
} from "@/store/slices/uiSlice";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({
  onMenuClick,
}: HeaderProps) {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const theme = useAppSelector(
    (state) => state.preferences.theme,
  );

  const searchQuery = useAppSelector(
    (state) => state.ui.searchQuery,
  );

  const searchTimeout = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  function handleSearch(value: string) {
    dispatch(setSearchQuery(value));

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    searchTimeout.current = setTimeout(() => {
      router.push(
        `/search?q=${encodeURIComponent(trimmedValue)}`,
      );
    }, 300);
  }

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-6 dark:border-slate-800 dark:bg-slate-950/90">
      <button
        type="button"
        aria-label="Open navigation"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-900"
      >
        <Menu size={21} />
      </button>

      <div className="relative hidden max-w-xl flex-1 md:block">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          value={searchQuery}
          onChange={(event) =>
            handleSearch(event.target.value)
          }
          placeholder="Search news, movies, social posts..."
          aria-label="Search content"
          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-slate-600"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          <Bell size={19} />
        </button>

        <button
          type="button"
          aria-label="Toggle theme"
          onClick={() =>
            dispatch(toggleTheme())
          }
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          {theme === "light" ? (
            <Moon size={19} />
          ) : (
            <Sun size={19} />
          )}
        </button>

        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          aria-label="User profile"
        >
          R
        </div>
      </div>
    </header>
  );
}
