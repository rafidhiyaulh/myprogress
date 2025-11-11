My Progress is a personal dashboard for tracking my own development progress. It's built to help me log daily wins, stay focused on long-term goals with a visible countdown, and visualize milestone progress.

## The Purpose

- Personal progress tracking: keep short daily notes of meaningful work.
- Focus and context: a countdown toward a target date to help create urgency and clarity.
- Visual milestones: a simple study journey map to mark where meaningful work happened.

This project is intentionally personal — it's tailored as a development and habit-tracking sandbox for my own growth.

## Why I built this

- To reinforce productive routines through daily logging and gentle reminders.
- To make long-term goals feel more tangible via a countdown and progress indicators.
- To experiment with UI/UX patterns (color accessibility, theme handling, and component design) while keeping the interface clean and minimal.

## Key features

- Daily progress log: write short entries and review them later.
- Productivity countdown: a live countdown to a target date (currently set to November 11, 2026 in code).
- Study journey: simple map-based markers for milestones or notable locations.
- Theme handling: focused on a polished light theme; dark mode is intentionally gated behind a "Not updated yet" UX to avoid accidental usage until fully implemented.

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- pnpm

## Run locally

1. Install dependencies:

```bash
pnpm install
```

2. Start development server:

```bash
pnpm dev
```

3. Open http://localhost:3000

Production build:

```bash
pnpm build
pnpm start
```