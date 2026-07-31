"use client";
/**
 * Wrapper de PREVIEW (Sprint K2C) : monte le `RuntimeProvider` (K2A) sur un runtime de démonstration seedé et
 * rend la visualisation de progression (read-only). Premier montage réel du RuntimeProvider. Données FICTIVES,
 * aucune écriture, aucune API, aucun quiz/note/certificat.
 */
import { useMemo } from "react";
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import { RuntimeProvider } from "@/lib/runtime/ui/runtime/RuntimeProvider";
import { buildSeededRuntime } from "@/lib/runtime/ui/runtime/demo-progression";
import { RuntimeProgressView } from "./RuntimeProgressView";

export function RuntimeProgressPreview({ curriculum }: { curriculum: ProgramCurriculumV2 }) {
  const runtime = useMemo(() => buildSeededRuntime(curriculum), [curriculum]);
  return (
    <div id="runtime-progress-preview" className="min-h-screen bg-[color:var(--color-off-white)]">
      <RuntimeProvider runtime={runtime}>
        <RuntimeProgressView />
      </RuntimeProvider>
    </div>
  );
}
