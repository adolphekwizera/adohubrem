"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FilterChip } from "@/components/ui/FilterChip";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { fadeUp, staggerContainer, defaultViewport, springSoft } from "@/lib/motion";
import type { Project } from "@/generated/prisma/client";

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [projects, filter]
  );

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        eyebrow="Portfolio"
        title="My Projects"
        description="A collection of web apps, APIs, design work, and tools I've built."
        align="center"
      />

      <div className="mb-10 flex flex-wrap justify-center gap-1 rounded-xl bg-white/5 p-1 ring-1 ring-white/5">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterChip>
        {PROJECT_CATEGORIES.map((cat) => (
          <FilterChip
            key={cat.value}
            active={filter === cat.value}
            onClick={() => setFilter(cat.value)}
          >
            {cat.label}
          </FilterChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-zinc-500">
          No projects found in this category yet.
        </p>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          viewport={defaultViewport}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <motion.div key={project.id} variants={fadeUp} transition={springSoft}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </Container>
  );
}
