"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [spin, setSpin] = useState(false);
  return (
    <button
      onClick={() => { setSpin(true); start(() => router.refresh()); setTimeout(() => setSpin(false), 600); }}
      disabled={pending}
      className="bg-navy text-gold text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 disabled:opacity-50 transition"
    >
      {spin || pending ? "Actualisation…" : "Rafraîchir"}
    </button>
  );
}
