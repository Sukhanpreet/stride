import { Z_INDEX } from "@/lib/constants";

/**
 * DOM depth stack — background gradients + midground haze.
 * Foreground: canvas shoe + scroll content (z 10 / 20).
 */
export function DepthLayers() {
  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: Z_INDEX.midground }}
      aria-hidden
    >
      <div className="depth-layer depth-layer--bg" />
      <div className="depth-layer depth-layer--mid" />
      <div className="depth-layer depth-layer--vignette" />
    </div>
  );
}
