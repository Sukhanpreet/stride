"use client";

import { useMemo, useRef } from "react";
import type { StoryLabel } from "@/data/story";
import { HudPanel } from "@/components/ui/HudPanel";
import { cn } from "@/utils/cn";

export type StoryHotspotStackProps = {
  labels: readonly StoryLabel[];
  activeId: string | null;
  cardsOnRight: boolean;
  /** Register button elements for connector measurement */
  registerCard: (id: string, el: HTMLButtonElement | null) => void;
  onEnter: (label: StoryLabel) => void;
  onLeave: () => void;
  className?: string;
  /** GSAP sets opacity on labels — hide until revealed */
  animateIn?: boolean;
  mobile?: boolean;
};

export function StoryHotspotStack({
  labels,
  activeId,
  cardsOnRight,
  registerCard,
  onEnter,
  onLeave,
  className,
  animateIn = true,
  mobile = false,
}: StoryHotspotStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(
    () => [...labels].sort((a, b) => a.slot - b.slot),
    [labels]
  );

  return (
    <div
      ref={stackRef}
      data-story-hotspot-stack
      className={cn(
        "story-hotspot-stack flex flex-col",
        mobile
          ? "flex-row gap-[var(--space-2)] overflow-x-auto pb-[var(--space-1)] snap-x snap-mandatory md:flex-col"
          : "w-[9.25rem] justify-center gap-[var(--space-4)] py-[var(--space-8)]",
        className
      )}
      role="list"
    >
      {sorted.map((label, index) => (
        <div
          key={label.id}
          role="listitem"
          className={cn(mobile && "shrink-0 snap-start")}
        >
          <HudPanel
            active={activeId === label.id}
            tier={label.slot === 1 ? "primary" : "secondary"}
            stemSide={cardsOnRight ? "right" : "left"}
            className={cn(
              "w-full",
              mobile ? "min-w-[10.5rem]" : "pointer-events-auto"
            )}
            {...(animateIn ? { "data-story-label": "" } : {})}
            data-story-label-index={index}
            style={animateIn ? { opacity: 0 } : undefined}
          >
            <button
              ref={(el) => registerCard(label.id, el)}
              type="button"
              data-hotspot-segment={label.segment}
              {...(mobile ? { "data-story-label-mobile": "" } : {})}
              onMouseEnter={mobile ? undefined : () => onEnter(label)}
              onMouseLeave={mobile ? undefined : onLeave}
              onFocus={mobile ? undefined : () => onEnter(label)}
              onBlur={mobile ? undefined : onLeave}
              onClick={mobile ? () => onEnter(label) : undefined}
              className="hud-panel__btn focus-ring w-full text-left"
              aria-label={`${label.text}: ${label.detail ?? ""}`}
            >
              <span className="text-label block text-foreground">{label.text}</span>
              {label.detail ? (
                <span
                  className={cn(
                    "mt-1 block leading-snug text-muted-bright",
                    mobile ? "text-[0.7rem]" : "text-[0.65rem]"
                  )}
                >
                  {label.detail}
                </span>
              ) : null}
            </button>
          </HudPanel>
        </div>
      ))}
    </div>
  );
}
