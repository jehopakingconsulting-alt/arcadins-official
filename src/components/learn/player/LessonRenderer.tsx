import type { ContentBlock } from "@/lib/runtime/ui/types";

/**
 * Renderer de contenu générique (Sprint J). SÉCURITÉ : rend UNIQUEMENT du texte (JSX échappé par React) ;
 * jamais de `dangerouslySetInnerHTML`, jamais d'exécution de HTML non fiable. Tolère les blocs inconnus via un
 * fallback sûr. Accessible (titres, listes, tables sémantiques, placeholders média avec texte alternatif).
 */
function Placeholder({ kind, minutes }: { kind: string; minutes?: number }) {
  return (
    <div role="img" aria-label={`Média ${kind} (aperçu indisponible en démonstration)`} className="flex h-40 items-center justify-center rounded-lg border border-dashed border-[color:var(--border-gold)] bg-[color:var(--color-off-white)] text-xs text-[color:var(--color-muted)]">
      {kind.toUpperCase()} — aperçu {minutes ? `(${minutes} min)` : ""} · démonstration
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  const meta = block.meta ?? {};
  switch (block.type) {
    case "heading":
      return <h3 className="text-lg font-semibold text-[color:var(--color-navy)]">{block.heading ?? block.text}</h3>;
    case "paragraph":
      return <p className="text-[color:var(--color-body)]">{block.text}</p>;
    case "list":
      return <ul className="list-disc space-y-1 pl-5 text-[color:var(--color-body)]">{(block.items ?? []).map((it, i) => <li key={i}>{it}</li>)}</ul>;
    case "checklist":
      return <ul className="space-y-1 text-[color:var(--color-body)]">{(block.items ?? []).map((it, i) => <li key={i} className="flex items-start gap-2"><span aria-hidden="true">☐</span><span>{it}</span></li>)}</ul>;
    case "quote":
      return <blockquote className="border-l-4 border-[color:var(--color-gold)] pl-4 italic text-[color:var(--color-body)]">{block.text}</blockquote>;
    case "callout":
    case "definition":
    case "example":
    case "reflection":
      return (
        <aside className="rounded-lg border border-[color:var(--border-gold)] bg-[color:var(--color-off-white)] p-4">
          {block.heading && <p className="mb-1 font-semibold text-[color:var(--color-navy)]">{block.heading}</p>}
          <p className="text-sm text-[color:var(--color-body)]">{block.text}</p>
        </aside>
      );
    case "warning":
      return <div role="note" className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">{block.text}</div>;
    case "keyTakeaway":
    case "summary":
      return (
        <aside className="rounded-lg border-l-4 border-[color:var(--color-gold)] bg-[color:var(--color-gold-pale)]/40 p-4">
          <p className="text-sm font-medium text-[color:var(--color-navy)]">{block.text}</p>
        </aside>
      );
    case "caseStudy":
      return (
        <section className="rounded-lg border border-[color:var(--border-gold)] p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-gold)]">Étude de cas</p>
          {block.heading && <p className="font-semibold text-[color:var(--color-navy)]">{block.heading}</p>}
          <p className="mt-1 text-sm text-[color:var(--color-body)]">{block.text}</p>
        </section>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {(block.rows ?? []).map((row, ri) => (
                <tr key={ri} className={ri === 0 ? "bg-[color:var(--color-off-white)] font-semibold" : ""}>
                  {row.map((cell, ci) => (ri === 0 ? <th key={ci} scope="col" className="border border-[color:var(--border-gold)] p-2 text-left">{cell}</th> : <td key={ci} className="border border-[color:var(--border-gold)] p-2">{cell}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "code":
      return <pre className="overflow-x-auto rounded-lg bg-[color:var(--color-navy)] p-4 text-sm text-[color:var(--color-off-white)]"><code>{block.text}</code></pre>;
    case "formula":
      return <p className="rounded-lg bg-[color:var(--color-off-white)] p-3 text-center font-mono text-sm text-[color:var(--color-navy)]">{block.text}</p>;
    case "image":
    case "video":
    case "audio":
    case "pdf":
      return <Placeholder kind={block.type} minutes={typeof meta.minutes === "number" ? meta.minutes : undefined} />;
    case "interactiveActivity":
    case "assignment":
    case "resource":
      return (
        <div className="rounded-lg border border-dashed border-[color:var(--border-gold)] p-4 text-sm text-[color:var(--color-body)]">
          {block.heading && <p className="font-semibold text-[color:var(--color-navy)]">{block.heading}</p>}
          <p>{block.text ?? "Activité interactive (démonstration)."}</p>
        </div>
      );
    default:
      // Fallback SÛR pour tout type inconnu : jamais de rendu non maîtrisé.
      return <p className="rounded bg-[color:var(--color-off-white)] p-2 text-xs text-[color:var(--color-muted)]">{block.text ?? "Contenu non pris en charge."}</p>;
  }
}

export function LessonRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((b) => <Block key={b.id} block={b} />)}
    </div>
  );
}
