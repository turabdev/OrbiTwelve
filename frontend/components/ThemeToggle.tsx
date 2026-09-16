"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      aria-label="Toggle dark mode"
      className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}