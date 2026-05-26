"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useSceneStore } from "@/hooks/useSceneStore";
import {
  getCameraTargets,
  getSneakerMotion,
  isHeroVisible,
} from "@/lib/sceneMotion";
import { sceneStore } from "@/lib/sceneStore";

const targetPos = new THREE.Vector3();
const targetLook = new THREE.Vector3();
const smoothPointer = { x: 0, y: 0 };

export function CameraRig() {
  const { camera } = useThree();
  const sceneState = useSceneStore();
  const isMobile = useIsMobile();
  const smoothPos = useRef(new THREE.Vector3());
  const smoothLook = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const motion = getSneakerMotion(sceneState, isMobile);
    const { position, lookAt } = getCameraTargets(
      motion,
      isMobile,
      sceneState.sectionIndex,
      sceneState.endingProgress
    );
    const t = state.clock.elapsedTime;
    const { pointer } = sceneStore.getState();
    const inHero = isHeroVisible() && sceneState.progress < 0.12;
    const { highlightSegment, interactionPaused } = sceneStore.getState();
    const segmentYOffset =
      highlightSegment === "sole"
        ? -0.12
        : highlightSegment === "upper"
          ? 0.14
          : highlightSegment === "mid"
            ? 0.04
            : 0;

    if (!isMobile) {
      smoothPointer.x = THREE.MathUtils.lerp(smoothPointer.x, pointer.x, 0.06);
      smoothPointer.y = THREE.MathUtils.lerp(smoothPointer.y, pointer.y, 0.06);
    }

    targetPos.copy(position);
    targetLook.copy(lookAt);

    if (inHero && !interactionPaused) {
      targetPos.x += Math.sin(t * 0.12) * 0.02;
      targetPos.y += Math.cos(t * 0.1) * 0.015;
    }

    if (highlightSegment) {
      targetLook.y += segmentYOffset;
      targetPos.z -= 0.12;
    }

    const parallax = interactionPaused ? 0.01 : inHero ? 0.06 : 0.03;
    targetPos.x += smoothPointer.x * parallax;
    targetPos.y += smoothPointer.y * parallax * 0.6;
    targetLook.x += smoothPointer.x * parallax * 0.5;
    targetLook.y += smoothPointer.y * parallax * 0.4;

    smoothPos.current.x = THREE.MathUtils.damp(
      smoothPos.current.x,
      targetPos.x,
      9,
      delta
    );
    smoothPos.current.y = THREE.MathUtils.damp(
      smoothPos.current.y,
      targetPos.y,
      9,
      delta
    );
    smoothPos.current.z = THREE.MathUtils.damp(
      smoothPos.current.z,
      targetPos.z,
      9,
      delta
    );
    smoothLook.current.x = THREE.MathUtils.damp(
      smoothLook.current.x,
      targetLook.x,
      9,
      delta
    );
    smoothLook.current.y = THREE.MathUtils.damp(
      smoothLook.current.y,
      targetLook.y,
      9,
      delta
    );
    smoothLook.current.z = THREE.MathUtils.damp(
      smoothLook.current.z,
      targetLook.z,
      9,
      delta
    );

    camera.position.copy(smoothPos.current);
    camera.lookAt(smoothLook.current);
  });

  return null;
}
