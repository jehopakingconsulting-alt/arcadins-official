// ============================================================================
// Transformation legacy → cible Supabase. Pur (aucune I/O réseau).
// Applique dédup (email normalisé), validation, conservation legacy_id + dates.
// ============================================================================
import {
  normEmail, normPhone, toBool, toNum, parseJsonSafe, parseLegacyDate,
  mapRole, isBcrypt, isEmail, redactEmail,
} from "./lib.mjs";

export function transformAll(data, report) {
  const users = data.users || [];
  const out = {
    authUsers: [], profiles: [], learners: [], prospects: [],
    payments: [], referralRelationships: [], referralCommissions: [],
    tests: [], modules: [], certificates: [], adminSettings: [], auditLog: [],
    idMap: [], // {entity, legacy_id, key}
  };

  // ── 1) USERS : dédup par email normalisé (garder le plus ancien created_at) ─
  const byEmail = new Map();
  for (const u of users) {
    const email = normEmail(u.email);
    if (!isEmail(email)) { report.reject("users", { legacy_id: u.id, email: redactEmail(u.email) }, "email_invalide"); continue; }
    const prev = byEmail.get(email);
    if (!prev) { byEmail.set(email, u); }
    else {
      // doublon : garder le plus ancien, journaliser
      const keep = (parseLegacyDate(prev.created_at) || "") <= (parseLegacyDate(u.created_at) || "") ? prev : u;
      const drop = keep === prev ? u : prev;
      byEmail.set(email, keep);
      report.reject("users", { legacy_id: drop.id, email: redactEmail(email) }, "doublon_email_ignore");
    }
  }

  for (const u of byEmail.values()) {
    const email = normEmail(u.email);
    const role = mapRole(u.role);
    const created = parseLegacyDate(u.created_at);
    const isProspect = String(u.role).toLowerCase() === "prospect";

    if (isProspect) {
      // Prospect = lead, pas de compte auth.
      out.prospects.push({
        origin: "user_prospect", legacy_id: u.id,
        nom: u.nom, prenom: u.prenom, email, telephone: u.telephone, pays: u.pays,
        source: "legacy_user", created_at: created,
      });
      out.idMap.push({ entity: "prospect", legacy_id: u.id, key: email });
      report.count("prospects", "inserted");
      continue;
    }

    // Compte réel → auth.users + profiles + legacy_learners
    const hasPw = isBcrypt(u.password_hash);
    out.authUsers.push({
      legacy_id: u.id, email, role,
      encrypted_password: hasPw ? "<<bcrypt>>" : null, // le hash réel n'est JAMAIS journalisé
      password_strategy: hasPw ? "bcrypt_import" : "reset_link",
      email_confirmed_at: created,
      created_at: created,
      user_metadata: { first_name: u.prenom || "", last_name: u.nom || "", country: u.pays || null },
    });
    out.profiles.push({ legacy_id: u.id, email, role, first_name: u.prenom || "", last_name: u.nom || "", created_at: created });
    out.learners.push({
      legacy_id: u.id, plan: u.plan || u.payment_plan || null, legacy_status: u.status || null,
      country: u.pays || null, phone: u.telephone || null, phone_normalized: normPhone(u.telephone),
      trial_done: toBool(u.trial_done), trial_score: toNum(u.trial_score),
      qualification_done: toBool(u.qualification_done), qualification_score: toNum(u.qualification_score),
      qualification_level: u.qualification_level || null, qualification_started_at: parseLegacyDate(u.qualification_started_at),
      final_test_done: toBool(u.final_test_done), final_test_score: toNum(u.final_test_score),
      final_test_passed: toBool(u.final_test_passed), final_test_started_at: parseLegacyDate(u.final_test_started_at),
      modules_progress: parseJsonSafe(u.modules_progress, {}),
      current_module: toNum(u.current_module) ?? 1, all_modules_done: toBool(u.all_modules_done),
      certificate_id: u.certificate_id || null, certificate_generated_at: parseLegacyDate(u.certificate_generated_at),
      access_expires_at: parseLegacyDate(u.access_expires_at), referral_code: u.referral_code || null,
      is_tuteur_candidat: toBool(u.is_tuteur_candidat), tuteur_application: parseJsonSafe(u.tuteur_application, null),
      tuteur_current_module: toNum(u.tuteur_current_module), tuteur_all_modules_done: toBool(u.tuteur_all_modules_done),
      tuteur_test_done: toBool(u.tuteur_test_done), tuteur_test_score: toNum(u.tuteur_test_score),
      tuteur_test_passed: toBool(u.tuteur_test_passed), moderator_permissions: parseJsonSafe(u.moderator_permissions, null),
      signup_ip: u.signup_ip || null, last_login_at: parseLegacyDate(u.last_login_at),
      last_login_ip: u.last_login_ip || null, last_login_device: u.last_login_device || null,
      created_at: created,
    });
    out.idMap.push({ entity: "user", legacy_id: u.id, key: email });
    report.count("users", "inserted");

    // Paiement (uniquement si confirmé) → historique, aucun prélèvement
    if (toBool(u.payment_confirmed)) {
      out.payments.push({
        legacy_id: u.id, user_legacy_id: u.id,
        provider: (u.payment_method || (u.stripe_session_id ? "stripe" : "paypal")),
        plan: u.payment_plan || u.plan || null, amount_cents: null, currency: "CAD",
        status: "confirmed", method: u.payment_method || null, notes: u.payment_notes || null,
        stripe_session_id: u.stripe_session_id || null, payment_date: parseLegacyDate(u.payment_date),
        source: "legacy_import",
      });
      report.count("payments", "inserted");
    }

    // Relation de parrainage (referred_by) → generation 1
    if (u.referred_by) {
      out.referralRelationships.push({ referrer_legacy_id: u.referred_by, referee_legacy_id: u.id, generation: 1 });
      report.count("referrals", "inserted");
    }
  }

  // ── 2) PROSPECTS (table dédiée) ─────────────────────────────────────────────
  for (const p of data.prospects || []) {
    out.prospects.push({
      origin: "prospects", legacy_id: p.id, nom: p.nom, prenom: p.prenom,
      email: normEmail(p.email), telephone: p.telephone, pays: p.pays,
      source: p.source || "website", created_at: parseLegacyDate(p.created_at),
    });
    report.count("prospects", "inserted");
  }

  // ── 3) TESTS / RESULTS ──────────────────────────────────────────────────────
  const userIds = new Set(out.idMap.filter(m => m.entity === "user").map(m => m.legacy_id));
  for (const t of data.tests || []) {
    if (!userIds.has(t.user_id)) { report.reject("tests", { legacy_id: t.id }, "user_introuvable"); continue; }
    out.tests.push({
      legacy_id: t.id, user_legacy_id: t.user_id, test_type: t.test_type, score: toNum(t.score),
      passed: toBool(t.passed), attempt_number: toNum(t.attempt_number) ?? 1,
      answers: parseJsonSafe(t.answers, []), created_at: parseLegacyDate(t.created_at),
    });
    report.count("tests", "inserted");
  }

  // ── 4) MODULES (learner + tuteur) → progression ─────────────────────────────
  const pushModule = (m, track) => {
    if (!userIds.has(m.user_id)) { report.reject("modules", { legacy_id: m.id, track }, "user_introuvable"); return; }
    out.modules.push({
      legacy_id: m.id, user_legacy_id: m.user_id, track, module_number: m.module_number, status: m.status,
      started_at: parseLegacyDate(m.started_at), completed_at: parseLegacyDate(m.completed_at),
      score: toNum(m.score), test_score: toNum(m.test_score), test_passed: toBool(m.test_passed),
      test_attempts: toNum(m.test_attempts) ?? 0, test_last_attempt_at: parseLegacyDate(m.test_last_attempt_at),
    });
    report.count("modules", "inserted");
  };
  for (const m of data.modules || []) pushModule(m, "learner");
  for (const m of data.tuteur_modules || []) pushModule(m, "tuteur");

  // ── 5) CERTIFICATES ─────────────────────────────────────────────────────────
  const seenCert = new Set();
  for (const c of data.certificates || []) {
    if (seenCert.has(c.certificate_number)) { report.reject("certificates", { legacy_id: c.id }, "numero_duplique"); continue; }
    seenCert.add(c.certificate_number);
    out.certificates.push({
      legacy_id: c.id, user_legacy_id: c.user_id, certificate_number: c.certificate_number,
      nom: c.nom, prenom: c.prenom, programme: c.programme || "Attestation de complétion ARCADINS",
      score: toNum(c.score), issued_at: parseLegacyDate(c.issued_at),
      storage_path: c.pdf_path ? `legacy-certificates/${c.certificate_number}.pdf` : null,
    });
    report.count("certificates", "inserted");
  }

  // ── 6) AFFILIATE COMMISSIONS ────────────────────────────────────────────────
  for (const a of data.affiliate_commissions || []) {
    out.referralCommissions.push({
      legacy_id: a.id, referrer_legacy_id: a.referrer_id, referee_legacy_id: a.referred_user_id,
      generation: 1, plan: a.plan || null,
      commission_amount_cents: a.amount != null ? Math.round(Number(a.amount) * 100) : 0,
      currency: "CAD", status: a.status === "paid" ? "paid" : "pending",
      created_at: parseLegacyDate(a.created_at), paid_at: parseLegacyDate(a.paid_at), source: "legacy_import",
    });
    report.count("commissions", "inserted");
  }

  // ── 7) SETTINGS + AUDIT LOG ─────────────────────────────────────────────────
  for (const s of data.admin_settings || []) { out.adminSettings.push({ key: s.key, value: s.value }); report.count("admin_settings", "inserted"); }
  for (const l of data.admin_audit_log || []) {
    out.auditLog.push({
      legacy_id: l.id, admin_legacy_id: l.admin_id, action: l.action, target_legacy_id: l.target_user_id,
      details: parseJsonSafe(l.details, null), ip: l.ip, created_at: parseLegacyDate(l.created_at),
    });
    report.count("audit_log", "inserted");
  }

  return out;
}
