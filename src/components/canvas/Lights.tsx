"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useSceneEffects } from "@/hooks/useSceneEffects";
import { useSceneStore } from "@/hooks/useSceneStore";
import { isHeroVisible } from "@/lib/sceneMotion";

const SECTION_LIGHT = [
  { key: 1.5, fill: 0.16, rim: 0.9, upper: 0.45, keyColor: "#f5e6d8", rimColor: "#c4b5a0" },
  { key: 1.42, fill: 0.22, rim: 1.0, upper: 0.62, keyColor: "#e8eaf6", rimColor: "#94a3b8" },
  { key: 1.72, fill: 0.3, rim: 1.12, upper: 0.38, keyColor: "#f8fafc", rimColor: "#67e8f9" },
] as const;

export function Lights() {
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const upperRef = useRef<THREE.DirectionalLight>(null);
  const rimBackRef = useRef<THREE.DirectionalLight>(null);
  const rimSideRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const accentRef = useRef<THREE.PointLight>(null);
  const { progress, sectionIndex, highlightSegment, productEngaged } =
    useSceneStore();
  const { pointerBoost } = useSceneEffects();
  const smooth = useRef({ progress: 0, section: 0 });

  useFrame(() => {
    smooth.current.progress = THREE.MathUtils.lerp(
      smooth.current.progress,
      progress,
      0.06
    );
    smooth.current.section = THREE.MathUtils.lerp(
      smooth.current.section,
      sectionIndex,
      0.06
    );

    const inHero = isHeroVisible() && smooth.current.progress < 0.12;
    const idx = Math.min(Math.round(smooth.current.section), 2);
    const profile = SECTION_LIGHT[idx];

    if (keyRef.current) {
      const target = inHero ? 1.85 : profile.key;
      keyRef.current.intensity = THREE.MathUtils.lerp(
        keyRef.current.intensity,
        target,
        0.06
      );
      keyRef.current.color.lerp(new THREE.Color(inHero ? "#f8fafc" : profile.keyColor), 0.05);
      keyRef.current.position.set(
        inHero ? 4.5 : idx === 2 ? 5.2 : 4.2,
        inHero ? 6 : idx === 0 ? 5.2 : 5.8,
        inHero ? 5 : 4.6
      );
    }

    if (upperRef.current) {
      upperRef.current.intensity = THREE.MathUtils.lerp(
        upperRef.current.intensity,
        inHero ? 0.5 : profile.upper,
        0.06
      );
    }

    if (rimBackRef.current) {
      rimBackRef.current.intensity = THREE.MathUtils.lerp(
        rimBackRef.current.intensity,
        inHero ? 1.2 : profile.rim,
        0.06
      );
      rimBackRef.current.color.lerp(
        new THREE.Color(inHero ? "#94a3b8" : profile.rimColor),
        0.04
      );
    }

    if (rimSideRef.current) {
      rimSideRef.current.intensity = THREE.MathUtils.lerp(
        rimSideRef.current.intensity,
        inHero ? 0.7 : 0.48,
        0.06
      );
    }

    if (fillRef.current) {
      fillRef.current.intensity = THREE.MathUtils.lerp(
        fillRef.current.intensity,
        inHero ? 0.14 : profile.fill,
        0.06
      );
    }

    if (accentRef.current) {
      const accentOn = highlightSegment || productEngaged;
      accentRef.current.intensity = THREE.MathUtils.lerp(
        accentRef.current.intensity,
        accentOn ? 0.45 * pointerBoost : 0,
        0.08
      );
      accentRef.current.position.set(
        highlightSegment === "sole" ? 0.2 : 1.4,
        highlightSegment === "upper" ? 1.9 : 0.9,
        2.4
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} color="#14141c" />
      <hemisphereLight
        args={["#2a2a38", "#030308", 0.28]}
        position={[0, 6, 0]}
      />
      <directionalLight
        ref={keyRef}
        position={[4.2, 5.8, 4.6]}
        intensity={1.5}
        color="#e8eaf6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={22}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.00012}
      />
      <directionalLight
        ref={upperRef}
        position={[2.8, 7.5, 3.2]}
        intensity={0.55}
        color="#f1f5f9"
      />
      <directionalLight
        ref={rimBackRef}
        position={[-2, 2.5, -4]}
        intensity={1}
        color="#94a3b8"
      />
      <directionalLight
        ref={rimSideRef}
        position={[5, 1, 1]}
        intensity={0.48}
        color="#a5b4fc"
      />
      <directionalLight
        ref={fillRef}
        position={[-3, -0.2, 2]}
        intensity={0.18}
        color="#3f3f46"
      />
      <pointLight
        ref={accentRef}
        position={[1.4, 0.9, 2.4]}
        intensity={0}
        color="#a5b4fc"
        distance={8}
        decay={2}
      />
    </>
  );
}
