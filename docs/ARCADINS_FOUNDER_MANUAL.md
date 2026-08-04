# ARCADINS — FOUNDER MANUAL
**How to run ARCADINS day‑to‑day · 2026-08-04**

> Practical operating manual for the founder/operator. Pairs with the Business Master Plan (strategy)
> and Master Project Dossier (technical).

---

## Operating cadence

### Daily
- Check **new leads** (`/admin/contacts`) → respond within your SLA.
- Check **Vercel** for failed deploys / errors; **Supabase** for auth/DB health.
- (Post‑V3) Check **payments** (Stripe), **new enrollments**, and **failed payments**.
- Reply to WhatsApp/email support.

### Weekly
- Review **funnel metrics** (visits → leads → enrollments) once analytics is live.
- Publish 1 SEO/content piece (TEF/TCF/immigration).
- Review support themes → fix top friction.
- Verify backups (once on Supabase Pro) / take a `pg_dump` (Free plan).

### Monthly
- Review **revenue, conversion, completion** (`/admin/analytics`).
- Reconcile finances; review refund/chargeback rate.
- Ship one product improvement from the V3 roadmap (on GO).
- Review pricing performance (no changes without data).

### Quarterly
- Strategic review vs the 5‑year roadmap; pick the next milestone.
- Security review (`npm audit`, secret rotation, header check).
- Content audit (accuracy, no stale/contradictory claims).
- Investor/partner update (honest, milestone‑based).

## KPIs (start measuring at launch)
| KPI | Why |
|---|---|
| Unique visitors | top of funnel |
| Lead rate (visit→lead) | interest |
| **Conversion (lead→paid)** | core revenue driver |
| CAC / LTV | sustainability |
| Completion rate | product quality + outcomes |
| Refund/chargeback rate | trust + pricing fit |
| Support tickets / student | operational load |
| MRR/enrollment revenue | growth |
> *(No targets are invented here; set them after the first cohort provides a baseline.)*

## Growth strategy (sequenced)
1. **Activate commerce** (remove the 24–48h friction) — biggest single lever.
2. **Proof** — first‑cohort testimonials (real), completion outcomes.
3. **SEO + referral** — compounding, low‑CAC channels.
4. **Localization (EN/ES)** — widen the market.
5. **AI + mobile** — differentiation + reach, once economics are proven.

## Decision matrix
| If a proposed change… | Then |
|---|---|
| increases reliability/conversion/security with evidence | **Do it** (small, verified, flag‑gated) |
| is "prettier" with no measurable value | **Don't** |
| requires a prod DB write | Backup + explicit authorization + staging first |
| advertises a capability not yet live | **Reject** (honesty rule) |
| is a large new subsystem | Scope in the V3 roadmap; start only on explicit GO |

## Priority framework (order of operations)
1. **Trust & legal safety** (no false claims, no guarantees).
2. **Reliability** (nothing broken; recoverable accounts/payments).
3. **Revenue path** (commerce activation).
4. **Learning depth** (LMS + certificates).
5. **Growth** (SEO, referral, localization).
6. **Intelligence & reach** (AI, mobile).

## Business rules (non‑negotiable)
- Never guarantee an exam **result** or an **immigration outcome**.
- Never fabricate testimonials, statistics, partners, or accreditations.
- Payment = enrollment (V3); no manual admission bottleneck at scale.
- The registration fee is **one‑time and global** (never charged twice per student).
- Keep the two departments (language vs professional) **separate** in pricing, navigation, and terminology.
- One authoritative source per public number/price/claim.
- Every unreleased feature stays flag‑gated until fully tested.

## Emergency contacts / procedures
- Bad deploy → Vercel: promote last‑good deployment.
- Data issue → restore from backup/PITR; migrations `0000–0014` reproduce the schema.
- Secret leak → rotate key, update Vercel, redeploy.
- See `ARCADINS_MASTER_PROJECT_DOSSIER.md` §11 for the full DR plan.

---
*Run it honestly, measure everything, ship small verified improvements. That is the ARCADINS operating system.*
