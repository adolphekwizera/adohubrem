import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { NAV_LINKS, SITE, getWhatsAppLink } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">
                AK
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {SITE.name}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {SITE.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-emerald-600" />
                <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-emerald-600" />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
            <SocialLinks className="mt-4" />
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          © {year} {SITE.name}. Built with Next.js & deployed on Vercel.
        </div>
      </Container>
    </footer>
  );
}
