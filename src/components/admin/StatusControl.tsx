"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Contrôle générique de changement de statut. Le parcours (élève vs tuteur)
// reste séparé : l'`endpoint` et les `targets` sont fournis par la page appelante.
export default function StatusControl({
  endpoint,
  current,
  targets,
  requireReason = [],
  canReopen = false,
}: {
  endpoint: string;
  current: string;
  targets: string[];
  requireReason?: string[];
  canReopen?: boolean;
}) {
  const router = useRouter();
  const [to, setTo] = useState("");
  const [reason, setReason] = useState("");
  const [state, setState] = useState<"idle" | "confirm" | "saving" | "error">("idle");
  const [err, setErr] = useState("");

  const reasonRequired = to !== "" && requireReason.includes(to);

  async function apply(reopen = false) {
    if (!to) return;
    if (reasonRequired && reason.trim() === "") { setErr("Un motif est requis pour cette action."); setState("error"); return; }
    setState("saving"); setErr("");
    try {
      const res = await fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, reason: reason.trim() || undefined, reopen }),
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.error || "Échec"); setState("error"); return; }
      setState("idle"); setTo(""); setReason("");
      router.refresh();
    } catch {
      setErr("Erreur réseau"); setState("error");
    }
  }

  return (
    <div className="mt-3 pt-3 border-t border-gold/10">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={to}
          onChange={(e) => { setTo(e.target.value); setState("idle"); setErr(""); }}
          className="text-[12.5px] px-2.5 py-1.5 border-[1.5px] border-gold/25 rounded-lg bg-off-white text-body outline-none focus:border-gold"
        >
          <option value="">Changer le statut…</option>
          {targets.map((s) => (<option key={s} value={s}>{s}</option>))}
        </select>
        {reasonRequired && (
          <input
            value={reason} onChange={(e) => setReason(e.target.value)}
            placeholder="Motif (requis)"
            className="text-[12.5px] px-2.5 py-1.5 border-[1.5px] border-gold/25 rounded-lg bg-off-white text-body outline-none focus:border-gold flex-1 min-w-[140px]"
          />
        )}
        {to && state !== "confirm" && state !== "saving" && (
          <button onClick={() => setState("confirm")} className="text-[12.5px] font-semibold bg-navy text-gold px-3 py-1.5 rounded-lg">Appliquer</button>
        )}
        {state === "confirm" && (
          <span className="inline-flex items-center gap-2">
            <span className="text-[12px] text-muted">Confirmer {current} → {to} ?</span>
            <button onClick={() => apply(false)} className="text-[12px] font-bold bg-green-600 text-white px-2.5 py-1 rounded">Oui</button>
            <button onClick={() => setState("idle")} className="text-[12px] text-muted px-2 py-1">Annuler</button>
          </span>
        )}
        {state === "saving" && <span className="text-[12px] text-muted">Enregistrement…</span>}
      </div>
      {canReopen && (
        <button onClick={() => apply(true)} className="mt-2 text-[11.5px] text-gold underline">
          Réouverture explicite (admin) → under_review
        </button>
      )}
      {state === "error" && <p className="text-[12px] text-red-600 mt-1.5">{err}</p>}
    </div>
  );
}
