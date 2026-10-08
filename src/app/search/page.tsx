import { Suspense } from "react";

import SearchContent from "./SearchContent";

function SearchLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Loading search results...
        </p>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
}
