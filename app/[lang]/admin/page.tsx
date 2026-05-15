import { getT } from "@/lib/translations";
import type { Lang } from "@/lib/translations";
import { cookies } from "next/headers";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";
import { getMessages, getAnnouncements } from "@/lib/storage";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function AdminPage({ params }: Props) {
  const { lang } = await params;
  const t = getT(lang as Lang);

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const isLoggedIn = token === (process.env.ADMIN_TOKEN ?? process.env.ADMIN_PASSWORD);

  if (!isLoggedIn) {
    return <AdminLogin t={t.admin.login} lang={lang} />;
  }

  const messages = getMessages();
  const announcements = getAnnouncements();

  return (
    <AdminDashboard
      t={t.admin}
      lang={lang}
      initialMessages={messages}
      initialAnnouncements={announcements}
    />
  );
}
