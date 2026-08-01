import dynamic from "next/dynamic";
import HeroSlider from "@/components/home/HeroSlider";

// Code-splitting : les sections sous la ligne de flottaison sont chargées en
// chunks séparés (réduit le JS initial / TBT). SSR conservé (contenu dans le HTML).
const DepartmentsSplit = dynamic(() => import("@/components/home/DepartmentsSplit"));
const StatsBar = dynamic(() => import("@/components/home/StatsBar"));
const VideoSection = dynamic(() => import("@/components/home/VideoSection"));
const ServicesGrid = dynamic(() => import("@/components/home/ServicesGrid"));

export default function HomePage() {
  return (
    <div className="bg-navy">
      <HeroSlider />
      {/* Séparation permanente des deux départements, présentée dès l'accueil. */}
      <DepartmentsSplit />
      <StatsBar />
      <VideoSection />
      <ServicesGrid />
    </div>
  );
}
