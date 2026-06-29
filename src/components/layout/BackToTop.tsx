"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 200);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-7 right-7 z-[900] w-[50px] h-[50px] rounded-full bg-gold text-navy border-none cursor-pointer text-xl flex items-center justify-center shadow-[0_6px_24px_rgba(201,168,76,0.45)] transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3.5 pointer-events-none"
      } hover:bg-gold-light hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(201,168,76,0.55)]`}
      title="Retour en haut"
    >
      ↑
    </button>
  );
}
