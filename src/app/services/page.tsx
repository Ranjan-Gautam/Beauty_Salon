import ServicesBanner from "@/components/services/ServicesBanner";
import ServicesGrid from "@/components/services/ServicesGrid";
import AboutSalon from "@/components/services/AboutSalon";
import TreatmentSection from "@/components/services/TreatmentSection";
import Partners from "@/components/layout/Partners";
import Footer from "@/components/layout/Footer";

export default function ServicesPage() {
  return (
    <>
      <ServicesBanner />
      <ServicesGrid />
      <AboutSalon />
      <TreatmentSection />
      <Partners />
      <Footer />
    </>
  );
}