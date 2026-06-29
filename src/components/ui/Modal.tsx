"use client";

import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className={`fixed inset-0 z-[1100] bg-navy/88 backdrop-blur-[8px] flex items-center justify-center p-5 transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className={`bg-white rounded-[28px] p-10 max-w-[580px] w-full max-h-[90vh] overflow-y-auto relative transition-transform duration-300 ${
        open ? "scale-100" : "scale-[0.94]"
      }`}>
        <button
          onClick={onClose}
          className="absolute top-[18px] right-[18px] w-[34px] h-[34px] rounded-full bg-off-white border-none cursor-pointer text-lg flex items-center justify-center text-navy transition-all hover:bg-navy hover:text-gold"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export function CertificatePreview() {
  return (
    <>
      <div className="bg-navy rounded-[14px] p-8 text-center border-2 border-gold">
        <div className="text-[42px] mb-2">🏆</div>
        <div className="text-gold text-xs font-bold tracking-[3px] uppercase">ARCADINS Training Center</div>
        <div className="font-[family-name:var(--font-heading)] text-[22px] text-white mt-4 mb-1">Certificat de réussite décerné à</div>
        <div className="font-[family-name:var(--font-heading)] text-[28px] text-gold italic">Marie-Claire Dupont</div>
        <div className="text-white/60 text-sm mt-3">Formation : Leadership &amp; Gestion d&apos;Équipe<br />Score : 91/100</div>
        <div className="text-white/40 text-xs mt-3">Délivré le 28 mai 2025 · Ottawa, ON</div>
        <div className="w-16 h-16 bg-white rounded-md mx-auto mt-4 mb-1.5 flex items-center justify-center text-3xl">◦</div>
        <div className="text-white/30 text-[11px]">QR Code de vérification officielle</div>
      </div>
      <p className="mt-4 text-[13.5px] text-muted leading-[1.7]">
        Chaque certificat ARCADINS est horodaté, signé numériquement et vérifiable via QR code.
      </p>
    </>
  );
}

export function PrivacyPolicy() {
  return (
    <>
      <h3 className="font-[family-name:var(--font-heading)] text-[26px] text-navy mb-4">Politique de confidentialité</h3>
      <div className="text-[14.5px] text-muted leading-[1.8]">
        <strong>1. Collecte des données</strong><br />ARCADINS collecte uniquement les informations nécessaires à ses services.<br /><br />
        <strong>2. Utilisation</strong><br />Vos données personnalisent votre expérience et permettent l&apos;émission de vos certificats.<br /><br />
        <strong>3. Conservation</strong><br />Données supprimées sur demande sous 30 jours après résiliation.<br /><br />
        <strong>4. Droits</strong><br />Conformément à la Loi 25 du Québec et au RGPD : accès, rectification et suppression.<br /><br />
        <strong>5. Contact</strong><br /><a href="mailto:privacy@arcadins-training.com" className="text-gold hover:underline">privacy@arcadins-training.com</a>
      </div>
    </>
  );
}

export function TermsOfUse() {
  return (
    <>
      <h3 className="font-[family-name:var(--font-heading)] text-[26px] text-navy mb-4">Conditions d&apos;utilisation</h3>
      <div className="text-[14.5px] text-muted leading-[1.8]">
        <strong>1. Accès</strong><br />Accès strictement personnel et nominatif. Partage d&apos;identifiants interdit.<br /><br />
        <strong>2. Propriété intellectuelle</strong><br />Tous les contenus sont la propriété exclusive d&apos;ARCADINS Training Center.<br /><br />
        <strong>3. Certificats</strong><br />Délivrés après validation du module. Nominatifs et non transférables.<br /><br />
        <strong>4. Remboursement</strong><br />Intégral dans les 7 jours suivant l&apos;inscription, avant accès aux modules.<br /><br />
        <strong>5. Résiliation</strong><br />Depuis votre espace personnel, à tout moment.
      </div>
    </>
  );
}
