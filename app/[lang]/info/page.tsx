import { getT } from "@/lib/translations";
import type { Lang } from "@/lib/translations";
import TopBar from "@/components/TopBar";
import InfoAccordion from "@/components/InfoAccordion";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function InfoPage({ params }: Props) {
  const { lang } = await params;
  const t = getT(lang as Lang);

  return (
    <>
      <TopBar
        title={t.info.title}
        lang={lang as Lang}
        otherLang={t.otherLang as Lang}
        otherLangName={t.otherLangName}
      />

      <div className="max-w-md mx-auto px-4 py-6">
        <InfoAccordion sections={t.info.sections} />
      </div>
    </>
  );
}
