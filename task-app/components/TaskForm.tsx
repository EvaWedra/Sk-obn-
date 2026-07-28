"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { defaultTags, priorityOrder, priorityLabels, recurrenceLabels } from "@/lib/config";
import PhotoUpload from "./PhotoUpload";
import type { Branch, Priority, Recurrence, Section, User } from "@/lib/types";

export default function TaskForm({
  sections,
  branches,
  users,
  defaultSectionId,
  defaultBranchId,
}: {
  sections: Section[];
  branches: Branch[];
  users: User[];
  defaultSectionId?: string;
  defaultBranchId?: string;
}) {
  const router = useRouter();
  const [sectionId, setSectionId] = useState(defaultSectionId ?? sections[0]?.id ?? "");
  const [branchId, setBranchId] = useState(defaultBranchId ?? branches[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("normalna");
  const [assigneeId, setAssigneeId] = useState("");
  const [recurrence, setRecurrence] = useState<Recurrence>("none");
  const [tags, setTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const assignableUsers = users.filter((u) => u.role === "admin" || u.branches.includes(branchId));

  function toggleTag(tag: string) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function addCustomTag() {
    const t = customTag.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setCustomTag("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Názov úlohy je povinný");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionId,
          branchId,
          title,
          description,
          priority,
          tags,
          assigneeId: assigneeId || null,
          recurrence,
          photos,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Nepodarilo sa vytvoriť úlohu");
        return;
      }
      router.push(`/task/${data.task.id}`);
      router.refresh();
    } catch {
      setError("Nastala chyba, skúste to znova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">Sekcia</label>
          <select
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          >
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.icon} {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">Pobočka</label>
          <select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">Názov</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Čo treba spraviť?"
          autoFocus
          className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white px-4 py-3 text-sm outline-none focus:border-brand-400"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">Popis</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Detaily, poznámky..."
          className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white px-4 py-3 text-sm outline-none focus:border-brand-400 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">Priorita</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          >
            {priorityOrder.map((p) => (
              <option key={p} value={p}>
                {priorityLabels[p]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">Priradiť</label>
          <select
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          >
            <option value="">Nepriradené</option>
            {assignableUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">Opakovanie</label>
        <select
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value as Recurrence)}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white px-3 py-2.5 text-sm outline-none focus:border-brand-400"
        >
          {Object.entries(recurrenceLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">Štítky</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {defaultTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                tags.includes(tag)
                  ? "bg-brand-500 border-brand-500 text-white"
                  : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomTag();
              }
            }}
            placeholder="Vlastný štítok..."
            className="flex-1 rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent dark:text-white px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
          <button
            type="button"
            onClick={addCustomTag}
            className="px-3 rounded-xl border border-gray-200 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-300"
          >
            Pridať
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">Fotky</label>
        <PhotoUpload photos={photos} onChange={setPhotos} />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold rounded-xl py-3.5 text-sm transition-colors"
      >
        {loading ? "Ukladám..." : "Vytvoriť úlohu"}
      </button>
    </form>
  );
}
