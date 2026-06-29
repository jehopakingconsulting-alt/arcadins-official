"use client";

import { useState } from "react";
import Modal, { PrivacyPolicy, TermsOfUse } from "@/components/ui/Modal";
import { useLang, t, UI } from "@/lib/i18n";

export function PrivacyLink() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="block text-white/46 text-[13.5px] py-[5px] mt-2 transition-all hover:text-gold text-left"
      >
        {t(UI["footer.privacy"], lang)}
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <PrivacyPolicy />
      </Modal>
    </>
  );
}

export function TermsLink() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="block text-white/46 text-[13.5px] py-[5px] transition-all hover:text-gold text-left"
      >
        {t(UI["footer.terms"], lang)}
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <TermsOfUse />
      </Modal>
    </>
  );
}
