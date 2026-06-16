import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "cyan" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm",
        variant === "default" &&
          "bg-white/10 text-zinc-200 ring-1 ring-white/10",
        variant === "cyan" &&
          "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/20",
        variant === "outline" &&
          "border border-white/10 text-zinc-400 bg-white/5",
        className
      )}
    >
      {children}
    </span>
  );
}
