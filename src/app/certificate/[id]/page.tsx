import { createAdminClient } from "@/lib/supabase/admin";
import { PROGRAMS } from "@/lib/constants";
import Link from "next/link";
import { notFound } from "next/navigation";
import PrintButton from "@/components/certificate/PrintButton";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: cert } = await supabase
    .from("certificates")
    .select("id, certificate_number, student_name, issued_at, course_slug, program_id, programs(name_fr)")
    .eq("id", id)
    .maybeSingle();

  if (!cert) notFound();

  const program = cert.programs as unknown as { name_fr: string } | null;
  const courseInfo = PROGRAMS.find((p) => p.slug === cert.course_slug);
  const courseName = program?.name_fr || courseInfo?.name || cert.course_slug;
  const issuedDate = new Date(cert.issued_at).toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-off-white pt-32 pb-20 px-7">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-6 print:hidden">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Vérification de certificat</p>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-navy mb-2">Certificat authentique ✓</h1>
          <p className="text-muted text-sm">Ce certificat a été vérifié dans la base de données officielle ARCADINS.</p>
        </div>

        {/* Certificate */}
        <div className="bg-navy rounded-[28px] p-12 border-4 border-gold relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          <div className="relative text-center">
            <div className="text-5xl mb-3">🏆</div>
            <div className="text-gold text-xs font-bold tracking-[4px] uppercase mb-1">ARCADINS Training Center</div>
            <div className="text-white/40 text-[11px] tracking-[2px] uppercase mb-8">Formation Professionnelle Certifiée</div>

            <div className="font-[family-name:var(--font-heading)] text-xl text-white/70 mb-3">Certificat de réussite décerné à</div>
            <div className="font-[family-name:var(--font-heading)] text-4xl text-gold italic mb-8">{cert.student_name}</div>

            <div className="text-white/80 text-base mb-1">pour avoir complété avec succès la formation</div>
            <div className="font-[family-name:var(--font-heading)] text-2xl text-white mb-8">{courseName}</div>

            <div className="flex items-center justify-center gap-8 mb-8 text-sm">
              <div>
                <div className="text-white/40 text-[10px] uppercase tracking-[1px]">Durée</div>
                <div className="text-white font-semibold">24 semaines</div>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div>
                <div className="text-white/40 text-[10px] uppercase tracking-[1px]">Délivré le</div>
                <div className="text-white font-semibold">{issuedDate}</div>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div>
                <div className="text-white/40 text-[10px] uppercase tracking-[1px]">N° de certificat</div>
                <div className="text-white font-semibold font-[family-name:var(--font-mono)]">{cert.certificate_number}</div>
              </div>
            </div>

            <div className="w-16 h-16 bg-white rounded-md mx-auto mb-2 flex items-center justify-center text-3xl">▦</div>
            <div className="text-white/30 text-[11px]">Vérifiable à arcadins-official.vercel.app/certificate/{cert.id}</div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-6 print:hidden">
          <PrintButton />
          <Link href="/dashboard" className="bg-white border border-gold/25 text-navy font-bold text-sm px-6 py-3 rounded-xl">
            ← Mon tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
}
