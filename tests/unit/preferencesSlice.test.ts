import {
  describe,
  expect,
  it,
} from "vitest";

import preferencesReducer, {
  toggleCategory,
  setTheme,
  toggleTheme,
  type Category,
} from "@/store/slices/preferencesSlice";

const initialState = {
  categories: [
    "technology",
    "sports",
  ] as Category[],
  theme: "light" as const,
};

describe("preferencesSlice", () => {
  it("toggles a category on", () => {
    const state = preferencesReducer(
      initialState,
      toggleCategory("finance"),
    );

    expect(state.categories).toContain(
      "finance",
    );
  });

  it("toggles an enabled category off", () => {
    const state = preferencesReducer(
      initialState,
      toggleCategory("technology"),
    );

    expect(state.categories).not.toContain(
      "technology",
    );
  });

  it("changes the theme", () => {
    const state = preferencesReducer(
      initialState,
      setTheme("dark"),
    );

    expect(state.theme).toBe("dark");
  });

  it("toggles the theme", () => {
    const state = preferencesReducer(
      initialState,
      toggleTheme(),
    );

    expect(state.theme).toBe("dark");
  });
});
