import type { Metadata, Viewport } from "next";
import { appConfig } from "@/lib/config";
import PWARegister from "@/components/PWARegister";
import "./globals.css";

export const metadata: Metadata = {
  title: appConfig.appName,
  description: appConfig.tagline,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: appConfig.appName,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: appConfig.primaryColor,
};

const THEME_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="font-sans bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
