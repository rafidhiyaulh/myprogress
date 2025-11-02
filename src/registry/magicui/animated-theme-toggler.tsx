"use client";

import * as React from "react";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function AnimatedThemeToggler({
  className,
}: {
  className?: string;
}) {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative flex h-11 w-20 items-center rounded-full border border-caramel-400/60 bg-cream-50/60 px-2 shadow-inner transition-all duration-300 hover:border-caramel-400 hover:shadow-caramel-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel-300 focus-visible:ring-offset-2 dark:border-taupe-700/70 dark:bg-taupe-900/70 dark:hover:border-caramel-500",
        className
      )}
      aria-label="Toggle theme"
    >
      <span className="flex w-full items-center justify-between text-caramel-500 dark:text-caramel-300">
        <Sun className={cn("size-4 transition-opacity", isDark && "opacity-40")} />
        <MoonStar
          className={cn("size-4 transition-opacity", !isDark && "opacity-40")}
        />
      </span>
      <span
        className={cn(
          "absolute inset-y-1 inline-flex w-8 items-center justify-center rounded-full bg-caramel-400 text-cream-50 transition-all duration-300",
          isMounted && (isDark ? "translate-x-8" : "translate-x-0")
        )}
      >
        {isMounted && (isDark ? <MoonStar size={16} /> : <Sun size={16} />)}
      </span>
    </button>
  );
}
