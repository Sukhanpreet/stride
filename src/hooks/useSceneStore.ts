"use client";

import { useSyncExternalStore } from "react";
import { sceneStore, type SceneState } from "@/lib/sceneStore";

function subscribe(listener: () => void) {
  return sceneStore.subscribe(listener);
}

function getSnapshot() {
  return sceneStore.getState();
}

export function useSceneStore(): SceneState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useSceneProgress(): number {
  const { progress } = useSceneStore();
  return progress;
}
