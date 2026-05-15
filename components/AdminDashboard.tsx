"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Message, Announcement } from "@/lib/storage";

interface AdminT {
  title: string;
  login: { logout: string };
  tabs: { messages: string; announcements: string };
  messages: {
    title: string;
    empty: string;
    from: string;
    contact: string;
    topic: string;
    message: string;
    date: string;
    markRead: string;
    unread: string;
    delete: string;
    topics: Record<string, string>;
  };
  announcements: {
    title: string;
    addTitle: string;
    placeholder: string;
    add: string;
    delete: string;
    empty: string;
    added: string;
  };
}

interface Props {
  t: AdminT;
  lang: string;
  initialMessages: Message[];
  initialAnnouncements: Announcement[];
}

export default function AdminDashboard({ t, lang, initialMessages, initialAnnouncements }: Props) {
  const [tab, setTab] = useState<"messages" | "announcements">("messages");
  const [messages, setMessages] = useState(initialMessages);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [newAnn, setNewAnn] = useState("");
  const [addingAnn, setAddingAnn] = useState(false);
  const router = useRouter();

  const unreadCount = messages.filter((m) => !m.read).length;

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  async function markRead(id: string) {
    await fetch(`/api/messages/${id}`, { method: "PATCH" });
    setMessages((msgs) => msgs.map((m) => (m.id === id ? { ...m, read: true } : m)));
  }

  async function deleteMessage(id: string) {
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setMessages((msgs) => msgs.filter((m) => m.id !== id));
  }

  async function addAnnouncement() {
    if (!newAnn.trim()) return;
    setAddingAnn(true);
    const res = await fetch("/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newAnn.trim() }),
    });
    if (res.ok) {
      const ann = await res.json();
      setAnnouncements((a) => [ann, ...a]);
      setNewAnn("");
    }
    setAddingAnn(false);
  }

  async function deleteAnnouncement(id: string) {
    await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    setAnnouncements((a) => a.filter((x) => x.id !== id));
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString(lang === "sk" ? "sk-SK" : "en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-forest-700 text-white">
        <div className="flex items-center justify-between px-4 h-14 max-w-md mx-auto">
          <span className="font-semibold">{t.title}</span>
          <button
            onClick={handleLogout}
            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors"
          >
            {t.login.logout}
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex max-w-md mx-auto">
          <button
            onClick={() => setTab("messages")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === "messages"
                ? "border-forest-600 text-forest-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.tabs.messages}
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("announcements")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === "announcements"
                ? "border-forest-600 text-forest-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.tabs.announcements}
            {announcements.length > 0 && (
              <span className="ml-2 bg-forest-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {announcements.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 pb-8">
        {/* Messages tab */}
        {tab === "messages" && (
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-sm">{t.messages.empty}</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`bg-white rounded-2xl border p-4 shadow-sm ${
                    msg.read ? "border-gray-100" : "border-forest-300 ring-1 ring-forest-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900">{msg.name}</span>
                        {!msg.read && (
                          <span className="text-xs bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full font-medium">
                            {t.messages.unread}
                          </span>
                        )}
                      </div>
                      {msg.contact && (
                        <span className="text-xs text-gray-500">{msg.contact}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>

                  <div className="text-xs text-forest-600 font-medium mb-2">
                    {t.messages.topics[msg.topic] ?? msg.topic}
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed mb-3">{msg.message}</p>

                  <div className="flex gap-2 justify-end">
                    {!msg.read && (
                      <button
                        onClick={() => markRead(msg.id)}
                        className="text-xs text-forest-600 hover:text-forest-700 border border-forest-200 hover:border-forest-400 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        ✓ {t.messages.markRead}
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="text-xs text-red-500 hover:text-red-600 border border-red-100 hover:border-red-300 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {t.messages.delete}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Announcements tab */}
        {tab === "announcements" && (
          <div className="space-y-4">
            {/* Add new */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <h3 className="font-semibold text-sm text-gray-900 mb-3">{t.announcements.addTitle}</h3>
              <textarea
                rows={3}
                value={newAnn}
                onChange={(e) => setNewAnn(e.target.value)}
                placeholder={t.announcements.placeholder}
                className="w-full rounded-xl border border-gray-200 focus:border-forest-400 px-3 py-2 text-sm outline-none resize-none transition-colors"
              />
              <button
                onClick={addAnnouncement}
                disabled={addingAnn || !newAnn.trim()}
                className="mt-2 w-full bg-forest-600 hover:bg-forest-700 disabled:opacity-50 text-white font-semibold rounded-xl py-2.5 text-sm transition-colors"
              >
                📢 {t.announcements.add}
              </button>
            </div>

            {/* List */}
            {announcements.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <p className="text-sm">{t.announcements.empty}</p>
              </div>
            ) : (
              announcements.map((ann) => (
                <div key={ann.id} className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-amber-900 flex-1 leading-relaxed">{ann.text}</p>
                    <button
                      onClick={() => deleteAnnouncement(ann.id)}
                      className="text-amber-400 hover:text-red-500 transition-colors flex-shrink-0"
                      aria-label="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-amber-600 mt-2">{formatDate(ann.createdAt)}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
