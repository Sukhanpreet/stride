import { CONTAINER_WIDTH, type ContainerSize } from "@/lib/constants";
import { cn } from "@/utils/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  size?: ContainerSize;
  id?: string;
};

export function Container({
  children,
  className,
  as: Tag = "div",
  size = "default",
  id,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        CONTAINER_WIDTH[size],
        className
      )}
    >
      {children}
    </Tag>
  );
}
