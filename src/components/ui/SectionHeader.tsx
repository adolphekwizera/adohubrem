"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, defaultViewport, springSoft } from "@/lib/motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      transition={springSoft}
      className={cn(
        "mb-12",
        align === "center" && "mx-auto max-w-2xl text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ ...springSoft, delay: 0.05 }}
          className="mb-3 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 ring-1 ring-emerald-500/20"
        >
          {eyebrow}
        </motion.p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">
          {description}
        </p>
      )}
    </motion.div>
  );
}
