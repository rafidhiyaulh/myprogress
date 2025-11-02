"use client";

import { type ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateInTimezone(date: Date, timeZone: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone,
      dateStyle: "full",
      timeStyle: "medium",
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
}
