"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type JourneyMarker = {
  name: string;
  coordinates: [number, number];
  tone: "visited" | "future";
};

const journeyMarkers: JourneyMarker[] = [
  {
    name: "Jakarta, Indonesia",
    coordinates: [106.8456, -6.2088],
    tone: "visited",
  },
  {
    name: "Manila, Philippines",
    coordinates: [120.9842, 14.5995],
    tone: "visited",
  },
  {
    name: "Boston, USA (Next)",
    coordinates: [-71.0589, 42.3601],
    tone: "future",
  },
];

const Map = dynamic(
  () =>
    import("react-simple-maps").then(({ ComposableMap, Geographies, Geography, Marker }) => {
      const MapComponent = () => (
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 170 }}
          width={640}
          height={360}
          className="w-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: Array<Record<string, unknown>> }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(248, 243, 237, 0.92)"
                  stroke="rgba(182, 113, 47, 0.35)"
                  strokeWidth={0.35}
                />
              ))
            }
          </Geographies>
          {journeyMarkers.map((marker) => (
            <Marker key={marker.name} coordinates={marker.coordinates}>
              <g transform="translate(-6, -6)">
                <circle
                  cx="6"
                  cy="6"
                  r="6"
                  fill={marker.tone === "future" ? "var(--color-info)" : "var(--color-success)"}
                  stroke="white"
                  strokeWidth="2"
                />
              </g>
              <text
                textAnchor="middle"
                y={marker.tone === "future" ? -14 : -12}
                fontSize={12}
                fontWeight={600}
                style={{
                  fill: "var(--color-foreground)",
                  paintOrder: "stroke",
                  stroke: "rgba(0,0,0,0.45)",
                  strokeWidth: 0.8,
                  letterSpacing: "0.02em",
                }}
              >
                {marker.name}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      );
      return MapComponent;
    }),
  { ssr: false }
);

export function LearningJourneyMap({ className }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      aria-labelledby="journey-map"
      className={cn(
        "glass-panel relative flex flex-col gap-6 overflow-hidden p-0",
        className
      )}
    >
      <div className="space-y-2 px-8 pt-8">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-caramel-500 dark:text-cream-200">
          Study Journey
        </span>
        <h2 id="journey-map" className="text-3xl font-semibold text-foreground dark:text-cream-100">
          Productive milestones & next destination
        </h2>
        <p className="max-w-2xl text-sm text-taupe-500 dark:text-cream-300/80">
          Green markers highlight cities where you have produced meaningful work.
          The blue marker shows the next learning destination.
        </p>
      </div>
      <div className="relative px-4 pb-8">
        <div className="glass-panel relative h-[420px] w-full overflow-hidden rounded-[30px] border-none bg-gradient-to-br from-cream-100/90 via-cream-50/90 to-caramel-100/80 p-4 shadow-inner dark:from-[#26201c]/90 dark:via-[#1c1714]/90 dark:to-[#2f231d]/80">
          {mounted ? (
            <Map />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-taupe-500 dark:text-cream-300/80">
              Loading study journey map...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
