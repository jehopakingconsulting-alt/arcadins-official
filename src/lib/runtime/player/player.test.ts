import { test } from "node:test";
import assert from "node:assert/strict";
import { marketingDigitalV2 as C } from "../../academic/marketing-digital-v2.ts";
import { createRuntimeStore } from "../store.ts";
import { LearningEvents } from "../learning-events.ts";
import { InMemoryPersistenceAdapter } from "../persistence/adapters.ts";
import { RuntimePersistence, AutosaveManager } from "../persistence/runtime-persistence.ts";
import { LessonRenderer, DefaultResourceProvider, type ResourceProvider } from "./renderer.ts";
import { LessonStateController, LessonNavigator, LessonTimeline, LessonProgressBar } from "./controllers.ts";
import { LessonPlayer } from "./player.ts";
import { RecordingDownloadManager, NoopMediaPlayer, type VideoPlayerAdapter, type ResourceViewerAdapter } from "./media.ts";
import { validateLessonView, validateMediaAdapters, PLAYER_DEEP_SPECS } from "./specs.ts";
import type { LessonV2 } from "@/lib/academic/types";
import type { ResourceItem } from "./types.ts";

const L1 = "mkt-v2-m1-l1";
const M1 = C.modules[0];

function player(opts: Parameters<typeof buildPlayer>[0] = {}) {
  return buildPlayer(opts);
}
function buildPlayer(opts: {
  media?: ConstructorParameters<typeof LessonPlayer>[0]["media"];
  resourceProvider?: ResourceProvider;
  persistence?: ConstructorParameters<typeof LessonPlayer>[0]["persistence"];
} = {}) {
  const store = createRuntimeStore(C);
  const p = new LessonPlayer({ curriculum: C, store, ...opts });
  return { store, p };
}

// ── Renderer ──
test("renderer : produit des blocs et ne divulgue aucune bonne réponse", () => {
  const lesson = M1.lessons.find((l) => l.id === L1) as LessonV2;
  const blocks = LessonRenderer.toBlocks(lesson);
  assert.ok(blocks.some((b) => b.type === "paragraph" || b.type === "section"));
  assert.ok(blocks.some((b) => b.type === "keyTakeaways"));
  const quiz = blocks.find((b) => b.type === "quizRef");
  assert.ok(quiz && "quizId" in quiz && "questionCount" in quiz);
  const serialized = JSON.stringify(blocks);
  assert.equal(serialized.includes("correct"), false);
  assert.equal(serialized.includes("correctIndex"), false);
});

// ── State/ViewModel ──
test("viewModel : leçon 1 accessible, leçon du module 2 verrouillée", () => {
  const { store } = buildPlayer();
  const v1 = LessonStateController.viewModel(C, store.getState(), L1);
  assert.ok(v1);
  assert.equal(v1!.accessible, true);
  assert.equal(v1!.hasPrev, false);
  assert.equal(v1!.hasNext, true);
  const v2 = LessonStateController.viewModel(C, store.getState(), "mkt-v2-m2-l1");
  assert.equal(v2!.accessible, false);
});

// ── LessonPlayer : ouverture, heartbeat, notes, favoris, complétion ──
test("player : ouvrir une leçon met à jour la vue et l'historique", () => {
  const { p } = buildPlayer();
  p.controls.open(L1, "2026-07-30T10:00:00Z");
  const view = p.getView();
  assert.equal(view.current?.lessonRef, L1);
  assert.notEqual(view.current?.state, "locked");
});

test("player : refuse d'ouvrir une leçon verrouillée", () => {
  const { p } = buildPlayer();
  p.controls.open("mkt-v2-m2-l1");
  assert.equal(p.currentRefValue(), null);
});

test("player : heartbeat accumule et dispatche STUDY_TIME par paliers", () => {
  const { p } = buildPlayer();
  p.controls.open(L1);
  p.controls.heartbeat(10);
  assert.equal(p.getView().timeSpentSeconds, 0); // sous le palier (30s)
  p.controls.heartbeat(25);
  assert.equal(p.getView().timeSpentSeconds, 35); // palier atteint → 35s enregistrées
});

test("player : notes et favoris passent par des commandes", () => {
  const { p } = buildPlayer();
  p.controls.open(L1);
  p.controls.saveNote("ma note", "2026-07-30T10:05:00Z");
  p.controls.toggleFavorite();
  const v = p.getView().current!;
  assert.equal(v.note, "ma note");
  assert.equal(v.isFavorite, true);
});

test("player : marquer terminé délègue au Runtime et attribue un badge", () => {
  const { p } = buildPlayer();
  p.controls.open(L1);
  p.controls.markComplete("2026-07-30T10:10:00Z");
  const v = p.getView().current!;
  assert.ok(v.state === "completed" || v.state === "passed");
  assert.ok(p.ownedBadges().includes("first-lesson"));
});

// ── Navigation ──
test("navigation : next ouvre la leçon suivante accessible", () => {
  const { p } = buildPlayer();
  p.controls.open(L1);
  p.controls.next();
  assert.equal(p.currentRefValue(), "mkt-v2-m1-l2");
});

test("navigation : nextAccessible saute une leçon verrouillée (fin de module ouvert)", () => {
  const { store } = buildPlayer();
  // Depuis la dernière leçon de M1, la suivante (M2-L1) est verrouillée → undefined.
  const last = M1.lessons[M1.lessons.length - 1].id;
  assert.equal(LessonNavigator.nextAccessible(C, store.getState(), last), undefined);
});

// ── Reprise ──
test("player : resume reprend la dernière leçon consultée", () => {
  const { p } = buildPlayer();
  p.controls.open(L1);
  const { p: p2 } = { p }; // même player
  const ref = p2.resume();
  assert.equal(ref, L1);
});

// ── Timeline / ProgressBar ──
test("timeline : contient toutes les leçons avec l'entrée courante marquée", () => {
  const { store } = buildPlayer();
  const tl = LessonTimeline.build(C, store.getState(), L1);
  assert.equal(tl.length, C.modules.flatMap((m) => m.lessons).length);
  assert.equal(tl.find((e) => e.lessonRef === L1)?.isCurrent, true);
});

test("progressBar : modèle position/durée cohérent", () => {
  const { store } = buildPlayer();
  const s = createRuntimeStore(C);
  s.dispatch(LearningEvents.lessonViewed(L1));
  s.dispatch(LearningEvents.lessonPosition(L1, 300));
  const model = LessonProgressBar.model(C, s.getState(), L1);
  assert.equal(model.positionSeconds, 300);
  assert.ok(model.durationSeconds > 0);
  assert.ok(model.positionPercent > 0 && model.positionPercent <= 100);
  void store;
});

// ── Adaptateurs média injectables ──
test("média : lecteur vidéo injectable + gestionnaire de téléchargements enregistre l'intention", () => {
  const video = new NoopMediaPlayer("video") as VideoPlayerAdapter;
  const opened: ResourceItem[] = [];
  const resources: ResourceViewerAdapter = { open: (r) => void opened.push(r) };
  const downloads = new RecordingDownloadManager();
  const rp: ResourceProvider = {
    resources: (l) => [{ id: `${l.id}-r0`, kind: "video", label: "Vidéo", src: "asset://x" }],
    downloads: (l) => [{ id: `${l.id}-d0`, label: "PDF", src: "asset://p" }],
  };
  const store = createRuntimeStore(C);
  const p = new LessonPlayer({ curriculum: C, store, media: { video, resources, downloads }, resourceProvider: rp });
  p.controls.open(L1);
  p.controls.openResource({ id: `${L1}-r0`, kind: "video", label: "Vidéo", src: "asset://x" });
  p.controls.requestDownload(`${L1}-d0`);
  assert.equal(opened.length, 1);
  assert.equal(downloads.requested().length, 1);
  assert.equal(downloads.requested()[0].src, "asset://p"); // intention enregistrée, aucun téléchargement réel
  assert.equal(validateMediaAdapters({ video }).ok, true);
});

// ── Autosave via Persistence (Sprint B) ──
test("player : autosave sauvegarde via la Persistence quand c'est dû", async () => {
  const persistenceAdapter = new RuntimePersistence(new InMemoryPersistenceAdapter());
  const autosave = new AutosaveManager({ maxDirty: 2, maxIntervalMs: 1000 }, 0);
  const store = createRuntimeStore(C);
  const p = new LessonPlayer({
    curriculum: C,
    store,
    persistence: { adapter: persistenceAdapter, userId: "u1", autosave },
  });
  p.controls.open(L1); // dirty 1
  p.controls.saveNote("x"); // dirty 2 → dû
  const saved = await p.maybeAutosave(500);
  assert.equal(saved, true);
  const loaded = await persistenceAdapter.load(C, { userId: "u1", programSlug: C.slug });
  assert.equal(loaded.revision, 1);
});

// ── Validation & DeepSpecs ──
test("validateLessonView : OK et sans fuite de correction", () => {
  const { store } = buildPlayer();
  const v = LessonStateController.viewModel(C, store.getState(), L1, DefaultResourceProvider)!;
  assert.equal(validateLessonView(v).ok, true);
});

test("les DeepSpecs du Player sont documentées (>= 10)", () => {
  assert.ok(PLAYER_DEEP_SPECS.length >= 10);
  assert.ok(PLAYER_DEEP_SPECS.every((s) => s.id && s.description));
  void player; // helper disponible
});
