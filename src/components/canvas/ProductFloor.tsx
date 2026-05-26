"use client";

import { Grid, MeshReflectorMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useSceneEffects } from "@/hooks/useSceneEffects";
import { useSceneStore } from "@/hooks/useSceneStore";

/** Ground plane — reflective surface + technical grid (biomechanical engineering) */
export function ProductFloor() {
  const streakRef = useRef<THREE.Mesh>(null);
  const isMobile = useIsMobile();
  const { progress, highlightSegment, endingProgress } = useSceneStore();
  const gridRef = useRef<THREE.Group>(null);
  const { foamCompress } = useSceneEffects();
  const smooth = useRef(0);
  const calmRef = useRef(0);

  useFrame((state) => {
    smooth.current = THREE.MathUtils.lerp(smooth.current, progress, 0.05);
    calmRef.current = THREE.MathUtils.lerp(
      calmRef.current,
      endingProgress,
      0.08
    );
    const calm = calmRef.current;
    if (gridRef.current) {
      gridRef.current.visible = calm < 0.92;
    }
    if (streakRef.current) {
      const mat = streakRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity =
        (0.03 +
          Math.sin(state.clock.elapsedTime * 0.4) * 0.015 +
          (highlightSegment ? 0.04 : 0)) *
        (1 - calm * 0.85);
      streakRef.current.position.x =
        Math.sin(state.clock.elapsedTime * 0.15) * 0.8 * (1 - calm);
    }
  });

  return (
    <group position={[0, -0.91, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <MeshReflectorMaterial
          blur={isMobile ? [200, 80] : [280, 120]}
          mixBlur={0.65}
          mixStrength={(0.18 + foamCompress * 0.12) * (1 - endingProgress * 0.45)}
          resolution={isMobile ? 256 : 512}
          mirror={0.35}
          depthScale={0.9}
          minDepthThreshold={0.35}
          maxDepthThreshold={1.25}
          color="#08080e"
          metalness={0.62}
          roughness={0.78}
          envMapIntensity={0.4}
        />
      </mesh>

      <group ref={gridRef}>
        <Grid
          infiniteGrid
          fadeDistance={11}
          fadeStrength={1.8 + endingProgress * 0.9}
          cellSize={0.4}
          sectionSize={2.4}
          cellColor="#141a28"
          sectionColor="#1e2638"
          position={[0, 0.004, 0]}
        />
      </group>

      <mesh
        ref={streakRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.006, 0]}
      >
        <planeGeometry args={[3.5, 14]} />
        <meshBasicMaterial
          color="#64748b"
          transparent
          opacity={0.04}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[1.2, 1.24, 40]} />
        <meshBasicMaterial
          color="#1e293b"
          transparent
          opacity={0.02}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
