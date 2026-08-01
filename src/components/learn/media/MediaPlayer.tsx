import type { ContentBlock } from "@/lib/lesson-runtime/types";

/**
 * MediaPlayer — lecteur média piloté par MÉTADONNÉES (video/audio/pdf). Rend un vrai
 * élément <video>/<audio> avec pistes de sous-titres + contrôles natifs (accessibles,
 * clavier) UNIQUEMENT si `meta.src` est fourni. Sinon → carte placeholder identique à
 * avant (RÉTRO-COMPATIBLE avec S4). RSC. Réutilisable, tenant/white-label-ready.
 * Adaptateurs de lecture avancés : voir runtime/player/media (MediaPlayerAdapter).
 */
function str(v: unknown): string | undefined { return typeof v === "string" && v ? v : undefined; }

function Placeholder({ icon, kind, block }: { icon: string; kind: string; block: ContentBlock }) {
  const duration = str(block.meta?.duration);
  return (
    <figure className="my-5 rounded-[16px] border border-gold/20 bg-off-white overflow-hidden">
      <div className="aspect-video w-full bg-navy/[0.04] flex flex-col items-center justify-center text-center p-6">
        <div className="text-4xl mb-2" aria-hidden="true">{icon}</div>
        <div className="text-[13px] font-semibold text-navy uppercase tracking-wide">{kind}</div>
        {block.heading && <div className="text-[15px] text-body mt-1">{block.heading}</div>}
        {duration && <div className="text-[12px] text-muted mt-1">⏱ {duration}</div>}
        <div className="text-[11.5px] text-muted mt-3 italic">Média fourni par métadonnées — source à l&apos;activation</div>
      </div>
      {block.text && <figcaption className="px-5 py-3 text-[13px] text-muted">{block.text}</figcaption>}
    </figure>
  );
}

export default function MediaPlayer({ block, kind }: { block: ContentBlock; kind: "video" | "audio" | "pdf" }) {
  const src = str(block.meta?.src);
  const captions = str(block.meta?.captions);
  const poster = str(block.meta?.poster);
  const label = block.heading ?? (kind === "video" ? "Vidéo" : kind === "audio" ? "Audio" : "Document");

  if (!src) {
    return <Placeholder icon={kind === "video" ? "🎬" : kind === "audio" ? "🎧" : "📄"} kind={kind === "video" ? "Vidéo" : kind === "audio" ? "Audio" : "PDF"} block={block} />;
  }

  return (
    <figure className="my-5 rounded-[16px] border border-gold/20 overflow-hidden bg-navy">
      {kind === "video" && (
        <video controls preload="metadata" poster={poster} aria-label={label} className="w-full aspect-video bg-black">
          <source src={src} />
          {captions && <track kind="captions" src={captions} srcLang="fr" label="Français" default />}
        </video>
      )}
      {kind === "audio" && (
        <div className="p-5">
          <div className="text-white/85 text-[14px] font-semibold mb-3">🎧 {label}</div>
          <audio controls preload="metadata" aria-label={label} className="w-full">
            <source src={src} />
            {captions && <track kind="captions" src={captions} srcLang="fr" label="Français" default />}
          </audio>
        </div>
      )}
      {kind === "pdf" && (
        <iframe src={src} title={label} className="w-full aspect-[4/3] bg-white" loading="lazy" />
      )}
      {block.text && <figcaption className="px-5 py-3 text-[13px] text-white/60 bg-navy">{block.text}</figcaption>}
    </figure>
  );
}
