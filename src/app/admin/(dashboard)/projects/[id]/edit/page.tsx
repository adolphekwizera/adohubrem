import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;

  let project;
  try {
    project = await prisma.project.findUnique({ where: { id } });
  } catch {
    notFound();
  }

  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-white">
        Edit Project
      </h1>
      <ProjectForm project={project} />
    </div>
  );
}
