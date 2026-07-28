import { redirect } from "next/navigation";
import Link from "next/link";
import { getActiveBranchId, getCurrentUser } from "@/lib/auth";
import { notificationsForUser } from "@/lib/storage";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const user = getCurrentUser();
  if (!user) redirect("/login");

  const activeBranch = getActiveBranchId(user);
  const unreadCount = notificationsForUser(user).filter((n) => !n.readBy.includes(user.id)).length;

  return (
    <>
      <TopBar user={user} activeBranch={activeBranch} unreadCount={unreadCount} />
      <main className="max-w-md mx-auto px-4 py-6 pb-28">{children}</main>
      <Link
        href="/task/new"
        aria-label="Nová úloha"
        className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-gold-500 hover:bg-gold-600 text-white flex items-center justify-center text-3xl leading-none shadow-lg transition-colors"
      >
        +
      </Link>
      <BottomNav isAdmin={user.role === "admin"} />
    </>
  );
}
