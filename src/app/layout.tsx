import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import BackToTop from "@/components/layout/BackToTop";
import LangProvider from "@/components/providers/LangProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "ARCADINS Training Center — Formation professionnelle & préparation TEF/TCF Canada",
    template: "%s | ARCADINS Training Center",
  },
  description: "Plateforme de formation professionnelle et de préparation au TEF Canada et au TCF Canada, en 7 langues. Pensée pour les nouveaux arrivants et professionnels visant le Canada.",
  keywords: "TEF Canada, TCF Canada, préparation TEF, préparation TCF, formation professionnelle, français des affaires, immigration Canada, apprentissage en ligne",
  metadataBase: (() => {
    try {
      return new URL((process.env.NEXT_PUBLIC_SITE_URL || "").trim() || "https://arcadins-official.vercel.app");
    } catch {
      return new URL("https://arcadins-official.vercel.app");
    }
  })(),
  openGraph: {
    type: "website",
    locale: "fr_CA",
    siteName: "ARCADINS Training Center",
    title: "ARCADINS Training Center — Formation & préparation TEF/TCF Canada",
    description: "Plateforme de formation professionnelle et de préparation aux tests de français (TEF/TCF Canada), disponible en 7 langues.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARCADINS Training Center",
    description: "Formation professionnelle & préparation TEF/TCF Canada · 7 langues",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen bg-white font-[family-name:var(--font-body)] text-body antialiased overflow-x-hidden">
        <LangProvider>
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
