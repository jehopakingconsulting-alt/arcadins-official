# ARCADINS — SMTP Acceptance Report
**Date :** 2026-08-06 · **Fournisseur :** Resend · **Environnement :** Production
**Expéditeur :** `ARCADINS Training Center <no-reply@arcadins-training.com>` (domaine **vérifié**)

> Aucun « envoyé / reçu / ouvert » n'est déclaré sans preuve réelle observée.
> Ce qui n'a pas été testé de bout en bout est marqué **NON VALIDÉ**, jamais supposé réussi.

---

## 1. TEST DE BOUT EN BOUT AVEC L'EXPÉDITEUR DE PRODUCTION — ✅ **RÉUSSI**

**Test du 2026-08-06 à 00h49** — repère `PROD-0049`.

| Critère de la mission | Statut | Preuve observée |
|---|---|---|
| **Envoyé** | ✅ | `{"status":"sent","id":"2b853d0e-14f5-475d-9f22-620f3803f2de","attempts":1}` |
| **Reçu** | ✅ | **3 e-mails** dans Gmail à 00h49, onglet **Principale** (pas en spam) |
| **Ouvert** | ✅ | Les 2 e-mails du formulaire ouverts et affichés correctement |
| **Liens vérifiés** | ✅ | `/formations` **200** · `/admin` **307** (login) · `/` **200** |
| **Expéditeur de production** | ✅ | `ARCADINS Training Center <no-reply@arcadins-training.com>` |
| **Rendu HTML responsive** | ✅ | Bandeau navy, titre serif, **bouton doré**, tableau récap, pied de page |
| **Fallback texte** | ✅ | `text` joint à chaque message |
| **Reply-To** | ✅ | `EMAIL_REPLY_TO` actif ; l'e-mail du visiteur est cliquable dans la notif admin |

### Les 3 e-mails reçus
| # | Sujet | Origine | Prouve |
|---|---|---|---|
| 1 | Nous avons bien reçu votre message — ARCADINS | `/api/contact` | Accusé visiteur + **`after()` fonctionnel sur Vercel** |
| 2 | [Contact] Sophie PROD-0049 | `/api/contact` | Notification interne + récap structuré |
| 3 | Diagnostic ARCADINS — test d'envoi | diagnostic | Envoi synchrone |

---

## 2. AUTHENTIFICATION DU DOMAINE — ✅ **CONFORME**

Domaine `arcadins-training.com` **vérifié chez Resend** le 2026-08-06 à 00h39 (ajouté 00h25 → DNS vérifié 00h37 → **Verified** 00h39).

**Enregistrements DNS vérifiés par interrogation directe des serveurs publics (8.8.8.8) :**

| Type | Nom | Valeur observée | Statut |
|---|---|---|---|
| TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3…I/qAu/wIDAQAB` (**clé complète**) | ✅ **DKIM** |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | ✅ **SPF** |
| MX | `send` | `preference = 10, feedback-smtp.us-east-1.amazonses.com` | ✅ bounces |
| TXT | `_dmarc` | `v=DMARC1; p=none` | ✅ **DMARC** (mode observation) |

**Non-régression confirmée :** SPF racine (`include:_spf.mail.hostinger.com`) et MX racine (`mx1/mx2.hostinger.com`) **intacts** → la messagerie Hostinger existante n'est pas affectée. Aucun conflit SPF (Resend isolé sur le sous-domaine `send`).

*Confirmation complémentaire recommandée : ouvrir un e-mail reçu → « Afficher l'original » → vérifier `dkim=pass spf=pass dmarc=pass`.*

---

## 3. COMPOSANTS VALIDÉS

| Exigence de la mission | Statut |
|---|---|
| **Contact form emails** | ✅ **VALIDÉ E2E** (accusé + notification admin) |
| **HTML responsive templates** | ✅ |
| **Plain-text fallback** | ✅ |
| **Production sender identity** | ✅ domaine vérifié |
| **SPF / DKIM / DMARC compatibility** | ✅ les 3 présents et vérifiés |
| **Rate limiting** | ✅ 5/min/IP sur `/api/contact` |
| **Retry handling** | ✅ **prouvé en réel** (`attempts: 3` lors des rejets 403) |
| **Error logging** | ✅ `console.error` + erreurs brutes remontées |
| **E2E testing (real mailbox)** | ✅ Gmail réel |
| Envoi non-bloquant (`after()`) | ✅ prouvé |
| Gates qualité | ✅ typecheck · lint · **751 tests** · build |
| Nettoyage | ✅ endpoint de diagnostic temporaire **supprimé** |

---

## 4. CE QUI RESTE — ⏳ **NON VALIDÉ**

| Exigence | Statut | Action requise |
|---|---|---|
| **Registration confirmation emails** | ⏳ | Envoyés par **Supabase Auth** → dashboard : *Custom SMTP* + activer « Confirm email » |
| **Password reset emails** | ⏳ | Idem + *Redirect URL* `…/auth/update-password` |
| **Email verification** | ⏳ | Idem (option « Confirm email ») |
| **Newsletter emails** | ⚪ **N/A** | Capacité présente mais **aucun point de capture** (pas de formulaire ; frontend gelé) |
| **Bounce handling** | ⚪ Non implémenté | Nécessiterait un webhook Resend (Phase 2 si requis) |

> ⚠️ Ces 3 flux **ne passent pas par ce code** : ils sont émis par Supabase Auth. Il faut configurer le **SMTP personnalisé de Supabase** (host `smtp.resend.com`, port `587`, user `resend`, pass = clé API) et personnaliser les templates. Rien à développer.

---

## VERDICT

# 🟢 SMTP APPLICATIF — **PRODUCTION READY**
# ⏳ E-MAILS D'AUTHENTIFICATION — **RESTENT À CONFIGURER (Supabase)**

**Acquis, prouvé, en production :** le canal e-mail applicatif est **pleinement opérationnel** avec un **expéditeur professionnel sur domaine vérifié**, **SPF/DKIM/DMARC conformes**, templates HTML+texte, retry, rate-limit, logging — et une **livraison réelle en boîte de réception Gmail**, ouverte, liens vérifiés.

**Reste, sans écrire une ligne de code :** brancher le SMTP de Supabase Auth pour les e-mails de **confirmation d'inscription**, **réinitialisation de mot de passe** et **vérification d'e-mail**, puis les tester sur boîte réelle. Après quoi le SMTP sera **intégralement validé** et la phase **Stripe** pourra démarrer.

---

### Reproductibilité
`POST /api/contact` (chaîne complète) · `npm run email:test -- --to=…` (script owner) · `nslookup -type=TXT resend._domainkey.arcadins-training.com 8.8.8.8` (DNS). Runbook : `docs/SMTP_SETUP.md`.

*Émis pour JeHoPa KING Consulting — ARCADINS Training Center V2.*
