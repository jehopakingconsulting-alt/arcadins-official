import type { ContentBlock } from "@/lib/lesson-runtime/types";

/**
 * LessonBlock — rendu d'un bloc de contenu PILOTÉ PAR MÉTADONNÉES (générique).
 * Dispatch sur `block.type`. Aucun média codé en dur : video/audio/pdf s'appuient sur
 * `meta` (src/durée/placeholder). Types inconnus (futur SCORM/H5P/Live) → fallback SÛR.
 * RSC (aucun état). Réutilisable par tous les produits.
 */
function MediaCard({ icon, kind, block }: { icon: string; kind: string; block: ContentBlock }) {
  const src = block.meta?.src as string | undefined;
  const duration = block.meta?.duration as string | undefined;
  return (
    <figure className="my-5 rounded-[16px] border border-gold/20 bg-off-white overflow-hidden">
      <div className="aspect-video w-full bg-navy/[0.04] flex flex-col items-center justify-center text-center p-6">
        <div className="text-4xl mb-2" aria-hidden="true">{icon}</div>
        <div className="text-[13px] font-semibold text-navy uppercase tracking-wide">{kind}</div>
        {block.heading && <div className="text-[15px] text-body mt-1">{block.heading}</div>}
        {duration && <div className="text-[12px] text-muted mt-1">⏱ {duration}</div>}
        {!src && <div className="text-[11.5px] text-muted mt-3 italic">Média fourni par métadonnées — lecture branchée à l&apos;activation</div>}
      </div>
      {block.text && <figcaption className="px-5 py-3 text-[13px] text-muted">{block.text}</figcaption>}
    </figure>
  );
}

export default function LessonBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="font-[family-name:var(--font-heading)] text-[22px] text-navy mt-8 mb-3">{block.text ?? block.heading}</h2>;
    case "paragraph":
    case "summary":
      return <p className="text-[15.5px] text-body leading-[1.85] my-3">{block.text}</p>;
    case "list":
    case "checklist":
      return (
        <ul className="my-4 flex flex-col gap-2">
          {(block.items ?? []).map((it, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[15px] text-body leading-[1.7]">
              <span className="text-gold shrink-0 mt-0.5" aria-hidden="true">{block.type === "checklist" ? "☐" : "•"}</span>{it}
            </li>
          ))}
        </ul>
      );
    case "quote":
    case "reflection":
      return <blockquote className="my-5 border-l-4 border-gold pl-5 py-1 text-[16px] italic text-navy">{block.text}</blockquote>;
    case "callout":
    case "keyTakeaway":
    case "definition":
      return (
        <div className="my-5 rounded-[14px] bg-gold/8 border border-gold/25 px-5 py-4">
          {block.heading && <div className="text-[12px] font-bold uppercase tracking-wide text-gold mb-1">{block.heading}</div>}
          <p className="text-[14.5px] text-navy leading-[1.7]">{block.text}</p>
        </div>
      );
    case "warning":
      return (
        <div role="note" className="my-5 rounded-[14px] bg-red-500/6 border border-red-400/30 px-5 py-4 text-[14.5px] text-red-800 leading-[1.7]">
          <strong>⚠️ </strong>{block.text}
        </div>
      );
    case "example":
    case "caseStudy":
      return (
        <div className="my-5 rounded-[14px] bg-navy/[0.03] border border-navy/10 px-5 py-4">
          <div className="text-[12px] font-bold uppercase tracking-wide text-muted mb-1">{block.heading ?? "Exemple"}</div>
          <p className="text-[14.5px] text-body leading-[1.7]">{block.text}</p>
        </div>
      );
    case "table":
      return (
        <div className="my-5 overflow-x-auto rounded-[12px] border border-gold/15">
          <table className="w-full min-w-[480px] text-[13.5px] border-collapse">
            <tbody>
              {(block.rows ?? []).map((row, ri) => (
                <tr key={ri} className={ri === 0 ? "bg-navy text-gold" : ri % 2 ? "bg-off-white" : "bg-white"}>
                  {row.map((cell, ci) => {
                    const Tag = ri === 0 ? "th" : "td";
                    return <Tag key={ci} scope={ri === 0 ? "col" : undefined} className="px-4 py-2.5 border border-navy/8 text-left">{cell}</Tag>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "image":
      return <MediaCard icon="🖼️" kind="Image" block={block} />;
    case "video":
      return <MediaCard icon="🎬" kind="Vidéo" block={block} />;
    case "audio":
      return <MediaCard icon="🎧" kind="Audio" block={block} />;
    case "pdf":
      return <MediaCard icon="📄" kind="PDF" block={block} />;
    case "code":
      return <pre className="my-5 rounded-[12px] bg-navy text-gold-pale p-4 overflow-x-auto text-[13px] font-[family-name:var(--font-mono)]"><code>{block.text}</code></pre>;
    case "formula":
      return <div className="my-5 rounded-[12px] bg-navy/[0.04] border border-navy/10 px-5 py-4 text-center font-[family-name:var(--font-mono)] text-[15px] text-navy">{block.text}</div>;
    case "interactiveActivity":
      return (
        <div className="my-5 rounded-[14px] border-2 border-dashed border-gold/40 bg-gold/5 px-5 py-6 text-center">
          <div className="text-3xl mb-2" aria-hidden="true">🧩</div>
          <div className="text-[14px] font-semibold text-navy">{block.heading ?? "Activité interactive"}</div>
          {block.text && <p className="text-[13px] text-muted mt-1">{block.text}</p>}
        </div>
      );
    case "resource":
    case "assignment":
      return (
        <div className="my-4 flex items-center gap-3 rounded-[12px] border border-gold/20 bg-white px-4 py-3">
          <span aria-hidden="true" className="text-xl">{block.type === "assignment" ? "✍️" : "🔗"}</span>
          <span className="text-[14px] text-navy font-medium">{block.text ?? block.heading}</span>
        </div>
      );
    default:
      // Fallback SÛR pour tout type futur (SCORM, H5P, Live…) : jamais de crash.
      return (
        <div className="my-4 rounded-[12px] border border-navy/12 bg-navy/[0.02] px-5 py-4">
          {block.heading && <div className="text-[13px] font-semibold text-navy mb-1">{block.heading}</div>}
          {block.text && <p className="text-[14px] text-body leading-[1.7]">{block.text}</p>}
          <div className="text-[11.5px] text-muted mt-2 italic">Format « {String(block.type)} » — rendu enrichi à venir</div>
        </div>
      );
  }
}
