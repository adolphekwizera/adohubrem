"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { panelVariants, springSoft } from "@/lib/motion";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <motion.div whileHover={{ scale: 1.05 }} transition={springSoft}>
            <Logo />
          </motion.div>
          <span className="hidden font-bold text-white sm:block">
            {SITE.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-xl px-3.5 py-2 text-sm font-medium transition-colors duration-300",
                  isActive
                    ? "text-emerald-300"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/25 shadow-[0_0_16px_rgba(16,185,129,0.15)]"
                    transition={springSoft}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/contact" size="sm" className="hidden sm:inline-flex">
            Hire Me
          </Button>
          <motion.button
            className="rounded-xl p-2 text-zinc-400 hover:bg-white/5 hover:text-white md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.92 }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={springSoft}
            className="border-t border-white/5 px-4 py-4 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/contact" className="mt-2 w-full">
                Hire Me
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
