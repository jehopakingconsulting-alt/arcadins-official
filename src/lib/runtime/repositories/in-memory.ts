/**
 * Runtime — Repositories : implémentation EN MÉMOIRE (Sprint I).
 *
 * Pour tests uniquement. Aucune I/O, aucune base, aucun réseau. Applique le contrôle optimiste de version
 * (`expectedVersion`) et lève `AcademicConflictError` en cas de conflit. NON destinée à la production.
 */
import { AcademicConflictError } from "../integration/errors.ts";
import type { AcademicAuditEvent, IdempotencyRecord, VersionedEntity } from "../integration/types.ts";
import type {
  AcademicRepositories,
  BadgeRow, BookmarkRow, CredentialRow, CredentialVerificationRow, CredentialVersionRow,
  EnrollmentRow, ExamSessionRow, ExamSubmissionRow, FinalProjectRow, LearnerNoteRow, LearningEventRow,
  LessonProgressRow, LessonRow, ModuleProgressRow, ModuleRow, ProgramRow, ProgramVersionRow,
  AssessmentAttemptRow, AssessmentSubmissionRow, RubricRow, StudySessionRow,
} from "./contracts.ts";

/** Store versionné générique (optimistic concurrency). */
class VersionedStore<T extends { id: string } & VersionedEntity> {
  readonly items = new Map<string, T>();
  async get(id: string): Promise<T | null> {
    const v = this.items.get(id);
    return v ? structuredClone(v) : null;
  }
  async save(row: T, expectedVersion: number | null): Promise<T> {
    const existing = this.items.get(row.id) ?? null;
    if (expectedVersion === null) {
      if (existing) throw new AcademicConflictError({ reasonCodes: ["ALREADY_EXISTS"] });
    } else if (!existing || existing.version !== expectedVersion) {
      throw new AcademicConflictError({ reasonCodes: [`VERSION_MISMATCH:${expectedVersion}!=${existing?.version ?? "none"}`] });
    }
    const saved = { ...row, version: (existing?.version ?? 0) + 1, updatedAt: row.updatedAt } as T;
    this.items.set(row.id, structuredClone(saved));
    return structuredClone(saved);
  }
  filter(pred: (t: T) => boolean): T[] {
    return [...this.items.values()].filter(pred).map((t) => structuredClone(t));
  }
  first(pred: (t: T) => boolean): T | null {
    const found = [...this.items.values()].find(pred);
    return found ? structuredClone(found) : null;
  }
  remove(id: string): void {
    this.items.delete(id);
  }
}

/** Store en lecture seule (référentiel : programmes, modules, leçons…). */
class ReadStore<T extends { id: string }> {
  readonly items = new Map<string, T>();
  seed(rows: T[]): void {
    for (const r of rows) this.items.set(r.id, structuredClone(r));
  }
  async get(id: string): Promise<T | null> {
    const v = this.items.get(id);
    return v ? structuredClone(v) : null;
  }
  filter(pred: (t: T) => boolean): T[] {
    return [...this.items.values()].filter(pred).map((t) => structuredClone(t));
  }
}

export interface InMemoryRepositories extends AcademicRepositories {
  /** Accès de test au référentiel (seed). */
  _seed: {
    programs(rows: ProgramRow[]): void;
    programVersions(rows: ProgramVersionRow[]): void;
    modules(rows: ModuleRow[]): void;
    lessons(rows: LessonRow[]): void;
    rubrics(rows: RubricRow[]): void;
  };
}

export function createInMemoryRepositories(): InMemoryRepositories {
  const programs = new ReadStore<ProgramRow>();
  const programVersions = new ReadStore<ProgramVersionRow>();
  const modules = new ReadStore<ModuleRow>();
  const lessons = new ReadStore<LessonRow>();
  const rubrics = new ReadStore<RubricRow>();

  const enrollments = new VersionedStore<EnrollmentRow>();
  const lessonProgress = new VersionedStore<LessonProgressRow>();
  const moduleProgress = new VersionedStore<ModuleProgressRow>();
  const assessmentAttempts = new VersionedStore<AssessmentAttemptRow>();
  const assessmentSubmissions = new VersionedStore<AssessmentSubmissionRow>();
  const examSessions = new VersionedStore<ExamSessionRow>();
  const examSubmissions = new VersionedStore<ExamSubmissionRow>();
  const finalProjects = new VersionedStore<FinalProjectRow>();
  const studySessions = new VersionedStore<StudySessionRow>();
  const bookmarks = new VersionedStore<BookmarkRow>();
  const notes = new VersionedStore<LearnerNoteRow>();
  const badges = new VersionedStore<BadgeRow>();
  const credentials = new VersionedStore<CredentialRow>();

  const credentialVersions: CredentialVersionRow[] = [];
  const credentialVerifications: CredentialVerificationRow[] = [];
  const learningEvents: LearningEventRow[] = [];
  const idempotency = new Map<string, IdempotencyRecord>();
  const idempotencyById = new Map<string, IdempotencyRecord>();
  const auditEvents: AcademicAuditEvent[] = [];

  return {
    programs: { get: (id) => programs.get(id) },
    programVersions: { get: (id) => programVersions.get(id) },
    modules: { get: (id) => modules.get(id), listByProgramVersion: async (pv) => modules.filter((m) => m.programVersionId === pv) },
    lessons: { get: (id) => lessons.get(id), listByModule: async (m) => lessons.filter((l) => l.moduleId === m) },
    enrollments: {
      get: (id) => enrollments.get(id),
      save: (row, ev) => enrollments.save(row, ev),
      findByUserAndProgram: async (userId, programId) => enrollments.first((e) => e.userId === userId && e.programId === programId),
    },
    lessonProgress: {
      get: (id) => lessonProgress.get(id),
      save: (row, ev) => lessonProgress.save(row, ev),
      listByLearner: async (l) => lessonProgress.filter((p) => p.ownerLearnerId === l),
      findByLesson: async (l, lessonId) => lessonProgress.first((p) => p.ownerLearnerId === l && p.lessonId === lessonId),
    },
    moduleProgress: {
      get: (id) => moduleProgress.get(id),
      save: (row, ev) => moduleProgress.save(row, ev),
      listByLearner: async (l) => moduleProgress.filter((p) => p.ownerLearnerId === l),
      findByModule: async (l, moduleId) => moduleProgress.first((p) => p.ownerLearnerId === l && p.moduleId === moduleId),
    },
    assessmentAttempts: {
      get: (id) => assessmentAttempts.get(id),
      save: (row, ev) => assessmentAttempts.save(row, ev),
      listByLearner: async (l) => assessmentAttempts.filter((a) => a.ownerLearnerId === l),
      findByAttemptId: async (attemptId) => assessmentAttempts.first((a) => a.attemptId === attemptId),
    },
    assessmentSubmissions: {
      save: (row, ev) => assessmentSubmissions.save(row, ev),
      findByAttempt: async (attemptId) => assessmentSubmissions.first((s) => s.attemptId === attemptId),
    },
    examSessions: {
      get: (id) => examSessions.get(id),
      save: (row, ev) => examSessions.save(row, ev),
      listByLearner: async (l) => examSessions.filter((s) => s.ownerLearnerId === l),
      findBySessionId: async (sessionId) => examSessions.first((s) => s.sessionId === sessionId),
    },
    examSubmissions: {
      save: (row, ev) => examSubmissions.save(row, ev),
      findBySession: async (sessionId) => examSubmissions.first((s) => s.sessionId === sessionId),
    },
    finalProjects: { get: (id) => finalProjects.get(id), save: (row, ev) => finalProjects.save(row, ev) },
    rubrics: { get: (id) => rubrics.get(id) },
    studySessions: { save: (row, ev) => studySessions.save(row, ev), listByLearner: async (l) => studySessions.filter((s) => s.ownerLearnerId === l) },
    bookmarks: { save: (row, ev) => bookmarks.save(row, ev), listByLearner: async (l) => bookmarks.filter((b) => b.ownerLearnerId === l), remove: async (id, learnerId) => { const b = bookmarks.items.get(id); if (b && b.ownerLearnerId === learnerId) bookmarks.remove(id); } },
    notes: { save: (row, ev) => notes.save(row, ev), listByLearner: async (l) => notes.filter((n) => n.ownerLearnerId === l), remove: async (id, learnerId) => { const n = notes.items.get(id); if (n && n.ownerLearnerId === learnerId) notes.remove(id); } },
    badges: { save: (row, ev) => badges.save(row, ev), listByLearner: async (l) => badges.filter((b) => b.ownerLearnerId === l), findByPublicId: async (pid) => badges.first((b) => b.publicVerificationId === pid) },
    credentials: {
      get: (id) => credentials.get(id),
      save: (row, ev) => credentials.save(row, ev),
      listByLearner: async (l) => credentials.filter((c) => c.ownerLearnerId === l),
      findByPublicId: async (pid) => credentials.first((c) => c.publicVerificationId === pid),
      findActiveByIssuanceKey: async (key) => credentials.first((c) => c.issuanceKey === key && (c.status === "active" || c.status === "issued")),
    },
    credentialVersions: {
      append: async (row) => void credentialVersions.push(structuredClone(row)),
      history: async (credentialId) => credentialVersions.filter((v) => v.credentialId === credentialId).map((v) => structuredClone(v)),
    },
    credentialVerifications: {
      record: async (row) => void credentialVerifications.push(structuredClone(row)),
      count: async (pid) => credentialVerifications.filter((v) => v.publicVerificationId === pid).length,
    },
    learningEvents: {
      append: async (row) => void learningEvents.push(structuredClone(row)),
      listByLearner: async (l) => learningEvents.filter((e) => e.ownerLearnerId === l).map((e) => structuredClone(e)),
    },
    commandIdempotency: {
      getByKey: (key) => { const r = idempotency.get(key); return r ? structuredClone(r) : undefined; },
      getById: (id) => { const r = idempotencyById.get(id); return r ? structuredClone(r) : undefined; },
      upsert: (record) => { idempotency.set(record.idempotencyKey, structuredClone(record)); idempotencyById.set(record.commandId, structuredClone(record)); },
    },
    audit: {
      append: async (event) => void auditEvents.push(event),
      all: async () => [...auditEvents],
    },
    _seed: {
      programs: (rows) => programs.seed(rows),
      programVersions: (rows) => programVersions.seed(rows),
      modules: (rows) => modules.seed(rows),
      lessons: (rows) => lessons.seed(rows),
      rubrics: (rows) => rubrics.seed(rows),
    },
  };
}
