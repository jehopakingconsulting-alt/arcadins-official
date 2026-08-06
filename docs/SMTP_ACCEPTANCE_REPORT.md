# ARCADINS — SMTP Acceptance Report
**Date :** 2026-08-05 · **Périmètre :** infrastructure e-mail transactionnelle (Phase 1, frontend gelé)

> **Règle d'honnêteté :** ce rapport distingue ce qui est **CONSTRUIT & vérifié par tests** (que je peux
> certifier) de ce qui est **OWNER-GATED** (secrets, domaine, DNS, boîte mail réelle — que je **ne peux pas**
> exécuter ni certifier). Aucun « envoyé/reçu/ouvert » n'est déclaré tant qu'il n'a pas été réellement produit.

---

## A. CONSTRUIT & VÉRIFIÉ PAR TESTS ✅ (certifiable)
| Exigence | Statut | Preuve |
|---|---|---|
| Abstraction fournisseur (console / **Resend** / **SMTP**) | ✅ | `src/lib/notifications/provider.ts` |
| **Transport SMTP littéral** (nodemailer, import dynamique) | ✅ | `SmtpProvider` (host/port/secure/user/pass via env) |
| **HTML responsive + fallback texte** | ✅ | `email-template.ts` (CSS inline, préheader, CTA, pied légal) |
| **Échappement anti-injection** du contenu dynamique | ✅ | test « échappe le contenu dynamique » |
| **Retry** avec back-off exponentiel | ✅ | `withRetry` + 3 tests (succès 2e essai / abandon N / succès immédiat) |
| **Rate-limiting** anti-spam contact | ✅ | `/api/contact` : 5/min/IP (`enforceRateLimit`) |
| **E-mails de contact** (accusé utilisateur + notif admin) | ✅ | `contact-emails.ts` + 2 tests ; câblés dans la route |
| Envoi **non-bloquant** après réponse + **logging** des échecs | ✅ | `after()` + `console.error` dans `/api/contact` |
| **Script de test E2E** exécutable par l'owner | ✅ | `npm run email:test -- --to=…` (`scripts/email/smtp-verify.ts`) |
| Chaîne complète vérifiée (provider→template→envoi) | ✅ | fumée `EMAIL_PROVIDER=console` → `{"status":"sent"}` |
| Variables d'env documentées | ✅ | `.env.example` + `docs/SMTP_SETUP.md` |
| **Gates** | ✅ | typecheck · lint · **751 tests** (11 nouveaux) · build |

## B. OWNER-GATED — EN ATTENTE ⏳ (non certifiable par l'IA)
| Exigence | Statut | Pourquoi / Action requise |
|---|---|---|
| Compte fournisseur + **clé API / secrets** | ⏳ | à créer par l'owner (jamais manipulé par l'IA) |
| **Identité expéditeur** (domaine vérifié) | ⏳ | vérifier `arcadins-training.com` dans le fournisseur |
| **SPF / DKIM / DMARC** | ⏳ | enregistrements DNS chez le registraire (§3 du runbook) |
| **Confirmation d'inscription / Reset / Vérification e-mail** | ⏳ | **envoyés par Supabase Auth** → config dashboard (SMTP custom + templates + Redirect URL `/auth/update-password` + « Confirm email ») |
| **Test boîte RÉELLE** (envoyé → reçu → ouvert → liens) | ⏳ | exige secrets + inbox : à exécuter par l'owner (§6 du runbook) |
| Vérification **délivrabilité** (`dkim=pass spf=pass dmarc=pass`) | ⏳ | lire les en-têtes d'un mail réellement reçu |

## C. NON APPLICABLE / LIMITÉ ⚠️
| Élément | Note |
|---|---|
| **Newsletter** | Capacité d'e-mail présente, mais **aucun point de capture actif** (pas de formulaire newsletter ; frontend gelé). Seule une case opt-in existe dans le flux d'inscription flag-gated (OFF). → **pas de déclencheur** tant que le frontend est gelé. |
| **Bounce handling** | Nécessite un webhook fournisseur (Resend/SES) → non implémenté (peut être ajouté en Phase 2 si requis). |

---

## VERDICT

# ⏳ SMTP — CODE PRODUCTION-READY, LIVRAISON NON ENCORE CERTIFIÉE

- **Le code** de la couche SMTP est **prêt pour la production** et **couvert par tests** (751 verts).
- **La livraison réelle** ne peut **pas** être déclarée « Production Ready » tant que l'owner n'a pas exécuté §2→§6 du runbook **et** qu'un e-mail n'a pas été **réellement reçu, ouvert et ses liens vérifiés** dans une boîte réelle.

**Ce qui reste, strictement (owner) :** créer le compte fournisseur → vérifier le domaine → poser SPF/DKIM/DMARC → renseigner les env Vercel → configurer Supabase Auth → lancer `npm run email:test` → valider la réception. **Dès ces étapes faites et prouvées**, le verdict passe à **🟢 SMTP PRODUCTION READY**, et l'on pourra démarrer Stripe.

> Je ne peux pas franchir la ligne d'arrivée à ta place (secrets/DNS/inbox) — mais tout ce qui pouvait
> être construit et testé **sans** tes secrets l'est, et le chemin restant est réduit à une checklist DNS/dashboard.
