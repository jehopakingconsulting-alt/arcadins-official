"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PROGRAM_NAMES, isProgramCode } from "@/lib/commerce/program-commerce";
import { resolveFirstLesson } from "@/lib/commerce/access";

// Page de succès À VÉRIFICATION SERVEUR : ne fait JAMAIS confiance à l'URL comme preuve
// de paiement. Interroge /api/inscription/status (autorité serveur) et poll un temps
// limité tant que le webhook n'a pas créé l'entitlement.

type State =
  | "loading" | "access_active" | "activation_pending" | "payment_pending"
  | "payment_failed" | "payment_cancelled" | "session_expired" | "account_mismatch" | "support_required";

interface StatusResp {
  state: string;
  program?: string;
  packageKey?: string;
  accessExpiresAt?: string | null;
  /** « formation » pour une formation professionnelle (sinon programme officiel). */
  type?: string;
  /** Nom lisible renvoyé par le serveur pour les formations. */
  programName?: string;
}

function SuccesInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState<State>("loading");
  const [info, setInfo] = useState<StatusResp | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Vérification serveur + poll limité (~10 tentatives) tant que l'activation est
  // en attente. Tout setState vit dans la fonction async (jamais synchrone dans l'effet).
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    async function poll() {
      if (!sessionId) { if (!cancelled) setState("support_required"); return; }
      try {
        const res = await fetch(`/api/inscription/status?session_id=${encodeURIComponent(sessionId)}`);
        const data: StatusResp = await res.json();
        if (cancelled) return;
        setInfo(data);
        setState((data.state as State) || "support_required");
        if (data.state === "activation_pending" && attempts < 10) {
          attempts += 1;
          setTimeout(poll, 3000);
        }
      } catch {
        if (!cancelled) setState("support_required");
      }
    }
    poll();
    return () => { cancelled = true; };
  }, [sessionId, refreshKey]);

  // Deux familles d'achat : Programmes officiels (TEF/TCF, code connu) et
  // Formations professionnelles (slug libre). On ne suppose plus que tout achat
  // est un programme officiel — sinon le nom et le lien d'accès restaient vides.
  const isFormation = info?.type === "formation";
  const program = info?.program && isProgramCode(info.program) ? info.program : null;
  const programName = info?.programName || (program ? PROGRAM_NAMES[program] : "votre programme");
  const target = isFormation && info?.program
    ? { firstLesson: `/formations/${info.program}/learn` }
    : program
      ? resolveFirstLesson(program)
      : null;

  return (
    <div className="bg-navy min-h-screen pt-32 pb-20">
      <div className="max-w-[640px] mx-auto px-7 text-center">
        {state === "loading" && <p className="text-white/60 text-[15px]">Vérification de votre paiement…</p>}

        {state === "access_active" && (
          <div className="bg-white/[0.04] border border-gold/25 rounded-[28px] p-10">
            <div className="text-5xl mb-4">✅</div>
            <h1 className="font-[family-name:var(--font-heading)] text-[30px] text-white mb-3">Paiement confirmé — accès activé</h1>
            <p className="text-white/65 text-[15px] mb-2">Votre inscription à <strong className="text-white">{programName}</strong> est active{info?.packageKey ? ` (forfait ${info.packageKey})` : ""}.</p>
            {info?.accessExpiresAt && <p className="text-white/45 text-[13px] mb-6">Accès valable jusqu&apos;au {new Date(info.accessExpiresAt).toLocaleDateString("fr-CA")}.</p>}
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <Link href={target?.firstLesson || "/dashboard"} className="bg-gold text-navy font-bold text-[15px] px-8 py-3.5 rounded-[10px] hover:bg-gold-light transition-all">Accéder à mon programme →</Link>
              <Link href="/dashboard" className="bg-transparent text-white font-semibold text-[15px] px-7 py-3.5 rounded-[10px] border-[1.5px] border-white/28 hover:border-gold hover:text-gold transition-all">Mon tableau de bord</Link>
            </div>
          </div>
        )}

        {state === "activation_pending" && (
          <div className="bg-white/[0.04] border border-gold/20 rounded-[28px] p-10">
            <div className="text-5xl mb-4 animate-pulse">⏳</div>
            <h1 className="font-[family-name:var(--font-heading)] text-[26px] text-white mb-3">Votre paiement est confirmé. Nous activons votre accès.</h1>
            <p className="text-white/55 text-[14px]">Cela prend généralement quelques secondes. Cette page se met à jour automatiquement…</p>
            <button onClick={() => setRefreshKey((k) => k + 1)} className="mt-6 text-gold font-semibold text-[14px] hover:underline">Rafraîchir maintenant</button>
          </div>
        )}

        {(state === "payment_pending" || state === "payment_failed" || state === "payment_cancelled") && (
          <div className="bg-white/[0.04] border border-white/12 rounded-[28px] p-10">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="font-[family-name:var(--font-heading)] text-[26px] text-white mb-3">Paiement non finalisé</h1>
            <p className="text-white/55 text-[14px] mb-6">Aucun accès payant n&apos;a été activé. Vous pouvez réessayer votre inscription.</p>
            <Link href="/inscription" className="bg-gold text-navy font-bold text-[15px] px-7 py-3.5 rounded-[10px] hover:bg-gold-light transition-all">Reprendre mon inscription</Link>
          </div>
        )}

        {(state === "account_mismatch" || state === "session_expired") && (
          <div className="bg-white/[0.04] border border-white/12 rounded-[28px] p-10">
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="font-[family-name:var(--font-heading)] text-[24px] text-white mb-3">Connectez-vous pour voir votre accès</h1>
            <p className="text-white/55 text-[14px] mb-6">Votre session a expiré ou ne correspond pas au compte connecté.</p>
            <Link href="/auth/login" className="bg-gold text-navy font-bold text-[15px] px-7 py-3.5 rounded-[10px] hover:bg-gold-light transition-all">Se connecter</Link>
          </div>
        )}

        {state === "support_required" && (
          <div className="bg-white/[0.04] border border-white/12 rounded-[28px] p-10">
            <div className="text-5xl mb-4">💬</div>
            <h1 className="font-[family-name:var(--font-heading)] text-[24px] text-white mb-3">Besoin d&apos;aide ?</h1>
            <p className="text-white/55 text-[14px] mb-6">Nous n&apos;avons pas pu confirmer l&apos;état de votre inscription. Notre équipe peut vous aider.</p>
            <Link href="/contact" className="bg-gold text-navy font-bold text-[15px] px-7 py-3.5 rounded-[10px] hover:bg-gold-light transition-all">Contacter le support</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SuccesPage() {
  return (
    <Suspense fallback={<div className="bg-navy min-h-screen" />}>
      <SuccesInner />
    </Suspense>
  );
}
