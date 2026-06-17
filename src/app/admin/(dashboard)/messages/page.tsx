"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/constants";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMessages() {
    const res = await fetch("/api/contact");
    if (res.ok) {
      setMessages(await res.json());
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function toggleRead(id: string, read: boolean) {
    await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !read }),
    });
    fetchMessages();
  }

  async function deleteMessage(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    fetchMessages();
  }

  if (loading) {
    return <p className="text-zinc-500">Loading messages...</p>;
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
        Messages
      </h1>
      <p className="mb-8 text-zinc-500">Contact form submissions from your site</p>

      {messages.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-zinc-500">No messages yet.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <Card
              key={msg.id}
              className={!msg.read ? "border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/10" : ""}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                      {msg.subject}
                    </h3>
                    {!msg.read && (
                      <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs text-white">
                        New
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-zinc-500">
                    {msg.name} · {msg.email}
                    {msg.phone && ` · ${msg.phone}`} · {formatDate(msg.createdAt)}
                  </p>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2 self-start sm:self-start">
                  <button
                    onClick={() => toggleRead(msg.id, msg.read)}
                    className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    title={msg.read ? "Mark unread" : "Mark read"}
                  >
                    {msg.read ? <MailOpen size={18} /> : <Mail size={18} />}
                  </button>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
