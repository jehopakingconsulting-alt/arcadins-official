// ============================================================================
// preflight-collisions.mjs — LECTURE SEULE. Liste les e-mails source qui existent
// DÉJÀ dans auth.users de la cible → décision de fusion AVANT tout import (A3).
// La RPC 0007 ne modifie jamais rôle/métadonnées d'un compte existant ; ce
// pré-flight rend la décision explicite et traçable.
//
//   node preflight-collisions.mjs            (attendu offline : source seul)
//   node preflight-collisions.mjs --check-target   (compare aux comptes cible)
// ============================================================================
import fs from "node:fs";
import { readJson, TRANSFORMED_FILE, normEmail, redactEmail } from "./lib.mjs";

/** Intersection (emails normalisés) entre source et cible. Pur, testable. */
export function findCollisions(sourceEmails, targetEmails) {
  const target = new Set((targetEmails || []).map(normEmail).filter(Boolean));
  const seen = new Set();
  const out = [];
  for (const e of sourceEmails || []) {
    const n = normEmail(e);
    if (n && target.has(n) && !seen.has(n)) { seen.add(n); out.push(n); }
  }
  return out;
}

async function listTargetEmails() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(url, key, { auth: { persistSession: false } });
  const emails = [];
  for (let page = 1; ; page++) {
    const { data, error } = await sb.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error(error.message);
    const users = data?.users || [];
    emails.push(...users.map((u) => u.email).filter(Boolean));
    if (users.length < 1000) break;
  }
  return emails;
}

async function main() {
  const checkTarget = process.argv.includes("--check-target");
  const out = fs.existsSync(TRANSFORMED_FILE) ? readJson(TRANSFORMED_FILE) : {};
  const sourceEmails = (out.authUsers || []).map((a) => a.email);
  console.log(`\n=== PRÉ-FLIGHT COLLISIONS E-MAIL ===`);
  console.log(`Comptes source : ${sourceEmails.length}`);
  if (!checkTarget) { console.log("Mode offline (source seul). Utilisez --check-target contre la cible."); return; }

  const targetEmails = await listTargetEmails();
  if (!targetEmails) { console.error("Creds absentes — impossible de lire la cible."); process.exit(2); }
  const collisions = findCollisions(sourceEmails, targetEmails);
  console.log(`Comptes cible : ${targetEmails.length}`);
  console.log(`COLLISIONS : ${collisions.length}`);
  for (const e of collisions) console.log(`  ⚠ ${redactEmail(e)}`);
  if (collisions.length) {
    console.log("\nAction requise : décider skip/rattachement AVANT import. La RPC ne modifie");
    console.log("ni rôle ni métadonnées des comptes existants (protection A3).");
  } else {
    console.log("Aucune collision — import direct sûr.");
  }
}

if (process.argv[1]?.endsWith("preflight-collisions.mjs")) main();
