# ARCADINS — PRODUCTION_RELEASE_CHECKLIST

**Checklist OBLIGATOIRE avant chaque migration/déploiement en production.**
Réutilisable à toute échelle (voir `PRODUCTION_IMPORT_PLAN.md` / PRODUCTION MASTER PLAYBOOK).
À dupliquer et remplir pour **chaque** exécution ; aucune écriture prod sans cette checklist signée.

> Convention : `□` = à vérifier · cocher `[x]` seulement après vérification **réelle**.
> Toute case non cochable en Section 1–3 → **NO GO**.

---

## SECTION 1 — Préparation

- [ ] **Backup vérifié** (sauvegarde complète prod récente + restaurabilité confirmée) — horodatage : `__________`
- [ ] **PITR vérifié** (point de restauration pré-migration disponible) — point : `__________`
- [ ] **Variables d'environnement validées** (URL projet = **production** attendue, pas staging)
- [ ] **Secrets vérifiés** (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `STRIPE_*`, `CRON_SECRET` présents ; jamais committés ; `.env*` ignoré sauf `.env.example`)
- [ ] **Monitoring opérationnel** (logs Supabase/app accessibles, alertes actives)
- [ ] **Logs activés** (capture `logs/prod-import/LOT<i>-<horodatage>.log` + `report.json`/`errors.log`)
- [ ] **Accès administrateur confirmé** (compte admin prod fonctionnel pour Migration Validator / Platform Health)

## SECTION 2 — Validation technique

- [ ] **Build** — `npm run build` : succès
- [ ] **Lint** — `npm run lint` : 0 erreur
- [ ] **Tests** — `npm test` : 100 % verts (`__ / __`)
- [ ] **Migration dry-run** — `run-dryrun.mjs` : réconciliation, `rejected = 0`
- [ ] **Rollback testé** — `rollback.mjs` (compte/lot/global) validé sur staging
- [ ] **Checksum validé** — source (sha256 `__________`), `PRAGMA integrity_check = ok`, `foreign_key_check = 0`
- [ ] **Audit SQL statique** — 0 forward-ref, 0 INSERT à parité incorrecte
- [ ] **Migrations à appliquer confirmées** — prod : **`0005` + `0006` uniquement** (0000–0004 déjà présentes)

## SECTION 3 — Validation métier (par lot et cumul)

- [ ] **Comptes** — cumul cible = attendu (delta = taille du lot)
- [ ] **Profils** — créés/rattachés, rôle correct (pas d'écrasement sur collision e-mail)
- [ ] **Paiements** — historiques importés, **aucun prélèvement déclenché**
- [ ] **Progression** — modules par compte conformes
- [ ] **Tests** — comptes + prospects (Option A), `tests_orphelins = 0`
- [ ] **Certificats** — numéros uniques, `certificats_dupliques = 0`, PDF → Storage (LOT FINAL)
- [ ] **Références** — prospects, réglages, journaux, parrainage (referrer/referee résolus)
- [ ] **Intégrité globale** — `mappings_casses = 0`

## SECTION 4 — GO / NO GO

| Champ | Valeur |
|---|---|
| Responsable technique | `______________________` |
| Responsable métier | `______________________` |
| Date | `____________` |
| Heure | `________` |
| Version (app) | `____________` |
| Commit | `____________` |
| Tag Git | `____________` |
| Rollback disponible | ☐ Oui ☐ Non (procédure : compte / lot / global / PITR) |
| Durée estimée | `____________` |
| Temps d'arrêt estimé | `≈ 0 (import additif)` / `____________` |
| **Décision finale** | ☐ **GO**  ☐ **NO GO** |
| Motif si NO GO | `______________________________________________` |

> Règle : décision **explicite** requise **avant chaque lot**. Aucune vague ne s'enchaîne
> automatiquement. NO GO → STOP + rollback + rapport d'erreur.

## SECTION 5 — Validation post-déploiement

- [ ] **Comptes créés** — nombre = attendu, `auth.users` cohérent
- [ ] **Paiements** — présents, aucun mouvement financier réel
- [ ] **Modules** — progression visible côté application
- [ ] **Tests** — comptes + prospects présents, intégrité à 0
- [ ] **Certificats** — métadonnées + PDF accessibles (Storage)
- [ ] **Connexion** — **≥ 1 login bcrypt réel réussi** (Scénario B ; sinon repli Scénario C)
- [ ] **Monitoring** — pas d'anomalie (latence, erreurs, files)
- [ ] **Aucune erreur critique** — logs propres (`rejected = 0`, `Erreurs : 0`)
- [ ] **Rapport signé** — `LOT<i>_IMPORT_REPORT.md` / `POST_DEPLOYMENT_CHECKLIST.md` complétés et validés

---

### Signatures de clôture
| | Nom | Signature | Date |
|---|---|---|---|
| Responsable technique | `__________` | `__________` | `________` |
| Responsable métier | `__________` | `__________` | `________` |

> **Aucune écriture production sans cette checklist remplie, GO explicite, et autorisation lot par lot.**
> Documents liés : `PRODUCTION_IMPORT_PLAN.md`, `PRODUCTION_CHECKLIST.md`, `ROLLBACK_PLAN.md`,
> `POST_DEPLOYMENT_CHECKLIST.md`, `STAGING_PILOT_REPORT.md`.
