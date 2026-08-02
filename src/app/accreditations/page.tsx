"use client";

import { ACCREDITATIONS } from "@/lib/constants";
import VerificationBadge from "@/components/ui/VerificationBadge";
import { useLang, t, UI } from "@/lib/i18n";

export default function AccreditationsPage() {
  const { lang } = useLang();
  const verified = ACCREDITATIONS.filter((a) => a.verified && a.proofUrl);

  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20">
      <div className="max-w-[1000px] mx-auto px-7">
        <div className="mb-12">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold-ink mb-2.5">
            {t(UI["acc.label"], lang)}
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl text-navy mb-4">
            {t(UI["acc.title"], lang)}
          </h1>
          <p className="text-[17px] text-muted max-w-[640px] leading-[1.75]">
            {t(UI["acc.desc"], lang)}
          </p>
        </div>

        {verified.length === 0 ? (
          <div className="max-w-[680px] bg-white rounded-[24px] p-10 border border-gold/15">
            <div className="text-4xl mb-4">🔎</div>
            <h2 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-3">
              {t(UI["acc.empty.title"], lang)}
            </h2>
            <p className="text-[15px] text-body leading-[1.75]">
              {t(UI["acc.empty.body"], lang)}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {verified.map((acc) => (
              <VerificationBadge key={acc.name} accreditation={acc} />
            ))}
          </div>
        )}

        {/* Ce que nous sommes / ne sommes pas (transparence) */}
        <div className="mt-12 bg-navy rounded-[24px] p-8 md:p-10">
          <h2 className="font-[family-name:var(--font-heading)] text-[22px] text-gold mb-3">
            {t(UI["acc.what.title"], lang)}
          </h2>
          <p className="text-[14.5px] text-white/70 leading-[1.8] max-w-[720px]">
            {t(UI["acc.what.body"], lang)}
          </p>
        </div>
      </div>
    </div>
  );
}
