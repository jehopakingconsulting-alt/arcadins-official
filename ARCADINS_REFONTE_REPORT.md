# ARCADINS — Rapport de refonte & plan de bascule

**Branche :** `audit-refonte` (aucune modification en production à ce jour)
**Cible de déploiement :** https://arcadins-official.vercel.app/ (déploiement Vercel automatique sur `main`)
**État :** build vert · `tsc` 0 erreur · `eslint` 0 erreur · 21 tests verts
**Objet :** synthèse des travaux, checklist de vérification, et procédure de mise en production.

> ⚠️ **Rien de ce document n'a été appliqué à la production.** Il décrit *comment* basculer,
> étape par étape, avec sauvegarde et points de contrôle. À valider et exécuter par le responsable.

---

## 1. Ce qui a été livré (branche `audit-refonte`)

| Étape | Objet | Commit | Prod ? |
|---|---|---|---|
| Audit | Cartographie + écart aux 20 phases (`ARCADINS_TECHNICAL_AUDIT.md`) | `5089c92` | — |
| Ét. 1 | Conformité juridique : suppression stats/badges/garanties fabriqués, disclaimers examens & immigration | `f491dd0` | non |
| Ét. 4 | Tarification : 1 500 CAD + 100 inscription, versements 3×500, checkout sécurisé (prix serveur) | `f9500b1` | non |
| Ét. 2 | Hygiène : ESLint 0, scripts `typecheck`/`test`, montée `next` (0 vuln) | `9317a58` | non |
| Ét. 3 | Architecture : `scoring.ts` central, éclatement `constants.ts` → `lib/data/*`, code mort supprimé | `79f8992` | non |
| Ét. 5 | `VerificationBadge` + page `/accreditations` (état vide honnête) | `90f5ac5` | non |
| Ét. 6 | Plateforme de tutorat TEF/TCF : 4 compétences × 4 niveaux = 16 modules, `/tutorat` + pages statiques | `63b0c81` | non |
| Ét. 7 | Tutorat élève vs candidature tuteur (flux séparés) : `/tutorat/demande`, `/devenir-tuteur`, 2 API | `706807b` | non ⚠️ *migration 0001 requise* |
| Ét. 9 | Rôles & admin : RBAC, espace `/admin` gardé, files séparées | `9c09e34` | non ⚠️ *migration 0002 requise* |
| Ét. 8 | Parrainage multigénérationnel (**flag OFF**) : config, logique pure testée, pages flag-gated | `8dbe968` | non ⚠️ *migration 0003 + validation juridique* |
| Ét. 10a/b/c | Système d'icônes SVG unifié (nav, accueil, formations) | `a444e99` `4118cf9` `fda64e4` | non |
| Ph. 19 | Couverture de tests élargie (21 tests) | `a051792` | non |

**Fonctions préservées et non cassées :** auth Supabase, paiement Stripe (checkout/webhooks/versements/cron),
LMS + 72 modules, certificats, tableau de bord étudiant, architecture i18n 7 langues.

---

## 2. Migrations de base de données à appliquer

Trois migrations **additives et non destructives** attendent dans `supabase/migrations/`. Elles n'ont
**jamais** été appliquées. Tant qu'elles ne le sont pas :

- les formulaires `/tutorat/demande` et `/devenir-tuteur` répondent proprement **503** (« service en cours de mise en place ») ;
- l'espace `/admin` fonctionne mais ses files affichent un avertissement « service non activé » ;
- le parrainage reste invisible (flag OFF de toute façon).

| Fichier | Crée | Dépendance |
|---|---|---|
| `0001_tutoring_and_tutor_applications.sql` | `tutoring_requests`, `tutor_applications` (+ RLS) | active les formulaires (Ét. 7) |
| `0002_roles_expansion.sql` | élargit `profiles.role` CHECK (+tutor/content_manager/finance_manager/support) | active les rôles admin (Ét. 9) |
| `0003_referrals.sql` | `referral_codes`, `referral_relationships`, `referral_commissions` (+ RLS) | **uniquement si** le parrainage est activé (Ét. 8) |

### 2.1 Procédure d'application (recommandée : SQL Editor Supabase)

> Principe : **une migration à la fois**, transactionnelle, avec sauvegarde préalable et vérification après.

**Pré-requis — sauvegarde vérifiée**
1. Supabase → Database → **Backups** : confirmer qu'une sauvegarde récente existe (ou en déclencher une).
2. Noter la date/heure du point de restauration.

**Pour chaque migration (0001, puis 0002, puis 0003 si applicable) :**
1. Ouvrir **SQL Editor**.
2. Coller le contenu **intégral** du fichier `.sql`.
3. L'encadrer d'une transaction pour permettre l'annulation en cas de doute :
   ```sql
   begin;
   -- … contenu de la migration …
   -- Vérifier le résultat des SELECT de contrôle ci-dessous AVANT de valider
   commit;   -- ou  rollback;  si un contrôle échoue
   ```
4. **Contrôles après 0001 :**
   ```sql
   select to_regclass('public.tutoring_requests'), to_regclass('public.tutor_applications');
   -- doivent renvoyer les noms de table (non null)
   ```
5. **Contrôles après 0002 :**
   ```sql
   -- La contrainte doit accepter les nouveaux rôles et n'invalider aucune ligne :
   select count(*) from public.profiles where role not in
     ('student','admin','tutor','content_manager','finance_manager','support');
   -- doit renvoyer 0
   ```
6. **Contrôles après 0003 :**
   ```sql
   select to_regclass('public.referral_codes'),
          to_regclass('public.referral_relationships'),
          to_regclass('public.referral_commissions');
   ```

**Rollback** : ces migrations étant additives, en cas de problème avant `commit`, un simple `rollback;`
suffit. Après `commit`, la suppression manuelle (`drop table … ;` / restauration de la contrainte)
reste possible mais **doit** être décidée hors urgence — d'où l'exécution en transaction ci-dessus.

### 2.2 Attribuer un rôle d'administration (après 0002)

Aucun compte n'a de rôle élevé par défaut. Pour désigner un administrateur :
```sql
update public.profiles set role = 'admin' where id = '<uuid_du_compte>';
-- rôles disponibles : admin | tutor | content_manager | finance_manager | support
```
Vérifier ensuite l'accès : se connecter, `/dashboard` doit afficher le bandeau « Espace d'administration »,
et `/admin` doit être accessible.

---

## 3. Checklist de vérification (staging, avant `main`)

**Public / conformité**
- [ ] Aucune mention « certifié », « ISO 9001 », « IRCC reconnu », « 96 % », garantie de résultat.
- [ ] Disclaimers visibles sur `/tef`, `/tutorat`, `/examens`, `/immigration`.
- [ ] `/accreditations` affiche l'état vide honnête.
- [ ] `/temoignages` ne contient pas de faux témoignages.
- [ ] Tarifs : formations à 1 500 + 100 ; « à venir » = paiement bloqué.

**Tutorat (après 0001)**
- [ ] `/tutorat` : sélecteur de niveau + 4 compétences ; les 16 pages détail s'ouvrent.
- [ ] `/tutorat/demande` : soumission → succès (ligne créée dans `tutoring_requests`).
- [ ] `/devenir-tuteur` : soumission → succès (ligne créée dans `tutor_applications`).

**Admin (après 0002 + rôle attribué)**
- [ ] `/admin` inaccessible sans session (redirection login) et sans rôle (redirection `/dashboard`).
- [ ] Les files « demandes de tutorat » et « candidatures tuteur » sont **séparées** et affichent les soumissions.
- [ ] Un rôle `support` ne voit pas la finance ; `finance_manager` ne voit pas les contacts.

**Paiement (ne pas régresser)**
- [ ] Parcours d'inscription : frais 100 → premier versement, en mode **test Stripe**.
- [ ] Webhook Stripe reçoit et traite l'événement.

**Technique**
- [ ] `npm run typecheck` = 0 · `npm run lint` = 0 · `npm test` = 21 verts · `npm run build` = vert.

---

## 4. Plan de bascule en production

1. **Staging d'abord** (Ph. 16) : déployer `audit-refonte` sur un environnement de préproduction Vercel,
   avec une base Supabase de test si possible. Passer la checklist §3.
2. **Migrations** : appliquer `0001` puis `0002` selon §2.1 (0003 seulement si activation parrainage).
3. **Rôle admin** : désigner au moins un compte (§2.2).
4. **Revue finale** (Ph. 18) avec le responsable.
5. **Merge `audit-refonte` → `main`** → déploiement Vercel automatique.
6. **Vérification post-déploiement** : rejouer la checklist §3 sur la prod (soumissions réelles de test,
   puis nettoyage des lignes de test).

---

## 5. Activation du parrainage (séparée, différée)

Le programme est **prêt mais désactivé** (`src/lib/data/referral-config.ts` → `REFERRAL_ENABLED = false`).
Pour l'activer, **dans cet ordre** :
1. **Validation juridique** du plan de rémunération (générations, taux, conformité selon les juridictions visées).
2. Appliquer la migration `0003`.
3. Passer `REFERRAL_ENABLED = true` (et ajuster `REFERRAL_PLAN` si les taux changent).
4. **Brancher le calcul sur la vente réelle** : `computeCommissions()` est fourni et testé mais **n'est
   pas encore appelé** depuis le webhook Stripe (choix délibéré pour ne pas toucher le chemin de paiement
   avant validation). Cette intégration reste à écrire au moment de l'activation.
5. Vérifier `/parrainage` (ne doit plus renvoyer 404) et `/admin/parrainage`.

---

## 6. Reste-à-faire connu (hors bascule)

- **Contenu multilingue (Ph. 14)** : le contenu enrichi des cours et le contenu du tutorat sont en
  **français** ; la surcouche de traduction dans les 6 autres langues reste à produire. Une langue ne
  doit pas être présentée comme complète tant que ses pages ne le sont pas.
- **Purge d'un partenariat inventé** dans les leçons `finance` / `tourisme` / `relation-aide`
  (« certificat reconnu par un réseau d'employeurs partenaires ») — FR + 6 traductions.
- **Icônes « contenu »** restantes (icônes de cours issues des données, chips de sceaux du footer,
  chips des slides d'accueil) : à traiter lors d'un passage contenu, pas dans le nettoyage UI.
- **Documents livrables** additionnels prévus par le cahier des charges (le cas échéant).

---

*Rapport généré à l'issue des étapes de refonte. Aucune action de production n'a été entreprise ;
toute application de migration ou déploiement requiert une sauvegarde vérifiée et l'autorisation du responsable.*
