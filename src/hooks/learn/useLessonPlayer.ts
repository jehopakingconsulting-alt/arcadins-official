"use client";
/** Hook — lecteur de leçon (Sprint J). Charge un LessonPlayerViewModel via un provider injecté. */
import { useEffect, useState } from "react";
import type { DataResult } from "@/lib/runtime/ui/types";
import type { LessonPlayerViewModel } from "@/lib/runtime/ui/view-models";
import type { LessonProvider } from "@/lib/runtime/ui/providers";

export function useLessonPlayer(provider: LessonProvider, lessonId: string): DataResult<LessonPlayerViewModel> {
  const [result, setResult] = useState<DataResult<LessonPlayerViewModel>>({ state: "loading", data: null, demo: true });
  useEffect(() => {
    let alive = true;
    provider.getLesson(lessonId).then((r) => alive && setResult(r)).catch(() => alive && setResult({ state: "error", data: null, demo: true, errorCode: "LOAD_FAILED" }));
    return () => { alive = false; };
  }, [provider, lessonId]);
  return result;
}
