"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function nodeToString(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(nodeToString).join("");
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return nodeToString(node.props.children);
  }
  return "";
}

export function Terminal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-xl rounded-2xl border border-taupe-200/70 bg-cream-50/80 px-6 pb-6 pt-4 text-sm shadow-lg shadow-caramel-200/40 backdrop-blur dark:border-taupe-700/70 dark:bg-taupe-900/70 dark:text-cream-100",
        className
      )}
    >
      <div className="mb-4 flex items-center gap-1">
        <span className="size-3 rounded-full bg-red-400" />
        <span className="size-3 rounded-full bg-yellow-400" />
        <span className="size-3 rounded-full bg-green-400" />
      </div>
      <div className="space-y-2 font-mono">{children}</div>
    </div>
  );
}

export function AnimatedSpan({
  children,
  className,
  delay = 120,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={cn(
        "block translate-y-1 opacity-0 transition-all duration-500 ease-out",
        visible && "translate-y-0 opacity-100",
        className
      )}
    >
      {children}
    </span>
  );
}

export function TypingAnimation({
  children,
  className,
  speed = 28,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const [typed, setTyped] = React.useState("");
  const fullText = React.useMemo(() => nodeToString(children), [children]);

  React.useEffect(() => {
    if (!fullText) {
      return;
    }

    setTyped("");

    let frame = 0;
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        frame += 1;
        const nextLength = Math.min(fullText.length, frame);
        setTyped(fullText.slice(0, nextLength));
        if (nextLength >= fullText.length && interval) {
          window.clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [delay, fullText, speed]);

  const caretVisible = typed.length < fullText.length;

  return (
    <span
      className={cn(
        "relative block font-mono text-[13px] leading-relaxed text-taupe-900 dark:text-cream-200",
        className
      )}
    >
      {typed || (typeof children === "string" ? "" : children)}
      <span
        aria-hidden="true"
        className={cn(
          "ml-1 inline-block h-4 w-[2px] bg-current align-middle transition-opacity duration-150",
          caretVisible ? "opacity-80 animate-pulse" : "opacity-0"
        )}
      />
    </span>
  );
}
