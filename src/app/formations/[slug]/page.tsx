"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PROGRAMS } from "@/lib/constants";
import { useLang, t, UI } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import { getFullPaymentTotal, REGISTRATION_FEE } from "@/lib/pricing";
import { FORMATION_DETAILS } from "@/lib/data/formation-details";
import Icon, { type IconName } from "@/components/ui/Icon";
import Link from "next/link";
import ProgramReviews from "@/components/reviews/ProgramReviews";

export default function CourseDetailPage() {
  const { slug } = useParams();
  const { lang } = useLang();
  const course = PROGRAMS.find((p) => p.slug === slug);
  const cName = course && UI[`c.${course.slug}`] ? t(UI[`c.${course.slug}`], lang) : course?.name || "";
  const cDesc = course && UI[`cd.${course.slug}`] ? t(UI[`cd.${course.slug}`], lang) : course?.description || "";
  const detail = course ? FORMATION_DETAILS[course.slug] : undefined;
  const [enrollmentStatus, setEnrollmentStatus] = useState<string | null>(null);
  const fullTotal = course ? getFullPaymentTotal(course.price) : 0;

  useEffect(() => {
    if (!course) return;
    const supabase = createClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { return; }
      const { data: program } = await supabase.from("programs").select("id").eq("slug", course.slug).single();
      if (program) {
        const { data: enrollment } = await supabase
          .from("enrollments")
          .select("status")
          .eq("user_id", user.id)
          .eq("program_id", program.id)
          .order("enrolled_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        setEnrollmentStatus(enrollment?.status || null);
      }
    })();
  }, [course]);

  const enrolled = enrollmentStatus === "active";
  const pendingPayment = enrollmentStatus === "pending_payment";
  const suspended = enrollmentStatus === "suspended";

  // Formation inexistante OU archivée (comingSoon) → introuvable côté public.
  // Les programmes « À venir » restent dans PROGRAMS mais ne sont pas exposés
  // publiquement, même par URL directe. Voir ARCHIVED_TRAININGS_REPORT.md.
  if (!course || course.comingSoon) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center pt-32">
        <div className="text-center">
          <div className="flex justify-center text-gold mb-4"><Icon name="search" size={48} /></div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-white mb-3">Formation introuvable</h1>
          <Link href="/formations" className="text-gold hover:underline">← Retour aux formations</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20">
      <div className="max-w-[1000px] mx-auto px-7">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/" className="hover:text-gold transition-all">{t(UI["nav.home"], lang)}</Link>
          <span>/</span>
          <Link href="/formations" className="hover:text-gold transition-all">{t(UI["nav.formations"], lang)}</Link>
          <span>/</span>
          <span className="text-navy font-medium">{cName}</span>
        </div>

        {/* Header */}
        <div className="bg-navy rounded-[28px] p-10 mb-8">
          <div className="flex items-start gap-6">
            <div className="text-5xl">{course.icon}</div>
            <div className="flex-1">
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-gold mb-2">
                {course.categoryLabel} · {course.duration}
              </div>
              <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-white mb-3">
                {cName}
              </h1>
              <p className="text-white/60 text-[16px] leading-[1.75] max-w-[600px]">
                {cDesc}
              </p>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 pt-8 border-t border-white/10">
            {course.comingSoon ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="bg-gold/20 text-gold font-bold text-lg px-5 py-2 rounded-full tracking-[1px] uppercase inline-flex items-center gap-2">
                    <Icon name="rocket" size={18} /> À Venir
                  </span>
                  <span className="text-white/40 text-sm">Programme en cours de développement</span>
                </div>
                <Link
                  href="/contact"
                  className="bg-gold text-navy font-bold text-[15px] px-8 py-4 rounded-[10px] transition-all inline-flex items-center gap-2 hover:bg-gold-light hover:-translate-y-0.5 sm:ml-auto"
                >
                  <Icon name="mail" size={18} /> Être notifié du lancement
                </Link>
              </>
            ) : enrolled ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="bg-gold/20 text-gold font-bold text-base px-5 py-2 rounded-full inline-flex items-center gap-2">
                    <Icon name="check" size={17} /> Déjà inscrit
                  </span>
                  <span className="text-white/40 text-sm">Vous avez accès au contenu complet</span>
                </div>
                <Link
                  href={`/formations/${course.slug}/learn`}
                  className="bg-gold text-navy font-bold text-[15px] px-8 py-4 rounded-[10px] transition-all inline-flex items-center gap-2 hover:bg-gold-light hover:-translate-y-0.5 sm:ml-auto"
                >
                  <Icon name="book" size={18} /> Accéder au contenu →
                </Link>
              </>
            ) : pendingPayment ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="bg-amber-400/20 text-amber-300 font-bold text-base px-5 py-2 rounded-full inline-flex items-center gap-2">
                    <Icon name="bell" size={16} /> En attente de versement
                  </span>
                  <span className="text-white/40 text-sm">Complétez votre premier versement pour débuter</span>
                </div>
                <Link
                  href={`/formations/${course.slug}/inscription`}
                  className="bg-gold text-navy font-bold text-[15px] px-8 py-4 rounded-[10px] transition-all inline-flex items-center gap-2 hover:bg-gold-light hover:-translate-y-0.5 sm:ml-auto"
                >
                  Continuer mon inscription →
                </Link>
              </>
            ) : suspended ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="bg-red-400/20 text-red-300 font-bold text-base px-5 py-2 rounded-full inline-flex items-center gap-2">
                    <Icon name="ban" size={16} /> Compte suspendu
                  </span>
                  <span className="text-white/40 text-sm">Un versement n&apos;a pas été reçu — régularisez pour reprendre l&apos;accès</span>
                </div>
                <Link
                  href="/contact"
                  className="bg-gold text-navy font-bold text-[15px] px-8 py-4 rounded-[10px] transition-all inline-flex items-center gap-2 hover:bg-gold-light hover:-translate-y-0.5 sm:ml-auto"
                >
                  Nous contacter →
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-white/50 text-lg">CAD</span>
                  <span className="font-[family-name:var(--font-heading)] text-[56px] font-bold text-gold leading-none">
                    {course.price.toLocaleString()}
                  </span>
                  <span className="text-white/40 text-sm">/ 24 semaines + {REGISTRATION_FEE}$ inscription</span>
                </div>
                <Link
                  href="/contact"
                  className="bg-transparent text-white font-semibold text-[15px] px-7 py-4 rounded-[10px] border-[1.5px] border-white/28 transition-all inline-flex items-center gap-2 hover:border-gold hover:text-gold sm:ml-auto"
                >
                  <Icon name="phone" size={18} /> Nous contacter
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
          {/* Description */}
          <div className="bg-white rounded-[28px] p-10 border border-gold/11">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl text-navy mb-4">
              À propos de cette formation
            </h2>
            {detail?.tagline && (
              <p className="text-[15.5px] text-navy font-medium leading-[1.7] mb-4">{detail.tagline}</p>
            )}
            <p className="text-[15px] text-muted leading-[1.85] mb-8">
              {course.longDescription}
            </p>

            {/* Objectifs d'apprentissage */}
            {detail?.objectives?.length ? (
              <div className="mb-9">
                <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-4">
                  Ce que vous saurez faire
                </h3>
                <ul className="space-y-2.5">
                  {detail.objectives.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-[14.5px] text-body leading-[1.6]">
                      <span className="w-5 h-5 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5"><Icon name="check" size={12} /></span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-4">
              Programme des modules
            </h3>
            <div className="space-y-0">
              {(detail?.modules?.length ? detail.modules : course.modules.map((title) => ({ title, description: "" }))).map((mod, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-3.5 border-b border-gold/10 last:border-b-0"
                >
                  <div className="w-8 h-8 rounded-full bg-navy text-gold font-[family-name:var(--font-heading)] text-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <div className="pt-0.5">
                    <div className="text-[14.5px] text-navy font-semibold leading-[1.5]">{mod.title}</div>
                    {mod.description && <div className="text-[13.5px] text-muted leading-[1.6] mt-0.5">{mod.description}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Débouchés / métiers visés */}
            {detail?.careers?.length ? (
              <div className="mt-9 pt-8 border-t border-gold/10">
                <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-2">
                  Métiers visés
                </h3>
                <p className="text-[13px] text-muted mb-4">Débouchés possibles après la formation (présentés à titre indicatif, sans garantie d&apos;emploi).</p>
                <div className="flex flex-wrap gap-2">
                  {detail.careers.map((c) => (
                    <span key={c} className="text-[13px] font-medium text-navy bg-gold/10 border border-gold/20 rounded-full px-3.5 py-1.5">{c}</span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Info card */}
            <div className="bg-white rounded-[28px] p-8 border border-gold/11">
              <h3 className="font-[family-name:var(--font-heading)] text-lg text-navy mb-5">
                Détails de la formation
              </h3>
              <div className="space-y-4">
                {([
                  { icon: "clock", label: "Durée", value: course.duration },
                  { icon: "award", label: "Certification", value: course.certification },
                  { icon: "coin", label: "Prix", value: `${course.price.toLocaleString()} CAD + ${REGISTRATION_FEE}$ inscription` },
                  { icon: "card", label: "Paiement", value: "Complet ou 3 versements" },
                  { icon: "clipboard", label: "Modules", value: `${course.modules.length} modules` },
                  { icon: "globe", label: "Format", value: "100% en ligne" },
                  { icon: "chat", label: "Langues", value: "Français · Anglais" },
                ] as { icon: IconName; label: string; value: string }[]).map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-gold/8 last:border-b-0">
                    <span className="text-[13.5px] text-muted flex items-center gap-2">
                      <Icon name={item.icon} size={15} className="text-gold" /> {item.label}
                    </span>
                    <span className="text-[13.5px] font-semibold text-navy">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div className="bg-gradient-to-br from-gold/15 to-gold/5 rounded-[28px] p-8 border border-gold/25 text-center">
              {course.comingSoon ? (
                <>
                  <div className="flex justify-center text-gold mb-3"><Icon name="rocket" size={30} /></div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-2">
                    Bientôt disponible
                  </h3>
                  <p className="text-[13.5px] text-muted mb-5 leading-[1.65]">
                    Ce programme est en cours de développement. Laissez-nous vos coordonnées pour être notifié du lancement.
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full bg-navy text-gold font-bold text-[15px] py-4 rounded-[10px] transition-all hover:bg-navy-mid hover:-translate-y-0.5"
                  >
                    <span className="inline-flex items-center gap-2"><Icon name="mail" size={17} /> Être notifié →</span>
                  </Link>
                </>
              ) : enrolled ? (
                <>
                  <div className="flex justify-center text-gold mb-3"><Icon name="book" size={30} /></div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-2">Vous êtes inscrit</h3>
                  <Link href={`/formations/${course.slug}/learn`} className="block w-full bg-navy text-gold font-bold text-[15px] py-4 rounded-[10px] transition-all hover:bg-navy-mid">
                    Accéder au contenu →
                  </Link>
                </>
              ) : pendingPayment ? (
                <>
                  <div className="flex justify-center text-gold mb-3"><Icon name="bell" size={28} /></div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-2">Versement en attente</h3>
                  <p className="text-[13.5px] text-muted mb-5 leading-[1.65]">
                    Vos frais d&apos;inscription ont été reçus. Complétez votre premier versement avant la date limite.
                  </p>
                  <Link href={`/formations/${course.slug}/inscription`} className="block w-full bg-navy text-gold font-bold text-[15px] py-4 rounded-[10px] transition-all hover:bg-navy-mid">
                    Continuer mon inscription →
                  </Link>
                </>
              ) : suspended ? (
                <>
                  <div className="flex justify-center text-red-400 mb-3"><Icon name="ban" size={28} /></div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-2">Compte suspendu</h3>
                  <p className="text-[13.5px] text-muted mb-5 leading-[1.65]">
                    Un versement mensuel n&apos;a pas été reçu à temps. Contactez-nous pour régulariser votre dossier.
                  </p>
                  <Link href="/contact" className="block w-full bg-navy text-gold font-bold text-[15px] py-4 rounded-[10px] transition-all hover:bg-navy-mid">
                    Nous contacter →
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex justify-center text-gold mb-3"><Icon name="target" size={30} /></div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-2">
                    Réservez votre place
                  </h3>
                  <p className="text-[13.5px] text-muted mb-5 leading-[1.65]">
                    Les inscriptions se font avec notre équipe. Demandez votre inscription : nous vous accompagnons pour confirmer votre place et votre plan de paiement ({fullTotal.toLocaleString()}$ total — en un seul versement ou en 3 fois).
                  </p>
                  <Link
                    href={`/contact?formation=${course.slug}`}
                    className="block w-full bg-navy text-gold font-bold text-[15px] py-4 rounded-[10px] transition-all hover:bg-navy-mid hover:-translate-y-0.5"
                  >
                    Demander mon inscription →
                  </Link>
                  <p className="text-xs text-muted mt-3">
                    Notre équipe vous recontacte sous 24–48h ouvrables.
                  </p>
                </>
              )}
            </div>

            {/* À qui s'adresse */}
            {detail?.audience?.length ? (
              <div className="bg-white rounded-[28px] p-8 border border-gold/11">
                <h4 className="font-[family-name:var(--font-heading)] text-base text-navy mb-4 inline-flex items-center gap-2">
                  <Icon name="cap" size={17} className="text-gold" /> À qui s&apos;adresse cette formation
                </h4>
                <ul className="space-y-2.5">
                  {detail.audience.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-[13.5px] text-body leading-[1.55]">
                      <span className="text-gold shrink-0 mt-0.5">•</span>{a}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Prérequis */}
            {detail?.prerequisites?.length ? (
              <div className="bg-white rounded-[28px] p-8 border border-gold/11">
                <h4 className="font-[family-name:var(--font-heading)] text-base text-navy mb-4 inline-flex items-center gap-2">
                  <Icon name="clipboard" size={17} className="text-gold" /> Prérequis
                </h4>
                <ul className="space-y-2.5">
                  {detail.prerequisites.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[13.5px] text-body leading-[1.55]">
                      <span className="text-gold shrink-0 mt-0.5">✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Guarantee */}
            <div className="bg-white rounded-[28px] p-8 border border-gold/11 text-center">
              <div className="flex justify-center text-gold mb-2"><Icon name="shield" size={28} /></div>
              <h4 className="font-[family-name:var(--font-heading)] text-base text-navy mb-2">
                Garantie satisfaction
              </h4>
              <p className="text-xs text-muted leading-[1.6]">
                Remboursement intégral dans les 7 jours suivant l&apos;inscription, avant accès aux modules.
              </p>
            </div>
          </div>
        </div>

        <ProgramReviews slug={course.slug} />
      </div>
    </div>
  );
}
