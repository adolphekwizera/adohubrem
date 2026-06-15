import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10",
        className
      )}
    >
      {children}
    </div>
  );
}
