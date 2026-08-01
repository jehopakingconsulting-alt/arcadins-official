/**
 * Runtime — UI/Runtime : AcademicRepository (Sprint K2A).
 *
 * Source de CONTENU (curriculum) + frontière de PERSISTANCE en mémoire (snapshot/hydrate de l'état runtime).
 * PUR : aucune I/O, aucune base, aucun réseau. Le checksum garantit l'intégrité d'un instantané repris.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { RuntimeSnapshot, RuntimeState } from "./types.ts";
import { buildInitialState } from "../../runtime-state.ts";

const SNAPSHOT_VERSION = 1;

/** Checksum déterministe (djb2) de l'état — stable et indépendant de l'ordre des clés. */
export function stateChecksum(state: RuntimeState): string {
  const stable = JSON.stringify({
    programSlug: state.programSlug,
    lessons: Object.keys(state.lessons).sort().map((k) => `${k}:${state.lessons[k].state}:${state.lessons[k].completedAt ?? ""}:${state.lessons[k].quizScore ?? ""}`),
    modules: Object.keys(state.modules).sort().map((k) => `${k}:${state.modules[Number(k)].state}:${state.modules[Number(k)].summativeScore ?? ""}:${state.modules[Number(k)].practicalSubmitted}`),
    study: state.study,
    events: state.events.length,
  });
  let h = 5381;
  for (let i = 0; i < stable.length; i++) h = ((h << 5) + h + stable.charCodeAt(i)) >>> 0;
  return h.toString(16);
}

export interface AcademicRepository {
  getCurriculum(): ProgramCurriculumV2;
  initialState(): RuntimeState;
  /** Sérialise un état en instantané intègre. */
  snapshot(state: RuntimeState): RuntimeSnapshot;
  /** Restaure un état depuis un instantané (rejette si checksum/programme incohérent). */
  hydrate(snapshot: RuntimeSnapshot): RuntimeState;
}

export function createAcademicRepository(curriculum: ProgramCurriculumV2): AcademicRepository {
  return {
    getCurriculum: () => curriculum,
    initialState: () => buildInitialState(curriculum),
    snapshot(state) {
      return {
        snapshotVersion: SNAPSHOT_VERSION,
        programSlug: state.programSlug,
        programVersion: state.programVersion,
        state,
        checksum: stateChecksum(state),
      };
    },
    hydrate(snapshot) {
      if (snapshot.programSlug !== curriculum.slug) throw new Error(`SNAPSHOT_PROGRAM_MISMATCH:${snapshot.programSlug}`);
      if (snapshot.checksum !== stateChecksum(snapshot.state)) throw new Error("SNAPSHOT_CHECKSUM_INVALID");
      return snapshot.state;
    },
  };
}
