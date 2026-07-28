import { getCurrentUser } from "@/lib/auth";
import { notificationsForUser } from "@/lib/storage";
import NotificationsClient from "@/components/NotificationsClient";

export default function NotificationsPage() {
  const user = getCurrentUser()!;
  const notifications = notificationsForUser(user);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Notifikácie</h1>
      <NotificationsClient notifications={notifications} currentUser={user} />
    </div>
  );
}
