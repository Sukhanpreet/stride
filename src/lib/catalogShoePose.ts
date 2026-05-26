/** Per-product catalog camera pose (radians) */
export const CATALOG_SHOE_POSES: Record<
  string,
  { rotationY: number; rotationX: number; rotationZ: number; y: number }
> = {
  "air-pro": { rotationY: -0.62, rotationX: 0.14, rotationZ: -0.08, y: -0.34 },
  "urban-flow": { rotationY: 0.42, rotationX: 0.1, rotationZ: 0.06, y: -0.32 },
  "court-classic": { rotationY: -1.05, rotationX: 0.12, rotationZ: -0.05, y: -0.33 },
  "night-runner": { rotationY: 0.78, rotationX: 0.16, rotationZ: 0.1, y: -0.31 },
};

export function getCatalogPose(productId: string) {
  return (
    CATALOG_SHOE_POSES[productId] ?? {
      rotationY: -0.5,
      rotationX: 0.12,
      rotationZ: 0,
      y: -0.33,
    }
  );
}
