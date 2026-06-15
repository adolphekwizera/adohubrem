import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify, stringifyTags } from "@/lib/constants";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(3),
  slug: z.string().optional(),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  image: z.string().optional().nullable(),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const admin = searchParams.get("admin") === "true";

  const session = await auth();
  const isAdmin = !!session?.user;

  const posts = await prisma.blogPost.findMany({
    where: {
      ...(admin && isAdmin ? {} : { published: true }),
      ...(category ? { category } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search } },
              { excerpt: { contains: search } },
              { content: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = postSchema.parse(body);
    const slug = data.slug || slugify(data.title);

    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    const post = await prisma.blogPost.create({
      data: {
        ...data,
        slug,
        tags: stringifyTags(data.tags),
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
