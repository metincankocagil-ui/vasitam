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
    <button
      type="button"
      aria-label="Tema değiştir"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-8 w-[5.05rem] items-center rounded-full border border-slate-200 bg-white/80 px-1 text-xs font-semibold text-slate-500 transition hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
    >
      <span
        className={`absolute inset-1 flex items-center justify-between px-2 text-base tracking-wide transition ${
          isDark ? "text-slate-400" : "text-slate-600"
        }`}
      >
        <span aria-hidden="true">🌞</span>
        <span aria-hidden="true">🌙</span>
      </span>
      <span
        className={`absolute inset-y-1 h-[22px] w-[22px] rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 shadow transition ${
          isDark ? "translate-x-[46px]" : "translate-x-0"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
