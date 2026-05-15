import Link from "next/link";
import { getT } from "@/lib/translations";
import type { Lang } from "@/lib/translations";
import { getAnnouncements } from "@/lib/storage";
import TopBar from "@/components/TopBar";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const t = getT(lang as Lang);
  const announcements = getAnnouncements();

  return (
    <>
      <TopBar
        title={t.home.welcome}
        lang={lang as Lang}
        otherLang={t.otherLang as Lang}
        otherLangName={t.otherLangName}
      />

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Welcome card */}
        <div className="bg-gradient-to-br from-forest-600 to-forest-700 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-4xl mb-3">🏡</div>
          <h1 className="text-2xl font-bold mb-2">{t.home.welcome}</h1>
          <p className="text-forest-100 text-sm leading-relaxed">{t.home.subtitle}</p>
        </div>

        {/* Announcements */}
        {announcements.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-1">
              {t.home.announcementsTitle}
            </h2>
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3"
              >
                <span className="text-xl flex-shrink-0">📢</span>
                <p className="text-sm text-amber-900 leading-relaxed">{ann.text}</p>
              </div>
            ))}
          </div>
        )}

        {announcements.length === 0 && (
          <div className="bg-forest-50 border border-forest-100 rounded-xl p-4 flex gap-3 items-center">
            <span className="text-xl">✅</span>
            <p className="text-sm text-forest-700">{t.home.noAnnouncements}</p>
          </div>
        )}

        {/* Quick nav cards */}
        <div className="space-y-3">
          <Link
            href={`/${lang}/info`}
            className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-forest-300 hover:shadow-md transition-all active:scale-95"
          >
            <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              📋
            </div>
            <div>
              <div className="font-semibold text-gray-900">{t.home.cards.info.title}</div>
              <div className="text-sm text-gray-500">{t.home.cards.info.desc}</div>
            </div>
            <svg className="w-5 h-5 text-gray-300 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>

          <Link
            href={`/${lang}/gallery`}
            className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-forest-300 hover:shadow-md transition-all active:scale-95"
          >
            <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              📷
            </div>
            <div>
              <div className="font-semibold text-gray-900">{t.home.cards.gallery.title}</div>
              <div className="text-sm text-gray-500">{t.home.cards.gallery.desc}</div>
            </div>
            <svg className="w-5 h-5 text-gray-300 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>

          <Link
            href={`/${lang}/contact`}
            className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-forest-300 hover:shadow-md transition-all active:scale-95"
          >
            <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              ✉️
            </div>
            <div>
              <div className="font-semibold text-gray-900">{t.home.cards.contact.title}</div>
              <div className="text-sm text-gray-500">{t.home.cards.contact.desc}</div>
            </div>
            <svg className="w-5 h-5 text-gray-300 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
