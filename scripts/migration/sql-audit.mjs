// Audit SQL STATIQUE (aucune base, aucune application). Scanne les migrations
// dans l'ordre et détecte : (1) références FK « en avant » vers une table pas
// encore créée ; (2) parité colonnes/valeurs des INSERT ... VALUES mono-ligne.
// Utilisé en CI (A8). Exit 1 si défaut.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(HERE, "..", "..", "supabase", "migrations");
const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".sql")).sort();

const created = new Set();
const forwardRefs = [];
let inCreate = null;

for (const file of files) {
  const lines = fs.readFileSync(path.join(DIR, file), "utf8").split(/\r?\n/);
  lines.forEach((raw, i) => {
    const line = raw.replace(/--.*$/, "");
    const loc = `${file}:${i + 1}`;
    const mCreate = line.match(/create table if not exists (public\.\w+)/i);
    if (mCreate) inCreate = mCreate[1].toLowerCase();
    for (const r of line.matchAll(/references\s+(public\.\w+)/gi)) {
      const target = r[1].toLowerCase();
      if (!created.has(target) && target !== inCreate) forwardRefs.push({ loc, target });
    }
    if (inCreate && /\)\s*;/.test(line)) { created.add(inCreate); inCreate = null; }
  });
}

const pairs = [];
for (const file of files) {
  const sql = fs.readFileSync(path.join(DIR, file), "utf8");
  const re = /insert into[\s\S]*?\(([^)]*)\)\s*values\s*\(([^;]*?)\)\s*(?:on conflict|;)/gi;
  let m;
  while ((m = re.exec(sql))) {
    const cols = m[1].split(",").length;
    let depth = 0, vals = 1;
    for (const ch of m[2]) { if (ch === "(") depth++; else if (ch === ")") depth--; else if (ch === "," && depth === 0) vals++; }
    if (cols !== vals) pairs.push({ file, cols, vals });
  }
}

console.log(`Migrations: ${files.length} | tables public.*: ${created.size}`);
console.log(`Forward-refs: ${forwardRefs.length} | INSERT parité KO: ${pairs.length}`);
forwardRefs.forEach((r) => console.log(`  ✗ ${r.loc} → ${r.target}`));
pairs.forEach((p) => console.log(`  ✗ ${p.file}: ${p.cols} cols / ${p.vals} vals`));

const ok = forwardRefs.length === 0 && pairs.length === 0;
console.log(ok ? "✅ AUDIT SQL OK" : "❌ DÉFAUTS SQL");
process.exit(ok ? 0 : 1);
