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
  const [showNotUpdated, setShowNotUpdated] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    // If user wants to switch to dark mode (i.e. currently not dark), show a "Not updated yet" overlay
    // instead of enabling dark mode for now.
    if (!isDark) {
      setShowNotUpdated(true);
      return;
    }

    // If currently dark, allow switching back to light
    setTheme("light");
  };

  return (
    <>
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
      {showNotUpdated ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Not updated yet"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowNotUpdated(false)}
          />
          <div className="relative z-10 mx-4 w-full max-w-md rounded-2xl bg-white/10 p-8 text-center text-cream-50 backdrop-blur-md">
            <h3 className="mb-2 text-lg font-semibold">Not updated yet</h3>
            <p className="mb-6 text-sm">Dark mode toggle is not updated yet.</p>
            <button
              type="button"
              onClick={() => setShowNotUpdated(false)}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-caramel-500 px-4 py-2 text-sm font-semibold text-cream-50 shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
