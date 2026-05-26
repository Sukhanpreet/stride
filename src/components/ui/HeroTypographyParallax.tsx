"use client";

import { useEffect, useRef } from "react";
import { sceneStore } from "@/lib/sceneStore";

type HeroTypographyParallaxProps = {
  children: React.ReactNode;
};

/** Subtle copy parallax — embedded in scene, not layered on top */
export function HeroTypographyParallax({ children }: HeroTypographyParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const onPointer = () => {
      const { pointer } = sceneStore.getState();
      const tx = pointer.x * 6;
      const ty = pointer.y * 4;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    };

    const unsub = sceneStore.subscribe(onPointer);
    onPointer();
    return () => {
      unsub();
    };
  }, []);

  return (
    <div ref={ref} className="hero-flow-parallax transition-transform duration-200">
      {children}
    </div>
  );
}
