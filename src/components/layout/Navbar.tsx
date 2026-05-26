"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Magnetic } from "@/components/ui/Magnetic";
import { navLinks, siteConfig } from "@/data/site";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import { useSceneStore } from "@/hooks/useSceneStore";
import { cn } from "@/utils/cn";

function ShopArrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="transition-transform duration-300 group-hover:translate-x-0.5"
      aria-hidden
    >
      <path
        d="M2 7h10M8 4l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  const scrolled = useNavbarScroll();
  const [activeHref, setActiveHref] = useState<string>("#hero");
  const { scrollProgress } = useSceneStore();
  const navRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = [
      { id: "hero", href: "#hero" },
      ...navLinks.map((l) => ({ id: l.href.slice(1), href: l.href })),
    ];

    const triggers = sections.map(({ id, href }) =>
      ScrollTrigger.create({
        trigger: document.getElementById(id) ?? undefined,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) setActiveHref(href);
        },
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      gsap.to(nav, {
        paddingTop: scrolled ? 6 : 14,
        paddingBottom: scrolled ? 6 : 14,
        duration: 0.45,
        ease: "power2.out",
        overwrite: true,
      });
    },
    { dependencies: [scrolled] }
  );

  useGSAP(
    () => {
      const border = borderRef.current;
      if (!border) return;
      gsap.to(border, {
        opacity: scrolled ? 0.85 : 0.35,
        duration: 0.5,
      });
    },
    { dependencies: [scrolled] }
  );

  return (
    <header
      data-navbar
      className="fixed top-0 right-0 left-0 z-30 px-4 pt-4 md:px-6"
    >
      <nav
        ref={navRef}
        className={cn(
          "nav-shell relative mx-auto flex max-w-7xl items-center justify-between overflow-hidden rounded-2xl border px-5 py-3 transition-[border-color,background,box-shadow,transform] duration-500 md:px-8 md:py-3.5",
          scrolled
            ? "scale-[0.97] border-white/16 bg-background/75 shadow-[0_16px_64px_rgba(0,0,0,0.65)] backdrop-blur-3xl"
            : "scale-100 border-white/[0.08] bg-background/40 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        )}
      >
        <div
          ref={borderRef}
          className="nav-shell__glow pointer-events-none absolute inset-0 rounded-2xl opacity-40"
          aria-hidden
        />

        <div
          className="nav-scroll-progress absolute right-0 bottom-0 left-0 h-[2px] origin-left bg-accent/80"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden
        />

        <Link
          href="/"
          className="focus-ring font-display relative z-10 rounded-lg text-sm font-bold tracking-[0.25em] text-foreground md:text-base"
        >
          {siteConfig.name}
        </Link>

        <ul className="relative z-10 hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = activeHref === link.href;
            return (
              <li key={link.href}>
                <Magnetic strength={0.18}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group focus-ring text-label relative rounded-lg px-4 py-2.5 transition-all duration-300",
                      active
                        ? "bg-accent/15 text-foreground shadow-[0_0_20px_rgba(129,140,248,0.18)]"
                        : "text-muted-bright hover:bg-white/5 hover:text-foreground"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute bottom-1.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-accent transition-all duration-500 ease-out",
                        active
                          ? "w-[calc(100%-2rem)] opacity-100"
                          : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-80"
                      )}
                    />
                  </Link>
                </Magnetic>
              </li>
            );
          })}
        </ul>

        <Magnetic strength={0.32}>
          <Link
            href="#shop"
            className="nav-shop-btn focus-ring group text-label relative z-10 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-foreground transition-all duration-300 hover:border-accent/55 hover:bg-accent/20"
          >
            Shop
            <ShopArrow />
          </Link>
        </Magnetic>
      </nav>
    </header>
  );
}
