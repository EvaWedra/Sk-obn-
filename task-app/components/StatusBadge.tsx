import { statusLabels } from "@/lib/config";
import type { Status } from "@/lib/types";

const STYLES: Record<Status, string> = {
  nove: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
  riesi_sa: "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300",
  hotove: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${STYLES[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
