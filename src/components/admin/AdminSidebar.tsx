"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Mail,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { springSoft } from "@/lib/motion";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Blog Posts", icon: FileText },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function AdminSidebar({
  mobileOpen = false,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/5 glass transition-transform duration-300 ease-out lg:relative lg:z-10 lg:shrink-0 lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="border-b border-white/5 p-5">
        <Link href="/admin" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-xs font-bold text-white shadow-lg shadow-emerald-900/30">
            AK
          </span>
          <div>
            <span className="block font-semibold text-white">Admin Panel</span>
            <span className="text-xs text-zinc-500">Content manager</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-300",
                isActive ? "text-emerald-300" : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="admin-nav-active"
                  className="absolute inset-0 rounded-xl bg-emerald-500/10 shadow-[0_0_16px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/25"
                  transition={springSoft}
                />
              )}
              <item.icon size={18} className="relative" strokeWidth={1.75} />
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/5 p-3">
        {session?.user && (
          <div className="mb-2 rounded-xl bg-white/5 px-3 py-2.5 ring-1 ring-white/5">
            <p className="truncate text-sm font-medium text-zinc-200">
              {session.user.name}
            </p>
            <p className="truncate text-xs text-zinc-500">
              {session.user.email}
            </p>
          </div>
        )}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
        >
          <ExternalLink size={18} strokeWidth={1.75} />
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-950/30"
        >
          <LogOut size={18} strokeWidth={1.75} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
