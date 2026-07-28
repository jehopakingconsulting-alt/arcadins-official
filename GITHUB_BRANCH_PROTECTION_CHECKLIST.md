# ARCADINS — Branch Protection & Gouvernance GitHub (`master`)

**État vérifié :** `gh api …/branches/master` → **`protected: false`** (aucune règle). 🔴 à configurer.
**Je ne modifie pas la protection sans autorisation.** Commandes prêtes ci-dessous (à exécuter par vous
ou sur GO).

## Règles cibles (branche `master`)
| Règle | Cible | État |
|---|---|---|
| Pull Request obligatoire | oui | ❌ à activer |
| Approbations requises | ≥ 1 | ❌ |
| Required status checks | `quality`, `security`, `codeql` (job CI) | ❌ |
| Branche à jour avant merge | strict | ❌ |
| Blocage force-push | oui | ❌ |
| Blocage suppression branche | oui | ❌ |
| Conversations résolues | oui | ❌ |
| CI/CodeQL obligatoires | oui | ❌ |

## Commande de configuration (à exécuter sous GO — NE PAS exécuter maintenant)
```bash
gh api -X PUT repos/jehopakingconsulting-alt/arcadins-official/branches/master/protection \
  -H "Accept: application/vnd.github+json" \
  -f "required_status_checks[strict]=true" \
  -f "required_status_checks[contexts][]=quality" \
  -f "required_status_checks[contexts][]=security" \
  -f "required_status_checks[contexts][]=codeql" \
  -F "enforce_admins=true" \
  -F "required_pull_request_reviews[required_approving_review_count]=1" \
  -F "required_pull_request_reviews[dismiss_stale_reviews]=true" \
  -f "required_conversation_resolution=true" \
  -F "restrictions=null" \
  -F "allow_force_pushes=false" \
  -F "allow_deletions=false"
```
> ⚠️ Les noms de contexts (`quality`/`security`/`codeql`) doivent correspondre aux **noms de jobs** CI ;
> ils apparaissent comme checks une fois une PR/commit passé. Vérifier après activation.

## Vérification
```bash
gh api repos/jehopakingconsulting-alt/arcadins-official/branches/master/protection --jq '{checks:.required_status_checks.contexts, reviews:.required_pull_request_reviews.required_approving_review_count}'
```
