/**
 * Runtime étudiant — StudySessionManager (Sprint A).
 *
 * Accumule le temps d'étude de façon PURE (heartbeats). Renvoie un nouveau `StudyTime` immuable.
 */
import type { StudyTime } from "./types.ts";
import { RUNTIME_TIME } from "./config.ts";
import { isoDay } from "./helpers.ts";

export function emptyStudyTime(): StudyTime {
  return { byLesson: {}, byDay: {}, totalSeconds: 0 };
}

export const StudySessionManager = {
  empty: emptyStudyTime,

  /** Ajoute `seconds` de temps d'étude pour une leçon un jour donné. */
  addSeconds(study: StudyTime, lessonRef: string, seconds: number, day?: string): StudyTime {
    const capped = Math.max(0, Math.min(seconds, RUNTIME_TIME.maxSecondsPerHeartbeat));
    if (capped === 0) return study;
    const d = day ?? isoDay(new Date());
    return {
      byLesson: { ...study.byLesson, [lessonRef]: (study.byLesson[lessonRef] ?? 0) + capped },
      byDay: { ...study.byDay, [d]: (study.byDay[d] ?? 0) + capped },
      totalSeconds: study.totalSeconds + capped,
    };
  },

  /** Secondes cumulées pour une leçon. */
  forLesson(study: StudyTime, lessonRef: string): number {
    return study.byLesson[lessonRef] ?? 0;
  },

  /** Secondes cumulées pour un jour (YYYY-MM-DD). */
  forDay(study: StudyTime, day: string): number {
    return study.byDay[day] ?? 0;
  },
};
