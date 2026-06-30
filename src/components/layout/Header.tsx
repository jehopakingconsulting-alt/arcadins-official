"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLang, t, UI } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import LanguageSelector from "./LanguageSelector";

const NAV_KEYS = [
  { href: "/", key: "nav.home", icon: "🏠" },
  { href: "/tef", key: "nav.tef", icon: "📋" },
  { href: "/formations", key: "nav.formations", icon: "🎓" },
  { href: "/examens", key: "nav.examens", icon: "💻" },
  { href: "/immigration", key: "nav.immigration", icon: "🌍" },
  { href: "/tarifs", key: "nav.tarifs", icon: "💰" },
  { href: "/temoignages", key: "nav.temoignages", icon: "⭐" },
  { href: "/contact", key: "nav.contact", icon: "📞" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = useLang();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 25);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email || null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email || null);
    });
    return () => listener.subscription.unsubscribe();
  }, [pathname]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserEmail(null);
    setAccountOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[999] bg-navy/97 backdrop-blur-[16px] border-b border-gold/18 transition-all duration-300 ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.45)]" : ""}`}>
        {/* Ribbon */}
        <div className="bg-gradient-to-r from-gold via-[#a07830] to-gold px-4 md:px-7 py-1 flex items-center justify-between text-[11.5px] font-semibold text-navy">
          <div className="flex items-center gap-4">
            <span>🏛️ Certifié Québec &amp; Canada</span>
            <span className="opacity-40 text-[10px] hidden sm:inline">|</span>
            <span className="hidden sm:inline">TEF · TCF · TFI · DELF</span>
            <span className="opacity-40 text-[10px] hidden sm:inline">|</span>
            <span className="hidden sm:inline">47 Pays · ISO 9001</span>
          </div>
          <LanguageSelector />
        </div>

        {/* Nav bar */}
        <div className="flex items-center justify-between px-4 md:px-7 h-20 gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <svg viewBox="0 0 260 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 54, width: "auto" }} className="drop-shadow-[0_2px_10px_rgba(201,168,76,0.28)] transition-[filter] group-hover:drop-shadow-[0_3px_16px_rgba(201,168,76,0.55)]">
              <g>
                <polygon points="6,42 14,20 22,34 30,20 38,42" fill="none" stroke="#8A9BB5" strokeWidth="2.2" strokeLinejoin="round"/>
                <polyline points="24,36 32,12 38,18" fill="none" stroke="url(#gArrowH)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                <polygon points="32,8 38,18 26,15" fill="#C9A84C"/>
              </g>
              <defs>
                <linearGradient id="gArrowH" x1="24" y1="36" x2="38" y2="8" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8A9BB5"/>
                  <stop offset="100%" stopColor="#C9A84C"/>
                </linearGradient>
                <linearGradient id="gGoldH" x1="50" y1="10" x2="230" y2="10" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#E8C97A"/>
                  <stop offset="50%" stopColor="#C9A84C"/>
                  <stop offset="100%" stopColor="#F0D78A"/>
                </linearGradient>
              </defs>
              <text x="50" y="36" fontFamily="'Playfair Display',Georgia,serif" fontSize="28" fontWeight="700" letterSpacing="1" fill="url(#gGoldH)">ARCADINS</text>
              <text x="51" y="50" fontFamily="'DM Sans',Arial,sans-serif" fontSize="10.5" fontWeight="600" letterSpacing="4.5" fill="#CBD5E8">TRAINING CENTER</text>
            </svg>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_KEYS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[12.5px] font-medium px-3 py-2 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  pathname === item.href
                    ? "text-gold bg-gold/12"
                    : "text-white/72 hover:text-gold hover:bg-gold/10"
                }`}
              >
                <span className="text-[13px] opacity-55">{item.icon}</span>
                {t(UI[item.key], lang)}
              </Link>
            ))}
          </nav>

          {/* CTA / Account */}
          {userEmail ? (
            <div className="hidden lg:block relative" ref={accountRef}>
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-2 bg-white/8 border border-gold/25 text-gold font-semibold text-[13px] px-4 py-2.5 rounded-[9px] transition-all hover:bg-white/12 shrink-0"
              >
                <span className="w-6 h-6 rounded-full bg-gold text-navy flex items-center justify-center text-[11px] font-bold">
                  {userEmail[0].toUpperCase()}
                </span>
                <span className="max-w-[120px] truncate">{userEmail}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`w-2.5 h-2.5 transition-transform ${accountOpen ? "rotate-180" : ""}`}>
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {accountOpen && (
                <div className="absolute top-full right-0 mt-2 bg-navy border border-gold/25 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.4)] overflow-hidden min-w-[200px]">
                  <Link
                    href="/dashboard"
                    onClick={() => setAccountOpen(false)}
                    className="block px-4 py-3 text-[13.5px] font-medium text-white/80 hover:bg-gold/10 hover:text-gold transition-all"
                  >
                    📊 {t(UI["nav.dashboard"], lang)}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-[13.5px] font-medium text-white/80 hover:bg-gold/10 hover:text-gold transition-all border-t border-white/5"
                  >
                    🚪 {t(UI["nav.logout"], lang)}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/tarifs"
              className="hidden lg:block bg-gold text-navy font-bold text-[13px] px-5 py-2.5 rounded-[9px] transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,168,76,0.3)] shrink-0"
            >
              {t(UI["nav.cta"], lang)}
            </Link>
          )}

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-[22px] h-[2px] bg-white rounded transition-all ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block w-[22px] h-[2px] bg-white rounded transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-[22px] h-[2px] bg-white rounded transition-all ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[998] bg-navy pt-[calc(80px+16px)] px-6 pb-10 overflow-y-auto flex flex-col gap-2 lg:hidden">
          {NAV_KEYS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`text-[17px] font-medium px-5 py-4 rounded-xl border border-gold/10 bg-white/3 text-left transition-all ${
                pathname === item.href
                  ? "text-gold border-l-[3px] border-l-gold bg-gold/8"
                  : "text-white/80 border-l-[3px] border-l-transparent hover:text-gold hover:border-l-gold hover:bg-gold/8"
              }`}
            >
              {item.icon} {t(UI[item.key], lang)}
            </Link>
          ))}
          {userEmail ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="bg-gold text-navy font-bold text-base py-4 rounded-xl text-center mt-4"
              >
                📊 {t(UI["nav.dashboard"], lang)}
              </Link>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="bg-white/8 border border-gold/25 text-gold font-semibold text-base py-4 rounded-xl text-center"
              >
                🚪 {t(UI["nav.logout"], lang)}
              </button>
            </>
          ) : (
            <Link
              href="/tarifs"
              onClick={() => setMenuOpen(false)}
              className="bg-gold text-navy font-bold text-base py-4 rounded-xl text-center mt-4"
            >
              {t(UI["nav.cta"], lang)} →
            </Link>
          )}
        </div>
      )}
    </>
  );
}
