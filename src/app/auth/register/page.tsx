"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang, t, UI } from "@/lib/i18n";
import PasswordField from "@/components/ui/PasswordField";
import { COUNTRIES } from "@/lib/data/countries";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { lang } = useLang();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { first_name: firstName, last_name: lastName, country } } });
    if (error) { setError(error.message); setLoading(false); }
    else { setSuccess(true); setTimeout(() => { router.push("/dashboard"); router.refresh(); }, 1500); }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-6 pt-32 pb-16">
        <div className="text-center"><div className="text-5xl mb-4">✅</div><h2 className="font-[family-name:var(--font-heading)] text-2xl text-white mb-3">OK!</h2></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6 pt-32 pb-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-white mb-3">{t(UI["auth.register"], lang)}</h1>
          <p className="text-white/50 text-[15px]">{t(UI["auth.register.desc"], lang)}</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-[28px] p-10 shadow-[0_8px_40px_rgba(13,27,46,0.07)] border border-gold/17">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-6">{error}</div>}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div><label className="block text-[12.5px] font-semibold text-body mb-1.5">{t(UI["contact.form.first"], lang)}</label><input type="text" aria-label={t(UI["contact.form.first"], lang)} value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white" /></div>
            <div><label className="block text-[12.5px] font-semibold text-body mb-1.5">{t(UI["contact.form.last"], lang)}</label><input type="text" aria-label={t(UI["contact.form.last"], lang)} value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white" /></div>
          </div>
          <div className="mb-4"><label className="block text-[12.5px] font-semibold text-body mb-1.5">{t(UI["contact.form.email"], lang)}</label><input type="email" aria-label={t(UI["contact.form.email"], lang)} value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white" /></div>
          <div className="mb-4">
            <label htmlFor="reg-country" className="block text-[12.5px] font-semibold text-body mb-1.5">{t(UI["contact.form.country"], lang)}</label>
            <select
              id="reg-country"
              aria-label={t(UI["contact.form.country"], lang)}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              autoComplete="country-name"
              className="w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white"
            >
              <option value="">{t(UI["form.country.select"], lang)}</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <PasswordField
              label={t(UI["auth.password"], lang)}
              value={password}
              onChange={setPassword}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-gold text-navy font-bold text-[15px] rounded-xl transition-all hover:bg-gold-light hover:-translate-y-0.5 disabled:opacity-50">
            {loading ? "..." : t(UI["auth.register.btn"], lang)}
          </button>
          <p className="text-center text-sm text-muted mt-6">
            {t(UI["auth.register.has_account"], lang)}{" "}
            <Link href="/auth/login" className="text-gold font-semibold hover:underline">{t(UI["auth.login"], lang)}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
