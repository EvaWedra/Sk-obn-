"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { appConfig } from "@/lib/config";
import type { User } from "@/lib/types";

export default function LoginPicker({ users }: { users: User[] }) {
  const [selected, setSelected] = useState<User | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(user: User, pwd?: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, password: pwd }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Prihlásenie zlyhalo");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Nastala chyba, skúste to znova.");
    } finally {
      setLoading(false);
    }
  }

  function handlePick(user: User) {
    setError("");
    if (user.role === "admin") {
      setSelected(user);
    } else {
      handleLogin(user);
    }
  }

  if (selected) {
    return (
      <div className="w-full max-w-xs">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="text-sm text-gray-500 mb-4 flex items-center gap-1"
        >
          ← Späť na výber
        </button>
        <div className="text-center mb-6">
          <span
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3"
            style={{ backgroundColor: selected.color }}
          >
            {selected.name.charAt(0).toUpperCase()}
          </span>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{selected.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Prihlásenie pre administrátora</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(selected, password);
          }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Heslo</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors bg-transparent dark:text-white ${
                error ? "border-red-400" : "border-gray-200 dark:border-gray-600 focus:border-brand-400"
              }`}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            <p className="text-xs text-gray-400 mt-2">Demo heslo: admin123 (pokiaľ nebolo zmenené v ADMIN_PASSWORD)</p>
          </div>
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold rounded-xl py-3 text-sm transition-colors"
          >
            {loading ? "..." : "Prihlásiť sa"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs">
      <div className="text-center mb-8">
        <span className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
          ✓
        </span>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{appConfig.appName}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Vyberte si svoje meno</p>
      </div>
      {error && <p className="text-xs text-red-500 mb-3 text-center">{error}</p>}
      <div className="space-y-2">
        {users.map((user) => (
          <button
            key={user.id}
            type="button"
            disabled={loading}
            onClick={() => handlePick(user)}
            className="w-full flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 hover:border-brand-300 transition-colors disabled:opacity-60"
          >
            <span
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ backgroundColor: user.color }}
            >
              {user.name.charAt(0).toUpperCase()}
            </span>
            <span className="text-left">
              <span className="block font-medium text-gray-900 dark:text-white">{user.name}</span>
              <span className="block text-xs text-gray-400">{user.role === "admin" ? "Administrátor" : "Zamestnanec"}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
