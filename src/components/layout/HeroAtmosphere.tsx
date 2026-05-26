"use client";

/**
 * Hero atmosphere — dark product stage; glow supports, never competes.
 */
export function HeroAtmosphere() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Dark stage behind shoe (right) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 42% 55% at 68% 48%, rgba(0, 0, 0, 0.75) 0%, transparent 72%),
            radial-gradient(ellipse 100% 80% at 50% 100%, rgba(5, 5, 8, 0.95), transparent 55%)
          `,
        }}
      />

      {/* Subtle rim — not a bloom blob */}
      <div
        data-hero-product-glow
        className="absolute top-[32%] right-[10%] h-[min(45vh,400px)] w-[min(38vw,380px)] opacity-30 blur-[60px] md:right-[14%]"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 68%)",
        }}
      />

      {/* Ground grid — low contrast */}
      <div
        className="absolute right-0 bottom-0 left-0 h-[32vh] opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 50%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 50%, black 90%, transparent 100%)",
          transform: "perspective(500px) rotateX(64deg)",
          transformOrigin: "center bottom",
        }}
      />
    </div>
  );
}
