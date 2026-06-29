import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const firstName = user?.user_metadata?.first_name || "Étudiant";
  const lastName = user?.user_metadata?.last_name || "";

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
            { icon: "📚", label: "Formations actives", value: "0" },
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

        {/* No enrollments */}
        <div className="bg-white border border-gold/16 rounded-[28px] p-10 text-center">
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

        {/* Profile info */}
        <div className="mt-8 bg-white border border-gold/16 rounded-[28px] p-8">
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
