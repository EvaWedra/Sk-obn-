import Link from "next/link";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import type { Task, User } from "@/lib/types";

export default function TaskCard({ task, assignee }: { task: Task; assignee: User | null }) {
  return (
    <Link
      href={`/task/${task.id}`}
      className="block bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-brand-300 hover:shadow-md transition-all active:scale-95"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-white leading-snug">{task.title}</h3>
        {assignee && (
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ backgroundColor: assignee.color }}
            title={assignee.name}
          >
            {assignee.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      {task.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{task.description}</p>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        <PriorityBadge priority={task.priority} />
        <StatusBadge status={task.status} />
        {task.comments.length > 0 && (
          <span className="text-xs text-gray-400 flex items-center gap-1">
            💬 {task.comments.length}
          </span>
        )}
        {task.photos.length > 0 && <span className="text-xs text-gray-400">📷 {task.photos.length}</span>}
      </div>
    </Link>
  );
}
