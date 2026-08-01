import dynamic from "next/dynamic";
import HeroSlider from "@/components/home/HeroSlider";

// Code-splitting : les sections sous la ligne de flottaison sont chargées en
// chunks séparés (réduit le JS initial / TBT). SSR conservé (contenu dans le HTML).
const DepartmentsSplit = dynamic(() => import("@/components/home/DepartmentsSplit"));
const StatsBar = dynamic(() => import("@/components/home/StatsBar"));
const VideoSection = dynamic(() => import("@/components/home/VideoSection"));
const ServicesGrid = dynamic(() => import("@/components/home/ServicesGrid"));

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").trim() || "https://arcadins-official.vercel.app";

// Données structurées (SEO) — identité de l'organisation + site. Statique, sûr.
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      name: "ARCADINS Training Center",
      url: SITE_URL,
      description:
        "Plateforme de formation professionnelle et de préparation au TEF Canada et au TCF Canada, en 7 langues.",
      areaServed: "CA",
      address: { "@type": "PostalAddress", addressLocality: "Ottawa", addressRegion: "ON", addressCountry: "CA" },
      email: "info@arcadins-training.com",
      telephone: "+1-514-451-3436",
    },
    {
      "@type": "WebSite",
      name: "ARCADINS Training Center",
      url: SITE_URL,
      inLanguage: ["fr", "en", "es"],
    },
  ],
};

export default function HomePage() {
  return (
    <div className="bg-navy">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }} />
      <HeroSlider />
      {/* Séparation permanente des deux départements, présentée dès l'accueil. */}
      <DepartmentsSplit />
      <StatsBar />
      <VideoSection />
      <ServicesGrid />
    </div>
  );
}
