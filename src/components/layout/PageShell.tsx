import { Navbar } from "@/components/layout/Navbar";
import { Z_INDEX } from "@/lib/constants";
import { cn } from "@/utils/cn";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div
      className="relative min-h-screen"
      style={{ zIndex: Z_INDEX.content }}
    >
      <Navbar />
      <main className={cn("relative", className)}>{children}</main>
    </div>
  );
}
