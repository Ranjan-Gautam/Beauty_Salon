import AboutHero from "@/components/about/AboutHero";
import CommitmentSection from "@/components/about/CommitmentSection";
import MissionSection from "@/components/about/MissionSection";
import ProcessSection from "@/components/about/ProcessSection";
import Blog from "@/components/layout/Blog";
import Footer from "@/components/layout/Footer";
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CommitmentSection />
      <MissionSection />
      <ProcessSection />
      <Blog />
      <Footer />
    </>
  );
}
