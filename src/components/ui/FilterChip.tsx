"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springSoft } from "@/lib/motion";

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function FilterChip({ active, onClick, children }: FilterChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      transition={springSoft}
      className={cn(
        "relative rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
        active
          ? "text-emerald-300"
          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
      )}
    >
      {active && (
        <motion.span
          layoutId="filter-chip-bg"
          className="absolute inset-0 rounded-xl bg-emerald-500/15 shadow-[0_0_16px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/25"
          transition={springSoft}
        />
      )}
      <span className="relative">{children}</span>
    </motion.button>
  );
}
