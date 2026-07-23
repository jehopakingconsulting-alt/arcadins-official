import type { Accreditation } from "@/types";

/**
 * Affiche un badge d'accréditation UNIQUEMENT s'il est vérifié ET accompagné
 * d'une preuve publique. Dans tout autre cas, le composant ne rend rien : c'est
 * un garde-fou de conformité contre l'affichage d'une reconnaissance non prouvée.
 */
export default function VerificationBadge({ accreditation }: { accreditation: Accreditation }) {
  if (!accreditation.verified || !accreditation.proofUrl) return null;

  return (
    <div className="bg-white rounded-2xl border border-gold/20 p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <span
          className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center text-sm font-bold shrink-0"
          aria-hidden
        >
          ✓
        </span>
        <div>
          <div className="text-[15px] font-semibold text-navy leading-tight">{accreditation.name}</div>
          <div className="text-[12.5px] text-muted">{accreditation.issuer}</div>
        </div>
      </div>

      {accreditation.description && (
        <p className="text-[13px] text-body leading-[1.6]">{accreditation.description}</p>
      )}

      <div className="flex items-center justify-between mt-1 pt-3 border-t border-gold/10">
        {accreditation.reference && (
          <span className="text-[11.5px] text-muted">Réf. {accreditation.reference}</span>
        )}
        <a
          href={accreditation.proofUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12.5px] font-semibold text-gold hover:underline ml-auto"
        >
          Vérifier la source ↗
        </a>
      </div>
    </div>
  );
}
