/**
 * Runtime — Repositories : contrats injectables (Sprint I).
 *
 * UNIQUEMENT des interfaces + formes de domaine. Aucune logique métier (elle vit dans les moteurs A–H et les
 * services applicatifs). Chaque repository a une implémentation mémoire (tests) et une implémentation Supabase.
 * Aucune dépendance directe des MOTEURS métier à Supabase : la frontière est ici.
 */
import type { AcademicAuditEvent, IdempotencyRecord, VersionedEntity } from "../integration/types.ts";

// ─────────────────────────── Formes de domaine (génériques) ───────────────────────────
export interface OwnedEntity {
  id: string;
  ownerLearnerId: string;
  programId: string;
}
export type Persisted<T> = T & VersionedEntity;

export interface ProgramRow { id: string; slug: string; activeVersionId: string | null }
export interface ProgramVersionRow { id: string; programId: string; version: number; status: string }
export interface ModuleRow { id: string; programVersionId: string; index: number }
export interface LessonRow { id: string; moduleId: string; index: number }
export interface EnrollmentRow extends VersionedEntity { id: string; userId: string; learnerId: string; programId: string; programVersionId: string; status: "active" | "inactive" | "suspended" | "expired"; accessExpiresAt: string | null }
export interface LessonProgressRow extends OwnedEntity, VersionedEntity { lessonId: string; moduleId: string; state: string; completed: boolean; timeSpentSeconds: number }
export interface ModuleProgressRow extends OwnedEntity, VersionedEntity { moduleId: string; unlocked: boolean; completed: boolean; percent: number }
export interface AssessmentAttemptRow extends OwnedEntity, VersionedEntity { attemptId: string; assessmentId: string; status: string; privateStateJson: string; submittedCommandId: string | null }
export interface AssessmentSubmissionRow extends OwnedEntity, VersionedEntity { attemptId: string; percentage: number; passed: boolean }
export interface ExamSessionRow extends OwnedEntity, VersionedEntity { sessionId: string; examId: string; status: string; privateStateJson: string }
export interface ExamSubmissionRow extends OwnedEntity, VersionedEntity { sessionId: string; finalStatus: string; passed: boolean }
export interface FinalProjectRow extends OwnedEntity, VersionedEntity { status: string }
export interface RubricRow { id: string; version: number }
export interface StudySessionRow extends OwnedEntity, VersionedEntity { startedAt: string; endedAt: string | null; seconds: number }
export interface BookmarkRow extends OwnedEntity, VersionedEntity { lessonId: string }
export interface LearnerNoteRow extends OwnedEntity, VersionedEntity { noteId: string; lessonId: string; body: string }
export interface BadgeRow extends OwnedEntity, VersionedEntity { publicVerificationId: string; status: string }
export interface CredentialRow extends VersionedEntity { id: string; ownerLearnerId: string; programId: string; publicVerificationId: string; documentNumber: string; status: string; issuanceKey: string; recordJson: string }
export interface CredentialVersionRow { credentialId: string; version: number; snapshotJson: string; integrityJson: string }
export interface CredentialVerificationRow { publicVerificationId: string; at: string; status: string }
export interface LearningEventRow { id: string; ownerLearnerId: string; type: string; at: string; payloadJson: string }

// ─────────────────────────── Contrats de repository ───────────────────────────
export interface ReadRepository<TRow> {
  get(id: string): Promise<TRow | null>;
}
export interface WriteRepository<TRow> {
  /** Upsert avec contrôle optimiste : `expectedVersion` null = création. */
  save(row: TRow, expectedVersion: number | null): Promise<TRow>;
}
export interface OwnedRepository<TRow> {
  listByLearner(learnerId: string): Promise<TRow[]>;
}

export type ProgramRepository = ReadRepository<ProgramRow>;
export type ProgramVersionRepository = ReadRepository<ProgramVersionRow>;
export interface ModuleRepository extends ReadRepository<ModuleRow> { listByProgramVersion(programVersionId: string): Promise<ModuleRow[]> }
export interface LessonRepository extends ReadRepository<LessonRow> { listByModule(moduleId: string): Promise<LessonRow[]> }
export interface EnrollmentRepository extends ReadRepository<EnrollmentRow>, WriteRepository<EnrollmentRow> { findByUserAndProgram(userId: string, programId: string): Promise<EnrollmentRow | null> }
export interface LessonProgressRepository extends ReadRepository<LessonProgressRow>, WriteRepository<LessonProgressRow>, OwnedRepository<LessonProgressRow> { findByLesson(learnerId: string, lessonId: string): Promise<LessonProgressRow | null> }
export interface ModuleProgressRepository extends ReadRepository<ModuleProgressRow>, WriteRepository<ModuleProgressRow>, OwnedRepository<ModuleProgressRow> { findByModule(learnerId: string, moduleId: string): Promise<ModuleProgressRow | null> }
export interface AssessmentAttemptRepository extends ReadRepository<AssessmentAttemptRow>, WriteRepository<AssessmentAttemptRow>, OwnedRepository<AssessmentAttemptRow> { findByAttemptId(attemptId: string): Promise<AssessmentAttemptRow | null> }
export interface AssessmentSubmissionRepository extends WriteRepository<AssessmentSubmissionRow> { findByAttempt(attemptId: string): Promise<AssessmentSubmissionRow | null> }
export interface ExamSessionRepository extends ReadRepository<ExamSessionRow>, WriteRepository<ExamSessionRow>, OwnedRepository<ExamSessionRow> { findBySessionId(sessionId: string): Promise<ExamSessionRow | null> }
export interface ExamSubmissionRepository extends WriteRepository<ExamSubmissionRow> { findBySession(sessionId: string): Promise<ExamSubmissionRow | null> }
export interface FinalProjectRepository extends ReadRepository<FinalProjectRow>, WriteRepository<FinalProjectRow> {}
export type RubricRepository = ReadRepository<RubricRow>;
export interface StudySessionRepository extends WriteRepository<StudySessionRow>, OwnedRepository<StudySessionRow> {}
export interface BookmarkRepository extends WriteRepository<BookmarkRow>, OwnedRepository<BookmarkRow> { remove(id: string, learnerId: string): Promise<void> }
export interface LearnerNoteRepository extends WriteRepository<LearnerNoteRow>, OwnedRepository<LearnerNoteRow> { remove(id: string, learnerId: string): Promise<void> }
export interface BadgeRepository extends WriteRepository<BadgeRow>, OwnedRepository<BadgeRow> { findByPublicId(publicVerificationId: string): Promise<BadgeRow | null> }
export interface CredentialRepository extends ReadRepository<CredentialRow>, WriteRepository<CredentialRow>, OwnedRepository<CredentialRow> {
  findByPublicId(publicVerificationId: string): Promise<CredentialRow | null>;
  findActiveByIssuanceKey(issuanceKey: string): Promise<CredentialRow | null>;
}
export interface CredentialVersionRepository { append(row: CredentialVersionRow): Promise<void>; history(credentialId: string): Promise<CredentialVersionRow[]> }
export interface CredentialVerificationRepository { record(row: CredentialVerificationRow): Promise<void>; count(publicVerificationId: string): Promise<number> }
export interface LearningEventRepository { append(row: LearningEventRow): Promise<void>; listByLearner(learnerId: string): Promise<LearningEventRow[]> }

export interface CommandIdempotencyRepository {
  getByKey(idempotencyKey: string): IdempotencyRecord | undefined;
  getById(commandId: string): IdempotencyRecord | undefined;
  upsert(record: IdempotencyRecord): void;
}
export interface AuditRepository {
  append(event: AcademicAuditEvent): Promise<void>;
  all(): Promise<AcademicAuditEvent[]>;
}

// ─────────────────────────── Agrégat de repositories ───────────────────────────
export interface AcademicRepositories {
  programs: ProgramRepository;
  programVersions: ProgramVersionRepository;
  modules: ModuleRepository;
  lessons: LessonRepository;
  enrollments: EnrollmentRepository;
  lessonProgress: LessonProgressRepository;
  moduleProgress: ModuleProgressRepository;
  assessmentAttempts: AssessmentAttemptRepository;
  assessmentSubmissions: AssessmentSubmissionRepository;
  examSessions: ExamSessionRepository;
  examSubmissions: ExamSubmissionRepository;
  finalProjects: FinalProjectRepository;
  rubrics: RubricRepository;
  studySessions: StudySessionRepository;
  bookmarks: BookmarkRepository;
  notes: LearnerNoteRepository;
  badges: BadgeRepository;
  credentials: CredentialRepository;
  credentialVersions: CredentialVersionRepository;
  credentialVerifications: CredentialVerificationRepository;
  learningEvents: LearningEventRepository;
  commandIdempotency: CommandIdempotencyRepository;
  audit: AuditRepository;
}
