# ARCADINS V1 — Educational Assets Archive (2026-08-01)

Complete, checksum-verified archive of every V1 educational asset, preserved for reuse during the
V2 educational reconstruction (TEF/TCF next-generation learning system). **Nothing educational is lost.**
Source: `C:\Users\PC\Desktop\arcadins-training`. Integrity: see `MANIFEST.sha256` (`sha256sum -c`).

| Folder | Contents | Notes |
|---|---|---|
| `question-banks/` | `questionBank.js` (53 KB, shared TEF+TCF item bank), `tuteurTest.js` | Server-side question data + correct answers/explanations |
| `frontend-js/` | `questions.js` (93 KB) | Client-side question set used by the interactive tests |
| `route-logic/` | `modules.js` (1180 l), `finalTest.js`, `qualification.js`, `trial.js`, `tuteur.js` | Module titles/descriptions, embedded questions, scoring rules, explanations |
| `static-pages/` | `formation.html` (118 KB), `tests.html` (84 KB), `tef-canada.html`, `tcf-canada.html`, `test-final.html`, `qualification.html`, `guide.html`, `blog.html` | Full educational/marketing HTML incl. curriculum copy |
| `images/` | hero/ (5), blog/ (3), logo.svg, logo-nav.svg | Educational imagery |
| `certificate-template/` | `pdf.js` (generator), `ARC-2026-YYWFUG63.pdf` (sample) | Certificate layout reference |

**Scope note.** This archive is the *educational* payload only. It is NOT loaded into the live V2 product —
per the authoritative directive, TEF/TCF curriculum, modules, lessons, exercises, simulations, question banks,
learning paths and pricing become **V2-native components rebuilt after** the production data migration. This
archive exists so that rebuild can reuse every original lesson, question, document and resource.

**Not included here** (handled by the production data-migration track, not the educational archive):
learner rows, progress, certificates records, payments — those migrate into `legacy_*` tables with IDs/timestamps
preserved. The certificate *PDF binaries* migrate into the private `legacy-certificates` Storage bucket.
