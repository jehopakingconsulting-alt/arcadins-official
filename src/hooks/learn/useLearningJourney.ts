"use client";
/** Hook — parcours d'apprentissage (Sprint J). Charge un JourneyViewModel via un provider injecté. */
import { useEffect, useState } from "react";
import type { DataResult } from "@/lib/runtime/ui/types";
import type { JourneyViewModel } from "@/lib/runtime/ui/view-models";
import type { JourneyProvider } from "@/lib/runtime/ui/providers";

export function useLearningJourney(provider: JourneyProvider): DataResult<JourneyViewModel> {
  const [result, setResult] = useState<DataResult<JourneyViewModel>>({ state: "loading", data: null, demo: true });
  useEffect(() => {
    let alive = true;
    provider.getJourney().then((r) => alive && setResult(r)).catch(() => alive && setResult({ state: "error", data: null, demo: true, errorCode: "LOAD_FAILED" }));
    return () => { alive = false; };
  }, [provider]);
  return result;
}
