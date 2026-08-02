"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  PROGRAM_OFFERS,
  PROGRAM_NAMES,
  getProgramGrants,
  isProgramCode,
  type EntitlementGrant,
} from "@/lib/commerce/program-commerce";

// Page de SÉLECTION DE FORFAIT (parcours self-service TEF/TCF). Étape après le
// formulaire d'inscription : PROGRAMME → FORFAIT → compte → paiement Stripe.
// Le prix affiché est INDICATIF ; l'autorité reste le serveur (program-commerce).
// Les frais d'inscription globaux ($100) ne sont facturés qu'UNE fois par étudiant :
// le montant réel dû est calculé au checkout côté serveur.

const usd = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(cents / 100);

/** Traduit les grants confirmés en libellés lisibles (services inclus). */
function grantLabels(program: string, packageKey: string): string[] {
  const grants = getProgramGrants(program, packageKey);
  if (!grants) return [];
  const out: string[] = [];
  for (const g of grants as EntitlementGrant[]) {
    switch (g.type) {
      case "product_access":
        out.push(`Accès complet ${PROGRAM_NAMES[program as "tef-canada" | "tcf-canada"]} · ${g.weeks} semaines`);
        break;
      case "mock_exam_pack":
        out.push(`${g.attempts} simulation${g.attempts > 1 ? "s" : ""} d'examen`);
        break;
      case "coaching_hours":
        out.push(`${g.hours} h de coaching individuel`);
        break;
      case "tutoring_sessions":
        out.push(`${g.sessions} séance${g.sessions > 1 ? "s" : ""} de tutorat`);
        break;
      case "ai_assistant":
        out.push("Assistant IA (illimité)");
        break;
      case "downloadable_resources":
        out.push("Ressources téléchargeables");
        break;
      case "support_level":
        out.push(g.level === "vip" ? "Support VIP" : g.level === "priority" ? "Support prioritaire" : "Support par email");
        break;
    }
  }
  return out;
}

function ForfaitsInner() {
  const params = useSearchParams();
  const router = useRouter();
  const sessionRef = params.get("session");
  const rawProgram = params.get("program") || "tef-canada";
  const program = isProgramCode(rawProgram) ? rawProgram : "tef-canada";
  const offers = PROGRAM_OFFERS[program];

  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function choose(packageKey: string) {
    setError(null);
    setPending(packageKey);
    try {
      const res = await fetch("/api/checkout/program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ program, packageKey, sessionRef }),
      });
      if (res.status === 401) {
        const data = await res.json();
        router.push(data.redirect || "/auth/login");
        return;
      }
      if (res.status === 404) {
        setError("Le paiement en ligne sera activé très prochainement. Contactez-nous pour finaliser votre inscription.");
        setPending(null);
        return;
      }
      if (!res.ok) {
        setError("Une erreur est survenue. Merci de réessayer.");
        setPending(null);
        return;
      }
      const { url } = await res.json();
      if (url) window.location.assign(url);
      else { setError("Session de paiement indisponible."); setPending(null); }
    } catch {
      setError("Connexion impossible. Merci de réessayer.");
      setPending(null);
    }
  }

  return (
    <div className="bg-navy min-h-screen pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Programmes officiels · {PROGRAM_NAMES[program]}</p>
          <h1 className="font-[family-name:var(--font-heading)] text-[34px] md:text-[40px] text-white mb-3">Choisissez votre forfait</h1>
          <p className="text-[15px] text-white/55 max-w-[620px] mx-auto">
            Accès immédiat après paiement. Les frais d&apos;inscription ARCADINS (100 $, uniques) ne sont facturés
            qu&apos;une seule fois par étudiant, tous programmes confondus.
          </p>
        </div>

        {error && (
          <div className="max-w-[720px] mx-auto mb-8 bg-white/[0.06] border border-gold/30 rounded-2xl p-5 text-center">
            <p className="text-[14px] text-white/80">{error}</p>
            <Link href="/contact" className="inline-block mt-3 text-gold font-semibold text-[14px] hover:underline">Nous contacter →</Link>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {offers.map((o) => {
            const popular = o.packageKey === "essential";
            return (
              <div
                key={o.packageKey}
                className={`flex flex-col bg-white/[0.04] border rounded-[22px] p-6 ${popular ? "border-gold/55 ring-1 ring-gold/30" : "border-gold/17"}`}
              >
                {popular && <div className="self-start text-[10px] font-bold tracking-[1.5px] uppercase text-navy bg-gold rounded-full px-3 py-1 mb-3">Le plus choisi</div>}
                <div className="font-[family-name:var(--font-heading)] text-[20px] text-white mb-1">{o.name}</div>
                <div className="text-[32px] font-bold text-gold mb-1">{usd(o.amountCents)}</div>
                <div className="text-[12px] text-white/45 mb-4">Paiement unique · accès {o.accessWeeks} semaines</div>
                <ul className="flex flex-col gap-2 mb-5 flex-1">
                  {grantLabels(program, o.packageKey).map((l) => (
                    <li key={l} className="flex items-start gap-2 text-[12.5px] text-white/70 leading-[1.5]">
                      <span className="text-gold shrink-0 mt-0.5">✓</span>{l}
                    </li>
                  ))}
                </ul>
                <div className="text-[11px] text-white/40 mb-3">+ 100 $ frais d&apos;inscription unique (si non déjà réglés)</div>
                <button
                  onClick={() => choose(o.packageKey)}
                  disabled={pending !== null}
                  className={`w-full py-3 rounded-[10px] font-bold text-[14px] transition-all ${popular ? "bg-gold text-navy hover:bg-gold-light" : "bg-white/8 text-white border border-gold/30 hover:bg-gold/15"} disabled:opacity-60`}
                >
                  {pending === o.packageKey ? "Redirection…" : "Choisir ce forfait"}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[12.5px] text-white/40 mt-8">
          Paiement sécurisé Stripe · Accès immédiat · Satisfait ou remboursé sous 7 jours ·{" "}
          <Link href="/contact" className="text-gold hover:underline">une question ?</Link>
        </p>
      </div>
    </div>
  );
}

export default function ForfaitsPage() {
  return (
    <Suspense fallback={<div className="bg-navy min-h-screen" />}>
      <ForfaitsInner />
    </Suspense>
  );
}
