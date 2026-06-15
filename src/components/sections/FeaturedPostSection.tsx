"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { formatDate, IMAGES } from "@/lib/constants";
import type { BlogPost } from "@/generated/prisma/client";

interface FeaturedPostSectionProps {
  post: BlogPost;
}

export function FeaturedPostSection({ post }: FeaturedPostSectionProps) {
  const imageSrc = post.image ?? IMAGES.featuredBg;

  return (
    <section className="border-y border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-900/30">
      <Container>
        <SectionHeader
          eyebrow="Featured"
          title="Editor's Pick"
          description="A deep dive worth your time."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="group relative block overflow-hidden rounded-3xl shadow-lg transition-shadow duration-300 hover:shadow-2xl hover:shadow-emerald-500/10"
          >
            <div className="relative aspect-[21/9] min-h-[280px] sm:min-h-[320px]">
              <Image
                src={imageSrc}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-zinc-900/20" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
                <Badge variant="cyan" className="mb-4 w-fit">
                  {post.category}
                </Badge>
                <h2 className="max-w-3xl text-2xl font-bold text-white sm:text-4xl">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl line-clamp-2 text-zinc-300 sm:text-lg">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {formatDate(post.createdAt)}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-emerald-400 transition-colors group-hover:text-emerald-300">
                    Read article <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
