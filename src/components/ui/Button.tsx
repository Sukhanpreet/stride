"use client";

import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  href?: string;
  magnetic?: boolean;
  showArrow?: boolean;
} & Omit<React.ComponentPropsWithoutRef<"button">, "children">;

const variants: Record<ButtonVariant, string> = {
  primary:
    "group bg-foreground text-background hover:bg-foreground/92 border-transparent shadow-[0_0_30px_rgba(244,244,245,0.12)] hover:shadow-[0_0_40px_rgba(129,140,248,0.25)]",
  secondary:
    "bg-white/5 text-foreground border-white/15 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_24px_rgba(255,255,255,0.06)]",
  ghost:
    "bg-transparent text-muted border-transparent hover:text-foreground",
};

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="transition-transform duration-300 group-hover:translate-x-1"
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

export function Button({
  variant = "primary",
  className,
  children,
  href,
  magnetic = true,
  showArrow = false,
  ...props
}: ButtonProps) {
  const classes = cn(
    "btn-press focus-ring inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border px-6 py-3 text-label transition-all duration-300",
    variants[variant],
    className
  );

  const inner = href ? (
    <Link href={href} className={classes}>
      {children}
      {showArrow ? <ArrowIcon /> : null}
    </Link>
  ) : (
    <button className={classes} type="button" {...props}>
      {children}
      {showArrow ? <ArrowIcon /> : null}
    </button>
  );

  if (!magnetic) return inner;

  return <Magnetic strength={0.3}>{inner}</Magnetic>;
}
