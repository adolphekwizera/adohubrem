import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BlogClient } from "@/components/blog/BlogClient";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description: `Read articles, tutorials, and freelancing tips by ${SITE.name}.`,
};

import type { BlogPost } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let posts: BlogPost[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // Database not connected
  }

  return <BlogClient posts={posts} />;
}
