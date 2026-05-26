"use client";

import type { CSSProperties } from "react";
import { StoryHotspots } from "@/components/ui/StoryHotspots";
import { StoryBalanceGrid } from "@/components/ui/StoryBalanceGrid";
import { Container } from "@/components/ui/Container";
import type { StoryPanel } from "@/data/story";
import { MobileStoryHotspots } from "@/components/ui/MobileStoryHotspot";
import { getStoryProductAxisX } from "@/lib/storyHotspotLayout";
import { cn } from "@/utils/cn";

type StorySectionProps = {
  panel: StoryPanel;
  index: number;
};

export function StorySection({ panel, index }: StorySectionProps) {
  const textOnLeft = index % 2 === 0;
  const hotspotsOnRight = textOnLeft;
  const productAxisX = getStoryProductAxisX(textOnLeft);

  return (
    <section
      id={panel.id}
      data-story-panel
      data-story-theme={panel.id}
      className={cn("story-section relative min-h-screen w-full overflow-hidden", `story-section--${panel.id}`)}
    >
      <div className={cn("story-section-atmosphere", `story-section-atmosphere--${panel.id}`)} aria-hidden />

      {panel.id === "comfort" && (
        <div
          className="pointer-events-none absolute bottom-[22%] left-[58%] h-24 w-40 opacity-0"
          data-story-foam-glow
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse, rgba(148, 163, 184, 0.1), transparent 72%)",
          }}
        />
      )}

      {panel.id === "motion" && (
        <div
          className="story-speedlines pointer-events-none absolute inset-0 opacity-0"
          data-story-speedlines
          aria-hidden
        />
      )}

      <StoryBalanceGrid side={textOnLeft ? "left" : "right"} />

      <div
        className={cn(
          "story-copy-safe pointer-events-none absolute inset-y-0 z-[2] hidden md:block",
          textOnLeft ? "left-0" : "right-0"
        )}
        aria-hidden
      />

      <StoryHotspots
        labels={panel.labels}
        align={hotspotsOnRight ? "left" : "right"}
        panelId={panel.id}
        productAxisX={productAxisX}
      />

      <Container
        className="story-hotspots-mobile relative z-10 pb-[var(--space-4)] md:hidden"
        data-story-hotspots-mobile={panel.id}
      >
        <p className="text-eyebrow mb-[var(--space-2)]">Tap a feature</p>
        <MobileStoryHotspots
          labels={panel.labels}
          cardsOnRight={hotspotsOnRight}
        />
      </Container>

      <Container
        className={cn(
          "story-section-container min-h-screen py-[var(--space-12)] md:grid md:items-center md:py-[var(--space-12)]",
          textOnLeft
            ? "md:grid-cols-[minmax(0,38%)_1fr]"
            : "md:grid-cols-[1fr_minmax(0,38%)]"
        )}
      >
        <div
          className={cn(
            "story-copy-embed relative z-10 w-full pt-[var(--space-2)] md:pt-0",
            textOnLeft
              ? "story-copy-embed--axis-left md:col-start-1 md:pr-[var(--space-4)]"
              : "story-copy-embed--axis-right md:col-start-2 md:pl-[var(--space-4)] md:text-right"
          )}
          style={{ "--story-axis": `${productAxisX}%` } as CSSProperties}
        >
          <p className="text-eyebrow mb-[var(--space-2)]" data-story-eyebrow>
            {panel.eyebrow}
          </p>
          <h2
            className={cn(
              "text-display-md mb-[var(--space-4)] pb-[var(--space-1)] leading-[1.05]",
              !textOnLeft && "md:ml-auto md:max-w-md"
            )}
            data-story-title
          >
            {panel.title}
          </h2>
          <p
            className={cn(
              "text-body-readable mb-[var(--space-6)] max-w-md",
              !textOnLeft && "md:ml-auto"
            )}
            data-story-body
          >
            {panel.body}
          </p>
          <div
            className={cn(
              "inline-flex flex-col gap-[var(--space-1)] border-accent",
              textOnLeft
                ? "border-l-2 pl-[var(--space-3)]"
                : "border-r-2 pr-[var(--space-3)] md:items-end"
            )}
            data-story-stat
          >
            <span className="text-eyebrow">{panel.stat.label}</span>
            <span
              className="font-display text-3xl font-bold tracking-wide text-accent md:text-4xl"
              data-story-stat-value
            >
              {panel.stat.value}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
