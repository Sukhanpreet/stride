"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";
import { TechnicalStructure } from "@/components/canvas/TechnicalStructure";
import { useSceneEffects } from "@/hooks/useSceneEffects";
import { useSceneProgress, useSceneStore } from "@/hooks/useSceneStore";
import { useIsMobile } from "@/hooks/useMediaQuery";
import {
  getPointerMotionOffset,
  getSneakerMotion,
  HERO_MOTION,
} from "@/lib/sceneMotion";
import { sceneStore } from "@/lib/sceneStore";
import { SNEAKER_MODEL_PATH } from "@/lib/sneakerModel";
import {
  attachShoeToneSplit,
  enhanceShoeMaterial,
  getShoeToneUniforms,
} from "@/lib/shoeMaterialTone";

type SneakerGLTF = GLTF & {
  nodes: { Shoe: THREE.Mesh };
  materials: { phong1SG: THREE.MeshStandardMaterial };
};

const TARGET_SIZE = 3.6;
const COLOR_VARIANTS = ["Beach", "Midnight", "Street"] as const;

const POSITION_DAMP = 11;
const ROTATION_DAMP = 10;

const _euler = new THREE.Euler(0, 0, 0, "YXZ");
const _targetQuat = new THREE.Quaternion();

export function SneakerModel() {
  const { nodes, materials } = useGLTF(
    SNEAKER_MODEL_PATH
  ) as unknown as SneakerGLTF;
  const groupRef = useRef<THREE.Group>(null);
  const fitRef = useRef<THREE.Group>(null);
  const progress = useSceneProgress();
  const sceneState = useSceneStore();
  const isMobile = useIsMobile();
  const activeVariant = useRef<string>(COLOR_VARIANTS[0]);
  const {
    emissivePulse,
    pointerBoost,
    solidOpacity,
    xray,
    foamCompress,
    layerReveal,
  } = useSceneEffects();
  const baseScale = useRef(1);
  const toneBounds = useRef({ minY: -0.5, maxY: 0.5 });
  const introLift = useRef(1);
  const initialized = useRef(false);
  const smoothPointer = useRef({ x: 0, y: 0 });

  const geometry = nodes.Shoe.geometry;

  const meshProps = useMemo(() => {
    const { position, rotation, scale } = nodes.Shoe;
    return {
      position: [position.x, position.y, position.z] as [
        number,
        number,
        number,
      ],
      rotation: [rotation.x, rotation.y, rotation.z] as [
        number,
        number,
        number,
      ],
      scale: scale.x,
    };
  }, [nodes.Shoe]);

  useLayoutEffect(() => {
    enhanceShoeMaterial(materials.phong1SG);
    materials.phong1SG.needsUpdate = true;

    if (!fitRef.current || !groupRef.current) return;

    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    if (!box) return;

    toneBounds.current = { minY: box.min.y, maxY: box.max.y };
    attachShoeToneSplit(materials.phong1SG, toneBounds.current);

    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = TARGET_SIZE / maxDim;
    baseScale.current = scale;

    fitRef.current.scale.setScalar(scale);
    fitRef.current.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const heroX = HERO_MOTION.x * (mobile ? 0.55 : 1);
    groupRef.current.position.set(heroX, HERO_MOTION.y - 0.35, 0);
    _euler.set(
      HERO_MOTION.rotationX,
      HERO_MOTION.rotationY,
      HERO_MOTION.rotationZ,
      "YXZ"
    );
    groupRef.current.quaternion.setFromEuler(_euler);
    groupRef.current.scale.setScalar(scale);
    initialized.current = true;
  }, [nodes, materials, geometry]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group || !initialized.current) return;

    const motion = getSneakerMotion(sceneState, isMobile);
    const inHero = progress < 0.12;
    const { pointer, interactionPaused, highlightSegment } =
      sceneStore.getState();
    const pointerStrength =
      interactionPaused || inHero ? (inHero ? 0.28 : 0.12) : pointerBoost;

    smoothPointer.current.x = THREE.MathUtils.lerp(
      smoothPointer.current.x,
      pointer.x,
      0.06
    );
    smoothPointer.current.y = THREE.MathUtils.lerp(
      smoothPointer.current.y,
      pointer.y,
      0.06
    );
    const pointerOffset = getPointerMotionOffset(
      smoothPointer.current,
      isMobile,
      pointerBoost
    );

    const idleY =
      inHero && !interactionPaused
        ? Math.sin(state.clock.elapsedTime * 0.35) * 0.006
        : 0;

    if (introLift.current > 0) {
      introLift.current = Math.max(0, introLift.current - delta * 0.85);
    }
    const introYOffset = introLift.current * 0.35;

    const targetX = motion.x + pointerOffset.x * pointerStrength;
    const squash = 1 - foamCompress * 0.04;
    const groundSettle = foamCompress * 0.07;
    const targetY =
      motion.y +
      idleY -
      introYOffset +
      pointerOffset.y * pointerStrength -
      groundSettle;

    if (fitRef.current) {
      const sy = baseScale.current * squash;
      fitRef.current.scale.set(baseScale.current, sy, baseScale.current);
    }

    group.position.x = THREE.MathUtils.damp(
      group.position.x,
      targetX,
      POSITION_DAMP,
      delta
    );
    group.position.y = THREE.MathUtils.damp(
      group.position.y,
      targetY,
      POSITION_DAMP,
      delta
    );
    group.position.z = THREE.MathUtils.damp(
      group.position.z,
      motion.z,
      POSITION_DAMP,
      delta
    );

    _euler.set(motion.rotationX, motion.rotationY, motion.rotationZ, "YXZ");
    _targetQuat.setFromEuler(_euler);
    const rotBlend = 1 - Math.exp(-ROTATION_DAMP * delta);
    group.quaternion.slerp(_targetQuat, rotBlend);

    group.scale.setScalar(baseScale.current);

    const variantIndex =
      progress < 0.12
        ? sceneState.variantPreview
        : Math.min(sceneState.sectionIndex, COLOR_VARIANTS.length - 1);
    const variantName = COLOR_VARIANTS[variantIndex];
    const variantMaterials = nodes.Shoe.userData.variantMaterials as
      | Record<string, THREE.MeshStandardMaterial>
      | undefined;

    if (
      variantMaterials?.[variantName] &&
      activeVariant.current !== variantName
    ) {
      nodes.Shoe.material = variantMaterials[variantName];
      enhanceShoeMaterial(variantMaterials[variantName]);
      attachShoeToneSplit(variantMaterials[variantName], toneBounds.current);
      activeVariant.current = variantName;
    }

    const mat = materials.phong1SG;
    const tone = getShoeToneUniforms(mat);
    if (tone) {
      const section = sceneState.sectionIndex;
      const inStory = progress >= 0.1;
      const soleTarget =
        !inStory || section === 1 ? 0.76 : section === 0 || section === 2 ? 0.7 : 0.74;
      const upperTarget = section === 1 ? 1.1 : 1.05;
      tone.uSoleMul.value = THREE.MathUtils.lerp(tone.uSoleMul.value, soleTarget, 0.08);
      tone.uUpperMul.value = THREE.MathUtils.lerp(
        tone.uUpperMul.value,
        upperTarget,
        0.08
      );
      tone.uUpperContrast.value = THREE.MathUtils.lerp(
        tone.uUpperContrast.value,
        section === 1 ? 1.18 : 1.1,
        0.08
      );
    }
    const highlightBoost =
      (highlightSegment ? 0.14 : 0) + layerReveal * 0.1;
    mat.emissive.set(highlightSegment ? "#4f46e5" : "#000000");
    mat.emissiveIntensity = THREE.MathUtils.lerp(
      mat.emissiveIntensity,
      highlightBoost + emissivePulse * 0.06,
      0.1
    );
    mat.transparent = solidOpacity < 0.98 || xray > 0.1;
    mat.opacity = THREE.MathUtils.lerp(
      mat.opacity,
      solidOpacity * (1 - xray * 0.15),
      0.1
    );
    mat.depthWrite = mat.opacity > 0.9;
  });

  return (
    <group ref={groupRef}>
      <group ref={fitRef}>
        <group
          position={meshProps.position}
          rotation={meshProps.rotation}
          scale={meshProps.scale}
        >
          <mesh castShadow receiveShadow geometry={geometry} material={materials.phong1SG} />
          <TechnicalStructure
            geometry={geometry}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(SNEAKER_MODEL_PATH);
