// ============================================================================
// ARCADINS — Librairie partagée des scripts de migration legacy → Supabase.
// Dry-run par défaut. Aucune donnée personnelle ni hachage dans les logs.
// ============================================================================
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const DATA_DIR = path.join(HERE, "_data");
export const EXPORT_FILE = path.join(DATA_DIR, "legacy-export.json");
export const META_FILE = path.join(DATA_DIR, "legacy-export.meta.json");
export const TRANSFORMED_FILE = path.join(DATA_DIR, "transformed.json");
export const ERRORS_FILE = path.join(DATA_DIR, "errors.log");
export const REPORT_FILE = path.join(DATA_DIR, "report.json");

export function ensureDataDir() { fs.mkdirSync(DATA_DIR, { recursive: true }); }

// ── CLI ─────────────────────────────────────────────────────────────────────
export function parseFlags(argv = process.argv.slice(2)) {
  const f = { dryRun: true, batchSize: 500, only: null, userId: null, resume: false, confirm: false, db: null, all: false, purgeAuth: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--no-dry-run" || a === "--live") f.dryRun = false;
    else if (a === "--dry-run") f.dryRun = true;
    else if (a === "--confirm") f.confirm = true;
    else if (a === "--resume") f.resume = true;
    else if (a === "--all") f.all = true;
    else if (a === "--purge-auth") f.purgeAuth = true;
    else if (a === "--batch-size") f.batchSize = parseInt(argv[++i], 10) || 500;
    else if (a === "--only") f.only = argv[++i];
    else if (a === "--user-id") f.userId = argv[++i];
    else if (a === "--db") f.db = argv[++i];
    else if (a === "--report") f.reportOnly = true;
  }
  // Sécurité : un import réel exige --live ET --confirm ET les creds Supabase.
  f.willWrite = !f.dryRun && f.confirm;
  return f;
}

// ── Journalisation sûre (sans PII) ──────────────────────────────────────────
export function redactEmail(email) {
  if (!email) return "";
  const [u, d] = String(email).split("@");
  if (!d) return "***";
  return `${u.slice(0, 1)}***@${d}`;
}

export class Report {
  constructor() { this.entities = {}; this.errors = []; this.startedAt = new Date().toISOString(); }
  entity(name) {
    if (!this.entities[name]) this.entities[name] = { inserted: 0, updated: 0, skipped: 0, rejected: 0 };
    return this.entities[name];
  }
  count(name, kind, n = 1) { this.entity(name)[kind] += n; }
  reject(name, ref, reason) {
    this.entity(name).rejected++;
    // ref = identifiant NON personnel (legacy_id) + email redacté uniquement
    this.errors.push({ entity: name, ref, reason });
  }
  save() {
    ensureDataDir();
    fs.writeFileSync(REPORT_FILE, JSON.stringify({ ...this, finishedAt: new Date().toISOString() }, null, 2));
    fs.writeFileSync(ERRORS_FILE, this.errors.map(e => JSON.stringify(e)).join("\n") + "\n");
  }
  print(title = "RAPPORT") {
    console.log(`\n=== ${title} ===`);
    for (const [name, c] of Object.entries(this.entities)) {
      console.log(`  ${name.padEnd(22)} inserted=${c.inserted}  updated=${c.updated}  skipped=${c.skipped}  rejected=${c.rejected}`);
    }
    console.log(`  Erreurs journalisées : ${this.errors.length}`);
  }
}

// ── Normalisation & helpers ─────────────────────────────────────────────────
export const normEmail = (e) => (e ? String(e).trim().toLowerCase() : null);
export function normPhone(p) {
  if (!p) return null;
  let d = String(p).replace(/\D/g, "").replace(/^00/, "");
  if (d.length > 9 && d.startsWith("0")) d = d.slice(1);
  return d || null;
}
export const toBool = (v) => v === 1 || v === true || v === "1";
export const toNum = (v) => (v === null || v === undefined || v === "" ? null : Number(v));
export function parseJsonSafe(v, fallback) {
  if (v === null || v === undefined || v === "") return fallback;
  try { return typeof v === "string" ? JSON.parse(v) : v; } catch { return fallback; }
}
// Les dates legacy sont au format "YYYY-MM-DD HH:MM:SS" (UTC, datetime('now')).
export function parseLegacyDate(v) {
  if (!v) return null;
  const s = String(v).trim();
  const iso = s.includes("T") ? s : s.replace(" ", "T") + (/[Z+]/.test(s) ? "" : "Z");
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d.toISOString();
}
const ROLE_MAP = { prospect: "student", apprenant: "student", tuteur: "tutor", moderator: "support", admin: "admin" };
export const mapRole = (r) => ROLE_MAP[String(r || "").toLowerCase()] || "student";
export const isBcrypt = (h) => typeof h === "string" && /^\$2[aby]\$\d\d\$/.test(h);
export const isEmail = (e) => typeof e === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

export function readJson(file) { return JSON.parse(fs.readFileSync(file, "utf8")); }
