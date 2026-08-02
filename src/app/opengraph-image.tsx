import { ImageResponse } from "next/og";

// Image de partage social/WhatsApp/Messenger par défaut (og:image + twitter:image
// auto-câblés par Next pour tout le site). Générée, autonome, aux couleurs de marque.
export const alt = "ARCADINS Training Center — Formation professionnelle & préparation TEF/TCF Canada";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B1526 0%, #0D1B2E 55%, #10233b 100%)",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: 2, color: "#C9A84C" }}>
          ARCADINS
        </div>
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 14, color: "#CBD5E8", marginTop: 6 }}>
          TRAINING CENTER
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "rgba(255,255,255,0.82)",
            marginTop: 44,
            maxWidth: 940,
            textAlign: "center",
            lineHeight: 1.35,
          }}
        >
          Formation professionnelle &amp; préparation TEF · TCF Canada
        </div>
        <div style={{ display: "flex", marginTop: 40, height: 6, width: 220, background: "#C9A84C", borderRadius: 4 }} />
      </div>
    ),
    { ...size },
  );
}
