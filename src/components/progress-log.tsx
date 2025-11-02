"use client";

import * as React from "react";
import { CheckCircle2, CirclePlus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TIMEZONE = "Asia/Jakarta";

type LogEntry = {
  id: string;
  text: string;
  createdAt: string;
  completed: boolean;
};

function getDateKey(date: Date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
  }).format(date);
}

function loadEntries(): LogEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(`progress-log-${getDateKey()}`);
    if (!raw) return [];
    return JSON.parse(raw) as LogEntry[];
  } catch {
    return [];
  }
}

function saveEntries(entries: LogEntry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    `progress-log-${getDateKey()}`,
    JSON.stringify(entries)
  );
}

export function ProgressLog({ className }: { className?: string }) {
  const [entries, setEntries] = React.useState<LogEntry[]>(() => loadEntries());
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const createId = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  };

  const addEntry = () => {
    setError(null);
    const trimmed = input.trim();
    if (!trimmed) {
      setError("Even a small note counts - write something meaningful.");
      return;
    }
    const newEntry: LogEntry = {
      id: createId(),
      text: trimmed,
      createdAt: new Date().toISOString(),
      completed: true,
    };
    const nextEntries = [newEntry, ...entries];
    setEntries(nextEntries);
    saveEntries(nextEntries);
    setInput("");
  };

  const removeEntry = (id: string) => {
    const nextEntries = entries.filter((entry) => entry.id !== id);
    setEntries(nextEntries);
    saveEntries(nextEntries);
  };

  const toggleEntry = (id: string) => {
    const nextEntries = entries.map((entry) =>
      entry.id === id ? { ...entry, completed: !entry.completed } : entry
    );
    setEntries(nextEntries);
    saveEntries(nextEntries);
  };

  React.useEffect(() => {
    setEntries(loadEntries());
  }, []);

  return (
    <section
      aria-labelledby="progress-log"
      id="progress-log"
      className={cn("glass-panel flex flex-col gap-6 p-6", className)}
    >
      <header className="flex flex-col gap-2">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-caramel-500 dark:text-cream-200">
          Daily progress log
        </span>
        <h2 id="progress-log" className="text-3xl font-semibold text-foreground dark:text-cream-100">
          Meaningful steps, updated daily
        </h2>
        <p className="text-sm text-taupe-500 dark:text-cream-300/80">
          Write down today&apos;s highlights and keep them for tomorrow&apos;s reflection.
        </p>
      </header>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <div className="flex items-center gap-2 rounded-2xl border border-white/40 bg-white/60 px-4 py-3 text-sm shadow-inner focus-within:border-caramel-400 focus-within:ring-2 focus-within:ring-caramel-200 dark:border-white/10 dark:bg-white/5 dark:focus-within:border-caramel-400/60 dark:focus-within:ring-caramel-500/40">
            <CirclePlus className="size-5 text-caramel-500" />
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addEntry();
                }
              }}
              placeholder="Add today&apos;s meaningful progress..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-taupe-400 focus:outline-none"
            />
          </div>
          {error ? (
            <p className="mt-1 text-xs text-red-500">{error}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={addEntry}
          className="inline-flex items-center justify-center rounded-2xl border border-caramel-400 bg-caramel-500 px-6 py-3 text-sm font-semibold text-cream-50 shadow-md transition-colors hover:bg-caramel-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel-200 dark:border-caramel-500/60 dark:bg-caramel-400 dark:text-cream-50 dark:hover:bg-caramel-500"
        >
          Save entry
        </button>
      </div>
      <ul className="space-y-3">
        {entries.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-taupe-200/70 bg-white/50 px-4 py-6 text-center text-sm text-taupe-500 dark:border-taupe-700/70 dark:bg-white/5 dark:text-taupe-300">
            No entries yet. Start with one mindful step.
          </li>
        ) : (
          entries.map((entry) => (
            <li
              key={entry.id}
              className="group flex items-start gap-3 rounded-2xl border border-transparent bg-white/70 px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-caramel-300 hover:shadow-lg dark:bg-white/10 dark:hover:border-caramel-400/40"
            >
              <button
                type="button"
                onClick={() => toggleEntry(entry.id)}
                className={cn(
                  "mt-1 rounded-full transition",
                  entry.completed
                    ? "text-success"
                    : "text-taupe-300 hover:text-success"
                )}
                aria-label={
                  entry.completed
                    ? "Mark as not completed"
                    : "Mark as completed"
                }
              >
                {entry.completed ? (
                  <CheckCircle2 className="size-5" />
                ) : (
                  <CirclePlus className="size-5 rotate-45" />
                )}
              </button>
              <div className="flex-1">
                <p
                  className={cn(
                    "text-sm text-foreground dark:text-cream-100",
                    entry.completed && "text-taupe-700 line-through opacity-80 dark:text-cream-300/70"
                  )}
                >
                  {entry.text}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-taupe-400 dark:text-cream-400/70">
                  {new Intl.DateTimeFormat("id-ID", {
                    timeZone: TIMEZONE,
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(entry.createdAt))}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeEntry(entry.id)}
                className="mt-1 hidden rounded-full p-1 text-taupe-300 transition hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel-200 group-hover:block"
                aria-label="Delete entry"
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
