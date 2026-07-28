import { cookies } from "next/headers";
import { getUser } from "./storage";
import { branches } from "./config";
import { ALL_BRANCHES, BRANCH_COOKIE, SESSION_COOKIE } from "./constants";
import type { Branch, User } from "./types";

export { SESSION_COOKIE, BRANCH_COOKIE, ALL_BRANCHES };

export function getCurrentUser(): User | null {
  const store = cookies();
  const id = store.get(SESSION_COOKIE)?.value;
  if (!id) return null;
  return getUser(id) ?? null;
}

export function canSeeBranch(user: User, branchId: string): boolean {
  return user.role === "admin" || user.branches.includes(branchId);
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() || "admin123";
}

export function getVisibleBranches(user: User): Branch[] {
  if (user.role === "admin") {
    return [{ id: ALL_BRANCHES, name: "Všetky pobočky" }, ...branches];
  }
  return branches.filter((b) => user.branches.includes(b.id));
}

export function getActiveBranchId(user: User): string {
  const visible = getVisibleBranches(user);
  const cookieValue = cookies().get(BRANCH_COOKIE)?.value;
  if (cookieValue && visible.some((b) => b.id === cookieValue)) return cookieValue;
  return visible[0]?.id ?? ALL_BRANCHES;
}
