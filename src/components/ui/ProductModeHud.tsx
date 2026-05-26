"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useSceneStore } from "@/hooks/useSceneStore";
import type { ProductMode } from "@/lib/sceneStore";
import { cn } from "@/utils/cn";

const MODE_LABELS: Record<ProductMode, string> = {
  hero: "Product view",
  comfort: "Comfort mapping",
  structure: "Structure scan",
  materials: "Material layers",
  performance: "Motion analysis",
};

/** Scroll-driven visualization mode — biomechanical engineering HUD */
export function ProductModeHud() {
  const { productMode, highlightSegment, endingProgress } = useSceneStore();
  const [storyActive, setStoryActive] = useState(true);

  useEffect(() => {
    const featured = document.getElementById("featured");
    if (!featured) return;

    const trigger = ScrollTrigger.create({
      trigger: featured,
      start: "top 70%",
      onEnter: () => setStoryActive(false),
      onLeaveBack: () => setStoryActive(true),
    });

    return () => trigger.kill();
  }, []);

  if (!storyActive || endingProgress > 0.05) return null;

  const label = highlightSegment
    ? `Isolate · ${highlightSegment}`
    : MODE_LABELS[productMode];

  return (
    <div
      className={cn(
        "product-mode-hud pointer-events-none fixed bottom-6 left-6 z-20 hidden md:block",
        productMode === "hero" && !highlightSegment && "opacity-40"
      )}
      aria-live="polite"
      aria-atomic
    >
      <p className="text-eyebrow mb-1 text-muted-bright">Scan mode</p>
      <p className="font-display text-sm font-semibold tracking-wide text-foreground">
        {label}
      </p>
      <span className="product-mode-hud__pulse mt-2 block h-px w-12 bg-accent/60" aria-hidden />
    </div>
  );
}
