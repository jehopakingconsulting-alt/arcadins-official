import { test } from "node:test";
import assert from "node:assert/strict";
import { blockRenderKind, isMediaBlock, clampResumeIndex } from "./block-kind.ts";

test("blockRenderKind: familles connues", () => {
  assert.equal(blockRenderKind("paragraph"), "text");
  assert.equal(blockRenderKind("checklist"), "list");
  assert.equal(blockRenderKind("video"), "media");
  assert.equal(blockRenderKind("audio"), "media");
  assert.equal(blockRenderKind("pdf"), "media");
  assert.equal(blockRenderKind("table"), "table");
  assert.equal(blockRenderKind("formula"), "code");
  assert.equal(blockRenderKind("interactiveActivity"), "interactive");
  assert.equal(blockRenderKind("warning"), "callout");
  assert.equal(blockRenderKind("assignment"), "resource");
});

test("blockRenderKind: type inconnu (SCORM/H5P/Live) → fallback sûr", () => {
  assert.equal(blockRenderKind("h5p"), "unknown");
  assert.equal(blockRenderKind("scorm"), "unknown");
  assert.equal(blockRenderKind("live_class"), "unknown");
  assert.equal(blockRenderKind(""), "unknown");
});

test("isMediaBlock: uniquement les médias (télémétrie)", () => {
  assert.equal(isMediaBlock("video"), true);
  assert.equal(isMediaBlock("audio"), true);
  assert.equal(isMediaBlock("paragraph"), false);
  assert.equal(isMediaBlock("h5p"), false);
});

test("clampResumeIndex: bornage sûr de la reprise", () => {
  assert.equal(clampResumeIndex(4, 13), 4);
  assert.equal(clampResumeIndex(-2, 13), 0);
  assert.equal(clampResumeIndex(99, 13), 12);
  assert.equal(clampResumeIndex(3.7, 13), 3);
  assert.equal(clampResumeIndex(0, 0), 0);
});
