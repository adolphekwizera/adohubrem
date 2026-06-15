"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Trash2, Upload } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { BLOG_CATEGORIES } from "@/lib/constants";
import type { BlogPost } from "@/generated/prisma/client";

interface PostFormProps {
  post?: BlogPost;
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    image: post?.image || "",
    category: post?.category || BLOG_CATEGORIES[0],
    tags: post?.tags ? JSON.parse(post.tags).join(", ") : "",
    published: post?.published ?? true,
    featured: post?.featured ?? false,
  });

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setForm((f) => ({ ...f, image: data.url }));
      } else {
        setError(data.error || "Upload failed");
      }
    } catch {
      setError("Upload failed");
    }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean),
      image: form.image || null,
    };

    try {
      const url = post ? `/api/posts/${post.id}` : "/api/posts";
      const method = post ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!post || !confirm("Delete this post?")) return;

    await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <Input
        label="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <Input
        label="Slug (optional)"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
        placeholder="auto-generated-from-title"
      />
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Category
        </label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          {BLOG_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <Input
        label="Tags (comma separated)"
        value={form.tags}
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
        placeholder="nextjs, tutorial, react"
      />
      <Textarea
        label="Excerpt"
        value={form.excerpt}
        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        rows={2}
        required
      />
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Content (Markdown)
        </label>
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          rows={16}
          required
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="## Your heading&#10;&#10;Write your post in **markdown**..."
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Cover Image
        </label>
        <div className="flex items-center gap-4">
          <Input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="Image URL or upload"
          />
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <span className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-4 py-2.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
              {uploading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Upload size={16} />
              )}
              Upload
            </span>
          </label>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          className="rounded"
        />
        Featured on homepage
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm({ ...form, published: e.target.checked })}
          className="rounded"
        />
        Published
      </label>

      {error && (
        <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {post ? "Update Post" : "Create Post"}
        </Button>
        {post && (
          <Button type="button" variant="outline" onClick={handleDelete}>
            <Trash2 size={18} />
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
