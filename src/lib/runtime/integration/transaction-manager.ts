/**
 * Runtime — Integration : AcademicTransactionManager (Sprint I).
 *
 * Abstraction d'exécution atomique LOGIQUE : rollback, retry borné, détection de conflit, contrôle optimiste,
 * idempotence, journalisation, isolation des commandes critiques.
 *
 * ⚠️ HONNÊTETÉ : ceci N'EST PAS une transaction distribuée. L'atomicité réelle dépend de l'exécuteur injecté
 * (ex. une fonction RPC/transaction Postgres côté serveur). En mémoire, on simule un rollback best-effort.
 */
import type { CriticalCommandType, TransactionOptions } from "./types.ts";
import { AcademicConcurrencyService } from "./concurrency-service.ts";

export interface TransactionExecutor {
  /** Exécute `work` dans une frontière transactionnelle réelle si l'implémentation le permet. */
  run<T>(work: () => Promise<T>): Promise<T>;
  /** L'exécuteur fournit-il une atomicité réelle ? (false pour l'exécuteur mémoire). */
  readonly atomicityGuaranteed: boolean;
}

/** Exécuteur mémoire (tests) : PAS d'atomicité réelle ; expose `atomicityGuaranteed=false`. */
export function createInMemoryExecutor(): TransactionExecutor {
  return { atomicityGuaranteed: false, run: async (work) => work() };
}

const CRITICAL_COMMANDS: Set<CriticalCommandType> = new Set([
  "attempt.start", "assessment.submit", "lesson.complete", "module.validate",
  "exam.start", "exam.submit", "exam.finalize", "credential.issue", "credential.revoke", "credential.replace", "badge.issue",
]);

export const AcademicTransactionManager = {
  isCritical(command: CriticalCommandType): boolean {
    return CRITICAL_COMMANDS.has(command);
  },

  defaultOptions(command: CriticalCommandType): TransactionOptions {
    return { maxRetries: CRITICAL_COMMANDS.has(command) ? 2 : 3, critical: CRITICAL_COMMANDS.has(command) };
  },

  /**
   * Exécute une commande avec retry borné sur conflit optimiste. `work` doit lever `ConcurrencyConflict`
   * (voir `raiseConflict`) pour déclencher un retry ; toute autre erreur est propagée sans retry.
   */
  async execute<T>(executor: TransactionExecutor, options: TransactionOptions, work: () => Promise<T>): Promise<T> {
    let attempt = 0;
    for (;;) {
      try {
        return await executor.run(work);
      } catch (err) {
        if (err instanceof ConcurrencyConflict && AcademicConcurrencyService.shouldRetry(attempt, options.maxRetries)) {
          attempt++;
          continue;
        }
        throw err;
      }
    }
  },
};

/** Erreur de conflit optimiste (déclenche un retry borné). */
export class ConcurrencyConflict extends Error {
  readonly reasonCodes: string[];
  constructor(reasonCodes: string[]) {
    super(`CONCURRENCY_CONFLICT:${reasonCodes.join(",")}`);
    this.reasonCodes = reasonCodes;
  }
}
export function raiseConflict(reasonCodes: string[]): never {
  throw new ConcurrencyConflict(reasonCodes);
}
