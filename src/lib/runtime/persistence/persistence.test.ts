import { test } from "node:test";
import assert from "node:assert/strict";
import { marketingDigitalV2 as C } from "../../academic/marketing-digital-v2.ts";
import { ProgressEngine } from "../progress-engine.ts";
import { LearningEvents } from "../learning-events.ts";
import { RuntimeSerializer, checksum } from "./serializer.ts";
import { RuntimeHydration } from "./hydration.ts";
import {
  InMemoryPersistenceAdapter,
  WebStoragePersistenceAdapter,
  SupabasePersistenceAdapter,
} from "./adapters.ts";
import {
  ProgressRepository,
  StudySessionRepository,
  BookmarkRepository,
  NotesRepository,
  HistoryRepository,
  BadgeRepository,
  CertificateRepository,
} from "./repositories.ts";
import { SyncManager, OfflineQueue, ConflictResolver } from "./sync.ts";
import { RuntimePersistence, AutosaveManager, HeartbeatManager } from "./runtime-persistence.ts";
import { validateSnapshot, PERSISTENCE_DEEP_SPECS } from "./specs.ts";
import type { Awards, KeyValueStorage, SnapshotKey, SupabaseSnapshotClient } from "./types.ts";

const KEY: SnapshotKey = { userId: "u1", programSlug: "marketing-digital" };

function passModule1() {
  let s = ProgressEngine.init(C);
  for (const l of C.modules[0].lessons) s = ProgressEngine.submitQuiz(C, s, l.id, "qz", 85, true);
  s = ProgressEngine.submitSummative(C, s, 1, 80, true);
  s = ProgressEngine.submitPractical(C, s, 1);
  return s;
}

function sampleState() {
  let s = ProgressEngine.init(C);
  s = ProgressEngine.openLesson(C, s, "mkt-v2-m1-l1", "2026-07-30T10:00:00Z");
  s = ProgressEngine.recordStudyTime(C, s, "mkt-v2-m1-l1", 90, "2026-07-30T10:05:00Z");
  s = ProgressEngine.saveNote(C, s, "mkt-v2-m1-l1", "ma note", "2026-07-30T10:06:00Z");
  s = ProgressEngine.toggleBookmark(C, s, "mkt-v2-m1-l1", true, "2026-07-30T10:07:00Z");
  return s;
}

// ── Serializer ──
test("serializer : round-trip et vérification de la somme de contrôle", () => {
  const snap = RuntimeSerializer.createSnapshot({ userId: "u1", state: sampleState() });
  assert.equal(snap.revision, 1);
  assert.equal(RuntimeSerializer.verify(snap), true);
  const json = RuntimeSerializer.toJSON(snap);
  const back = RuntimeSerializer.fromJSON(json);
  assert.ok(back);
  assert.equal(back!.checksum, snap.checksum);
  assert.deepEqual(back!.state.lessons, snap.state.lessons);
});

test("serializer : détecte une corruption", () => {
  const snap = RuntimeSerializer.createSnapshot({ userId: "u1", state: sampleState() });
  const corrupted = { ...snap, checksum: checksum("altered") };
  assert.equal(RuntimeSerializer.verify(corrupted), false);
});

test("serializer : rejette une version de schéma incompatible", () => {
  const snap = RuntimeSerializer.createSnapshot({ userId: "u1", state: sampleState() });
  const bad = JSON.stringify({ ...snap, schemaVersion: 999 });
  assert.equal(RuntimeSerializer.fromJSON(bad), null);
});

// ── Adapters (3 modes, même interface) ──
test("InMemory adapter : save/load/remove", async () => {
  const port = new InMemoryPersistenceAdapter();
  const snap = RuntimeSerializer.createSnapshot({ userId: "u1", state: sampleState() });
  await port.save(snap);
  assert.deepEqual((await port.load(KEY))?.checksum, snap.checksum);
  await port.remove(KEY);
  assert.equal(await port.load(KEY), null);
});

test("WebStorage adapter : fonctionne avec un stockage clé-valeur (local/mobile)", async () => {
  const mem = new Map<string, string>();
  const storage: KeyValueStorage = {
    getItem: (k) => mem.get(k) ?? null,
    setItem: (k, v) => void mem.set(k, v),
    removeItem: (k) => void mem.delete(k),
  };
  const port = new WebStoragePersistenceAdapter(storage, "mobile");
  assert.equal(port.mode, "mobile");
  const snap = RuntimeSerializer.createSnapshot({ userId: "u1", state: sampleState() });
  await port.save(snap);
  assert.equal((await port.load(KEY))?.userId, "u1");
});

test("Supabase adapter : via client injecté, aucune DB réelle", async () => {
  const db = new Map<string, string>();
  const client: SupabaseSnapshotClient = {
    fetchSnapshot: async (k) => db.get(`${k.userId}:${k.programSlug}`) ?? null,
    upsertSnapshot: async (k, json) => void db.set(`${k.userId}:${k.programSlug}`, json),
    deleteSnapshot: async (k) => void db.delete(`${k.userId}:${k.programSlug}`),
  };
  const port = new SupabasePersistenceAdapter(client);
  const snap = RuntimeSerializer.createSnapshot({ userId: "u1", state: sampleState() });
  await port.save(snap);
  assert.equal((await port.load(KEY))?.programSlug, "marketing-digital");
});

// ── Hydration ──
test("hydration : recharge et recalcule les états dérivés", () => {
  const snap = RuntimeSerializer.createSnapshot({ userId: "u1", state: passModule1() });
  const state = RuntimeHydration.fromSnapshot(C, snap);
  assert.equal(state.modules[2].state, "available"); // M2 débloqué après M1
});

test("hydration : rejeu déterministe d'un journal reproduit l'état", () => {
  const s = passModule1();
  const replayed = RuntimeHydration.replay(C, s.events);
  assert.deepEqual(replayed.modules, s.modules);
});

// ── RuntimePersistence ──
test("RuntimePersistence : load/save incrémente la révision", async () => {
  const persistence = new RuntimePersistence(new InMemoryPersistenceAdapter());
  const s = sampleState();
  const first = await persistence.save({ userId: "u1", state: s, prevRevision: 0 });
  assert.equal(first.revision, 1);
  const loaded = await persistence.load(C, KEY);
  assert.equal(loaded.revision, 1);
  const second = await persistence.save({ userId: "u1", state: s, prevRevision: loaded.revision });
  assert.equal(second.revision, 2);
});

// ── Repositories ──
test("repositories : progress/study/bookmark/notes/history", () => {
  const s = sampleState();
  assert.ok(ProgressRepository.program(C, s).percent >= 0);
  assert.equal(StudySessionRepository.total(s), 90);
  assert.deepEqual(BookmarkRepository.favorites(s), ["mkt-v2-m1-l1"]);
  assert.equal(NotesRepository.get(s, "mkt-v2-m1-l1")?.body, "ma note");
  assert.equal(HistoryRepository.recent(s)[0].lessonRef, "mkt-v2-m1-l1");
});

test("BadgeRepository : attribution générique par critères", () => {
  const s = passModule1();
  let awards: Awards = { badges: [], certificates: [] };
  const eligible = BadgeRepository.newlyEligible(C, s, awards);
  assert.ok(eligible.includes("first-lesson"));
  assert.ok(eligible.includes("first-module"));
  awards = BadgeRepository.award(C, s, awards);
  assert.ok(awards.badges.includes("first-module"));
  // Idempotence : pas de doublon.
  const awards2 = BadgeRepository.award(C, s, awards);
  assert.equal(awards2.badges.length, awards.badges.length);
});

test("CertificateRepository : brouillon uniquement si éligible (jamais émis)", () => {
  const notEligible = CertificateRepository.draft(C, sampleState(), 1);
  assert.equal(notEligible, null);
  assert.equal(CertificateRepository.isEligible(C, sampleState()), false);
});

// ── Sync / Offline / Conflits ──
test("SyncManager : local-only puis remote-only", async () => {
  const local = new InMemoryPersistenceAdapter();
  const remote = new InMemoryPersistenceAdapter();
  const sync = new SyncManager(local, remote);
  const snap = RuntimeSerializer.createSnapshot({ userId: "u1", state: sampleState() });
  await local.save(snap);
  const r1 = await sync.sync(KEY);
  assert.equal(r1.strategy, "local-only");
  assert.ok(await remote.load(KEY));

  const local2 = new InMemoryPersistenceAdapter();
  const remote2 = new InMemoryPersistenceAdapter();
  await remote2.save(snap);
  const r2 = await new SyncManager(local2, remote2).sync(KEY);
  assert.equal(r2.strategy, "remote-only");
  assert.ok(await local2.load(KEY));
});

test("SyncManager : LWW par révision (la plus haute gagne)", async () => {
  const local = new InMemoryPersistenceAdapter();
  const remote = new InMemoryPersistenceAdapter();
  const base = sampleState();
  await local.save(RuntimeSerializer.createSnapshot({ userId: "u1", state: base, revision: 1 })); // rev 2
  await remote.save(RuntimeSerializer.createSnapshot({ userId: "u1", state: base, revision: 0 })); // rev 1
  const r = await new SyncManager(local, remote).sync(KEY);
  assert.equal(r.strategy, "revision-lww");
  assert.equal(r.merged.revision, 2);
});

test("SyncManager : event-merge avec rejeu déterministe", async () => {
  const local = new InMemoryPersistenceAdapter();
  const remote = new InMemoryPersistenceAdapter();

  let a = ProgressEngine.init(C);
  a = ProgressEngine.openLesson(C, a, "mkt-v2-m1-l1", "2026-07-30T10:00:00Z");
  let b = ProgressEngine.init(C);
  b = ProgressEngine.openLesson(C, b, "mkt-v2-m1-l2", "2026-07-30T11:00:00Z");

  await local.save(RuntimeSerializer.createSnapshot({ userId: "u1", state: a }));
  await remote.save(RuntimeSerializer.createSnapshot({ userId: "u1", state: b }));

  const r = await new SyncManager(local, remote).sync(KEY, {
    rehydrate: (events) => RuntimeSerializer.createSnapshot({ userId: "u1", state: RuntimeHydration.replay(C, events) }),
  });
  assert.equal(r.strategy, "event-merge");
  // Les deux leçons ont été « vues » après fusion.
  assert.notEqual(r.merged.state.lessons["mkt-v2-m1-l1"].state, "available");
  assert.notEqual(r.merged.state.lessons["mkt-v2-m1-l2"].state, "available");
});

test("ConflictResolver : fusion de journaux dédupliquée et triée", () => {
  const e1 = LearningEvents.lessonViewed("mkt-v2-m1-l1", "2026-07-30T10:00:00Z");
  const e2 = LearningEvents.lessonViewed("mkt-v2-m1-l2", "2026-07-30T11:00:00Z");
  const merged = ConflictResolver.mergeEventLogs([e1, e2], [e1]); // e1 dupliqué
  assert.equal(merged.length, 2);
  assert.equal(merged[0].at <= merged[1].at, true);
});

test("OfflineQueue : conserve les items en échec, vide ceux qui réussissent", async () => {
  const q = new OfflineQueue();
  q.enqueue({ id: "1", at: "t", kind: "event", payload: { ok: true } });
  q.enqueue({ id: "2", at: "t", kind: "event", payload: { ok: false } });
  const res = await q.flush(async (item) => {
    if (!(item.payload as { ok: boolean }).ok) throw new Error("fail");
  });
  assert.deepEqual(res, { done: 1, failed: 1 });
  assert.equal(q.size(), 1);
  assert.equal(q.pending()[0].id, "2");
});

// ── Autosave / Heartbeat ──
test("AutosaveManager : déclenchement par changements ou par intervalle", () => {
  const a = new AutosaveManager({ maxDirty: 3, maxIntervalMs: 1000 }, 0);
  a.markDirty();
  a.markDirty();
  assert.equal(a.isDue(500), false);
  a.markDirty();
  assert.equal(a.isDue(500), true); // 3 changements
  a.saved(500);
  a.markDirty();
  assert.equal(a.isDue(700), false);
  assert.equal(a.isDue(1600), true); // intervalle écoulé
});

test("HeartbeatManager : émet un STUDY_TIME par paliers, flush émet le reste", () => {
  const hb = new HeartbeatManager("mkt-v2-m1-l1", 30);
  hb.tick(10);
  assert.equal(hb.drain(), null);
  hb.tick(25);
  const ev = hb.drain("2026-07-30T10:00:00Z");
  assert.ok(ev);
  assert.equal(ev!.type, "STUDY_TIME");
  assert.equal(ev!.seconds, 35);
  hb.tick(5);
  const rest = hb.flush("2026-07-30T10:01:00Z");
  assert.equal(rest!.seconds, 5);
});

// ── Validation & DeepSpecs ──
test("validateSnapshot : OK pour un instantané sain, KO si corrompu", () => {
  const snap = RuntimeSerializer.createSnapshot({ userId: "u1", state: sampleState() });
  assert.equal(validateSnapshot(snap).ok, true);
  const bad = { ...snap, checksum: "deadbeef" };
  const rep = validateSnapshot(bad);
  assert.equal(rep.ok, false);
  assert.ok(rep.errors.some((e) => e.code === "CHECKSUM"));
});

test("les DeepSpecs de persistence sont documentées (>= 12)", () => {
  assert.ok(PERSISTENCE_DEEP_SPECS.length >= 12);
  assert.ok(PERSISTENCE_DEEP_SPECS.every((s) => s.id && s.description));
});
