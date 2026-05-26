export function SectionDivider() {
  return (
    <div
      className="pointer-events-none relative h-px w-full"
      aria-hidden
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
    </div>
  );
}
