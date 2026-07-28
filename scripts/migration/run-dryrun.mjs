// run-dryrun.mjs — orchestre export → transform → reconcile en DRY-RUN.
// Ne touche à aucune base cible. Usage : node scripts/migration/run-dryrun.mjs [--db <chemin>]
import { spawnSync } from "node:child_process";
import path from "node:path";
import { HERE } from "./lib.mjs";

function step(file, extra = []) {
  const r = spawnSync(process.execPath, [path.join(HERE, file), ...process.argv.slice(2), ...extra], { stdio: "inherit" });
  if (r.status !== 0) { console.error(`Échec : ${file} (code ${r.status})`); process.exit(r.status || 1); }
}

console.log("### PHASE 5 — DRY-RUN COMPLET (copie locale) ###");
step("export-legacy.mjs");
step("transform-legacy.mjs");
step("reconcile.mjs");
console.log("\n✅ Dry-run terminé — aucune écriture en base. Voir _data/report.json et le rapport de réconciliation.");
