import Link from "next/link";
import { Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-8xl font-bold text-emerald-600/20">404</p>
      <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-white">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-zinc-600 dark:text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button href="/" className="mt-8">
        <Home size={18} />
        Back to Home
      </Button>
      <p className="mt-6 text-sm text-zinc-500">
        Or try{" "}
        <Link href="/blog" className="text-emerald-600 hover:underline">
          Blog
        </Link>
        ,{" "}
        <Link href="/projects" className="text-emerald-600 hover:underline">
          Projects
        </Link>
        , or{" "}
        <Link href="/contact" className="text-emerald-600 hover:underline">
          Contact
        </Link>
      </p>
    </Container>
  );
}
