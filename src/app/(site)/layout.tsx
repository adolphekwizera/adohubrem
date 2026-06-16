import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AmbientBackground variant="site" />
      <Header />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  );
}
