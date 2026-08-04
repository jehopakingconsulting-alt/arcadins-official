"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getFormationOffer,
  getFormationPaymentOptions,
  FORMATION_REGISTRATION_FEE_CENTS,
  type FormationPlanId,
} from "@/lib/commerce/formation-commerce";

// Sélection de la MODALITÉ DE PAIEMENT d'une formation (Département B) :
// 1 versement (carte ou BNPL) · 3 versements · 6 versements. Prix indicatif ;
// l'autorité reste le serveur (/api/checkout/formation).

const cad = (cents: number) =>
  new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 0 }).format(cents / 100);

function FormationPaymentInner() {
  const params = useSearchParams();
  const router = useRouter();
  const slug = params.get("slug") || "";
  const offer = getFormationOffer(slug);
  const options = getFormationPaymentOptions(slug);

  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!offer || !options) {
    return (
      <div className="bg-navy min-h-screen pt-32 pb-20 text-center px-7">
        <p className="text-white/70">Formation introuvable. <Link href="/formations" className="text-gold hover:underline">Voir les formations →</Link></p>
      </div>
    );
  }

  async function choose(planId: FormationPlanId) {
    setError(null); setPending(planId);
    try {
      const res = await fetch("/api/checkout/formation", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, planId }),
      });
      if (res.status === 401) { const d = await res.json(); router.push(d.redirect || "/auth/login"); return; }
      if (res.status === 404) { setError("Le paiement en ligne sera activé très prochainement."); setPending(null); return; }
      if (!res.ok) { setError("Une erreur est survenue. Merci de réessayer."); setPending(null); return; }
      const { url } = await res.json();
      if (url) window.location.assign(url); else { setError("Session indisponible."); setPending(null); }
    } catch { setError("Connexion impossible."); setPending(null); }
  }

  return (
    <div className="bg-navy min-h-screen pt-32 pb-20">
      <div className="max-w-[980px] mx-auto px-7">
        <div className="text-center mb-9">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Inscription · Formation professionnelle</p>
          <h1 className="font-[family-name:var(--font-heading)] text-[30px] md:text-[36px] text-white mb-2">{offer.name}</h1>
          <p className="text-[15px] text-white/55 max-w-[620px] mx-auto">Choisissez votre modalité de paiement — accès immédiat après le premier paiement.</p>
        </div>

        {error && (
          <div className="max-w-[680px] mx-auto mb-7 bg-white/[0.06] border border-gold/30 rounded-2xl p-4 text-center text-[14px] text-white/80">
            {error} <Link href="/contact" className="text-gold hover:underline">Nous contacter →</Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {options.map((o) => (
            <div key={o.id} className={`flex flex-col bg-white/[0.04] border rounded-[22px] p-6 ${o.id === "full" ? "border-gold/50 ring-1 ring-gold/25" : "border-gold/17"}`}>
              <div className="font-[family-name:var(--font-heading)] text-[19px] text-white mb-1">{o.label}</div>
              {o.id === "full" ? (
                <div className="text-[30px] font-bold text-gold mb-1">{cad(offer.amountCents)}</div>
              ) : (
                <div className="text-[30px] font-bold text-gold mb-1">{cad(o.perInstallmentCents)}<span className="text-[14px] text-white/50 font-normal"> /mois × {o.installments}</span></div>
              )}
              <div className="text-[12px] text-white/45 mb-4">+ {cad(FORMATION_REGISTRATION_FEE_CENTS)} frais d&apos;inscription unique (si non déjà réglés)</div>
              <p className="text-[13px] text-white/60 leading-[1.6] flex-1 mb-5">{o.description}</p>
              {o.bnplEligible && (
                <div className="text-[11px] text-white/50 mb-3 leading-[1.5]">💳 Ou financez avec <strong className="text-white/70">Klarna · Affirm · Afterpay</strong> (selon éligibilité).</div>
              )}
              <button
                onClick={() => choose(o.id)}
                disabled={pending !== null}
                className={`w-full py-3 rounded-[10px] font-bold text-[14px] transition-all disabled:opacity-60 ${o.id === "full" ? "bg-gold text-navy hover:bg-gold-light" : "bg-white/8 text-white border border-gold/30 hover:bg-gold/15"}`}
              >
                {pending === o.id ? "Redirection…" : "Choisir cette option"}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-[12.5px] text-white/40 mt-8">
          Paiement sécurisé Stripe · Accès immédiat · Versements : accès suspendu en cas de défaut, rétabli au paiement · Satisfait ou remboursé sous 7 jours.
        </p>
      </div>
    </div>
  );
}

export default function FormationPaymentPage() {
  return (
    <Suspense fallback={<div className="bg-navy min-h-screen" />}>
      <FormationPaymentInner />
    </Suspense>
  );
}
