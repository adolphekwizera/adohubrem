import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen bg-[#0a0f1a]">
      <AmbientBackground variant="admin" />
      <AdminSidebar />
      <main className="relative flex-1 overflow-auto">
        <div className="glass border-b border-white/5 px-6 py-3.5 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Portfolio Admin
          </p>
        </div>
        <div className="workspace-glow relative p-6 lg:p-8">
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.02]" />
          {children}
        </div>
      </main>
    </div>
  );
}
