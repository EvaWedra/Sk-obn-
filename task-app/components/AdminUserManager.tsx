"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Branch, User } from "@/lib/types";

export default function AdminUserManager({
  users,
  branches,
  currentUserId,
}: {
  users: User[];
  branches: Branch[];
  currentUserId: string;
}) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"employee" | "admin">("employee");
  const [newBranches, setNewBranches] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  async function toggleBranch(user: User, branchId: string) {
    setBusyId(user.id);
    const next = user.branches.includes(branchId)
      ? user.branches.filter((b) => b !== branchId)
      : [...user.branches, branchId];
    await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ branches: next }),
    });
    setBusyId(null);
    router.refresh();
  }

  async function handleDelete(user: User) {
    if (!confirm(`Naozaj odstrániť ${user.name} z tímu?`)) return;
    setBusyId(user.id);
    const res = await fetch(`/api/users/${user.id}`, { method: "DELETE" });
    setBusyId(null);
    if (res.ok) router.refresh();
    else {
      const data = await res.json();
      alert(data.error ?? "Nepodarilo sa odstrániť");
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Meno a email sú povinné");
      return;
    }
    setAdding(true);
    setError("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, branches: newBranches }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Nepodarilo sa pridať člena");
        return;
      }
      setName("");
      setEmail("");
      setRole("employee");
      setNewBranches([]);
      setShowAdd(false);
      router.refresh();
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: user.color }}
              >
                {user.name.charAt(0).toUpperCase()}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 dark:text-white truncate">{user.name}</div>
                <div className="text-xs text-gray-400 truncate">{user.email}</div>
              </div>
              <span className="text-[10px] uppercase font-bold text-gray-400 border border-gray-200 dark:border-gray-600 rounded-full px-2 py-1 shrink-0">
                {user.role === "admin" ? "Admin" : "Zamestnanec"}
              </span>
              {user.id !== currentUserId && (
                <button
                  type="button"
                  disabled={busyId === user.id}
                  onClick={() => handleDelete(user)}
                  className="text-rose-500 text-xs font-semibold shrink-0"
                >
                  Odstrániť
                </button>
              )}
            </div>
            {user.role !== "admin" && (
              <div className="flex flex-wrap gap-1.5">
                {branches.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    disabled={busyId === user.id}
                    onClick={() => toggleBranch(user, b.id)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      user.branches.includes(b.id)
                        ? "bg-brand-500 border-brand-500 text-white"
                        : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300"
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {!showAdd ? (
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="w-full text-sm font-semibold text-brand-700 dark:text-brand-300 border border-dashed border-brand-300 dark:border-brand-700 rounded-xl py-3"
        >
          + Pridať člena tímu
        </button>
      ) : (
        <form
          onSubmit={handleAdd}
          className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 space-y-3"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Meno"
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white px-3 py-2 text-sm outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white px-3 py-2 text-sm outline-none"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "employee" | "admin")}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white px-3 py-2 text-sm outline-none"
          >
            <option value="employee">Zamestnanec</option>
            <option value="admin">Administrátor</option>
          </select>
          {role === "employee" && (
            <div className="flex flex-wrap gap-1.5">
              {branches.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() =>
                    setNewBranches((prev) =>
                      prev.includes(b.id) ? prev.filter((id) => id !== b.id) : [...prev, b.id]
                    )
                  }
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    newBranches.includes(b.id)
                      ? "bg-brand-500 border-brand-500 text-white"
                      : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          )}
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="flex-1 text-sm font-semibold text-gray-500 border border-gray-200 dark:border-gray-600 rounded-xl py-2.5"
            >
              Zrušiť
            </button>
            <button
              type="submit"
              disabled={adding}
              className="flex-1 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-60 rounded-xl py-2.5"
            >
              {adding ? "..." : "Pridať"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
