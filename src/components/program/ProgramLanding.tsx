"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Button, Card, Section, Container, SectionHeading, Badge } from "@/components/ui/ds";
import type { Locale, ProgramPresentation, PresentationCTA } from "@/lib/program-presentation/types";
import { tr, formatPrice } from "@/lib/program-presentation/types";

/**
 * ProgramLanding — vitrine GÉNÉRIQUE d'un programme. Pilotée par le contrat
 * ProgramPresentation : réutilisable à l'identique par TEF, TCF, IELTS, CELPIP,
 * anglais, espagnol, business, IA… Aucun code spécifique produit ici.
 */
function toLocale(lang: string): Locale {
  return lang === "en" ? "en" : lang === "es" ? "es" : "fr";
}

function CtaButton({ cta, locale, size = "lg" }: { cta: PresentationCTA; locale: Locale; size?: "md" | "lg" }) {
  return <Button href={cta.href} variant={cta.variant ?? "primary"} size={size}>{tr(cta.label, locale)}</Button>;
}

export default function ProgramLanding({ program }: { program: ProgramPresentation }) {
  const { lang } = useLang();
  const l = toLocale(lang);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const p = program;
  const pkgSlugs = p.pricing.packages.map((k) => k.slug);

  return (
    <main id="main">
      {/* ── HERO ── */}
      <Section tone="navy" className="pt-32 sm:pt-36 overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            <div className="ds-animate-fade-up">
              <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-3">{tr(p.hero.eyebrow, l)}</p>
              <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2.1rem,5.4vw,3.4rem)] leading-[1.08] text-white">
                {tr(p.hero.title, l)}{" "}
                {p.hero.highlight && <em className="text-gold italic">{tr(p.hero.highlight, l)}</em>}
              </h1>
              <p className="mt-5 text-[17px] leading-[1.75] text-white/60 max-w-[560px]">{tr(p.hero.subtitle, l)}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <CtaButton cta={p.hero.primaryCta} locale={l} />
                {p.hero.secondaryCta && <CtaButton cta={p.hero.secondaryCta} locale={l} />}
              </div>
            </div>
            {p.hero.stats && (
              <div className="grid grid-cols-2 gap-4 ds-animate-scale-in ds-delay-2">
                {p.hero.stats.map((s) => (
                  <div key={s.value} className="bg-white/[0.05] border border-gold/17 rounded-[18px] p-5 text-center">
                    <div className="font-[family-name:var(--font-heading)] text-[28px] text-gold">{s.value}</div>
                    <div className="text-white/55 text-[12.5px] mt-1">{tr(s.label, l)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* ── ABOUT ── */}
      <Section tone="cream">
        <Container>
          <SectionHeading eyebrow={tr(p.about.eyebrow, l)} title={tr(p.about.title, l)} subtitle={tr(p.about.body, l)} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {p.about.points.map((pt) => (
              <Card key={pt.icon} className="p-6" interactive>
                <div className="text-3xl mb-3" aria-hidden="true">{pt.icon}</div>
                <h3 className="font-[family-name:var(--font-heading)] text-[18px] text-navy mb-2">{tr(pt.title, l)}</h3>
                <p className="text-[14px] text-body leading-[1.7]">{tr(pt.body, l)}</p>
              </Card>
            ))}
          </div>
          {p.epreuves && (
            <div className="mt-14">
              <SectionHeading eyebrow={tr(p.epreuves.eyebrow, l)} title={tr(p.epreuves.title, l)} />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {p.epreuves.items.map((e) => (
                  <div key={e.icon} className="bg-white rounded-[16px] border border-gold/15 p-5 text-center">
                    <div className="text-3xl mb-2" aria-hidden="true">{e.icon}</div>
                    <div className="font-semibold text-navy text-[15px]">{tr(e.name, l)}</div>
                    <div className="text-muted text-[12.5px] mt-0.5">{tr(e.meta, l)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* ── PRICING ── */}
      <Section tone="light" id="tarifs">
        <Container>
          <SectionHeading center eyebrow={tr(p.pricing.eyebrow, l)} title={tr(p.pricing.title, l)} subtitle={tr(p.pricing.subtitle, l)} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {p.pricing.packages.map((k) => (
              <div key={k.slug} className={`relative rounded-[22px] border p-6 flex flex-col ${k.featured ? "border-gold bg-navy text-white shadow-[0_20px_60px_-24px_rgba(201,168,76,0.5)] lg:-mt-3" : "border-gold/18 bg-white"}`}>
                {k.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge variant="gold">{tr(k.badge, l)}</Badge></div>}
                <div className={`font-[family-name:var(--font-heading)] text-[22px] ${k.featured ? "text-gold" : "text-navy"}`}>{k.name}</div>
                <div className={`text-[13px] mb-4 ${k.featured ? "text-white/55" : "text-muted"}`}>{tr(k.tagline, l)}</div>
                <div className="mb-5">
                  <span className={`font-[family-name:var(--font-heading)] text-[34px] ${k.featured ? "text-white" : "text-navy"}`}>{formatPrice(k.price.amountCents, k.price.currency)}</span>
                </div>
                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {k.highlights.map((h, i) => (
                    <li key={i} className={`flex items-start gap-2 text-[13.5px] leading-[1.5] ${k.featured ? "text-white/80" : "text-body"}`}>
                      <span className="text-gold shrink-0 font-bold" aria-hidden="true">✓</span>{tr(h, l)}
                    </li>
                  ))}
                </ul>
                <Button href={k.cta.href} variant={k.featured ? "primary" : "outline"} fullWidth>{tr(k.cta.label, l)}</Button>
              </div>
            ))}
          </div>

          {/* Comparison table (responsive : scroll horizontal encapsulé) */}
          <div className="mt-14">
            <h3 className="font-[family-name:var(--font-heading)] text-[20px] text-navy mb-4">{tr(p.pricing.comparison.featureLabel, l)}</h3>
            <div className="overflow-x-auto rounded-[16px] border border-gold/15">
              <table className="w-full min-w-[640px] text-[13.5px] border-collapse">
                <caption className="sr-only">{tr(p.pricing.comparison.featureLabel, l)}</caption>
                <thead>
                  <tr>
                    <th scope="col" className="text-left bg-navy text-white/80 font-semibold px-4 py-3">—</th>
                    {p.pricing.packages.map((k) => (
                      <th key={k.slug} scope="col" className={`px-4 py-3 font-bold ${k.featured ? "bg-gold text-navy" : "bg-navy text-gold"}`}>{k.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {p.pricing.comparison.features.map((f, ri) => (
                    <tr key={ri} className={ri % 2 ? "bg-off-white" : "bg-white"}>
                      <th scope="row" className="text-left px-4 py-3 font-semibold text-navy border-t border-navy/8">{tr(f.label, l)}</th>
                      {pkgSlugs.map((slug) => {
                        const v = f.tiers[slug];
                        return (
                          <td key={slug} className="px-4 py-3 text-center border-t border-navy/8 text-body">
                            {v === true ? <span className="text-emerald-600 font-bold" aria-label="oui">✓</span>
                              : v === false ? <span className="text-navy/25" aria-label="non">—</span>
                              : <span>{v}</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── TESTIMONIALS ── */}
      {p.testimonials && (
        <Section tone="cream">
          <Container>
            <SectionHeading center eyebrow={tr(p.testimonials.eyebrow, l)} title={tr(p.testimonials.title, l)} />
            <div className="grid md:grid-cols-3 gap-5">
              {p.testimonials.items.map((t, i) => (
                <Card key={i} className="p-6">
                  {t.score && <div className="mb-3"><Badge variant="success">{t.score}</Badge></div>}
                  <p className="text-[14.5px] text-body leading-[1.75] italic">« {tr(t.quote, l)} »</p>
                  <div className="mt-4 pt-4 border-t border-navy/8">
                    <div className="font-semibold text-navy text-[14px]">{t.name}</div>
                    <div className="text-muted text-[12.5px]">{tr(t.role, l)}</div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ── FAQ (accordéon accessible) ── */}
      <Section tone="light">
        <Container size="md">
          <SectionHeading center eyebrow={tr(p.faq.eyebrow, l)} title={tr(p.faq.title, l)} />
          <div className="flex flex-col gap-3">
            {p.faq.items.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="bg-white rounded-[14px] border border-gold/15 overflow-hidden">
                  <h3>
                    <button onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} aria-controls={`faq-panel-${i}`} className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-gold/5 transition-colors">
                      <span className="text-[15.5px] font-semibold text-navy">{tr(item.q, l)}</span>
                      <span aria-hidden="true" className={`shrink-0 w-6 h-6 rounded-full bg-gold/15 text-gold flex items-center justify-center text-lg font-bold transition-transform ${open ? "rotate-45" : ""}`}>+</span>
                    </button>
                  </h3>
                  {open && <div id={`faq-panel-${i}`} className="px-6 pb-6 text-[14.5px] text-body leading-[1.8]">{tr(item.a, l)}</div>}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── FINAL CTA ── */}
      <Section tone="navy">
        <Container size="md" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.6rem,4vw,2.2rem)] text-white mb-3">{tr(p.finalCta.title, l)}</h2>
          <p className="text-white/55 text-[16px] mb-7 max-w-[520px] mx-auto leading-[1.7]">{tr(p.finalCta.subtitle, l)}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <CtaButton cta={p.finalCta.primaryCta} locale={l} />
            {p.finalCta.secondaryCta && <CtaButton cta={p.finalCta.secondaryCta} locale={l} />}
          </div>
        </Container>
      </Section>
    </main>
  );
}
