import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Logo } from "@/components/Logo";
import { NAV_LINKS, SITE, getWhatsAppLink } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/5 glass">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Logo />
              <span className="font-semibold text-white">{SITE.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              {SITE.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors duration-300 hover:text-emerald-400 glow-hover"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-emerald-400" />
                <a href={`tel:${SITE.phone}`} className="hover:text-white">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-emerald-400" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
            <SocialLinks className="mt-5" />
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center text-sm text-zinc-500">
          © {year} {SITE.name}. Built with Next.js & deployed on Vercel.
        </div>
      </Container>
    </footer>
  );
}
