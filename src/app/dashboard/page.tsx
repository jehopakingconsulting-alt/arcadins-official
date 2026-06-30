import { createClient } from "@/lib/supabase/server";
import { PROGRAMS } from "@/lib/constants";
import Link from "next/link";

const STATUS_BADGES: Record<string, { label: string; className: string }> = {
  active: { label: "✓ Actif", className: "bg-gold/20 text-gold" },
  pending_payment: { label: "⏳ Versement requis", className: "bg-amber-400/20 text-amber-600" },
  suspended: { label: "⛔ Suspendu", className: "bg-red-400/20 text-red-600" },
  cancelled: { label: "Annulé", className: "bg-gray-200 text-gray-500" },
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const firstName = user?.user_metadata?.first_name || "Étudiant";
  const lastName = user?.user_metadata?.last_name || "";

  const { data: enrollments } = user
    ? await supabase
        .from("enrollments")
        .select("id, status, payment_deadline, installments_paid, program_id, programs(slug, name_fr, icon)")
        .eq("user_id", user.id)
        .neq("status", "cancelled")
        .order("enrolled_at", { ascending: false })
    : { data: [] };

  const activeCount = (enrollments || []).filter((e) => e.status === "active").length;

  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20 px-7">
      <div className="max-w-[1200px] mx-auto">
        {/* Welcome */}
        <div className="mb-10">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">
            Espace Étudiant
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl text-navy mb-3">
            Bienvenue, <em className="text-gold italic">{firstName}</em>
          </h1>
          <p className="text-muted text-[17px]">
            Gérez vos formations, examens et certificats.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: "📚", label: "Formations actives", value: String(activeCount) },
            { icon: "📋", label: "Examens passés", value: "0" },
            { icon: "🏆", label: "Certificats obtenus", value: "0" },
            { icon: "📊", label: "Score moyen", value: "—" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gold/16 rounded-[20px] p-6"
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-[family-name:var(--font-heading)] text-3xl font-bold text-navy">
                {s.value}
              </div>
              <div className="text-[13px] text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Enrollments list */}
        {enrollments && enrollments.length > 0 ? (
          <div className="space-y-4 mb-8">
            {enrollments.map((e) => {
              const program = e.programs as unknown as { slug: string; name_fr: string; icon: string } | null;
              const badge = STATUS_BADGES[e.status] || STATUS_BADGES.active;
              const courseInfo = PROGRAMS.find((p) => p.slug === program?.slug);
              const deadline = e.payment_deadline ? new Date(e.payment_deadline) : null;

              return (
                <div key={e.id} className="bg-white border border-gold/16 rounded-[20px] p-6 flex items-center gap-5 flex-wrap">
                  <div className="text-3xl">{program?.icon || courseInfo?.icon || "🎓"}</div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="font-[family-name:var(--font-heading)] text-lg text-navy">
                      {program?.name_fr || courseInfo?.name}
                    </div>
                    <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full mt-1 ${badge.className}`}>
                      {badge.label}
                    </span>
                    {e.status === "pending_payment" && deadline && (
                      <div className="text-xs text-muted mt-1.5">
                        Date limite premier versement : {deadline.toLocaleDateString("fr-CA")}
                      </div>
                    )}
                    {e.status === "active" && e.installments_paid > 0 && e.installments_paid < 3 && (
                      <div className="text-xs text-muted mt-1.5">
                        Versement {e.installments_paid} / 3 reçu
                      </div>
                    )}
                  </div>
                  <Link
                    href={
                      e.status === "active"
                        ? `/formations/${program?.slug}/learn`
                        : e.status === "pending_payment"
                        ? `/formations/${program?.slug}/inscription`
                        : `/formations/${program?.slug}`
                    }
                    className="bg-navy text-gold font-bold text-sm px-5 py-2.5 rounded-lg shrink-0"
                  >
                    {e.status === "active" ? "Accéder →" : e.status === "pending_payment" ? "Continuer →" : "Voir →"}
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-gold/16 rounded-[28px] p-10 text-center mb-8">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-navy mb-3">
              Commencez votre parcours
            </h3>
            <p className="text-muted text-[15px] mb-6 max-w-md mx-auto">
              Vous n&apos;avez pas encore de formation active. Explorez nos
              programmes et commencez votre préparation dès aujourd&apos;hui.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                href="/formations"
                className="bg-gold text-navy font-bold text-[15px] px-8 py-3.5 rounded-[10px] transition-all inline-flex items-center gap-2 hover:bg-gold-light hover:-translate-y-0.5"
              >
                Voir les formations →
              </Link>
              <Link
                href="/tarifs"
                className="bg-navy text-gold font-bold text-[15px] px-8 py-3.5 rounded-[10px] transition-all inline-flex items-center gap-2 hover:bg-navy-mid"
              >
                Voir les tarifs
              </Link>
            </div>
          </div>
        )}

        {/* Profile info */}
        <div className="bg-white border border-gold/16 rounded-[28px] p-8">
          <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-4">
            Mon profil
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted">Nom complet :</span>{" "}
              <span className="font-semibold text-navy">{firstName} {lastName}</span>
            </div>
            <div>
              <span className="text-muted">Email :</span>{" "}
              <span className="font-semibold text-navy">{user?.email}</span>
            </div>
            <div>
              <span className="text-muted">Pays :</span>{" "}
              <span className="font-semibold text-navy">{user?.user_metadata?.country || "Non spécifié"}</span>
            </div>
            <div>
              <span className="text-muted">Membre depuis :</span>{" "}
              <span className="font-semibold text-navy">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString("fr-CA") : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
