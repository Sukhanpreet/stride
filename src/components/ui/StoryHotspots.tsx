"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { StoryLabel } from "@/data/story";
import { Container } from "@/components/ui/Container";
import { StoryHotspotStack } from "@/components/ui/StoryHotspotStack";
import { sceneStore } from "@/lib/sceneStore";
import {
  CONNECTOR_STOP_RATIO,
  STORY_COPY_SAFE_MAX_X,
} from "@/lib/storyHotspotLayout";
import { cn } from "@/utils/cn";

type StoryHotspotsProps = {
  labels: readonly StoryLabel[];
  align: "left" | "right";
  panelId: string;
  productAxisX: number;
};

type ConnectorPath = {
  id: string;
  d: string;
  tier: "primary" | "secondary";
};

export function StoryHotspots({
  labels,
  align,
  panelId,
  productAxisX,
}: StoryHotspotsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [paths, setPaths] = useState<ConnectorPath[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [activeId, setActiveId] = useState<string | null>(null);

  const cardsOnRight = align === "left";

  const registerCard = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) cardRefs.current.set(id, el);
    else cardRefs.current.delete(id);
  }, []);

  const measureLines = useCallback(() => {
    const root = containerRef.current;
    if (!root) return;

    const rootRect = root.getBoundingClientRect();
    const w = rootRect.width;
    const h = rootRect.height;
    setSize({ w, h });

    const shoeX = (w * productAxisX) / 100;
    const safeX = (w * STORY_COPY_SAFE_MAX_X) / 100;
    const next: ConnectorPath[] = [];

    for (const label of labels) {
      const card = cardRefs.current.get(label.id);
      if (!card) continue;

      const cardRect = card.getBoundingClientRect();
      const yCard = cardRect.top + cardRect.height / 2 - rootRect.top;
      const yShoe = h * label.shoeAnchorY;

      const x1 = cardsOnRight
        ? cardRect.left - rootRect.left - 2
        : cardRect.right - rootRect.left + 2;

      let xStop =
        x1 + (shoeX - x1) * (cardsOnRight ? CONNECTOR_STOP_RATIO : 1 - CONNECTOR_STOP_RATIO);
      if (cardsOnRight && xStop < safeX) xStop = safeX;
      if (!cardsOnRight && xStop > w - safeX) xStop = w - safeX;

      const xElbow = xStop;
      const d = `M ${x1} ${yCard} L ${xElbow} ${yCard} L ${xElbow} ${yShoe} L ${shoeX} ${yShoe}`;

      next.push({
        id: label.id,
        d,
        tier: label.slot === 1 ? "primary" : "secondary",
      });
    }

    setPaths(next);
  }, [labels, cardsOnRight, productAxisX]);

  useEffect(() => {
    const run = () => requestAnimationFrame(measureLines);
    run();
    const root = containerRef.current;
    if (!root) return;

    const ro = new ResizeObserver(run);
    ro.observe(root);
    window.addEventListener("resize", run, { passive: true });
    window.addEventListener("scroll", run, { passive: true });
    window.addEventListener("story-hotspots-measure", run);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", run);
      window.removeEventListener("scroll", run);
      window.removeEventListener("story-hotspots-measure", run);
    };
  }, [measureLines]);

  const onEnter = useCallback((label: StoryLabel) => {
    setActiveId(label.id);
    sceneStore.setHighlight(label.segment);
  }, []);

  const onLeave = useCallback(() => {
    setActiveId(null);
    sceneStore.setHighlight(null);
  }, []);

  const shoeX = (size.w * productAxisX) / 100;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 hidden md:block"
      data-story-hotspots={panelId}
      aria-label="Product feature highlights"
    >
      {size.w > 0 && size.h > 0 && (
        <svg
          className="absolute inset-0 overflow-visible"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          aria-hidden
        >
          {paths.map((path) => (
            <path
              key={path.id}
              d={path.d}
              fill="none"
              className={cn(
                "story-hotspot-connector",
                path.tier === "primary"
                  ? "story-hotspot-connector--primary"
                  : "story-hotspot-connector--secondary",
                activeId === path.id && "story-hotspot-connector--active"
              )}
            />
          ))}
          {labels.map((label) => (
            <circle
              key={`dot-${label.id}`}
              cx={shoeX}
              cy={size.h * label.shoeAnchorY}
              r={activeId === label.id ? 4 : 2.5}
              className={cn(
                "story-hotspot-dot",
                activeId === label.id && "story-hotspot-dot--active",
                label.slot === 1 && "story-hotspot-dot--primary"
              )}
            />
          ))}
        </svg>
      )}

      <Container
        className={cn(
          "story-hotspot-container flex h-full min-h-0 items-center",
          cardsOnRight ? "justify-end" : "justify-start"
        )}
      >
        <StoryHotspotStack
          labels={labels}
          activeId={activeId}
          cardsOnRight={cardsOnRight}
          registerCard={registerCard}
          onEnter={onEnter}
          onLeave={onLeave}
        />
      </Container>
    </div>
  );
}
