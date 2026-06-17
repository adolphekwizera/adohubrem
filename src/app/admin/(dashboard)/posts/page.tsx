import Link from "next/link";
import { Plus, Pencil, Eye } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/constants";

import type { BlogPost } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  let posts: BlogPost[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Blog Posts
          </h1>
          <p className="text-zinc-400">Create and manage your blog content</p>
        </div>
        <Button href="/admin/posts/new">
          <Plus size={18} />
          New Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-zinc-500">No posts yet. Create your first one!</p>
          <Button href="/admin/posts/new" className="mt-4">
            <Plus size={18} />
            New Post
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold text-white">
                    {post.title}
                  </h3>
                  {!post.published && <Badge>Draft</Badge>}
                </div>
                <p className="mt-1 text-sm text-zinc-500">
                  {formatDate(post.createdAt)} · {post.category} · {post.views}{" "}
                  views
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-emerald-400"
                >
                  <Eye size={18} />
                </Link>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-emerald-400"
                >
                  <Pencil size={18} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
