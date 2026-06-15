import { prisma } from "@/lib/prisma";
import type { BlogPost, Project } from "@/generated/prisma/client";
import { HomePage } from "@/components/home/HomePage";

export const dynamic = "force-dynamic";

export default async function Home() {
  let featuredProjects: Project[] = [];
  let latestPosts: BlogPost[] = [];
  let featuredPost: BlogPost | null = null;

  try {
    [featuredProjects, featuredPost] = await Promise.all([
      prisma.project.findMany({
        where: { published: true, featured: true },
        take: 3,
        orderBy: { createdAt: "desc" },
      }),
      prisma.blogPost.findFirst({
        where: { published: true, featured: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    if (!featuredPost) {
      featuredPost = await prisma.blogPost.findFirst({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      });
    }

    latestPosts = await prisma.blogPost.findMany({
      where: {
        published: true,
        ...(featuredPost ? { id: { not: featuredPost.id } } : {}),
      },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // Database not connected yet — page still renders with static content
  }

  return (
    <HomePage
      featuredProjects={featuredProjects}
      latestPosts={latestPosts}
      featuredPost={featuredPost}
    />
  );
}
