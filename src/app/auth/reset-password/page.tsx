"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// Récupération de mot de passe — demande du lien de réinitialisation (Supabase Auth).
// Fiabilité/UX : supprime le verrouillage définitif des comptes. Aucune migration,
// aucun flag ; utilise la configuration Supabase déjà en place. Réponse volontairement
// neutre (ne révèle pas si l'email existe → anti-énumération de comptes).
export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("sending");
    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/update-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
      // On affiche toujours l'état « envoyé » (neutre) même en cas d'email inconnu.
      if (error && error.status && error.status >= 500) {
        setError("Une erreur est survenue. Merci de réessayer.");
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Connexion impossible. Merci de réessayer.");
      setStatus("idle");
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6 pt-32 pb-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-white mb-3">Mot de passe oublié</h1>
          <p className="text-white/50 text-[15px]">Entrez votre courriel : nous vous enverrons un lien de réinitialisation.</p>
        </div>

        {status === "sent" ? (
          <div className="bg-white rounded-[28px] p-10 border border-gold/17 text-center">
            <div className="text-4xl mb-4">📧</div>
            <h2 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-3">Vérifiez votre boîte mail</h2>
            <p className="text-[14.5px] text-body leading-[1.7] mb-6">
              Si un compte existe pour <strong>{email}</strong>, vous recevrez un lien pour réinitialiser votre mot de passe dans quelques minutes. Pensez à vérifier vos courriers indésirables.
            </p>
            <Link href="/auth/login" className="inline-block bg-navy text-gold font-bold text-[14.5px] px-7 py-3 rounded-xl transition-all hover:bg-navy-mid">Retour à la connexion</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-[28px] p-10 shadow-[0_8px_40px_rgba(13,27,46,0.07)] border border-gold/17">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-6">{error}</div>}
            <div className="mb-6">
              <label htmlFor="reset-email" className="block text-[12.5px] font-semibold text-body mb-1.5">Adresse courriel</label>
              <input id="reset-email" type="email" required aria-label="Adresse courriel" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" className="w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white" />
            </div>
            <button type="submit" disabled={status === "sending"} className="w-full py-3.5 bg-navy text-gold font-bold text-[15px] rounded-xl transition-all hover:bg-navy-mid hover:-translate-y-0.5 disabled:opacity-50">
              {status === "sending" ? "Envoi…" : "Envoyer le lien de réinitialisation"}
            </button>
            <p className="text-center text-sm text-muted mt-6">
              <Link href="/auth/login" className="text-gold font-semibold hover:underline">← Retour à la connexion</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
