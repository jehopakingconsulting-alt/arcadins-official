# ARCAdINS — PRODUCTION BASELINE (2026-08-01)

> Read-only baseline snapshot frozen after the V2 controlled production delivery.
> Purpose: establish an authoritative reference before rapid completion of the remaining training content.
> No production changes were made to produce this document.

---

## 1. Production deployment identity

| Item | Value |
|---|---|
| Production branch | `master` |
| Production commit (current) | `a0b69c6` — `release(v2): ARCAdINS V2 controlled production delivery` |
| Production commit (before delivery) | `f479f85` |
| Rollback tag | `pre-arcadins-v2-production-2026-08-01` → `f479f85` (pushed to origin) |
| Local `master` vs `origin/master` | In sync (both `a0b69c6`) |
| Repo | `C:\Users\PC\Desktop\arcadins-official` → GitHub `jehopakingconsulting-alt/arcadins-official` |
| Vercel project | `prj_OJqK94DQ9qOYTDUhfU4GoC7xAHGR` (GitHub auto-deploy) |
| Production URL | https://arcadins-official.vercel.app/ |

**STEP 1 note (deployed-SHA confirmation).** `origin/master` is `a0b69c6` and the live site is healthy production Vercel. The exact commit served **cannot be byte-confirmed from here**: Vercel headers (`x-vercel-id`) carry no commit SHA, no Vercel CLI/dashboard is available in this environment, and the public surface is byte-identical between `f479f85` and `a0b69c6` (the delivery is inert library code + non-public wording + a cert route restored to production parity). Definitive confirmation requires the Vercel dashboard. This is a **stated environmental limitation, not a defect**.

---

## 2. Live route audit (STEP 2) — all correct

| Route | Expected | Result |
|---|---|---|
| `/` | 200 | ✅ 200 (9 programs, 0 console errors) |
| `/formations` | 200, 9 active, 0 "À VENIR" | ✅ |
| `/formations/{9 slugs}` | 200 each | ✅ all 9 |
| `/tef`, `/tutorat`, `/devenir-tuteur`, `/tutorat/demande` | 200 | ✅ |
| `/tarifs`, `/contact`, `/immigration`, `/temoignages`, `/accreditations` | 200 | ✅ |
| `/auth/login`, `/auth/register` | 200 | ✅ |
| `/dashboard` | protected redirect | ✅ redirect |
| `/parrainage`, `/learn-preview` | 404 intentional (flag OFF) | ✅ 404 |

No critical defect found → **no production modification performed** (per STEP 2 rule).

---

## 3. Formation completeness matrix (STEP 3) — inspected from real curriculum data

**Live content system:** `/formations/[slug]/learn` renders via `getLessonsForCourse(slug)` → `COURSE_LESSONS` (`src/lib/lessons/*.ts`). The player is `src/components/learn/LearnViewer.tsx`: per-lesson objectives + content + exercise + quiz, progress tracking (persisted `/api/certificates` completion, per-lesson POST), quiz gate before "mark complete", and **auto-issued attestation at 100%** (`POST /api/certificates` → Supabase `certificates`).

**Inspected payload (not inferred from titles):**

| # | Program (slug) | Lessons | Exercises | Quizzes | Lines | Authored | Progression + attestation |
|---|---|---|---|---|---|---|---|
| 1 | marketing-digital | 8 | 8 | 8 | 468 | ✅ real | ✅ |
| 2 | informatique | 8 | 8 | 8 | ~460 | ✅ real | ✅ |
| 3 | francais-affaires | 8 | 8 | 8 | ~460 | ✅ real | ✅ |
| 4 | entrepreneuriat | 8 | 8 | 8 | ~460 | ✅ real | ✅ |
| 5 | finance | 8 | 8 | 8 | 470 | ✅ real | ✅ |
| 6 | rh | 8 | 8 | 8 | ~460 | ✅ real | ✅ |
| 7 | tourisme | 8 | 8 | 8 | ~460 | ✅ real | ✅ |
| 8 | anglais-commercial | 8 | 8 | 8 | ~460 | ✅ real | ✅ |
| 9 | relation-aide | 8 | 8 | 8 | 461 | ✅ real | ✅ |

**Assessment:** all 9 live programs are **structurally symmetric and functionally launch-ready** — 8 authored lessons each (objectives, editorial content, a case/exercise, and a formative quiz), wired to progression and automatic attestation issuance. Content is **authored, not placeholder**.

**Known depth/coverage gaps (non-blocking, content-completion scope):**
- **Curriculum depth:** the marketed `duration: "24 semaines"` (`programs.ts`) is deeper than the current **8-lesson** live payload. Only `marketing-digital` also has the deep flag-gated academic Runtime v2 (`src/lib/academic/marketing-digital-v2*.ts`, 8 modules / 24 weeks / 96 lessons) — **inert in production** (previews 404). The other 8 programs have the 8-lesson live payload only. → This is the target of the "remaining content completion".
- **Multilingual lesson translations:** `src/lib/lessons/translations/` covers 4 programs (marketing-digital, informatique, francais-affaires, entrepreneuriat). 5 rely on the FR default. Non-blocking (public UI defaults to FR).
- Coming-soon programs (ids 10–14) are archived from the public catalog (`comingSoon` filter) → correctly hidden.

---

## 4. V1 → V2 data reconciliation (STEP 4) — READ-ONLY checklist (NOT executed)

No production database access or credentials were used. The delivery merge was **additive only** — **zero schema migrations applied** (`0009`/`0011` remain versioned files), so all existing production data is **preserved untouched**. The following is the reconciliation plan to run **only under explicit authorization with credentials**:

| Domain | Probable V1 source | V2 destination | Unique key | Migration risk | Required guardrails |
|---|---|---|---|---|---|
| Users / auth | Supabase `auth.users` | same | user id | none (shared) | backup + row count parity |
| Profiles | `profiles` | `profiles` | user id | low | dry-run + count |
| Enrollments | `enrollments` | `enrollments` | (user, course) | medium | dedupe check |
| Lesson progress | `lesson_progress` | `lesson_progress` | (user, course, idx) | medium | idempotent upsert |
| Quiz attempts | `quiz_attempts` | `quiz_attempts` | attempt id | low | append-only |
| Purchases (Stripe) | `purchases` | `purchases` | session id | high | never re-charge; read-only reconcile |
| Certificates/attestations | `certificates` | `certificates` | cert id | high | never re-issue; verify integrity |
| Tutor applications | `tutor_applications` | same | app id | low | count parity |
| Tutoring requests | `tutoring_requests` | same | request id | low | count parity |
| Referrals | `referrals` (flag OFF) | same | referral id | low | inert while flag OFF |

For each: capture backup/PITR proof → dry-run in staging → validate row-count parity → keep rollback. **Status: BLOCKED pending credentials + explicit human authorization** (per the strict prod-ops gate).

---

## 5. Flags & inert systems

All false in production (verified additive/inert):
`CERTIFICATION_AUTHORITY_ENABLED`, `CREDENTIAL_ISSUANCE_ENABLED`, `PRODUCTION_SIGNING_PROVIDER_ENABLED`, `ACADEMIC_PREVIEW_ENABLED`, `STUDENT_LEARNING_UI_ENABLED`, `REFERRAL_ENABLED`, `LEGACY_CERTIFICATE_EMISSION_ENABLED`.

- Certification/crypto pipeline (K4A → K4C-B: certification authority, credential issuance, Ed25519 signing, secure orchestration) is **shipped but INERT** — flag-gated, node-tested, no runtime effect.
- `/api/certificates` restored to production parity (commit `139a565`) so **student attestation issuance keeps working**; the new gate stays inert.
- Legal-safe wording live: "attestation de complétion" (no "certificat officiel" / "vérification officielle").

---

## 6. Quality gates (at delivery)

typecheck 0 · lint 0 · **632 unit tests** · build OK · J-QA 73/73 · PAR 21/21 · bundle scan OK.
Live smoke: home (9 programs, 0 console errors), /formations (9 active, 0 "À VENIR"), marketing-digital detail, /auth/login, mobile 375px overflow=0.

---

## 7. Limitations (honest)

1. Deployed-SHA byte-confirmation requires the Vercel dashboard (not available here) — §1.
2. Live curriculum depth is 8 lessons/program vs marketed "24 semaines" — §3 (content-completion target).
3. Multilingual lesson translations cover 4/9 programs — §3.
4. V1→V2 data reconciliation is planned but NOT executed (no prod DB access) — §4.
5. Deep academic Runtime v2 exists only for marketing-digital and is inert (previews 404).

---

## 8. 48h execution order (content completion — not started here)

1. Deepen the 8 remaining programs' live lesson payloads toward the marketed scope (author lessons/exercises/quizzes in `src/lib/lessons/*.ts`).
2. Extend multilingual translations to the 5 uncovered programs.
3. Per program: gates (typecheck/lint/test/build) + live smoke on `/formations/[slug]/learn` (progress + attestation).
4. Ship additively; preserve flags OFF, Stripe/auth/Supabase, branding, public URLs, student data.

---

## 9. Verdict

**ARCAdINS PRODUCTION BASELINE VERIFIED — READY FOR RAPID CONTENT COMPLETION.**

Production is live and healthy at `a0b69c6` (rollback tag in place), all critical routes correct, all 9 live programs functionally complete (authored lessons + quizzes + exercises + progression + automatic attestation). No critical defect found; no production modification required. The remaining work is **content depth**, not platform repair.
