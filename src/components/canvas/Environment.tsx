"use client";

import { ContactShadows, Environment as DreiEnvironment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { ProductFloor } from "@/components/canvas/ProductFloor";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useSceneProgress } from "@/hooks/useSceneStore";
import { isHeroVisible } from "@/lib/sceneMotion";

export function SceneEnvironment() {
  const isMobile = useIsMobile();
  const progress = useSceneProgress();
  const smoothProgress = useRef(0);
  const { scene } = useThree();

  useFrame(() => {
    smoothProgress.current = THREE.MathUtils.lerp(
      smoothProgress.current,
      progress,
      0.06
    );

    const inHero = isHeroVisible() && smoothProgress.current < 0.12;
    const fog = scene.fog;

    if (fog && fog instanceof THREE.Fog) {
      fog.near = inHero ? 4.5 : 5.5;
      fog.far = inHero ? 10.5 : 11.5;
      fog.color.lerp(new THREE.Color("#020208"), 0.03);
    }
  });

  return (
    <>
      <DreiEnvironment preset="warehouse" environmentIntensity={0.3} background={false} />
      <ProductFloor />
      <ContactShadows
        position={[0, -0.905, 0]}
        opacity={isMobile ? 0.88 : 0.94}
        scale={15}
        blur={isMobile ? 1.6 : 1.35}
        far={4.8}
        color="#000000"
        resolution={isMobile ? 512 : 1024}
      />
      <fog attach="fog" args={["#020208", 4.2, 12]} />
    </>
  );
}
