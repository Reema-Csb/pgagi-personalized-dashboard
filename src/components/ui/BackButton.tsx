"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  label?: string;
}

export default function BackButton({
  label = "Back to Dashboard",
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
    >
      <ArrowLeft size={17} />
      {label}
    </button>
  );
}
