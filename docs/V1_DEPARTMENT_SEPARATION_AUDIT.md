# ARCADINS Training Center — V1 Department-Separation Enterprise Audit

> CTO audit BEFORE any modification (per directive: "audit first"). Documents the current state of the
> two-department mandate (Official Language **Programs** vs **Professional Trainings**), classifies every
> finding, and separates SAFE-FIX-NOW from DECISION-REQUIRED. **No modifications made.** Snapshot `7f9bc58`;
> production `origin/master a0b69c6` (live V2). Official name: **ARCADINS Training Center**.

---

## 1. Current-state map (as live today)

| Department | Intended | Current live routes | Catalog source | Pricing | Nav label |
|---|---|---|---|---|---|
| **A — Official Language Programs** (TEF/TCF/TFI/DELF/DALF, immigration) | "Programs", `/programmes` | `/tef`, `/tcf`, `/tutorat`, `/examens`, `/immigration` | inline page content | **Not live** ($97–$347 tiers exist only in flag-gated `/programmes`) | "Tutorat TEF / TCF" (`/tef`) |
| **B — Professional Trainings** (the 9) | separate catalog/pricing | `/formations`, `/formations/[slug]` | `programs.ts` (`PROGRAMS`) | **1500 CAD** each (+ registration fee + 3× installments) at `/tarifs` → `/formations/[slug]` | "Formations" |
| Generic Programs experience | Dept A ecosystem | `/programmes/[slug]` | `program-presentation` (only `tef-canada`) | $97–$347 (in-page) | — (flag-gated, 404 in prod) |

---

## 2. Findings

### 🔴 CRITICAL — terminology collision (Programs ⇆ Trainings)
- `i18n.ts` `nav.formations` translates to **"Programs"** (EN), "Programas" (ES), "Programme" (DE) — i.e. the
  **Professional Trainings are labelled "Programs"**, the exact term the directive reserves for **Department A
  (language)**. This directly violates the separation mandate and would confuse visitors about which
  department they are in.
- **Conflict to resolve (business decision):** the directive says both "Dept A = Programs / Dept B =
  Trainings" **and** "Do NOT rename products." Renaming the live "Formations→Programs" label (or Dept A's
  naming) is a **product-terminology decision** — I will not invent it.

### 🔴 CRITICAL — cross-department contamination in the Trainings catalog
- `programs.ts` (the **Trainings** catalog) contains **`id:10 francais-tef-tcf` "Français Intensif TEF/TCF
  Canada"** (coming-soon) — a **language exam-prep Program living inside the Professional Trainings catalog**.
  Also 2 active trainings are `category:"lang"` (`francais-affaires`, `anglais-commercial`). Per the mandate,
  TEF/TCF belongs to **Department A only** and must not sit in the Trainings catalog. **Fix requires a
  business decision** (move `francais-tef-tcf` to Dept A / exclude from Trainings).

### 🟠 MEDIUM — Department A "Programs ecosystem" is not live
- The generic `/programmes/[slug]` (per-program landing/pricing/curriculum/CTA) is **flag-gated → 404 in
  prod**, and only `tef-canada` is authored. So the mandated Dept-A ecosystem (each Program with its own
  landing/pricing/registration/curriculum/certification path) **does not exist live** — only the `/tef`,
  `/tcf` marketing pages do. **Decision:** un-gate + author the other Programs (TCF/TFI/DELF/DALF) — content
  + go-live decision.

### 🟠 MEDIUM — pricing separation incomplete / possibly inconsistent
- `/tarifs` shows **Trainings pricing only** (1500 CAD). **Programs (TEF/TCF) pricing is not surfaced live.**
- `pricing-plans.ts` (`PRICING`: Starter 199 / Professionnel 449 / Entreprise, CAD subscription) is exported
  via `constants` but **`/tarifs` uses `PROGRAMS`, not `PRICING`** → a **third pricing model** that appears
  unused by the pricing page. Risk: an inconsistent/orphan pricing artifact. **Verify usage; decide the
  authoritative model per department** (Trainings = 1500 CAD; Programs = $97–$347 per the recorded decision).

### 🟠 MEDIUM — homepage does not clearly split the two departments
- The homepage (`HeroSlider`, `ServicesGrid`, `VideoSection`) links to `/tef` and `/formations` among general
  services, but presents **no explicit "Official Programs vs Professional Trainings" separation** with
  distinct sections/CTAs/pricing access. **Decision + UX work** (restructure the live homepage).

### 🟢 LOW / GOOD
- **No broken links / placeholders** in public home components (0 `href="#"`, no lorem/coming-soon copy).
- `/formations/[slug]` has breadcrumbs; nav/footer links resolve; official name correct in header/logo.
- Coming-soon Trainings (ids 10–14) are correctly **archived** from the public catalog (`comingSoon` filter).
- i18n routing (`/fr /en /es`), hreflang, canonical, SEO metadata: verified operational (prior milestone).

---

## 3. Classification

| # | Finding | Severity | Type |
|---|---|---|---|
| 1 | "Formations" labelled "Programs" (EN/ES/DE) — terminology collision | 🔴 | **DECISION** (rename policy) |
| 2 | `francais-tef-tcf` (+lang trainings) inside Trainings catalog | 🔴 | **DECISION** (recategorize) |
| 3 | Dept-A Programs ecosystem flag-gated / only tef-canada | 🟠 | **DECISION** (un-gate + author) |
| 4 | Programs pricing not live; `PRICING` artifact possibly orphan | 🟠 | **DECISION** (authoritative pricing per dept) |
| 5 | Homepage lacks explicit two-department split | 🟠 | **DECISION + UX** |
| 6 | Broken links / placeholders | 🟢 | none found |

**Every material finding is DECISION-REQUIRED**, not a trivial safe-fix. Implementing them means renaming
live public product labels, recategorizing the catalog, un-gating and authoring live pricing, and
restructuring the live homepage — all on the **live production marketing site**, and all touching business
rules the directive explicitly protects ("do NOT rename products", "do NOT invent prices", "do NOT create
fake content").

---

## 4. Why I am NOT auto-implementing (CTO / production-safety)

1. **Contradictory clauses:** the mandate requires "Programs (Dept A) ≠ Trainings (Dept B)" *and* "do not
   rename products" — but the live site already names the Trainings "Programs" (EN). Resolving this **must**
   be your explicit call; either choice changes public branding.
2. **No inventing prices/content:** surfacing live Programs pricing or authoring TCF/TFI/DELF/DALF Program
   pages/pricing would require prices and content I must not fabricate.
3. **Live-site regression risk:** restructuring the live homepage/nav/pricing is a high-blast-radius change;
   per your zero-regression rule it needs explicit sign-off, not assumption.

---

## 5. Decisions required (to proceed to completion)

- **D1 — Naming:** confirm final public labels. Recommended: Dept A = **"Programmes officiels"** (Official
  Programs) at `/programmes`; Dept B = **"Formations professionnelles"** (Professional Trainings) at
  `/formations` — and fix the EN/ES/DE `nav.formations` translation so Trainings are **not** called "Programs".
- **D2 — Catalog split:** move `francais-tef-tcf` (and language exam-prep) out of the Trainings catalog into
  Department A; keep the 9 vocational trainings in `/formations`.
- **D3 — Programs go-live:** approve un-gating `/programmes` and authoring the additional Programs (with
  their real pricing/content), or keep `/tef`,`/tcf` as the live Dept-A surface for V1.
- **D4 — Pricing authority:** confirm Trainings = 1500 CAD (live) and Programs = $97–$347 (to surface where?);
  decide the fate of the `PRICING` (199/449) artifact (use, repurpose, or remove).
- **D5 — Homepage:** approve a two-department homepage split (separate sections/CTAs/pricing access).

---

## 6. GO / NO-GO (for the department-separated V1)

**🔴 NO-GO to auto-implement now** — the required changes are DECISION-gated business/branding/pricing
choices on the live product, not safe mechanical fixes.
**🟢 GO to proceed on approval** — once D1–D5 are decided, the work is straightforward and reuses the
existing architecture (catalog data, generic `ProgramLanding`, `/programmes` route, i18n) with **no
rebuild**: relabel (i18n), recategorize (data), author Programs content/pricing (data), and add a
two-department homepage section (compose existing components). I will then execute it in small, reversible,
verified commits and run the final V1 production audit.

**No modifications were made. Production untouched.**
