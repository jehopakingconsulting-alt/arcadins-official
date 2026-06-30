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
    default: "ARCADINS Training Center — Formation professionnelle certifiée, TEF/TCF Canada",
    template: "%s | ARCADINS Training Center",
  },
  description: "Formation professionnelle certifiée, TEF/TCF Canada, 7 langues, 47 pays. Préparez votre avenir au Canada avec ARCADINS Training Center.",
  keywords: "TEF Canada, TCF Canada, formation professionnelle, immigration Canada, Québec, certification, IRCC, résidence permanente",
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
    title: "ARCADINS Training Center — Formation certifiée, TEF/TCF Canada",
    description: "Plateforme internationale de formation professionnelle certifiée. Préparation TEF/TCF, immigration Canada, 28 programmes, 47 pays, 7 langues.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARCADINS Training Center",
    description: "Formation certifiée TEF/TCF Canada · 47 pays · 7 langues · 28 programmes",
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
