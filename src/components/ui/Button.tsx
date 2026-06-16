"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { pressFeedback } from "@/lib/motion";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:from-emerald-400 hover:to-cyan-400",
  secondary: "glass text-white hover:bg-white/10 shadow-md",
  outline:
    "border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  ghost: "text-zinc-300 hover:bg-white/5 hover:text-white",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/20",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-sm rounded-xl",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3 text-base rounded-2xl",
};

const motionProps = (disabled?: boolean) => ({
  whileHover: disabled ? undefined : { scale: 1.02, y: -1 },
  whileTap: disabled ? undefined : pressFeedback.whileTap,
  transition: pressFeedback.transition,
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 disabled:opacity-50 disabled:pointer-events-none glow-hover",
      variants[variant],
      sizes[size],
      className
    );

    if (href) {
      if (external) {
        return (
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            {...motionProps()}
          >
            {children}
          </motion.a>
        );
      }
      return (
        <motion.div className="inline-flex" {...motionProps()}>
          <Link href={href} className={classes}>
            {children}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.div className="inline-flex" {...motionProps(disabled)}>
        <button ref={ref} className={classes} disabled={disabled} {...props}>
          {children}
        </button>
      </motion.div>
    );
  }
);

Button.displayName = "Button";
