"use client";

import * as React from "react";
import { cn, formatDateInTimezone } from "@/lib/utils";

type TimeParts = {
  total: number;
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const TARGET_DATE = new Date("2026-03-31T00:00:00+07:00");
const TIMEZONE = "Asia/Jakarta";

function getTimeParts(now: Date): TimeParts {
  const diff = TARGET_DATE.getTime() - now.getTime();
  const total = Math.max(diff, 0);

  const remaining = total;
  const seconds = Math.floor((remaining / 1000) % 60);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  const leftoverDays = days - years * 365 - months * 30;

  return {
    total,
    years,
    months,
    days: leftoverDays,
    hours,
    minutes,
    seconds,
  };
}

export function CountdownTimer({
  className,
}: {
  className?: string;
}) {
  const [now, setNow] = React.useState(() => new Date());
  const [parts, setParts] = React.useState(() => getTimeParts(new Date()));
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  React.useEffect(() => {
    setParts(getTimeParts(now));
  }, [now]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const segments: Array<{ label: string; value: number }> = [
    { label: "Years", value: parts.years },
    { label: "Months", value: parts.months },
    { label: "Days", value: parts.days },
    { label: "Hours", value: parts.hours },
    { label: "Minutes", value: parts.minutes },
    { label: "Seconds", value: parts.seconds },
  ];

  const totalDuration = TARGET_DATE.getTime() - new Date("2025-11-02T00:00:00+07:00").getTime();
  const progress = Math.min(
    100,
    Math.max(0, ((totalDuration - parts.total) / totalDuration) * 100)
  );

  return (
    <section
      aria-labelledby="countdown-heading"
      className={cn("glass-panel flex flex-col gap-6 p-6", className)}
    >
      <header className="flex flex-col gap-1">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-caramel-500">
          Countdown to March 31, 2026
        </span>
        <h2 id="countdown-heading" className="text-3xl font-semibold text-foreground">
          {parts.total > 0 ? "Time Remaining" : "Target Date Achieved!"}
        </h2>
        <p className="text-sm text-taupe-500 dark:text-cream-300/80">
          Current time (WIB):{" "}
          <span className="font-medium text-caramel-600 dark:text-caramel-400">
            {mounted ? formatDateInTimezone(now, TIMEZONE) : "Syncing time..."}
          </span>
        </p>
      </header>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className="flex flex-col items-center rounded-2xl border border-white/30 bg-white/60 px-3 py-4 text-center shadow-sm dark:border-white/10 dark:bg-[#2f241f]/80"
          >
            <span className="text-2xl font-bold text-caramel-600 dark:text-cream-200">
              {mounted ? segment.value.toString().padStart(2, "0") : "--"}
            </span>
            <span className="text-xs uppercase tracking-wide text-taupe-500 dark:text-cream-300/80">
              {segment.label}
            </span>
          </div>
        ))}
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between text-xs text-taupe-500 dark:text-taupe-300">
          <span>Progress</span>
          <span>{mounted ? `${progress.toFixed(1)}%` : "Syncing…"}</span>
        </div>
        <div className="h-2 rounded-full bg-cream-100 dark:bg-taupe-800/70">
          <div
            className="h-full rounded-full bg-gradient-to-r from-caramel-400 via-caramel-500 to-caramel-600 transition-all duration-700 ease-out dark:from-caramel-500 dark:via-caramel-400 dark:to-caramel-300"
            style={{ width: mounted ? `${progress}%` : "0%" }}
          />
        </div>
      </div>
    </section>
  );
}
