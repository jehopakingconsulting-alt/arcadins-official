-- ============================================================================
-- ARCADINS — Données de DÉMONSTRATION (staging uniquement, JAMAIS en production).
-- À exécuter APRÈS les migrations 0001, 0002, 0004. Insère un exemple par
-- parcours pour peupler le tableau de bord admin. Nettoyer après la démo.
-- ============================================================================

-- 1) Une demande de tutorat (parcours élève)
with req as (
  insert into public.tutoring_requests
    (first_name, last_name, email, skills, target_level, goal, status)
  values
    ('Démo', 'Élève', 'demo.eleve@example.test',
     array['comprehension-orale','expression-orale'], 'avance',
     'Atteindre CLB 8 avant décembre', 'submitted')
  returning id
)
insert into public.application_status_history
  (parcours, tutoring_request_id, from_status, to_status, event)
select 'tutoring', id, null, 'submitted', 'tutoring_request_submitted' from req;

-- 2) Une candidature tuteur (parcours tuteur)
with app as (
  insert into public.tutor_applications
    (first_name, last_name, email, skills, levels, experience, motivation, status)
  values
    ('Démo', 'Tuteur', 'demo.tuteur@example.test',
     array['expression-ecrite','comprehension-ecrite'], array['intermediaire','avance'],
     '3 ans d''enseignement du FLE', 'Accompagner les nouveaux arrivants', 'submitted')
  returning id
)
insert into public.application_status_history
  (parcours, tutor_application_id, from_status, to_status, event)
select 'tutor', id, null, 'submitted', 'tutor_application_submitted' from app;

-- 3) (Manuel) Désigner un administrateur pour accéder à /admin :
--    update public.profiles set role = 'admin' where id = '<uuid_compte_test>';

-- Nettoyage après démo :
--   delete from public.tutoring_requests  where email = 'demo.eleve@example.test';
--   delete from public.tutor_applications where email = 'demo.tuteur@example.test';
