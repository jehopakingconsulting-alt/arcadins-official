# ARCADINS — Tests E2E (spécification, S8)

Les tests end-to-end nécessitent Playwright + navigateurs (non provisionnés dans l'environnement
d'audit). Ils s'exécutent en CI (runner Ubuntu) ou en local après installation.

## Installation
```bash
npm i -D @playwright/test
npx playwright install --with-deps
```

## Parcours à couvrir (smoke + critiques)
1. Accueil se charge (200, titre, hero visible) + en-têtes de sécurité présents.
2. Navigation : Accueil → Formations → détail formation.
3. Soumission d'une demande de tutorat (formulaire valide → confirmation ; invalide → 422).
4. Connexion → tableau de bord (compte de test).
5. Accès `/admin` non authentifié → redirection login (déjà vérifié manuellement).
6. `/api/health` = 200 ; `/api/ready` = 200/503.

## Exécution
```bash
npx playwright test        # local
# ou job dédié en CI (matrice chromium/firefox/webkit)
```

> Ces scénarios sont référencés dans `PRODUCTION_RELEASE_CHECKLIST.md` (smoke tests) et
> `ENTERPRISE_FINAL_AUDIT.md` (S8). Statut : spécifiés, exécution gated sur l'installation Playwright.
