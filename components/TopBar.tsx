"use client";

import Link from "next/link";
import type { Lang } from "@/lib/translations";

interface Props {
  title: string;
  lang: Lang;
  otherLang: Lang;
  otherLangName: string;
  showBack?: boolean;
  backHref?: string;
}

export default function TopBar({
  title,
  lang,
  otherLang,
  otherLangName,
  showBack,
  backHref,
}: Props) {
  return (
    <header className="sticky top-0 z-40 bg-forest-600 text-white shadow-md">
      <div className="flex items-center justify-between px-4 h-14 max-w-md mx-auto">
        <div className="flex items-center gap-2">
          {showBack && backHref ? (
            <Link
              href={backHref}
              className="p-1 -ml-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Back"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </Link>
          ) : (
            <span className="text-2xl">🏡</span>
          )}
          <span className="font-semibold text-base">{title}</span>
        </div>

        <Link
          href={`/${otherLang}`}
          className="text-xs font-medium bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-full transition-colors"
        >
          {otherLangName}
        </Link>
      </div>
    </header>
  );
}
