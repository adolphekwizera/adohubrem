"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="relative flex min-w-0 flex-1">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="glass sticky top-0 z-30 flex items-center gap-3 border-b border-white/5 px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded-xl p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Portfolio Admin
          </p>
        </div>

        <main className="relative min-w-0 flex-1 overflow-auto">
          <div className="glass hidden border-b border-white/5 px-6 py-3.5 lg:block lg:px-8">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Portfolio Admin
            </p>
          </div>
          <div className="workspace-glow relative p-4 sm:p-6 lg:p-8">
            <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.02]" />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
