"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useSceneStore } from "@/hooks/useSceneStore";

/** Canvas midground haze — sits behind product, in front of particles */
export function SceneDepth() {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const { sectionIndex } = useSceneStore();
  const smooth = useRef(0);

  useFrame(() => {
    smooth.current = THREE.MathUtils.lerp(smooth.current, sectionIndex, 0.06);
    if (!matRef.current) return;
    const tints = [0.04, 0.06, 0.05];
    const idx = Math.min(Math.round(smooth.current), 2);
    matRef.current.opacity = THREE.MathUtils.lerp(
      matRef.current.opacity,
      tints[idx],
      0.08
    );
  });

  return (
    <mesh position={[0, 0.2, -2.4]} renderOrder={-2}>
      <planeGeometry args={[18, 12]} />
      <meshBasicMaterial
        ref={matRef}
        color="#0c0e18"
        transparent
        opacity={0.04}
        depthWrite={false}
      />
    </mesh>
  );
}
