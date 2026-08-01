-- ============================================================================
-- ARCADINS — SEED DE RÉFÉRENCE (NON une migration, NON appliqué automatiquement).
-- Démontre que le modèle commercial générique (0012) exprime le BASELINE V1 (TEF,
-- 4 tiers) PUREMENT EN DONNÉES — et supporte déjà multi-devise, promos, bourses,
-- licences, add-ons, bundles SANS changement de code. À adapter dans le Back Office.
-- Les tiers V1 (97/147/247/347 USD) = référence historique provisoire (décision 4).
-- ============================================================================

-- 1) Programme + Produit (TEF Canada = produit commercial distinct).
insert into public.programs (slug, title, kind)
values ('tef-canada', 'Préparation TEF Canada', 'exam_prep')
on conflict (slug) do nothing;

insert into public.products (slug, program_id, title, subtitle, kind, status, certificate_wording, sort)
select 'tef-canada', p.id, 'TEF Canada', 'Test d''Évaluation de Français pour le Canada',
       'exam_prep', 'active', 'Attestation de complétion', 1
from public.programs p where p.slug = 'tef-canada'
on conflict (slug) do nothing;

-- 2) Packages = COMPOSITION de droits (grants). Tiers = données, pas de code.
insert into public.packages (slug, product_id, kind, name, grants, sort)
select v.slug, pr.id, 'single', v.name, v.grants::jsonb, v.sort
from public.products pr,
(values
  ('tef-starter',   'Starter',
     '[{"type":"product_access","product_slug":"tef-canada","access_model":"limited","weeks":6},
       {"type":"mock_exam_pack","attempts":1},
       {"type":"support_level","level":"standard"}]', 1),
  ('tef-essential', 'Essential',
     '[{"type":"product_access","product_slug":"tef-canada","access_model":"limited","weeks":6},
       {"type":"mock_exam_pack","attempts":2},
       {"type":"downloadable_resources","scope":"all"},
       {"type":"support_level","level":"standard"}]', 2),
  ('tef-premium',   'Premium',
     '[{"type":"product_access","product_slug":"tef-canada","access_model":"limited","weeks":6},
       {"type":"mock_exam_pack","attempts":3},
       {"type":"coaching_hours","hours":2},
       {"type":"downloadable_resources","scope":"all"},
       {"type":"support_level","level":"priority"}]', 3),
  ('tef-vip',       'VIP',
     '[{"type":"product_access","product_slug":"tef-canada","access_model":"limited","weeks":12},
       {"type":"mock_exam_pack","attempts":6},
       {"type":"coaching_hours","hours":4},
       {"type":"tutoring_sessions","sessions":2},
       {"type":"ai_assistant","quota":"unlimited"},
       {"type":"downloadable_resources","scope":"all"},
       {"type":"support_level","level":"vip"}]', 4)
) as v(slug, name, grants, sort)
where pr.slug = 'tef-canada'
on conflict (slug) do nothing;

-- 3) Offres = prix vendables (baseline USD V1 ; ajouter d'autres devises/pays librement).
insert into public.offers (sku, package_id, currency, amount_cents, billing, access_model, access_weeks, active)
select upper('TEF-'||replace(pk.slug,'tef-',''))||'-USD', pk.id, 'USD', v.cents, 'one_time', v.model, v.weeks, true
from public.packages pk,
(values ('tef-starter',9700,'limited',6),('tef-essential',14700,'limited',6),
        ('tef-premium',24700,'limited',6),('tef-vip',34700,'limited',12)
) as v(slug, cents, model, weeks)
where pk.slug = v.slug
on conflict (sku) do nothing;

-- 4) Exemples de configuration avancée (démontrent la puissance sans code) :
-- Devise additionnelle (CAD) pour VIP :
--   insert into public.offers(sku,package_id,currency,amount_cents,billing,access_model,access_weeks,active)
--   select 'TEF-VIP-CAD', id,'CAD',47000,'one_time','limited',12,true from public.packages where slug='tef-vip';
-- Campagne promo -25% TEF, fenêtre datée :
--   insert into public.discounts(name,kind,value,applies_scope,starts_at,ends_at,active)
--   values('Rentrée -25%','percent',2500,'{"product_slugs":["tef-canada"]}','2026-08-15','2026-09-30',true);
-- Coupon lié :  insert into public.coupons(code,discount_id,per_user_limit) values('RENTREE25',<id>,1);
-- Bourse 100% :  insert into public.scholarships(code,kind,status) values('BOURSE-HAITI','full','active');
-- Licence agence d'immigration (25 sièges) :
--   insert into public.organizations(kind,name) values('immigration_agency','Agence X');
--   insert into public.licenses(org_id,package_id,seats) select o.id,pk.id,25 from ... ;
-- Bundle TEF+TCF (package kind='bundle' avec grant bundle_products) : idem, en donnée.
