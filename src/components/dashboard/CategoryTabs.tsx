"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { toggleCategory, type Category } from "@/store/slices/preferencesSlice";

const categories: {
  value: Category;
  label: string;
}[] = [
  {
    value: "technology",
    label: "Technology",
  },
  {
    value: "sports",
    label: "Sports",
  },
  {
    value: "finance",
    label: "Finance",
  },
  {
    value: "entertainment",
    label: "Entertainment",
  },
];

export default function CategoryTabs() {
  const dispatch = useAppDispatch();

  const selected = useAppSelector((state) => state.preferences.categories);

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2"
      role="group"
      aria-label="Content categories"
    >
      {categories.map((category) => {
        const active = selected.includes(category.value);

        return (
          <button
            key={category.value}
            type="button"
            aria-pressed={active}
            onClick={() => dispatch(toggleCategory(category.value))}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
              active
                ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
