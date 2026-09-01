import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth-google";
import { verifyUserSession } from "@/lib/auth";
import AppointmentHero from "@/components/appointment/AppointmentHero";
import AppointmentForm from "@/components/appointment/AppointmentForm";
import Testimonials from "@/components/layout/Testimonials";
import Footer from "@/components/layout/Footer";

export default async function AppointmentPage() {
  const googleSession = await auth();

  const cookieStore = await cookies();
  const token = cookieStore.get("user_session")?.value;
  const emailSession = token ? await verifyUserSession(token) : null;

  const customer = googleSession?.user
    ? {
        name: googleSession.user.name || "Customer",
        email: googleSession.user.email || "",
      }
    : emailSession
      ? { name: emailSession.name, email: emailSession.email }
      : null;

  if (!customer) {
    redirect("/?authRequired=appointment");
  }

  return (
    <>
      <AppointmentHero />
      <AppointmentForm
        customerName={customer.name}
        customerEmail={customer.email}
      />
      <Testimonials />
      <Footer />
    </>
  );
}
