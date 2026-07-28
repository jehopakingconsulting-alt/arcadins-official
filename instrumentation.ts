// Hook d'instrumentation Next.js (OpenTelemetry). Chargé automatiquement au démarrage.
// Build-safe : `@vercel/otel` est chargé dynamiquement UNIQUEMENT s'il est installé
// ET si un endpoint OTLP est configuré. Aucune dépendance obligatoire → le build
// reste vert tant que l'infra OTel n'est pas provisionnée.
//
// Activation en production :
//   1) npm i @vercel/otel @opentelemetry/api
//   2) définir OTEL_EXPORTER_OTLP_ENDPOINT (+ headers) sur Vercel
export async function register() {
  if (!process.env.OTEL_EXPORTER_OTLP_ENDPOINT) return;
  try {
    // Nom de module construit au runtime → opaque au bundler (aucun warning
    // "Module not found" si @vercel/otel n'est pas installé).
    const pkg = ["@vercel", "otel"].join("/");
    const otel = (await import(pkg).catch(() => null)) as
      | { registerOTel?: (o: { serviceName: string }) => void }
      | null;
    if (otel?.registerOTel) {
      otel.registerOTel({ serviceName: process.env.OTEL_SERVICE_NAME || "arcadins" });
      console.log(JSON.stringify({ ts: new Date().toISOString(), level: "info", msg: "otel_registered" }));
    } else {
      console.log(JSON.stringify({ ts: new Date().toISOString(), level: "warn", msg: "otel_endpoint_set_but_pkg_missing" }));
    }
  } catch (e) {
    console.error(JSON.stringify({ ts: new Date().toISOString(), level: "error", msg: "otel_register_failed", err: String(e) }));
  }
}
