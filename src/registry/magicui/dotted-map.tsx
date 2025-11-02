"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type DottedMapMarker = {
  lat: number;
  lng: number;
  size?: number;
  label?: string;
  tone?: "visited" | "future";
};

function latLngToPosition(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

export function DottedMap({
  markers,
  className,
}: {
  markers: DottedMapMarker[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-[460px] w-full overflow-hidden rounded-[32px] border border-caramel-200/70 bg-gradient-to-br from-cream-50 via-cream-100 to-caramel-100/60 p-6 shadow-[0_40px_80px_-40px_rgba(182,113,47,0.35)] dark:border-taupe-700 dark:from-black dark:via-taupe-950 dark:to-taupe-900",
        className
      )}
    >
      <div className="absolute inset-[18px] rounded-[26px] bg-[radial-gradient(circle_at_5%_10%,rgba(255,255,255,0.7),transparent_55%),radial-gradient(circle_at_100%_20%,rgba(214,167,127,0.45),transparent_55%),radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%,14px_14px] opacity-95 dark:opacity-60" />
      <div className="absolute inset-[18px] rounded-[26px] border border-white/30 dark:border-white/5" />
      <svg
        viewBox="0 0 800 400"
        className="pointer-events-none absolute inset-10 h-auto w-[calc(100%-5rem)] opacity-30"
        aria-hidden="true"
      >
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <path
          d="M54.7,224.3c8.4-1.2,16.8-3,25-5.2c9.4-2.5,18.8-5.6,28.2-8.5c5.2-1.6,10.4-3.2,15.7-4.4c6.8-1.6,13.8-3.2,20.8-1.8
        c4.9,0.9,9.5,3.2,12.9,6.6c4.3,4.3,6.9,10,9.1,15.8c4,10.5,7.4,21.2,11,31.8c2.8,8.2,6.4,16.5,12.8,22.5c5.4,5,12.5,7.7,19.8,8.9
        c10.4,1.7,21.1,0.9,31.5-0.8c14.5-2.3,28.8-6.4,43.4-8.5c10.5-1.5,21.1-1.9,31.6-1.6c16.4,0.5,32.7,2.6,49.1,3.9
        c20.6,1.5,41.8,1.6,62.2-3.1c13.7-3.1,26.8-8.5,39.4-14.7c11.1-5.5,22-11.8,33.9-15.1c16.7-4.7,34.5-3.6,51.6-6.8
        c12.7-2.3,25-6.3,36.5-11.8c14.8-7.1,28.3-16.7,41.4-26.6c15.6-11.8,30.6-24.6,47.2-34.6c16.1-9.5,34-15.8,52-20.3
        c23.3-5.8,47.5-8.9,70.3-16c20.5-6.4,40-16.4,56.8-30.1c14-11.5,26-25.6,34-41.9"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
          className="text-caramel-400/50 dark:text-caramel-300/30"
          filter="url(#glow)"
        />
      </svg>
      {markers.map((marker, index) => {
        const { x, y } = latLngToPosition(marker.lat, marker.lng);
        const size = 14 * (marker.size ?? 0.4);
        const isFuture = marker.tone === "future";

        return (
          <div
            key={`${marker.lat}-${marker.lng}-${index}`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
            }}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2",
                "flex items-center justify-center"
              )}
          >
            <span
              className={cn(
                "relative block rounded-full border border-white/60 shadow-[0_12px_32px_rgba(182,113,47,0.25)] backdrop-blur",
                isFuture
                  ? "bg-blue-500/80"
                  : "bg-emerald-500/80 dark:bg-emerald-400/80"
              )}
              style={{
                width: size,
                height: size,
              }}
            />
            {marker.label ? (
              <span
                className={cn(
                  "absolute left-1/2 top-[calc(100%+0.45rem)] -translate-x-1/2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-caramel-700 shadow-sm backdrop-blur dark:bg-white/10 dark:text-white",
                  isFuture
                    ? "border border-blue-500/30 text-blue-600 dark:border-blue-400/40"
                    : "border border-emerald-500/20 text-emerald-700 dark:border-emerald-400/30"
                )}
              >
                {marker.label}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
