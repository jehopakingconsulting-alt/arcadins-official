"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewModeration({ id, current }: { id: string; current: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(current);

  async function set(next: "approved" | "rejected") {
    if (busy) return;
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/reviews/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (r.ok) { setStatus(next); router.refresh(); }
    } finally { setBusy(false); }
  }

  return (
    <div className="flex gap-2 items-center">
      <button type="button" onClick={() => set("approved")} disabled={busy || status === "approved"}
        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-600 text-white disabled:opacity-40 hover:bg-green-700 transition-colors">
        Approuver
      </button>
      <button type="button" onClick={() => set("rejected")} disabled={busy || status === "rejected"}
        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-100 text-red-700 disabled:opacity-40 hover:bg-red-200 transition-colors">
        Rejeter
      </button>
      <span className="text-[11px] text-muted">{status}</span>
    </div>
  );
}
