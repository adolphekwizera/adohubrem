"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springSoft } from "@/lib/motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({
  children,
  className,
  hover = false,
  glass = true,
}: CardProps) {
  return (
    <motion.div
      initial={false}
      whileHover={
        hover
          ? { y: -5, scale: 1.015, transition: springSoft }
          : undefined
      }
      className={cn(
        "rounded-2xl p-6",
        glass
          ? "glass-panel"
          : "border border-white/6 bg-zinc-900/50 shadow-lg shadow-black/20",
        hover && "gradient-border-hover cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
