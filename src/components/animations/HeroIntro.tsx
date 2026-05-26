"use client";

import { type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type HeroIntroProps = {
  scope: RefObject<HTMLElement | null>;
};

export function HeroIntro({ scope }: HeroIntroProps) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const navbar = document.querySelector<HTMLElement>("[data-navbar]");
      const heroBg = document.querySelector<HTMLElement>("[data-hero-bg]");
      const lines = root.querySelectorAll<HTMLElement>("[data-hero-line]");
      const chars = root.querySelectorAll<HTMLElement>("[data-split-char]");
      const price = root.querySelector<HTMLElement>("[data-hero-price]");
      const subline = root.querySelector<HTMLElement>("[data-hero-subline]");
      const ctaPrimary = root.querySelectorAll<HTMLElement>(
        "[data-hero-cta] > *"
      );
      const ctaAlt = root.querySelectorAll<HTMLElement>("[data-hero-cta-alt] > *");
      const scroll = root.querySelector<HTMLElement>("[data-hero-scroll]");
      const hint = document.querySelector<HTMLElement>(".hero-rotate-hint");

      if (prefersReduced) {
        gsap.set(
          [navbar, heroBg, chars, price, subline, ...ctaPrimary, ...ctaAlt, scroll, hint].filter(
            Boolean
          ),
          { opacity: 1, y: 0, clearProps: "transform" }
        );
        return;
      }

      if (heroBg) gsap.set(heroBg, { opacity: 0 });
      if (navbar) gsap.set(navbar, { y: -24, opacity: 0 });
      gsap.set(chars, { yPercent: 110, opacity: 0 });
      if (price) gsap.set(price, { opacity: 0, y: 16 });
      if (subline) gsap.set(subline, { y: 24, opacity: 0 });
      gsap.set(ctaPrimary, { y: 24, opacity: 0 });
      gsap.set(ctaAlt, { y: 16, opacity: 0 });
      if (scroll) gsap.set(scroll, { opacity: 0, y: 12 });
      if (hint) gsap.set(hint, { opacity: 0, scale: 0.92 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (heroBg) tl.to(heroBg, { opacity: 1, duration: 1.2 });
      if (navbar) tl.to(navbar, { y: 0, opacity: 1, duration: 0.8 }, "-=0.85");
      if (hint) tl.to(hint, { opacity: 1, scale: 1, duration: 0.7 }, "-=0.6");

      lines.forEach((line, index) => {
        const lineChars = line.querySelectorAll<HTMLElement>("[data-split-char]");
        tl.to(
          lineChars,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.025,
            ease: "power4.out",
          },
          index === 0 ? "-=0.5" : "-=0.55"
        );
      });

      if (subline) tl.to(subline, { y: 0, opacity: 1, duration: 0.85 }, "-=0.42");
      tl.to(ctaPrimary, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, "-=0.5");
      tl.to(ctaAlt, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 }, "-=0.45");
      if (price) tl.to(price, { y: 0, opacity: 1, duration: 0.65 }, "-=0.4");
      if (scroll) tl.to(scroll, { opacity: 1, y: 0, duration: 0.55 }, "-=0.35");
    },
    { scope, dependencies: [] }
  );

  return null;
}
