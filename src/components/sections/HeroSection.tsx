"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Palette, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { IMAGES, SITE } from "@/lib/constants";
import { slideInLeft, slideInRight, springSoft } from "@/lib/motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.12),transparent_70%)]" />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            transition={springSoft}
          >
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, ...springSoft }}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300 ring-1 ring-emerald-500/20"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              Available for freelance work
            </motion.p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
                {SITE.name}
              </span>
            </h1>
            <p className="mt-4 text-xl font-medium text-zinc-300">
              {SITE.title}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              {SITE.description} From building web apps for local businesses to
              designing wedding invitations and fixing computers — I help real
              people solve real problems.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/projects" size="lg">
                View Projects <ArrowRight size={18} />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Me
              </Button>
            </div>
            <div className="mt-8">
              <SocialLinks />
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-zinc-500">
              <span className="flex items-center gap-2">
                <Code2 size={16} className="text-emerald-400" /> Web Dev
              </span>
              <span className="flex items-center gap-2">
                <Palette size={16} className="text-emerald-400" /> Design
              </span>
              <span className="flex items-center gap-2">
                <Wrench size={16} className="text-emerald-400" /> IT Support
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            transition={{ ...springSoft, delay: 0.12 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-emerald-500/25 via-cyan-500/10 to-transparent blur-2xl" />
            <div className="glass-panel relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-black/40">
              <Image
                src={IMAGES.hero}
                alt={SITE.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
