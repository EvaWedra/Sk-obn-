import { getActiveBranchId, getCurrentUser } from "@/lib/auth";
import { getSection } from "@/lib/config";
import { getTasks, getUsers } from "@/lib/storage";
import TaskCard from "@/components/TaskCard";

export default function ArchivePage() {
  const user = getCurrentUser()!;
  const activeBranch = getActiveBranchId(user);
  const users = getUsers();
  const usersById = Object.fromEntries(users.map((u) => [u.id, u]));

  let tasks = getTasks().filter(
    (t) => t.status === "hotove" && (user.role === "admin" || user.branches.includes(t.branchId))
  );
  if (activeBranch !== "all") tasks = tasks.filter((t) => t.branchId === activeBranch);
  tasks.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Archív</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 -mt-2">
        Dokončené úlohy{user.role === "admin" ? " – tu ich môžete po skontrolovaní zmazať." : "."}
      </p>

      {tasks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Zatiaľ žiadne dokončené úlohy.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((t) => (
            <div key={t.id}>
              <div className="text-xs text-gray-400 mb-1 px-1">{getSection(t.sectionId)?.label ?? t.sectionId}</div>
              <TaskCard task={t} assignee={usersById[t.assigneeId ?? ""] ?? null} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
