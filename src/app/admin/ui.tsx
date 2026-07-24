// Fragments d'interface partagés de l'espace admin (sans état, réutilisables).

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white border border-gold/16 rounded-[18px] p-6 ${className}`}>{children}</div>;
}

export function NotAllowed() {
  return (
    <Card>
      <div className="text-3xl mb-2">🔒</div>
      <h2 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-1.5">Accès non autorisé</h2>
      <p className="text-[14px] text-muted">Votre rôle ne dispose pas de la permission requise pour cette section.</p>
    </Card>
  );
}

export function MissingTableNotice() {
  return (
    <div className="bg-amber-50 border border-amber-300 rounded-[14px] p-4 mb-4">
      <p className="text-[13px] text-amber-800 leading-[1.6]">
        <strong>Service non encore activé.</strong> La table correspondante n&apos;a pas encore été
        créée en base. Appliquez la migration Supabase concernée (après sauvegarde et validation)
        pour commencer à recevoir des données ici.
      </p>
    </div>
  );
}

export function EmptyState({ label }: { label: string }) {
  return (
    <Card className="text-center py-12">
      <div className="text-4xl mb-3">📭</div>
      <p className="text-[15px] text-muted">{label}</p>
    </Card>
  );
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("fr-CA", { year: "numeric", month: "short", day: "numeric" });
}
