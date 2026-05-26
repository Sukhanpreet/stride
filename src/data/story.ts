import type { ShoeSegmentId } from "@/lib/sceneStore";
import type { HotspotSlot } from "@/lib/storyHotspotLayout";

export type StoryLabel = {
  id: string;
  text: string;
  detail?: string;
  segment: ShoeSegmentId;
  /** Fixed vertical slot — equal rhythm for HUD cards */
  slot: HotspotSlot;
  /** 0–1 vertical anchor on shoe for connector endpoint only */
  shoeAnchorY: number;
};

export type StoryPanel = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  stat: { label: string; value: string };
  labels: readonly StoryLabel[];
};

export const storyPanels: StoryPanel[] = [
  {
    id: "comfort",
    eyebrow: "01 — Comfort",
    title: "Cloud-Lite Foam",
    body: "Dual-density midsole absorbs impact on concrete and asphalt. Designed for 12-hour city days without fatigue.",
    stat: { label: "Energy return", value: "78%" },
    labels: [
      {
        id: "heel",
        text: "Heel stabilizer",
        detail: "Locked landing",
        segment: "sole",
        slot: 2,
        shoeAnchorY: 0.7,
      },
      {
        id: "foam",
        text: "Cloud-Lite core",
        detail: "Dual-density",
        segment: "mid",
        slot: 1,
        shoeAnchorY: 0.48,
      },
      {
        id: "flex",
        text: "Flex groove",
        detail: "Forefoot spring",
        segment: "sole",
        slot: 0,
        shoeAnchorY: 0.3,
      },
    ],
  },
  {
    id: "materials",
    eyebrow: "02 — Materials",
    title: "Engineered Knit Upper",
    body: "Breathable recycled yarn with targeted stretch zones. Structure where you need it, flex where you move.",
    stat: { label: "Recycled content", value: "42%" },
    labels: [
      {
        id: "knit",
        text: "Engineered knit",
        detail: "Targeted stretch",
        segment: "upper",
        slot: 0,
        shoeAnchorY: 0.55,
      },
      {
        id: "breath",
        text: "Breath zone",
        detail: "Micro-perforation",
        segment: "upper",
        slot: 1,
        shoeAnchorY: 0.42,
      },
      {
        id: "yarn",
        text: "Recycled yarn",
        detail: "42% content",
        segment: "upper",
        slot: 2,
        shoeAnchorY: 0.36,
      },
    ],
  },
  {
    id: "motion",
    eyebrow: "03 — Motion",
    title: "Street-Ready Grip",
    body: "Multi-zone rubber outsole maps traction to your natural stride. Stable heel, flexible forefoot.",
    stat: { label: "Flex score", value: "9.2" },
    labels: [
      {
        id: "rubber",
        text: "Multi-zone rubber",
        detail: "Street grip",
        segment: "sole",
        slot: 0,
        shoeAnchorY: 0.34,
      },
      {
        id: "crash",
        text: "Heel crash pad",
        detail: "Impact shield",
        segment: "sole",
        slot: 2,
        shoeAnchorY: 0.66,
      },
      {
        id: "channel",
        text: "Flex channel",
        detail: "Natural stride",
        segment: "sole",
        slot: 1,
        shoeAnchorY: 0.24,
      },
    ],
  },
];
