export type PointerState = {
  x: number;
  y: number;
};

export type ShoeSegmentId = "sole" | "mid" | "upper";

/** Product visualization mode — one dominant state per scroll chapter */
export type ProductMode =
  | "hero"
  | "comfort"
  | "structure"
  | "materials"
  | "performance";

export type SceneState = {
  progress: number;
  sectionIndex: number;
  sectionProgress: number;
  pointer: PointerState;
  highlightSegment: ShoeSegmentId | null;
  interactionPaused: boolean;
  variantPreview: number;
  productEngaged: boolean;
  productMode: ProductMode;
  /** 0–1 full-page scroll for navbar progress */
  scrollProgress: number;
  /** 0–1 blend into calm ending composition (about → CTA) */
  endingProgress: number;
};

const defaultState: SceneState = {
  progress: 0,
  sectionIndex: 0,
  sectionProgress: 0,
  pointer: { x: 0, y: 0 },
  highlightSegment: null,
  interactionPaused: false,
  variantPreview: 0,
  productEngaged: false,
  productMode: "hero",
  scrollProgress: 0,
  endingProgress: 0,
};

type Listener = () => void;

let state: SceneState = { ...defaultState };
const listeners = new Set<Listener>();

export const sceneStore = {
  getState: () => state,

  setState: (partial: Partial<SceneState>) => {
    const next = { ...state, ...partial };
    const changed = (Object.keys(partial) as (keyof SceneState)[]).some(
      (key) => state[key] !== next[key]
    );
    if (!changed) return;
    state = next;
    listeners.forEach((listener) => listener());
  },

  setPointer: (pointer: PointerState) => {
    state = { ...state, pointer };
    listeners.forEach((listener) => listener());
  },

  setHighlight: (segment: ShoeSegmentId | null) => {
    state = {
      ...state,
      highlightSegment: segment,
      interactionPaused: segment !== null,
    };
    listeners.forEach((listener) => listener());
  },

  setVariantPreview: (index: number) => {
    state = { ...state, variantPreview: Math.max(0, Math.min(2, index)) };
    listeners.forEach((listener) => listener());
  },

  reset: () => {
    state = { ...defaultState };
    listeners.forEach((listener) => listener());
  },

  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
