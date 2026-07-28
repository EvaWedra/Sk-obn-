import { priorityLabels } from "@/lib/config";
import type { Priority } from "@/lib/types";

const STYLES: Record<Priority, string> = {
  nizka: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
  normalna: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  dolezita: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  urgentna: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

export default function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${STYLES[priority]}`}>
      {priorityLabels[priority]}
    </span>
  );
}
