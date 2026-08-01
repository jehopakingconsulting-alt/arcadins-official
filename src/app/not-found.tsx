import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable (404)",
  robots: { index: false, follow: true },
};

/**
 * 404 de marque ARCADINS Training Center. Server component, sans dépendance i18n
 * (rendu côté serveur pour toute route inconnue). Renvoie un vrai statut 404.
 */
export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-navy flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-[560px]">
        <p className="text-gold font-bold tracking-[4px] uppercase text-[12px] mb-4">Erreur 404</p>
        <h1 className="font-[family-name:var(--font-heading)] text-[34px] md:text-[42px] text-white mb-4 leading-tight">
          Cette page est introuvable
        </h1>
        <p className="text-white/60 text-[15px] leading-[1.75] mb-9">
          Le lien est peut-être erroné ou la page a été déplacée. Revenez à l&apos;accueil ou explorez
          nos deux départements — Programmes officiels de langue et Formations professionnelles.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="bg-gold text-navy font-bold text-[14px] px-6 py-3 rounded-[10px] transition-all hover:bg-gold-light">
            Retour à l&apos;accueil
          </Link>
          <Link href="/tef" className="bg-white/8 border border-gold/25 text-gold font-semibold text-[14px] px-6 py-3 rounded-[10px] transition-all hover:bg-white/12">
            Programmes officiels
          </Link>
          <Link href="/formations" className="bg-white/8 border border-gold/25 text-gold font-semibold text-[14px] px-6 py-3 rounded-[10px] transition-all hover:bg-white/12">
            Formations professionnelles
          </Link>
        </div>
      </div>
    </main>
  );
}
