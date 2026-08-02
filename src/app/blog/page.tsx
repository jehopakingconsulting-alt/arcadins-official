"use client";

import { useState } from "react";
import Link from "next/link";

// Contenu migré depuis la plateforme V1 (pages/blog.html) — 5 articles portés fidèlement.
// Les données chiffrées (CRS/NCLC) restent indicatives ; les avertissements « consultez canada.ca »
// sont conservés tels quels.

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-[13.5px] border-collapse">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="text-left bg-navy text-gold font-semibold px-4 py-2.5 border border-navy/10">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 ? "bg-off-white" : "bg-white"}>
              {r.map((c, j) => (
                <td key={j} className="px-4 py-2.5 border border-navy/10 text-body">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ARTICLES = [
  {
    id: "crs-francais",
    cat: "🍁 CRS & Français",
    meta: "Express Entry · Mis à jour juin 2024 · 5 min de lecture",
    title: "Comment maximiser votre score CRS grâce au français ?",
    lede: "Un NCLC 9 dans les 4 compétences du TEF ou TCF Canada peut vous rapporter jusqu'à 50 points supplémentaires dans votre score CRS Express Entry.",
    body: (
      <>
        <h3>Qu&apos;est-ce que le CRS ?</h3>
        <p>Le <strong>Comprehensive Ranking System (CRS)</strong> est le système de pointage utilisé par IRCC dans le cadre d&apos;Express Entry. Chaque candidat reçoit un score selon son âge, son niveau d&apos;études, son expérience professionnelle, ses compétences linguistiques et d&apos;autres facteurs. Les candidats ayant les scores les plus élevés reçoivent une Invitation à présenter une demande (IPD).</p>
        <h3>Quelle est la contribution du français ?</h3>
        <p>Le français est la deuxième langue officielle du Canada. IRCC accorde des points bonus significatifs aux candidats démontrant de solides compétences en français, même s&apos;ils maîtrisent déjà l&apos;anglais.</p>
        <Table head={["Niveau NCLC (4 compétences)", "Points CRS ajoutés"]} rows={[["NCLC 7 (toutes compétences)", "+16 pts"], ["NCLC 9+ (toutes compétences)", "+24 pts"]]} />
        <Table head={["Français NCLC + Anglais CLB", "Points bonus"]} rows={[["NCLC 7+ français + CLB 5+ anglais", "+25 pts"], ["NCLC 7+ français + CLB 7+ anglais", "+50 pts"]]} />
        <p className="warn">⚠️ Ces chiffres sont indicatifs et peuvent évoluer selon les mises à jour d&apos;IRCC. Consultez toujours le site officiel canada.ca pour les informations actualisées.</p>
      </>
    ),
  },
  {
    id: "tef-vs-tcf",
    cat: "📋 TEF vs TCF",
    meta: "TEF vs TCF · Mis à jour juin 2024 · 7 min de lecture",
    title: "TEF & TCF Canada : lequel choisir pour votre dossier d'immigration ?",
    lede: "Les deux tests sont reconnus par IRCC. Le choix dépend principalement de la disponibilité des centres de passage dans votre pays et de la structure du test qui vous convient le mieux.",
    body: (
      <>
        <h3>Le TEF Canada</h3>
        <p>Le Test d&apos;Évaluation de Français Canada est organisé par la CCI Paris Île-de-France. 4 épreuves obligatoires (CO, CE, EO, EE). Durée ~3h30. Résultats sous 3 à 4 semaines. Validité 2 ans.</p>
        <h3>Le TCF Canada</h3>
        <p>Le Test de Connaissance du Français pour le Canada est organisé par France Éducation international. 5 épreuves (dont la MSL). Durée ~2h30. Résultats sous 2 à 3 semaines. Validité 2 ans.</p>
        <Table head={["Critère", "TEF Canada", "TCF Canada"]} rows={[["Organisateur", "CCI Paris (CCIP)", "France Éducation international"], ["Reconnu IRCC", "✅ Oui", "✅ Oui"], ["Reconnu MIFI (Québec)", "✅ Oui", "✅ Oui"], ["Nb d'épreuves", "4", "5 (dont MSL)"], ["Durée", "~3h30", "~2h30"], ["Validité", "2 ans", "2 ans"]]} />
        <p className="warn">💡 Si votre objectif est le Québec uniquement (PEQ, PRTQ), le TCF Canada est souvent privilégié car les centres de passage sont nombreux dans les pays francophones d&apos;Afrique et du Maghreb.</p>
      </>
    ),
  },
  {
    id: "programmes-quebec",
    cat: "🏔️ Québec",
    meta: "Québec · Mis à jour juin 2024 · 6 min de lecture",
    title: "PEQ, PTQE, PRTQ : les programmes d'immigration au Québec expliqués",
    lede: "Le Québec gère sa propre immigration. Pour obtenir un Certificat de Sélection du Québec (CSQ), il faut passer par le MIFI et démontrer des compétences en français — souvent via le TCF Canada ou le TEF Canada.",
    body: (
      <>
        <h3>PEQ — Programme de l&apos;Expérience Québécoise</h3>
        <p>S&apos;adresse aux travailleurs temporaires et diplômés d&apos;établissements québécois. Traitement prioritaire, niveau de français minimal requis (généralement NCLC 7 à l&apos;oral, NCLC 5 à l&apos;écrit).</p>
        <h3>PTQE — Travailleurs Qualifiés (Expérience)</h3>
        <p>Pour les travailleurs étrangers ayant une expérience qualifiée acquise au Québec. La maîtrise du français est un atout majeur dans la sélection par points.</p>
        <h3>PRTQ — Programme Régulier des Travailleurs Qualifiés</h3>
        <p>Grille de sélection par points (âge, études, expérience, adaptabilité, français). Un score élevé au TCF/TEF Canada peut rapporter jusqu&apos;à 16 points.</p>
        <Table head={["Programme", "CO", "CE", "EO", "EE"]} rows={[["PEQ (travailleur)", "NCLC 7", "NCLC 5", "NCLC 7", "NCLC 5"], ["PEQ (diplômé QC)", "NCLC 5", "NCLC 5", "NCLC 5", "NCLC 5"], ["PRTQ (points max)", "NCLC 9+", "NCLC 9+", "NCLC 9+", "NCLC 9+"]]} />
        <p className="warn">⚠️ Les critères peuvent évoluer. Consultez toujours le site officiel du MIFI (immigration-quebec.gouv.qc.ca) pour les informations actualisées.</p>
      </>
    ),
  },
  {
    id: "echelle-nclc",
    cat: "📊 Scores NCLC",
    meta: "Scores NCLC · Mis à jour juin 2024 · 4 min de lecture",
    title: "Comment fonctionne l'échelle NCLC et quel score viser ?",
    lede: "Le NCLC (Niveaux de Compétence Linguistique Canadiens) va de 1 à 12. Pour Express Entry, les niveaux clés sont NCLC 5, 7, 9 et 10+. Chaque palier correspond à des points CRS supplémentaires.",
    body: (
      <>
        <p>Le NCLC évalue 4 compétences séparément : Compréhension Orale (CO), Compréhension Écrite (CE), Expression Orale (EO) et Expression Écrite (EE). Chaque compétence reçoit un score indépendant.</p>
        <Table head={["NCLC", "Équivalent CECRL", "Description"]} rows={[["NCLC 4–5", "B1", "Intermédiaire — Communication quotidienne"], ["NCLC 6–7", "B2", "Avancé — Autonomie professionnelle"], ["NCLC 8–9", "C1", "Courant — Maîtrise avancée"], ["NCLC 10–12", "C2", "Expert — Niveau quasi-natif"]]} />
        <h3>Quel NCLC viser ?</h3>
        <p><strong>Express Entry :</strong> minimum NCLC 7 dans les 4 compétences pour recevoir des points ; NCLC 9 maximise le bonus. <strong>Travailleurs Qualifiés Fédéraux :</strong> minimum NCLC 7. <strong>Expérience Canadienne :</strong> NCLC 5 (NOC TEER 2-3) ou NCLC 7 (NOC TEER 0-1). <strong>PEQ Québec :</strong> NCLC 7 (CO/EO) et NCLC 5 (CE/EE).</p>
      </>
    ),
  },
  {
    id: "preparer-8-semaines",
    cat: "⏱️ Se préparer",
    meta: "Préparation · Mis à jour juin 2024 · 5 min de lecture",
    title: "Comment bien se préparer au TEF & TCF Canada en 8 semaines ?",
    lede: "8 semaines à raison d'1h30 par jour suffisent pour passer de NCLC 5-6 à NCLC 7-8, à condition de suivre un plan structuré et ciblé.",
    body: (
      <>
        <h3>Semaine 1–2 : Évaluation et fondations</h3>
        <p>Test de niveau pour identifier vos points faibles · révision de la grammaire essentielle (subjonctif, conditionnel, accord du participe) · vocabulaire lié à l&apos;immigration (50 mots/jour).</p>
        <h3>Semaine 3–4 : Compréhension orale et écrite</h3>
        <p>Exercices quotidiens d&apos;écoute (dialogues, monologues, annonces) · lecture de textes informatifs, publicitaires et administratifs · techniques de repérage et de lecture rapide.</p>
        <h3>Semaine 5–6 : Expression écrite et orale</h3>
        <p>Rédaction de lettres formelles et de textes argumentatifs · entraînement à la prise de parole chronométrée (2–3 min) · correction des productions (plan VIP).</p>
        <h3>Semaine 7–8 : Simulations et stratégies finales</h3>
        <p>2 simulations chronométrées complètes par semaine · analyse des erreurs et travail ciblé · gestion du stress et préparation mentale.</p>
        <p className="warn">💡 Le secret : régularité &gt; intensité. 1h30 tous les jours vaut mieux que 6h le week-end.</p>
      </>
    ),
  },
];

export default function BlogPage() {
  const [open, setOpen] = useState<string | null>(ARTICLES[0].id);

  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20">
      <div className="max-w-[860px] mx-auto px-7">
        {/* Hero */}
        <div className="mb-10">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold-ink mb-2.5">📚 Ressources &amp; Conseils</p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl text-navy mb-4">Blog ARCADINS — Immigration Canada</h1>
          <p className="text-[17px] text-muted max-w-[640px] leading-[1.75]">
            Guides pratiques, astuces TEF/TCF, actualités IRCC et stratégies pour réussir votre projet d&apos;immigration.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {ARTICLES.map((a) => (
              <button key={a.id} onClick={() => { setOpen(a.id); document.getElementById(a.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="text-[12.5px] font-semibold bg-white border border-gold/20 text-navy px-3.5 py-1.5 rounded-full transition-all hover:bg-gold/10">
                {a.cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="flex flex-col gap-5">
          {ARTICLES.map((a) => {
            const isOpen = open === a.id;
            return (
              <article key={a.id} id={a.id} className="bg-white rounded-[20px] border border-gold/15 overflow-hidden scroll-mt-28">
                <button onClick={() => setOpen(isOpen ? null : a.id)} aria-expanded={isOpen} className="w-full text-left px-7 py-6 transition-colors hover:bg-gold/5">
                  <div className="text-[11px] font-bold tracking-[2px] uppercase text-gold-ink mb-1">{a.cat}</div>
                  <h2 className="font-[family-name:var(--font-heading)] text-[21px] text-navy leading-[1.3] mb-1">{a.title}</h2>
                  <div className="text-[12px] text-muted">{a.meta}</div>
                </button>
                {isOpen && (
                  <div className="px-7 pb-8 blog-body">
                    <p className="bg-gold/8 border-l-4 border-gold rounded-r-lg px-4 py-3 text-[14px] text-navy leading-[1.7] mb-5">💡 {a.lede}</p>
                    {a.body}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-navy rounded-[24px] p-9 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-white mb-3">Prêt à passer à l&apos;action ?</h2>
          <p className="text-white/55 text-[15px] mb-6">Commencez par un test de niveau et découvrez votre niveau NCLC actuel.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/examens" className="bg-gold text-navy font-bold text-[15px] px-7 py-3.5 rounded-[10px] transition-all hover:bg-gold-light hover:-translate-y-0.5">🎯 Test d&apos;essai</Link>
            <Link href="/tarifs" className="border border-gold/40 text-gold font-bold text-[15px] px-7 py-3.5 rounded-[10px] transition-all hover:bg-gold/10">💰 Voir les tarifs</Link>
          </div>
        </div>
      </div>

      <style>{`
        .blog-body h3 { font-family: var(--font-heading); font-size: 17px; color: #0D1B2E; margin: 22px 0 8px; }
        .blog-body p { color: #2C3E5A; font-size: 14.5px; line-height: 1.8; margin-bottom: 12px; }
        .blog-body p.warn { background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.2); border-radius: 10px; padding: 12px 16px; font-size: 13px; }
        .blog-body strong { color: #0D1B2E; }
      `}</style>
    </div>
  );
}
