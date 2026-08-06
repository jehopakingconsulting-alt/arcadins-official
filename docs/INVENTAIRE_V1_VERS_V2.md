# ARCADINS — INVENTAIRE COMPLET V1 → V2
**Objet :** recenser TOUT ce que la V1 possède, ce que la V2 a déjà, et ce qui manque encore.
**Sources vérifiées :** `C:\Users\PC\Desktop\arcadins-training` (V1 : 28 pages, 11 modules serveur, 75 endpoints, 9 tables SQLite) vs `arcadins-official` (V2 : 54 pages, 43 routes API).
**Date :** 2026-08-06 · **Méthode :** lecture directe des fichiers, aucun élément supposé.

---

## 1. PAGES — V1 (28) vs V2 (54)

| Page V1 | Équivalent V2 | État |
|---|---|---|
| `404` | `not-found` Next.js | ✅ |
| `about` | `/a-propos` | ✅ |
| `admin` | `/admin` (+ 9 sous-pages) | ✅ **supérieur** |
| `blog` | `/blog` | ✅ |
| `conditions` · `confidentialite` · `mentions-legales` | modals `FooterModals` | ✅ |
| `contact` | `/contact` | ✅ |
| `dashboard` | `/dashboard` | ✅ |
| `espace-membre` | `/espace` | ✅ |
| `faq` | `/faq` | ✅ |
| `forfaits` | `/inscription/forfaits` | ✅ |
| `formation` | `/formations` + `/formations/[slug]` | ✅ **supérieur** |
| `guide` | `/guide` | ✅ |
| `parrainage` | `/parrainage` | ✅ |
| `reinitialiser-mot-de-passe` | `/auth/reset-password` + `/auth/update-password` | ✅ |
| `tarifs` | `/tarifs` | ✅ |
| `tcf-canada` · `tef-canada` | `/tcf` · `/tef` | ✅ **supérieur** |
| `tuteur` | `/devenir-tuteur` | ✅ |
| **`essai-gratuit`** | ❌ | 🔴 **MANQUANT** |
| **`tests`** | ❌ | 🔴 **MANQUANT** |
| **`qualification`** | ❌ | 🔴 **MANQUANT** |
| **`test-final`** | `/learn-preview/exam` (dormant, flag OFF) | 🟠 **inactif** |
| **`mon-certificat`** | `/certificate/[id]` (partiel) | 🟠 **incomplet** |
| **`verifier-certificat`** | API `/api/verify/credentials/[id]` mais **aucune page publique** | 🟠 **sans interface** |
| **`tuteur-espace`** | `/admin/tuteurs` (côté admin seulement) | 🟠 **espace tuteur absent** |
| `acces` · `acces-plateforme` | `/inscription` (flux commerce) | ✅ remplacé |

## 2. FONCTIONNALITÉS SERVEUR — V1 (75 endpoints)

| Module V1 | Endpoints | Rôle | État V2 |
|---|---|---|---|
| `admin.js` | **38** | Back-office complet | 🟠 V2 a 9 pages admin mais **moins d'actions** |
| `tuteur.js` | 8 | Espace tuteur (modules, suivi) | 🔴 **absent** |
| `access.js` | 7 | Contrôle d'accès / expiration | 🟡 partiel (RLS + flags) |
| `plans.js` | 6 | **Forfaits + paiement en 2 temps** | 🟡 V2 regroupe tout en 1 paiement |
| `modules.js` | 5 | Contenu pédagogique + scoring | 🟠 dormant (runtime V3, flags OFF) |
| `certificate.js` | 3 | Génération + vérification PDF | 🟠 partiel |
| `finalTest.js` | 2 | Examen final | 🟠 dormant |
| `qualification.js` | 2 | **Test de qualification** | 🔴 **absent** |
| `trial.js` | 2 | **Test de positionnement / essai** | 🔴 **absent** |
| `affiliate.js` | 1 | Commissions parrainage | 🟡 partiel |
| `contact.js` | 1 | Formulaire contact | ✅ **fait** |

**Machine à états V1 (`middleware/stepGuard.js`)** — le cœur du parcours, à transposer :
```
prospect → trial_done → payment_confirmed → qualification_done → modules_done → final_passed
```
La V2 n'implémente aujourd'hui que `prospect` et `payment_confirmed`.

## 3. BASE DE DONNÉES — V1 (9 tables SQLite)

| Table V1 | Contenu | État V2 |
|---|---|---|
| `users` | Comptes + avancement (`trial_done`, `payment_confirmed`, `qualification_done`, `all_modules_done`, `final_test_passed`) | 🟡 `profiles` (sans les jalons de parcours) |
| `prospects` | Prospects / leads | 🟡 `contact_requests` |
| `modules` | Contenu pédagogique | 🟠 `academic/*` (dormant) |
| `tests` | Résultats des tests | 🔴 **absent** |
| `certificates` | Certificats délivrés | 🟡 `certificates` (prod) |
| `affiliate_commissions` | Commissions | 🟡 `referrals` |
| `tuteur_modules` | Modules des tuteurs | 🔴 **absent** |
| `admin_settings` | Réglages back-office | 🔴 **absent** |
| `admin_audit_log` | Journal admin | 🟠 `audit_log` **non appliquée en prod** |

> ⚠️ **Statut de la migration de données** : la Phase 3 (2026-08-01) a déjà importé **294 lignes** dans des tables `legacy_*` de la V2. Les données sont donc **présentes mais isolées** — elles ne sont pas encore fusionnées dans les tables vivantes. Le binaire des PDF de certificats reste à récupérer.

---

## 4. CE QU'IL MANQUE VRAIMENT — priorisé

### 🔴 Priorité 1 — parcours étudiant incomplet
1. **Test de positionnement / essai gratuit** (`trial.js`, `essai-gratuit`, `tests`) — c'est aussi l'aimant à prospects n°1 **et** la promesse de la carte « test de niveau » du Welcome Experience.
2. **Test de qualification** (`qualification.js`) — la porte entre le paiement et les modules.
3. **Jalons de parcours** (`stepGuard`) — sans eux, impossible de savoir où en est un étudiant.

### 🟠 Priorité 2 — après-vente et confiance
4. **Espace tuteur** (`tuteur.js`, `tuteur-espace`) — 8 endpoints, entièrement absent en V2.
5. **Page publique de vérification de certificat** — l'API existe, l'interface non.
6. **Certificat étudiant** (`mon-certificat`) — téléchargement/consultation.
7. **Back-office** : 38 endpoints V1 contre une couverture partielle en V2.

### 🟡 Priorité 3 — commerce et données
8. **Frais d'inscription séparés du cours** (spec propriétaire 2026-08-06 ; `plans.js` fait déjà ce flux en V1).
9. **Fusion des données `legacy_*`** vers les tables vivantes + récupération des PDF de certificats.
10. `admin_settings` (réglages back-office paramétrables).

---

## 5. CE QUE LA V2 FAIT MIEUX (à ne pas régresser)
Sécurité (CSP/HSTS/RLS/RBAC), i18n **7 langues**, commerce Stripe **self-service avec versements et BNPL**, e-mails transactionnels sur domaine vérifié (SPF/DKIM/DMARC), 768 tests automatisés, deux départements distincts (langue vs professionnel), Welcome Experience, tutorat par compétence × niveau, design system unifié.

---

## 6. MÉTHODE RECOMMANDÉE
**Transposer, ne pas réinventer.** Pour chaque manque : lire l'implémentation V1 (`server/routes/*.js`) → en extraire les règles métier → réécrire aux standards V2 (TypeScript, tests, RLS, i18n 7 langues). La V1 est la **référence fonctionnelle**, pas la source à copier.

*Inventaire établi par lecture directe des deux dépôts — aucun élément supposé.*
