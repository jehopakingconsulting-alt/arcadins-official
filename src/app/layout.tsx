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
  title: "ARCADINS Training Center — Formation professionnelle certifiée, TEF/TCF Canada",
  description: "Formation professionnelle certifiée, TEF/TCF Canada, 7 langues, 47 pays. Préparez votre avenir au Canada avec ARCADINS Training Center.",
  keywords: "TEF Canada, TCF Canada, formation professionnelle, immigration Canada, Québec, certification",
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
