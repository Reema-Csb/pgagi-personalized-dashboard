"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";

import { store } from "./index";

import {
  setCategories,
  setTheme,
  type Category,
} from "./slices/preferencesSlice";

import { setFavorites } from "./slices/favoritesSlice";

import type { ContentItem } from "@/types/content";

const STORAGE_KEY = "pgagi-dashboard-state";

interface PersistedState {
  preferences?: {
    categories?: string[];
    theme?: "light" | "dark";
  };

  favorites?: {
    items?: ContentItem[];
  };
}

const validCategories: Category[] = [
  "technology",
  "sports",
  "finance",
  "entertainment",
];

function loadState() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return;
    }

    const parsed: PersistedState = JSON.parse(stored);

    const categories = parsed.preferences?.categories?.filter(
      (category): category is Category =>
        validCategories.includes(category as Category),
    );

    if (categories && categories.length > 0) {
      store.dispatch(setCategories(categories));
    }

    if (parsed.preferences?.theme) {
      store.dispatch(setTheme(parsed.preferences.theme));
    }

    if (parsed.favorites?.items) {
      store.dispatch(setFavorites(parsed.favorites.items));
    }
  } catch (error) {
    console.error("Failed to restore dashboard state:", error);
  }
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    loadState();

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      const stateToPersist = {
        preferences: state.preferences,

        favorites: state.favorites,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
    });

    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
