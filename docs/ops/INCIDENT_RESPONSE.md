# ARCADINS — Incident Response

## Sévérités
| Niveau | Définition | Cible de prise en charge |
|---|---|---|
| SEV-1 | Indispo totale / perte ou fuite de données | immédiate |
| SEV-2 | Fonction critique dégradée (auth, paiement) | < 1 h |
| SEV-3 | Dégradation mineure / contournable | < 1 j |

## Procédure générale
1. **Détecter** (alerte, log, signalement) → ouvrir un ticket incident (horodaté).
2. **Contenir** : couper la source si active (ex. désactiver un flag, stopper un import en cours).
3. **Évaluer** l'impact (comptes/données touchés, fenêtre temporelle).
4. **Corriger** ou **rollback** (voir `ROLLBACK_PLAN.md` / RUNBOOK).
5. **Vérifier** : `validate-migration.mjs --check-target`, logs propres, smoke tests.
6. **Communiquer** aux parties prenantes. 7. **Post-mortem** sans blâme (cause racine, actions).

## Playbooks ciblés
- **Import en échec (rejected>0 / erreur RPC)** : STOP immédiat, `rollback --user-id/lot`, analyser
  `errors.log`, corriger, rejouer (idempotent).
- **Collision e-mail détectée** : la RPC ne modifie ni rôle ni métadonnées ; décider skip/rattachement
  via le pré-flight, documenter.
- **Fuite/exposition suspectée** : roter les secrets concernés (RUNBOOK), révoquer, auditer les accès.
- **Rate-limit inopérant (Upstash down)** : repli mémoire automatique ; surveiller l'abus, restaurer
  Upstash.
- **Webhook Stripe rejeté** : vérifier `STRIPE_WEBHOOK_SECRET` ; rejouer l'événement depuis Stripe.

## Escalade
SEV-1/SEV-2 → astreinte technique + responsable métier. Décision de rollback global/PITR = conjointe.
