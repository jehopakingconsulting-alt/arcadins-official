import { getAdminSession } from "@/lib/admin-data";
import { hasPermission } from "@/lib/rbac";
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, NotAllowed } from "../ui";
import RefreshButton from "./RefreshButton";

export const dynamic = "force-dynamic";

type State = "ok" | "warn" | "fail" | "na";
interface Check { key: string; label: string; state: State; detail: string; weight: number }

const ICON: Record<State, string> = { ok: "🟢", warn: "🟡", fail: "🔴", na: "⚪" };
const configured = (v?: string, placeholder?: string) =>
  Boolean(v && v.length > 0 && (!placeholder || !v.includes(placeholder)));

async function runChecks(): Promise<Check[]> {
  const checks: Check[] = [];
  const sb = createAdminClient();

  // 1) Base de données — ping léger.
  try {
    const { error } = await sb.from("profiles").select("id").limit(1);
    checks.push(error
      ? { key: "db", label: "Base de données", state: "fail", detail: error.message, weight: 3 }
      : { key: "db", label: "Base de données", state: "ok", detail: "Connexion Postgres OK", weight: 3 });
  } catch (e) {
    checks.push({ key: "db", label: "Base de données", state: "fail", detail: msg(e), weight: 3 });
  }

  // 2) Authentification — creds Supabase présentes.
  checks.push(configured(process.env.NEXT_PUBLIC_SUPABASE_URL) && configured(process.env.SUPABASE_SERVICE_ROLE_KEY, "placeholder")
    ? { key: "auth", label: "Authentification", state: "ok", detail: "Projet Supabase configuré", weight: 3 }
    : { key: "auth", label: "Authentification", state: "fail", detail: "Creds Supabase manquantes", weight: 3 });

  // 3) Storage — buckets accessibles.
  try {
    const { data, error } = await sb.storage.listBuckets();
    checks.push(error
      ? { key: "storage", label: "Stockage (Storage)", state: "warn", detail: error.message, weight: 2 }
      : { key: "storage", label: "Stockage (Storage)", state: "ok", detail: `${data?.length ?? 0} bucket(s)`, weight: 2 });
  } catch (e) {
    checks.push({ key: "storage", label: "Stockage (Storage)", state: "warn", detail: msg(e), weight: 2 });
  }

  // 4) Paiements — Stripe.
  checks.push(configured(process.env.STRIPE_SECRET_KEY, "placeholder")
    ? { key: "pay", label: "Paiements (Stripe)", state: "ok", detail: "Clé secrète présente", weight: 2 }
    : { key: "pay", label: "Paiements (Stripe)", state: "warn", detail: "Clé de test/placeholder", weight: 2 });

  // 5) E-mails / SMTP — fournisseur transactionnel.
  const provider = (process.env.EMAIL_PROVIDER || "console").toLowerCase();
  if (provider === "resend" && configured(process.env.RESEND_API_KEY)) {
    checks.push({ key: "email", label: "E-mails (Resend)", state: "ok", detail: `de ${process.env.EMAIL_FROM || "?"}`, weight: 2 });
  } else {
    checks.push({ key: "email", label: "E-mails (Resend)", state: "warn", detail: `mode « ${provider} »`, weight: 2 });
  }

  // 6) API applicative — cette requête a abouti.
  checks.push({ key: "api", label: "API applicative", state: "ok", detail: "Routes serveur opérationnelles", weight: 1 });

  // 7) Certificats — table legacy accessible.
  await tablePresence(sb, "legacy_certificates", "Certificats (Storage/PDF)", 1, checks);
  // 8) Journaux — table audit accessible.
  await tablePresence(sb, "legacy_audit_log", "Journaux d'audit", 1, checks);
  // 9) Migration — mapping présent.
  await tablePresence(sb, "legacy_id_map", "Socle de migration", 2, checks);

  // 10) Cron / tâches planifiées — pas d'ordonnanceur externe déclaré.
  checks.push({ key: "cron", label: "Tâches planifiées (Cron)", state: "na", detail: "Aucun cron requis à ce stade", weight: 0 });

  // 11) Sauvegardes — suivi manuel documenté.
  checks.push({ key: "backup", label: "Sauvegardes", state: "warn", detail: "PITR Supabase + copie manuelle (voir BACKUP_REPORT.md)", weight: 1 });

  return checks;
}

async function tablePresence(sb: ReturnType<typeof createAdminClient>, table: string, label: string, weight: number, out: Check[]) {
  try {
    const { error } = await sb.from(table).select("*", { count: "exact", head: true });
    if (error && (error.code === "42P01" || error.code === "PGRST205")) {
      out.push({ key: table, label, state: "warn", detail: "Table non encore créée (migration à appliquer)", weight });
    } else if (error) {
      out.push({ key: table, label, state: "warn", detail: error.message, weight });
    } else {
      out.push({ key: table, label, state: "ok", detail: "Table présente", weight });
    }
  } catch (e) {
    out.push({ key: table, label, state: "warn", detail: msg(e), weight });
  }
}

function msg(e: unknown) { return e instanceof Error ? e.message : "erreur"; }

function score(checks: Check[]) {
  const graded = checks.filter((c) => c.state !== "na" && c.weight > 0);
  const total = graded.reduce((s, c) => s + c.weight, 0);
  const got = graded.reduce((s, c) => s + c.weight * (c.state === "ok" ? 1 : c.state === "warn" ? 0.5 : 0), 0);
  return total ? Math.round((got / total) * 100) : 0;
}

export default async function HealthPage() {
  const session = await getAdminSession();
  if (!hasPermission(session.role, "migration.view")) return <NotAllowed />;

  const checks = await runChecks();
  const s = score(checks);
  const tone = s >= 85 ? "text-emerald-600" : s >= 60 ? "text-amber-600" : "text-red-600";

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-xl text-navy">ARCADINS Platform Health</h2>
            <p className="text-[13px] text-muted mt-1">État en temps réel des services essentiels de la plateforme.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className={`font-[family-name:var(--font-heading)] text-4xl font-bold ${tone}`}>{s}<span className="text-lg">/100</span></div>
              <div className="text-[11px] text-muted">score global</div>
            </div>
            <RefreshButton />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {checks.map((c) => (
          <Card key={c.key} className="!p-4">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-medium text-navy">{c.label}</span>
              <span className="text-[15px]">{ICON[c.state]}</span>
            </div>
            <p className="text-[12px] text-muted mt-1 leading-[1.5]">{c.detail}</p>
          </Card>
        ))}
      </div>

      <Card>
        <p className="text-[11.5px] text-muted leading-[1.6]">
          🟢 opérationnel · 🟡 dégradé / à configurer · 🔴 en échec · ⚪ non applicable.
          Le score pondère chaque service selon sa criticité (base de données et authentification au poids fort).
          Panneau en lecture seule — aucune donnée n&apos;est modifiée par ces contrôles.
        </p>
      </Card>
    </div>
  );
}
