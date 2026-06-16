"use client";

import { motion, useReducedMotion } from "framer-motion";

interface AmbientBackgroundProps {
  variant?: "site" | "admin";
}

export function AmbientBackground({ variant = "site" }: AmbientBackgroundProps) {
  const reduceMotion = useReducedMotion();

  const blobs =
    variant === "admin"
      ? [
          {
            className:
              "left-[10%] top-[15%] h-[420px] w-[420px] bg-emerald-500/15",
            animate: { x: [0, 30, 0], y: [0, -20, 0] },
            duration: 18,
          },
          {
            className:
              "right-[5%] top-[40%] h-[360px] w-[360px] bg-cyan-500/10",
            animate: { x: [0, -25, 0], y: [0, 25, 0] },
            duration: 22,
          },
          {
            className:
              "bottom-[10%] left-[30%] h-[300px] w-[300px] bg-emerald-400/8",
            animate: { x: [0, 20, 0], y: [0, 15, 0] },
            duration: 20,
          },
        ]
      : [
          {
            className:
              "left-[-8%] top-[8%] h-[480px] w-[480px] bg-emerald-500/12",
            animate: { x: [0, 40, 0], y: [0, -30, 0] },
            duration: 20,
          },
          {
            className:
              "right-[-5%] top-[35%] h-[400px] w-[400px] bg-cyan-500/10",
            animate: { x: [0, -35, 0], y: [0, 30, 0] },
            duration: 24,
          },
          {
            className:
              "bottom-[5%] left-[25%] h-[320px] w-[320px] bg-emerald-400/8",
            animate: { x: [0, 25, 0], y: [0, 20, 0] },
            duration: 18,
          },
        ];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(16,185,129,0.08),transparent_70%)]" />
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          animate={reduceMotion ? undefined : blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="noise-overlay absolute inset-0 opacity-[0.025]" />
    </div>
  );
}
