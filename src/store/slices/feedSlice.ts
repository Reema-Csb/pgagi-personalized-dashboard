import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { ContentItem } from "@/types/content";

interface FeedState {
  items: ContentItem[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
}

const initialState: FeedState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasMore: true,
};

const feedSlice = createSlice({
  name: "feed",

  initialState,

  reducers: {
    setFeedItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },

    appendFeedItems: (state, action: PayloadAction<ContentItem[]>) => {
      const existingIds = new Set(state.items.map((item) => item.id));

      const newItems = action.payload.filter(
        (item) => !existingIds.has(item.id),
      );

      state.items.push(...newItems);
    },

    reorderFeed: (
      state,
      action: PayloadAction<{
        fromIndex: number;
        toIndex: number;
      }>,
    ) => {
      const { fromIndex, toIndex } = action.payload;

      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= state.items.length ||
        toIndex >= state.items.length
      ) {
        return;
      }

      const [movedItem] = state.items.splice(fromIndex, 1);

      state.items.splice(toIndex, 0, movedItem);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },

    clearFeed: (state) => {
      state.items = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  setFeedItems,
  appendFeedItems,
  reorderFeed,
  setLoading,
  setError,
  setCurrentPage,
  setHasMore,
  clearFeed,
} = feedSlice.actions;

export default feedSlice.reducer;
