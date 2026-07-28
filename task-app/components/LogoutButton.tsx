"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton({ userName, color }: { userName: string; color: string }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      title={`Odhlásiť sa (${userName})`}
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
      style={{ backgroundColor: color }}
    >
      {userName.charAt(0).toUpperCase()}
    </button>
  );
}
