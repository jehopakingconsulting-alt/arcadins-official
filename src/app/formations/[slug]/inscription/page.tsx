"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PROGRAMS } from "@/lib/constants";
import { getInstallmentPlan, getFullPaymentTotal } from "@/lib/pricing";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface EnrollmentInfo {
  status: string;
  payment_deadline: string | null;
}

export default function InscriptionPage() {
  const { slug } = useParams();
  const course = PROGRAMS.find((p) => p.slug === slug);
  const [enrollment, setEnrollment] = useState<EnrollmentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentChoice, setPaymentChoice] = useState<"full" | "installment">("full");

  useEffect(() => {
    if (!course) return;
    const supabase = createClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      const { data: program } = await supabase.from("programs").select("id").eq("slug", course.slug).single();
      if (program) {
        const { data } = await supabase
          .from("enrollments")
          .select("status, payment_deadline")
          .eq("user_id", user.id)
          .eq("program_id", program.id)
          .order("enrolled_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        setEnrollment(data);
      }
      setLoading(false);
    })();
  }, [course]);

  if (!course) return null;

  if (loading) {
    return <div className="min-h-screen bg-off-white pt-32" />;
  }

  const installmentPlan = getInstallmentPlan(course.price);
  const fullTotal = getFullPaymentTotal(course.price);
  const deadline = enrollment?.payment_deadline ? new Date(enrollment.payment_deadline) : null;
  const daysLeft = deadline ? Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : null;

  if (enrollment?.status === "active") {
    return (
      <div className="min-h-screen bg-off-white pt-32 pb-20 flex items-center justify-center px-7">
        <div className="bg-white rounded-[28px] border border-gold/15 p-10 max-w-md text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl text-navy mb-3">Inscription confirmée</h1>
          <p className="text-muted text-[14px] mb-6">Votre premier versement a été reçu. Vous avez maintenant accès au contenu de la formation.</p>
          <Link href={`/formations/${course.slug}/learn`} className="block w-full bg-gold text-navy font-bold py-3.5 rounded-xl">
            Accéder au contenu →
          </Link>
        </div>
      </div>
    );
  }

  if (enrollment?.status !== "pending_payment") {
    return (
      <div className="min-h-screen bg-off-white pt-32 pb-20 flex items-center justify-center px-7">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-muted mb-4">Aucune inscription en attente trouvée pour cette formation.</p>
          <Link href={`/formations/${course.slug}`} className="text-gold hover:underline">← Retour à la formation</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white pt-32 pb-20 px-7">
      <div className="max-w-[700px] mx-auto">
        {/* Confirmation banner */}
        <div className="bg-navy rounded-[28px] p-8 mb-6 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl text-white mb-2">
            Frais d&apos;inscription reçus
          </h1>
          <p className="text-white/60 text-[14px]">
            Votre place pour <strong className="text-gold">{course.name}</strong> est réservée.
          </p>
        </div>

        {/* Deadline warning */}
        <div className="bg-gold/10 border-2 border-gold/40 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl shrink-0">⏳</div>
            <div>
              <h3 className="font-bold text-navy mb-1">
                Vous avez {daysLeft ?? 30} jours pour effectuer votre premier versement
              </h3>
              <p className="text-[13.5px] text-body leading-[1.6]">
                {deadline && `Date limite : ${deadline.toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric" })}. `}
                Passé ce délai, votre inscription sera automatiquement annulée et les frais d&apos;inscription de 50$ seront perdus — ils sont non remboursables.
              </p>
            </div>
          </div>
        </div>

        {/* Payment plan selector */}
        <div className="bg-white rounded-[28px] border border-gold/15 p-8">
          <h2 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-5">
            Choisissez votre mode de paiement
          </h2>

          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={() => setPaymentChoice("full")}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                paymentChoice === "full" ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-navy">Paiement complet</span>
                {paymentChoice === "full" && <span className="text-gold">✓</span>}
              </div>
              <div className="text-[13px] text-muted">{fullTotal.toLocaleString()} CAD en un seul versement</div>
            </button>

            <button
              onClick={() => setPaymentChoice("installment")}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                paymentChoice === "installment" ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-navy">3 versements mensuels</span>
                {paymentChoice === "installment" && <span className="text-gold">✓</span>}
              </div>
              <div className="text-[13px] text-muted">
                {installmentPlan.installments[0]}$ aujourd&apos;hui, puis {installmentPlan.installments[1]}$ et {installmentPlan.installments[2]}$ les 2 mois suivants
              </div>
            </button>
          </div>

          <div className="bg-off-white rounded-xl p-4 mb-6 text-[12.5px] text-muted leading-[1.6]">
            ⚠️ Si vous choisissez les 3 versements, les paiements suivants sont prélevés automatiquement chaque mois. Tout paiement manqué à la date prévue suspendra automatiquement l&apos;accès à votre compte jusqu&apos;à régularisation.
          </div>

          <a
            href={`/api/checkout?course=${course.slug}&price=${course.price}&step=installment1&payment=${paymentChoice}`}
            className="block w-full bg-gold text-navy font-bold text-[15px] py-4 rounded-[10px] text-center transition-all hover:bg-gold-light hover:-translate-y-0.5"
          >
            Effectuer mon premier versement →
          </a>
        </div>
      </div>
    </div>
  );
}
