import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostForm } from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;

  let post;
  try {
    post = await prisma.blogPost.findUnique({ where: { id } });
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-white">
        Edit Post
      </h1>
      <PostForm post={post} />
    </div>
  );
}
