# ARCADINS — Disaster Recovery

> Document de référence : **[`docs/ops/DISASTER_RECOVERY.md`](docs/ops/DISASTER_RECOVERY.md)**
> (RPO/RTO, scénarios, procédure de restauration) + **[`docs/ops/BACKUP.md`](docs/ops/BACKUP.md)**.

Résumé : **RPO ≤ minutes** (PITR) / **≤ 24 h** (backup quotidien) · **RTO cible ≤ 2 h**.
Restauration : PITR Supabase au point pré-incident, ou `pg_restore` du dump chiffré (`backup.yml`).
Rollback applicatif/données : `ROLLBACK.md`. **Exercice de restauration = REQUIRES PRODUCTION
VALIDATION** (à planifier trimestriellement).
