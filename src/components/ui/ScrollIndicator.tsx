import { cn } from "@/utils/cn";

type ScrollIndicatorProps = {
  className?: string;
  label?: string;
};

export function ScrollIndicator({
  className,
  label = "Scroll",
}: ScrollIndicatorProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-start gap-3 text-muted",
        className
      )}
      aria-hidden
    >
      <span className="text-label">{label}</span>
      <div className="relative h-14 w-px overflow-hidden bg-white/10">
        <div className="absolute top-0 left-0 h-5 w-full animate-scroll-line bg-gradient-to-b from-transparent via-foreground/70 to-transparent" />
      </div>
    </div>
  );
}
