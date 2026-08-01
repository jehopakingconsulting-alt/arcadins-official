import { test } from "node:test";
import assert from "node:assert/strict";
import { toRecommendationViewModel, toRecommendationViewModels } from "./to-view-model.ts";
import type { JourneyRecommendation } from "../runtime/journey/types.ts";

function reco(over: Partial<JourneyRecommendation>): JourneyRecommendation {
  return {
    id: over.id ?? "r1", type: over.type ?? "continue", priority: over.priority ?? 1,
    titleKey: over.titleKey ?? "reco.title", descriptionKey: over.descriptionKey ?? "reco.desc",
    targetType: over.targetType ?? "lesson", targetId: over.targetId ?? "l-1",
    reasonCodes: over.reasonCodes ?? ["reason.x"], confidence: over.confidence ?? 0.9,
    estimatedMinutes: over.estimatedMinutes ?? 10,
  } as JourneyRecommendation;
}

test("mapping type moteur → kind public", () => {
  assert.equal(toRecommendationViewModel(reco({ type: "continue" })).kind, "continue_lesson");
  assert.equal(toRecommendationViewModel(reco({ type: "resume" })).kind, "continue_lesson");
  assert.equal(toRecommendationViewModel(reco({ type: "strengthen-skill" })).kind, "review_competency");
  assert.equal(toRecommendationViewModel(reco({ type: "start-next" })).kind, "next_module");
  assert.equal(toRecommendationViewModel(reco({ type: "finish-project" })).kind, "prepare_project");
  assert.equal(toRecommendationViewModel(reco({ type: "prepare-assessment" })).kind, "retry_quiz");
});

test("type inconnu → view_resource (repli sûr)", () => {
  assert.equal(toRecommendationViewModel(reco({ type: "quantum-leap" as JourneyRecommendation["type"] })).kind, "view_resource");
});

test("reasonKey = premier reasonCode, sinon descriptionKey", () => {
  assert.equal(toRecommendationViewModel(reco({ reasonCodes: ["a", "b"] })).reasonKey, "a");
  assert.equal(toRecommendationViewModel(reco({ reasonCodes: [], descriptionKey: "d" })).reasonKey, "d");
});

test("tri déterministe par priorité décroissante puis id", () => {
  const out = toRecommendationViewModels([
    reco({ id: "low", priority: 1 }), reco({ id: "high", priority: 9 }), reco({ id: "mid2", priority: 5 }), reco({ id: "mid1", priority: 5 }),
  ]);
  assert.deepEqual(out.map((r) => r.id), ["high", "mid1", "mid2", "low"]);
});
