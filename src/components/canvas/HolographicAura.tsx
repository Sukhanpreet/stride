"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useSceneStore } from "@/hooks/useSceneStore";
import { getSneakerMotion } from "@/lib/sceneMotion";

/** Subtle floor ring — materials section only; no hero bloom sphere */
export function HolographicAura() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const smoothX = useRef(0);
  const smoothOpacity = useRef(0);
  const sceneState = useSceneStore();
  const isMobile = useIsMobile();

  useFrame((state) => {
    const motion = getSneakerMotion(sceneState, isMobile);
    smoothX.current = THREE.MathUtils.lerp(smoothX.current, motion.x, 0.08);

    const showRing =
      sceneState.sectionIndex === 1
        ? sceneState.sectionProgress * 0.08
        : 0;
    smoothOpacity.current = THREE.MathUtils.lerp(
      smoothOpacity.current,
      showRing,
      0.1
    );

    if (groupRef.current) {
      groupRef.current.position.set(smoothX.current, motion.y + 0.02, motion.z);
    }

    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = smoothOpacity.current;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.42, 0]}>
        <ringGeometry args={[0.48, 0.495, 48]} />
        <meshBasicMaterial
          color="#475569"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
