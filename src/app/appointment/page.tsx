import AppointmentHero from "@/components/appointment/AppointmentHero";
import AppointmentForm from "@/components/appointment/AppointmentForm";
import Testimonials from "@/components/layout/Testimonials";
import Footer from "@/components/layout/Footer";

export default function AppointmentPage() {
  return (
    <>
      <AppointmentHero />
      <AppointmentForm />
      <Testimonials />
      <Footer />
    </>
  );
}
