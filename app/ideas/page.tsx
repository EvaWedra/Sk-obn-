"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const VoiceIdeaRecorder = dynamic(() => import("@/components/VoiceIdeaRecorder"), { ssr: false });

export default function IdeasPage() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [wrongPin, setWrongPin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("ideas-auth") === "1") setUnlocked(true);
  }, []);

  const unlock = async () => {
    setChecking(true);
    try {
      const res = await fetch("/api/ideas/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (data.ok) {
        sessionStorage.setItem("ideas-auth", "1");
        setUnlocked(true);
      } else {
        setWrongPin(true);
        setTimeout(() => setWrongPin(false), 1500);
      }
    } catch {
      setWrongPin(true);
      setTimeout(() => setWrongPin(false), 1500);
    } finally {
      setChecking(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#fffdf5] flex items-center justify-center px-4">
        <div className="w-full max-w-xs bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          <div className="text-center">
            <div className="text-5xl mb-3">💡</div>
            <h1 className="text-xl font-bold text-gray-900">Nápady pre firmu</h1>
            <p className="text-sm text-gray-500 mt-1">Zadajte PIN pre prístup</p>
          </div>
          <input
            type="password"
            inputMode="numeric"
            placeholder="••••"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && unlock()}
            autoFocus
            className={`w-full text-center text-3xl tracking-[0.5em] border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700/25 transition ${
              wrongPin ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {wrongPin && (
            <p className="text-red-500 text-sm text-center -mt-3">Nesprávny PIN</p>
          )}
          <button
            onClick={unlock}
            disabled={checking}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm bg-[#2d6a5f] hover:bg-[#255c52] disabled:opacity-60 transition-all"
          >
            {checking ? "Overujem…" : "Vstúpiť"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffdf5]">
      <header className="sticky top-0 bg-white border-b border-gray-100 z-10 px-4 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Nápady pre firmu</h1>
            <p className="text-xs text-gray-500">Nahovor nápad — AI ho vyhodnotí</p>
          </div>
        </div>
        <button
          onClick={() => { sessionStorage.removeItem("ideas-auth"); setUnlocked(false); setPin(""); }}
          className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-100 transition"
        >
          Odhlásiť
        </button>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 pb-16">
        <VoiceIdeaRecorder />
      </main>
    </div>
  );
}
