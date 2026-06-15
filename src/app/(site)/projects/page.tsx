import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProjectsClient } from "@/components/projects/ProjectsClient";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore projects by ${SITE.name} — web apps, APIs, design work, and more.`,
};

import type { Project } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // Database not connected
  }

  return <ProjectsClient projects={projects} />;
}
