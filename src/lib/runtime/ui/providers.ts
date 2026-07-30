/**
 * Runtime — UI : data providers injectables (Sprint J).
 *
 * Interfaces de fourniture de données pour l'UI + implémentations Demo/Mock/Disabled. AUCUN provider Supabase réel
 * dans ce Sprint. Le `DisabledStudentDataProvider` reflète le flag OFF (aucune donnée, état feature_disabled).
 * Toutes les réponses portent `demo: true` en preview.
 */
import type { DataResult } from "./types.ts";
import type {
  AssessmentIntroViewModel, AssessmentResultViewModel, AssessmentViewModel, BookmarkViewModel, CalendarViewModel,
  CredentialViewModel, JourneyViewModel, LessonPlayerViewModel, NoteViewModel, NotificationViewModel,
  ProgressViewModel, StudentDashboardViewModel,
} from "./view-models.ts";
import {
  demoAssessment, demoAssessmentIntro, demoAssessmentResult, demoBookmarks, demoCalendar, demoCredentials,
  demoDashboard, demoJourney, demoLesson, demoNotes, demoNotifications, demoProgress,
} from "./demo-data.ts";

export interface StudentDashboardProvider {
  getDashboard(): Promise<DataResult<StudentDashboardViewModel>>;
}
export interface JourneyProvider {
  getJourney(): Promise<DataResult<JourneyViewModel>>;
}
export interface LessonProvider {
  getLesson(lessonId: string): Promise<DataResult<LessonPlayerViewModel>>;
  listNotes(lessonId: string): Promise<DataResult<NoteViewModel[]>>;
  listBookmarks(): Promise<DataResult<BookmarkViewModel[]>>;
}
export interface AssessmentProvider {
  getIntro(assessmentId: string): Promise<DataResult<AssessmentIntroViewModel>>;
  getAttempt(assessmentId: string): Promise<DataResult<AssessmentViewModel>>;
  getResult(attemptId: string): Promise<DataResult<AssessmentResultViewModel>>;
}
export interface ProgressProvider {
  getProgress(): Promise<DataResult<ProgressViewModel>>;
  getCalendar(): Promise<DataResult<CalendarViewModel>>;
}
export interface CertificationProvider {
  listCredentials(): Promise<DataResult<CredentialViewModel[]>>;
}
export interface NotificationProvider {
  listNotifications(): Promise<DataResult<NotificationViewModel[]>>;
}

export interface StudentDataProviders extends
  StudentDashboardProvider, JourneyProvider, LessonProvider, AssessmentProvider, ProgressProvider, CertificationProvider, NotificationProvider {}

function ok<T>(data: T): DataResult<T> {
  return { state: "success", data, demo: true };
}

/** Provider de DÉMONSTRATION : données fictives, aucune I/O, aucune écriture réelle. */
export function createDemoStudentDataProvider(): StudentDataProviders {
  return {
    getDashboard: async () => ok(demoDashboard()),
    getJourney: async () => ok(demoJourney()),
    getLesson: async () => ok(demoLesson()),
    listNotes: async () => ok(demoNotes()),
    listBookmarks: async () => ok(demoBookmarks()),
    getIntro: async () => ok(demoAssessmentIntro()),
    getAttempt: async () => ok(demoAssessment()),
    getResult: async () => ok(demoAssessmentResult()),
    getProgress: async () => ok(demoProgress()),
    getCalendar: async () => ok(demoCalendar()),
    listCredentials: async () => ok(demoCredentials()),
    listNotifications: async () => ok(demoNotifications()),
  };
}

/** Provider MOCK paramétrable (tests) : permet d'injecter des états (loading/empty/error…). */
export function createMockStudentDataProvider(overrides: Partial<Record<keyof StudentDataProviders, DataResult<unknown>>> = {}): StudentDataProviders {
  const demo = createDemoStudentDataProvider();
  const wrap = <K extends keyof StudentDataProviders>(key: K, fn: StudentDataProviders[K]): StudentDataProviders[K] => {
    const override = overrides[key];
    if (!override) return fn;
    return (async () => override) as StudentDataProviders[K];
  };
  return {
    getDashboard: wrap("getDashboard", demo.getDashboard),
    getJourney: wrap("getJourney", demo.getJourney),
    getLesson: wrap("getLesson", demo.getLesson),
    listNotes: wrap("listNotes", demo.listNotes),
    listBookmarks: wrap("listBookmarks", demo.listBookmarks),
    getIntro: wrap("getIntro", demo.getIntro),
    getAttempt: wrap("getAttempt", demo.getAttempt),
    getResult: wrap("getResult", demo.getResult),
    getProgress: wrap("getProgress", demo.getProgress),
    getCalendar: wrap("getCalendar", demo.getCalendar),
    listCredentials: wrap("listCredentials", demo.listCredentials),
    listNotifications: wrap("listNotifications", demo.listNotifications),
  };
}

/** Provider DÉSACTIVÉ : reflète le flag OFF — aucune donnée, état feature_disabled, jamais d'appel réseau. */
export function createDisabledStudentDataProvider(): StudentDataProviders {
  const disabled = <T>(): DataResult<T> => ({ state: "feature_disabled", data: null, demo: true });
  return {
    getDashboard: async () => disabled(),
    getJourney: async () => disabled(),
    getLesson: async () => disabled(),
    listNotes: async () => disabled(),
    listBookmarks: async () => disabled(),
    getIntro: async () => disabled(),
    getAttempt: async () => disabled(),
    getResult: async () => disabled(),
    getProgress: async () => disabled(),
    getCalendar: async () => disabled(),
    listCredentials: async () => disabled(),
    listNotifications: async () => disabled(),
  };
}
