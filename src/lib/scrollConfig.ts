/** Lenis smooth-scroll tuning */
export const LENIS_OPTIONS = {
  /** Higher = snappier catch-up (0–1). Prefer over `duration` for wheel scroll. */
  lerp: 0.14,
  wheelMultiplier: 1.25,
  touchMultiplier: 2,
  smoothWheel: true,
} as const;

/** Scroll distance per pinned story panel (viewport units) */
export const STORY_PIN_END = "+=85%";

/** ScrollTrigger scrub — low lag; shoe damp handles residual smoothing */
export const STORY_SCRUB = 0.1;
