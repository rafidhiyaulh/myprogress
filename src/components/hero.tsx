"use client";

import { Meteors } from "@/registry/magicui/meteors";
import { AnimatedThemeToggler } from "@/registry/magicui/animated-theme-toggler";
import { cn } from "@/lib/utils";

const heroReminders = [
  {
    title: "Mindful",
    description: "Engage every activity with full awareness and presence.",
  },
  {
    title: "Meaningful",
    description: "Choose actions that bring you closer to the November 11, 2026 goal.",
  },
  {
    title: "Intentional",
    description: "Design your schedule with a clear purpose behind each step.",
  },
];

export function Hero({ className }: { className?: string }) {
  return (
    <section
      id="top"
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-[40px] border border-cream-100/70 bg-gradient-to-br from-cream-100 via-cream-50 to-caramel-100/70 px-6 py-10 shadow-xl shadow-caramel-200/40 dark:border-taupe-800/70 dark:from-taupe-900 dark:via-taupe-950 dark:to-black",
        className
      )}
    >
      <div className="absolute inset-0">
        <Meteors number={28} />
      </div>
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-caramel-500 dark:bg-white/10 dark:text-cream-200">
              My Progress
            </span>
            <AnimatedThemeToggler />
          </div>
          <h1 className="max-w-2xl text-4xl font-semibold text-foreground dark:text-cream-200 sm:text-5xl lg:text-6xl">
            Productivity Timer
          </h1>
          <p className="max-w-xl text-base text-taupe-500 dark:text-cream-100">
            Log Activity to Focus from 11 November 2025
          </p>
        </div>
        <div className="glass-panel relative w-full max-w-sm self-center rounded-[32px] border-none bg-white/70 p-6 text-left shadow-lg dark:bg-[#362821]/75">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-caramel-500 dark:text-cream-200">
            Reminder
          </span>
          <ul className="mt-4 space-y-4">
            {heroReminders.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-sm dark:border-white/15 dark:bg-[#433027]/85"
              >
                <p className="text-sm font-semibold text-foreground dark:text-cream-100">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-taupe-500 dark:text-cream-100">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
