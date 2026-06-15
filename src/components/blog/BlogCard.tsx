"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Eye } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate, IMAGES, parseTags } from "@/lib/constants";
import type { BlogPost } from "@/generated/prisma/client";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const tags = parseTags(post.tags);
  const [imgSrc, setImgSrc] = useState<string>(post.image ?? IMAGES.blogFallback);

  return (
    <Card hover className="group flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[16/9] bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={imgSrc}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgSrc(IMAGES.blogFallback)}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2">
          <Badge variant="cyan">{post.category}</Badge>
          <span className="flex items-center gap-1 text-xs text-zinc-500">
            <Eye size={12} />
            {post.views}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mb-4 flex-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            {formatDate(post.createdAt)}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
          >
            Read <ArrowRight size={14} />
          </Link>
        </div>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
