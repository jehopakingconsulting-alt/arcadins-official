// ============================================================================
// validate-migration.mjs — VALIDATION post-import (LECTURE SEULE).
// Compare l'ATTENDU (méta de l'export source + résultat transformé) au RÉEL
// (comptages cible via la RPC migrate_validation_report, si creds fournies).
// Écrit DATABASE_VALIDATION_REPORT.md. N'écrit JAMAIS dans la base.
//
//   node validate-migration.mjs                 → rapport ATTENDU seul (offline)
//   node validate-migration.mjs --check-target  → compare aussi au réel (lecture)
// ============================================================================
import fs from "node:fs";
import path from "node:path";
import { readJson, META_FILE, TRANSFORMED_FILE, HERE, parseFlags } from "./lib.mjs";
import { filterByUser } from "./import-core.mjs";

const OUT_MD = path.join(HERE, "..", "..", "DATABASE_VALIDATION_REPORT.md");

async function readTargetCounts(userId) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) { console.warn("Creds absentes → validation ATTENDU seul (pas de lecture cible)."); return null; }
  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(url, key, { auth: { persistSession: false } });
  // LECTURE SEULE — RPC pilote si --user-id, sinon RPC globale.
  const { data, error } = userId !== null
    ? await sb.rpc("migrate_validation_user", { p_legacy_id: userId })
    : await sb.rpc("migrate_validation_report");
  if (error) { console.error("Lecture cible échouée :", error.message); return null; }
  return data;
}

function expectedFrom(userId) {
  const meta = fs.existsSync(META_FILE) ? readJson(META_FILE) : {};
  let out = fs.existsSync(TRANSFORMED_FILE) ? readJson(TRANSFORMED_FILE) : {};
  if (userId !== null) out = filterByUser(out, userId);
  return {
    meta,
    comptes: out.authUsers?.length || 0,
    prospects: out.prospects?.length || 0,
    paiements: out.payments?.length || 0,
    progression: out.modules?.length || 0,
    certificats: out.certificates?.length || 0,
    tests: out.tests?.length || 0,
    affiliation: (out.referralRelationships?.length || 0) + (out.referralCommissions?.length || 0),
    journaux: out.auditLog?.length || 0,
    reglages: out.adminSettings?.length || 0,
  };
}

async function main() {
  const flags = parseFlags();
  const checkTarget = process.argv.includes("--check-target");
  const userId = flags.userId !== null && flags.userId !== undefined && flags.userId !== "" ? Number(flags.userId) : null;
  if (flags.userId && (!Number.isInteger(userId) || userId <= 0)) {
    console.error(`--user-id invalide : « ${flags.userId} » (entier positif attendu).`); process.exit(2);
  }
  const exp = expectedFrom(userId);
  const target = checkTarget ? await readTargetCounts(userId) : null;
  const tc = target?.counts || null;
  const integ = target?.integrity || null;

  const row = (label, key) => {
    const e = exp[key] ?? 0;
    const a = tc ? (tc[key] ?? 0) : null;
    const ok = tc ? (a === e ? "✅" : "❌") : "⏳";
    return `| ${label} | ${e} | ${tc ? a : "—"} | ${ok} |`;
  };

  const L = [];
  L.push("# ARCADINS — Rapport de validation de base de données (RC1)");
  L.push("");
  L.push(`**Date :** ${new Date().toISOString()}`);
  L.push(`**Source :** ${exp.meta.dbPath || "?"} · **sha256 :** \`${exp.meta.sha256 || "?"}\``);
  L.push(`**Intégrité source :** ${exp.meta.integrity_check || "?"} · **FK :** ${exp.meta.foreign_key_violations ?? "?"}`);
  L.push(`**Portée :** ${userId !== null ? `PILOTE — un seul utilisateur (legacy_id=${userId})` : "COMPLÈTE"}`);
  L.push(`**Mode :** ${tc ? "ATTENDU vs RÉEL (lecture cible)" : "ATTENDU seul (offline, aucune lecture cible)"}`);
  if (userId !== null && tc) L.push(`**Compte cible :** mappé=${target.mapped ? "oui" : "non"} · auth présent=${target.auth_exists ? "oui" : "non"}`);
  L.push("");
  L.push("## Comptages");
  L.push("| Catégorie | Attendu | Réel (cible) | État |");
  L.push("|---|---|---|---|");
  L.push(row("Comptes", "comptes"));
  L.push(row("Prospects", "prospects"));
  L.push(row("Paiements", "paiements"));
  L.push(row("Progression (modules)", "progression"));
  L.push(row("Certificats", "certificats"));
  L.push(row("Tests (Option A)", "tests"));
  L.push(row("Affiliation", "affiliation"));
  L.push(row("Journaux", "journaux"));
  L.push(row("Réglages", "reglages"));
  L.push("");
  L.push("## Intégrité (cible)");
  if (integ) {
    L.push("| Contrôle | Valeur | État |");
    L.push("|---|---|---|");
    L.push(`| Tests orphelins | ${integ.tests_orphelins} | ${integ.tests_orphelins === 0 ? "✅" : "❌"} |`);
    L.push(`| Certificats dupliqués | ${integ.certificats_dupliques} | ${integ.certificats_dupliques === 0 ? "✅" : "❌"} |`);
    L.push(`| Mappings comptes cassés | ${integ.mappings_casses} | ${integ.mappings_casses === 0 ? "✅" : "❌"} |`);
  } else {
    L.push("_Non évaluée (mode offline). Lancer `--check-target` après import pour les contrôles d'intégrité._");
  }
  L.push("");
  L.push("> Rapport en LECTURE SEULE — aucune donnée n'a été modifiée pour le produire.");

  fs.writeFileSync(OUT_MD, L.join("\n"));
  console.log(`\n=== VALIDATION (${tc ? "cible lue" : "attendu seul"}) ===`);
  console.log(`Comptes attendus=${exp.comptes} tests=${exp.tests} certs=${exp.certificats}`);
  if (tc) console.log(`Cible : comptes=${tc.comptes} tests=${tc.tests} certs=${tc.certificats}`);
  console.log(`→ ${OUT_MD}`);
}

main();
