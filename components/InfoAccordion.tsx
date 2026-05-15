"use client";

import { useState } from "react";

interface Section {
  id: string;
  title: string;
  icon: string;
  content: string;
}

interface Props {
  sections: readonly Section[];
}

export default function InfoAccordion({ sections }: Props) {
  const [open, setOpen] = useState<string | null>(sections[0]?.id ?? null);

  return (
    <div className="space-y-2">
      {sections.map((section) => {
        const isOpen = open === section.id;
        return (
          <div
            key={section.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => setOpen(isOpen ? null : section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <span className="font-semibold text-gray-900">{section.title}</span>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {isOpen && (
              <div className="px-4 pb-5 border-t border-gray-100">
                <div className="pt-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
