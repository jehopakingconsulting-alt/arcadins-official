// reconcile.mjs — compare la SOURCE (meta de l'export) au RÉSULTAT transformé,
// puis écrit ARCADINS_MIGRATION_RECONCILIATION_REPORT.md (version copie locale,
// dry-run). Aucun accès base.
import fs from "node:fs";
import path from "node:path";
import { readJson, META_FILE, TRANSFORMED_FILE, REPORT_FILE, HERE } from "./lib.mjs";

const OUT_MD = path.join(HERE, "..", "..", "ARCADINS_MIGRATION_RECONCILIATION_REPORT.md");

export function runReconcile() {
  const meta = fs.existsSync(META_FILE) ? readJson(META_FILE) : {};
  const out = fs.existsSync(TRANSFORMED_FILE) ? readJson(TRANSFORMED_FILE) : {};
  const rep = fs.existsSync(REPORT_FILE) ? readJson(REPORT_FILE) : { entities: {}, errors: [] };
  const src = meta.counts || {};

  const usersTotal = (src.users === "ABSENTE" ? 0 : src.users) || 0;
  const accounts = out.authUsers?.length || 0;
  const prospectsFromUsers = (out.prospects || []).filter(p => p.origin === "user_prospect").length;

  const lines = [];
  lines.push("# ARCADINS — Rapport de réconciliation (copie LOCALE, dry-run)");
  lines.push("");
  lines.push(`**Date :** ${new Date().toISOString()}`);
  lines.push(`**Source :** ${meta.dbPath || "?"} · **sha256 :** \`${meta.sha256 || "?"}\``);
  lines.push(`**Intégrité :** ${meta.integrity_check || "?"} · **FK violations :** ${meta.foreign_key_violations ?? "?"}`);
  lines.push("");
  lines.push("> ⚠️ Effectué sur la **copie de dév locale** (≈9 comptes), **pas** la production. Le rapport");
  lines.push("> officiel sera régénéré sur le `arcadins.db` de production, avant tout import.");
  lines.push("");
  lines.push("## Comptage source → cible");
  lines.push("| Entité source | Source | Transformé (cible) | Rejeté | Note |");
  lines.push("|---|---|---|---|---|");
  const e = (n) => rep.entities?.[n] || { inserted: 0, rejected: 0 };
  lines.push(`| users | ${usersTotal} | comptes=${accounts} + prospects(depuis users)=${prospectsFromUsers} | ${e("users").rejected} | dédup email + prospects sans compte |`);
  lines.push(`| prospects | ${src.prospects ?? 0} | ${(out.prospects || []).filter(p => p.origin === "prospects").length} | — | table dédiée |`);
  lines.push(`| tests | ${src.tests ?? 0} | ${out.tests?.length || 0} | ${e("tests").rejected} | — |`);
  lines.push(`| modules | ${src.modules ?? 0} | ${(out.modules || []).filter(m => m.track === "learner").length} | ${e("modules").rejected} | learner |`);
  lines.push(`| tuteur_modules | ${src.tuteur_modules ?? 0} | ${(out.modules || []).filter(m => m.track === "tuteur").length} | — | tuteur |`);
  lines.push(`| certificates | ${src.certificates ?? 0} | ${out.certificates?.length || 0} | ${e("certificates").rejected} | + PDF à copier vers Storage |`);
  lines.push(`| affiliate_commissions | ${src.affiliate_commissions ?? 0} | ${out.referralCommissions?.length || 0} | — | → referral_commissions |`);
  lines.push(`| paiements (users payés) | ${accounts ? "≤ comptes" : 0} | ${out.payments?.length || 0} | — | source=legacy_import |`);
  lines.push(`| referral (referred_by) | — | ${out.referralRelationships?.length || 0} | — | generation 1 |`);
  lines.push(`| admin_settings | ${src.admin_settings ?? 0} | ${out.adminSettings?.length || 0} | — | — |`);
  lines.push(`| admin_audit_log | ${src.admin_audit_log ?? 0} | ${out.auditLog?.length || 0} | — | — |`);
  lines.push("");
  lines.push(`## Écarts / rejets journalisés : ${rep.errors?.length || 0}`);
  if (rep.errors?.length) {
    lines.push("| Entité | Réf (legacy_id) | Raison |");
    lines.push("|---|---|---|");
    for (const err of rep.errors.slice(0, 50)) lines.push(`| ${err.entity} | ${err.ref?.legacy_id ?? "?"} | ${err.reason} |`);
  } else {
    lines.push("Aucun rejet — toutes les lignes source sont transformées ou classées.");
  }
  lines.push("");
  lines.push("*Aucun écart critique ne doit rester inexpliqué avant l'import réel.*");

  fs.writeFileSync(OUT_MD, lines.join("\n"));
  console.log(`\n=== RÉCONCILIATION (local dry-run) ===`);
  console.log(`Source users=${usersTotal} → comptes=${accounts}, prospects(users)=${prospectsFromUsers}`);
  console.log(`certs=${out.certificates?.length || 0}, tests=${out.tests?.length || 0}, modules=${out.modules?.length || 0}, commissions=${out.referralCommissions?.length || 0}`);
  console.log(`Rejets: ${rep.errors?.length || 0}`);
  console.log(`→ ${OUT_MD}`);
}

if (process.argv[1]?.endsWith("reconcile.mjs")) runReconcile();
