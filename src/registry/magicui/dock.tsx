"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Dock({
  children,
  className,
  direction = "middle",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "middle" | "bottom";
}) {
  return (
    <div
      className={cn(
        "group/dock flex items-center gap-4 rounded-3xl border border-taupe-200/70 bg-cream-100/70 px-6 py-4 shadow-lg shadow-caramel-200/50 backdrop-blur-md dark:border-taupe-700 dark:bg-taupe-900/90 dark:shadow-black/30",
        direction === "bottom" ? "pb-5" : "py-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DockIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid place-items-center transition-transform duration-200 ease-out group-hover/dock:scale-105 hover:scale-110",
        className
      )}
    >
      {children}
    </div>
  );
}
