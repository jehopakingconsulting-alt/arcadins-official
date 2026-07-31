import type { WeekViewModel } from "@/lib/runtime/ui/view-models";
import { LessonJourneyItem } from "./LessonJourneyItem";

/** Semaine du parcours (Sprint J). */
export function WeekJourney({ week, onOpenLesson }: { week: WeekViewModel; onOpenLesson?: (id: string) => void }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-[#5a6a82]">Semaine {week.week} — {week.titleKey}</h4>
      <ul className="mt-2 space-y-2">
        {week.lessons.map((l) => <LessonJourneyItem key={l.lessonId} lesson={l} onOpen={onOpenLesson} />)}
      </ul>
    </div>
  );
}
