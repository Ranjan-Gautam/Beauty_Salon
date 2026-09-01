import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth-google";
import { verifyUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CustomerDashboard from "@/components/dashboard/CustomerDashboard";

export default async function DashboardPage() {
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
    redirect("/?authRequired=dashboard");
  }

  const appointments = await prisma.appointment.findMany({
    where: { email: customer.email },
    include: {
      branch: true,
      service: true,
      extraServices: {
        include: { service: true },
      },
    },
    orderBy: { date: "desc" },
  });

  return (
    <CustomerDashboard
      customerName={customer.name}
      appointments={appointments}
    />
  );
}
