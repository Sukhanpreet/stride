export function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 opacity-[0.035] mix-blend-overlay"
      style={{ zIndex: 40 }}
      aria-hidden
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
