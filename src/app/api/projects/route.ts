import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify, stringifyTags } from "@/lib/constants";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().optional(),
  description: z.string().min(10),
  content: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  techStack: z.array(z.string()).default([]),
  category: z.string().min(1),
  githubUrl: z.string().optional().nullable(),
  liveUrl: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const admin = searchParams.get("admin") === "true";

  const session = await auth();
  const isAdmin = !!session?.user;

  const projects = await prisma.project.findMany({
    where: {
      ...(admin && isAdmin ? {} : { published: true }),
      ...(category ? { category } : {}),
      ...(featured === "true" ? { featured: true } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = projectSchema.parse(body);
    const slug = data.slug || slugify(data.title);

    const project = await prisma.project.create({
      data: {
        ...data,
        slug,
        techStack: stringifyTags(data.techStack),
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
