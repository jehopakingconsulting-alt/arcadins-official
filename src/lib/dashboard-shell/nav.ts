/**
 * ARCADINS — Configuration GÉNÉRIQUE de l'espace apprenant (dashboard canonique).
 * 12 sections, i18n FR/EN/ES, aucune donnée codée en dur produit. Réutilisé par
 * tous les produits/programmes. PUR (données).
 */
import type { Localized } from "../program-presentation/types.ts";

export interface DashboardSection {
  id: string;
  icon: string;
  label: Localized;
  group: "learn" | "account";
}

export const DASHBOARD_SECTIONS: DashboardSection[] = [
  { id: "accueil", icon: "🏠", group: "learn", label: { fr: "Accueil", en: "Home", es: "Inicio" } },
  { id: "cours", icon: "📚", group: "learn", label: { fr: "Mes cours", en: "My courses", es: "Mis cursos" } },
  { id: "progression", icon: "📈", group: "learn", label: { fr: "Progression", en: "Progress", es: "Progreso" } },
  { id: "certificats", icon: "🎓", group: "learn", label: { fr: "Attestations", en: "Certificates", es: "Certificados" } },
  { id: "reussites", icon: "🏆", group: "learn", label: { fr: "Réussites", en: "Achievements", es: "Logros" } },
  { id: "favoris", icon: "🔖", group: "learn", label: { fr: "Favoris", en: "Bookmarks", es: "Favoritos" } },
  { id: "telechargements", icon: "⬇️", group: "learn", label: { fr: "Téléchargements", en: "Downloads", es: "Descargas" } },
  { id: "achats", icon: "🧾", group: "account", label: { fr: "Achats", en: "Purchases", es: "Compras" } },
  { id: "notifications", icon: "🔔", group: "account", label: { fr: "Notifications", en: "Notifications", es: "Notificaciones" } },
  { id: "profil", icon: "👤", group: "account", label: { fr: "Profil", en: "Profile", es: "Perfil" } },
  { id: "parametres", icon: "⚙️", group: "account", label: { fr: "Paramètres", en: "Settings", es: "Ajustes" } },
  { id: "support", icon: "💬", group: "account", label: { fr: "Support", en: "Support", es: "Soporte" } },
];

export function findSection(id: string | undefined): DashboardSection {
  return DASHBOARD_SECTIONS.find((s) => s.id === id) ?? DASHBOARD_SECTIONS[0];
}
