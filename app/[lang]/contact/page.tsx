import { getT } from "@/lib/translations";
import type { Lang } from "@/lib/translations";
import TopBar from "@/components/TopBar";
import ContactForm from "@/components/ContactForm";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const t = getT(lang as Lang);

  return (
    <>
      <TopBar
        title={t.contact.title}
        lang={lang as Lang}
        otherLang={t.otherLang as Lang}
        otherLangName={t.otherLangName}
      />

      <div className="max-w-md mx-auto px-4 py-6">
        <p className="text-sm text-gray-500 mb-6">{t.contact.subtitle}</p>
        <ContactForm t={t.contact.form} />
      </div>
    </>
  );
}
