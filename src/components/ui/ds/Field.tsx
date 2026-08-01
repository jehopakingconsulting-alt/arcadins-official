import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Field / Input — primitives de formulaire accessibles (RSC-safe, présentation only).
 * label lié (htmlFor), aide + erreur via aria-describedby, aria-invalid. Aucune logique.
 */
let counter = 0;
function useId(prefix: string) {
  // id stable côté serveur : compteur module (présentation only, pas d'hydratation critique).
  counter += 1;
  return `${prefix}-${counter}`;
}

export function Field({ label, htmlFor, help, error, required, children }: { label: string; htmlFor: string; help?: string; error?: string; required?: boolean; children: ReactNode }) {
  const helpId = help ? `${htmlFor}-help` : undefined;
  const errId = error ? `${htmlFor}-error` : undefined;
  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="block text-[13.5px] font-semibold text-navy mb-1.5">
        {label}{required && <span className="text-gold ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {help && <p id={helpId} className="mt-1 text-[12.5px] text-muted">{help}</p>}
      {error && <p id={errId} role="alert" className="mt-1 text-[12.5px] text-red-600">{error}</p>}
    </div>
  );
}

export function Input({ invalid, describedBy, ...rest }: { invalid?: boolean; describedBy?: string } & ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...rest}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={`w-full rounded-[10px] border bg-white px-4 py-2.5 text-[14.5px] text-navy placeholder:text-muted/70 transition-colors focus:outline-none focus-visible:outline-2 ${invalid ? "border-red-400" : "border-navy/15 focus:border-gold"}`}
    />
  );
}

export { useId as dsUseId };
