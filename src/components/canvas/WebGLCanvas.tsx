"use client";

import { Canvas } from "@react-three/fiber";
import { Scene } from "@/components/canvas/Scene";

export function WebGLCanvas() {
  return (
    <Canvas
      className="h-full w-full"
      shadows
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0.35, 2.5], fov: 32, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
