"use client";

import Link from "next/link";
import {
  BarChart3,
  Flame,
  Heart,
  LayoutDashboard,
  Settings,
  Sparkles,
  X,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Trending",
    href: "/trending",
    icon: Flame,
  },
  {
    label: "Favorites",
    href: "/favorites",
    icon: Heart,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  mobileOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 dark:border-slate-800 dark:bg-slate-950 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5 dark:border-slate-800">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
              <Sparkles size={18} />
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight">
                PGAGI
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Content Hub
              </p>
            </div>
          </Link>

          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-900"
          >
            <X size={18} />
          </button>
        </div>

        <nav
          aria-label="Main navigation"
          className="flex-1 px-3 py-5"
        >
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    item.href === "/"
                      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="m-4 rounded-2xl bg-slate-100 p-4 dark:bg-slate-900">
          <p className="text-sm font-bold">
            Personalize your feed
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Choose your interests to get more relevant content.
          </p>

          <Link
            href="/settings"
            onClick={onClose}
            className="mt-3 inline-block text-xs font-semibold underline underline-offset-2"
          >
            Update preferences
          </Link>
        </div>
      </aside>
    </>
  );
}
