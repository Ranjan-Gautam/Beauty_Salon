import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth";
import AdminAppointmentsTable from "@/components/admin/AppointmentTable";
import AdminManagement from "@/components/admin/AdminManagement";
import {
  IoTimeOutline,
  IoCheckmarkCircleOutline,
  IoListOutline,
  IoCashOutline,
  IoCutOutline,
} from "react-icons/io5";
export const dynamic = "force-dynamic";
export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const session = token ? await verifySession(token) : null;

  const appointments =
    session?.role === "ADMIN" && !session.branchId
      ? []
      : await prisma.appointment.findMany({
          where:
            session?.role === "ADMIN"
              ? { branchId: session.branchId! }
              : undefined,
          include: {
            branch: true,
            service: true,
            extraServices: { include: { service: true } },
          },
          orderBy: { createdAt: "desc" },
        });

  const sessionBranch =
    session?.role === "ADMIN" && session.branchId
      ? await prisma.branch.findUnique({
          where: { id: session.branchId },
          select: { name: true },
        })
      : null;

  const services = await prisma.service.findMany({
    select: { id: true, name: true, price: true },
    orderBy: { name: "asc" },
  });

  const totalDeposits = appointments.reduce(
    (sum, a) => sum + (a.depositAmount || 0),
    0,
  );
  const stats = [
    {
      label: "Total appointments",
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
      label: "Deposits collected",
      value: `Rs. ${totalDeposits.toLocaleString()}`,
      icon: IoCashOutline,
    },
  ];

  const roleLabel =
    session?.role === "SUPERADMIN"
      ? "Super Admin"
      : sessionBranch
        ? sessionBranch.name
        : "Admin";

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[#14181F] text-white min-h-screen hidden md:flex flex-col">
        <div className="px-5 py-5 flex items-center gap-2 border-b border-white/10">
          <div className="w-7 h-7 rounded bg-[#2B6CB0] flex items-center justify-center shrink-0">
            <IoCutOutline size={14} />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium">Beauty Salon</p>
            <p className="text-[11px] text-white/40">Admin console</p>
          </div>
        </div>
        <nav className="px-3 py-4 flex flex-col gap-1">
          <span className="flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-white/10 text-white">
            <IoListOutline size={16} />
            Appointments
          </span>
          {session?.role === "SUPERADMIN" && (
            <a
              href="#admin-access"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <IoCheckmarkCircleOutline size={16} />
              Admin access
            </a>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-[#E2E5EA] px-6 md:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[#1A202C]">
              Appointments
            </h1>
            <p className="text-xs text-[#718096]">{roleLabel}</p>
          </div>
          {session && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2B6CB0] text-white flex items-center justify-center text-xs font-medium shrink-0">
                {session.email.charAt(0).toUpperCase()}
              </div>
              <div className="leading-tight hidden sm:block">
                <p className="text-sm text-[#1A202C]">{session.email}</p>
                <p className="text-xs text-[#718096]">{roleLabel}</p>
              </div>
            </div>
          )}
        </header>

        <main className="p-6 md:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-lg border border-[#E2E5EA] p-4 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-md bg-[#F4F5F7] flex items-center justify-center shrink-0">
                  <stat.icon size={17} className="text-[#4A5568]" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-[#1A202C] leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#718096]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <AdminAppointmentsTable appointments={appointments} services={services} />

          {session?.role === "SUPERADMIN" && (
            <div id="admin-access">
              <AdminManagement />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
