# ARCADINS — Matrice des notifications

Les deux parcours sont **strictement séparés** : événements, modèles, files et journaux ne se mélangent jamais.
Fournisseur interchangeable via `EMAIL_PROVIDER` (défaut `console`). Aucune clé n'est codée dans le dépôt.

## Variables d'environnement
```
EMAIL_PROVIDER=console      # console (dev) | resend
RESEND_API_KEY=             # requis si EMAIL_PROVIDER=resend
EMAIL_FROM=                 # expéditeur
EMAIL_REPLY_TO=             # réponse
APP_URL=                    # base des liens
```

## Parcours ÉLÈVE (tutoring)

| Événement | Déclencheur (statut) | Destinataire | Modèle courriel (objet) | Notif interne | Historique |
|---|---|---|---|---|---|
| `tutoring_request_submitted` | submitted (soumission) | Élève + Admin | « Confirmation de votre demande de tutorat en TEF et TCF » | élève + file admin | oui |
| `tutoring_request_under_review` | under_review | Élève | « Votre demande de tutorat est en cours d'examen » | élève | oui |
| `tutoring_request_contacted` | contacted | Élève | « Suivi de votre demande de tutorat » | élève | oui |
| `tutoring_session_scheduled` | scheduled | Élève | « Votre séance de tutorat est planifiée » | élève | oui |
| `tutoring_request_enrolled` | enrolled | Élève | « Bienvenue dans votre parcours de tutorat » | élève | oui |
| `tutoring_request_closed` | closed | Élève | « Clôture de votre demande de tutorat » | élève | oui |

## Parcours TUTEUR (tutor)

| Événement | Déclencheur (statut) | Destinataire | Modèle courriel (objet) | Notif interne | Historique |
|---|---|---|---|---|---|
| `tutor_application_submitted` | submitted | Candidat + Admin | « Confirmation de votre candidature comme tuteur » | tuteur + file admin | oui |
| `tutor_application_under_review` | under_review | Candidat | « Votre candidature comme tuteur est en cours d'examen » | tuteur | oui |
| `tutor_interview_requested` | interview_requested | Candidat | « Invitation à une entrevue — candidature tuteur » | tuteur | oui |
| `tutor_interview_scheduled` | interview_scheduled | Candidat | « Votre entrevue est planifiée — candidature tuteur » | tuteur | oui |
| `tutor_application_approved` | approved | Candidat | « Votre candidature comme tuteur a été approuvée » (étapes + convention + aucune garantie d'heures/revenus) | tuteur | oui |
| `tutor_application_rejected` | rejected | Candidat | « Mise à jour concernant votre candidature comme tuteur » (professionnel, sans motif à risque) | tuteur | oui |
| `tutor_application_suspended` | suspended | Candidat | « Suspension temporaire de votre collaboration comme tuteur » | tuteur | oui |

## Livraison & fiabilité
- **Statuts de livraison** : `pending` · `sent` · `failed` · `skipped` (journal `notification_delivery_logs`).
- **Anti-duplication** : `dedup_key = event:relatedId:recipient`, contrainte `unique` en base ; un même envoi n'est jamais dupliqué.
- **Réessai** : ré-invocation du dispatch (le champ `attempts` est journalisé).
- **Mode développement** : `ConsoleProvider` — aucun envoi réel, trace en console.
- **Résilience** : une erreur du fournisseur est capturée et journalisée `failed` sans interrompre la requête.
- **Modèles multilingues** : FR complet ; EN pour les confirmations ; repli automatique FR.

## Variables dynamiques disponibles
`{{firstName}}` (extensible : `{{lastName}}`, `{{appUrl}}` …).
