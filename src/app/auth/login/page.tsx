"use client";

import { useState, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLang, t, UI } from "@/lib/i18n";

export default function LoginPage() {
  return (<Suspense><LoginForm /></Suspense>);
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const { lang } = useLang();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); }
    else { router.push(redirect); router.refresh(); }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6 pt-32 pb-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-white mb-3">{t(UI["auth.login"], lang)}</h1>
          <p className="text-white/50 text-[15px]">{t(UI["auth.login.desc"], lang)}</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-[28px] p-10 shadow-[0_8px_40px_rgba(13,27,46,0.07)] border border-gold/17">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-6">{error}</div>}
          <div className="mb-4">
            <label className="block text-[12.5px] font-semibold text-body mb-1.5">{t(UI["contact.form.email"], lang)}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" required className="w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white" />
          </div>
          <div className="mb-6">
            <label className="block text-[12.5px] font-semibold text-body mb-1.5">{t(UI["auth.password"], lang)}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full px-4 py-3 border-[1.5px] border-gold/20 rounded-xl text-sm text-body bg-off-white outline-none focus:border-gold focus:bg-white" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-navy text-gold font-bold text-[15px] rounded-xl transition-all hover:bg-navy-mid hover:-translate-y-0.5 disabled:opacity-50">
            {loading ? "..." : t(UI["auth.login.btn"], lang)}
          </button>
          <p className="text-center text-sm text-muted mt-6">
            {t(UI["auth.login.no_account"], lang)}{" "}
            <Link href="/auth/register" className="text-gold font-semibold hover:underline">{t(UI["auth.register"], lang)}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
