"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SITE } from "@/lib/constants";

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-zinc-200 bg-gradient-to-br from-emerald-600 to-emerald-700 py-20 dark:border-zinc-800">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-10 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <SectionHeader
              eyebrow="Contact"
              title="Let's Work Together"
              description="Have a project in mind? I respond fast on WhatsApp and email."
              className="[&_h2]:text-white [&_p]:text-emerald-100 [&_span]:text-emerald-200"
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <WhatsAppButton
                label="Message on WhatsApp"
                className="bg-white text-emerald-700 hover:bg-emerald-50"
              />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
              >
                Send a Message
              </Link>
            </div>
            <SocialLinks className="mt-8" variant="light" />
          </div>

          <Card className="border-white/10 bg-white/10 backdrop-blur-sm dark:bg-white/5">
            <h3 className="mb-6 text-lg font-semibold text-white">
              Direct Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-emerald-50">
                <Phone size={18} className="mt-0.5 shrink-0 text-emerald-200" />
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <a href={`tel:${SITE.phone}`} className="hover:text-white">
                    {SITE.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-emerald-50">
                <Mail size={18} className="mt-0.5 shrink-0 text-emerald-200" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a href={`mailto:${SITE.email}`} className="hover:text-white">
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-emerald-50">
                <MapPin size={18} className="mt-0.5 shrink-0 text-emerald-200" />
                <div>
                  <p className="font-medium text-white">Location</p>
                  <p>Rwanda</p>
                </div>
              </li>
            </ul>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
