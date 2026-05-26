"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useSceneProgress, useSceneStore } from "@/hooks/useSceneStore";
import { isHeroVisible } from "@/lib/sceneMotion";

const COUNT_DESKTOP = 120;
const COUNT_MOBILE = 40;

export function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const progress = useSceneProgress();
  const { endingProgress } = useSceneStore();
  const smoothProgress = useRef(0);
  const isMobile = useIsMobile();
  const count = isMobile ? COUNT_MOBILE : COUNT_DESKTOP;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4.5;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    smoothProgress.current = THREE.MathUtils.lerp(
      smoothProgress.current,
      progress,
      0.06
    );

    const inHero = isHeroVisible() && smoothProgress.current < 0.12;
    const speed = inHero ? 0.008 : 0.015;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * speed;
    }

    if (materialRef.current) {
      const calm = THREE.MathUtils.lerp(0, endingProgress, 0.08);
      const baseOpacity = (isMobile ? 0.08 : inHero ? 0.07 : 0.11) * (1 - calm * 0.75);
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        baseOpacity,
        0.06
      );
      materialRef.current.size = isMobile ? 0.014 : 0.018;
    }
  });

  return (
    <points ref={pointsRef} key={count}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.018}
        color="#64748b"
        transparent
        opacity={0.12}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
