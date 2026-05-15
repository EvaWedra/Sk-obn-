"use client";

import { useState } from "react";

interface Topic {
  value: string;
  label: string;
}

interface Props {
  t: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    topic: string;
    topics: readonly Topic[];
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    successTitle: string;
    successMsg: string;
    errorMsg: string;
    required: string;
  };
}

export default function ContactForm({ t }: Props) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    topic: t.topics[0].value,
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = t.required;
    if (!form.message.trim()) errs.message = t.required;
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", contact: "", topic: t.topics[0].value, message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-forest-50 border border-forest-200 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-forest-700 mb-2">{t.successTitle}</h2>
        <p className="text-forest-600 text-sm">{t.successMsg}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-forest-600 text-sm underline"
        >
          ←
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
        <input
          type="text"
          value={form.name}
          placeholder={t.namePlaceholder}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${
            errors.name
              ? "border-red-400 focus:border-red-500"
              : "border-gray-200 focus:border-forest-400"
          }`}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      {/* Contact */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
        <input
          type="text"
          value={form.contact}
          placeholder={t.emailPlaceholder}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          className="w-full rounded-xl border border-gray-200 focus:border-forest-400 px-4 py-3 text-sm outline-none transition-colors"
        />
      </div>

      {/* Topic */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.topic}</label>
        <select
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          className="w-full rounded-xl border border-gray-200 focus:border-forest-400 px-4 py-3 text-sm outline-none bg-white transition-colors"
        >
          {t.topics.map((tp) => (
            <option key={tp.value} value={tp.value}>
              {tp.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.message}</label>
        <textarea
          rows={5}
          value={form.message}
          placeholder={t.messagePlaceholder}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors resize-none ${
            errors.message
              ? "border-red-400 focus:border-red-500"
              : "border-gray-200 focus:border-forest-400"
          }`}
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{t.errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-forest-600 hover:bg-forest-700 disabled:opacity-60 text-white font-semibold rounded-xl py-3.5 text-sm transition-colors active:scale-95"
      >
        {status === "sending" ? t.sending : t.send}
      </button>
    </form>
  );
}
