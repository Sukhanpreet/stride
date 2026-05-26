"use client";

import { type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { sceneStore } from "@/lib/sceneStore";

type HeroScrollChoreographyProps = {
  scope: RefObject<HTMLElement | null>;
};

/** Pinned hero scroll — typography + scene progress tied to scrub */
export function HeroScrollChoreography({ scope }: HeroScrollChoreographyProps) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (prefersReduced || isMobile) return;

      const lines = root.querySelectorAll<HTMLElement>("[data-hero-line]");
      const line0 = lines[0];
      const line1 = lines[1];
      const line2 = lines[2];
      const cta = root.querySelector<HTMLElement>("[data-hero-cta]");
      const subline = root.querySelector<HTMLElement>("[data-hero-subline]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=85%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress * 0.1;
            sceneStore.setState({
              progress: p,
              sectionIndex: 0,
              sectionProgress: 0,
              productMode: "hero",
            });
          },
          onLeave: () => {
            sceneStore.setState({ progress: 0.1, productMode: "hero" });
          },
          onEnterBack: () => {
            sceneStore.setState({
              progress: 0,
              sectionIndex: 0,
              sectionProgress: 0,
              productMode: "hero",
            });
          },
        },
      });

      if (line0) {
        tl.fromTo(
          line0,
          { x: -72, opacity: 0.55 },
          { x: 0, opacity: 1, ease: "power2.out", duration: 0.35 },
          0
        );
      }
      if (line1) {
        tl.fromTo(
          line1,
          { scale: 0.88, opacity: 0.35 },
          { scale: 1, opacity: 0.42, ease: "power2.out", duration: 0.35 },
          0.12
        );
      }
      if (line2) {
        tl.fromTo(
          line2,
          { clipPath: "inset(0 100% 0 0)", opacity: 0.4 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            ease: "power3.inOut",
            duration: 0.45,
          },
          0.22
        );
      }

      if (subline) {
        tl.fromTo(
          subline,
          { y: 16, opacity: 0.5 },
          { y: 0, opacity: 1, duration: 0.3 },
          0.5
        );
      }
      if (cta) {
        tl.fromTo(
          cta,
          { y: 20, opacity: 0.6 },
          { y: 0, opacity: 1, duration: 0.3 },
          0.55
        );
      }
      ScrollTrigger.refresh();
    },
    { scope, dependencies: [] }
  );

  return null;
}
