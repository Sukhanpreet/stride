"use client";

import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useSceneProgress } from "@/hooks/useSceneStore";
import { isHeroVisible } from "@/lib/sceneMotion";

export function PostEffects() {
  const isMobile = useIsMobile();
  const progress = useSceneProgress();
  const inHero = isHeroVisible() && progress < 0.12;

  return (
    <EffectComposer multisampling={isMobile ? 0 : 2}>
      <Bloom
        intensity={inHero ? 0.08 : isMobile ? 0.12 : 0.15}
        luminanceThreshold={0.92}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <Vignette
        eskil={false}
        offset={0.28}
        darkness={inHero ? 0.58 : 0.52}
      />
    </EffectComposer>
  );
}
