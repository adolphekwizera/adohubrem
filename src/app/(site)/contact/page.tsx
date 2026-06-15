import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.name} for web development, design, or IT services.`,
};

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        eyebrow="Contact"
        title="Let's Work Together"
        description="Have a project in mind? Send me a message or reach out directly on WhatsApp."
        align="center"
      />

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <h3 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white">
              Send a Message
            </h3>
            <ContactForm />
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Direct Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
                <Phone size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">Phone</p>
                  <a href={`tel:${SITE.phone}`} className="hover:text-emerald-600">
                    {SITE.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
                <Mail size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">Email</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="hover:text-emerald-600"
                  >
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
                <MapPin size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">
                    Location
                  </p>
                  <p>Rwanda</p>
                </div>
              </li>
            </ul>
            <WhatsAppButton className="mt-6 w-full" size="lg" />
          </Card>

          <Card>
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Social Media
            </h3>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-600 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  );
}
