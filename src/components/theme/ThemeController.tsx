"use client";

import { useEffect } from "react";

import { useAppSelector } from "@/store/hooks";

export default function ThemeController() {
  const theme = useAppSelector((state) => state.preferences.theme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    root.style.colorScheme = theme;
  }, [theme]);

  return null;
}
