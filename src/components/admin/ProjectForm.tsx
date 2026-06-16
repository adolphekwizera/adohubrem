"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Trash2, Upload } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import type { Project } from "@/generated/prisma/client";

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    content: project?.content || "",
    image: project?.image || "",
    techStack: project?.techStack
      ? JSON.parse(project.techStack).join(", ")
      : "",
    category: project?.category || "web",
    githubUrl: project?.githubUrl || "",
    liveUrl: project?.liveUrl || "",
    featured: project?.featured ?? false,
    published: project?.published ?? true,
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
      techStack: form.techStack
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean),
      image: form.image || null,
      githubUrl: form.githubUrl || null,
      liveUrl: form.liveUrl || null,
      content: form.content || null,
    };

    try {
      const url = project ? `/api/projects/${project.id}` : "/api/projects";
      const method = project ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!project || !confirm("Delete this project?")) return;

    await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <GlassPanel glow className="max-w-3xl p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
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
        />
        <Select
          label="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </Select>
        <Textarea
          label="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <Input
          label="Tech Stack (comma separated)"
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          placeholder="Next.js, TypeScript, MySQL"
        />
        <Input
          label="GitHub URL"
          value={form.githubUrl}
          onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
        />
        <Input
          label="Live URL"
          value={form.liveUrl}
          onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
        />
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Image
          </label>
          <div className="flex items-center gap-3">
            <Input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="Image URL or upload"
            />
            <label className="cursor-pointer shrink-0">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-300 transition-all hover:bg-white/10">
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
        <div className="flex flex-wrap gap-6">
          <Toggle
            label="Featured"
            checked={form.featured}
            onChange={(featured) => setForm({ ...form, featured })}
          />
          <Toggle
            label="Published"
            checked={form.published}
            onChange={(published) => setForm({ ...form, published })}
          />
        </div>

        {error && (
          <p className="rounded-xl border border-red-900/50 bg-red-950/40 p-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {project ? "Update Project" : "Create Project"}
          </Button>
          {project && (
            <Button type="button" variant="outline" onClick={handleDelete}>
              <Trash2 size={18} />
              Delete
            </Button>
          )}
        </div>
      </form>
    </GlassPanel>
  );
}
