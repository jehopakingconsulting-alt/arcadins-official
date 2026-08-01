import type { Metadata } from "next";
import { headers } from "next/headers";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import BackToTop from "@/components/layout/BackToTop";
import LangProvider from "@/components/providers/LangProvider";
import { localeAlternates, DEFAULT_LOCALE, isRoutedLocale, type RoutedLocale } from "@/lib/i18n/locale-routing";
import "./globals.css";

const playfair = Playfair_Display({ variable: "--font-heading", subsets: ["latin"], display: "swap", style: ["normal", "italic"], weight: ["400", "600", "700"] });
const dmSans = DM_Sans({ variable: "--font-body", subsets: ["latin"], display: "swap", weight: ["300", "400", "500", "600", "700"] });
const dmMono = DM_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap", weight: ["400", "500"] });

const BASE_URL = (() => {
  try { return new URL((process.env.NEXT_PUBLIC_SITE_URL || "").trim() || "https://arcadins-official.vercel.app").toString(); }
  catch { return "https://arcadins-official.vercel.app"; }
})();

const OG_LOCALE: Record<RoutedLocale, string> = { fr: "fr_CA", en: "en_CA", es: "es_ES" };
const TITLE: Record<RoutedLocale, string> = {
  fr: "ARCADINS Training Center — Formation professionnelle & préparation TEF/TCF Canada",
  en: "ARCADINS Training Center — Professional training & TEF/TCF Canada preparation",
  es: "ARCADINS Training Center — Formación profesional y preparación TEF/TCF Canadá",
};
const DESC: Record<RoutedLocale, string> = {
  fr: "Plateforme de formation professionnelle et de préparation au TEF Canada et au TCF Canada, en 7 langues.",
  en: "Professional training and TEF Canada / TCF Canada preparation platform, in 7 languages.",
  es: "Plataforma de formación profesional y preparación al TEF Canadá y TCF Canadá, en 7 idiomas.",
};

async function requestLocaleAndPath(): Promise<{ locale: RoutedLocale; path: string }> {
  const h = await headers();
  const hl = h.get("x-arcadins-locale");
  const locale: RoutedLocale = isRoutedLocale(hl) ? hl : DEFAULT_LOCALE;
  return { locale, path: h.get("x-arcadins-path") || "/" };
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, path } = await requestLocaleAndPath();
  const alt = localeAlternates(BASE_URL, path, locale);
  return {
    title: { default: TITLE[locale], template: "%s | ARCADINS Training Center" },
    description: DESC[locale],
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: { type: "website", locale: OG_LOCALE[locale], siteName: "ARCADINS Training Center", title: TITLE[locale], description: DESC[locale] },
    twitter: { card: "summary_large_image", title: "ARCADINS Training Center", description: DESC[locale] },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { locale } = await requestLocaleAndPath();
  return (
    <html lang={locale} className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="min-h-screen bg-white font-[family-name:var(--font-body)] text-body antialiased overflow-x-hidden">
        <LangProvider initialLang={locale}>
          <Header />
          <main className="flex-1">{children}</main>
          <FloatingButtons />
          <BackToTop />
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
