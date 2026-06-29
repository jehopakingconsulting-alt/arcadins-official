import HeroSlider from "@/components/home/HeroSlider";
import StatsBar from "@/components/home/StatsBar";
import VideoSection from "@/components/home/VideoSection";
import ServicesGrid from "@/components/home/ServicesGrid";

export default function HomePage() {
  return (
    <div className="bg-navy">
      <HeroSlider />
      <StatsBar />
      <VideoSection />
      <ServicesGrid />
    </div>
  );
}
