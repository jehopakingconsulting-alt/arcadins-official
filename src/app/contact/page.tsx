"use client";

import { useState } from "react";
import { useLang, t, UI } from "@/lib/i18n";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const { lang } = useLang();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      country: (form.elements.namedItem("country") as HTMLInputElement).value,
      interest: (form.elements.namedItem("interest") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 4000);
    } catch { setStatus("idle"); }
  }

  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20">
      <div className="max-w-[1100px] mx-auto px-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
          <div>
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">{t(UI["contact.label"], lang)}</p>
            <h2 className="font-[family-name:var(--font-heading)] text-[38px] text-navy mb-3.5">
              {t(UI["contact.title1"], lang)}<br />{t(UI["contact.title2"], lang)} <em className="text-gold italic">{t(UI["contact.title3"], lang)}</em>
            </h2>
            <p className="text-base text-muted leading-[1.75] mb-7">{t(UI["contact.desc"], lang)}</p>
            <div className="flex flex-col gap-4">
              {[
                { icon: "📍", label: t(UI["contact.form.address"], lang), value: "116 Albert Street, Suite 300, Ottawa, ON K1P 5G3", href: "https://maps.google.com/?q=116+Albert+Street+Suite+300+Ottawa+ON+K1P+5G3" },
                { icon: "📧", label: t(UI["contact.form.email"], lang).replace(" *",""), value: "info@arcadins-training.com", href: "mailto:info@arcadins-training.com" },
                { icon: "📞", label: t(UI["contact.form.phone"], lang), value: "+1 (514) 451-3436", href: "tel:+15144513436" },
                { icon: "💬", label: "WhatsApp Business", value: "7j/7 · 7 languages →", href: "https://wa.me/15144513436" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center text-[19px] shrink-0">{item.icon}</div>
                  <div>
                    <div className="text-xs font-bold tracking-[1px] uppercase text-muted mb-0.5">{item.label}</div>
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-[15px] font-semibold text-navy hover:text-gold transition-all">{item.value}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-[28px] p-10 border border-gold/17 shadow-[0_8px_40px_rgba(13,27,46,0.07)]">
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-navy mb-6">{t(UI["contact.form.title"], lang)}</h3>
            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              <div><label className="block text-[12.5px] font-semibold text-body mb-1.5">{t(UI["contact.form.first"], lang)}</label><input name="firstName" type="text" required className="w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white transition-all" /></div>
              <div><label className="block text-[12.5px] font-semibold text-body mb-1.5">{t(UI["contact.form.last"], lang)}</label><input name="lastName" type="text" required className="w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white transition-all" /></div>
            </div>
            <div className="mb-3.5"><label className="block text-[12.5px] font-semibold text-body mb-1.5">{t(UI["contact.form.email"], lang)}</label><input name="email" type="email" required className="w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white transition-all" /></div>
            <div className="mb-3.5"><label className="block text-[12.5px] font-semibold text-body mb-1.5">{t(UI["contact.form.country"], lang)}</label><input name="country" type="text" className="w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white transition-all" /></div>
            <div className="mb-3.5"><label className="block text-[12.5px] font-semibold text-body mb-1.5">{t(UI["contact.form.interest"], lang)}</label>
              <select name="interest" className="w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white transition-all">
                <option>TEF Canada</option><option>TCF Canada</option><option>Formation professionnelle</option><option>Immigration</option><option>Forfait Professionnel</option><option>Licences institutionnelles</option>
              </select>
            </div>
            <div className="mb-3.5"><label className="block text-[12.5px] font-semibold text-body mb-1.5">{t(UI["contact.form.message"], lang)}</label><textarea name="message" className="w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white transition-all resize-y min-h-[108px]" /></div>
            <button type="submit" disabled={status === "sending"} className={`w-full py-3.5 font-bold text-[15px] rounded-xl transition-all ${status === "sent" ? "bg-gold text-navy" : "bg-navy text-gold hover:bg-navy-mid hover:-translate-y-0.5"}`}>
              {status === "sent" ? t(UI["contact.form.sent"], lang) : status === "sending" ? t(UI["contact.form.sending"], lang) : t(UI["contact.form.submit"], lang)}
            </button>
            <p className="text-xs text-muted mt-3 text-center">{t(UI["contact.form.note"], lang)}</p>
          </form>
        </div>
      </div>
    </div>
  );
}
