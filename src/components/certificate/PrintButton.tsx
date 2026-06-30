"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-navy text-gold font-bold text-sm px-6 py-3 rounded-xl"
    >
      🖨️ Imprimer / Télécharger en PDF
    </button>
  );
}
