"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { parseTechStack, PROJECT_CATEGORIES } from "@/lib/constants";
import type { Project } from "@/generated/prisma/client";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const techStack = parseTechStack(project.techStack);
  const categoryLabel =
    PROJECT_CATEGORIES.find((c) => c.value === project.category)?.label ||
    project.category;
  const [imgSrc, setImgSrc] = useState<string | null>(
    project.image ?? null
  );

  return (
    <Card hover className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-800">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            className="object-cover"
            onError={() => setImgSrc(null)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-500/10 to-emerald-600/5">
            <span className="text-5xl font-bold text-emerald-600/30">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="cyan">{categoryLabel}</Badge>
          {project.featured && <Badge>Featured</Badge>}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
          {project.title}
        </h3>
        <p className="mb-4 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg> Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
