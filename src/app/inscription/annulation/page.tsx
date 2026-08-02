import Link from "next/link";
import { isProgramCode, PROGRAM_NAMES } from "@/lib/commerce/program-commerce";

// Page d'ANNULATION de paiement. Aucun accès payant, aucune inscription marquée payée.
// La session d'inscription et le choix de forfait sont préservés (l'étudiant peut réessayer).
export default async function AnnulationPage({ searchParams }: { searchParams: Promise<{ program?: string; session?: string }> }) {
  const sp = await searchParams;
  const program = sp.program && isProgramCode(sp.program) ? sp.program : null;
  const forfaitsHref = `/inscription/forfaits${program ? `?program=${program}` : ""}${sp.session ? `${program ? "&" : "?"}session=${sp.session}` : ""}`;

  return (
    <div className="bg-navy min-h-screen pt-32 pb-20">
      <div className="max-w-[600px] mx-auto px-7 text-center">
        <div className="bg-white/[0.04] border border-white/12 rounded-[28px] p-10">
          <div className="text-5xl mb-4">🛒</div>
          <h1 className="font-[family-name:var(--font-heading)] text-[26px] text-white mb-3">Paiement non complété</h1>
          <p className="text-white/60 text-[14.5px] leading-[1.7] mb-7">
            Votre paiement n&apos;a pas été complété. Aucun montant n&apos;a été confirmé et aucun accès payant
            n&apos;a été activé{program ? ` pour ${PROGRAM_NAMES[program]}` : ""}. Vous pouvez reprendre là où vous
            vous êtes arrêté(e).
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href={forfaitsHref} className="bg-gold text-navy font-bold text-[15px] px-7 py-3.5 rounded-[10px] hover:bg-gold-light transition-all">Réessayer / changer de forfait</Link>
            <Link href="/contact" className="bg-transparent text-white font-semibold text-[15px] px-7 py-3.5 rounded-[10px] border-[1.5px] border-white/28 hover:border-gold hover:text-gold transition-all">Une question ?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
