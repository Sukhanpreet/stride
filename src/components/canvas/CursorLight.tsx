"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useSceneEffects } from "@/hooks/useSceneEffects";
import { sceneStore } from "@/lib/sceneStore";

const target = new THREE.Vector3();

export function CursorLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const isMobile = useIsMobile();
  const smoothPointer = useRef({ x: 0, y: 0 });
  const { pointerBoost } = useSceneEffects();

  useFrame((_, delta) => {
    if (!lightRef.current || isMobile) return;

    const { pointer } = sceneStore.getState();
    smoothPointer.current.x = THREE.MathUtils.lerp(
      smoothPointer.current.x,
      pointer.x,
      1 - Math.exp(-8 * delta)
    );
    smoothPointer.current.y = THREE.MathUtils.lerp(
      smoothPointer.current.y,
      pointer.y,
      1 - Math.exp(-8 * delta)
    );

    target.set(
      smoothPointer.current.x * 2.2,
      smoothPointer.current.y * 1.4 + 0.8,
      2.8
    );
    lightRef.current.position.lerp(target, 0.12);
    lightRef.current.intensity = THREE.MathUtils.lerp(
      lightRef.current.intensity,
      (0.28 + Math.abs(smoothPointer.current.x) * 0.08) * pointerBoost,
      0.08
    );
  });

  if (isMobile) return null;

  return (
    <pointLight
      ref={lightRef}
      color="#94a3b8"
      intensity={0}
      distance={9}
      decay={2}
    />
  );
}
