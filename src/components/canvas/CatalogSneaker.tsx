"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";
import { getCatalogPose } from "@/lib/catalogShoePose";
import { SNEAKER_MODEL_PATH } from "@/lib/sneakerModel";
import {
  applyShoeVariant,
  type CatalogShoeNodes,
} from "@/lib/shoeVariants";

type CatalogSneakerProps = {
  productId: string;
  variantIndex: number;
  active?: boolean;
};

type SneakerGLTF = GLTF & {
  nodes: CatalogShoeNodes;
  materials: { phong1SG: THREE.MeshStandardMaterial };
};

export function CatalogSneaker({
  productId,
  variantIndex,
  active = false,
}: CatalogSneakerProps) {
  const { nodes, materials } = useGLTF(
    SNEAKER_MODEL_PATH
  ) as unknown as SneakerGLTF;
  const groupRef = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const pose = getCatalogPose(productId);

  const geometry = nodes.Shoe.geometry;
  const meshProps = nodes.Shoe;

  useLayoutEffect(() => {
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    if (!box) return;

    applyShoeVariant(nodes, materials.phong1SG, variantIndex, {
      minY: box.min.y,
      maxY: box.max.y,
    });
  }, [nodes, materials, geometry, variantIndex]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const targetSpin = active ? 0.35 : 0.08;
    spin.current = THREE.MathUtils.lerp(spin.current, targetSpin, 0.08);
    group.rotation.y =
      pose.rotationY + Math.sin(state.clock.elapsedTime * spin.current) * 0.05;

    const baseY = pose.y;
    group.position.y = active
      ? baseY + Math.sin(state.clock.elapsedTime * 1.2) * 0.015
      : baseY;
  });

  return (
    <group
      ref={groupRef}
      position={[0, pose.y, 0]}
      rotation={[pose.rotationX, pose.rotationY, pose.rotationZ]}
    >
      <group
        position={[meshProps.position.x, meshProps.position.y, meshProps.position.z]}
        rotation={[meshProps.rotation.x, meshProps.rotation.y, meshProps.rotation.z]}
        scale={meshProps.scale.x}
      >
        <mesh castShadow receiveShadow geometry={geometry} material={materials.phong1SG} />
      </group>
    </group>
  );
}

useGLTF.preload(SNEAKER_MODEL_PATH);
