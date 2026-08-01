"use client";
/**
 * Hook — tableau de bord étudiant (Sprint J). Consomme un provider injecté (démo par défaut). Aucune logique
 * métier : il ne fait que charger un view model et exposer l'état d'interface.
 */
import { useEffect, useState } from "react";
import type { DataResult } from "@/lib/runtime/ui/types";
import type { StudentDashboardViewModel } from "@/lib/runtime/ui/view-models";
import type { StudentDashboardProvider } from "@/lib/runtime/ui/providers";

export function useStudentDashboard(provider: StudentDashboardProvider): DataResult<StudentDashboardViewModel> {
  const [result, setResult] = useState<DataResult<StudentDashboardViewModel>>({ state: "loading", data: null, demo: true });
  useEffect(() => {
    let alive = true;
    provider.getDashboard().then((r) => alive && setResult(r)).catch(() => alive && setResult({ state: "error", data: null, demo: true, errorCode: "LOAD_FAILED" }));
    return () => { alive = false; };
  }, [provider]);
  return result;
}
