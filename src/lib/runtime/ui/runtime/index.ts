/**
 * Runtime — UI/Runtime : barrel (Sprint K2A).
 *
 * Couche de DONNÉES runtime étudiant (interne) : repository de contenu, moteur de progression (réutilise le
 * Sprint A), cache, state management, façade et provider React. Aucune UI, aucun dashboard/navigation/quiz.
 * Non monté au K2A — le branchement à l'interface viendra aux sous-sprints K2B/K2C.
 */
export * from "./types.ts";
export * from "./academic-repository.ts";
export * from "./runtime-engine.ts";
export * from "./progress-cache.ts";
export * from "./student-runtime.ts";
export { RuntimeProvider, useRuntimeContext, type RuntimeContextValue } from "./RuntimeProvider.tsx";
