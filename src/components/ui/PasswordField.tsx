"use client";

import { useId, useState } from "react";
import { useLang, t, UI } from "@/lib/i18n";

interface Props {
  value: string;
  onChange: (v: string) => void;
  /** Libellé visible ; sert aussi d'`aria-label` au champ. */
  label: string;
  required?: boolean;
  minLength?: number;
  /** `current-password` (connexion) ou `new-password` (création/réinitialisation). */
  autoComplete?: "current-password" | "new-password";
  placeholder?: string;
}

/**
 * Champ mot de passe avec bouton « œil » (afficher/masquer) — composant unique
 * réutilisé par la connexion, l'inscription et la réinitialisation.
 *
 * Accessibilité : `<label htmlFor>` réellement lié au champ (cliquer le libellé
 * met le focus), bouton avec `aria-label` traduit + `aria-pressed`, et
 * `aria-controls` pointant sur le champ. Le bouton est `tabIndex={-1}` pour ne
 * pas s'intercaler entre le mot de passe et la validation au clavier.
 */
export default function PasswordField({
  value,
  onChange,
  label,
  required,
  minLength,
  autoComplete = "current-password",
  placeholder = "••••••••",
}: Props) {
  const [visible, setVisible] = useState(false);
  const { lang } = useLang();
  const id = useId();

  return (
    <>
      <label htmlFor={id} className="block text-[12.5px] font-semibold text-body mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          className="w-full px-4 py-3 pr-12 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={t(UI[visible ? "auth.password.hide" : "auth.password.show"], lang)}
          aria-pressed={visible}
          aria-controls={id}
          tabIndex={-1}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg text-muted transition-colors hover:text-navy focus-visible:ring-2 focus-visible:ring-gold outline-none"
        >
          {visible ? (
            // Œil barré = « masquer »
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19M6.61 6.61A18.15 18.15 0 0 0 2 12s3 8 10 8a9.12 9.12 0 0 0 5.39-1.61" />
              <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          ) : (
            // Œil = « afficher »
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
