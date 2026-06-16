"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { springSoft } from "@/lib/motion";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  glow?: boolean;
  hover?: boolean;
}

export function GlassPanel({
  className,
  glow = false,
  hover = false,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <motion.div
      initial={false}
      whileHover={
        hover ? { y: -3, scale: 1.005, transition: springSoft } : undefined
      }
      className={cn(
        "glass-panel rounded-2xl",
        glow && "workspace-glow",
        hover && "gradient-border-hover cursor-default",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
