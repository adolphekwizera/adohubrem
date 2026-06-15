import "./globals.css";

export const metadata = {
  title: "Ado Portfolio",
  description: "Portfolio website with admin dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
