/** Default product anchor when text is left (shoe right) */
export const STORY_PRODUCT_AXIS_X = 58;

/** Mirror axis when text is right (shoe left) — e.g. materials panel */
export const STORY_PRODUCT_AXIS_X_MIRROR = 42;

export function getStoryProductAxisX(textOnLeft: boolean): number {
  return textOnLeft ? STORY_PRODUCT_AXIS_X : STORY_PRODUCT_AXIS_X_MIRROR;
}

/** Strict vertical rhythm — equal 22% gaps (≈180 / 320 / 460 @ 900px) */
export const HOTSPOT_SLOT_Y: readonly [number, number, number] = [
  0.28, 0.5, 0.72,
] as const;

export type HotspotSlot = 0 | 1 | 2;

export function slotY(slot: HotspotSlot): number {
  return HOTSPOT_SLOT_Y[slot];
}

/** Line stops short of shoe — keeps connectors lighter on the right */
export const CONNECTOR_STOP_RATIO = 0.72;

/** Copy safe column — no connector geometry past this (viewport %) */
export const STORY_COPY_SAFE_MAX_X = 44;
