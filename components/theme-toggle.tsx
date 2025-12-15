"use client";

import { useEffect, useState } from "react";

const prefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (!isClient) {
      return;
    }
    const id = window.requestAnimationFrame(() => {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || (!stored && prefersDark())) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    });
    return () => window.cancelAnimationFrame(id);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    const root = document.documentElement;
    const body = document.body;
    if (theme === "dark") {
      root.classList.add("dark-mode");
      body.classList.add("dark-mode");
    } else {
      root.classList.remove("dark-mode");
      body.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", theme);
  }, [theme, isClient]);

  const isDark = theme === "dark";

  return (
    <div className="flex flex-col items-center text-xs font-semibold text-slate-500">
      <button
        type="button"
        aria-label="Tema değiştir"
        aria-pressed={isDark}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="relative flex h-10 w-28 items-center rounded-full border border-slate-200 bg-white/80 px-1 transition hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        <span
          className={`absolute inset-1 flex items-center justify-between px-3 text-lg tracking-wide text-slate-500 transition ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          <span aria-hidden="true">🌞</span>
          <span aria-hidden="true">🌙</span>
        </span>
        <span
          className={`absolute inset-y-1 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 shadow transition ${
            isDark ? "translate-x-[64px]" : "translate-x-0"
          }`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
