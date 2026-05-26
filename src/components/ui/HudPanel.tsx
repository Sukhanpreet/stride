import { cn } from "@/utils/cn";

type HudPanelProps = React.ComponentProps<"div"> & {
  active?: boolean;
  tier?: "primary" | "secondary";
  /** Connector stem toward product */
  stemSide?: "left" | "right";
};

/** Technical HUD panel — angular cuts, engineering schematic */
export function HudPanel({
  children,
  className,
  active,
  tier = "secondary",
  stemSide = "right",
  ...rest
}: HudPanelProps) {
  return (
    <div
      className={cn(
        "hud-panel relative",
        tier === "primary" && "hud-panel--primary",
        active && "hud-panel--active",
        stemSide === "left" && "hud-panel--stem-left",
        className
      )}
      {...rest}
    >
      <span className="hud-panel__stem" aria-hidden />
      <span className="hud-panel__corner hud-panel__corner--tl" aria-hidden />
      <span className="hud-panel__corner hud-panel__corner--br" aria-hidden />
      <span className="hud-panel__marker" aria-hidden />
      {children}
    </div>
  );
}
