import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FileText, FolderKanban, Mail, Eye } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

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
      color: "text-blue-600",
    },
    {
      label: "Projects",
      value: stats.projects,
      icon: FolderKanban,
      href: "/admin/projects",
      color: "text-emerald-600",
    },
    {
      label: "Messages",
      value: stats.messages,
      icon: Mail,
      href: "/admin/messages",
      color: "text-purple-600",
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : undefined,
    },
    {
      label: "Total Views",
      value: stats.totalViews,
      icon: Eye,
      href: "/admin/posts",
      color: "text-orange-600",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Welcome back, {session?.user?.name?.split(" ")[0] || "Admin"}
        </h1>
        <p className="mt-1 text-zinc-500">
          Manage your portfolio, blog, and client messages.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card hover className="relative">
              {card.badge && (
                <span className="absolute right-4 top-4 rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                  {card.badge} new
                </span>
              )}
              <card.icon className={`mb-3 ${card.color}`} size={24} />
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                {card.value}
              </p>
              <p className="mt-1 text-sm text-zinc-500">{card.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 font-semibold text-zinc-900 dark:text-white">
            Quick Actions
          </h2>
          <div className="space-y-2">
            <Link
              href="/admin/posts/new"
              className="block rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400"
            >
              + Write a new blog post
            </Link>
            <Link
              href="/admin/projects/new"
              className="block rounded-xl bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
            >
              + Add a new project
            </Link>
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 font-semibold text-zinc-900 dark:text-white">
            Getting Started
          </h2>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>1. Connect your MySQL database via DATABASE_URL</li>
            <li>2. Run <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">npm run db:push</code> to create tables</li>
            <li>3. Run <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">npm run db:seed</code> for sample data</li>
            <li>4. Configure Cloudinary for image uploads (optional)</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
