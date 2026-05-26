"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils/cn";

type CollectionsHeadlineProps = {
  className?: string;
};

export function CollectionsHeadline({ className }: CollectionsHeadlineProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const lines = root.querySelectorAll<HTMLElement>("[data-collections-line]");
      const beam = root.querySelector<HTMLElement>("[data-collections-beam]");

      gsap.from(lines, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      if (beam) {
        gsap.from(beam, {
          scaleX: 0,
          opacity: 0,
          duration: 0.85,
          delay: 0.12,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: root,
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("collections-headline", className)}>
      <p className="collections-headline__ghost" aria-hidden>
        <span>Style</span>
        <span>Index</span>
      </p>

      <h2 className="collections-headline__stack">
        <span className="collections-headline__line" data-collections-line>
          Style
        </span>
        <span
          className="collections-headline__line collections-headline__line--accent"
          data-collections-line
        >
          Index
        </span>
      </h2>

      <span className="collections-headline__beam" data-collections-beam aria-hidden />
    </div>
  );
}
