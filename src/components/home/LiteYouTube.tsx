"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Façade YouTube « clic-pour-charger » : AUCUNE iframe au premier rendu.
 * Affiche une miniature optimisée (next/image → WebP, lazy) + bouton lecture
 * accessible ; l'iframe (autoplay) n'est injectée qu'après clic → LCP/INP/poids
 * JS fortement améliorés sans changer l'UI (la vidéo reste visible et lisible).
 */
export default function LiteYouTube({
  id,
  title,
  className = "",
}: {
  id: string;
  title: string;
  className?: string;
}) {
  const [play, setPlay] = useState(false);

  if (play) {
    return (
      <iframe
        className={`absolute inset-0 w-full h-full border-none ${className}`}
        src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlay(true)}
      aria-label={`Lire la vidéo : ${title}`}
      className={`absolute inset-0 w-full h-full group cursor-pointer ${className}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 720px"
        className="object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/10">
        <span className="w-[68px] h-[48px] rounded-2xl bg-[#ff0000]/90 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-105">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
