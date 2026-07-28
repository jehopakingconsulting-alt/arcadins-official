# ARCADINS — SLA / SLO (cibles de service)

> Objectifs internes de niveau de service. À ajuster selon les engagements clients réels.

## Disponibilité
- **SLO uptime** : 99,5 % / mois (endpoints publics + auth).
- Fenêtres de maintenance annoncées ; l'import de migration est **additif** (temps d'arrêt ≈ 0).

## Performance (SLO)
- API : p95 < 800 ms (hors opérations d'import).
- Pages clés (accueil, formations) : LCP < 2,5 s sur mobile.

## Fiabilité des données
- **RPO** ≤ 24 h (≤ minutes avec PITR) · **RTO** ≤ 2 h (voir `DISASTER_RECOVERY.md`).
- Intégrité migration : `tests_orphelins = 0`, `certificats_dupliques = 0`, `mappings_casses = 0`.

## Sécurité
- Secrets jamais committés ; rotation sur incident.
- En-têtes de sécurité + CSP actifs ; RLS sur les tables sensibles ; RPC au moindre privilège.

## Support & incidents
- Prise en charge : SEV-1 immédiate, SEV-2 < 1 h, SEV-3 < 1 j (voir `INCIDENT_RESPONSE.md`).

## Revue
- SLO revus trimestriellement ; exercice de restauration DR au moins trimestriel.
