"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PROGRAMS } from "@/lib/constants";
import { useLang, t, UI } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function CourseDetailPage() {
  const { slug } = useParams();
  const { lang } = useLang();
  const course = PROGRAMS.find((p) => p.slug === slug);
  const cName = course && UI[`c.${course.slug}`] ? t(UI[`c.${course.slug}`], lang) : course?.name || "";
  const cDesc = course && UI[`cd.${course.slug}`] ? t(UI[`cd.${course.slug}`], lang) : course?.description || "";
  const [enrolled, setEnrolled] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!course) return;
    const supabase = createClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setChecking(false); return; }
      const { data: program } = await supabase.from("programs").select("id").eq("slug", course.slug).single();
      if (program) {
        const { data: enrollment } = await supabase
          .from("enrollments")
          .select("id")
          .eq("user_id", user.id)
          .eq("program_id", program.id)
          .eq("status", "active")
          .maybeSingle();
        setEnrolled(!!enrollment);
      }
      setChecking(false);
    })();
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center pt-32">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
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
                  <span className="bg-gold/20 text-gold font-bold text-lg px-5 py-2 rounded-full tracking-[1px] uppercase">
                    🚀 À Venir
                  </span>
                  <span className="text-white/40 text-sm">Programme en cours de développement</span>
                </div>
                <Link
                  href="/contact"
                  className="bg-gold text-navy font-bold text-[15px] px-8 py-4 rounded-[10px] transition-all inline-flex items-center gap-2 hover:bg-gold-light hover:-translate-y-0.5 sm:ml-auto"
                >
                  📧 Être notifié du lancement
                </Link>
              </>
            ) : enrolled ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="bg-gold/20 text-gold font-bold text-base px-5 py-2 rounded-full">
                    ✓ Déjà inscrit
                  </span>
                  <span className="text-white/40 text-sm">Vous avez accès au contenu complet</span>
                </div>
                <Link
                  href={`/formations/${course.slug}/learn`}
                  className="bg-gold text-navy font-bold text-[15px] px-8 py-4 rounded-[10px] transition-all inline-flex items-center gap-2 hover:bg-gold-light hover:-translate-y-0.5 sm:ml-auto"
                >
                  📚 Accéder au contenu →
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-white/50 text-lg">CAD</span>
                  <span className="font-[family-name:var(--font-heading)] text-[56px] font-bold text-gold leading-none">
                    {course.price.toLocaleString()}
                  </span>
                  <span className="text-white/40 text-sm">/ 24 semaines</span>
                </div>
                <div className="flex gap-3 flex-wrap sm:ml-auto">
                  <a
                    href={`/api/checkout?course=${course.slug}&price=${course.price}`}
                    className="bg-gold text-navy font-bold text-[15px] px-8 py-4 rounded-[10px] transition-all inline-flex items-center gap-2 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_14px_42px_rgba(201,168,76,0.32)]"
                  >
                    💳 S&apos;inscrire maintenant
                  </a>
                  <Link
                    href="/contact"
                    className="bg-transparent text-white font-semibold text-[15px] px-7 py-4 rounded-[10px] border-[1.5px] border-white/28 transition-all inline-flex items-center gap-2 hover:border-gold hover:text-gold"
                  >
                    📞 Nous contacter
                  </Link>
                </div>
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
            <p className="text-[15px] text-muted leading-[1.85] mb-8">
              {course.longDescription}
            </p>

            <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-4">
              Programme des modules
            </h3>
            <div className="space-y-0">
              {course.modules.map((mod, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-3.5 border-b border-gold/10 last:border-b-0"
                >
                  <div className="w-8 h-8 rounded-full bg-navy text-gold font-[family-name:var(--font-heading)] text-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-[14.5px] text-body leading-[1.6] pt-1">
                    {mod}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Info card */}
            <div className="bg-white rounded-[28px] p-8 border border-gold/11">
              <h3 className="font-[family-name:var(--font-heading)] text-lg text-navy mb-5">
                Détails de la formation
              </h3>
              <div className="space-y-4">
                {[
                  { icon: "⏱", label: "Durée", value: course.duration },
                  { icon: "🎓", label: "Certification", value: course.certification },
                  { icon: "💰", label: "Prix", value: `${course.price.toLocaleString()} CAD` },
                  { icon: "📋", label: "Modules", value: `${course.modules.length} modules` },
                  { icon: "🌐", label: "Format", value: "100% en ligne" },
                  { icon: "🗣", label: "Langues", value: "Français · Anglais" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-gold/8 last:border-b-0">
                    <span className="text-[13.5px] text-muted flex items-center gap-2">
                      {item.icon} {item.label}
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
                  <div className="text-3xl mb-3">🚀</div>
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
                    📧 Être notifié →
                  </Link>
                </>
              ) : (
                <>
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-2">
                    Prêt à commencer ?
                  </h3>
                  <p className="text-[13.5px] text-muted mb-5 leading-[1.65]">
                    Rejoignez des milliers d&apos;apprenants et commencez votre formation dès aujourd&apos;hui.
                  </p>
                  <a
                    href={`/api/checkout?course=${course.slug}&price=${course.price}`}
                    className="block w-full bg-navy text-gold font-bold text-[15px] py-4 rounded-[10px] transition-all hover:bg-navy-mid hover:-translate-y-0.5"
                  >
                    S&apos;inscrire — {course.price.toLocaleString()} CAD →
                  </a>
                  <p className="text-xs text-muted mt-3">
                    Paiement sécurisé par Stripe · Certificat inclus
                  </p>
                </>
              )}
            </div>

            {/* Guarantee */}
            <div className="bg-white rounded-[28px] p-8 border border-gold/11 text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h4 className="font-[family-name:var(--font-heading)] text-base text-navy mb-2">
                Garantie satisfaction
              </h4>
              <p className="text-xs text-muted leading-[1.6]">
                Remboursement intégral dans les 7 jours suivant l&apos;inscription, avant accès aux modules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
