import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { branches } from "@/lib/config";
import { getUsers } from "@/lib/storage";
import AdminUserManager from "@/components/AdminUserManager";

export default function AdminPage() {
  const user = getCurrentUser()!;
  if (user.role !== "admin") redirect("/");

  const users = getUsers();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Správa tímu</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 -mt-2">
        Spravujte členov tímu a ich prístup do pobočiek.
      </p>
      <AdminUserManager users={users} branches={branches} currentUserId={user.id} />
    </div>
  );
}
