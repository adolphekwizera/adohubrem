"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FilterChip } from "@/components/ui/FilterChip";
import { BlogCard } from "@/components/blog/BlogCard";
import { BLOG_CATEGORIES } from "@/lib/constants";
import { fadeUp, staggerContainer, defaultViewport, springSoft } from "@/lib/motion";
import type { BlogPost } from "@/generated/prisma/client";

interface BlogClientProps {
  posts: BlogPost[];
}

export function BlogClient({ posts }: BlogClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || post.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [posts, search, category]);

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        eyebrow="Blog"
        title="Articles & Tutorials"
        description="Programming tutorials, freelancing experiences, and IT solutions from my journey."
        align="center"
      />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="glass-input w-full rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500"
          />
        </div>
        <div className="flex flex-wrap gap-1 rounded-xl bg-white/5 p-1 ring-1 ring-white/5">
          <FilterChip
            active={category === "all"}
            onClick={() => setCategory("all")}
          >
            All
          </FilterChip>
          {BLOG_CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              active={category === cat}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </FilterChip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-zinc-500">
          {search || category !== "all"
            ? "No posts match your search."
            : "No blog posts yet. Check back soon!"}
        </p>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          viewport={defaultViewport}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((post) => (
            <motion.div key={post.id} variants={fadeUp} transition={springSoft}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </Container>
  );
}
