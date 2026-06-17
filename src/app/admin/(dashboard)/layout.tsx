import { AdminShell } from "@/components/admin/AdminShell";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen bg-[#0a0f1a]">
      <AmbientBackground variant="admin" />
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
