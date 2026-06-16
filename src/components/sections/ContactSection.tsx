"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SITE } from "@/lib/constants";
import { fadeUp, defaultViewport, springSoft } from "@/lib/motion";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/5 py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-emerald-700/10 to-cyan-600/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(16,185,129,0.15),transparent_70%)]" />

      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          transition={springSoft}
          className="grid gap-10 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <SectionHeader
              eyebrow="Contact"
              title="Let's Work Together"
              description="Have a project in mind? I respond fast on WhatsApp and email."
              className="[&_h2]:text-white [&_p]:text-emerald-100/80 [&_span]:text-emerald-300"
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <WhatsAppButton
                label="Message on WhatsApp"
                className="bg-white text-emerald-700 hover:bg-emerald-50"
              />
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:shadow-[0_0_24px_rgba(255,255,255,0.08)]"
                >
                  Send a Message
                </motion.span>
              </Link>
            </div>
            <SocialLinks className="mt-8" variant="light" />
          </div>

          <GlassPanel glow className="p-6 sm:p-8">
            <h3 className="mb-6 text-lg font-semibold text-white">
              Direct Contact
            </h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3 text-emerald-50/90">
                <Phone size={18} className="mt-0.5 shrink-0 text-emerald-300" />
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <a href={`tel:${SITE.phone}`} className="hover:text-white">
                    {SITE.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-emerald-50/90">
                <Mail size={18} className="mt-0.5 shrink-0 text-emerald-300" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a href={`mailto:${SITE.email}`} className="hover:text-white">
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-emerald-50/90">
                <MapPin size={18} className="mt-0.5 shrink-0 text-emerald-300" />
                <div>
                  <p className="font-medium text-white">Location</p>
                  <p>Rwanda</p>
                </div>
              </li>
            </ul>
          </GlassPanel>
        </motion.div>
      </Container>
    </section>
  );
}
