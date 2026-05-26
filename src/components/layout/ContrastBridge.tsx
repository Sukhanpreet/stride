export function ContrastBridge() {
  return (
    <div
      className="contrast-bridge pointer-events-none relative z-20 -mt-px"
      aria-hidden
    >
      <div className="contrast-bridge__fade absolute inset-x-0 top-0 h-48 md:h-64 lg:h-80" />
      <svg
        className="contrast-bridge__curve relative block w-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 100 L0 40 Q360 72 720 28 T1440 36 L1440 100 Z"
          fill="url(#bridge-gradient-dark)"
        />
        <defs>
          <linearGradient id="bridge-gradient-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050508" stopOpacity="0" />
            <stop offset="35%" stopColor="#08080f" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#0a0a12" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#0c0c14" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
