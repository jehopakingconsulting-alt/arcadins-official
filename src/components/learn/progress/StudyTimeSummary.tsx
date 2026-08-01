/** Résumé du temps d'étude + série d'apprentissage (Sprint J). */
export function StudyTimeSummary({ minutes, streakDays, lessonsCompleted, quizzesPassed }: { minutes: number; streakDays: number; lessonsCompleted: number; quizzesPassed: number }) {
  const hours = Math.floor(minutes / 60);
  const stats = [
    { label: "Temps d'étude", value: `${hours}h ${minutes % 60}min` },
    { label: "Série", value: `${streakDays} j` },
    { label: "Leçons terminées", value: String(lessonsCompleted) },
    { label: "Quiz réussis", value: String(quizzesPassed) },
  ];
  return (
    <section aria-labelledby="study-time-title" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-5">
      <h2 id="study-time-title" className="text-sm font-semibold text-[color:var(--color-navy)]">Résumé</h2>
      <dl className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="text-xs text-[#5a6a82]">{s.label}</dt>
            <dd className="text-lg font-semibold text-[color:var(--color-navy)]">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
