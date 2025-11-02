"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "ghost" | "outline";
type Size = "default" | "icon" | "lg" | "sm";

const variantClasses: Record<Variant, string> = {
  default:
    "bg-caramel-500 text-cream-50 hover:bg-caramel-600 dark:bg-caramel-400 dark:hover:bg-caramel-300",
  ghost:
    "bg-transparent text-foreground hover:bg-caramel-100/40 dark:hover:bg-taupe-800/40",
  outline:
    "border border-caramel-400 text-caramel-700 hover:bg-caramel-100/40",
};

const sizeClasses: Record<Size, string> = {
  default: "h-10 px-4 py-2",
  icon: "h-10 w-10",
  lg: "h-12 px-6",
  sm: "h-9 px-3",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const buttonVariants = ({
  variant = "default",
  size = "default",
}: {
  variant?: Variant;
  size?: Size;
}) => {
  return cn(
    "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-caramel-400 disabled:pointer-events-none disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size]
  );
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
