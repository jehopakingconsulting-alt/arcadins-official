# ARCADINS — Checklist de production (avant écriture)

À exécuter **dans l'ordre**. Ne cocher `[x]` qu'après vérification réelle. Aucune écriture en
production tant que toutes les cases « Pré-requis » et « Staging » ne sont pas validées.

## A. Pré-requis
- [ ] Sauvegarde de la base source vérifiée (`BACKUP_REPORT.md`, sha256 confirmé).
- [ ] PITR activé sur le projet Supabase de production (horodatage de référence noté).
- [ ] `npm test` vert · `npm run lint` sans erreur · `npm run build` OK.
- [ ] Dry-run récent réconcilie à 100 % (`ARCADINS_MIGRATION_RECONCILIATION_REPORT.md`).
- [ ] Variables d'environnement présentes : `NEXT_PUBLIC_SUPABASE_URL`,
      `SUPABASE_SERVICE_ROLE_KEY` (jamais commit).

## B. Staging (obligatoire avant prod)
- [ ] Appliquer `0005_legacy_import.sql` sur **staging**.
- [ ] Appliquer `0006_migration_rpcs.sql` sur **staging**.
- [ ] Import **pilote** d'un seul utilisateur (voir procédure de livraison).
- [ ] **Test de connexion bcrypt réel** du compte pilote (Scénario B validé).
- [ ] `validate-migration.mjs --check-target` : comptages + intégrité OK.
- [ ] Écran admin « Validateur de migration » : toutes catégories ✅.
- [ ] Écran admin « Platform Health » : score ≥ 85/100.
- [ ] Rollback testé sur staging (`rollback.mjs --live --confirm --purge-auth`) puis re-validé à 0.

## C. Production — application du schéma
- [ ] Fenêtre de maintenance annoncée (l'ancienne plateforme reste en ligne).
- [ ] Backup/PITR de production juste avant.
- [ ] Appliquer `0005` puis `0006` via le SQL Editor Supabase (transactionnel).

## D. Production — import
- [ ] Import pilote d'**un** utilisateur en production, puis test de connexion.
- [ ] `STOP` + validation humaine du pilote.
- [ ] Import complet entité par entité :
      `users → prospects → payments → progress → results → certificates → referrals → settings → audit`.
- [ ] Après **chaque** entité : relire le rapport, vérifier 0 rejet inattendu.

## E. Décision de bascule
- [ ] `POST_DEPLOYMENT_CHECKLIST.md` intégralement validée.
- [ ] Copie des PDF de certificats vers le bucket `legacy-certificates`.
- [ ] Go/No-Go signé avant de rediriger le trafic depuis l'ancienne plateforme.

> Règle d'or : à chaque étape critique — afficher [modifications, résultats, risques, options]
> puis **attendre la validation** avant de poursuivre.
