import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { ContentItem } from "@/types/content";

interface FavoritesState {
  items: ContentItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",

  initialState,

  reducers: {
    setFavorites: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },

    addFavorite: (state, action: PayloadAction<ContentItem>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    toggleFavorite: (state, action: PayloadAction<ContentItem>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      } else {
        state.items.push(action.payload);
      }
    },

    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const {
  setFavorites,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
