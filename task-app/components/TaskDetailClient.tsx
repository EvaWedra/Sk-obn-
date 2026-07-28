"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { priorityLabels, priorityOrder, statusLabels, statusOrder } from "@/lib/config";
import TagBadge from "./TagBadge";
import type { Priority, Status, Task, User } from "@/lib/types";

export default function TaskDetailClient({
  task,
  allUsers,
  assignableUsers,
  isAdmin,
}: {
  task: Task;
  allUsers: User[];
  assignableUsers: User[];
  isAdmin: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentBusy, setCommentBusy] = useState(false);
  const usersById = Object.fromEntries(allUsers.map((u) => [u.id, u]));

  async function patchTask(patch: Record<string, unknown>) {
    setBusy(true);
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Naozaj natrvalo zmazať túto úlohu?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/archive");
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentBusy(true);
    try {
      const res = await fetch(`/api/tasks/${task.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: commentText }),
      });
      if (res.ok) {
        setCommentText("");
        router.refresh();
      }
    } finally {
      setCommentBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">{task.title}</h1>
          {task.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 whitespace-pre-wrap">{task.description}</p>
          )}
        </div>

        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {task.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        {task.photos.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {task.photos.map((src, idx) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={idx}
                src={src}
                alt=""
                className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-xs text-gray-400 uppercase font-semibold mb-1">Priorita</div>
            <select
              disabled={busy}
              value={task.priority}
              onChange={(e) => patchTask({ priority: e.target.value as Priority })}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white px-2 py-1.5 text-sm outline-none"
            >
              {priorityOrder.map((p) => (
                <option key={p} value={p}>
                  {priorityLabels[p]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-xs text-gray-400 uppercase font-semibold mb-1">Priradené</div>
            <select
              disabled={busy}
              value={task.assigneeId ?? ""}
              onChange={(e) => patchTask({ assigneeId: e.target.value || null })}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white px-2 py-1.5 text-sm outline-none"
            >
              <option value="">Nepriradené</option>
              {assignableUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-400 uppercase font-semibold mb-2">Stav</div>
          <div className="flex gap-2">
            {statusOrder.map((s) => (
              <button
                key={s}
                type="button"
                disabled={busy}
                onClick={() => patchTask({ status: s as Status })}
                className={`flex-1 text-xs font-semibold py-2 rounded-lg border transition-colors ${
                  task.status === s
                    ? "bg-brand-600 border-brand-600 text-white"
                    : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300"
                }`}
              >
                {statusLabels[s]}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between">
          <span>Vytvoril: {usersById[task.createdBy]?.name ?? "?"}</span>
          <span>{new Date(task.createdAt).toLocaleDateString("sk-SK")}</span>
        </div>

        {isAdmin && (
          <button
            type="button"
            disabled={busy}
            onClick={handleDelete}
            className="w-full text-sm font-semibold text-rose-600 border border-rose-200 dark:border-rose-900 rounded-xl py-2.5 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
          >
            Zmazať úlohu
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Komentáre ({task.comments.length})
        </h2>
        <div className="space-y-3 mb-4">
          {task.comments.length === 0 && (
            <p className="text-sm text-gray-400">Zatiaľ žiadne komentáre.</p>
          )}
          {task.comments.map((c) => {
            const author = usersById[c.authorId];
            return (
              <div key={c.id} className="flex gap-2">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: author?.color ?? "#999" }}
                >
                  {(author?.name ?? "?").charAt(0).toUpperCase()}
                </span>
                <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-xl px-3 py-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                      {author?.name ?? "Neznámy"}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(c.createdAt).toLocaleString("sk-SK", { day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{c.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleComment} className="flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Napísať komentár..."
            className="flex-1 rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
          <button
            type="submit"
            disabled={commentBusy || !commentText.trim()}
            className="px-4 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-semibold transition-colors"
          >
            Odoslať
          </button>
        </form>
      </div>
    </div>
  );
}
