# Sentry — activation (error tracking) [gated, non installé]

Sentry n'est **pas installé** (code gelé, dépendance non provisionnée). Procédure d'activation en
production, sans impact sur le build actuel :

## 1. Installer
```bash
npx @sentry/wizard@latest -i nextjs
# ou : npm i @sentry/nextjs
```

## 2. Config (générée par le wizard)
- `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
- Le wizard branche `withSentryConfig` dans `next.config.ts` (source maps, tunnel).

## 3. Variables d'environnement (Vercel)
```
SENTRY_DSN=...
SENTRY_AUTH_TOKEN=...        # upload source maps en CI
NEXT_PUBLIC_SENTRY_DSN=...
```

## 4. Bonnes pratiques
- `tracesSampleRate` 0.1 en prod (ajuster selon budget).
- Filtrer les PII (`beforeSend`) : ne jamais envoyer e-mails/tokens.
- Relier releases à `git sha` pour le suivi par déploiement.

> Alternative sans dépendance : capter les erreurs via le logger structuré
> (`src/lib/logger.ts`) → log drains Vercel → collecteur. Sentry reste recommandé
> pour le triage/alerting d'erreurs applicatives.
