import Icon, { type IconName } from "@/components/ui/Icon";

/**
 * « Pourquoi choisir ARCADINS ? » — 6 arguments de confiance, factuels et vérifiables
 * (aucune promesse de visa ni statistique non prouvée). Rendu FR (lancement français).
 */
const REASONS: { icon: IconName; title: string; desc: string }[] = [
  { icon: "clipboard", title: "Spécialiste TEF & TCF Canada", desc: "Une préparation ciblée pour l'immigration au Canada et au Québec — pas une plateforme généraliste." },
  { icon: "cap", title: "Deux départements clairs", desc: "Programmes officiels de langue (TEF·TCF·TFI·DELF·DALF) et Formations professionnelles, chacun avec son parcours." },
  { icon: "chart", title: "Pédagogie structurée", desc: "72 modules organisés par compétence et par niveau, avec exercices corrigés et simulations proches du réel." },
  { icon: "globe", title: "Accessible partout", desc: "100% en ligne, disponible 24h/24 depuis n'importe quel pays et sur tous vos appareils." },
  { icon: "star", title: "Transparence totale", desc: "Nous ne promettons pas de visa. Nous vous offrons la meilleure préparation possible et une attestation de complétion." },
  { icon: "chat", title: "Accompagnement humain", desc: "Des conseillers et des tuteurs pour vous guider à chaque étape de votre parcours." },
];

export default function WhyChoose() {
  return (
    <section className="bg-off-white py-[72px] px-7">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-11">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Pourquoi ARCADINS</p>
          <h2 className="font-[family-name:var(--font-heading)] text-[34px] md:text-[40px] text-navy">
            Pourquoi choisir <em className="text-gold italic">ARCADINS ?</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((r) => (
            <div key={r.title} className="bg-white border border-gold/14 rounded-[20px] p-7 transition-all hover:border-gold/40 hover:shadow-[0_12px_34px_rgba(13,27,46,0.08)]">
              <div className="w-12 h-12 rounded-xl bg-navy text-gold flex items-center justify-center mb-4">
                <Icon name={r.icon} size={22} />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-[18px] text-navy mb-2 leading-snug">{r.title}</h3>
              <p className="text-[13.5px] text-muted leading-[1.7]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
