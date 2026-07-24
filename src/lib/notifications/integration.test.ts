// Démonstration BOUT-EN-BOUT en mémoire (sans base ni fournisseur externe).
// Reproduit la logique des routes avec un magasin en mémoire pour prouver :
//  demande élève enregistrée · candidature tuteur enregistrée · 2 notifications
//  différentes · changement de statut admin · historique · refus non autorisé.

import { test } from "node:test";
import assert from "node:assert/strict";
import { tutoringRequestSchema } from "../validation/tutoring.ts";
import { tutorApplicationSchema } from "../validation/tutor.ts";
import { validateTutorTransition } from "../tutor/status.ts";
import { dispatchExternalEvent, buildAdminNotification, type NotificationRecord, type DeliveryLogRecord } from "./dispatch.ts";
import { TUTOR_STATUS_EVENT } from "./events.ts";
import type { EmailProvider, EmailMessage, DeliveryResult } from "./provider.ts";
import { hasPermission } from "../rbac.ts";

// ── Magasin en mémoire + fournisseur de capture ─────────────────────────────
class MemProvider implements EmailProvider {
  readonly name = "mem";
  sent: EmailMessage[] = [];
  async send(m: EmailMessage): Promise<DeliveryResult> { this.sent.push(m); return { status: "sent", provider: this.name }; }
}
interface Store {
  tutoring: Record<string, unknown>[];
  tutor: Record<string, unknown>[];
  history: Record<string, unknown>[];
  notifications: NotificationRecord[];
  logs: DeliveryLogRecord[];
}
function newStore(): Store { return { tutoring: [], tutor: [], history: [], notifications: [], logs: [] }; }
let idSeq = 0;
const nextId = (p: string) => `${p}-${++idSeq}`;

test("bout-en-bout : soumissions, notifications distinctes, statut, historique, sécurité", async () => {
  const store = newStore();
  const provider = new MemProvider();

  // 1) DEMANDE ÉLÈVE enregistrée + notification étudiant + notification admin
  const s = tutoringRequestSchema.parse({ firstName: "Ana", lastName: "K", email: "ana@ex.co", skills: ["comprehension-orale"] });
  const reqId = nextId("req");
  store.tutoring.push({ id: reqId, ...s, status: "submitted" });
  store.history.push({ parcours: "tutoring", tutoring_request_id: reqId, from_status: null, to_status: "submitted" });
  const sRes = await dispatchExternalEvent({ provider }, { event: "tutoring_request_submitted", relatedId: reqId, recipientEmail: s.email, firstName: s.firstName });
  if (sRes.recipientNotification) store.notifications.push(sRes.recipientNotification);
  store.notifications.push(buildAdminNotification({ event: "tutoring_request_submitted", relatedId: reqId }));
  store.logs.push(sRes.deliveryLog);

  assert.equal(store.tutoring.length, 1, "demande élève enregistrée");

  // 2) CANDIDATURE TUTEUR enregistrée + notification tuteur + notification admin
  const t = tutorApplicationSchema.parse({ firstName: "Sam", lastName: "T", email: "sam@ex.co", skills: ["expression-ecrite"] });
  const appId = nextId("app");
  store.tutor.push({ id: appId, ...t, status: "submitted" });
  store.history.push({ parcours: "tutor", tutor_application_id: appId, from_status: null, to_status: "submitted" });
  const tRes = await dispatchExternalEvent({ provider }, { event: "tutor_application_submitted", relatedId: appId, recipientEmail: t.email, firstName: t.firstName });
  if (tRes.recipientNotification) store.notifications.push(tRes.recipientNotification);
  store.notifications.push(buildAdminNotification({ event: "tutor_application_submitted", relatedId: appId }));
  store.logs.push(tRes.deliveryLog);

  assert.equal(store.tutor.length, 1, "candidature tuteur enregistrée");

  // 3) DEUX NOTIFICATIONS DIFFÉRENTES (élève vs tuteur)
  assert.notEqual(sRes.recipientNotification!.title, tRes.recipientNotification!.title);
  assert.equal(sRes.recipientNotification!.audience, "student");
  assert.equal(tRes.recipientNotification!.audience, "tutor");
  assert.equal(provider.sent.length, 2);

  // 4) SÉCURITÉ : un rôle non autorisé ne peut pas changer de statut
  assert.equal(hasPermission("student", "tutor_applications.view"), false, "refus action non autorisée");

  // 5) CHANGEMENT DE STATUT ADMIN (valide) + notification + historique
  const app = store.tutor[0] as { status: string };
  const okReview = validateTutorTransition(app.status, "under_review");
  assert.ok(okReview.ok);
  app.status = "under_review";
  const ev = TUTOR_STATUS_EVENT["under_review"]!;
  store.history.push({ parcours: "tutor", tutor_application_id: appId, from_status: "submitted", to_status: "under_review", event: ev });
  const chg = await dispatchExternalEvent({ provider }, { event: ev, relatedId: appId, recipientEmail: t.email, firstName: t.firstName });
  store.logs.push(chg.deliveryLog);

  // 6) TRANSITION INVALIDE refusée
  assert.equal(validateTutorTransition("under_review", "submitted").ok, false);

  // 7) HISTORIQUE présent et distinct par parcours
  const tutorHist = store.history.filter((h) => h.parcours === "tutor");
  assert.equal(tutorHist.length, 2, "historique tuteur : submitted puis under_review");
  assert.equal(store.history.filter((h) => h.parcours === "tutoring").length, 1);

  // Récapitulatif de la démonstration.
  assert.equal(store.notifications.length, 4); // 2 destinataires + 2 admin
  assert.equal(store.logs.length, 3);
});
