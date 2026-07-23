# ARCADINS_TECHNICAL_AUDIT.md

**Projet :** ARCADINS Training Center
**Dépôt :** `arcadins-official` (Next.js 16 · React 19 · TypeScript · Supabase · Stripe · Tailwind v4)
**Déploiement :** https://arcadins-official.vercel.app/
**Date de l'audit :** 2026-07-23
**Auteur :** Revue technique et de conformité (Phase 1 — audit uniquement, aucune modification appliquée)

> ⚠️ **Cet audit ne modifie rien.** Il cartographie l'existant, mesure l'écart avec le cahier des charges des 20 phases, et propose un plan d'intervention à valider avant toute reconstruction.

---

## 1. État actuel du projet

### 1.1 Stack et santé technique

| Élément | État |
|---|---|
| **TypeScript** (`tsc --noEmit`) | ✅ **0 erreur** |
| **ESLint** (`eslint .`) | ⚠️ **7 erreurs + 1 avertissement** |
| **Build production** (`next build`) | ✅ passe (constaté lors des déploiements récents) |
| **`npm run typecheck`** | ❌ **script inexistant** (`package.json`) |
| **`npm run test`** | ❌ **script inexistant — aucun test, aucun framework de test** |
| **`npm audit`** | ❌ **4 vulnérabilités haute sévérité** (postcss, sharp via `next`) |

### 1.2 Ce qui EXISTE et fonctionne

- **Site public** : accueil, `/tef`, `/formations`, `/formations/[slug]`, `/examens`, `/immigration`, `/tarifs`, `/temoignages`, `/contact`.
- **Authentification** Supabase (email/mot de passe, confirmation, callback OAuth).
- **LMS réel** : 9 formations × 8 modules = **72 modules** de contenu pédagogique riche (récemment enrichis : 6-7 paragraphes + étude de cas + exercice + quiz par module), avec `LearnViewer`, `QuizView` (note de passage 65 %, gating de complétion).
- **Traductions LMS** : 7 langues, architecture de surcouche propre (`translations/`), repli FR automatique. 4 cours sur 9 traduits ; le **contenu enrichi n'est pas encore traduit** (retombe en FR dans les autres langues).
- **Paiement Stripe** : checkout (paiement complet + 3 versements), webhooks, cron d'expiration des inscriptions en attente.
- **Certificats** : génération après 100 % de complétion, page de vérification publique.
- **Tableau de bord étudiant** (`/dashboard`).
- **i18n UI** : 7 langues via `src/lib/i18n.ts` (dictionnaire centralisé, `useLang`).

### 1.3 Base de données (Supabase) — tables existantes

`profiles` · `programs` · `enrollments` · `contact_requests` · `lesson_progress` · `certificates`.
Rôles supportés : **`student` | `admin` uniquement** (`profiles.role`, contrainte CHECK).

### 1.4 ÉCART MAJEUR entre le cahier des charges et l'existant

Plusieurs phases demandent des fonctionnalités **qui n'existent pas du tout** dans le code. Ce ne sont pas des « corrections » mais des **constructions neuves** :

| Fonctionnalité demandée | État actuel |
|---|---|
| Plateforme de tutorat TEF/TCF à 4 compétences × 4 niveaux (Ph. 5) | ❌ **inexistante** — `/tef` est une page marketing statique |
| Parcours « Devenir tuteur » + candidatures + notifications séparées (Ph. 9) | ❌ **inexistant** — aucune table, aucune route, aucun événement |
| Programme de parrainage multigénérationnel + commissions (Ph. 10) | ❌ **inexistant** — aucune table `referral_*`, aucun code de parrainage |
| Tableau de bord administratif + permissions granulaires (Ph. 15) | ❌ **inexistant** — aucune route `/admin`, rôles limités à student/admin |
| Composant `VerificationBadge` + page `/accreditations` (Ph. 3) | ❌ **inexistant** |
| Système de notifications structuré (matrice, événements) (Ph. 9) | ⚠️ **partiel** — seulement des courriels transactionnels via Resend, pas de matrice ni d'événements typés |
| Config administrable des prix / statistiques / badges (Ph. 4, 7) | ❌ **inexistant** — tout est codé en dur dans `constants.ts` |

**Conséquence :** l'essentiel des phases 5, 9, 10 et 15 relève du **développement de nouvelles fonctionnalités**, pas du nettoyage. Le périmètre réel est très supérieur à une « révision ».

---

## 2. Problèmes CRITIQUES (à traiter en priorité absolue)

### C1 — Fausses certifications et accréditations (risque juridique élevé)
Le site affiche partout des mentions d'accréditation **non prouvées**, en violation directe des interdictions du cahier des charges et potentiellement de la Loi sur la protection du consommateur (Québec) et du Bureau de la concurrence (Canada) :

- `constants.ts:19-26` → tableau `CERTIFICATIONS` : **« IRCC Canada », « Gouvernement du Québec », « ISO 9001:2015 », « Emploi Québec »**.
- `Header.tsx:75,79` → bandeau **« 🏛️ Certifié Québec & Canada »** et **« ISO 9001 »**.
- `constants.ts:122-123` → TEF/TCF tagués **« IRCC Reconnu »** (laisse croire qu'ARCADINS est reconnu par IRCC).
- `constants.ts` PROGRAMS → **les 9 formations sont `certification: "Certifié"`** sans justificatif.
- `i18n.ts:88,102,103` → **« Partenaires IRCC »**, sceaux **« Emploi Québec »**, **« ISO 9001 »**.
- `layout.tsx` (métadonnées SEO) → titres/descriptions **« Formation certifiée », « 28 programmes certifiés reconnus au Québec »**.
- `immigration/layout.tsx:5` → **« Partenaire IRCC »**.
- `constants.ts:131` → **« nos agents certifiés »** pour le dossier IRCC (implique un conseil réglementé en immigration — infraction possible à la loi sur les consultants en immigration, CRIC/CICC).

### C2 — Statistiques et promesses fabriquées (risque juridique/publicité trompeuse)
- `constants.ts:11-17` STATS : **12 400 apprenants, 47 pays, 96 % Réussite TEF, 28 programmes** — aucune source, chiffres inventés (il n'existe que 9 formations réelles + 5 « à venir »).
- `tef/page.tsx:37`, `HeroSlider.tsx:84`, `tef/layout.tsx:5` → **« 96 % de réussite »**.
- `TESTIMONIALS` (`constants.ts:55-62`) → **6 témoignages inventés** avec noms, pays et résultats précis (« obtenu B2 », « poste de superviseur »).
- `constants.ts:100`, `i18n.ts:178` → **« Garantie score TEF/TCF »**, **« Garantie de résultat »** — promesse absolue interdite.

### C3 — Incohérence et contradiction des prix (3 sources divergentes)
Trois systèmes de prix coexistent et se contredisent :
1. `constants.ts` PROGRAMS → prix **3000–4000 CAD** par formation, toutes « Certifié ».
2. `constants.ts` PRICING → **abonnements mensuels 199 / 449 CAD** avec « 28 programmes », « dossier IRCC ».
3. `lib/pricing.ts` → **frais d'inscription 50 CAD** + versements calés sur un prix ~3000-4000.

Le cahier des charges (Ph. 7) impose : **formations non certifiées à 1 500 CAD + 100 CAD d'inscription = 1 600 CAD**, et **aucun prix** pour les certifiées non disponibles. → Refonte tarifaire complète nécessaire.

### C4 — Positionnement examens/immigration non conforme
- `/tef` et `constants.ts` laissent entendre qu'ARCADINS administre/est reconnu pour les examens officiels. Le disclaimer requis (« ARCADINS n'est pas l'organisme qui administre les examens… ») est **absent**.
- `/immigration` : **pas de clause de non-responsabilité** (« informations générales et éducatives, ne constituent pas un avis juridique… »). Menu intitulé « Immigration » au lieu de « Programmes d'immigration disponibles au Canada ».

### C5 — 4 vulnérabilités haute sévérité (dépendances)
`postcss` (XSS / lecture de fichier via sourceMappingURL) et `sharp`/libvips (CVE-2026-33327/33328/35590/35591), tirées par `next@16.2.9`. Correctif : montée à `next@16.2.11`.

---

## 3. Problèmes MAJEURS

- **M1 — 7 erreurs ESLint** : `set-state-in-effect` dans `LearnViewer.tsx:50` et `LangProvider.tsx:18`, `prefer-const` dans `middleware.ts:12`, et 4 autres. Le build passe mais le lint échoue → non conforme à l'exigence « le projet doit fonctionner sans erreurs avec npm run lint ».
- **M2 — Aucune infrastructure de test** : pas de script `test`, pas de Vitest/Jest/Playwright. La Phase 19 (tests obligatoires) et `ARCADINS_QA_REPORT.md` ne peuvent être satisfaits sans mise en place.
- **M3 — Aucune centralisation** : prix, stats, catégories, statuts, rôles, textes récurrents codés en dur dans les composants et `constants.ts`. Impossible d'administrer le contenu sans toucher au code (contraire à Ph. 2).
- **M4 — Bibliothèque d'icônes incohérente** : usage massif d'**emojis** (🏛️ 🎓 💰 📊…) mêlés, aucune bibliothèque d'icônes unifiée (contraire à Ph. 13).
- **M5 — Contradiction durée/contenu** : `PROGRAMS.modules` (dans `constants.ts`) duplique les titres de modules déjà définis dans `lib/lessons/*` → **double source de vérité** pour la structure des cours (risque de désynchronisation).
- **M6 — Rôles insuffisants** : `profiles.role` = student|admin seulement ; les rôles requis (tutor, affiliate, content_manager, finance_manager…) et les permissions granulaires n'existent pas (Ph. 15).
- **M7 — Traductions incomplètes** : contenu enrichi (paragraphes, études de cas, exercices) non traduit dans les 6 langues pour les 9 cours ; 5 cours sur 9 sans fichier de traduction. Une langue ne doit pas être présentée comme complète si ses pages ne le sont pas (Ph. 14).

---

## 4. Problèmes MINEURS

- **m1** — `index.legacy.html` à la racine : **code mort** (ancienne version HTML), à archiver/supprimer.
- **m2** — `middleware.ts` : `let supabaseResponse` jamais réassigné (→ `const`).
- **m3** — `next.config.ts` / warning déprécation « middleware → proxy » (Next 16) à traiter à terme.
- **m4** — `constants.ts` : commentaire `// ── À VENIR ──` mélange formations réelles et « comingSoon » dans le même tableau ; séparation à clarifier.
- **m5** — « Réponse garantie sous 24h » (`contact/layout.tsx:5`, `i18n.ts:205`) : promesse mineure, à assouplir (« nous nous efforçons de répondre sous 24h »).
- **m6** — Fins de ligne CRLF/LF incohérentes (avertissements Git à chaque commit).
- **m7** — `README.md` générique (create-next-app), non documenté pour le projet.

---

## 5. Risques juridiques et commerciaux (synthèse)

| Risque | Gravité | Origine |
|---|---|---|
| Fausse accréditation gouvernementale (IRCC, Québec, Emploi Québec) | 🔴 Critique | C1 |
| Faux ISO 9001 (norme certifiable, usurpation vérifiable) | 🔴 Critique | C1 |
| Conseil en immigration non autorisé (« agents certifiés », dossier IRCC) | 🔴 Critique | C1/C4 |
| Publicité trompeuse (statistiques inventées, 96 %) | 🔴 Critique | C2 |
| Faux témoignages | 🔴 Critique | C2 |
| Promesses absolues (« garantie de résultat/score ») | 🔴 Critique | C2 |
| Absence de disclaimers examens & immigration | 🟠 Majeur | C4 |
| Prix contradictoires / ambigus | 🟠 Majeur | C3 |

> **Recommandation immédiate :** neutraliser C1 et C2 **en priorité, avant toute autre chose**, car ils exposent l'entreprise dès maintenant, sur le site en production.

---

## 6. Fichiers à supprimer / archiver

| Fichier | Action | Raison |
|---|---|---|
| `index.legacy.html` | Supprimer (ou archiver hors dépôt) | Code mort, ancienne version HTML |
| `tsconfig.tsbuildinfo` | Ajouter au `.gitignore` | Artefact de build |
| Sceaux/tableaux `CERTIFICATIONS`, sceaux i18n `footer.seal2/seal3` | Supprimer le contenu non prouvé | Conformité |
| Aucun composant orphelin détecté | — | Tous les composants de `src/components` sont référencés |

> **Aucune suppression de composant ne sera faite sans confirmation d'usage** (Ph. interdictions).

---

## 7. Fichiers à restructurer

- `src/lib/constants.ts` → **éclater** en modules : `pricing.config.ts`, `stats.config.ts`, `programs.config.ts`, `badges.config.ts`, `immigration.config.ts`. Retirer les stats/certifs non prouvées ; brancher la structure des cours sur `lib/lessons` (source unique).
- `src/lib/pricing.ts` → aligner sur la règle 1 500 + 100 ; centraliser devise, taxes, échéancier, statut de disponibilité, `formatScore()`.
- `src/lib/i18n.ts` (63 KB) → conserver l'architecture mais nettoyer les clés non conformes (`footer.seal*`, `hero.badge` « Certifié », `svc.immigration.cat` « Partenaires IRCC »).
- `src/app/layout.tsx` + tous les `*/layout.tsx` → réécrire les métadonnées SEO sans mentions certifiées/chiffrées non prouvées.
- `src/app/tef/page.tsx` + `Header.tsx` (nav) → renommer en « Tutorat en TEF et TCF » et préparer l'accueil de la plateforme pédagogique.
- `src/components/layout/Header.tsx` → retirer le bandeau de badges ; ajouter les entrées de nav manquantes (Devenir tuteur, Parrainage) une fois les fonctionnalités bâties.

---

## 8. Fonctionnalités à CONSERVER (ne pas casser)

- Identité visuelle **bleu marine / blanc / or**, logo, positionnement premium, navigation générale.
- **Authentification Supabase** et comptes existants.
- **Paiement Stripe** (checkout, webhooks, versements, cron) — **ne pas casser**.
- **LMS + 72 modules enrichis** + `LearnViewer` + `QuizView` + note de passage 65 %.
- **Architecture de traduction** (surcouche, repli FR) — solide, à étendre et non à refondre.
- **Certificats** et page de vérification.
- **Tableau de bord étudiant**, `lesson_progress`, `enrollments`.

---

## 9. Plan d'intervention proposé (ordre recommandé)

> Conforme à la « méthode de travail obligatoire ». Chaque étape = livrable + build vert + rapport avant de continuer.

1. **Étape 0 — Sauvegarde** : créer une branche `audit-refonte` (le `main` en production reste intact). *(à valider)*
2. **Étape 1 — Neutraliser les risques juridiques (C1, C2, C4)** *(prioritaire, faible risque de régression)* : retirer/neutraliser fausses certifs, stats, faux témoignages, garanties ; ajouter disclaimers examens & immigration ; renommer le menu Immigration.
3. **Étape 2 — Sécurité & qualité** : corriger les 7 erreurs ESLint ; ajouter scripts `typecheck` et `test` ; monter `next` pour purger les 4 CVE.
4. **Étape 3 — Centralisation & nettoyage** : éclater `constants.ts` ; source unique pour les cours ; `formatScore()` central ; retirer `index.legacy.html`.
5. **Étape 4 — Tarification (Ph. 7)** : règle 1 500 + 100 ; « Prix à venir » pour les certifiées ; désactiver paiement des indisponibles.
6. **Étape 5 — Badges & accréditations (Ph. 3)** : composant `VerificationBadge`, page `/accreditations` (vide tant qu'aucune preuve).
7. **Étape 6 — Plateforme tutorat TEF/TCF (Ph. 5)** *(construction neuve)*.
8. **Étape 7 — Tutorat étudiant vs candidature tuteur (Ph. 9)** *(construction neuve, notifications séparées)*.
9. **Étape 8 — Parrainage multigénérationnel (Ph. 10)** *(construction neuve — nécessite validation juridique du plan de rémunération avant activation)*.
10. **Étape 9 — Rôles & admin (Ph. 15)** *(construction neuve)*.
11. **Étape 10 — UX/design, multilinguisme, tests, staging** (Ph. 13, 14, 19) ; puis rencontre finale (Ph. 18).

---

## 10. Risques de régression à surveiller

| Zone | Risque | Précaution |
|---|---|---|
| Paiement Stripe | Casser checkout/webhook lors du changement de prix | Tester en mode test Stripe ; ne pas toucher à la logique d'idempotence |
| Comptes utilisateurs | Migration de schéma (`role`, nouvelles tables) | Migrations additives uniquement, jamais destructives ; sauvegarde avant |
| Traductions | Nettoyer les clés i18n peut casser des composants qui les référencent | Vérifier chaque clé retirée par `grep` avant suppression |
| LMS | La structure des cours vit à 2 endroits (`constants` + `lessons`) | Unifier prudemment, tester le rendu des 9 cours |
| SEO | Réécrire les métadonnées peut affecter le référencement existant | Conserver les URLs ; ajuster uniquement les textes |
| Env production | Le `main` est déployé automatiquement sur Vercel | Travailler sur branche `audit-refonte` ; ne rien déployer en prod sans validation |

---

## Décisions requises avant de continuer

Conformément à la consigne (« me présenter le rapport avant de procéder aux changements structurels majeurs »), je sollicite tes décisions sur :

1. **Priorité immédiate** — Dois-je commencer par **neutraliser les risques juridiques (Étape 1)** dès maintenant, puisqu'ils exposent le site **en production** ? *(recommandé)*
2. **Branche de travail** — J'ouvre une branche `audit-refonte` et **rien ne part en production** sans ta validation finale (Ph. 18). Confirmes-tu ?
3. **Périmètre des constructions neuves** — Tutorat, parrainage, admin sont des **développements complets** (plusieurs sessions chacun). Les traite-t-on **après** le nettoyage/conformité, dans l'ordre du plan ?
4. **Contenus factuels** — Peux-tu fournir les **vraies données** (statistiques réelles, accréditations réellement obtenues avec justificatifs, tarifs définitifs) ? À défaut, j'appliquerai des formulations qualitatives sobres et laisserai les badges/prix vides.
