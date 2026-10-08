"use client";

import { useEffect } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import {
  setMobileSidebarOpen,
} from "@/store/slices/uiSlice";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(
    (state) => state.preferences.theme,
  );

  const mobileSidebarOpen = useAppSelector(
    (state) => state.ui.mobileSidebarOpen,
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark",
    );
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() =>
          dispatch(
            setMobileSidebarOpen(false),
          )
        }
      />

      <div className="min-h-screen lg:pl-64">
        <Header
          onMenuClick={() =>
            dispatch(
              setMobileSidebarOpen(true),
            )
          }
        />

        <main className="min-h-[calc(100vh-4rem)] p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
