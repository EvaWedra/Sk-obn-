import { notFound } from "next/navigation";
import { supportedLangs, getT } from "@/lib/translations";
import type { Lang } from "@/lib/translations";
import BottomNav from "@/components/BottomNav";

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return supportedLangs.map((lang) => ({ lang }));
}

export default async function LangLayout({ children, params }: Props) {
  const { lang: langParam } = await params;
  if (!supportedLangs.includes(langParam as Lang)) notFound();
  const lang = langParam as Lang;
  const t = getT(lang);

  return (
    <div className="min-h-screen bg-cream-50">
      <main className="pb-20">{children}</main>
      <BottomNav lang={lang} t={t.nav} />
    </div>
  );
}
