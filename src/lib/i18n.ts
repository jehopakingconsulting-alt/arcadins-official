"use client";

import { createContext, useContext } from "react";

export type Lang = "fr" | "en" | "es" | "it" | "pt" | "de" | "ht";
export const LANGS: Lang[] = ["fr", "en", "es", "it", "pt", "de", "ht"];

export type Translations = Record<string, Record<Lang, string>>;

export const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "fr", setLang: () => {} });

export function useLang() {
  return useContext(LangContext);
}

export function t(translations: Record<Lang, string>, lang: Lang): string {
  return translations[lang] || translations.fr;
}

export const UI: Translations = {
  // Nav
  "nav.home": { fr: "Accueil", en: "Home", es: "Inicio", it: "Home", pt: "Início", de: "Start", ht: "Akèy" },
  "nav.tef": { fr: "TEF / TCF", en: "TEF / TCF", es: "TEF / TCF", it: "TEF / TCF", pt: "TEF / TCF", de: "TEF / TCF", ht: "TEF / TCF" },
  "nav.formations": { fr: "Formations", en: "Programs", es: "Programas", it: "Programmi", pt: "Programas", de: "Programme", ht: "Pwogram" },
  "nav.examens": { fr: "Examens", en: "Exams", es: "Exámenes", it: "Esami", pt: "Exames", de: "Prüfungen", ht: "Egzamen" },
  "nav.immigration": { fr: "Immigration", en: "Immigration", es: "Inmigración", it: "Immigrazione", pt: "Imigração", de: "Einwanderung", ht: "Imigrasyon" },
  "nav.tarifs": { fr: "Tarifs", en: "Pricing", es: "Precios", it: "Prezzi", pt: "Preços", de: "Preise", ht: "Pri" },
  "nav.temoignages": { fr: "Témoignages", en: "Reviews", es: "Testimonios", it: "Testimonianze", pt: "Depoimentos", de: "Erfahrungen", ht: "Temwayaj" },
  "nav.contact": { fr: "Contact", en: "Contact", es: "Contacto", it: "Contatto", pt: "Contato", de: "Kontakt", ht: "Kontak" },
  "nav.cta": { fr: "S'inscrire", en: "Enroll Now", es: "Inscribirse", it: "Iscriviti", pt: "Inscrever-se", de: "Einschreiben", ht: "Enskri" },

  // Hero
  "hero.badge": { fr: "Certifié Québec & Canada · 7 Langues · 47 Pays", en: "Certified Quebec & Canada · 7 Languages · 47 Countries", es: "Certificado Quebec & Canadá · 7 Idiomas · 47 Países", it: "Certificato Quebec & Canada · 7 Lingue · 47 Paesi", pt: "Certificado Quebec & Canadá · 7 Idiomas · 47 Países", de: "Zertifiziert Quebec & Kanada · 7 Sprachen · 47 Länder", ht: "Sètifye Quebec & Kanada · 7 Lang · 47 Peyi" },
  "hero.title1": { fr: "Formez-vous, intégrez-vous", en: "Train, integrate yourself", es: "Fórmate, intégrate", it: "Formati, intégrati", pt: "Forme-se, integre-se", de: "Bilden Sie sich weiter", ht: "Fòme w, entegre w" },
  "hero.title2": { fr: "et bâtissez votre", en: "and build your", es: "y construye tu", it: "e costruisci il tuo", pt: "e construa seu", de: "und bauen Sie Ihre", ht: "epi bati" },
  "hero.title3": { fr: "avenir au Canada", en: "future in Canada", es: "futuro en Canadá", it: "futuro in Canada", pt: "futuro no Canadá", de: "Zukunft in Kanada", ht: "avni ou nan Kanada" },
  "hero.desc": { fr: "ARCADINS Training Center accompagne les nouveaux arrivants, les étudiants et les professionnels vers la formation, l'intégration, l'emploi et la réussite au Canada.", en: "ARCADINS Training Center supports newcomers, students and professionals toward training, integration, employment and success in Canada.", es: "ARCADINS Training Center acompaña a los recién llegados, estudiantes y profesionales hacia la formación, integración, empleo y éxito en Canadá.", it: "ARCADINS Training Center accompagna i nuovi arrivati, gli studenti e i professionisti verso la formazione, l'integrazione e il successo in Canada.", pt: "ARCADINS Training Center apoia recém-chegados, estudantes e profissionais rumo à formação, integração, emprego e sucesso no Canadá.", de: "ARCADINS Training Center begleitet Neuzuwanderer, Studierende und Fachkräfte zu Ausbildung, Integration, Beschäftigung und Erfolg in Kanada.", ht: "ARCADINS Training Center akonpaye nouvo vini yo, etidyan ak pwofesyonèl yo nan fòmasyon, entegrasyon, travay ak reyisit nan Kanada." },
  "hero.cta1": { fr: "Commencer ma formation", en: "Start my training", es: "Iniciar mi formación", it: "Inizia la formazione", pt: "Começar formação", de: "Ausbildung starten", ht: "Kòmanse fòmasyon mwen" },
  "hero.cta2": { fr: "Découvrir nos programmes →", en: "Discover our programs →", es: "Descubrir programas →", it: "Scopri i programmi →", pt: "Descobrir programas →", de: "Programme entdecken →", ht: "Dekouvri pwogram nou yo →" },

  // Stats
  "stat.apprenants": { fr: "Apprenants formés", en: "Students trained", es: "Estudiantes", it: "Studenti", pt: "Estudantes", de: "Ausgebildete", ht: "Etidyan" },
  "stat.reussite": { fr: "Réussite TEF/TCF", en: "TEF/TCF success", es: "Tasa de éxito", it: "Successo TEF", pt: "Taxa aprovação", de: "Erfolgsquote", ht: "To siksè" },
  "stat.pays": { fr: "Pays couverts", en: "Countries", es: "Países", it: "Paesi", pt: "Países", de: "Länder", ht: "Peyi" },
  "stat.programmes": { fr: "Programmes certifiés", en: "Programs", es: "Programas", it: "Programmi", pt: "Programas", de: "Programme", ht: "Pwogram" },

  // Services
  "services.label": { fr: "Nos Services Phares", en: "Our Key Services", es: "Nuestros Servicios", it: "I Nostri Servizi", pt: "Nossos Serviços", de: "Unsere Dienste", ht: "Sèvis Nou Yo" },
  "services.title1": { fr: "Tout ce dont vous avez besoin,", en: "Everything you need,", es: "Todo lo que necesitas,", it: "Tutto ciò di cui hai bisogno,", pt: "Tudo o que você precisa,", de: "Alles, was Sie brauchen,", ht: "Tout sa ou bezwen," },
  "services.title2": { fr: "en un seul endroit", en: "in one place", es: "en un solo lugar", it: "in un unico posto", pt: "em um só lugar", de: "an einem Ort", ht: "nan yon sèl kote" },

  // CTA
  "cta.start_tef": { fr: "Commencer le TEF / TCF", en: "Start TEF / TCF", es: "Iniciar TEF / TCF", it: "Inizia TEF / TCF", pt: "Começar TEF / TCF", de: "TEF / TCF starten", ht: "Kòmanse TEF / TCF" },
  "cta.see_formations": { fr: "Voir les formations →", en: "See programs →", es: "Ver programas →", it: "Vedi programmi →", pt: "Ver programas →", de: "Programme sehen →", ht: "Wè pwogram yo →" },
  "cta.ready": { fr: "Prêt à commencer votre parcours vers", en: "Ready to start your journey to", es: "Listo para comenzar tu camino hacia", it: "Pronto a iniziare il tuo percorso verso", pt: "Pronto para começar sua jornada para", de: "Bereit, Ihre Reise nach", ht: "Pare pou kòmanse vwayaj ou nan" },
  "cta.canada": { fr: "le Canada", en: "Canada", es: "Canadá", it: "il Canada", pt: "o Canadá", de: "Kanada zu beginnen", ht: "Kanada" },
  "cta.join": { fr: "Rejoignez 12 400+ apprenants de 47 pays qui ont fait confiance à ARCADINS.", en: "Join 12,400+ learners from 47 countries who trusted ARCADINS.", es: "Únase a 12.400+ estudiantes de 47 países que confiaron en ARCADINS.", it: "Unisciti a 12.400+ studenti di 47 paesi che si sono affidati ad ARCADINS.", pt: "Junte-se a 12.400+ alunos de 47 países que confiaram na ARCADINS.", de: "Schließen Sie sich 12.400+ Lernenden aus 47 Ländern an.", ht: "Rejwenn 12 400+ etidyan nan 47 peyi ki fè ARCADINS konfyans." },

  // Video section
  "video.label": { fr: "Formations & Immigration · Ressources vidéo", en: "Training & Immigration · Video Resources", es: "Formación & Inmigración · Recursos de video", it: "Formazione & Immigrazione · Risorse video", pt: "Formação & Imigração · Recursos de vídeo", de: "Ausbildung & Einwanderung · Videoressourcen", ht: "Fòmasyon & Imigrasyon · Resous videyo" },
  "video.title1": { fr: "Apprenez, préparez-vous,", en: "Learn, prepare yourself,", es: "Aprende, prepárate,", it: "Impara, preparati,", pt: "Aprenda, prepare-se,", de: "Lernen, bereiten Sie sich vor,", ht: "Aprann, prepare w," },
  "video.title2": { fr: "réussissez au Canada", en: "succeed in Canada", es: "triunfa en Canadá", it: "riuscite in Canada", pt: "tenha sucesso no Canadá", de: "Erfolg in Kanada", ht: "reyisi nan Kanada" },
  "video.desc": { fr: "Nos ressources vidéo couvrent les tests TEF/TCF, les démarches d'immigration et les formations professionnelles.", en: "Our video resources cover TEF/TCF tests, immigration procedures and professional training.", es: "Nuestros recursos de video cubren los exámenes TEF/TCF, los trámites de inmigración y la formación profesional.", it: "Le nostre risorse video coprono i test TEF/TCF, le procedure di immigrazione e la formazione professionale.", pt: "Nossos recursos de vídeo cobrem os testes TEF/TCF, os procedimentos de imigração e a formação profissional.", de: "Unsere Videoressourcen decken TEF/TCF-Tests, Einwanderungsverfahren und Berufsausbildung ab.", ht: "Resous videyo nou yo kouvri tès TEF/TCF, pwosedi imigrasyon ak fòmasyon pwofesyonèl." },

  // Stats bar
  "stats.apprenants": { fr: "Apprenants", en: "Students", es: "Estudiantes", it: "Studenti", pt: "Estudantes", de: "Studierende", ht: "Etidyan" },
  "stats.pays": { fr: "Pays", en: "Countries", es: "Países", it: "Paesi", pt: "Países", de: "Länder", ht: "Peyi" },
  "stats.reussite": { fr: "Réussite TEF", en: "TEF Success", es: "Éxito TEF", it: "Successo TEF", pt: "Aprovação TEF", de: "TEF Erfolg", ht: "Siksè TEF" },
  "stats.langues": { fr: "Langues", en: "Languages", es: "Idiomas", it: "Lingue", pt: "Idiomas", de: "Sprachen", ht: "Lang" },
  "stats.programmes": { fr: "Programmes", en: "Programs", es: "Programas", it: "Programmi", pt: "Programas", de: "Programme", ht: "Pwogram" },
  "stats.reconnu": { fr: "Reconnu par :", en: "Recognized by:", es: "Reconocido por:", it: "Riconosciuto da:", pt: "Reconhecido por:", de: "Anerkannt von:", ht: "Rekonèt pa :" },

  // Services cards
  "svc.tests.cat": { fr: "Tests officiels", en: "Official Tests", es: "Tests oficiales", it: "Test ufficiali", pt: "Testes oficiais", de: "Offizielle Tests", ht: "Tès ofisyèl" },
  "svc.tests.name": { fr: "TEF / TCF Canada", en: "TEF / TCF Canada", es: "TEF / TCF Canadá", it: "TEF / TCF Canada", pt: "TEF / TCF Canadá", de: "TEF / TCF Kanada", ht: "TEF / TCF Kanada" },
  "svc.tests.desc": { fr: "Préparation complète aux tests de langue officielle pour l'immigration canadienne.", en: "Complete preparation for official language tests for Canadian immigration.", es: "Preparación completa para los tests de idioma oficial para la inmigración canadiense.", it: "Preparazione completa ai test di lingua ufficiale per l'immigrazione canadese.", pt: "Preparação completa para os testes de idioma oficial para a imigração canadense.", de: "Vollständige Vorbereitung auf offizielle Sprachtests für die kanadische Einwanderung.", ht: "Preparasyon konplè pou tès lang ofisyèl pou imigrasyon kanadyen." },
  "svc.formations.cat": { fr: "28 Programmes", en: "28 Programs", es: "28 Programas", it: "28 Programmi", pt: "28 Programas", de: "28 Programme", ht: "28 Pwogram" },
  "svc.formations.name": { fr: "Formations Certifiées", en: "Certified Training", es: "Formación Certificada", it: "Formazione Certificata", pt: "Formação Certificada", de: "Zertifizierte Ausbildung", ht: "Fòmasyon Sètifye" },
  "svc.formations.desc": { fr: "Leadership, Finance, Tech, Santé, Immigration — certifiés Québec et international.", en: "Leadership, Finance, Tech, Health, Immigration — certified in Quebec and internationally.", es: "Liderazgo, Finanzas, Tech, Salud, Inmigración — certificados en Quebec e internacional.", it: "Leadership, Finanza, Tech, Salute, Immigrazione — certificati in Quebec e a livello internazionale.", pt: "Liderança, Finanças, Tech, Saúde, Imigração — certificados em Quebec e internacionalmente.", de: "Führung, Finanzen, Tech, Gesundheit, Einwanderung — in Quebec und international zertifiziert.", ht: "Lidèchip, Finans, Tech, Sante, Imigrasyon — sètifye nan Quebec ak entènasyonal." },
  "svc.examens.cat": { fr: "100% en ligne", en: "100% Online", es: "100% en línea", it: "100% Online", pt: "100% Online", de: "100% Online", ht: "100% sou entènèt" },
  "svc.examens.name": { fr: "Examens & Certificats", en: "Exams & Certificates", es: "Exámenes & Certificados", it: "Esami & Certificati", pt: "Exames & Certificados", de: "Prüfungen & Zertifikate", ht: "Egzamen & Sètifika" },
  "svc.examens.desc": { fr: "Passez votre examen et recevez votre certificat numérique instantanément.", en: "Take your exam and receive your digital certificate instantly.", es: "Realice su examen y reciba su certificado digital al instante.", it: "Sostenete il vostro esame e ricevete il vostro certificato digitale istantaneamente.", pt: "Faça seu exame e receba seu certificado digital instantaneamente.", de: "Legen Sie Ihre Prüfung ab und erhalten Sie Ihr digitales Zertifikat sofort.", ht: "Pase egzamen ou epi resevwa sètifika dijital ou imedyatman." },
  "svc.immigration.cat": { fr: "Partenaires IRCC", en: "IRCC Partners", es: "Socios IRCC", it: "Partner IRCC", pt: "Parceiros IRCC", de: "IRCC Partner", ht: "Patnè IRCC" },
  "svc.immigration.name": { fr: "Immigration Canada", en: "Immigration Canada", es: "Inmigración Canadá", it: "Immigrazione Canada", pt: "Imigração Canadá", de: "Einwanderung Kanada", ht: "Imigrasyon Kanada" },
  "svc.immigration.desc": { fr: "Accompagnement complet de la préparation linguistique jusqu'à votre installation.", en: "Complete support from language preparation to your settlement.", es: "Acompañamiento completo desde la preparación lingüística hasta su instalación.", it: "Accompagnamento completo dalla preparazione linguistica al vostro insediamento.", pt: "Acompanhamento completo desde a preparação linguística até a sua instalação.", de: "Vollständige Begleitung von der Sprachvorbereitung bis zur Niederlassung.", ht: "Akonpayeman konplè depi preparasyon lang jiska enstalasyon ou." },

  // Footer
  "footer.desc": { fr: "Plateforme internationale de formation professionnelle certifiée, spécialisée dans la préparation aux tests de français pour l'immigration canadienne. 47 pays · 7 langues · 28 programmes.", en: "International certified professional training platform, specialized in French test preparation for Canadian immigration. 47 countries · 7 languages · 28 programs.", es: "Plataforma internacional de formación profesional certificada, especializada en la preparación de exámenes de francés para la inmigración canadiense. 47 países · 7 idiomas · 28 programas.", it: "Piattaforma internazionale di formazione professionale certificata, specializzata nella preparazione ai test di francese per l'immigrazione canadese. 47 paesi · 7 lingue · 28 programmi.", pt: "Plataforma internacional de formação profissional certificada, especializada na preparação para testes de francês para imigração canadense. 47 países · 7 idiomas · 28 programas.", de: "Internationale zertifizierte Berufsbildungsplattform, spezialisiert auf die Vorbereitung auf Französischtests für die kanadische Einwanderung. 47 Länder · 7 Sprachen · 28 Programme.", ht: "Platfòm entènasyonal fòmasyon pwofesyonèl sètifye, espesyalize nan preparasyon tès fransè pou imigrasyon kanadyen. 47 peyi · 7 lang · 28 pwogram." },
  "footer.formations": { fr: "Formations", en: "Programs", es: "Programas", it: "Programmi", pt: "Programas", de: "Programme", ht: "Pwogram" },
  "footer.services": { fr: "Services", en: "Services", es: "Servicios", it: "Servizi", pt: "Serviços", de: "Dienste", ht: "Sèvis" },
  "footer.contact": { fr: "Contact", en: "Contact", es: "Contacto", it: "Contatto", pt: "Contato", de: "Kontakt", ht: "Kontak" },
  "footer.copyright": { fr: "© 2025 ARCADINS Training Center — Tous droits réservés", en: "© 2025 ARCADINS Training Center — All rights reserved", es: "© 2025 ARCADINS Training Center — Todos los derechos reservados", it: "© 2025 ARCADINS Training Center — Tutti i diritti riservati", pt: "© 2025 ARCADINS Training Center — Todos os direitos reservados", de: "© 2025 ARCADINS Training Center — Alle Rechte vorbehalten", ht: "© 2025 ARCADINS Training Center — Tout dwa rezève" },
  "footer.whatsapp": { fr: "WhatsApp Business", en: "WhatsApp Business", es: "WhatsApp Business", it: "WhatsApp Business", pt: "WhatsApp Business", de: "WhatsApp Business", ht: "WhatsApp Business" },
  "footer.privacy": { fr: "Politique de confidentialité", en: "Privacy Policy", es: "Política de privacidad", it: "Informativa sulla privacy", pt: "Política de privacidade", de: "Datenschutzrichtlinie", ht: "Politik konfidansyalite" },
  "footer.terms": { fr: "Conditions d'utilisation", en: "Terms of Use", es: "Términos de uso", it: "Condizioni d'uso", pt: "Termos de uso", de: "Nutzungsbedingungen", ht: "Kondisyon itilizasyon" },
  "footer.seal1": { fr: "🍁 Certifié Canada", en: "🍁 Certified Canada", es: "🍁 Certificado Canadá", it: "🍁 Certificato Canada", pt: "🍁 Certificado Canadá", de: "🍁 Zertifiziert Kanada", ht: "🍁 Sètifye Kanada" },
  "footer.seal2": { fr: "🎓 Emploi Québec", en: "🎓 Emploi Québec", es: "🎓 Emploi Québec", it: "🎓 Emploi Québec", pt: "🎓 Emploi Québec", de: "🎓 Emploi Québec", ht: "🎓 Emploi Québec" },
  "footer.seal3": { fr: "✓ ISO 9001", en: "✓ ISO 9001", es: "✓ ISO 9001", it: "✓ ISO 9001", pt: "✓ ISO 9001", de: "✓ ISO 9001", ht: "✓ ISO 9001" },

  // Footer links
  "fl.leadership": { fr: "Leadership & Gestion", en: "Leadership & Management", es: "Liderazgo & Gestión", it: "Leadership & Gestione", pt: "Liderança & Gestão", de: "Führung & Management", ht: "Lidèchip & Jesyon" },
  "fl.epe": { fr: "Éducatrice EPE", en: "Early Childhood Educator", es: "Educadora EPE", it: "Educatrice EPE", pt: "Educadora EPE", de: "Frühkindliche Erzieherin", ht: "Edikatris EPE" },
  "fl.pab": { fr: "PAB Québec", en: "PAB Quebec", es: "PAB Quebec", it: "PAB Quebec", pt: "PAB Quebec", de: "PAB Quebec", ht: "PAB Quebec" },
  "fl.informatique": { fr: "Informatique & IA", en: "IT & AI", es: "Informática & IA", it: "Informatica & IA", pt: "Informática & IA", de: "Informatik & KI", ht: "Enfòmatik & IA" },
  "fl.dette": { fr: "Famille Sans Dette", en: "Debt-Free Family", es: "Familia Sin Deudas", it: "Famiglia Senza Debiti", pt: "Família Sem Dívidas", de: "Familie ohne Schulden", ht: "Fanmi San Dèt" },
  "fl.examens": { fr: "Examens en ligne", en: "Online Exams", es: "Exámenes en línea", it: "Esami online", pt: "Exames online", de: "Online-Prüfungen", ht: "Egzamen sou entènèt" },
  "fl.certificats": { fr: "Certificats numériques", en: "Digital Certificates", es: "Certificados digitales", it: "Certificati digitali", pt: "Certificados digitais", de: "Digitale Zertifikate", ht: "Sètifika dijital" },
  "fl.ircc": { fr: "Dossier IRCC", en: "IRCC File", es: "Expediente IRCC", it: "Pratica IRCC", pt: "Dossiê IRCC", de: "IRCC-Akte", ht: "Dosye IRCC" },
  "fl.emploi": { fr: "Emploi Québec", en: "Employment Quebec", es: "Empleo Quebec", it: "Lavoro Quebec", pt: "Emprego Quebec", de: "Beschäftigung Quebec", ht: "Travay Quebec" },
  "fl.tarifs": { fr: "Nos tarifs", en: "Our Pricing", es: "Nuestros precios", it: "I nostri prezzi", pt: "Nossos preços", de: "Unsere Preise", ht: "Pri nou yo" },
  "fl.contacter": { fr: "Nous contacter", en: "Contact Us", es: "Contáctenos", it: "Contattaci", pt: "Fale conosco", de: "Kontaktieren Sie uns", ht: "Kontakte nou" },

  // ═══ TEF PAGE ═══
  "tef.label": { fr: "Tests Officiels · Immigration Canada", en: "Official Tests · Immigration Canada", es: "Tests Oficiales · Inmigración Canadá", it: "Test Ufficiali · Immigrazione Canada", pt: "Testes Oficiais · Imigração Canadá", de: "Offizielle Tests · Einwanderung Kanada", ht: "Tès Ofisyèl · Imigrasyon Kanada" },
  "tef.title1": { fr: "Préparez votre", en: "Prepare your", es: "Prepara tu", it: "Prepara il tuo", pt: "Prepare seu", de: "Bereiten Sie Ihren", ht: "Prepare" },
  "tef.title2": { fr: "Test de Français", en: "French Test", es: "Test de Francés", it: "Test di Francese", pt: "Teste de Francês", de: "Französischtest vor", ht: "Tès Fransè ou" },
  "tef.title3": { fr: "pour immigrer au Canada", en: "to immigrate to Canada", es: "para inmigrar a Canadá", it: "per immigrare in Canada", pt: "para imigrar ao Canadá", de: "für die Einwanderung nach Kanada", ht: "pou imigre nan Kanada" },
  "tef.desc": { fr: "Les tests TEF Canada et TCF Canada sont obligatoires pour la résidence permanente, la citoyenneté et les programmes d'immigration provinciaux. Notre taux de réussite est de", en: "TEF Canada and TCF Canada tests are mandatory for permanent residence, citizenship and provincial immigration programs. Our success rate is", es: "Los tests TEF Canadá y TCF Canadá son obligatorios para la residencia permanente, la ciudadanía y los programas de inmigración provinciales. Nuestra tasa de éxito es del", it: "I test TEF Canada e TCF Canada sono obbligatori per la residenza permanente, la cittadinanza e i programmi di immigrazione provinciali. Il nostro tasso di successo è del", pt: "Os testes TEF Canadá e TCF Canadá são obrigatórios para residência permanente, cidadania e programas de imigração provinciais. Nossa taxa de aprovação é de", de: "TEF Kanada und TCF Kanada Tests sind obligatorisch für die dauerhafte Aufenthaltsgenehmigung, Staatsbürgerschaft und provinzielle Einwanderungsprogramme. Unsere Erfolgsquote beträgt", ht: "Tès TEF Kanada ak TCF Kanada obligatwa pou rezidans pèmanan, sitwayènte ak pwogram imigrasyon pwovensyal. To siksè nou se" },
  "tef.panel.title": { fr: "Notre Préparation Complète", en: "Our Complete Preparation", es: "Nuestra Preparación Completa", it: "La Nostra Preparazione Completa", pt: "Nossa Preparação Completa", de: "Unsere Komplette Vorbereitung", ht: "Preparasyon Konplè Nou" },
  "tef.panel.sub": { fr: "Méthode exclusive ARCADINS — Taux de réussite 96%", en: "Exclusive ARCADINS method — 96% success rate", es: "Método exclusivo ARCADINS — Tasa de éxito 96%", it: "Metodo esclusivo ARCADINS — Tasso di successo 96%", pt: "Método exclusivo ARCADINS — Taxa de aprovação 96%", de: "Exklusive ARCADINS-Methode — 96% Erfolgsquote", ht: "Metòd eksklizif ARCADINS — To siksè 96%" },
  "tef.panel.cta": { fr: "Commencer ma préparation TEF →", en: "Start my TEF preparation →", es: "Iniciar mi preparación TEF →", it: "Inizia la preparazione TEF →", pt: "Começar preparação TEF →", de: "TEF-Vorbereitung starten →", ht: "Kòmanse preparasyon TEF mwen →" },
  "tef.panel.how": { fr: "Comment se déroule l'examen en ligne ?", en: "How does the online exam work?", es: "¿Cómo funciona el examen en línea?", it: "Come funziona l'esame online?", pt: "Como funciona o exame online?", de: "Wie funktioniert die Online-Prüfung?", ht: "Kijan egzamen sou entènèt la fèt?" },

  // ═══ FORMATIONS PAGE ═══
  "form.label": { fr: "28 Programmes · Certifiés Québec & Canada", en: "28 Programs · Certified Quebec & Canada", es: "28 Programas · Certificados Quebec & Canadá", it: "28 Programmi · Certificati Quebec & Canada", pt: "28 Programas · Certificados Quebec & Canadá", de: "28 Programme · Zertifiziert Quebec & Kanada", ht: "28 Pwogram · Sètifye Quebec & Kanada" },
  "form.title1": { fr: "Formations", en: "Training", es: "Formación", it: "Formazione", pt: "Formação", de: "Ausbildung", ht: "Fòmasyon" },
  "form.title2": { fr: "certifiées", en: "certified", es: "certificada", it: "certificata", pt: "certificada", de: "zertifiziert", ht: "sètifye" },
  "form.title3": { fr: "reconnues au Québec et à l'international", en: "recognized in Quebec and internationally", es: "reconocida en Quebec e internacionalmente", it: "riconosciuta in Quebec e a livello internazionale", pt: "reconhecida em Quebec e internacionalmente", de: "anerkannt in Quebec und international", ht: "rekonèt nan Quebec ak entènasyonal" },
  "form.all": { fr: "Tous", en: "All", es: "Todos", it: "Tutti", pt: "Todos", de: "Alle", ht: "Tout" },
  "form.see": { fr: "Voir →", en: "View →", es: "Ver →", it: "Vedi →", pt: "Ver →", de: "Ansehen →", ht: "Wè →" },

  // ═══ EXAMENS PAGE ═══
  "exam.label": { fr: "Plateforme LMS Propriétaire", en: "Proprietary LMS Platform", es: "Plataforma LMS Propietaria", it: "Piattaforma LMS Proprietaria", pt: "Plataforma LMS Proprietária", de: "Eigene LMS-Plattform", ht: "Platfòm LMS Pwopriyetè" },
  "exam.title1": { fr: "Passez vos examens en ligne,", en: "Take your exams online,", es: "Realice sus exámenes en línea,", it: "Sostenete i vostri esami online,", pt: "Faça seus exames online,", de: "Legen Sie Ihre Prüfungen online ab,", ht: "Pase egzamen ou sou entènèt," },
  "exam.title2": { fr: "recevez votre", en: "receive your", es: "reciba su", it: "ricevete il vostro", pt: "receba seu", de: "erhalten Sie Ihr", ht: "resevwa" },
  "exam.title3": { fr: "certificat immédiatement", en: "certificate immediately", es: "certificado inmediatamente", it: "certificato immediatamente", pt: "certificado imediatamente", de: "Zertifikat sofort", ht: "sètifika ou imedyatman" },
  "exam.desc": { fr: "Plateforme sécurisée avec proctoring IA, anti-triche, résultats instantanés et certificats numériques avec QR code de vérification.", en: "Secure platform with AI proctoring, anti-cheat, instant results and digital certificates with QR verification code.", es: "Plataforma segura con supervisión IA, anti-trampas, resultados instantáneos y certificados digitales con código QR de verificación.", it: "Piattaforma sicura con proctoring IA, anti-frode, risultati istantanei e certificati digitali con codice QR di verifica.", pt: "Plataforma segura com proctoring IA, anti-fraude, resultados instantâneos e certificados digitais com código QR de verificação.", de: "Sichere Plattform mit KI-Proctoring, Anti-Betrug, sofortige Ergebnisse und digitale Zertifikate mit QR-Verifizierungscode.", ht: "Platfòm sekirize ak proctoring IA, anti-trich, rezilta imedya ak sètifika dijital ak kòd QR verifikasyon." },

  // ═══ IMMIGRATION PAGE ═══
  "imm.label": { fr: "Partenaires & Accompagnement", en: "Partners & Support", es: "Socios & Acompañamiento", it: "Partner & Accompagnamento", pt: "Parceiros & Acompanhamento", de: "Partner & Begleitung", ht: "Patnè & Akonpayeman" },
  "imm.title1": { fr: "Votre chemin vers le", en: "Your path to", es: "Tu camino hacia", it: "Il tuo percorso verso il", pt: "Seu caminho para o", de: "Ihr Weg nach", ht: "Chemen ou nan" },
  "imm.title2": { fr: "Canada", en: "Canada", es: "Canadá", it: "Canada", pt: "Canadá", de: "Kanada", ht: "Kanada" },
  "imm.title3": { fr: "commence ici", en: "starts here", es: "comienza aquí", it: "inizia qui", pt: "começa aqui", de: "beginnt hier", ht: "kòmanse isit" },
  "imm.desc": { fr: "De la préparation linguistique jusqu'à votre installation au Québec, Manitoba ou Ontario — ARCADINS Training Center vous accompagne à chaque étape.", en: "From language preparation to your settlement in Quebec, Manitoba or Ontario — ARCADINS Training Center supports you every step of the way.", es: "Desde la preparación lingüística hasta su instalación en Quebec, Manitoba u Ontario — ARCADINS Training Center le acompaña en cada paso.", it: "Dalla preparazione linguistica al vostro insediamento in Quebec, Manitoba o Ontario — ARCADINS Training Center vi accompagna in ogni fase.", pt: "Da preparação linguística até sua instalação em Quebec, Manitoba ou Ontario — ARCADINS Training Center acompanha você em cada etapa.", de: "Von der Sprachvorbereitung bis zu Ihrer Niederlassung in Quebec, Manitoba oder Ontario — ARCADINS Training Center begleitet Sie bei jedem Schritt.", ht: "Depi preparasyon lang jiska enstalasyon ou nan Quebec, Manitoba oswa Ontario — ARCADINS Training Center akonpaye ou nan chak etap." },
  "imm.cta": { fr: "Consultation gratuite →", en: "Free consultation →", es: "Consulta gratuita →", it: "Consulenza gratuita →", pt: "Consulta gratuita →", de: "Kostenlose Beratung →", ht: "Konsiltasyon gratis →" },
  "imm.panel.title": { fr: "Programmes d'immigration ciblés", en: "Targeted immigration programs", es: "Programas de inmigración específicos", it: "Programmi di immigrazione mirati", pt: "Programas de imigração direcionados", de: "Gezielte Einwanderungsprogramme", ht: "Pwogram imigrasyon sible" },

  // ═══ TEMOIGNAGES PAGE ═══
  "testi.label": { fr: "Témoignages · 47 pays", en: "Testimonials · 47 countries", es: "Testimonios · 47 países", it: "Testimonianze · 47 paesi", pt: "Depoimentos · 47 países", de: "Erfahrungen · 47 Länder", ht: "Temwayaj · 47 peyi" },
  "testi.title1": { fr: "Ce que disent nos", en: "What our", es: "Lo que dicen nuestros", it: "Cosa dicono i nostri", pt: "O que dizem nossos", de: "Was unsere", ht: "Sa" },
  "testi.title2": { fr: "diplômés", en: "graduates say", es: "graduados", it: "diplomati", pt: "formados", de: "Absolventen sagen", ht: "diplome yo di" },

  // ═══ CONTACT PAGE ═══
  "contact.label": { fr: "Nous contacter", en: "Contact Us", es: "Contáctenos", it: "Contattaci", pt: "Fale conosco", de: "Kontakt", ht: "Kontakte nou" },
  "contact.title1": { fr: "Parlons de", en: "Let's talk about", es: "Hablemos de", it: "Parliamo del", pt: "Vamos falar sobre", de: "Lassen Sie uns über", ht: "Ann pale de" },
  "contact.title2": { fr: "votre", en: "your", es: "su", it: "vostro", pt: "seu", de: "Ihr", ht: "ou" },
  "contact.title3": { fr: "projet", en: "project", es: "proyecto", it: "progetto", pt: "projeto", de: "Projekt sprechen", ht: "pwojè" },
  "contact.desc": { fr: "Notre équipe multilingue est disponible pour vous orienter vers le programme et le forfait les mieux adaptés à votre objectif.", en: "Our multilingual team is available to guide you toward the program and package best suited to your goal.", es: "Nuestro equipo multilingüe está disponible para orientarle hacia el programa y el plan más adecuados a su objetivo.", it: "Il nostro team multilingue è disponibile per orientarvi verso il programma e il pacchetto più adatti al vostro obiettivo.", pt: "Nossa equipe multilíngue está disponível para orientá-lo ao programa e pacote mais adequados ao seu objetivo.", de: "Unser mehrsprachiges Team steht Ihnen zur Verfügung, um Sie zum am besten geeigneten Programm und Paket zu beraten.", ht: "Ekip miltileng nou an disponib pou gide ou nan pwogram ak fòfè ki pi adapte ak objektif ou." },
  "contact.form.title": { fr: "Demande de renseignements", en: "Information Request", es: "Solicitud de información", it: "Richiesta di informazioni", pt: "Pedido de informações", de: "Informationsanfrage", ht: "Demann enfòmasyon" },
  "contact.form.first": { fr: "Prénom *", en: "First Name *", es: "Nombre *", it: "Nome *", pt: "Nome *", de: "Vorname *", ht: "Prenon *" },
  "contact.form.last": { fr: "Nom *", en: "Last Name *", es: "Apellido *", it: "Cognome *", pt: "Sobrenome *", de: "Nachname *", ht: "Non *" },
  "contact.form.email": { fr: "Courriel *", en: "Email *", es: "Correo *", it: "Email *", pt: "Email *", de: "E-Mail *", ht: "Imèl *" },
  "contact.form.country": { fr: "Pays de résidence", en: "Country of residence", es: "País de residencia", it: "Paese di residenza", pt: "País de residência", de: "Wohnsitzland", ht: "Peyi rezidans" },
  "contact.form.interest": { fr: "Je suis intéressé(e) par", en: "I am interested in", es: "Estoy interesado/a en", it: "Sono interessato/a a", pt: "Estou interessado/a em", de: "Ich interessiere mich für", ht: "Mwen enterese nan" },
  "contact.form.message": { fr: "Message", en: "Message", es: "Mensaje", it: "Messaggio", pt: "Mensagem", de: "Nachricht", ht: "Mesaj" },
  "contact.form.submit": { fr: "Envoyer ma demande →", en: "Send my request →", es: "Enviar mi solicitud →", it: "Invia la mia richiesta →", pt: "Enviar meu pedido →", de: "Anfrage senden →", ht: "Voye demann mwen →" },
  "contact.form.sent": { fr: "✓ Envoyé — Réponse sous 24h", en: "✓ Sent — Response within 24h", es: "✓ Enviado — Respuesta en 24h", it: "✓ Inviato — Risposta entro 24h", pt: "✓ Enviado — Resposta em 24h", de: "✓ Gesendet — Antwort innerhalb 24h", ht: "✓ Voye — Repons nan 24è" },
  "contact.form.sending": { fr: "Envoi en cours...", en: "Sending...", es: "Enviando...", it: "Invio in corso...", pt: "Enviando...", de: "Wird gesendet...", ht: "Ap voye..." },
  "contact.form.note": { fr: "Réponse garantie sous 24h · Consultation initiale gratuite", en: "Guaranteed response within 24h · Free initial consultation", es: "Respuesta garantizada en 24h · Consulta inicial gratuita", it: "Risposta garantita entro 24h · Consulenza iniziale gratuita", pt: "Resposta garantida em 24h · Consulta inicial gratuita", de: "Garantierte Antwort innerhalb 24h · Kostenlose Erstberatung", ht: "Repons garanti nan 24è · Premye konsiltasyon gratis" },
  "contact.form.address": { fr: "Adresse", en: "Address", es: "Dirección", it: "Indirizzo", pt: "Endereço", de: "Adresse", ht: "Adrès" },
  "contact.form.phone": { fr: "Téléphone", en: "Phone", es: "Teléfono", it: "Telefono", pt: "Telefone", de: "Telefon", ht: "Telefòn" },

  // ═══ TARIFS PAGE ═══
  "tarifs.label": { fr: "Tarifs & Forfaits", en: "Pricing & Plans", es: "Precios & Planes", it: "Prezzi & Piani", pt: "Preços & Planos", de: "Preise & Pläne", ht: "Pri & Plan" },
  "tarifs.title1": { fr: "Des plans adaptés à", en: "Plans adapted to", es: "Planes adaptados a", it: "Piani adattati a", pt: "Planos adaptados a", de: "Pläne angepasst an", ht: "Plan adapte pou" },
  "tarifs.title2": { fr: "chaque", en: "every", es: "cada", it: "ogni", pt: "cada", de: "jede", ht: "chak" },
  "tarifs.title3": { fr: "parcours", en: "journey", es: "camino", it: "percorso", pt: "jornada", de: "Weg", ht: "pous" },
  "tarifs.desc": { fr: "Paiements acceptés en CAD, USD, EUR et paiements mobiles africains.", en: "Payments accepted in CAD, USD, EUR and African mobile payments.", es: "Pagos aceptados en CAD, USD, EUR y pagos móviles africanos.", it: "Pagamenti accettati in CAD, USD, EUR e pagamenti mobili africani.", pt: "Pagamentos aceitos em CAD, USD, EUR e pagamentos móveis africanos.", de: "Zahlungen akzeptiert in CAD, USD, EUR und afrikanische mobile Zahlungen.", ht: "Peman aksepte an CAD, USD, EUR ak peman mobil afriken." },
  "tarifs.monthly": { fr: "Mensuel", en: "Monthly", es: "Mensual", it: "Mensile", pt: "Mensal", de: "Monatlich", ht: "Chak mwa" },
  "tarifs.annual": { fr: "Annuel", en: "Annual", es: "Anual", it: "Annuale", pt: "Anual", de: "Jährlich", ht: "Chak ane" },
  "tarifs.payments": { fr: "Modes de paiement acceptés", en: "Accepted payment methods", es: "Métodos de pago aceptados", it: "Metodi di pagamento accettati", pt: "Métodos de pagamento aceitos", de: "Akzeptierte Zahlungsmethoden", ht: "Metòd peman aksepte" },
  "tarifs.custom": { fr: "Sur mesure", en: "Custom", es: "A medida", it: "Su misura", pt: "Sob medida", de: "Maßgeschneidert", ht: "Sou mezir" },
  "tarifs.month": { fr: "/mois", en: "/month", es: "/mes", it: "/mese", pt: "/mês", de: "/Monat", ht: "/mwa" },

  // ═══ AUTH ═══
  "auth.login": { fr: "Connexion", en: "Sign In", es: "Iniciar sesión", it: "Accesso", pt: "Entrar", de: "Anmelden", ht: "Konekte" },
  "auth.login.desc": { fr: "Accédez à votre espace étudiant ARCADINS", en: "Access your ARCADINS student space", es: "Acceda a su espacio de estudiante ARCADINS", it: "Accedi al tuo spazio studente ARCADINS", pt: "Acesse seu espaço de estudante ARCADINS", de: "Zugang zu Ihrem ARCADINS-Studienbereich", ht: "Aksede espas etidyan ARCADINS ou" },
  "auth.login.btn": { fr: "Se connecter →", en: "Sign in →", es: "Iniciar sesión →", it: "Accedi →", pt: "Entrar →", de: "Anmelden →", ht: "Konekte →" },
  "auth.login.no_account": { fr: "Pas encore de compte ?", en: "Don't have an account?", es: "¿No tiene cuenta?", it: "Non hai un account?", pt: "Não tem conta?", de: "Noch kein Konto?", ht: "Pa gen kont?" },
  "auth.register": { fr: "Créer un compte", en: "Create Account", es: "Crear cuenta", it: "Crea account", pt: "Criar conta", de: "Konto erstellen", ht: "Kreye kont" },
  "auth.register.desc": { fr: "Rejoignez 12 400+ apprenants de 47 pays", en: "Join 12,400+ learners from 47 countries", es: "Únase a 12.400+ estudiantes de 47 países", it: "Unisciti a 12.400+ studenti di 47 paesi", pt: "Junte-se a 12.400+ alunos de 47 países", de: "Werden Sie Teil von 12.400+ Lernenden aus 47 Ländern", ht: "Rejwenn 12 400+ etidyan nan 47 peyi" },
  "auth.register.btn": { fr: "Créer mon compte →", en: "Create my account →", es: "Crear mi cuenta →", it: "Crea il mio account →", pt: "Criar minha conta →", de: "Mein Konto erstellen →", ht: "Kreye kont mwen →" },
  "auth.register.has_account": { fr: "Déjà inscrit ?", en: "Already registered?", es: "¿Ya registrado?", it: "Già registrato?", pt: "Já cadastrado?", de: "Bereits registriert?", ht: "Deja enskri?" },
  "auth.password": { fr: "Mot de passe", en: "Password", es: "Contraseña", it: "Password", pt: "Senha", de: "Passwort", ht: "Modpas" },

  // ═══ DASHBOARD ═══
  "dash.label": { fr: "Espace Étudiant", en: "Student Space", es: "Espacio Estudiante", it: "Area Studente", pt: "Espaço do Aluno", de: "Studienbereich", ht: "Espas Etidyan" },
  "dash.welcome": { fr: "Bienvenue,", en: "Welcome,", es: "Bienvenido,", it: "Benvenuto,", pt: "Bem-vindo,", de: "Willkommen,", ht: "Byenveni," },
  "dash.manage": { fr: "Gérez vos formations, examens et certificats.", en: "Manage your training, exams and certificates.", es: "Gestione sus formaciones, exámenes y certificados.", it: "Gestisci le tue formazioni, esami e certificati.", pt: "Gerencie suas formações, exames e certificados.", de: "Verwalten Sie Ihre Ausbildungen, Prüfungen und Zertifikate.", ht: "Jere fòmasyon, egzamen ak sètifika ou yo." },
  "dash.start": { fr: "Commencez votre parcours", en: "Start your journey", es: "Comience su camino", it: "Inizia il tuo percorso", pt: "Comece sua jornada", de: "Starten Sie Ihren Weg", ht: "Kòmanse pous ou" },
  "dash.no_formations": { fr: "Vous n'avez pas encore de formation active. Explorez nos programmes et commencez votre préparation dès aujourd'hui.", en: "You don't have any active training yet. Explore our programs and start your preparation today.", es: "Aún no tiene formación activa. Explore nuestros programas y comience su preparación hoy.", it: "Non hai ancora formazione attiva. Esplora i nostri programmi e inizia la tua preparazione oggi.", pt: "Você ainda não tem formação ativa. Explore nossos programas e comece sua preparação hoje.", de: "Sie haben noch keine aktive Ausbildung. Entdecken Sie unsere Programme und beginnen Sie heute mit Ihrer Vorbereitung.", ht: "Ou poko gen fòmasyon aktif. Eksplore pwogram nou yo epi kòmanse preparasyon ou jodi a." },
  "dash.profile": { fr: "Mon profil", en: "My Profile", es: "Mi perfil", it: "Il mio profilo", pt: "Meu perfil", de: "Mein Profil", ht: "Pwofil mwen" },
};
