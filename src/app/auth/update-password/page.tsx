"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import PasswordField from "@/components/ui/PasswordField";

// Définition d'un nouveau mot de passe après clic sur le lien de récupération.
// Supabase établit une session « recovery » via le lien ; on met à jour le mot de passe.
export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const router = useRouter();

  // Vérifie qu'une session (recovery) est bien active à l'arrivée depuis l'email.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      if (!cancelled) setReady(Boolean(data.session));
    })();
    return () => { cancelled = true; };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) { setError("Le mot de passe doit contenir au moins 8 caractères."); return; }
    if (password !== confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    setStatus("saving");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) { setError(error.message); setStatus("idle"); return; }
      setStatus("done");
      setTimeout(() => { router.push("/dashboard"); router.refresh(); }, 1500);
    } catch {
      setError("Une erreur est survenue. Merci de réessayer.");
      setStatus("idle");
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6 pt-32 pb-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-white mb-3">Nouveau mot de passe</h1>
          <p className="text-white/50 text-[15px]">Choisissez un nouveau mot de passe pour votre compte.</p>
        </div>

        {status === "done" ? (
          <div className="bg-white rounded-[28px] p-10 border border-gold/17 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-3">Mot de passe mis à jour</h2>
            <p className="text-[14.5px] text-body">Redirection vers votre espace…</p>
          </div>
        ) : !ready ? (
          <div className="bg-white rounded-[28px] p-10 border border-gold/17 text-center">
            <p className="text-[14.5px] text-body leading-[1.7] mb-6">
              Ce lien de réinitialisation est invalide ou expiré. Veuillez redemander un lien.
            </p>
            <Link href="/auth/reset-password" className="inline-block bg-navy text-gold font-bold text-[14.5px] px-7 py-3 rounded-xl transition-all hover:bg-navy-mid">Redemander un lien</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-[28px] p-10 shadow-[0_8px_40px_rgba(13,27,46,0.07)] border border-gold/17">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-6">{error}</div>}
            <div className="mb-4">
              <PasswordField label="Nouveau mot de passe" value={password} onChange={setPassword} required minLength={8} autoComplete="new-password" />
            </div>
            <div className="mb-6">
              <PasswordField label="Confirmer le mot de passe" value={confirm} onChange={setConfirm} required minLength={8} autoComplete="new-password" />
            </div>
            <button type="submit" disabled={status === "saving"} className="w-full py-3.5 bg-navy text-gold font-bold text-[15px] rounded-xl transition-all hover:bg-navy-mid hover:-translate-y-0.5 disabled:opacity-50">
              {status === "saving" ? "Enregistrement…" : "Mettre à jour mon mot de passe"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
