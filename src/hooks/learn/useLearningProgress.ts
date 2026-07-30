"use client";
/** Hook — progression (Sprint J). Charge un ProgressViewModel via un provider injecté (aucun calcul officiel). */
import { useEffect, useState } from "react";
import type { DataResult } from "@/lib/runtime/ui/types";
import type { ProgressViewModel } from "@/lib/runtime/ui/view-models";
import type { ProgressProvider } from "@/lib/runtime/ui/providers";

export function useLearningProgress(provider: ProgressProvider): DataResult<ProgressViewModel> {
  const [result, setResult] = useState<DataResult<ProgressViewModel>>({ state: "loading", data: null, demo: true });
  useEffect(() => {
    let alive = true;
    provider.getProgress().then((r) => alive && setResult(r)).catch(() => alive && setResult({ state: "error", data: null, demo: true, errorCode: "LOAD_FAILED" }));
    return () => { alive = false; };
  }, [provider]);
  return result;
}
