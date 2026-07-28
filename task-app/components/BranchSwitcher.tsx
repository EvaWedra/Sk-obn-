"use client";

import { useRouter } from "next/navigation";
import { BRANCH_COOKIE } from "@/lib/constants";
import type { Branch } from "@/lib/types";

export default function BranchSwitcher({ branches, current }: { branches: Branch[]; current: string }) {
  const router = useRouter();

  if (branches.length <= 1) {
    return <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{branches[0]?.name}</span>;
  }

  function handleChange(id: string) {
    document.cookie = `${BRANCH_COOKIE}=${id}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  }

  return (
    <select
      value={current}
      onChange={(e) => handleChange(e.target.value)}
      className="text-sm font-medium bg-transparent border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 text-gray-700 dark:text-gray-200 outline-none focus:border-brand-400"
    >
      {branches.map((b) => (
        <option key={b.id} value={b.id}>
          {b.name}
        </option>
      ))}
    </select>
  );
}
