"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

/** Global scroll reveals for shop sections — keeps motion consistent site-wide */
export function PageMotion() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal-item]").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      const ctaBlocks = gsap.utils.toArray<HTMLElement>("[data-cta-block]");
      ctaBlocks.forEach((block) => {
        gsap.from(block.children, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
