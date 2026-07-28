"use client";

import { useCallback, useEffect, useState } from "react";
import { Card } from "../ui";

interface Report {
  generated_at: string;
  counts: Record<string, number>;
  integrity: {
    tests_orphelins: number;
    certificats_dupliques: number;
    mappings_casses: number;
  };
}
interface ApiResult { ready: boolean; reason?: string; report?: Report; checkedAt?: string }

const COUNT_ROWS: { key: string; label: string }[] = [
  { key: "comptes", label: "Comptes" },
  { key: "prospects", label: "Prospects" },
  { key: "paiements", label: "Paiements" },
  { key: "progression", label: "Progression (modules)" },
  { key: "certificats", label: "Certificats" },
  { key: "tests", label: "Tests (essais inclus)" },
  { key: "affiliation", label: "Affiliation" },
  { key: "journaux", label: "Journaux" },
  { key: "reglages", label: "Réglages" },
];

function Dot({ state }: { state: "ok" | "ko" | "wait" }) {
  const map = { ok: "✅", ko: "❌", wait: "⏳" };
  return <span className="text-[15px]">{map[state]}</span>;
}

export default function MigrationValidator() {
  const [res, setRes] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const r = await fetch("/api/admin/migration/validate", { cache: "no-store" });
      return (await r.json()) as ApiResult;
    } catch {
      return { ready: false, reason: "réseau" } as ApiResult;
    }
  }, []);

  const check = useCallback(async () => {
    setLoading(true);
    setRes(await load());
    setLoading(false);
  }, [load]);

  // Chargement initial : le setState n'intervient qu'après l'await (hors corps synchrone).
  useEffect(() => {
    let alive = true;
    load().then((r) => { if (alive) { setRes(r); setLoading(false); } });
    return () => { alive = false; };
  }, [load]);

  const ready = res?.ready && res.report;
  const counts = res?.report?.counts ?? {};
  const integ = res?.report?.integrity;

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-xl text-navy">Validateur de migration</h2>
            <p className="text-[13px] text-muted mt-1">
              Contrôles en <strong>lecture seule</strong> des données importées depuis l&apos;ancienne plateforme.
            </p>
          </div>
          <button
            onClick={check}
            disabled={loading}
            className="bg-navy text-gold text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? "Vérification…" : "Revérifier"}
          </button>
        </div>
        {res && !ready && (
          <div className="mt-4 bg-amber-50 border border-amber-300 rounded-[14px] p-4">
            <p className="text-[13px] text-amber-800 leading-[1.6]">
              <strong>Migration non encore appliquée.</strong>{" "}
              {res.reason === "migration_non_appliquee"
                ? "Les tables et fonctions de migration (0005 + 0006) ne sont pas présentes en base. Ce validateur s'activera automatiquement après application des migrations et import."
                : `Raison : ${res.reason ?? "inconnue"}.`}
            </p>
          </div>
        )}
        {res?.checkedAt && (
          <p className="text-[11px] text-muted mt-3">Dernière vérification : {new Date(res.checkedAt).toLocaleString("fr-CA")}</p>
        )}
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {COUNT_ROWS.map((r) => {
          const val = counts[r.key] ?? 0;
          const state: "ok" | "wait" = ready ? "ok" : "wait";
          return (
            <Card key={r.key} className="!p-4">
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] text-muted">{r.label}</span>
                <Dot state={state} />
              </div>
              <div className="font-[family-name:var(--font-heading)] text-2xl text-navy mt-1">
                {ready ? val : "—"}
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <h3 className="font-[family-name:var(--font-heading)] text-[16px] text-navy mb-3">Contrôles d&apos;intégrité</h3>
        <ul className="space-y-2 text-[13.5px]">
          <li className="flex items-center justify-between">
            <span>Aucun test orphelin (ni compte ni prospect ni email)</span>
            <Dot state={!ready ? "wait" : integ?.tests_orphelins === 0 ? "ok" : "ko"} />
          </li>
          <li className="flex items-center justify-between">
            <span>Aucun certificat au numéro dupliqué</span>
            <Dot state={!ready ? "wait" : integ?.certificats_dupliques === 0 ? "ok" : "ko"} />
          </li>
          <li className="flex items-center justify-between">
            <span>Chaque compte mappé pointe vers un utilisateur auth existant</span>
            <Dot state={!ready ? "wait" : integ?.mappings_casses === 0 ? "ok" : "ko"} />
          </li>
        </ul>
        <p className="text-[11.5px] text-muted mt-4 leading-[1.6]">
          Les empreintes SHA256, l&apos;intégrité FK et la préservation des <code>legacy_id</code> sont
          vérifiées côté scripts de migration (voir <code>DATABASE_VALIDATION_REPORT.md</code>) au moment
          de l&apos;import ; ce panneau reflète l&apos;état vivant de la base cible.
        </p>
      </Card>
    </div>
  );
}
