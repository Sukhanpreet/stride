"use client";

import { Suspense } from "react";
import { CameraRig } from "@/components/canvas/CameraRig";
import { CursorLight } from "@/components/canvas/CursorLight";
import { SceneEnvironment } from "@/components/canvas/Environment";
import { HolographicAura } from "@/components/canvas/HolographicAura";
import { Lights } from "@/components/canvas/Lights";
import { Particles } from "@/components/canvas/Particles";
import { PointerTracker } from "@/components/canvas/PointerTracker";
import { PostEffects } from "@/components/canvas/PostEffects";
import { SceneDepth } from "@/components/canvas/SceneDepth";
import { SneakerModel } from "@/components/canvas/SneakerModel";

export function Scene() {
  return (
    <Suspense fallback={null}>
      <PointerTracker />
      <Lights />
      <group position={[0, 0, -1.2]}>
        <Particles />
        <SceneDepth />
      </group>
      <SceneEnvironment />
      <CursorLight />
      <SneakerModel />
      <HolographicAura />
      <CameraRig />
      <PostEffects />
    </Suspense>
  );
}
