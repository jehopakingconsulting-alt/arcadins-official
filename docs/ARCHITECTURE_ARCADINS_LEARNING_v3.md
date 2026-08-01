# ARCADINS Learning Platform — Target Architecture (v3, "definitive")

> Design document. **No implementation yet.** Grounds the new educational system in the existing V2
> stack and reuses the strong deterministic engines already in the repo, redesigning only where a
> better architecture exists. Historical data is already preserved in `legacy_*` (see the V1→V2 migration).
> Priority order (user-set): 1) world-class learning architecture, 2) UX/UI, 3) scalability,
> 4) maintainability, 5) assessment engine, 6) certification engine, 7) administration tools.

---

## 0. Principles

1. **Curriculum-as-data, logic-as-pure-engine.** Content is declarative data; all sequencing/grading/eligibility is computed by pure, deterministic, injected-clock engines (already the pattern in `src/lib/runtime/*`). No business rule lives in a React component.
2. **Ports & adapters (hexagonal).** Engines depend on interfaces (`repositories`, `signing-provider`, `integrity-provider`, `persistence-ports`) — Supabase/Stripe/KMS are swappable adapters. This is already how the credential engines are written; extend it platform-wide.
3. **Server decides, client displays.** RSC + Server Actions own all authority (unlock, mark-complete, grade, issue). The client renders view-models only; the `ensure-client-safe` boundary guard stays mandatory (no answer keys/secrets cross to the client).
4. **History preserved, implementation free.** `legacy_*` is read-only truth of the past. The new canonical model is designed fresh; a thin bridge projects legacy history into it. On any conflict, choose the better architecture and keep the data.
5. **Everything flag-gated and reversible.** Ship inert, enable per-cohort. Additive migrations, never destructive.

---

## 1. Bounded contexts

```
Identity & Access ── Catalog ── Enrollment ── Learning Runtime ── Assessment ── Certification ── Tutoring ── Admin/Ops ── Billing
        │              │            │               │               │              │              │            │          │
     Supabase       curriculum   entitlements   progress/mastery  item bank    verifiable     assignments   consoles   Stripe
      auth           as data                     spaced-rep         CAT/IRT     credentials
```

Each context = its own module folder, its own tables (schema-prefixed), its own engine(s), exposed through a service layer. Contexts communicate through explicit contracts (typed events + service calls), never by reaching into each other's tables.

---

## 2. Domain model (canonical, new)

The V1 model (flat `users`, per-user `modules`, one shared 14-module product) is **replaced** by a scalable content graph. TEF and TCF are modeled as **independent products from day one at the data layer** (even though today they share content) so the future split needs no migration.

```
Product (TEF Canada | TCF Canada | …)          -- commercial unit: pricing, entitlement, certificate policy
  └─ ProgramVersion (semver, immutable once published)
       └─ Module (index, competencies[], weeks)
            └─ Lesson (objectives, content blocks, resources, i18n)
                 └─ Activity (practice; may carry private answer keys — server-only)
       └─ AssessmentSpec (formative quiz | module test | qualification | final exam)
            └─ ItemRef → ItemBank

Competency (NCLC-aligned: CO, CE, EO, EE + MSL for TCF)     -- cross-cutting skill taxonomy
Learner ── Enrollment(product, version, entitlement, access window)
   └─ ProgressState (per version): module/lesson status, mastery per competency, streak, study minutes
   └─ AttemptRecord (assessment attempts, immutable, append-only)
   └─ Credential (issued attestation, versioned, verifiable)
```

Key modeling decisions:
- **ProgramVersion is immutable & content-addressed.** A learner is pinned to the version they enrolled on; new content ships as a new version. Progress carries a `version` — no silent content drift under a learner's feet (a V1 pain point).
- **Competency taxonomy is first-class**, not derived from module index. Mastery is tracked per competency (NCLC CO/CE/EO/EE, +MSL for TCF), enabling adaptive targeting and honest "you are NCLC 7 in CE, 5 in EE" reporting.
- **Content blocks are typed** (`prose | example | table | audio | media | callout | interactive`) and i18n-keyed, so the same structure renders in 7 languages and future media (audio for CO) slots in without schema change.

---

## 3. Reuse / redesign / build map

| Existing asset (repo) | Verdict | Rationale |
|---|---|---|
| `runtime/` pure engines (runtime-engine, journey, progression, navigation) | **REUSE** | Deterministic, injected-clock, tested. This is the world-class core. |
| `assessment/` (grading, partial-credit, competency-assessment, integrity, question-bank, selector, feedback) | **REUSE + extend** | Add IRT/adaptive selection on top of existing `question-selector`. |
| `exam/` engines + `navigation-policy-engine` | **REUSE** | Secure exam sequencing already modeled. |
| `certification/` + `credential-issuance/` + `credential-crypto/` (Ed25519, verifier, QR, lifecycle) | **REUSE** | Full verifiable-credential stack already exists; wire to real persistence + KMS adapter. |
| `certification-authority/` (issuance boundary, policy registry, audit) | **REUSE** | Governs who may issue; keep. |
| `ui/security/ensure-client-safe` + `public-curriculum` projection | **REUSE — mandatory** | Server→client boundary guard. |
| `ui/view-models.ts` | **REUSE + extend** | Stable client contracts already defined. |
| Live `COURSE_LESSONS` (`src/lib/lessons/*`) — the 8-lesson public tracks | **REDESIGN** | Fold into the canonical Product/Version/Module/Lesson model; keep the authored content. |
| Flat legacy learner/progress shape | **REPLACE** | Superseded by ProgressState + Competency mastery; legacy history bridged read-only. |
| Persistence: `in-memory-*` adapters | **BUILD** | Implement Supabase adapters behind the existing ports (`repository-contracts`, `persistence-ports`). |
| Item bank at scale, adaptive/CAT, spaced repetition, tutor console, admin authoring | **BUILD** | The genuinely new capability layers. |

**Net:** ~70% of the hard logic already exists as pure engines. The new work is **persistence adapters, the item-bank/adaptive layer, content authoring, and the UX shells** — not re-deriving learning logic.

---

## 4. Data architecture

**Store:** Supabase Postgres (canonical) + Storage (media, credential PDFs) + Supabase Auth (identity).

New canonical schema (additive; `legacy_*` untouched):

```
catalog.products, catalog.program_versions, catalog.modules, catalog.lessons,
catalog.content_blocks, catalog.competencies, catalog.assessment_specs
itembank.items, itembank.item_variants, itembank.item_stats (difficulty/discrimination for IRT)
enroll.enrollments, enroll.entitlements
runtime.progress_state, runtime.lesson_progress, runtime.competency_mastery,
runtime.study_events (append-only telemetry), runtime.spaced_repetition_queue
assess.attempts, assess.attempt_items, assess.exam_sessions   -- append-only, server-graded
cert.credentials, cert.credential_status_history, cert.verification_events
tutor.assignments, tutor.tutoring_requests, tutor.applications
```

- **Bridge to history:** a `runtime.progress_state` row for a migrated learner is back-filled from `legacy_learners` + `legacy_modules` at first login (idempotent, one-time projection via `legacy_id_map`). Legacy certificates surface through `cert.credentials` with `origin='legacy'` pointing at `legacy-certificates` storage. **Nothing is re-computed or lost.**
- **RLS everywhere:** learners read only their own progress/attempts; item answer keys and grading rules are **never** selectable by `authenticated` (service-role only, mirrored by the client-safe guard). Admin/tutor scopes via `profiles.role`.
- **Item bank** carries private fields (answer key, rubric, discrimination) strictly server-side; the public projection (existing `public-serializer` / `question-public`) strips them.
- **Immutability:** attempts and credential history are append-only; corrections are new rows, never mutations — full audit trail.

---

## 5. Learning Runtime (the core)

- **Deterministic engine** (`runtime-engine.derive(curriculum, state, now)`): given content + learner state, computes the entire journey view — module/lesson unlock, percent, next action, competency levels — as a pure function. Already exists; becomes the heart.
- **Mastery model:** per-competency mastery updated from graded attempts (Bayesian/decay), not just "module done". Drives:
  - **Adaptive sequencing** — recommends the next lesson/activity by weakest competency vs target NCLC.
  - **Spaced repetition** — `spaced_repetition_queue` schedules review of weak items (SM-2-style), a capability V1 lacked entirely.
- **Offline-first delivery:** lesson content is static/edge-cached (CDN), progress writes are queued and idempotent (compare-and-swap on `progress_state`), so flaky mobile connections (a real user segment: Haïti, Afrique) never lose work. Carousels/media use CSS-driven, not JS-interval, animation (known mobile-Safari reliability rule).
- **Access windows & entitlements** enforced server-side from `enroll.entitlements` (6–12 week windows preserved from V1 semantics).

---

## 6. Assessment engine

- **Item bank** with typed items (MCQ, multi-select, cloze, ordering, audio-comprehension, written-production, oral-production placeholder) + variants for exposure control.
- **Adaptive testing (CAT)** layered on the existing `question-selector`: IRT parameters in `item_stats`; qualification/final adapt difficulty to converge on a precise NCLC estimate faster (fewer items, better precision than V1's fixed sets).
- **Server-authoritative grading** (existing `grading-engine`, `partial-credit-engine`, `competency-assessment-engine`): client submits answers, server grades, returns only public feedback (existing `feedback-engine` + `public-serializer`). No answer key ever reaches the client.
- **Integrity/anti-fraud** (existing `assessment-integrity`): attempt limits per entitlement, timing, shuffle, variant rotation, anomaly signals kept private.
- **Written/oral productions:** structured submission + rubric (server-only) + tutor review queue → feeds mastery. Bridges to the tutoring context.

---

## 7. Certification engine

Reuse the existing verifiable-credential stack, wired to real infra:
- **Eligibility** (`certification-eligibility-engine`) gates issuance on completion + passing final under the version's policy.
- **Issuance orchestration** (`secure-credential-orchestration`): atomic reserve → canonicalize → integrity digest (SHA-256) → **Ed25519 signature** (`credential-crypto`, `node:crypto`) → persist → status machine. Idempotent, append-only history.
- **Verification:** public `/verify/[id]` renders from a signed, canonical payload; QR encodes the verification URL + fingerprint (`qr-verification-payload`). Anyone can verify authenticity without ARCADINS login.
- **Lifecycle:** replace/revoke/expire engines already exist; expose via admin.
- **Keys:** `credential-key-provider` port with a Supabase-Vault/external-KMS adapter (contract already defined in `external-kms-provider-contract`). Rotation/revocation services exist.
- **Legal-safe:** "attestation de complétion", NCLC-equivalent estimate clearly indicative; no affiliation claims.
- **Legacy certs** are represented as `origin='legacy'` credentials (record migrated; PDF either uploaded from the old server or regenerated from the record — pending user decision).

---

## 8. UX/UI architecture

Three surfaces, one design system (navy / gold / off-white, Playfair + DM Sans), all i18n (fr/en/es/it/pt/de/ht), WCAG-AA:
- **Student runtime** (`/learn`): dashboard (mastery radar per NCLC competency, next-best-action, streak, deadlines), lesson player (typed content blocks, audio for CO), assessment/exam player, results with competency feedback, credentials wallet. Mobile-first, offline-tolerant.
- **Tutor console** (`/tutor`): assigned learners, production-review queue (written/oral), progress insights, messaging.
- **Admin/Ops** (`/admin`): content authoring (version editor for products/modules/lessons/items with publish workflow), cohort & entitlement management, credential lifecycle, migration validator (exists), platform health (exists), analytics.

Rendering: RSC for data-authoritative pages; Client Components only for interactive players; all fed by stable `view-models`. Design tokens + a small component library; Storybook-style isolation for maintainability.

---

## 9. Application & API architecture

- **Next.js 16 App Router**, RSC + Server Actions as the primary write path; thin API routes for webhooks (Stripe) and public verification/embedding.
- **Service layer** per bounded context (e.g. `server/certification-application-service` already exists) orchestrates engines + adapters; components never call engines directly.
- **Feature flags** (existing pattern) gate every new surface for per-cohort rollout.
- **Idempotency & CAS** on all state writes (already the engine convention) for safe retries at the edge.

---

## 10. Non-functional architecture

- **Scalability:** stateless RSC on Vercel edge; content CDN-cached and version-immutable; Postgres reads scale via RLS-scoped indexed queries; append-only tables partition-friendly; heavy grading is O(items) pure functions.
- **Security/Privacy:** RLS default-deny; client-safe boundary guard; secrets only in server/KMS; **Loi 25 (Québec) + GDPR** — data-min (drop V1 login-IP telemetry), export/delete, consent; audit trails immutable.
- **Observability:** `study_events` + structured audit events + credential/verification logs → analytics; health dashboard.
- **Testing:** keep the `node --test` pure-engine suites (30 exist); add adapter integration tests + Playwright E2E per surface; contract tests on ports.
- **Maintainability:** DDD folders, ports/adapters, one-way context dependencies, curriculum-as-data (content changes ≠ code changes), semver'd program versions.

---

## 11. Coexistence & cutover

1. New canonical schema ships additive & flag-off; engines wired to Supabase adapters.
2. Author TEF & TCF as ProgramVersion 1.0 (reuse V1 content from the archive + current `COURSE_LESSONS`).
3. Back-fill migrated learners' `progress_state` from `legacy_*` (idempotent).
4. Enable for a pilot cohort → validate → expand. Public `/tef` `/tcf` marketing pages already live; the *runtime* switches on behind the flag.
5. Retire legacy code paths only after parity is proven on real cohorts.

---

## 12. Delivery roadmap (GO-gated phases — design only, not started)

- **P1 Foundation:** canonical schema + Supabase adapters behind existing ports + history bridge.
- **P2 Content model:** Product/Version/Module/Lesson/ContentBlock + authoring import of V1 content.
- **P3 Learning runtime UI:** student dashboard + lesson player on the real engines.
- **P4 Assessment:** item bank + adaptive + server grading + integrity.
- **P5 Certification:** wire issuance/verification to Supabase + KMS adapter; legacy cert bridge.
- **P6 Tutor + Admin:** consoles + authoring workflow.
- **P7 Hardening:** a11y, i18n completeness, perf, security review, Playwright, pilot cohort.

Each phase: inert/flag-gated, gates green (typecheck/lint/test/build), one atomic step, report, STOP for GO.

---

## 13. Key decisions (ADR summary)

1. **Reuse the existing pure runtime/assessment/certification engines** rather than rebuild — they already embody the world-class core. Build the missing persistence, item-bank/adaptive, and UX layers.
2. **Model TEF & TCF as independent products at the data layer now**, even while they share content, so the commercial split later is config, not migration.
3. **Competency-mastery + adaptive + spaced-repetition** as the pedagogical differentiator vs V1's linear 14 modules.
4. **Immutable, versioned content** pinned per enrollment.
5. **Verifiable Ed25519 credentials** with public verification, replacing V1's plain PDF.
6. **History bridged read-only**; canonical model designed fresh.

---

## 14. Open questions for you

1. **TEF/TCF content now:** author both as ProgramVersion 1.0 sharing content, or start differentiating curricula immediately?
2. **Certification depth for launch:** enable the full Ed25519 verifiable-credential path, or a simpler signed attestation first (crypto stays ready either way)?
3. **Certificate PDFs (still open):** Option 1 retrieve the 7 legacy files vs Option 2 regenerate from records.
4. **Pricing model** for the new products (V1 one-time USD tiers vs a subscription model) — affects entitlement design.
5. **Scope of P1** — do you want the full canonical schema first, or a vertical slice (one product, dashboard + lesson player end-to-end) to validate the architecture on real users fastest?
