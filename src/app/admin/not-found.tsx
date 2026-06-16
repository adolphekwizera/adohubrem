import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-400">
          <FileQuestion size={32} />
        </div>
        <h1 className="text-2xl font-bold text-white">Page not found</h1>
        <p className="mt-2 text-zinc-400">
          This admin page doesn&apos;t exist or the item was deleted.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/admin">Back to Dashboard</Button>
          <Button href="/admin/posts" variant="secondary">
            View Posts
          </Button>
        </div>
      </div>
    </div>
  );
}
