import Link from "next/link";
import type { Section } from "@/lib/types";

export default function SectionCard({ section, count }: { section: Section; count: number }) {
  return (
    <Link
      href={`/section/${section.id}`}
      className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-brand-300 hover:shadow-md transition-all active:scale-95"
    >
      <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center text-2xl shrink-0">
        {section.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-900 dark:text-white truncate">{section.label}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {count === 0 ? "Žiadne aktívne úlohy" : `${count} ${count === 1 ? "úloha" : count < 5 ? "úlohy" : "úloh"}`}
        </div>
      </div>
      {section.adminOnly && (
        <span className="text-[10px] uppercase font-bold text-gold-600 bg-gold-50 dark:bg-gold-900/30 px-2 py-1 rounded-full shrink-0">
          Admin
        </span>
      )}
      <svg className="w-5 h-5 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  );
}
