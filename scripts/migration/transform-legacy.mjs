// transform-legacy.mjs — lit l'export JSON, applique le mapping, écrit
// _data/transformed.json + le rapport. Ne touche à aucune base.
import fs from "node:fs";
import { readJson, EXPORT_FILE, TRANSFORMED_FILE, ensureDataDir, Report } from "./lib.mjs";
import { transformAll } from "./transform.mjs";

export function runTransform() {
  if (!fs.existsSync(EXPORT_FILE)) { console.error("Export absent — lancez d'abord export-legacy.mjs"); process.exit(1); }
  const data = readJson(EXPORT_FILE);
  const report = new Report();
  const out = transformAll(data, report);
  ensureDataDir();
  fs.writeFileSync(TRANSFORMED_FILE, JSON.stringify(out));
  report.save();
  report.print("TRANSFORMATION (dry-run)");
  return { out, report };
}

if (import.meta.url === `file://${process.argv[1]}`.replace(/\\/g, "/") || process.argv[1]?.endsWith("transform-legacy.mjs")) {
  runTransform();
}
