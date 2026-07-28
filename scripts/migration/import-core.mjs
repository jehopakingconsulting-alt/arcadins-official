// ============================================================================
// import-core.mjs — cœur des imports legacy → Supabase.
//
// SÉCURITÉ (double verrou) :
//   • DRY-RUN par défaut : n'analyse et ne COMPTE que ce qui SERAIT écrit.
//   • L'écriture réelle n'a lieu QUE si :  --live  ET  --confirm
//     ET  NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY présents.
//   Sans ces trois conditions → aucune connexion, aucune écriture.
//
// IDEMPOTENCE : chaque entité est ré-exécutable sans doublon
//   • comptes  → RPC migrate_import_account (upsert par email, atomique)
//   • autres   → upsert par clé naturelle (legacy_id / certificate_number / key)
//
// Les FK inter-entités sont résolues via public.legacy_id_map (rempli par la
// RPC lors de l'import des comptes). Les hachages bcrypt réels ne transitent
// QU'À l'exécution live, lus depuis la copie LOCALE legacy-export.json — ils
// ne sont jamais journalisés (voir Report / redactEmail).
// ============================================================================
import fs from "node:fs";
import {
  readJson, EXPORT_FILE, TRANSFORMED_FILE, Report, parseFlags, isBcrypt,
} from "./lib.mjs";

// ── Portée de l'import : pilote (--user-id) vs complet (--all) ───────────────
// Règle de sécurité : un import RÉEL (willWrite) est REFUSÉ tant qu'aucune cible
// explicite n'est fournie. Il faut soit `--user-id <id>` (pilote, un seul
// compte), soit `--all` (import complet assumé). Le dry-run conserve son
// comportement d'origine : sans cible il simule TOUT ; avec --user-id il ne
// prévisualise que ce compte.
export function resolveScope(flags) {
  if (flags.userId !== null && flags.userId !== undefined && flags.userId !== "") {
    const id = Number(flags.userId);
    if (!Number.isInteger(id) || id <= 0) return { error: `--user-id invalide : « ${flags.userId} » (entier positif attendu)` };
    return { mode: "user", userId: id };
  }
  if (flags.willWrite && !flags.all) {
    return { error: "refus de sécurité : import réel sans cible. Fournissez --user-id <id> (pilote) ou --all (import complet)." };
  }
  return { mode: "all" };
}

// Restreint les données transformées à UN seul utilisateur (par legacy_id).
// Les entités non rattachées à un compte (prospects, réglages, journaux) sont
// exclues du périmètre pilote.
export function filterByUser(data, userId) {
  const id = Number(userId);
  const owns = (v) => Number(v) === id;
  return {
    ...data,
    authUsers: (data.authUsers || []).filter((a) => owns(a.legacy_id)),
    profiles: (data.profiles || []).filter((p) => owns(p.legacy_id)),
    learners: (data.learners || []).filter((l) => owns(l.legacy_id)),
    payments: (data.payments || []).filter((p) => owns(p.user_legacy_id)),
    modules: (data.modules || []).filter((m) => owns(m.user_legacy_id)),
    tests: (data.tests || []).filter((t) => t.kind === "account" && owns(t.user_legacy_id)),
    certificates: (data.certificates || []).filter((c) => owns(c.user_legacy_id)),
    referralRelationships: (data.referralRelationships || []).filter((r) => owns(r.referrer_legacy_id) || owns(r.referee_legacy_id)),
    referralCommissions: (data.referralCommissions || []).filter((c) => owns(c.referrer_legacy_id) || owns(c.referee_legacy_id)),
    prospects: [],
    adminSettings: [],
    auditLog: [],
  };
}

// Entité logique → tranches du fichier transformé (utilisé pour le dry-run).
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
  if (!url || !key) {
    console.error("Écriture demandée mais creds Supabase absentes — abandon (sécurité).");
    process.exit(3);
  }
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key, { auth: { persistSession: false } });
}

// ── Lecture paginée robuste (contourne le plafond db-max-rows de PostgREST) ───
// Itère par pages jusqu'à épuisement → aucune perte silencieuse à grande échelle
// (100 → 100 000+ lignes), mémoire bornée à une page à la fois.
export const PAGE = 1000;
export async function selectAllPaged(query) {
  const rows = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await query().range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    const batch = data || [];
    rows.push(...batch);
    if (batch.length < PAGE) break; // dernière page atteinte
  }
  return rows;
}

// ── Résolution legacy_id → uuid via legacy_id_map (cache mémoire) ────────────
async function loadIdMap(target, entity) {
  const map = new Map();
  const data = await selectAllPaged(() =>
    target.from("legacy_id_map").select("legacy_id,new_id").eq("entity", entity),
  );
  for (const r of data) map.set(Number(r.legacy_id), r.new_id);
  return map;
}

// ── Hachages bcrypt réels (LOCAL uniquement, jamais journalisés) ─────────────
function loadRealHashes() {
  const map = new Map();
  if (fs.existsSync(EXPORT_FILE)) {
    const ex = readJson(EXPORT_FILE);
    for (const u of ex.users || []) map.set(Number(u.id), u.password_hash || null);
  }
  return map;
}

async function upsertBatch(target, table, rows, onConflict, report, bucket) {
  if (!rows.length) return;
  for (let i = 0; i < rows.length; i += 500) {
    const chunk = rows.slice(i, i + 500);
    const { error } = await target.from(table).upsert(chunk, { onConflict, ignoreDuplicates: false });
    if (error) { chunk.forEach(() => report.reject(bucket, {}, `upsert_${table}: ${error.message}`)); continue; }
    chunk.forEach(() => report.count(bucket, "inserted"));
  }
}

// ── Écrivains LIVE par entité (jamais atteints sans --live --confirm + creds) ─
const LIVE_WRITERS = {
  async users(target, data, report) {
    const hashes = loadRealHashes();
    const learnerById = new Map((data.learners || []).map((l) => [Number(l.legacy_id), l]));
    for (const a of data.authUsers || []) {
      const hash = hashes.get(Number(a.legacy_id));
      const learner = learnerById.get(Number(a.legacy_id));
      const payload = {
        legacy_id: a.legacy_id, email: a.email, role: a.role,
        encrypted_password: isBcrypt(hash) ? hash : null,
        first_name: a.user_metadata?.first_name || "",
        last_name: a.user_metadata?.last_name || "",
        country: a.user_metadata?.country || null,
        created_at: a.created_at,
        learner: learner ? sanitizeLearner(learner) : null,
      };
      const { error } = await target.rpc("migrate_import_account", { payload });
      if (error) report.reject("users", { legacy_id: a.legacy_id }, `rpc: ${error.message}`);
      else report.count("users", "inserted");
    }
  },

  async prospects(target, data, report) {
    const rows = (data.prospects || []).map((p) => ({
      legacy_id: p.legacy_id, origin: p.origin, nom: p.nom, prenom: p.prenom,
      email: p.email, telephone: p.telephone, pays: p.pays, source: p.source, created_at: p.created_at,
    }));
    await upsertBatch(target, "legacy_prospects", rows, "origin,legacy_id", report, "prospects");
  },

  async payments(target, data, report) {
    const uid = await loadIdMap(target, "user");
    const rows = (data.payments || []).map((p) => ({
      legacy_id: p.legacy_id, user_id: uid.get(Number(p.user_legacy_id)) || null,
      provider: p.provider, plan: p.plan, amount_cents: p.amount_cents, currency: p.currency,
      status: p.status, method: p.method, notes: p.notes, stripe_session_id: p.stripe_session_id,
      payment_date: p.payment_date, source: p.source,
    })).filter((p) => p.user_id);
    await upsertBatch(target, "legacy_payments", rows, "user_id,legacy_id", report, "payments");
  },

  async progress(target, data, report) {
    const uid = await loadIdMap(target, "user");
    const rows = (data.modules || []).map((m) => ({
      legacy_id: m.legacy_id, user_id: uid.get(Number(m.user_legacy_id)) || null, track: m.track,
      module_number: m.module_number, status: m.status, started_at: m.started_at, completed_at: m.completed_at,
      score: m.score, test_score: m.test_score, test_passed: m.test_passed,
      test_attempts: m.test_attempts, test_last_attempt_at: m.test_last_attempt_at,
    })).filter((m) => m.user_id);
    await upsertBatch(target, "legacy_modules", rows, "user_id,track,module_number", report, "progress");
  },

  async results(target, data, report) {
    const uid = await loadIdMap(target, "user");
    // Prospects (origin user_prospect) : legacy_id → uuid de legacy_prospects.
    const pros = await selectAllPaged(() =>
      target.from("legacy_prospects").select("id,legacy_id").eq("origin", "user_prospect"),
    );
    const prospectByLegacy = new Map(pros.map((p) => [Number(p.legacy_id), p.id]));
    const rows = (data.tests || []).map((t) => ({
      legacy_test_id: t.legacy_test_id,
      user_id: t.kind === "account" ? (uid.get(Number(t.user_legacy_id)) || null) : null,
      prospect_id: t.kind === "prospect" ? (prospectByLegacy.get(Number(t.prospect_legacy_id)) || null) : null,
      email: t.email, test_type: t.test_type, score: t.score, passed: t.passed,
      attempt_number: t.attempt_number, langue: t.langue, answers: t.answers, date: t.date,
      converted: t.converted,
    }));
    await upsertBatch(target, "legacy_tests", rows, "legacy_test_id", report, "results");
  },

  async certificates(target, data, report) {
    const uid = await loadIdMap(target, "user");
    const rows = (data.certificates || []).map((c) => ({
      legacy_id: c.legacy_id, user_id: uid.get(Number(c.user_legacy_id)) || null,
      certificate_number: c.certificate_number, nom: c.nom, prenom: c.prenom,
      programme: c.programme, score: c.score, issued_at: c.issued_at, storage_path: c.storage_path,
    }));
    await upsertBatch(target, "legacy_certificates", rows, "certificate_number", report, "certificates");
  },

  async referrals(target, data, report) {
    const uid = await loadIdMap(target, "user");
    const rel = (data.referralRelationships || []).map((r, i) => ({
      legacy_id: i + 1, kind: "relationship",
      referrer_legacy_id: r.referrer_legacy_id, referee_legacy_id: r.referee_legacy_id,
      referrer_id: uid.get(Number(r.referrer_legacy_id)) || null,
      referee_id: uid.get(Number(r.referee_legacy_id)) || null,
      generation: r.generation, source: "legacy_import",
    }));
    const com = (data.referralCommissions || []).map((c) => ({
      legacy_id: c.legacy_id, kind: "commission",
      referrer_legacy_id: c.referrer_legacy_id, referee_legacy_id: c.referee_legacy_id,
      referrer_id: uid.get(Number(c.referrer_legacy_id)) || null,
      referee_id: uid.get(Number(c.referee_legacy_id)) || null,
      generation: c.generation, plan: c.plan, commission_amount_cents: c.commission_amount_cents,
      currency: c.currency, status: c.status, created_at: c.created_at, paid_at: c.paid_at, source: c.source,
    }));
    await upsertBatch(target, "legacy_referrals", [...rel, ...com], "kind,legacy_id", report, "referrals");
  },

  async settings(target, data, report) {
    const rows = (data.adminSettings || []).map((s) => ({ key: s.key, value: s.value }));
    await upsertBatch(target, "legacy_admin_settings", rows, "key", report, "settings");
  },

  async audit(target, data, report) {
    const rows = (data.auditLog || []).map((l) => ({
      legacy_id: l.legacy_id, admin_legacy_id: l.admin_legacy_id, action: l.action,
      target_legacy_id: l.target_legacy_id, details: l.details, ip: l.ip, created_at: l.created_at,
    }));
    await upsertBatch(target, "legacy_audit_log", rows, "legacy_id", report, "audit");
  },
};

// Ne conserve que les colonnes réelles de legacy_learners (jsonb_populate_record
// côté SQL ignore les clés inconnues, mais on retire user_id/legacy_id ambigus ici).
function sanitizeLearner(l) {
  const { legacy_id, ...rest } = l; // legacy_id géré par la RPC via le mapping
  return { legacy_id, ...rest };
}

export async function importEntity(entity, flags = parseFlags(), report = new Report()) {
  const slices = ENTITY_SLICES[entity];
  if (!slices) { console.error(`Entité inconnue : ${entity}`); process.exit(1); }
  if (!fs.existsSync(TRANSFORMED_FILE)) { console.error("transformed.json absent — lancez run-dryrun.mjs"); process.exit(1); }
  const raw = readJson(TRANSFORMED_FILE);

  // Portée (pilote / complet) : refuse tout import réel sans cible explicite.
  const scope = resolveScope(flags);
  if (scope.error) { console.error(scope.error); process.exit(5); }

  let data = raw;
  if (scope.mode === "user") {
    const exists = (raw.authUsers || []).some((a) => Number(a.legacy_id) === scope.userId);
    if (!exists) { console.error(`--user-id ${scope.userId} : aucun compte correspondant dans les données transformées.`); process.exit(6); }
    data = filterByUser(raw, scope.userId);
    console.log(`Mode PILOTE — un seul utilisateur (legacy_id=${scope.userId}).`);
  }

  const target = await getTarget(flags);

  if (!flags.willWrite || !target) {
    // ── DRY-RUN : simule l'idempotence (cible vide au 1er passage → inserted) ──
    for (const slice of slices) report.count(slice, "inserted", (data[slice] || []).length);
    return report;
  }

  // ── MODE RÉEL : délègue à l'écrivain de l'entité (transactionnel/idempotent) ─
  const writer = LIVE_WRITERS[entity];
  if (!writer) { console.error(`Aucun écrivain live pour ${entity}`); process.exit(1); }
  await writer(target, data, report);
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
