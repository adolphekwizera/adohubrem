import type { Metadata } from "next";
import Image from "next/image";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Eye } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { markdownToHtml, estimateReadTime } from "@/lib/markdown";
import { formatDate, parseTags, SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { BlogCard } from "@/components/blog/BlogCard";
import { ViewCounter } from "@/components/blog/ViewCounter";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) return { title: "Post Not Found" };

    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.image ? [post.image] : [],
      },
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  let relatedPosts = [];

  try {
    post = await prisma.blogPost.findUnique({ where: { slug, published: true } });

    if (!post) notFound();

    relatedPosts = await prisma.blogPost.findMany({
      where: {
        published: true,
        category: post.category,
        NOT: { id: post.id },
      },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    notFound();
  }

  const htmlContent = await markdownToHtml(post.content);
  const tags = parseTags(post.tags);
  const readTime = estimateReadTime(post.content);

  return (
    <>
      <ViewCounter postId={post.id} />
      <Container className="py-12 sm:py-16">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <article className="mx-auto max-w-3xl">
          {post.image && (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge variant="cyan">{post.category}</Badge>
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(post.createdAt)}
            </span>
            <span>{readTime} min read</span>
            <span className="flex items-center gap-1.5">
              <Eye size={14} />
              {post.views} views
            </span>
            <span>By {SITE.name}</span>
          </div>

          <div
            className="prose prose-lg mt-10 max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-20 border-t border-zinc-200 pt-16 dark:border-zinc-800">
            <h2 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-white">
              Related Posts
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <BlogCard key={related.id} post={related} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
