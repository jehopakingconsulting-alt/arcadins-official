"use client";

import { useState } from "react";
import Link from "next/link";
import { SKILLS, LEVELS } from "@/lib/data/tutorat";
import { useLang, t, UI } from "@/lib/i18n";

const inputCls =
  "w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white transition-all";
const labelCls = "block text-[12.5px] font-semibold text-body mb-1.5";

export default function DemandeTutoratPage() {
  const { lang } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [skills, setSkills] = useState<string[]>([]);

  function toggleSkill(id: string) {
    setSkills((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (skills.length === 0) return;
    setStatus("sending");
    const form = e.currentTarget;
    const el = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)?.value;
    const payload = {
      firstName: el("firstName"), lastName: el("lastName"), email: el("email"),
      phone: el("phone"), skills, targetLevel: el("targetLevel"),
      currentLevel: el("currentLevel"), goal: el("goal"),
      availability: el("availability"), message: el("message"),
    };
    try {
      const res = await fetch("/api/tutorat/request", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
      setSkills([]);
    } catch { setStatus("error"); }
  }

  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20">
      <div className="max-w-[760px] mx-auto px-7">
        <Link href="/tutorat" className="inline-flex items-center gap-2 text-[13px] text-muted hover:text-gold transition-all mb-6">
          ← {t(UI["tut.back"], lang)}
        </Link>
        <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">{t(UI["treq.label"], lang)}</p>
        <h1 className="font-[family-name:var(--font-heading)] text-[36px] text-navy mb-3">{t(UI["treq.title"], lang)}</h1>
        <p className="text-[16px] text-muted leading-[1.75] mb-8 max-w-[600px]">{t(UI["treq.desc"], lang)}</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-[28px] p-8 sm:p-10 border border-gold/17 shadow-[0_8px_40px_rgba(13,27,46,0.07)]">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-navy mb-6">{t(UI["treq.form.title"], lang)}</h2>

          <div className="grid grid-cols-2 gap-3.5 mb-3.5">
            <div><label className={labelCls}>{t(UI["contact.form.first"], lang)}</label><input name="firstName" required className={inputCls} /></div>
            <div><label className={labelCls}>{t(UI["contact.form.last"], lang)}</label><input name="lastName" required className={inputCls} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
            <div><label className={labelCls}>{t(UI["contact.form.email"], lang)}</label><input name="email" type="email" required className={inputCls} /></div>
            <div><label className={labelCls}>{t(UI["fld.phone"], lang)}</label><input name="phone" className={inputCls} /></div>
          </div>

          <div className="mb-4">
            <label className={labelCls}>{t(UI["treq.form.skills"], lang)}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SKILLS.map((s) => (
                <button type="button" key={s.id} onClick={() => toggleSkill(s.id)}
                  className={`text-left text-[13px] px-3.5 py-2.5 rounded-xl border-[1.5px] transition-all ${skills.includes(s.id) ? "border-gold bg-gold/10 text-navy font-semibold" : "border-gold/20 bg-off-white text-body hover:border-gold/50"}`}>
                  <span className="mr-1.5" aria-hidden>{s.icon}</span>{t(UI[`tut.skill.${s.id}`], lang)}
                </button>
              ))}
            </div>
            {skills.length === 0 && <p className="text-[11.5px] text-muted mt-1.5">{t(UI["fld.skills.pick"], lang)}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
            <div><label className={labelCls}>{t(UI["treq.form.target"], lang)}</label>
              <select name="targetLevel" className={inputCls} defaultValue="">
                <option value="" disabled>—</option>
                {LEVELS.map((l) => (<option key={l.id} value={l.id}>{t(UI[`tut.level.${l.id}`], lang)} · {l.cefr}</option>))}
              </select>
            </div>
            <div><label className={labelCls}>{t(UI["treq.form.current"], lang)}</label><input name="currentLevel" className={inputCls} /></div>
          </div>
          <div className="mb-3.5"><label className={labelCls}>{t(UI["treq.form.goal"], lang)}</label><textarea name="goal" className={`${inputCls} resize-y min-h-[70px]`} /></div>
          <div className="mb-3.5"><label className={labelCls}>{t(UI["treq.form.avail"], lang)}</label><input name="availability" className={inputCls} /></div>
          <div className="mb-5"><label className={labelCls}>{t(UI["treq.form.message"], lang)}</label><textarea name="message" className={`${inputCls} resize-y min-h-[90px]`} /></div>

          <button type="submit" disabled={status === "sending" || skills.length === 0}
            className={`w-full py-3.5 font-bold text-[15px] rounded-xl transition-all disabled:opacity-60 ${status === "sent" ? "bg-gold text-navy" : "bg-navy text-gold hover:bg-navy-mid hover:-translate-y-0.5"}`}>
            {status === "sent" ? t(UI["contact.form.sent"], lang) : status === "sending" ? t(UI["contact.form.sending"], lang) : t(UI["contact.form.submit"], lang)}
          </button>
          {status === "error" && <p className="text-[12.5px] text-red-600 mt-3 text-center">{t(UI["contact.form.note"], lang)}</p>}
          <p className="text-xs text-muted mt-3 text-center">{t(UI["contact.form.note"], lang)}</p>
        </form>
      </div>
    </div>
  );
}
