# ARCADINS — Configuration SMTP (runbook propriétaire)

> Le **code** d'envoi est prêt et testé. Les étapes ci-dessous **doivent être exécutées par le
> propriétaire** : elles impliquent des **secrets**, la **vérification de domaine** et des **enregistrements
> DNS** auxquels l'IA n'a pas accès. Rien n'est « Production Ready » tant que le test boîte réelle (§6) n'est pas passé.

## 0. Deux canaux d'e-mail (important)
ARCADINS envoie des e-mails par **deux chemins distincts** :
1. **E-mails applicatifs** (contact : accusé + notification admin) → via la couche `getEmailProvider()` de ce dépôt (`EMAIL_PROVIDER=resend|smtp`).
2. **E-mails d'authentification** (confirmation d'inscription, réinitialisation de mot de passe, vérification d'e-mail) → **envoyés par Supabase Auth**, PAS par ce code. Ils se configurent dans le **dashboard Supabase** (§5).

Les deux peuvent utiliser le **même expéditeur** et le **même fournisseur** (ex. Resend).

## 1. Choisir un fournisseur
- **Resend (recommandé, API HTTP)** — idéal serverless/Vercel, DKIM automatique. `EMAIL_PROVIDER=resend`.
- **SMTP littéral (nodemailer)** — tout serveur SMTP (Resend SMTP, SES, Mailgun, Postmark…). `EMAIL_PROVIDER=smtp`.

## 2. Vérifier le domaine expéditeur
Dans le fournisseur (ex. Resend → *Domains* → *Add Domain*), ajoutez **`arcadins-training.com`** (ou un sous-domaine dédié, ex. `mail.arcadins-training.com`). Le fournisseur affiche les **enregistrements DNS** à créer.

## 3. DNS : SPF · DKIM · DMARC (chez le registraire du domaine)
Créez les enregistrements fournis. Exemples de forme (utilisez les **valeurs exactes du fournisseur**) :
| Type | Hôte | Valeur (exemple de forme) |
|---|---|---|
| TXT (**SPF**) | `@` ou sous-domaine | `v=spf1 include:_spf.resend.com ~all` |
| CNAME/TXT (**DKIM**) | `resend._domainkey` (fourni) | (clé publique fournie par le provider) |
| TXT (**DMARC**) | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:dmarc@arcadins-training.com; fo=1` |
> Attendez la **vérification** (statut « Verified » côté fournisseur) avant d'envoyer en prod. DMARC : commencez en `p=none` pour observer, puis passez à `quarantine`/`reject`.

## 4. Variables d'environnement (Vercel → Settings → Environment Variables, Production)
```
EMAIL_PROVIDER=resend
EMAIL_FROM=ARCADINS Training Center <no-reply@arcadins-training.com>
EMAIL_REPLY_TO=info@arcadins-training.com
CONTACT_NOTIFY_TO=info@arcadins-training.com
APP_URL=https://arcadins-official.vercel.app
RESEND_API_KEY=re_********************        # (si Resend)
# — ou, si EMAIL_PROVIDER=smtp —
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=re_********************
```
> Les secrets **ne doivent jamais** être commités. Ne les collez pas dans le chat.

## 5. Supabase Auth (confirmation d'inscription, reset, vérification d'e-mail)
Dashboard Supabase → **Authentication** :
1. **Providers → Email** : activer, et activer **« Confirm email »** (⇒ vérification d'e-mail obligatoire à l'inscription).
2. **SMTP Settings (Custom SMTP)** : renseigner l'expéditeur + les identifiants SMTP (ex. Resend SMTP : host `smtp.resend.com`, port `587`, user `resend`, pass = clé API). Sans SMTP custom, Supabase limite fortement les envois (dev only).
3. **URL Configuration** : *Site URL* = `https://arcadins-official.vercel.app` ; *Redirect URLs* : ajouter **`https://arcadins-official.vercel.app/auth/update-password`** (indispensable au reset).
4. **Email Templates** : personnaliser *Confirm signup*, *Reset password*, *Magic Link* (le HTML de marque peut reprendre le style de `src/lib/notifications/email-template.ts`).

## 6. Test de bout en bout (boîte RÉELLE) — critère d'acceptation
1. **E-mails applicatifs** — avec les variables en place, exécuter :
   ```
   npm run email:test -- --to=UNE_VRAIE_ADRESSE@gmail.com
   ```
   Vérifier : **reçu** (pas en spam), **ouvre** correctement (HTML + texte), le **bouton** ouvre le site.
2. **Contact** — soumettre le formulaire `/contact` avec une vraie adresse → vérifier l'**accusé** (utilisateur) + la **notification** (CONTACT_NOTIFY_TO).
3. **Auth** — depuis `/auth/register` : recevoir l'e-mail de **confirmation** ; depuis « Mot de passe oublié ? » : recevoir le **reset**, cliquer le lien → arriver sur `/auth/update-password`, changer le mot de passe.
4. **Délivrabilité** — vérifier l'alignement **SPF/DKIM/DMARC** (en-têtes du mail reçu : `Authentication-Results: … dkim=pass spf=pass dmarc=pass`).

## 7. Fiabilité (déjà dans le code)
- **Retry** automatique avec back-off (`withRetry`, 3 tentatives).
- **Rate-limit** anti-spam sur `/api/contact` (5 / min / IP).
- **Best-effort** : les e-mails de contact partent **après** la réponse (`after()`) et n'échouent jamais la requête (la demande est déjà persistée en base).
- **Logging** des échecs en `console.error` (visibles dans les Runtime Logs Vercel).
