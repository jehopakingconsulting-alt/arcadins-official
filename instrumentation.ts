// Hook d'instrumentation Next.js (S2). Chargé automatiquement au démarrage.
// Point d'ancrage pour OpenTelemetry : brancher `@vercel/otel` ici (registerOTel)
// une fois le collecteur/exporteur provisionné (variable OTEL_EXPORTER_OTLP_ENDPOINT).
// Laissé volontairement sans dépendance tant que l'infra OTel n'est pas provisionnée.
export async function register() {
  if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    // Exemple (à activer avec la dépendance @vercel/otel) :
    //   const { registerOTel } = await import("@vercel/otel");
    //   registerOTel({ serviceName: "arcadins" });
    console.log(JSON.stringify({ ts: new Date().toISOString(), level: "info", msg: "otel_hook_ready" }));
  }
}
