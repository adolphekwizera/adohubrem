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
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" &&
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
        variant === "cyan" &&
          "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
        variant === "outline" &&
          "border border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-400",
        className
      )}
    >
      {children}
    </span>
  );
}
