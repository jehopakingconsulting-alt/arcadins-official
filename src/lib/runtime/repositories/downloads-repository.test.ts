import { test } from "node:test";
import assert from "node:assert/strict";
import { createInMemoryRepositories } from "./in-memory.ts";
import type { DownloadRow } from "./contracts.ts";

function row(over: Partial<DownloadRow> = {}): DownloadRow {
  return {
    id: over.id ?? "d1", ownerLearnerId: over.ownerLearnerId ?? "learner-1", programId: "prog-1",
    downloadId: over.downloadId ?? "res-1", label: over.label ?? "Fiche formules.pdf",
    src: over.src ?? "storage://x.pdf", mime: over.mime ?? "application/pdf", bytes: over.bytes ?? 12345,
    lessonId: over.lessonId ?? "l-4-2", version: 0, updatedAt: "2026-08-01T00:00:00Z",
  } as DownloadRow;
}

test("downloads repo présent (optionnel) + save/list par apprenant", async () => {
  const repos = createInMemoryRepositories();
  assert.ok(repos.downloads, "adaptateur downloads fourni en mémoire");
  await repos.downloads!.save(row({ id: "d1", downloadId: "res-1" }), null);
  await repos.downloads!.save(row({ id: "d2", downloadId: "res-2", ownerLearnerId: "learner-1" }), null);
  await repos.downloads!.save(row({ id: "d3", ownerLearnerId: "learner-2" }), null);
  const mine = await repos.downloads!.listByLearner("learner-1");
  assert.equal(mine.length, 2, "isolation par apprenant");
});

test("downloads: remove scoping apprenant (ne supprime pas celui d'autrui)", async () => {
  const repos = createInMemoryRepositories();
  await repos.downloads!.save(row({ id: "d1", ownerLearnerId: "learner-1" }), null);
  await repos.downloads!.remove("d1", "learner-2"); // mauvais propriétaire → no-op
  assert.equal((await repos.downloads!.listByLearner("learner-1")).length, 1, "non supprimé par autrui");
  await repos.downloads!.remove("d1", "learner-1");
  assert.equal((await repos.downloads!.listByLearner("learner-1")).length, 0, "supprimé par le propriétaire");
});

test("downloads: contrôle optimiste (version) à l'upsert", async () => {
  const repos = createInMemoryRepositories();
  const saved = await repos.downloads!.save(row({ id: "d1" }), null);
  const updated = await repos.downloads!.save({ ...saved, label: "renommé.pdf" }, saved.version);
  assert.equal(updated.label, "renommé.pdf");
  assert.ok(updated.version > saved.version, "révision incrémentée");
});
