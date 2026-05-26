"use client";

import { useMemo } from "react";
import { getSceneEffectWeights } from "@/lib/sceneEffects";
import { useSceneStore } from "@/hooks/useSceneStore";

export function useSceneEffects() {
  const sceneState = useSceneStore();
  return useMemo(
    () => getSceneEffectWeights(sceneState),
    [sceneState.progress, sceneState.sectionIndex, sceneState.sectionProgress]
  );
}
