"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springSoft } from "@/lib/motion";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  id,
  className,
}: ToggleProps) {
  const toggleId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      htmlFor={toggleId}
      className={cn(
        "inline-flex cursor-pointer items-center gap-3 select-none",
        className
      )}
    >
      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
          checked
            ? "bg-emerald-500/80 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
            : "bg-zinc-700/60"
        )}
      >
        <motion.span
          animate={{ x: checked ? 20 : 2 }}
          transition={springSoft}
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md"
        />
      </button>
      {label && <span className="text-sm text-zinc-300">{label}</span>}
    </label>
  );
}
