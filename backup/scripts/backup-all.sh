#!/usr/bin/env bash
# ============================================================================
# ARCADINS — FULL DATABASE BACKUP (schema + data + per-table CSV/JSON)
# Run in Git Bash / WSL / Linux / macOS. Requires: postgresql-client (pg_dump, psql).
#
# THIS SCRIPT IS THE AUTHORITATIVE BACKUP. The repo migrations reproduce the parts
# they define, but production also contains tables created directly (enrollments,
# programs, certificates, lesson_progress, ...). Only pg_dump captures the true state.
#
# USAGE:
#   1) Get the connection string: Supabase → Project Settings → Database → Connection string
#      (use the "URI" / session pooler string). It looks like:
#      postgresql://postgres.<ref>:<password>@<host>:5432/postgres
#   2) export DATABASE_URL="postgresql://...."
#   3) bash backup/scripts/backup-all.sh
#
# OUTPUT: backup/exports/<UTC-timestamp>/  (git-ignored; store securely offline)
# NOTE: NEVER commit the exports (they contain real data + are large). Keep offline copies.
# ============================================================================
set -euo pipefail

: "${DATABASE_URL:?Set DATABASE_URL first (see header).}"

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUT="backup/exports/${STAMP}"
mkdir -p "${OUT}/tables_csv" "${OUT}/tables_json"

echo "==> ARCADINS backup ${STAMP}"
echo "==> Output: ${OUT}"

# ---- 1) FULL logical dump (schema + data + extensions + RLS + functions + triggers) ----
echo "==> pg_dump: full (schema+data)"
pg_dump "${DATABASE_URL}" --no-owner --no-privileges --format=plain --file="${OUT}/full_dump.sql"

echo "==> pg_dump: schema-only"
pg_dump "${DATABASE_URL}" --no-owner --no-privileges --schema-only --file="${OUT}/schema_only.sql"

echo "==> pg_dump: data-only (INSERTs)"
pg_dump "${DATABASE_URL}" --no-owner --no-privileges --data-only --column-inserts --file="${OUT}/data_only.sql"

# Custom-format dump (compressed, best for pg_restore)
echo "==> pg_dump: custom format (for pg_restore)"
pg_dump "${DATABASE_URL}" --no-owner --no-privileges --format=custom --file="${OUT}/full_dump.dump"

# ---- 2) Per-table CSV + JSON for the public schema ----
echo "==> Per-table CSV + JSON export"
TABLES=$(psql "${DATABASE_URL}" -Atc \
  "select tablename from pg_tables where schemaname='public' order by tablename;")

for t in ${TABLES}; do
  echo "   - ${t}"
  # CSV (with header)
  psql "${DATABASE_URL}" -c "\copy (select * from public.\"${t}\") to '${OUT}/tables_csv/${t}.csv' with csv header" || echo "     (skip csv ${t})"
  # JSON (array of rows)
  psql "${DATABASE_URL}" -Atc \
    "select coalesce(json_agg(row_to_json(x)), '[]'::json) from (select * from public.\"${t}\") x;" \
    > "${OUT}/tables_json/${t}.json" || echo "     (skip json ${t})"
done

# ---- 3) Inventory files ----
echo "==> Writing inventory"
psql "${DATABASE_URL}" -Atc \
  "select tablename from pg_tables where schemaname='public' order by 1;" > "${OUT}/TABLES.txt"
psql "${DATABASE_URL}" -Atc \
  "select p.proname from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' order by 1;" > "${OUT}/FUNCTIONS.txt" || true
psql "${DATABASE_URL}" -Atc \
  "select tablename||': '||policyname from pg_policies where schemaname='public' order by 1;" > "${OUT}/RLS_POLICIES.txt" || true
psql "${DATABASE_URL}" -Atc \
  "select extname from pg_extension order by 1;" > "${OUT}/EXTENSIONS.txt" || true

echo "==> DONE. Backup at: ${OUT}"
echo "==> Store this folder OFFLINE (encrypted). Do NOT commit it."
