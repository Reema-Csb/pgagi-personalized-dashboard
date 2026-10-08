"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import BackButton from "@/components/ui/BackButton";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import {
  toggleCategory,
  setTheme,
  type Category,
} from "@/store/slices/preferencesSlice";

const categories: {
  value: Category;
  label: string;
  description: string;
}[] = [
  {
    value: "technology",
    label: "Technology",
    description:
      "AI, software, gadgets, startups, and innovation.",
  },
  {
    value: "sports",
    label: "Sports",
    description:
      "Sports news, teams, events, and performance.",
  },
  {
    value: "finance",
    label: "Finance",
    description:
      "Markets, business, investing, and the economy.",
  },
  {
    value: "entertainment",
    label: "Entertainment",
    description:
      "Movies, music, celebrities, and popular culture.",
  },
];

export default function SettingsPage() {
  const dispatch = useAppDispatch();

  const selectedCategories =
    useAppSelector(
      (state) => state.preferences.categories,
    );

  const theme = useAppSelector(
    (state) => state.preferences.theme,
  );

  return (
    <DashboardShell>
      <section className="mx-auto max-w-4xl">
        <BackButton />

        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            Customize your experience
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Settings
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Manage the topics and appearance of your
            personalized dashboard.
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6">
              <h2 className="text-xl font-bold">
                Content preferences
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Select the topics you want to see in your
                personalized feed.
              </p>
            </div>

            <div className="space-y-3">
              {categories.map((category) => {
                const selected =
                  selectedCategories.includes(
                    category.value,
                  );

                return (
                  <button
                    key={category.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      dispatch(
                        toggleCategory(
                          category.value,
                        ),
                      )
                    }
                    className={`flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-slate-950 bg-slate-50 dark:border-white dark:bg-slate-800"
                        : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div>
                      <p className="font-semibold">
                        {category.label}
                      </p>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {category.description}
                      </p>
                    </div>

                    <span
                      className={`flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition ${
                        selected
                          ? "bg-slate-950 dark:bg-white"
                          : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    >
                      <span
                        className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                          selected
                            ? "translate-x-5 dark:bg-slate-950"
                            : "translate-x-0"
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
              At least one category is always kept
              selected.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6">
              <h2 className="text-xl font-bold">
                Appearance
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Choose how the dashboard looks.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                aria-pressed={theme === "light"}
                onClick={() =>
                  dispatch(setTheme("light"))
                }
                className={`rounded-xl border p-4 text-left transition ${
                  theme === "light"
                    ? "border-slate-950 bg-slate-50 dark:border-white dark:bg-slate-800"
                    : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                }`}
              >
                <div className="mb-3 text-2xl">
                  ☀️
                </div>

                <p className="font-semibold">
                  Light mode
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Bright and clean interface.
                </p>
              </button>

              <button
                type="button"
                aria-pressed={theme === "dark"}
                onClick={() =>
                  dispatch(setTheme("dark"))
                }
                className={`rounded-xl border p-4 text-left transition ${
                  theme === "dark"
                    ? "border-slate-950 bg-slate-50 dark:border-white dark:bg-slate-800"
                    : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                }`}
              >
                <div className="mb-3 text-2xl">
                  🌙
                </div>

                <p className="font-semibold">
                  Dark mode
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Comfortable for low-light environments.
                </p>
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-medium">
              Your current preferences
            </p>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Categories:{" "}
              {selectedCategories
                .map(
                  (category) =>
                    category.charAt(0).toUpperCase() +
                    category.slice(1),
                )
                .join(", ")}
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Theme:{" "}
              {theme === "light"
                ? "Light"
                : "Dark"}
            </p>
          </section>
        </div>
      </section>
    </DashboardShell>
  );
}
