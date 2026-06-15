"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Palette, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { IMAGES, SITE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-600/10" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-600/5 blur-3xl" />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Available for freelance work
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                {SITE.name}
              </span>
            </h1>
            <p className="mt-4 text-xl font-medium text-zinc-600 dark:text-zinc-300">
              {SITE.title}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
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
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <SocialLinks />
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-zinc-500">
              <span className="flex items-center gap-2">
                <Code2 size={16} className="text-emerald-600" /> Web Dev
              </span>
              <span className="flex items-center gap-2">
                <Palette size={16} className="text-emerald-600" /> Design
              </span>
              <span className="flex items-center gap-2">
                <Wrench size={16} className="text-emerald-600" /> IT Support
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-transparent blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-zinc-200/50 dark:ring-zinc-700/50">
              <Image
                src={IMAGES.hero}
                alt={SITE.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
