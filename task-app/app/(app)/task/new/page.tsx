import { getCurrentUser, getVisibleBranches } from "@/lib/auth";
import { sections } from "@/lib/config";
import { getUsers } from "@/lib/storage";
import TaskForm from "@/components/TaskForm";

export default function NewTaskPage({ searchParams }: { searchParams: { section?: string } }) {
  const user = getCurrentUser()!;
  const branches = getVisibleBranches(user).filter((b) => b.id !== "all");
  const users = getUsers();
  const availableSections = sections.filter((s) => !s.adminOnly || user.role === "admin");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Nová úloha</h1>
      <TaskForm
        sections={availableSections}
        branches={branches}
        users={users}
        defaultSectionId={searchParams.section}
        defaultBranchId={branches[0]?.id}
      />
    </div>
  );
}
