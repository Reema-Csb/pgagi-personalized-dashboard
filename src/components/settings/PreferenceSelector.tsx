"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { toggleCategory, type Category } from "@/store/slices/preferencesSlice";

const categories: {
  value: Category;
  label: string;
  description: string;
}[] = [
  {
    value: "technology",
    label: "Technology",
    description: "AI, software, gadgets and emerging technology.",
  },
  {
    value: "sports",
    label: "Sports",
    description: "Sports news, analytics and performance.",
  },
  {
    value: "finance",
    label: "Finance",
    description: "Markets, investing, business and money.",
  },
  {
    value: "entertainment",
    label: "Entertainment",
    description: "Movies, streaming, culture and entertainment.",
  },
];

export default function PreferenceSelector() {
  const dispatch = useAppDispatch();

  const selected = useAppSelector((state) => state.preferences.categories);

  return (
    <div className="space-y-3">
      {categories.map((category) => {
        const active = selected.includes(category.value);

        return (
          <button
            key={category.value}
            type="button"
            aria-pressed={active}
            onClick={() => dispatch(toggleCategory(category.value))}
            className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
              active
                ? "border-slate-900 bg-slate-50 dark:border-white dark:bg-slate-900"
                : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
            }`}
          >
            <div>
              <h3 className="font-semibold">{category.label}</h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {category.description}
              </p>
            </div>

            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                active
                  ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            >
              {active && <span className="text-xs">✓</span>}
            </div>
          </button>
        );
      })}
    </div>
  );
}
