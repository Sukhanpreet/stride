export const Z_INDEX = {
  background: 0,
  midground: 5,
  canvas: 10,
  content: 20,
  navbar: 30,
  noise: 40,
  overlay: 50,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const CONTAINER_WIDTH = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-[100vw]",
} as const;

export type ContainerSize = keyof typeof CONTAINER_WIDTH;
