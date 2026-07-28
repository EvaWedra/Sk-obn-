import Link from "next/link";
import { appConfig } from "@/lib/config";
import { getVisibleBranches } from "@/lib/auth";
import type { User } from "@/lib/types";
import BranchSwitcher from "./BranchSwitcher";
import ThemeToggle from "./ThemeToggle";
import LogoutButton from "./LogoutButton";

export default function TopBar({
  user,
  activeBranch,
  unreadCount,
}: {
  user: User;
  activeBranch: string;
  unreadCount: number;
}) {
  const branches = getVisibleBranches(user);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-sm font-bold">
            ✓
          </span>
          <span className="font-bold text-gray-900 dark:text-white text-sm leading-tight hidden xs:block">
            {appConfig.appName}
          </span>
        </Link>

        <div className="flex-1 flex justify-center">
          <BranchSwitcher branches={branches} current={activeBranch} />
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Link
            href="/notifications"
            className="relative w-9 h-9 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Notifikácie"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-gold-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>
          <ThemeToggle />
          <LogoutButton userName={user.name} color={user.color} />
        </div>
      </div>
    </header>
  );
}
