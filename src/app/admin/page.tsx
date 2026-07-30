import { prisma } from "@/lib/prisma";
import AdminAppointmentsTable from "@/components/admin/AppointmentTable";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoCheckmarkCircleOutline,
  IoListOutline,
} from "react-icons/io5";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const appointments = await prisma.appointment.findMany({
    include: { branch: true, service: true },
    orderBy: { createdAt: "desc" },
  });

  const today = new Date().toDateString();

  const stats = [
    {
      label: "Total Appointments",
      value: appointments.length,
      icon: IoListOutline,
    },
    {
      label: "Pending",
      value: appointments.filter((a) => a.status === "pending").length,
      icon: IoTimeOutline,
    },
    {
      label: "Confirmed",
      value: appointments.filter((a) => a.status === "confirmed").length,
      icon: IoCheckmarkCircleOutline,
    },
    {
      label: "Today's Bookings",
      value: appointments.filter((a) => a.date.toDateString() === today).length,
      icon: IoCalendarOutline,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9f3f0] p-8">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-serif text-[#2c1810] mb-8">
          Appointments Dashboard
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#f9f3f0] flex items-center justify-center shrink-0">
                <stat.icon size={22} className="text-[#c47c5a]" />
              </div>
              <div>
                <p className="text-2xl font-serif text-[#2c1810]">
                  {stat.value}
                </p>
                <p className="text-xs text-[#2c1810]/60">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <AdminAppointmentsTable appointments={appointments} />
      </div>
    </div>
  );
}
