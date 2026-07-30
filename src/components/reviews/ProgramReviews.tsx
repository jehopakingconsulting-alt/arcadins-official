"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useLang, t, UI } from "@/lib/i18n";

type Review = { rating: number; comment: string | null; created_at: string };

function Stars({ value, className = "" }: { value: number; className?: string }) {
  return <span className={`text-gold tracking-[2px] ${className}`} aria-hidden="true">{"★".repeat(Math.round(value))}{"☆".repeat(5 - Math.round(value))}</span>;
}

export default function ProgramReviews({ slug }: { slug: string }) {
  const { lang } = useLang();
  const [data, setData] = useState<{ average: number; count: number; reviews: Review[] }>({ average: 0, count: 0, reviews: [] });
  const [authed, setAuthed] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const load = useCallback(async () => {
    try {
      const r = await fetch(`/api/reviews?slug=${encodeURIComponent(slug)}`);
      if (r.ok) setData(await r.json());
    } catch { /* réseau : on garde l'état vide */ }
  }, [slug]);

  useEffect(() => {
    let active = true;
    (async () => {
      await load();
      const { data: { user } } = await createClient().auth.getUser();
      if (active) setAuthed(!!user);
    })();
    return () => { active = false; };
  }, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (rating < 1 || state === "sending") return;
    setState("sending"); setErrMsg("");
    try {
      const r = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, rating, comment }),
      });
      if (r.ok) { setState("done"); }
      else { const j = await r.json().catch(() => ({})); setErrMsg(j.error || "Erreur"); setState("error"); }
    } catch { setErrMsg("Erreur réseau"); setState("error"); }
  }

  return (
    <section className="mt-12 max-w-[820px]" aria-labelledby="reviews-heading">
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <h2 id="reviews-heading" className="font-[family-name:var(--font-heading)] text-2xl text-navy">{t(UI["rev.title"], lang)}</h2>
        {data.count > 0 && (
          <span className="text-sm text-muted"><Stars value={data.average} /> {data.average}/5 · {data.count} {t(UI["rev.word"], lang)}</span>
        )}
      </div>

      {data.count === 0 ? (
        <p className="text-[14.5px] text-muted mb-6">{t(UI["rev.none"], lang)}</p>
      ) : (
        <ul className="flex flex-col gap-3 mb-8">
          {data.reviews.map((r, i) => (
            <li key={i} className="bg-white rounded-2xl p-5 border border-gold/12">
              <div className="flex items-center gap-2 mb-1.5">
                <Stars value={r.rating} className="text-sm" />
                <span className="text-[11px] font-semibold text-navy/55 bg-gold/10 border border-gold/20 rounded-full px-2 py-0.5">✓ {t(UI["rev.verified"], lang)}</span>
              </div>
              {r.comment && <p className="text-[14px] text-body leading-[1.65]">{r.comment}</p>}
            </li>
          ))}
        </ul>
      )}

      {/* Formulaire : réservé aux étudiants inscrits (vérifié côté serveur). */}
      {state === "done" ? (
        <div className="bg-gold/10 border border-gold/25 rounded-2xl p-5 text-[14.5px] text-navy font-medium">{t(UI["rev.pending"], lang)}</div>
      ) : authed ? (
        <form onSubmit={submit} className="bg-white rounded-2xl p-6 border border-gold/15">
          <div className="text-sm font-semibold text-navy mb-3">{t(UI["rev.leave"], lang)}</div>
          <div className="flex gap-1 mb-4" role="radiogroup" aria-label={t(UI["rev.leave"], lang)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n}/5`} aria-pressed={rating === n}
                className={`text-2xl leading-none transition-transform hover:scale-110 ${n <= rating ? "text-gold" : "text-navy/20"}`}>★</button>
            ))}
          </div>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} maxLength={1000}
            aria-label={t(UI["rev.comment_ph"], lang)} placeholder={t(UI["rev.comment_ph"], lang)}
            className="w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white transition-all resize-y min-h-[80px] mb-3" />
          {state === "error" && <p className="text-[13px] text-red-600 mb-3">{errMsg}</p>}
          <button type="submit" disabled={rating < 1 || state === "sending"}
            className="bg-navy text-gold font-bold text-[14px] px-6 py-3 rounded-xl transition-all hover:bg-navy-mid disabled:opacity-50">
            {t(UI["rev.submit"], lang)}
          </button>
        </form>
      ) : (
        <p className="text-[14px] text-muted">
          <Link href="/auth/login" className="text-gold font-semibold hover:underline">{t(UI["rev.login"], lang)}</Link>
        </p>
      )}
    </section>
  );
}
