import { getActiveBranchId, getCurrentUser } from "@/lib/auth";
import { getTasks, getUsers } from "@/lib/storage";
import { appConfig, sections } from "@/lib/config";
import SectionCard from "@/components/SectionCard";
import TaskCard from "@/components/TaskCard";

export default function HomePage() {
  const user = getCurrentUser()!;
  const activeBranch = getActiveBranchId(user);
  const users = getUsers();
  const usersById = Object.fromEntries(users.map((u) => [u.id, u]));

  const visibleTasks = getTasks().filter(
    (t) => (user.role === "admin" || user.branches.includes(t.branchId)) && t.status !== "hotove"
  );
  const branchTasks = activeBranch === "all" ? visibleTasks : visibleTasks.filter((t) => t.branchId === activeBranch);

  const myTasks = branchTasks.filter((t) => t.assigneeId === user.id).slice(0, 5);
  const visibleSections = sections.filter((s) => !s.adminOnly || user.role === "admin");

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-6 text-white shadow-lg">
        <div className="text-4xl mb-3">👋</div>
        <h1 className="text-2xl font-bold mb-1">Ahoj, {user.name}!</h1>
        <p className="text-brand-100 text-sm leading-relaxed">{appConfig.tagline}</p>
      </div>

      {myTasks.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1">
            Moje úlohy na dnes
          </h2>
          <div className="space-y-2">
            {myTasks.map((t) => (
              <TaskCard key={t.id} task={t} assignee={usersById[t.assigneeId ?? ""] ?? null} />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1">
          Sekcie
        </h2>
        <div className="space-y-3">
          {visibleSections.map((s) => {
            const count = branchTasks.filter((t) => t.sectionId === s.id).length;
            return <SectionCard key={s.id} section={s} count={count} />;
          })}
        </div>
      </div>
    </div>
  );
}
