"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function ShinyCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const handleMouseMove = React.useCallback((event: React.MouseEvent) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    element.style.setProperty("--x", `${x}px`);
    element.style.setProperty("--y", `${y}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group/card relative overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-cream-100/60 via-cream-50 to-caramel-100/50 p-[1px] shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl dark:from-taupe-800/40 dark:via-taupe-900/30 dark:to-black/40",
        className
      )}
    >
      <div className="relative h-full w-full rounded-[inherit] bg-white/80 p-6 dark:bg-taupe-900/70">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 [background:radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.65),transparent_45%)] dark:[background:radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(191,123,72,0.6),transparent_50%)]" />
        {children}
      </div>
    </div>
  );
}
