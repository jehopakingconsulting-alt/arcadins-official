// ============================================================================
// import-core.mjs — cœur des imports. DRY-RUN par défaut : ne fait qu'analyser
// et compter ce qui SERAIT inséré/mis à jour (idempotence par legacy_id/email/
// certificate_number). L'écriture réelle vers Supabase n'a lieu QUE si
// --live --confirm + creds présentes (NEXT_PUBLIC_SUPABASE_URL + SERVICE_ROLE).
// ============================================================================
import fs from "node:fs";
import { readJson, TRANSFORMED_FILE, Report, parseFlags } from "./lib.mjs";

// Mapping entité logique → clé du fichier transformé + clé d'idempotence.
const ENTITY_SLICES = {
  users: ["authUsers", "profiles", "learners"],
  payments: ["payments"],
  progress: ["modules"],
  results: ["tests"],
  certificates: ["certificates"],
  referrals: ["referralRelationships", "referralCommissions"],
  prospects: ["prospects"],
  settings: ["adminSettings"],
  audit: ["auditLog"],
};

async function getTarget(flags) {
  if (!flags.willWrite) return null; // dry-run → aucune écriture
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) { console.error("Écriture demandée mais creds Supabase absentes — abandon (sécurité)."); process.exit(3); }
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function importEntity(entity, flags = parseFlags(), report = new Report()) {
  const slices = ENTITY_SLICES[entity];
  if (!slices) { console.error(`Entité inconnue : ${entity}`); process.exit(1); }
  if (!fs.existsSync(TRANSFORMED_FILE)) { console.error("transformed.json absent — lancez transform-legacy.mjs"); process.exit(1); }
  const data = readJson(TRANSFORMED_FILE);
  const target = await getTarget(flags);

  for (const slice of slices) {
    const rows = data[slice] || [];
    for (const row of rows) {
      if (!flags.willWrite) {
        // DRY-RUN : on simule l'idempotence (cible vide au 1er passage → inserted).
        report.count(slice, "inserted");
        continue;
      }
      // MODE RÉEL (jamais atteint sans --live --confirm + creds) — upsert idempotent.
      // NOTE : l'auth (authUsers) et les FK par legacy_id nécessitent le legacy_id_map
      // et la migration 0005 appliquée ; câblé lors de l'exécution réelle validée.
      // (target = client Supabase, row = enregistrement à upserter — branchés à l'exécution validée.)
      if (target && row) report.count(slice, "skipped"); // placeholder tant que la cible réelle n'est pas branchée
      else report.count(slice, "skipped");
    }
  }
  return report;
}

// Entrée CLI générique (utilisée par les wrappers import-*.mjs).
export async function runImport(entity) {
  const flags = parseFlags();
  const report = new Report();
  await importEntity(entity, flags, report);
  report.save();
  report.print(`IMPORT ${entity.toUpperCase()} (${flags.willWrite ? "LIVE" : "dry-run"})`);
}
