import * as THREE from "three";
import type { SceneState } from "@/lib/sceneStore";

export type SneakerMotion = {
  x: number;
  y: number;
  z: number;
  rotationY: number;
  rotationX: number;
  rotationZ: number;
};

/** Hold pose for first 62% of each panel; blend only near section end */
export const HOLD_BLEND_START = 0.62;

/** Horizontal slot — empty column beside story copy */
const SHOE_SIDE_X = 1.42;

/** Hero — forward in Z so product reads in front of typography zone */
export const HERO_MOTION: SneakerMotion = {
  x: 1.38,
  y: -0.04,
  z: 0.52,
  rotationY: -0.58,
  rotationX: 0.2,
  rotationZ: -0.4,
};

/** Final CTA — centered, elevated above copy (shoe above headline) */
export const ENDING_MOTION: SneakerMotion = {
  x: 0,
  y: 0.28,
  z: 0.14,
  rotationY: -0.42,
  rotationX: 0.1,
  rotationZ: -0.06,
};

export function shoeXForPanel(panelIndex: number): number {
  const textOnLeft = panelIndex % 2 === 0;
  return textOnLeft ? SHOE_SIDE_X : -SHOE_SIDE_X;
}

/** comfort — soft settle | materials — analytical | motion — dynamic lean */
export const STORY_MOTION: readonly SneakerMotion[] = [
  {
    x: shoeXForPanel(0),
    y: -0.12,
    z: 0.04,
    rotationY: -0.48,
    rotationX: 0.1,
    rotationZ: -0.14,
  },
  {
    x: shoeXForPanel(1),
    y: -0.1,
    z: 0,
    rotationY: 1.12,
    rotationX: 0.08,
    rotationZ: 0.06,
  },
  {
    x: shoeXForPanel(2),
    y: -0.16,
    z: -0.06,
    rotationY: -0.62,
    rotationX: 0.18,
    rotationZ: -0.28,
  },
];

function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function lerpAngle(a: number, b: number, t: number): number {
  const delta =
    THREE.MathUtils.euclideanModulo(b - a + Math.PI, Math.PI * 2) - Math.PI;
  return a + delta * t;
}

function lerpMotion(a: SneakerMotion, b: SneakerMotion, t: number): SneakerMotion {
  const crossSide = Math.sign(a.x) !== Math.sign(b.x);
  const arc = crossSide ? Math.sin(t * Math.PI) : 0;

  return {
    x: THREE.MathUtils.lerp(a.x, b.x, t),
    y: THREE.MathUtils.lerp(a.y, b.y, t) + arc * 0.14,
    z: THREE.MathUtils.lerp(a.z, b.z, t) + arc * 0.08,
    rotationY: lerpAngle(a.rotationY, b.rotationY, t),
    rotationX: lerpAngle(a.rotationX, b.rotationX, t),
    rotationZ: lerpAngle(a.rotationZ, b.rotationZ, t),
  };
}

export function isHeroVisible(): boolean {
  if (typeof window === "undefined") return true;
  const hero = document.getElementById("hero");
  if (!hero) return true;
  return hero.getBoundingClientRect().bottom > 100;
}

function applyEndingBlend(
  motion: SneakerMotion,
  endingProgress: number,
  mobileScale: number
): SneakerMotion {
  if (endingProgress <= 0.001) return motion;
  const t = smoothstep(endingProgress);
  const end = {
    ...ENDING_MOTION,
    x: ENDING_MOTION.x * mobileScale,
  };
  return lerpMotion(motion, end, t);
}

export function getSneakerMotion(
  state: SceneState,
  mobile = false
): SneakerMotion {
  const mobileScale = mobile ? 0.58 : 1;
  const { sectionIndex, sectionProgress, endingProgress } = state;

  if (isHeroVisible() && state.progress < 0.12) {
    const heroT = Math.min(1, state.progress / 0.1);
    const scrollRotY = heroT * 0.28;
    const scrollZ = heroT * 0.18;
    return {
      ...HERO_MOTION,
      x: HERO_MOTION.x * mobileScale,
      z: HERO_MOTION.z + scrollZ,
      rotationY: HERO_MOTION.rotationY + scrollRotY,
    };
  }

  const idx = Math.min(sectionIndex, STORY_MOTION.length - 1);
  let motion: SneakerMotion;

  if (sectionIndex === 0 && sectionProgress < 0.45) {
    motion = lerpMotion(
      HERO_MOTION,
      STORY_MOTION[0],
      smoothstep(sectionProgress / 0.45)
    );
  } else {
    motion = { ...STORY_MOTION[idx] };
    const next = STORY_MOTION[idx + 1];
    if (next && sectionProgress > HOLD_BLEND_START) {
      const t = smoothstep(
        (sectionProgress - HOLD_BLEND_START) / (1 - HOLD_BLEND_START)
      );
      motion = lerpMotion(motion, next, t);
    }
  }

  const scaled = { ...motion, x: motion.x * mobileScale };
  return applyEndingBlend(scaled, endingProgress, mobileScale);
}

export function getPointerMotionOffset(
  pointer: SceneState["pointer"],
  mobile = false,
  boost = 1
): Pick<SneakerMotion, "x" | "y"> {
  if (mobile) return { x: 0, y: 0 };
  return {
    x: pointer.x * 0.1 * boost,
    y: pointer.y * 0.035 * boost,
  };
}

export function getCameraTargets(
  motion: SneakerMotion,
  mobile = false,
  sectionIndex = 0,
  endingProgress = 0
) {
  const inHero = isHeroVisible() && motion.z > 0.35;
  const z = mobile ? 2.95 : inHero ? 2.55 : sectionIndex === 2 ? 2.68 : 2.82;
  const offset = inHero ? 0.42 : sectionIndex === 2 ? 0.58 : 0.5;
  const camX = motion.x > 0 ? motion.x - offset : motion.x + offset;
  const lookY = motion.y + (sectionIndex === 0 ? 0.1 : 0.06);

  const position = new THREE.Vector3(camX, motion.y + 0.52, z);
  const lookAt = new THREE.Vector3(motion.x, lookY, motion.z * 0.65);

  if (endingProgress > 0.001) {
    const t = smoothstep(endingProgress);
    const endZ = mobile ? 2.72 : 2.48;
    position.lerp(
      new THREE.Vector3(motion.x * 0.15, motion.y + 0.38, endZ),
      t
    );
    lookAt.lerp(
      new THREE.Vector3(motion.x, motion.y + 0.08, motion.z * 0.5),
      t
    );
  }

  return { position, lookAt };
}
