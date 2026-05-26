"use client";

import dynamic from "next/dynamic";
import { Z_INDEX } from "@/lib/constants";

const WebGLCanvas = dynamic(
  () =>
    import("@/components/canvas/WebGLCanvas").then((mod) => mod.WebGLCanvas),
  {
    ssr: false,
    loading: () => null,
  }
);

/**
 * Fixed full-viewport WebGL layer.
 * Content scrolls above; the sneaker scene persists here across sections (Phase 2+).
 */
export function CanvasRoot() {
  return (
    <div
      className="pointer-events-none fixed inset-0 h-screen w-screen"
      style={{ zIndex: Z_INDEX.canvas }}
      aria-hidden
    >
      <WebGLCanvas />
    </div>
  );
}
