"use client";

import { Moon, Sun } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { setTheme } from "@/store/slices/preferencesSlice";

export default function ThemeSelector() {
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.preferences.theme);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <button
        type="button"
        aria-pressed={theme === "light"}
        onClick={() => dispatch(setTheme("light"))}
        className={`rounded-2xl border p-5 text-left transition ${
          theme === "light"
            ? "border-slate-900 bg-slate-50 dark:border-white dark:bg-slate-900"
            : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
        }`}
      >
        <Sun size={22} />

        <h3 className="mt-4 font-semibold">Light</h3>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Use a bright interface.
        </p>
      </button>

      <button
        type="button"
        aria-pressed={theme === "dark"}
        onClick={() => dispatch(setTheme("dark"))}
        className={`rounded-2xl border p-5 text-left transition ${
          theme === "dark"
            ? "border-slate-900 bg-slate-50 dark:border-white dark:bg-slate-900"
            : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
        }`}
      >
        <Moon size={22} />

        <h3 className="mt-4 font-semibold">Dark</h3>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Reduce brightness for comfortable viewing.
        </p>
      </button>
    </div>
  );
}
