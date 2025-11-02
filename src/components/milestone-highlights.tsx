"use client";

import { Sparkle } from "lucide-react";
import { ShinyCard } from "@/registry/magicui/shiny-card";
import { cn } from "@/lib/utils";

const highlights = [
  {
    title: "Weekly Focus",
    description:
      "Selesaikan dua modul deep work, publikasikan minimal satu tulisan refleksi, dan update portofolio dengan proyek terbaru.",
    tag: "Sprint 44",
  },
  {
    title: "Next Milestone",
    description:
      "Siapkan berkas beasiswa untuk program teknologi di Boston. Deadline internal: 15 Desember 2025.",
    tag: "In Progress",
  },
  {
    title: "Why It Matters",
    description:
      "Setiap langkah kecil mempercepat perjalanan menuju 31 Maret 2026. Catatan ini menjadi bukti konsistensi.",
    tag: "Mindset",
  },
];

export function MilestoneHighlights({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="milestone-highlights"
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-caramel-500">
            Highlights
          </span>
          <h2
            id="milestone-highlights"
            className="text-3xl font-semibold text-foreground"
          >
            Kompas progres mingguanmu
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-caramel-300/60 bg-white/60 px-4 py-1 text-xs uppercase tracking-widest text-caramel-600 shadow-sm dark:border-caramel-500/50 dark:bg-white/10 dark:text-caramel-300">
          <Sparkle className="size-4" />
          Meaningful progress only
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((highlight) => (
          <ShinyCard key={highlight.title}>
            <div className="flex h-full flex-col gap-4">
              <span className="inline-flex w-fit rounded-full bg-caramel-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-caramel-600 dark:bg-caramel-300/10 dark:text-caramel-200">
                {highlight.tag}
              </span>
              <h3 className="text-xl font-semibold text-foreground">
                {highlight.title}
              </h3>
              <p className="text-sm text-taupe-500 dark:text-taupe-300">
                {highlight.description}
              </p>
            </div>
          </ShinyCard>
        ))}
      </div>
    </section>
  );
}
