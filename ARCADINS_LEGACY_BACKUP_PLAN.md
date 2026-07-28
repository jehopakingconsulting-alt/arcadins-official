# ARCADINS — Plan de sauvegarde de l'ancien système (Phase 2)

**Règle d'or : ne jamais écraser, modifier ni supprimer la base source.** Toutes les opérations de sauvegarde
sont en **lecture seule** ; la base de production reste intacte sur le disque Render.

---

## 1. Ce qu'il faut sauvegarder
| Élément | Emplacement (prod Render) | Emplacement (copie locale de dév) |
|---|---|---|
| Base SQLite | `/data/arcadins.db` (+ `-wal`, `-shm`) | `server/arcadins.db` |
| Certificats PDF | `server/certificates/*.pdf` (ou disque `/data`) | `server/certificates/` |
| Signatures / assets | `server/assets/` | idem |
| Variables de config | `.env` sur Render (**secrets — ne jamais exporter en clair**) | — |
| Journaux | table `admin_audit_log` (dans la base) | idem |

> Les données (users, tests, modules, certificats, commissions, prospects, audit) sont **toutes dans
> `arcadins.db`** — donc une copie fidèle de ce fichier = sauvegarde complète des données.

## 2. Procédure de sauvegarde (production)
> À exécuter par le responsable depuis le **Shell Render** du service backend. Aucune écriture sur la source.

```bash
# 1) Horodatage
TS=$(date -u +%Y%m%dT%H%M%SZ)

# 2) Copie COHÉRENTE de la base (checkpoint WAL puis .backup — ne modifie pas la base live)
sqlite3 /data/arcadins.db ".backup /tmp/arcadins-$TS.db"      # copie transactionnelle sûre
#   (à défaut de sqlite3 : cp /data/arcadins.db /tmp/arcadins-$TS.db  ET  les fichiers -wal/-shm)

# 3) Contrôle d'intégrité sur la COPIE (jamais sur la source)
sqlite3 /tmp/arcadins-$TS.db "PRAGMA integrity_check;"        # doit renvoyer: ok
sqlite3 /tmp/arcadins-$TS.db "PRAGMA foreign_key_check;"      # doit être vide

# 4) Checksum
sha256sum /tmp/arcadins-$TS.db > /tmp/arcadins-$TS.db.sha256

# 5) Archive des certificats PDF (copie)
tar -czf /tmp/arcadins-certs-$TS.tgz -C /path/vers/certificates .
sha256sum /tmp/arcadins-certs-$TS.tgz > /tmp/arcadins-certs-$TS.tgz.sha256

# 6) Télécharger /tmp/arcadins-$TS.db, .sha256, et l'archive certs sur un stockage sûr hors Render.
```

## 3. Copie locale (dév) — déjà vérifiée
- Fichier : `server/arcadins.db` · **taille** : 69 632 octets · `PRAGMA integrity_check` = **ok** ·
  `foreign_key_check` = **0 violation**.
- **SHA-256** : `456f411cb04046b83fe79fb30d65707e30914180d431748530391918c5ff9b30`.
- Contenu : **9 comptes** (dév) — utile pour construire/tester la migration, **≠ production (27 comptes)**.

## 4. Vérification (checksums & intégrité)
- Toujours recalculer le `sha256sum -c` après transfert pour prouver l'absence de corruption.
- `PRAGMA integrity_check` = `ok` **obligatoire** avant de considérer une copie exploitable.
- Noter la volumétrie (`SELECT count(*)` par table) et la **comparer au tableau de bord admin** (27 comptes,
  10 paiements, 7 certificats…) — un écart signale une copie incomplète.

## 5. Procédure de restauration (ancien système, si jamais nécessaire)
> Uniquement en cas d'incident sur l'ancien site — **hors périmètre de la migration**.
```bash
sqlite3 /tmp/arcadins-RESTORE.db ".restore /chemin/backup/arcadins-<TS>.db"
sqlite3 /tmp/arcadins-RESTORE.db "PRAGMA integrity_check;"     # ok
# Placer le fichier vérifié sur /data/ après arrêt propre du service, puis redémarrer.
```

## 6. Sauvegarde côté NOUVELLE plateforme (avant tout import)
- Supabase (prod) : **Database → Backups** — vérifier/déclencher une sauvegarde **avant** le moindre import.
- Conserver la preuve (date/heure du point de restauration) — exigence stricte des consignes prod.

## 7. Rétention & sécurité
- Conserver **au moins** la sauvegarde pré-migration + la sauvegarde finale de bascule.
- **Ne jamais** stocker les secrets `.env` avec les données. **Ne jamais** exporter de mots de passe en clair
  (la base ne contient que des **hachages bcrypt**, jamais exposés dans les logs de migration).

---

*Aucune migration ne démarre tant qu'une sauvegarde vérifiée (checksum + integrity_check) de la source de
production et de la cible Supabase n'existe pas.*
