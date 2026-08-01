import type { BadgeViewModel, CredentialViewModel } from "@/lib/runtime/ui/view-models";
import { CredentialStatusCard } from "./CredentialStatusCard";
import { BadgesPanel } from "./BadgesPanel";
import { EmptyState } from "@/components/learn/EmptyState";

/** Panneau certificats + badges (Sprint J). Aucune émission/révocation côté client ; lecture seule. */
export function CredentialsPanel({ credentials, badges }: { credentials: CredentialViewModel[]; badges: BadgeViewModel[] }) {
  return (
    <div className="space-y-6">
      <section aria-labelledby="credentials-title">
        <h1 id="credentials-title" className="text-xl font-bold text-[color:var(--color-navy)]">Attestations & badges</h1>
        {credentials.length === 0 ? (
          <div className="mt-4"><EmptyState title="Aucune attestation" hint="Vos attestations apparaîtront ici une fois émises." /></div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {credentials.map((c) => <CredentialStatusCard key={c.publicVerificationIdMasked} credential={c} />)}
          </div>
        )}
      </section>
      <BadgesPanel badges={badges} />
    </div>
  );
}
