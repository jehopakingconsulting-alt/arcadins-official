import Link from "next/link";

/**
 * « Comment ça marche » — 3 étapes simples, alignées sur le parcours réel (demande
 * d'admission via un conseiller, pas de paiement en ligne au lancement). Rendu FR.
 */
const STEPS = [
  { n: "1", title: "Choisissez votre programme", desc: "Un programme officiel de langue (TEF·TCF) ou une formation professionnelle parmi nos 9 parcours." },
  { n: "2", title: "Demandez votre admission", desc: "Remplissez le formulaire de contact : un conseiller vous répond sous 24–48h ouvrables pour finaliser votre place et votre plan de paiement." },
  { n: "3", title: "Commencez votre préparation", desc: "Accédez à vos modules, exercices et à l'accompagnement pédagogique, à votre rythme et où que vous soyez." },
];

export default function HowItWorks() {
  return (
    <section className="bg-navy py-[72px] px-7 border-t border-gold/10">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Comment ça marche</p>
          <h2 className="font-[family-name:var(--font-heading)] text-[34px] md:text-[40px] text-white">
            Commencer en <em className="text-gold italic">3 étapes</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="relative bg-white/[0.04] border border-gold/16 rounded-[22px] p-8">
              <div className="w-12 h-12 rounded-full bg-gold text-navy font-[family-name:var(--font-heading)] text-xl font-bold flex items-center justify-center mb-5">
                {s.n}
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-[19px] text-white mb-2.5">{s.title}</h3>
              <p className="text-[13.5px] text-white/60 leading-[1.7]">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-navy font-bold text-[15px] px-8 py-3.5 rounded-[10px] transition-all hover:bg-gold-light hover:-translate-y-0.5">
            Demander mon admission <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
