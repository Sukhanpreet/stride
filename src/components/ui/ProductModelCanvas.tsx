"use client";

import { Bounds, ContactShadows, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { CatalogSneaker } from "@/components/canvas/CatalogSneaker";
import { cn } from "@/utils/cn";

type ProductModelCanvasProps = {
  productId: string;
  variantIndex: number;
  accent: string;
  active?: boolean;
  featured?: boolean;
};

function CatalogScene({
  productId,
  variantIndex,
  active,
}: {
  productId: string;
  variantIndex: number;
  active?: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.28} color="#1a1a24" />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.5}
        color="#f8fafc"
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[-3, 2, 2]} intensity={0.4} color="#a5b4fc" />
      <directionalLight position={[0.5, 5, -1]} intensity={0.65} color="#f1f5f9" />
      <Bounds fit clip observe margin={1.12}>
        <CatalogSneaker
          productId={productId}
          variantIndex={variantIndex}
          active={active}
        />
      </Bounds>
      <ContactShadows
        position={[0, -0.72, 0]}
        opacity={0.82}
        scale={8}
        blur={2}
        far={2.2}
        color="#000000"
        resolution={256}
      />
      <Environment preset="warehouse" environmentIntensity={0.5} background={false} />
    </>
  );
}

export function ProductModelCanvas({
  productId,
  variantIndex,
  accent,
  active = false,
  featured = false,
}: ProductModelCanvasProps) {
  return (
    <div
      className={cn(
        "product-visual-canvas relative flex items-center justify-center overflow-hidden",
        featured ? "h-[min(42vw,280px)] min-h-[240px] md:h-[300px]" : "h-[min(38vw,220px)] min-h-[200px] md:h-[240px]"
      )}
      style={{
        background: `radial-gradient(ellipse 85% 70% at 50% 58%, ${accent}20, transparent 72%), linear-gradient(180deg, rgba(14,16,26,0.5) 0%, rgba(4,4,8,0.75) 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 88%, ${accent}28, transparent 50%)`,
        }}
        aria-hidden
      />
      <Canvas
        className="relative z-[1] h-full w-full min-h-[inherit]"
        shadows
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.12, 2.35], fov: 22, near: 0.1, far: 20 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <CatalogScene
            productId={productId}
            variantIndex={variantIndex}
            active={active}
          />
        </Suspense>
      </Canvas>
      <div
        className="product-visual-canvas__floor pointer-events-none absolute bottom-[6%] left-1/2 h-10 w-[78%] -translate-x-1/2 rounded-[100%] blur-xl"
        style={{ background: `radial-gradient(ellipse, ${accent}45, transparent 68%)` }}
        aria-hidden
      />
    </div>
  );
}
