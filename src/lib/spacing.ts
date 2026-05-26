/** 8px base spacing system */
export const space = {
  1: 8,
  2: 16,
  3: 24,
  4: 32,
  6: 48,
  8: 64,
  12: 96,
} as const;

export type SpaceKey = keyof typeof space;
