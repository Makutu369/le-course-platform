"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      // Check localStorage and system preference
      const savedTheme = localStorage.getItem("theme");
      const systemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return savedTheme
        ? (savedTheme as "light" | "dark")
        : systemTheme
        ? "dark"
        : "light";
    }
    return "light";
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-9 w-9 rounded-full"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
