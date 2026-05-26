export function GlobalBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <div className="absolute inset-0 bg-background" />
      <div
        data-hero-bg
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 110%, #0a0a14 0%, transparent 55%),
            radial-gradient(ellipse 90% 60% at 50% -20%, rgba(45, 48, 72, 0.14), transparent 50%),
            radial-gradient(ellipse 55% 50% at 78% 45%, rgba(0, 0, 0, 0.65), transparent 68%),
            radial-gradient(ellipse 45% 35% at 10% 75%, rgba(35, 40, 62, 0.1), transparent)
          `,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,8,0.2) 0%, rgba(0,0,0,0.72) 100%)",
        }}
      />
    </div>
  );
}
