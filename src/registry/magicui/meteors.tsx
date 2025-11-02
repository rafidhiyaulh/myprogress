"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Meteor = {
  id: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
};

function generateMeteors(count: number): Meteor[] {
  return Array.from({ length: count }, (_, idx) => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = 4 + Math.random() * 4;
    const delay = Math.random() * 6;

    return {
      id: idx,
      top: `${top}%`,
      left: `${left}%`,
      duration,
      delay,
    };
  });
}

export function Meteors({
  number = 24,
  className,
}: {
  number?: number;
  className?: string;
}) {
  const [meteors, setMeteors] = React.useState<Meteor[]>([]);

  React.useEffect(() => {
    setMeteors(generateMeteors(number));
  }, [number]);

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="absolute h-px w-24 origin-left scale-0 animate-meteor overflow-hidden rounded-full bg-gradient-to-r from-transparent via-cream-200/80 to-caramel-200/80 dark:via-caramel-400/90 dark:to-cream-200/70"
          style={
            {
              top: meteor.top,
              left: meteor.left,
              animationDelay: `${meteor.delay}s`,
              animationDuration: `${meteor.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
