"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { IMAGES, SITE } from "@/lib/constants";
import { slideInLeft, slideInRight, defaultViewport, springSoft } from "@/lib/motion";

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            transition={springSoft}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-4 rounded-3xl bg-emerald-500/15 blur-2xl" />
            <GlassPanel className="relative aspect-square max-w-lg overflow-hidden p-0">
              <img
                src={IMAGES.about}
                alt={`About ${SITE.name}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </GlassPanel>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            transition={springSoft}
            className="order-1 lg:order-2"
          >
            <SectionHeader
              eyebrow="About Me"
              title="Developer, Designer, Problem Solver"
              description="A Computer Science student turning real-world challenges into digital solutions."
            />
            <div className="space-y-4 leading-relaxed text-zinc-400">
              <p>
                I&apos;m Ado — a full-stack developer and freelancer based in
                Rwanda. What started as fixing friends&apos; laptops and designing
                posters has grown into a business serving clients across East
                Africa and beyond.
              </p>
              <p>
                I build websites, design graphics, and provide IT support — the
                full package for individuals and small businesses who need
                practical, affordable tech solutions.
              </p>
            </div>
            <Button href="/about" variant="outline" className="mt-8">
              Read My Story <ArrowRight size={18} />
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
