"use client";

import Link from "next/link";
import { PrivacyLink, TermsLink } from "./FooterModals";
import { useLang, t, UI } from "@/lib/i18n";
import Icon from "@/components/ui/Icon";

// Uniquement des destinations réelles et des formations ACTIVES : les entrées
// vers des formations archivées (EPE, PAB, Famille Sans Dette) ou inexistantes
// (Leadership) ont été retirées — cohérence avec le catalogue public (Phase 5/19).
const FOOTER_FORMATIONS = [
  { key: "nav.tef", label: "TEF / TCF Canada", href: "/tef" },
  { key: "tut.title", href: "/tutorat" },
  { key: "fl.informatique", href: "/formations" },
  { key: "footer.formations", href: "/formations" },
];

const FOOTER_SERVICES = [
  { key: "fl.examens", href: "/examens" },
  { key: "fl.certificats", href: "/examens" },
  { key: "fl.ircc", href: "/immigration" },
  { key: "fl.emploi", href: "/immigration" },
  { key: "tut.cta.becometutor", href: "/devenir-tuteur" },
  { key: "fl.tarifs", href: "/tarifs" },
  { key: "acc.nav", href: "/accreditations" },
  { key: "fl.contacter", href: "/contact" },
];

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-navy-mid">
      <div className="max-w-[1200px] mx-auto px-7 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-12">
        {/* Brand */}
        <div>
          <div className="mb-5">
            <span className="text-2xl font-bold font-[family-name:var(--font-heading)] bg-gradient-to-r from-gold-light via-gold to-gold-pale bg-clip-text text-transparent tracking-wide">
              ARCADINS
            </span>
            <div className="text-[10.5px] font-semibold tracking-[4.5px] text-[#5A6E8A]">
              TRAINING CENTER
            </div>
          </div>
          <p className="text-white/40 text-[13.5px] leading-[1.75] mb-6 max-w-[280px]">
            {t(UI["footer.desc"], lang)}
          </p>
          {/* Liens sociaux masqués : les href pointaient vers les pages d'accueil
              génériques des plateformes (facebook.com, linkedin.com, x.com,
              youtube.com, instagram.com), pas vers des comptes ARCADINS officiels.
              Règle « ne pas inventer d'URL ». Rétablir ce bloc en renseignant les
              URLs réelles des comptes ARCADINS. */}
        </div>

        {/* Formations */}
        <div>
          <h5 className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-4">
            {t(UI["footer.formations"], lang)}
          </h5>
          {FOOTER_FORMATIONS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block text-white/46 text-[13.5px] py-[5px] transition-all hover:text-gold"
            >
              {item.key === "nav.tef" ? "TEF / TCF Canada" : t(UI[item.key], lang)}
            </Link>
          ))}
        </div>

        {/* Services */}
        <div>
          <h5 className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-4">
            {t(UI["footer.services"], lang)}
          </h5>
          {FOOTER_SERVICES.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block text-white/46 text-[13.5px] py-[5px] transition-all hover:text-gold"
            >
              {t(UI[item.key], lang)}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-4">
            {t(UI["footer.contact"], lang)}
          </h5>
          <a href="https://maps.google.com/?q=116+Albert+Street+Suite+300+Ottawa+ON+K1P+5G3" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/46 text-[13.5px] py-[5px] transition-all hover:text-gold">
            <Icon name="pin" size={15} className="shrink-0 opacity-70" /> Ottawa, ON Canada
          </a>
          <a href="mailto:info@arcadins-training.com" className="flex items-center gap-2 text-white/46 text-[13.5px] py-[5px] transition-all hover:text-gold">
            <Icon name="mail" size={15} className="shrink-0 opacity-70" /> info@arcadins-training.com
          </a>
          <a href="tel:+15144513436" className="flex items-center gap-2 text-white/46 text-[13.5px] py-[5px] transition-all hover:text-gold">
            <Icon name="phone" size={15} className="shrink-0 opacity-70" /> +1 (514) 451-3436
          </a>
          <a href="https://wa.me/15144513436" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/46 text-[13.5px] py-[5px] transition-all hover:text-gold">
            <Icon name="chat" size={15} className="shrink-0 opacity-70" /> {t(UI["footer.whatsapp"], lang)}
          </a>
          <PrivacyLink />
          <TermsLink />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/7 px-7 py-5 max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-white/28 text-[12.5px]">
          {t(UI["footer.copyright"], lang)}
        </p>
        <div className="flex gap-2 flex-wrap">
          {["footer.seal1", "footer.seal2", "footer.seal3"].map((key) => (
            <span
              key={key}
              className="bg-gold/8 border border-gold/20 rounded-md px-3 py-[5px] text-[11px] text-gold font-semibold"
            >
              {t(UI[key], lang)}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
