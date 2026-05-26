"use client";

import { cn } from "@/utils/cn";

type StoryBalanceGridProps = {
  side?: "left" | "right";
};

/** Faint technical grid — balances opposite hotspot column */
export function StoryBalanceGrid({ side = "left" }: StoryBalanceGridProps) {
  return (
    <div
      className={cn(
        "story-balance-grid pointer-events-none absolute inset-y-0 z-[1] hidden w-[38%] md:block",
        side === "left" ? "left-0" : "right-0"
      )}
      aria-hidden
    >
      <svg
        className="h-full w-full opacity-[0.35]"
        preserveAspectRatio="none"
        viewBox="0 0 200 600"
      >
        {[80, 160, 240, 320, 400, 480].map((y) => (
          <line
            key={`h-${y}`}
            x1="0"
            y1={y}
            x2="200"
            y2={y}
            className="story-balance-grid__ambient"
          />
        ))}
        {[40, 100, 160].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="600"
            className="story-balance-grid__ambient"
          />
        ))}
        <line x1="12" y1="120" x2="88" y2="120" className="story-balance-grid__secondary" />
        <line x1="12" y1="300" x2="120" y2="300" className="story-balance-grid__primary" />
        <line x1="12" y1="480" x2="72" y2="480" className="story-balance-grid__secondary" />
      </svg>
    </div>
  );
}
