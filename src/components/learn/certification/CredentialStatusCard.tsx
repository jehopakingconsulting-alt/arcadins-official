"use client";
import type { CredentialViewModel } from "@/lib/runtime/ui/view-models";

const STATUS_LABEL: Record<CredentialViewModel["status"], { label: string; tone: string }> = {
  issued: { label: "Émis", tone: "text-green-700" },
  active: { label: "Actif", tone: "text-green-700" },
  suspended: { label: "Suspendu", tone: "text-amber-700" },
  revoked: { label: "Révoqué", tone: "text-red-700" },
  replaced: { label: "Remplacé", tone: "text-[color:var(--color-muted)]" },
  expired: { label: "Expiré", tone: "text-amber-700" },
  not_issued: { label: "Non encore émis", tone: "text-[color:var(--color-muted)]" },
};

/**
 * Carte de statut d'un credential (Sprint J). Numéro public MASQUÉ. Bouton de vérification SIMULÉ (aucun appel
 * réel). Aucun PDF ni QR réel. Intitulé « Attestation de réussite ARCADINS ».
 */
export function CredentialStatusCard({ credential, onVerify }: { credential: CredentialViewModel; onVerify?: () => void }) {
  const s = STATUS_LABEL[credential.status];
  const issuable = credential.status === "issued" || credential.status === "active";
  return (
    <article className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-gold)]">{credential.documentTitle}</p>
          <p className="mt-1 text-sm text-[color:var(--color-body)]">Réf. publique : <span className="font-mono">{credential.publicVerificationIdMasked}</span></p>
          <p className="mt-1 text-xs text-[color:var(--color-muted)]">Version {credential.version}{credential.replacementReference ? ` · remplace/remplacé` : ""}</p>
        </div>
        <span className={`text-xs font-semibold ${s.tone}`}>{s.label}</span>
      </div>
      <button
        type="button"
        onClick={onVerify}
        disabled={!issuable}
        aria-label="Vérifier l'attestation (démonstration, aucun document réel)"
        className="mt-4 inline-flex min-h-11 items-center rounded-lg border border-[color:var(--border-gold)] px-4 py-2 text-sm font-semibold text-[color:var(--color-navy)] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]"
      >
        Vérifier (démo)
      </button>
    </article>
  );
}
