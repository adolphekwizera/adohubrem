import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/services/ServiceCard";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SERVICES } from "@/lib/services-data";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description: `Professional web development, graphic design, and IT services by ${SITE.name}. Get a quote on WhatsApp.`,
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-gradient-to-br from-emerald-500/5 to-transparent py-16 dark:border-zinc-800">
        <Container>
          <SectionHeader
            eyebrow="Services"
            title="Real Services for Real Clients"
            description="From building websites to designing invitations and fixing computers — I offer practical solutions at fair prices."
            align="center"
          />
          <div className="flex justify-center">
            <WhatsAppButton label="Get a Free Quote" size="lg" />
          </div>
        </Container>
      </section>

      {SERVICES.map((group) => (
        <section
          key={group.category}
          className="border-b border-zinc-200 py-16 last:border-0 dark:border-zinc-800"
        >
          <Container>
            <h2 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-white">
              {group.category}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section className="bg-zinc-50 py-16 dark:bg-zinc-900/30">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center dark:bg-emerald-900/10">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Not sure which service you need?
            </h3>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Send me a message on WhatsApp at {SITE.phone} and describe what
              you need. I&apos;ll recommend the best solution and give you a
              quote.
            </p>
            <WhatsAppButton className="mt-6" />
          </div>
        </Container>
      </section>
    </>
  );
}
