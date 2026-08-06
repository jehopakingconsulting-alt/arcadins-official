# ARCADINS — SMTP Acceptance Report
**Date :** 2026-08-06 · **Périmètre :** infrastructure e-mail transactionnelle (frontend gelé)
**Fournisseur :** Resend (API HTTP) · **Environnement :** Production (`arcadins-official.vercel.app`)

> **Règle appliquée :** aucun « envoyé / reçu / ouvert » n'est déclaré sans preuve réelle observée.
> Ce qui n'a pas été testé de bout en bout est marqué **NON VALIDÉ**, jamais supposé réussi.

---

## 1. RÉSULTAT DU TEST DE BOUT EN BOUT — ✅ **RÉUSSI**

**Test exécuté le 2026-08-05 à 23h57** (heure locale) — repère `OK-2357`.

| Critère de la mission | Statut | Preuve observée |
|---|---|---|
| **Envoyé** | ✅ | Réponse Resend `{"status":"sent","id":"e0d08e29-8c0b-4e9d-9a06-58cd57e2fdaa","attempts":1}` |
| **Reçu** | ✅ | **3 e-mails** dans Gmail à 23h57, onglet **Principale** (pas en spam) |
| **Ouvert** | ✅ | E-mail « Nous avons bien reçu votre message » ouvert et affiché |
| **Liens vérifiés** | ✅ | `/formations` → **200** · `/admin` → **307** (redirection login, correct) · `/` → **200** |
| **Rendu HTML** | ✅ | Bandeau navy « ARCADINS TRAINING CENTER », titre serif, **bouton doré**, pied de page (adresse Ottawa + lien) |
| **Fallback texte** | ✅ | Envoyé conjointement (`text` + `html` dans chaque message) |
| **Identité expéditeur** | ✅ | Affichée « ARCADINS Training Center » |

### Les 3 e-mails reçus
| # | Sujet | Origine | Prouve |
|---|---|---|---|
| 1 | **Nous avons bien reçu votre message — ARCADINS** | `/api/contact` | Accusé visiteur + **exécution différée `after()` fonctionnelle sur Vercel** |
| 2 | **[Contact] Marie OK-2357** | `/api/contact` | Notification interne (routée via `CONTACT_NOTIFY_TO`) |
| 3 | **Diagnostic ARCADINS — test d'envoi** | `/api/diag/email` | Envoi synchrone direct |

---

## 2. CAUSE RACINE IDENTIFIÉE ET RÉSOLUE

Les premiers tests renvoyaient `HTTP 200` (insertion base OK) **mais aucun e-mail n'apparaissait**. L'endpoint de diagnostic a livré l'erreur brute :

```
HTTP 403: The arcadins-training.com domain is not verified.
Please, add and verify your domain on https://resend.com/domains
```

**Diagnostic :** Resend **rejetait** chaque requête (403) car le domaine expéditeur n'était pas vérifié → **aucun enregistrement n'était créé**, d'où l'absence totale de trace dans le dashboard. Résolu en basculant temporairement sur l'expéditeur de test vérifié `onboarding@resend.dev`.

**Fausses pistes écartées en cours de route (par preuve, pas par supposition) :** `SUPABASE_SERVICE_ROLE_KEY` manquante (elle était présente) · `EMAIL_PROVIDER` incorrect (il valait bien `resend` après correction) · `after()` non fonctionnel (prouvé fonctionnel par les e-mails 1 et 2).

---

## 3. COMPOSANTS VALIDÉS

| Exigence | Statut | Preuve |
|---|---|---|
| E-mails du formulaire de **contact** (accusé + admin) | ✅ **VALIDÉ E2E** | reçus, ouverts, liens OK |
| **Templates HTML responsives** | ✅ | rendu Gmail conforme au design |
| **Fallback texte brut** | ✅ | `text` systématiquement joint |
| **Retry** avec back-off | ✅ **prouvé en conditions réelles** | `attempts: 3` observé lors des 403 |
| **Rate limiting** | ✅ | 5/min/IP sur `/api/contact` (+ 8/min sur le diagnostic) |
| **Error logging** | ✅ | `console.error` + erreur brute renvoyée par le diagnostic |
| **Envoi non-bloquant** (`after()`) | ✅ **prouvé** | réponse < 1,3 s, e-mails délivrés ensuite |
| **Identité expéditeur (nom affiché)** | ✅ | « ARCADINS Training Center » |
| Sécurité du diagnostic | ✅ | aucun secret exposé, destinataire verrouillé, rate-limité |
| Gates qualité | ✅ | typecheck · lint · **751 tests** · build |

---

## 4. CE QUI RESTE — ⏳ **NON VALIDÉ**

| Exigence | Statut | Action requise (propriétaire) |
|---|---|---|
| **Identité expéditeur de PRODUCTION** | ⏳ | `onboarding@resend.dev` est **temporaire** : il n'envoie **qu'à l'adresse du compte** → **un vrai visiteur ne recevrait rien**. Vérifier `arcadins-training.com` dans Resend → Domains, puis remettre `EMAIL_FROM = ARCADINS Training Center <no-reply@arcadins-training.com>` |
| **SPF / DKIM / DMARC** | ⏳ | Enregistrements DNS à poser chez le registraire (fournis par Resend lors de la vérification du domaine) |
| **Confirmation d'inscription** | ⏳ | Envoyée par **Supabase Auth**, pas par ce code → configurer *Custom SMTP* + activer « Confirm email » dans le dashboard Supabase |
| **Réinitialisation de mot de passe** | ⏳ | Idem Supabase Auth + *Redirect URL* `…/auth/update-password` |
| **Vérification d'e-mail** | ⏳ | Idem (option « Confirm email ») |
| **Newsletter** | ⚪ **N/A** | Capacité d'envoi présente, mais **aucun point de capture** (pas de formulaire ; frontend gelé) → pas de déclencheur |
| **Bounce handling** | ⚪ Non implémenté | Nécessiterait un webhook Resend (Phase 2 si requis) |

---

## VERDICT

# ⏳ SMTP — CANAL APPLICATIF VALIDÉ · **PAS ENCORE PRODUCTION READY**

**Ce qui est acquis (prouvé) :** toute la **couche applicative d'e-mail est validée de bout en bout** — templates HTML+texte, envoi, réception, ouverture, liens, retry, rate-limit, logging, exécution différée. Le canal **Contact** fonctionne réellement.

**Ce qui bloque le statut « Production Ready » :**
1. **L'expéditeur est un domaine de test** → les e-mails **n'atteindraient aucun vrai client**. C'est le blocage n°1.
2. **SPF/DKIM/DMARC** non configurés (dépend du point 1).
3. **Les e-mails d'authentification** (confirmation, réinitialisation, vérification) passent par **Supabase Auth** et ne sont **pas encore configurés ni testés**.

### Chemin pour atteindre 🟢 (estimation : 30-45 min + propagation DNS)
1. Resend → **Domains** → ajouter `arcadins-training.com` → poser les **DNS (SPF + DKIM)** → attendre « Verified ».
2. Vercel → `EMAIL_FROM` = `ARCADINS Training Center <no-reply@arcadins-training.com>` → redéployer.
3. Relancer le test de contact → vérifier réception + en-têtes `dkim=pass spf=pass dmarc=pass`.
4. Supabase → **Auth → SMTP Settings** (Resend) + **Confirm email** + *Redirect URL* `/auth/update-password` + templates.
5. Tester **inscription** et **réinitialisation** sur boîte réelle.
6. **Supprimer l'endpoint temporaire** `/api/diag/email`.

> Une fois ces étapes prouvées, le verdict passe à **🟢 SMTP PRODUCTION READY**, et la phase **Stripe** peut démarrer (ses secrets sont déjà en place : `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`).

---

### Reproductibilité
`GET /api/diag/email` (config, sans secret) · `GET /api/diag/email?send=1` (envoi synchrone + erreur brute) · `POST /api/contact` (chaîne complète) · `npm run email:test -- --to=…` (script owner). Runbook complet : `docs/SMTP_SETUP.md`.

*Émis pour JeHoPa KING Consulting — validation SMTP, ARCADINS Training Center V2.*
