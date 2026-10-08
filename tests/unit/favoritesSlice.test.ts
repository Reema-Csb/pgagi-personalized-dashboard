import { describe, expect, it } from "vitest";

import reducer, {
  addFavorite,
  removeFavorite,
  toggleFavorite,
} from "@/store/slices/favoritesSlice";

import type { ContentItem } from "@/types/content";

const item: ContentItem = {
  id: "test-1",
  title: "Test Article",
  description: "Test description",
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  category: "technology",
  source: "news",
  sourceName: "Test Source",
  publishedAt: "Today",
};

describe("favoritesSlice", () => {
  it("adds a favorite", () => {
    const state = reducer(undefined, addFavorite(item));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe("test-1");
  });

  it("does not add duplicate favorites", () => {
    let state = reducer(undefined, addFavorite(item));

    state = reducer(state, addFavorite(item));

    expect(state.items).toHaveLength(1);
  });

  it("removes a favorite", () => {
    let state = reducer(undefined, addFavorite(item));

    state = reducer(state, removeFavorite("test-1"));

    expect(state.items).toHaveLength(0);
  });

  it("toggles a favorite", () => {
    let state = reducer(undefined, toggleFavorite(item));

    expect(state.items).toHaveLength(1);

    state = reducer(state, toggleFavorite(item));

    expect(state.items).toHaveLength(0);
  });
});
