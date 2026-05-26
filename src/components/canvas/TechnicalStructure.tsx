"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useSceneEffects } from "@/hooks/useSceneEffects";
import { useSceneStore } from "@/hooks/useSceneStore";

type TechnicalStructureProps = {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

export function TechnicalStructure({
  geometry,
  position,
  rotation,
  scale,
}: TechnicalStructureProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scanRef = useRef<THREE.Mesh>(null);
  const edgesMatRef = useRef<THREE.LineBasicMaterial>(null);
  const wireMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const scanMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const bounds = useRef({ minY: -0.5, maxY: 0.5 });
  const scanT = useRef(0);
  const traceT = useRef(0);

  const edgesGeometry = useMemo(
    () => new THREE.EdgesGeometry(geometry, 20),
    [geometry]
  );

  useLayoutEffect(() => {
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    if (box) {
      bounds.current = { minY: box.min.y, maxY: box.max.y };
    }
  }, [geometry]);

  const { technicalLines, scanPass, wireframe, tracePass } = useSceneEffects();
  const { highlightSegment, sectionIndex, sectionProgress } = useSceneStore();
  const inMaterials = sectionIndex === 1;

  useFrame((state, delta) => {
    const lines = technicalLines;
    const wire = wireframe;
    const scan = scanPass;
    const trace = tracePass;

    traceT.current += delta * 0.25 * Math.max(trace, scan * 0.5);
    const traceWave =
      trace > 0.02 ? 0.35 + Math.sin(traceT.current * 3) * 0.25 * trace : 0;

    const isolateBoost = highlightSegment ? 0.35 : 0;
    const reveal =
      inMaterials ? THREE.MathUtils.smoothstep(0.08, 0.55, sectionProgress) : 0;
    const breathe =
      inMaterials && wire > 0.1
        ? 0.06 * Math.sin(state.clock.elapsedTime * 1.2)
        : 0;

    if (edgesMatRef.current) {
      const target = Math.max(
        lines * 0.7,
        traceWave,
        wire * 0.25,
        isolateBoost
      );
      edgesMatRef.current.opacity = THREE.MathUtils.lerp(
        edgesMatRef.current.opacity,
        target,
        0.12
      );
    }
    if (wireMatRef.current) {
      wireMatRef.current.opacity = THREE.MathUtils.lerp(
        wireMatRef.current.opacity,
        wire * 0.32 * reveal + breathe,
        0.1
      );
    }
    if (scanMatRef.current) {
      scanMatRef.current.opacity = THREE.MathUtils.lerp(
        scanMatRef.current.opacity,
        scan * 0.5,
        0.12
      );
    }

    if (scan > 0.03 && scanRef.current) {
      scanT.current = (scanT.current + delta * 0.28 * scan) % 1;
      const { minY, maxY } = bounds.current;
      scanRef.current.position.y = THREE.MathUtils.lerp(minY, maxY, scanT.current);
      scanRef.current.visible = true;
    } else if (scanRef.current) {
      scanRef.current.visible = false;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <lineSegments geometry={edgesGeometry} renderOrder={2}>
        <lineBasicMaterial
          ref={edgesMatRef}
          color="#7c8db5"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </lineSegments>

      <mesh geometry={geometry} scale={1.002} renderOrder={1}>
        <meshBasicMaterial
          ref={wireMatRef}
          color="#5c6b8a"
          wireframe
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={scanRef} visible={false} renderOrder={3}>
        <planeGeometry args={[2.8, 0.012]} />
        <meshBasicMaterial
          ref={scanMatRef}
          color="#94a3b8"
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
