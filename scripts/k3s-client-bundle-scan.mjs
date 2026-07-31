/**
 * K3-S — scan de sécurité des BUNDLES CLIENT (chunks navigateur).
 *
 * Vérifie qu'aucun chunk client (`.next/static/chunks/**`) ne contient de donnée académique PRIVÉE : contenu
 * d'answerKey, explications de la banque, ou clés de structures privées. Prouve que la banque/curriculum privés
 * ne sont pas embarqués côté navigateur (ils restent server-only / *.server.ts).
 *
 * Usage : node scripts/k3s-client-bundle-scan.mjs   (après `next build`)
 * Sortie : exit 0 = propre ; exit 1 = fuite détectée.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const CHUNKS_DIR = ".next/static/chunks";

// Aiguilles = VALEURS privées distinctives (données réelles) qui ne doivent JAMAIS apparaître dans un chunk
// client. NB : on ne scanne PAS les NOMS de clés (« answerKey », « correctOptionId »…) car ils apparaissent
// légitimement dans les LISTES noires des gardes de sécurité (défense en profondeur) exécutées côté client —
// une clé dans une blocklist n'est PAS une donnée fuitée. Seules les VALEURS privées trahiraient une fuite.
const NEEDLES = [
  "1 → sondage (mesurer combien).",             // contenu réel d'un answerKey (correction) — privé
  "2 → entretien (comprendre le pourquoi).",     // contenu réel d'un answerKey — privé
  "3 → observation (mesurer le comportement réel).",
  "PRIVATE_ANSWER_KEY_SENTINEL_K3S",             // sentinelles (n'existent que côté test)
  "PRIVATE_CORRECT_OPTION_SENTINEL_K3S",
  "PRIVATE_GRADING_SENTINEL_K3S",
  "PRIVATE_EXPLANATION_SENTINEL_K3S",
  "PRIVATE_RUBRIC_SENTINEL_K3S",
];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".js")) out.push(p);
  }
  return out;
}

let files;
try {
  files = walk(CHUNKS_DIR);
} catch {
  console.error(`[k3s] Répertoire introuvable : ${CHUNKS_DIR} — lancez d'abord \`next build\`.`);
  process.exit(2);
}

const hits = [];
for (const f of files) {
  const content = readFileSync(f, "utf8");
  for (const needle of NEEDLES) {
    if (content.includes(needle)) hits.push({ file: f, needle });
  }
}

if (hits.length > 0) {
  console.error(`[k3s] FUITE : ${hits.length} occurrence(s) privée(s) dans les chunks client :`);
  for (const h of hits) console.error(`  - ${h.file} contient "${h.needle}"`);
  process.exit(1);
}

console.log(`[k3s] OK — ${files.length} chunks client scannés, 0 fuite (aiguilles: ${NEEDLES.length}).`);
process.exit(0);
