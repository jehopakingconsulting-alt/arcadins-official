/**
 * Runtime — Exam : ExamNavigationPolicyEngine (Sprint G).
 *
 * Résout les règles de navigation d'un examen : libre / séquentielle, retour arrière autorisé ou interdit,
 * section verrouillée après validation, question obligatoire, ordre fixe / mélangé, sections chronométrées,
 * passage conditionnel, soumission partielle interdite, vérification avant soumission. PUR.
 */
import type { ExamFrozenSection, ExamNavigationPolicy, ExamResponse } from "./types.ts";

export interface NavigationCheck {
  allowed: boolean;
  reasonCodes: string[];
}

export const ExamNavigationPolicyEngine = {
  /** Indices ordonnés des sections (l'ordre de définition fait foi ; le mélange se fait au niveau des questions). */
  sectionOrder(sections: ExamFrozenSection[]): string[] {
    return sections.map((s) => s.id);
  },

  /** Une section est-elle accessible depuis la section courante ? */
  canAccessSection(policy: ExamNavigationPolicy, sections: ExamFrozenSection[], currentId: string | null, targetId: string): NavigationCheck {
    const order = ExamNavigationPolicyEngine.sectionOrder(sections);
    const targetIdx = order.indexOf(targetId);
    if (targetIdx < 0) return { allowed: false, reasonCodes: ["SECTION_UNKNOWN"] };

    const target = sections[targetIdx];
    if (target.locked) return { allowed: false, reasonCodes: ["SECTION_LOCKED"] };

    if (policy.mode === "free") return { allowed: true, reasonCodes: [] };

    // Séquentiel : on ne peut aller qu'à la section courante, la suivante immédiate, ou revenir si autorisé.
    const currentIdx = currentId ? order.indexOf(currentId) : -1;
    if (currentIdx < 0) return { allowed: targetIdx === 0, reasonCodes: targetIdx === 0 ? [] : ["SEQUENTIAL_START_ONLY"] };
    if (targetIdx === currentIdx) return { allowed: true, reasonCodes: [] };
    if (targetIdx === currentIdx + 1) return { allowed: true, reasonCodes: [] };
    if (targetIdx < currentIdx) {
      return policy.allowBacktrack && !sections[targetIdx].lockAfterComplete
        ? { allowed: true, reasonCodes: [] }
        : { allowed: false, reasonCodes: ["BACKTRACK_FORBIDDEN"] };
    }
    return { allowed: false, reasonCodes: ["SECTION_NOT_ACCESSIBLE"] };
  },

  /** Une réponse peut-elle être modifiée compte tenu du verrouillage de section ? */
  canModifyAnswer(sections: ExamFrozenSection[], questionId: string): NavigationCheck {
    const section = sections.find((s) => s.questions.some((q) => q.id === questionId));
    if (!section) return { allowed: false, reasonCodes: ["UNAUTHORIZED_QUESTION"] };
    if (section.locked) return { allowed: false, reasonCodes: ["SECTION_LOCKED"] };
    return { allowed: true, reasonCodes: [] };
  },

  /** La soumission est-elle permise ? (soumission partielle interdite → toutes les questions requises répondues) */
  canSubmit(policy: ExamNavigationPolicy, sections: ExamFrozenSection[], responses: Record<string, ExamResponse>): NavigationCheck {
    if (policy.allowPartialSubmission || !policy.requireAllAnswered) return { allowed: true, reasonCodes: [] };
    const allQuestionIds = sections.flatMap((s) => s.questions.map((q) => q.id));
    const missing = allQuestionIds.filter((id) => {
      const r = responses[id];
      return !r || r.rejected || r.value === undefined || r.value === null || r.value === "";
    });
    return missing.length === 0 ? { allowed: true, reasonCodes: [] } : { allowed: false, reasonCodes: ["INCOMPLETE_REQUIRED_ANSWERS"] };
  },

  /** Verrouille une section (retour interdit) si la politique l'exige. */
  lockSection(sections: ExamFrozenSection[], sectionId: string): ExamFrozenSection[] {
    return sections.map((s) => (s.id === sectionId && s.lockAfterComplete ? { ...s, locked: true } : s));
  },
};
