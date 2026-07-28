import { notFound } from "next/navigation";
import Link from "next/link";
import { getActiveBranchId, getCurrentUser } from "@/lib/auth";
import { getSection } from "@/lib/config";
import { getTasks, getUsers } from "@/lib/storage";
import TaskCard from "@/components/TaskCard";

export default function SectionPage({ params }: { params: { id: string } }) {
  const user = getCurrentUser()!;
  const section = getSection(params.id);
  if (!section) notFound();
  if (section.adminOnly && user.role !== "admin") notFound();

  const activeBranch = getActiveBranchId(user);
  const users = getUsers();
  const usersById = Object.fromEntries(users.map((u) => [u.id, u]));

  let tasks = getTasks().filter(
    (t) =>
      t.sectionId === section.id &&
      t.status !== "hotove" &&
      (user.role === "admin" || user.branches.includes(t.branchId))
  );
  if (activeBranch !== "all") tasks = tasks.filter((t) => t.branchId === activeBranch);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center text-2xl shrink-0">
          {section.icon}
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{section.label}</h1>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Žiadne aktívne úlohy v tejto sekcii.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} assignee={usersById[t.assigneeId ?? ""] ?? null} />
          ))}
        </div>
      )}

      <Link
        href={`/task/new?section=${section.id}`}
        className="block text-center text-sm font-semibold text-brand-700 dark:text-brand-300 border border-dashed border-brand-300 dark:border-brand-700 rounded-xl py-3"
      >
        + Pridať úlohu do tejto sekcie
      </Link>
    </div>
  );
}
