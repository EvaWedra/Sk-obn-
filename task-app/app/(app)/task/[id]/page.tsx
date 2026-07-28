import { notFound } from "next/navigation";
import { canSeeBranch, getCurrentUser } from "@/lib/auth";
import { getTask, getUsers } from "@/lib/storage";
import TaskDetailClient from "@/components/TaskDetailClient";

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const user = getCurrentUser()!;
  const task = getTask(params.id);
  if (!task || !canSeeBranch(user, task.branchId)) notFound();

  const users = getUsers();
  const assignableUsers = users.filter((u) => u.role === "admin" || u.branches.includes(task.branchId));

  return (
    <TaskDetailClient
      task={task}
      allUsers={users}
      assignableUsers={assignableUsers}
      isAdmin={user.role === "admin"}
    />
  );
}
