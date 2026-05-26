import { cn } from "@/utils/cn";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center",
        className
      )}
      data-section-header
    >
      <p className="text-eyebrow mb-3" data-reveal-item>
        {eyebrow}
      </p>
      <h2 className="text-display-md" data-reveal-item>
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-body-lg mt-4 max-w-sm",
            align === "center" && "mx-auto"
          )}
          data-reveal-item
        >
          {description}
        </p>
      )}
    </div>
  );
}
