import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Button — primitive du design system ARCADINS. RSC (aucun état client).
 * Rendu <button> par défaut, ou <a>/<Link> si `href` fourni. Accessible (focus visible,
 * aria-busy en chargement, aria-disabled). Réutilisable par TOUS les programmes.
 */
type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-gold text-navy hover:bg-gold-light shadow-sm",
  secondary: "bg-navy text-gold hover:bg-navy-mid",
  outline: "border border-gold/45 text-gold hover:bg-gold/10 bg-transparent",
  ghost: "text-navy hover:bg-navy/5 bg-transparent",
};
const SIZES: Record<Size, string> = {
  sm: "text-[13px] px-4 py-2 rounded-lg",
  md: "text-[15px] px-6 py-3 rounded-[10px]",
  lg: "text-[16px] px-8 py-3.5 rounded-xl",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-55 disabled:pointer-events-none focus-visible:outline-2";

function cls(p: BaseProps) {
  return `${base} ${VARIANTS[p.variant ?? "primary"]} ${SIZES[p.size ?? "md"]} ${p.fullWidth ? "w-full" : ""} ${p.className ?? ""}`;
}

function Spinner() {
  return (
    <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
  );
}

export function Button({
  href, external, loading, children, ...rest
}: BaseProps & { href?: string; external?: boolean } & Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps>) {
  const content = (
    <>
      {loading && <Spinner />}
      {children}
    </>
  );
  const className = cls({ children, ...rest });
  if (href) {
    if (external) {
      return (
        <a href={href} className={className} target="_blank" rel="noopener noreferrer" aria-busy={loading || undefined}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={className} aria-busy={loading || undefined}>
        {content}
      </Link>
    );
  }
  return (
    <button className={className} aria-busy={loading || undefined} disabled={loading || rest.disabled} {...rest}>
      {content}
    </button>
  );
}
