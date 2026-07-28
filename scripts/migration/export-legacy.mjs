// ============================================================================
// export-legacy.mjs — lit la base SQLite legacy en LECTURE SEULE et produit
// _data/legacy-export.json + _data/legacy-export.meta.json.
// N'écrit JAMAIS dans la base source. Vérifie l'intégrité + checksum.
//
// Usage : node scripts/migration/export-legacy.mjs --db "C:\\...\\server\\arcadins.db"
//   (better-sqlite3 est résolu depuis le node_modules voisin de la base.)
// ============================================================================
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";
import { parseFlags, ensureDataDir, EXPORT_FILE, META_FILE } from "./lib.mjs";

const DEFAULT_DB = "C:\\Users\\PC\\Desktop\\arcadins-training\\server\\arcadins.db";
const TABLES = [
  "users", "prospects", "tests", "modules", "certificates",
  "tuteur_modules", "affiliate_commissions", "admin_settings", "admin_audit_log",
];

function loadBetterSqlite(dbPath) {
  try { return createRequire(import.meta.url)("better-sqlite3"); } catch { /* pas dans ce repo */ }
  // Résolution depuis le node_modules voisin de la base (ancien projet).
  const candidate = path.join(path.dirname(dbPath), "node_modules");
  const req = createRequire(path.join(candidate, "noop.js"));
  return req("better-sqlite3");
}

function main() {
  const flags = parseFlags();
  const dbPath = flags.db || DEFAULT_DB;
  if (!fs.existsSync(dbPath)) { console.error(`Base introuvable : ${dbPath}`); process.exit(1); }

  const Database = loadBetterSqlite(dbPath);
  const db = new Database(dbPath, { readonly: true, fileMustExist: true });

  const integrity = db.pragma("integrity_check")[0].integrity_check;
  const fkViolations = db.pragma("foreign_key_check").length;
  const buf = fs.readFileSync(dbPath);
  const sha256 = crypto.createHash("sha256").update(buf).digest("hex");

  const data = {};
  const counts = {};
  for (const t of TABLES) {
    try { data[t] = db.prepare(`SELECT * FROM "${t}"`).all(); counts[t] = data[t].length; }
    catch { data[t] = []; counts[t] = "ABSENTE"; }
  }
  db.close(); // aucune écriture effectuée

  ensureDataDir();
  fs.writeFileSync(EXPORT_FILE, JSON.stringify(data));
  fs.writeFileSync(META_FILE, JSON.stringify({
    exportedAt: new Date().toISOString(), dbPath, sizeBytes: buf.length,
    sha256, integrity_check: integrity, foreign_key_violations: fkViolations, counts,
  }, null, 2));

  console.log(`Export OK — intégrité=${integrity}, FK violations=${fkViolations}`);
  console.log(`sha256=${sha256}`);
  console.log(`Comptes source :`, JSON.stringify(counts));
  console.log(`→ ${EXPORT_FILE}`);
  if (integrity !== "ok" || fkViolations > 0) { console.error("⚠️ Intégrité non conforme — STOP."); process.exit(2); }
}
main();
