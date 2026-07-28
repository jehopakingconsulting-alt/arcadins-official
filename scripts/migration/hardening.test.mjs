import { test } from "node:test";
import assert from "node:assert/strict";
import { selectAllPaged, PAGE } from "./import-core.mjs";
import { findCollisions } from "./preflight-collisions.mjs";

// ── A1 : pagination robuste (aucune perte au-delà d'une page) ────────────────
test("selectAllPaged : agrège toutes les pages et s'arrête à la dernière", async () => {
  const total = PAGE * 2 + 137; // > 2 pages pleines + reste
  const dataset = Array.from({ length: total }, (_, i) => ({ i }));
  let calls = 0;
  const query = () => ({
    range: async (from, to) => {
      calls++;
      return { data: dataset.slice(from, to + 1), error: null };
    },
  });
  const rows = await selectAllPaged(query);
  assert.equal(rows.length, total, "toutes les lignes récupérées");
  assert.equal(calls, 3, "3 pages (1000 + 1000 + reste)");
  assert.equal(rows[total - 1].i, total - 1, "dernière ligne présente");
});

test("selectAllPaged : propage l'erreur", async () => {
  const query = () => ({ range: async () => ({ data: null, error: { message: "boom" } }) });
  await assert.rejects(() => selectAllPaged(query), /boom/);
});

// ── A3 : détection de collisions e-mail (normalisée, dédupliquée) ────────────
test("findCollisions : intersection normalisée + dédup", () => {
  const source = ["Alice@Ex.com", "bob@ex.com", "carol@ex.com", "ALICE@ex.com"];
  const target = ["alice@ex.com", "dave@ex.com", "BOB@Ex.com"];
  const c = findCollisions(source, target);
  assert.deepEqual(c.sort(), ["alice@ex.com", "bob@ex.com"]);
});

test("findCollisions : aucune collision → tableau vide", () => {
  assert.deepEqual(findCollisions(["x@ex.com"], ["y@ex.com"]), []);
});

test("findCollisions : entrées vides tolérées", () => {
  assert.deepEqual(findCollisions([], ["a@b.com"]), []);
  assert.deepEqual(findCollisions(["a@b.com"], []), []);
});
