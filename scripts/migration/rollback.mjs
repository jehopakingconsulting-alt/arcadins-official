// ============================================================================
// rollback.mjs — ANNULE un import legacy (retour à l'état d'avant migration).
//
// SÉCURITÉ (triple verrou) :
//   • DRY-RUN par défaut : liste seulement ce qui SERAIT supprimé.
//   • Écriture réelle uniquement si  --live  ET  --confirm  + creds service role.
//   • Suppression des COMPTES auth créés par la migration : exige EN PLUS
//     --purge-auth (sinon on ne touche jamais au schéma auth).
//
// Les tables legacy_* ne contiennent QUE des données de migration : leur vidage
// est sûr et n'affecte aucune donnée native de la nouvelle plateforme.
// Les comptes supprimés sont STRICTEMENT ceux référencés dans legacy_id_map
// (entity='user') — donc uniquement ceux créés par cet import.
// ============================================================================
import { parseFlags } from "./lib.mjs";

const LEGACY_TABLES = [
  "legacy_tests", "legacy_modules", "legacy_certificates", "legacy_payments",
  "legacy_referrals", "legacy_learners", "legacy_prospects",
  "legacy_admin_settings", "legacy_audit_log",
];

async function getTarget(flags) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!flags.willWrite) return null;
  if (!url || !key) { console.error("Rollback réel demandé mais creds absentes — abandon."); process.exit(3); }
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key, { auth: { persistSession: false } });
}

async function main() {
  const flags = parseFlags();
  const purgeAuth = flags.purgeAuth;
  // Portée : pilote (un seul compte) si --user-id, sinon rollback GLOBAL.
  const userId = flags.userId !== null && flags.userId !== undefined && flags.userId !== "" ? Number(flags.userId) : null;
  if (flags.userId && (!Number.isInteger(userId) || userId <= 0)) {
    console.error(`--user-id invalide : « ${flags.userId} » (entier positif attendu).`); process.exit(2);
  }
  const target = await getTarget(flags);
  const scopeLabel = userId !== null ? `PILOTE (legacy_id=${userId})` : "GLOBAL";

  console.log(`\n=== ROLLBACK MIGRATION — ${scopeLabel} (${flags.willWrite ? "LIVE" : "dry-run"}) ===`);

  if (!flags.willWrite || !target) {
    console.log("Mode lecture seule — aucune suppression.");
    if (userId !== null) {
      console.log(`Seraient supprimées : les données legacy du seul compte legacy_id=${userId}`);
      console.log(purgeAuth ? "  + son compte auth (via --purge-auth)" : "  (compte auth CONSERVÉ — ajoutez --purge-auth)");
      console.log(`\nPour exécuter : node rollback.mjs --live --confirm --user-id ${userId} [--purge-auth]`);
    } else {
      console.log("Seraient vidées, dans l'ordre :");
      LEGACY_TABLES.forEach((t) => console.log(`  • ${t}`));
      console.log(purgeAuth ? "  • auth.users créés par la migration" : "  • (comptes auth CONSERVÉS — ajoutez --purge-auth)");
      console.log("\nPour exécuter : node rollback.mjs --live --confirm [--purge-auth]  (rollback GLOBAL)");
    }
    return;
  }

  if (userId !== null) {
    // Rollback ATOMIQUE d'un seul utilisateur.
    const { data, error } = await target.rpc("migrate_rollback_user", { p_legacy_id: userId, p_purge_auth: purgeAuth });
    if (error) { console.error("Rollback pilote échoué :", error.message); process.exit(4); }
    console.log("Résultat :", JSON.stringify(data));
  } else {
    // Rollback ATOMIQUE global (RPC migrate_rollback).
    const { data, error } = await target.rpc("migrate_rollback", { p_purge_auth: purgeAuth });
    if (error) { console.error("Rollback échoué :", error.message); process.exit(4); }
    console.log("Résultat :", JSON.stringify(data));
  }
  console.log("Rollback terminé. Relancez validate-migration.mjs pour confirmer l'état.");
}

main();
