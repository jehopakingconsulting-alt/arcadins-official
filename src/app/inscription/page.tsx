"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { parseEnrollmentForm } from "@/lib/commerce/enrollment-session";
import { isProgramCode } from "@/lib/commerce/program-commerce";

// Formulaire d'inscription (parcours self-service TEF/TCF). Réf. V1 « Commencer
// maintenant — Accès immédiat ». Crée une session serveur puis redirige vers les
// forfaits. Aucune donnée perso dans l'URL. Jamais de renvoi vers /contact.

const OBJECTIVE_OPTS: { value: string; label: string }[] = [
  { value: "immigration-federal", label: "Immigration fédérale (Entrée express)" },
  { value: "immigration-quebec", label: "Immigration Québec (PEQ / MIFI)" },
  { value: "etudes", label: "Études en milieu francophone" },
  { value: "travail", label: "Travail au Canada" },
  { value: "citoyennete", label: "Citoyenneté canadienne" },
  { value: "autre", label: "Autre" },
];
const LEVEL_OPTS: { value: string; label: string }[] = [
  { value: "debutant", label: "Débutant (A1–A2)" },
  { value: "intermediaire", label: "Intermédiaire (B1)" },
  { value: "avance", label: "Avancé (B2)" },
  { value: "superieur", label: "Supérieur (C1–C2)" },
  { value: "inconnu", label: "Je ne sais pas" },
];
const PROGRAM_OPTS: { value: string; label: string }[] = [
  { value: "tef-canada", label: "TEF Canada" },
  { value: "tcf-canada", label: "TCF Canada" },
];
const PACKAGE_OPTS: { value: string; label: string }[] = [
  { value: "later", label: "Je choisirai à l'étape suivante" },
  { value: "starter", label: "Starter" },
  { value: "essential", label: "Essential" },
  { value: "premium", label: "Premium" },
  { value: "vip", label: "VIP" },
];

const inputCls =
  "w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-white bg-white/[0.04] outline-none focus:border-gold transition-all";
const labelCls = "block text-[12.5px] font-semibold text-white/80 mb-1.5";
const errCls = "text-[12px] text-red-300 mt-1";

function InscriptionInner() {
  const params = useSearchParams();
  const router = useRouter();
  const presetProgram = isProgramCode(params.get("program") || "") ? (params.get("program") as string) : "tef-canada";

  const [values, setValues] = useState<Record<string, string | boolean>>({
    fullName: "", email: "", phone: "", country: "", objective: "immigration-federal",
    frenchLevel: "inconnu", program: presetProgram, packageChoice: "later",
    acceptTerms: false, newsletter: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function set(name: string, value: string | boolean) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(null);
    // Validation locale (mêmes règles que le serveur).
    const parsed = parseEnrollmentForm(values);
    if (!parsed.ok) {
      setErrors(parsed.errors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/inscription/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.status === 404) {
        setNotice("Les inscriptions en ligne seront activées très prochainement.");
        setSubmitting(false);
        return;
      }
      if (res.status === 422) {
        const data = await res.json();
        setErrors(data.fields || {});
        setSubmitting(false);
        return;
      }
      if (!res.ok) {
        setNotice("Une erreur est survenue. Merci de réessayer.");
        setSubmitting(false);
        return;
      }
      const { next } = await res.json();
      router.push(next);
    } catch {
      setNotice("Connexion impossible. Merci de réessayer.");
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-navy min-h-screen pt-32 pb-20">
      <div className="max-w-[760px] mx-auto px-7">
        <div className="text-center mb-8">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Inscription · Programmes officiels</p>
          <h1 className="font-[family-name:var(--font-heading)] text-[32px] md:text-[38px] text-white mb-2">Commencez votre préparation</h1>
          <p className="text-[14.5px] text-white/55">Renseignez votre profil, choisissez votre forfait, et accédez immédiatement à votre programme après paiement.</p>
        </div>

        {notice && (
          <div className="mb-6 bg-white/[0.06] border border-gold/30 rounded-2xl p-4 text-center text-[14px] text-white/80">{notice}</div>
        )}

        <form onSubmit={onSubmit} noValidate className="bg-white/[0.03] border border-gold/16 rounded-[24px] p-7 md:p-9 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className={labelCls}>Nom complet *</label>
              <input id="fullName" name="fullName" type="text" autoComplete="name" placeholder="Jean Dupont" className={inputCls}
                value={values.fullName as string} onChange={(e) => set("fullName", e.target.value)} aria-invalid={!!errors.fullName} />
              {errors.fullName && <p className={errCls}>{errors.fullName}</p>}
            </div>
            <div>
              <label htmlFor="email" className={labelCls}>Adresse email *</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="jean@email.com" className={inputCls}
                value={values.email as string} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} />
              {errors.email && <p className={errCls}>{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className={labelCls}>Téléphone / WhatsApp *</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 514 000 0000" className={inputCls}
                value={values.phone as string} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} />
              {errors.phone && <p className={errCls}>{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="country" className={labelCls}>Pays de résidence *</label>
              <input id="country" name="country" type="text" autoComplete="country-name" placeholder="Canada" className={inputCls}
                value={values.country as string} onChange={(e) => set("country", e.target.value)} aria-invalid={!!errors.country} />
              {errors.country && <p className={errCls}>{errors.country}</p>}
            </div>
            <div>
              <label htmlFor="objective" className={labelCls}>Objectif principal *</label>
              <select id="objective" name="objective" className={inputCls} value={values.objective as string} onChange={(e) => set("objective", e.target.value)}>
                {OBJECTIVE_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="frenchLevel" className={labelCls}>Niveau actuel en français *</label>
              <select id="frenchLevel" name="frenchLevel" className={inputCls} value={values.frenchLevel as string} onChange={(e) => set("frenchLevel", e.target.value)}>
                {LEVEL_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="program" className={labelCls}>Programme visé *</label>
              <select id="program" name="program" className={inputCls} value={values.program as string} onChange={(e) => set("program", e.target.value)}>
                {PROGRAM_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="packageChoice" className={labelCls}>Forfait souhaité</label>
              <select id="packageChoice" name="packageChoice" className={inputCls} value={values.packageChoice as string} onChange={(e) => set("packageChoice", e.target.value)}>
                {PACKAGE_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          <label className="flex items-start gap-3 mt-2 cursor-pointer">
            <input type="checkbox" checked={values.acceptTerms as boolean} onChange={(e) => set("acceptTerms", e.target.checked)} className="mt-1 accent-[#C9A84C]" aria-invalid={!!errors.acceptTerms} />
            <span className="text-[12.5px] text-white/70 leading-[1.6]">
              J&apos;accepte les <Link href="/conditions" className="text-gold hover:underline">Conditions d&apos;utilisation</Link> et la{" "}
              <Link href="/confidentialite" className="text-gold hover:underline">Politique de confidentialité</Link>. *
            </span>
          </label>
          {errors.acceptTerms && <p className={errCls}>{errors.acceptTerms}</p>}

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={values.newsletter as boolean} onChange={(e) => set("newsletter", e.target.checked)} className="mt-1 accent-[#C9A84C]" />
            <span className="text-[12.5px] text-white/55 leading-[1.6]">Je souhaite recevoir la newsletter ARCADINS (conseils TEF/TCF, actualités IRCC). <span className="text-white/35">Optionnel.</span></span>
          </label>

          <button type="submit" disabled={submitting} className="mt-3 w-full bg-gold text-navy font-bold text-[15px] py-3.5 rounded-xl transition-all hover:bg-gold-light disabled:opacity-60">
            {submitting ? "Traitement…" : "Continuer vers les forfaits →"}
          </button>
          <p className="text-center text-[12px] text-white/40">
            Déjà un compte ? <Link href="/auth/login" className="text-gold hover:underline">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function InscriptionPage() {
  return (
    <Suspense fallback={<div className="bg-navy min-h-screen" />}>
      <InscriptionInner />
    </Suspense>
  );
}
