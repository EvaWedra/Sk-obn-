"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Notification, User } from "@/lib/types";

const ICONS: Record<Notification["type"], string> = {
  new_task: "📋",
  assigned: "👤",
  comment: "💬",
  completed: "✅",
  status_changed: "🔄",
  priority_changed: "⚡",
};

export default function NotificationsClient({
  notifications,
  currentUser,
}: {
  notifications: Notification[];
  currentUser: User;
}) {
  useEffect(() => {
    const unreadIds = notifications.filter((n) => !n.readBy.includes(currentUser.id)).map((n) => n.id);
    if (unreadIds.length === 0) return;
    fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: unreadIds }),
    });
    // Mark-as-read on view; intentionally not re-run when the list changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (notifications.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-700">
        <div className="text-3xl mb-2">🔔</div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Zatiaľ žiadne notifikácie.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notifications.map((n) => {
        const wasUnread = !n.readBy.includes(currentUser.id);
        const content = (
          <div
            className={`flex gap-3 bg-white dark:bg-gray-800 rounded-xl p-3.5 border ${
              wasUnread ? "border-brand-200 dark:border-brand-800" : "border-gray-100 dark:border-gray-700"
            }`}
          >
            <span className="text-xl shrink-0">{ICONS[n.type]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 dark:text-gray-200">{n.message}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(n.createdAt).toLocaleString("sk-SK", {
                  day: "numeric",
                  month: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {wasUnread && <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-1.5" />}
          </div>
        );
        return n.taskId ? (
          <Link key={n.id} href={`/task/${n.taskId}`}>
            {content}
          </Link>
        ) : (
          <div key={n.id}>{content}</div>
        );
      })}
    </div>
  );
}
