import type { ReactNode } from "react";

/**
 * Primitives du design system ARCADINS (RSC). Card, Badge, Alert, ProgressBar,
 * Skeleton, EmptyState, ErrorState, Container, Section, Eyebrow, SectionHeading,
 * Stat. Réutilisables par tous les programmes. Accessibles.
 */

// ── Layout ───────────────────────────────────────────────────────────────────
export function Container({ children, className = "", size = "lg" }: { children: ReactNode; className?: string; size?: "sm" | "md" | "lg" | "xl" }) {
  const max = { sm: "max-w-[720px]", md: "max-w-[900px]", lg: "max-w-[1200px]", xl: "max-w-[1320px]" }[size];
  return <div className={`${max} mx-auto px-6 sm:px-7 ${className}`}>{children}</div>;
}

export function Section({ children, className = "", tone = "light", id }: { children: ReactNode; className?: string; tone?: "light" | "navy" | "cream"; id?: string }) {
  const bg = { light: "bg-white", navy: "bg-navy", cream: "bg-off-white" }[tone];
  return <section id={id} className={`${bg} py-16 sm:py-20 ${className}`}>{children}</section>;
}

// ── Typographie de section ─────────────────────────────────────────────────────
export function Eyebrow({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "muted" }) {
  return <p className={`text-[11px] font-bold tracking-[4px] uppercase mb-2.5 ${tone === "gold" ? "text-gold" : "text-muted"}`}>{children}</p>;
}

export function SectionHeading({ eyebrow, title, subtitle, tone = "light", center = false }: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; tone?: "light" | "navy"; center?: boolean }) {
  const titleColor = tone === "navy" ? "text-white" : "text-navy";
  const subColor = tone === "navy" ? "text-white/55" : "text-muted";
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-[680px] mb-12`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={`font-[family-name:var(--font-heading)] text-[clamp(1.7rem,4vw,2.4rem)] leading-[1.15] ${titleColor}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-[16.5px] leading-[1.75] ${subColor}`}>{subtitle}</p>}
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
export function Card({ children, className = "", interactive = false, tone = "light" }: { children: ReactNode; className?: string; interactive?: boolean; tone?: "light" | "navy" }) {
  const surface = tone === "navy" ? "bg-white/[0.04] border-gold/17" : "bg-white border-gold/15";
  const hover = interactive ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(13,27,46,0.18)] hover:border-gold/40" : "";
  return <div className={`rounded-[20px] border ${surface} ${hover} ${className}`}>{children}</div>;
}

// ── Badge ───────────────────────────────────────────────────────────────────────
export function Badge({ children, variant = "gold" }: { children: ReactNode; variant?: "gold" | "navy" | "success" | "neutral" }) {
  const styles = {
    gold: "bg-gold/12 border-gold/30 text-gold",
    navy: "bg-navy text-gold border-navy",
    success: "bg-emerald-500/12 border-emerald-500/30 text-emerald-700",
    neutral: "bg-navy/6 border-navy/12 text-body",
  }[variant];
  return <span className={`inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.6px] uppercase px-3 py-1 rounded-full border ${styles}`}>{children}</span>;
}

// ── Alert ──────────────────────────────────────────────────────────────────────
export function Alert({ children, variant = "info", title }: { children: ReactNode; variant?: "info" | "success" | "warning" | "error"; title?: string }) {
  const map = {
    info: { c: "bg-navy/[0.03] border-navy/12 text-body", i: "ⓘ", role: undefined as string | undefined },
    success: { c: "bg-emerald-500/8 border-emerald-500/25 text-emerald-800", i: "✓", role: undefined },
    warning: { c: "bg-gold/8 border-gold/30 text-navy", i: "⚠️", role: "alert" },
    error: { c: "bg-red-500/8 border-red-400/30 text-red-800", i: "✕", role: "alert" },
  }[variant];
  return (
    <div role={map.role} className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 text-[14px] leading-[1.65] ${map.c}`}>
      <span aria-hidden="true" className="shrink-0 mt-0.5 font-bold">{map.i}</span>
      <div>{title && <strong className="block mb-0.5">{title}</strong>}{children}</div>
    </div>
  );
}

// ── ProgressBar (a11y) ──────────────────────────────────────────────────────────
export function ProgressBar({ value, label, tone = "light" }: { value: number; label?: string; tone?: "light" | "navy" }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const track = tone === "navy" ? "bg-white/10" : "bg-navy/8";
  return (
    <div>
      {label && <div className="flex justify-between text-[12.5px] mb-1.5"><span className={tone === "navy" ? "text-white/70" : "text-body"}>{label}</span><span className="text-gold font-semibold">{pct}%</span></div>}
      <div className={`h-2 rounded-full overflow-hidden ${track}`} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ── Skeleton ─────────────────────────────────────────────────────────────────────
export function Skeleton({ className = "", rounded = "10px" }: { className?: string; rounded?: string }) {
  return <div className={`ds-skeleton ${className}`} style={{ borderRadius: rounded }} aria-hidden="true" />;
}

// ── Empty / Error states ───────────────────────────────────────────────────────
export function EmptyState({ icon = "🔎", title, body, action }: { icon?: string; title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="text-center max-w-[440px] mx-auto py-12">
      <div className="text-4xl mb-3" aria-hidden="true">{icon}</div>
      <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-2">{title}</h3>
      {body && <p className="text-[14.5px] text-body leading-[1.7] mb-5">{body}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ title = "Une erreur s'est produite", body, action }: { title?: string; body?: string; action?: ReactNode }) {
  return (
    <div role="alert" className="text-center max-w-[440px] mx-auto py-12">
      <div className="text-4xl mb-3" aria-hidden="true">⚠️</div>
      <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-2">{title}</h3>
      {body && <p className="text-[14.5px] text-body leading-[1.7] mb-5">{body}</p>}
      {action}
    </div>
  );
}

// ── Stat ───────────────────────────────────────────────────────────────────────
export function Stat({ value, label, tone = "navy" }: { value: string; label: string; tone?: "navy" | "light" }) {
  const box = tone === "navy" ? "bg-navy" : "bg-white border border-gold/15";
  const val = tone === "navy" ? "text-gold" : "text-navy";
  const lab = tone === "navy" ? "text-white/55" : "text-muted";
  return (
    <div className={`rounded-[18px] p-6 text-center ${box}`}>
      <div className={`font-[family-name:var(--font-heading)] text-[30px] ${val}`}>{value}</div>
      <div className={`text-[13px] mt-1 ${lab}`}>{label}</div>
    </div>
  );
}
