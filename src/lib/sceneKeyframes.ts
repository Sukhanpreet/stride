import * as THREE from "three";

/** Sneaker horizontal offset — moves into empty side opposite story text */
export const SNEAKER_OFFSET_X = [0, 1.15, -1.15, 1.1, 0.25] as const;

export const CAMERA_KEYFRAMES = [
  new THREE.Vector3(0, 0.42, 4.2),
  new THREE.Vector3(1.05, 0.35, 3.35),
  new THREE.Vector3(-1.05, 0.4, 3.2),
  new THREE.Vector3(0.95, 0.34, 2.55),
  new THREE.Vector3(0.2, 0.36, 2.45),
] as const;

export const LOOK_AT_KEYFRAMES = [
  new THREE.Vector3(0.05, 0, 0),
  new THREE.Vector3(1.05, 0.02, 0),
  new THREE.Vector3(-1.05, 0.05, 0),
  new THREE.Vector3(1, -0.02, 0),
  new THREE.Vector3(0.15, 0, 0),
] as const;

export const SNEAKER_ROTATION_Y = [-0.55, 0.35, 1.85, 2.75, 2.9] as const;

export function sampleKeyframes<T extends number | THREE.Vector3>(
  keyframes: readonly T[],
  progress: number
): T {
  const clamped = Math.max(0, Math.min(1, progress));
  const scaled = clamped * (keyframes.length - 1);
  const index = Math.min(Math.floor(scaled), keyframes.length - 2);
  const localT = scaled - index;

  const a = keyframes[index];
  const b = keyframes[index + 1];

  if (typeof a === "number" && typeof b === "number") {
    return THREE.MathUtils.lerp(a, b, localT) as T;
  }

  if (a instanceof THREE.Vector3 && b instanceof THREE.Vector3) {
    return a.clone().lerp(b, localT) as T;
  }

  return a;
}
