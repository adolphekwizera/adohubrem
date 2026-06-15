import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PROJECT_CATEGORIES } from "@/lib/constants";

import type { Project } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  let projects: Project[] = [];

  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Projects
          </h1>
          <p className="text-zinc-500">Manage your portfolio projects</p>
        </div>
        <Button href="/admin/projects/new">
          <Plus size={18} />
          New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-zinc-500">No projects yet.</p>
          <Button href="/admin/projects/new" className="mt-4">
            <Plus size={18} />
            Add Project
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => {
            const catLabel =
              PROJECT_CATEGORIES.find((c) => c.value === project.category)
                ?.label || project.category;

            return (
              <Card
                key={project.id}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                      {project.title}
                    </h3>
                    <Badge variant="cyan">{catLabel}</Badge>
                    {project.featured && <Badge>Featured</Badge>}
                    {!project.published && <Badge>Draft</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-zinc-500 line-clamp-1">
                    {project.description}
                  </p>
                </div>
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Pencil size={18} />
                </Link>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
