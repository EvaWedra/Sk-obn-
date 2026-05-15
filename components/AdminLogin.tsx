"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  t: {
    title: string;
    subtitle: string;
    password: string;
    loginBtn: string;
    errorMsg: string;
  };
  lang: string;
}

export default function AdminLogin({ t, lang }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xs">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${
                error ? "border-red-400" : "border-gray-200 focus:border-forest-400"
              }`}
            />
            {error && (
              <p className="text-xs text-red-500 mt-1">{t.errorMsg}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-forest-600 hover:bg-forest-700 disabled:opacity-60 text-white font-semibold rounded-xl py-3 text-sm transition-colors"
          >
            {loading ? "..." : t.loginBtn}
          </button>
        </form>
      </div>
    </div>
  );
}
