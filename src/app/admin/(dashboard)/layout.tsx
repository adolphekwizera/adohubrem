import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-900">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="border-b border-zinc-800 bg-zinc-950/50 px-6 py-4 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Portfolio Admin
          </p>
        </div>
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
