"use client";

import type { StoryLabel } from "@/data/story";
import { StoryHotspotStack } from "@/components/ui/StoryHotspotStack";
import { useSceneStore } from "@/hooks/useSceneStore";
import { sceneStore, type ShoeSegmentId } from "@/lib/sceneStore";

type MobileStoryHotspotsProps = {
  labels: readonly StoryLabel[];
  cardsOnRight: boolean;
};

export function MobileStoryHotspots({
  labels,
  cardsOnRight,
}: MobileStoryHotspotsProps) {
  const { highlightSegment } = useSceneStore();
  const activeId =
    labels.find((l) => l.segment === highlightSegment)?.id ?? null;

  return (
    <StoryHotspotStack
      labels={labels}
      activeId={activeId}
      cardsOnRight={cardsOnRight}
      registerCard={() => {}}
      onEnter={(label) => {
        const active = highlightSegment === label.segment;
        sceneStore.setHighlight(active ? null : label.segment);
      }}
      onLeave={() => sceneStore.setHighlight(null)}
      animateIn={false}
      mobile
    />
  );
}
