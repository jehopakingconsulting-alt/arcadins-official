# ARCADINS — Checklist post-déploiement (après import)

À exécuter **après** l'import (pilote puis complet). Objectif : prouver que rien n'a été perdu
ni dégradé, et que les comptes migrés fonctionnent.

## A. Intégrité des données
- [ ] `node scripts/migration/validate-migration.mjs --check-target` → tous ✅.
- [ ] Comptages cible = attendus (comptes 12, prospects 42, tests 35, modules 168, certifs 7,
      paiements 10, réglages 5, journaux 14).
- [ ] Contrôles d'intégrité : `tests_orphelins = 0`, `certificats_dupliques = 0`,
      `mappings_casses = 0`.
- [ ] Écran admin « Validateur de migration » : toutes catégories ✅.

## B. Authentification
- [ ] Connexion réussie d'un compte **apprenant** migré (mot de passe d'origine).
- [ ] Connexion réussie du compte **admin** migré.
- [ ] Un compte sans bcrypt valide reçoit bien un lien de réinitialisation (Scénario C).
- [ ] Le trigger `link_legacy_tests_on_signup` rattache les tests si un prospect crée un compte.

## C. Contenus & fonctionnels
- [ ] Progression pédagogique visible pour un apprenant migré (modules).
- [ ] Certificats : PDF accessibles depuis le bucket `legacy-certificates`.
- [ ] Historique de paiement affiché (aucun nouveau prélèvement déclenché).
- [ ] Parrainage : relations/commissions correctement rattachées.

## D. Santé plateforme
- [ ] Écran admin « Platform Health » : score ≥ 85/100.
- [ ] DB 🟢, Authentification 🟢, Storage 🟢, E-mails 🟢/🟡 documenté, Paiements 🟢/🟡 documenté.

## E. Observabilité
- [ ] `scripts/migration/_data/report.json` archivé (hors dépôt, sans PII).
- [ ] `DATABASE_VALIDATION_REPORT.md` généré et joint au dossier de release.
- [ ] Aucune erreur inattendue dans les logs Supabase / applicatifs.

## F. Décision
- [ ] Écarts éventuels expliqués et acceptés, ou rollback déclenché (`ROLLBACK_PLAN.md`).
- [ ] Go/No-Go de bascule signé.

> Tant que cette checklist n'est pas intégralement validée, l'ancienne plateforme **reste la
> source de vérité** et demeure en ligne.
