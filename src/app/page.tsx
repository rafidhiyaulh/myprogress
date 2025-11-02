import { Hero } from "@/components/hero";
import { CountdownTimer } from "@/components/countdown-timer";
import { ProgressLog } from "@/components/progress-log";
import { LearningJourneyMap } from "@/components/learning-journey-map";
import { DockDemo } from "@/components/dock-demo";

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-5 py-12 sm:px-8 lg:px-0">
      <Hero className="mt-4" />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <CountdownTimer className="h-full" />
        <LearningJourneyMap />
      </div>
      <ProgressLog />
      <div className="glass-panel flex flex-col items-center px-6 py-10">
        <DockDemo />
      </div>
    </main>
  );
}
