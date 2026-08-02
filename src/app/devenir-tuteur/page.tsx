"use client";

import { useState } from "react";
import { SKILLS, LEVELS } from "@/lib/data/tutorat";
import { useLang, t, UI } from "@/lib/i18n";

const inputCls =
  "w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white transition-all";
const labelCls = "block text-[12.5px] font-semibold text-body mb-1.5";

export default function DevenirTuteurPage() {
  const { lang } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [skills, setSkills] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (id: string) =>
    setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (skills.length === 0) return;
    setStatus("sending");
    const form = e.currentTarget;
    const el = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement)?.value;
    const payload = {
      firstName: el("firstName"), lastName: el("lastName"), email: el("email"), phone: el("phone"),
      skills, levels, experience: el("experience"), qualifications: el("qualifications"), motivation: el("motivation"),
    };
    try {
      const res = await fetch("/api/tutor/apply", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
      setSkills([]); setLevels([]);
    } catch { setStatus("error"); }
  }

  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20">
      <div className="max-w-[820px] mx-auto px-7">
        <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold-ink mb-2.5">{t(UI["tapp.label"], lang)}</p>
        <h1 className="font-[family-name:var(--font-heading)] text-[38px] text-navy mb-3">{t(UI["tapp.title"], lang)}</h1>
        <p className="text-[16px] text-muted leading-[1.75] mb-8 max-w-[640px]">{t(UI["tapp.desc"], lang)}</p>

        {/* Le parcours en bref */}
        <div className="bg-navy rounded-[22px] p-7 mb-9">
          <div className="font-[family-name:var(--font-heading)] text-[19px] text-gold mb-4">{t(UI["tapp.intro.title"], lang)}</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["tapp.intro.1", "tapp.intro.2", "tapp.intro.3"].map((k, i) => (
              <div key={k} className="flex flex-col gap-2">
                <div className="w-8 h-8 rounded-full bg-gold text-navy flex items-center justify-center font-bold text-sm">{i + 1}</div>
                <p className="text-[13px] text-white/70 leading-[1.6]">{t(UI[k], lang)}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[28px] p-8 sm:p-10 border border-gold/17 shadow-[0_8px_40px_rgba(13,27,46,0.07)]">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-navy mb-6">{t(UI["tapp.form.title"], lang)}</h2>

          <div className="grid grid-cols-2 gap-3.5 mb-3.5">
            <div><label className={labelCls}>{t(UI["contact.form.first"], lang)}</label><input name="firstName" aria-label={t(UI["contact.form.first"], lang)} required className={inputCls} /></div>
            <div><label className={labelCls}>{t(UI["contact.form.last"], lang)}</label><input name="lastName" aria-label={t(UI["contact.form.last"], lang)} required className={inputCls} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
            <div><label className={labelCls}>{t(UI["contact.form.email"], lang)}</label><input name="email" aria-label={t(UI["contact.form.email"], lang)} type="email" required className={inputCls} /></div>
            <div><label className={labelCls}>{t(UI["fld.phone"], lang)}</label><input name="phone" aria-label={t(UI["fld.phone"], lang)} className={inputCls} /></div>
          </div>

          <div className="mb-4">
            <label className={labelCls}>{t(UI["tapp.form.skills"], lang)}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SKILLS.map((s) => (
                <button type="button" key={s.id} onClick={() => toggle(setSkills)(s.id)}
                  className={`text-left text-[13px] px-3.5 py-2.5 rounded-xl border-[1.5px] transition-all ${skills.includes(s.id) ? "border-gold bg-gold/10 text-navy font-semibold" : "border-gold/20 bg-off-white text-body hover:border-gold/50"}`}>
                  <span className="mr-1.5" aria-hidden>{s.icon}</span>{t(UI[`tut.skill.${s.id}`], lang)}
                </button>
              ))}
            </div>
            {skills.length === 0 && <p className="text-[11.5px] text-muted mt-1.5">{t(UI["fld.skills.pick"], lang)}</p>}
          </div>

          <div className="mb-4">
            <label className={labelCls}>{t(UI["tapp.form.levels"], lang)}</label>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((l) => (
                <button type="button" key={l.id} onClick={() => toggle(setLevels)(l.id)}
                  className={`text-[13px] px-3.5 py-2 rounded-full border-[1.5px] transition-all ${levels.includes(l.id) ? "border-gold bg-gold/10 text-navy font-semibold" : "border-gold/20 bg-off-white text-body hover:border-gold/50"}`}>
                  {t(UI[`tut.level.${l.id}`], lang)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3.5"><label className={labelCls}>{t(UI["tapp.form.experience"], lang)}</label><textarea name="experience" aria-label={t(UI["tapp.form.experience"], lang)} className={`${inputCls} resize-y min-h-[70px]`} /></div>
          <div className="mb-3.5"><label className={labelCls}>{t(UI["tapp.form.qualifications"], lang)}</label><textarea name="qualifications" aria-label={t(UI["tapp.form.qualifications"], lang)} className={`${inputCls} resize-y min-h-[70px]`} /></div>
          <div className="mb-5"><label className={labelCls}>{t(UI["tapp.form.motivation"], lang)}</label><textarea name="motivation" aria-label={t(UI["tapp.form.motivation"], lang)} className={`${inputCls} resize-y min-h-[90px]`} /></div>

          <button type="submit" disabled={status === "sending" || skills.length === 0}
            className={`w-full py-3.5 font-bold text-[15px] rounded-xl transition-all disabled:opacity-60 ${status === "sent" ? "bg-gold text-navy" : "bg-navy text-gold hover:bg-navy-mid hover:-translate-y-0.5"}`}>
            {status === "sent" ? t(UI["contact.form.sent"], lang) : status === "sending" ? t(UI["contact.form.sending"], lang) : t(UI["tapp.title"], lang)}
          </button>
          {status === "sent" && <p className="text-[13px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 mt-3 text-center">{t(UI["tapp.success"], lang)}</p>}
          {status === "error" && <p className="text-[12.5px] text-red-600 mt-3 text-center">{t(UI["contact.form.note"], lang)}</p>}
          <p className="text-xs text-muted mt-3 text-center">{t(UI["contact.form.note"], lang)}</p>
        </form>
      </div>
    </div>
  );
}
