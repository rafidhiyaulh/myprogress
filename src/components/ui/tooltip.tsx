"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TooltipContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

export function TooltipProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-flex items-center">{children}</div>
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({
  children,
  asChild = false,
}: {
  children: React.ReactElement;
  asChild?: boolean;
}) {
  const context = React.useContext(TooltipContext);

  if (!context) {
    throw new Error("TooltipTrigger must be used within a Tooltip");
  }

  const triggerProps = {
    onMouseEnter: () => context.setOpen(true),
    onMouseLeave: () => context.setOpen(false),
    onFocus: () => context.setOpen(true),
    onBlur: () => context.setOpen(false),
  };

  if (asChild) {
    return React.cloneElement(children, triggerProps);
  }

  return (
    <span className="inline-flex" {...triggerProps}>
      {children}
    </span>
  );
}

export function TooltipContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(TooltipContext);

  if (!context) {
    throw new Error("TooltipContent must be used within a Tooltip");
  }

  return (
    <div
      role="tooltip"
      aria-hidden={!context.open}
      className={cn(
        "pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 w-max -translate-x-1/2 rounded-md bg-taupe-900 px-3 py-1.5 text-sm text-cream-50 shadow-lg transition-opacity duration-150",
        context.open ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {children}
      <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-taupe-900" />
    </div>
  );
}
