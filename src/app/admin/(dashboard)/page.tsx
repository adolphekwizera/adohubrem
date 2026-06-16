import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FileText, FolderKanban, Mail, Eye } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function AdminDashboard() {
  const session = await auth();

  let stats = {
    posts: 0,
    projects: 0,
    messages: 0,
    unreadMessages: 0,
    totalViews: 0,
  };

  try {
    const [posts, projects, messages, unread, views] = await Promise.all([
      prisma.blogPost.count(),
      prisma.project.count(),
      prisma.message.count(),
      prisma.message.count({ where: { read: false } }),
      prisma.blogPost.aggregate({ _sum: { views: true } }),
    ]);

    stats = {
      posts,
      projects,
      messages,
      unreadMessages: unread,
      totalViews: views._sum.views || 0,
    };
  } catch {
    // DB not connected
  }

  const cards = [
    {
      label: "Blog Posts",
      value: stats.posts,
      icon: FileText,
      href: "/admin/posts",
      iconBg: "bg-blue-500/10 text-blue-400",
    },
    {
      label: "Projects",
      value: stats.projects,
      icon: FolderKanban,
      href: "/admin/projects",
      iconBg: "bg-emerald-500/10 text-emerald-400",
    },
    {
      label: "Messages",
      value: stats.messages,
      icon: Mail,
      href: "/admin/messages",
      iconBg: "bg-purple-500/10 text-purple-400",
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : undefined,
    },
    {
      label: "Total Views",
      value: stats.totalViews,
      icon: Eye,
      href: "/admin/posts",
      iconBg: "bg-orange-500/10 text-orange-400",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {session?.user?.name?.split(" ")[0] || "Admin"}
        </h1>
        <p className="mt-2 text-zinc-400">
          Manage your portfolio, blog, and client messages from one place.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card hover className="relative border-zinc-800 bg-zinc-950/50">
              {card.badge && (
                <span className="absolute right-4 top-4 rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                  {card.badge} new
                </span>
              )}
              <div
                className={cn(
                  "mb-4 inline-flex rounded-xl p-2.5",
                  card.iconBg
                )}
              >
                <card.icon size={22} />
              </div>
              <p className="text-3xl font-bold text-white">{card.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{card.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Card className="border-zinc-800 bg-zinc-950/50">
          <h2 className="mb-4 font-semibold text-white">Quick Actions</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/admin/posts/new"
              className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-4 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/10"
            >
              + Write a new blog post
            </Link>
            <Link
              href="/admin/projects/new"
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-4 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
            >
              + Add a new project
            </Link>
            <Link
              href="/admin/messages"
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-4 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
            >
              View client messages
            </Link>
            <Link
              href="/"
              target="_blank"
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-4 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
            >
              Preview live site
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
