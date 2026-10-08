"use client";

import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({
  message = "Something went wrong while loading the content.",
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
        <AlertCircle size={24} />
      </div>

      <h2 className="mt-4 text-lg font-bold text-red-900 dark:text-red-200">
        Unable to load content
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-red-700 dark:text-red-300">
        {message}
      </p>
    </div>
  );
}
