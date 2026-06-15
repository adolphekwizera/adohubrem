import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stringifyTags } from "@/lib/constants";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(3).optional(),
  slug: z.string().optional(),
  description: z.string().min(10).optional(),
  content: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  techStack: z.array(z.string()).optional(),
  category: z.string().optional(),
  githubUrl: z.string().optional().nullable(),
  liveUrl: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = await prisma.project.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const data = projectSchema.parse(body);
    const { techStack, ...rest } = data;

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...rest,
        ...(techStack ? { techStack: stringifyTags(techStack) } : {}),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
