import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Category = "technology" | "sports" | "finance" | "entertainment";

interface PreferencesState {
  categories: Category[];
  theme: "light" | "dark";
}

const initialState: PreferencesState = {
  categories: ["technology", "sports"],
  theme: "light",
};

const preferencesSlice = createSlice({
  name: "preferences",

  initialState,

  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },

    toggleCategory: (state, action: PayloadAction<Category>) => {
      const category = action.payload;

      if (state.categories.includes(category)) {
        if (state.categories.length > 1) {
          state.categories = state.categories.filter(
            (item) => item !== category,
          );
        }
      } else {
        state.categories.push(category);
      }
    },

    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },

    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { setCategories, toggleCategory, setTheme, toggleTheme } =
  preferencesSlice.actions;

export default preferencesSlice.reducer;
